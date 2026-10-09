import { products } from "../data/products.js";
import { t } from "./i18n.js";

export class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("foodly_cart") || "{}");
    this.normalizeItems();
    this.subscribers = new Set();
  }

  save() {
    localStorage.setItem("foodly_cart", JSON.stringify(this.items));
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    fn(this.items);
  }

  notify() {
    this.save();
    this.subscribers.forEach((fn) => fn(this.items));
  }

  key(productId, variantId) {
    return variantId ? `${productId}::${variantId}` : productId;
  }

  add(productId, variantId = "") {
    const key = this.key(productId, variantId);
    this.items[key] = (this.items[key] || 0) + 1;
    this.notify();
  }

  setQty(productId, variantId = "", qty = 0) {
    const key = this.key(productId, variantId);
    const normalized = Number.isFinite(qty) ? Math.floor(qty) : 0;
    if (normalized <= 0) {
      delete this.items[key];
    } else {
      this.items[key] = normalized;
    }
    this.notify();
  }

  remove(productId, variantId = "") {
    const key = this.key(productId, variantId);
    if (!this.items[key]) return;
    this.items[key]--;
    if (this.items[key] <= 0) delete this.items[key];
    this.notify();
  }

  getQty(productId, variantId = "") {
    return this.items[this.key(productId, variantId)] || 0;
  }

  clear() {
    this.items = {};
    this.notify();
  }

  normalizeItems() {
    const updated = { ...this.items };

    Object.entries(updated).forEach(([key, qty]) => {
      if (key.includes("::")) return;

      const product = products.find((p) => p.id === key);
      if (!product) return;

      if (Array.isArray(product.variants) && product.variants.length > 0) {
        const targetKey = this.key(product.id, product.variants[0].id);
        updated[targetKey] = (updated[targetKey] || 0) + qty;
        delete updated[key];
      }
    });

    this.items = updated;
    this.save();
  }
}

/* ===== UI для корзины ===== */

export function initCartUI(cart) {
  const cartEl = document.querySelector("[data-cart]");
  const openBtn = document.querySelector("[data-cart-open]");
  const closeBtns = cartEl.querySelectorAll("[data-cart-close]");
  const itemsList = cartEl.querySelector("[data-cart-items]");
  const totalEl = cartEl.querySelector("[data-cart-total]");
  const emptyEl = cartEl.querySelector("[data-cart-empty]");
  const counterBadge = document.querySelector("[data-cart-count]");
  const cartIcon = document.querySelector(".header__cart-icon");
  let releaseFocus = null;

  /* ===== Открытие корзины ===== */
  const open = () => {
    cartEl.hidden = false;

    requestAnimationFrame(() => {
      cartEl.dataset.state = "open";
      cartEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      releaseFocus?.();
      releaseFocus = trapFocus(cartEl);
    });
  };

  /* ===== Закрытие корзины ===== */
  const close = () => {
    cartEl.dataset.state = "closed";
    cartEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    releaseFocus?.();
    releaseFocus = null;

    setTimeout(() => {
      if (cartEl.dataset.state !== "open") {
        cartEl.hidden = true;
      }
    }, 250);
  };

  openBtn.addEventListener("click", open);
  closeBtns.forEach((btn) => btn.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartEl.dataset.state === "open") {
      close();
    }
  });

  /* ===== ОБНОВЛЕНИЕ UI — ЗАЩИТА ОТ ОТСУТСТВИЯ ДАННЫХ ===== */
  cart.subscribe((items) => {
    itemsList.innerHTML = "";

    const ids = Object.keys(items);
    const totalQty = ids.reduce((acc, key) => acc + (items[key] || 0), 0);
    let total = 0;

    if (counterBadge) counterBadge.textContent = totalQty;
    if (cartIcon) {
      cartIcon.src =
        totalQty > 0
          ? `${import.meta.env.BASE_URL}assets/icons/empty_cart.svg`
          : `${import.meta.env.BASE_URL}assets/icons/cart.svg`;
    }

    if (ids.length === 0) {
      emptyEl.hidden = false;
      totalEl.textContent = "0 ₴";
      return;
    }

    emptyEl.hidden = true;

    ids.forEach((id) => {
      const [productId, variantId = ""] = id.split("::");
      const product = products.find((p) => p.id === productId);
      const variant = product?.variants?.find((v) => v.id === variantId);
      const qty = items[id];

      /* === ПРОДУКТА НЕТ В ДАННЫХ — ЧИСТИМ КОРЗИНУ === */
      if (!product) {
        cart.remove(productId, variantId);
        return;
      }

      const unitPrice = variant?.price ?? product.price ?? 0;
      const title =
        variant && variant.label
          ? `${product.name} — ${variant.label}`
          : product.name;

      /* === БЕЗОПАСНЫЙ ПОДСЧЁТ СУММЫ === */
      total += unitPrice * qty;

      /* === СОЗДАЁМ ЭЛЕМЕНТ КОРЗИНЫ === */
      const li = document.createElement("li");
      li.className = "cart__item";

      li.innerHTML = `
        <div class="cart-item__info">
          <div class="cart-item__title">${title}</div>
          <div class="cart-item__price">${unitPrice} ₴</div>
        </div>

        <div class="cart-item__counter">
          <button class="cart-item__btn" data-cart-decrease>-</button>
          <input
            class="cart-item__qty"
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            aria-label="${t.quantity}"
            value="${qty}"
          />
          <button class="cart-item__btn" data-cart-increase>+</button>
        </div>
      `;

      /* === КНОПКИ ДОБАВЛЕНИЯ/УМЕНЬШЕНИЯ === */
      li.querySelector("[data-cart-decrease]").addEventListener("click", () =>
        cart.remove(productId, variantId)
      );

      li.querySelector("[data-cart-increase]").addEventListener("click", () =>
        cart.add(productId, variantId)
      );

      const qtyInput = li.querySelector(".cart-item__qty");
      const applyQtyFromInput = () => {
        const raw = qtyInput.value.trim();
        if (raw === "") {
          qtyInput.value = String(qty);
          return;
        }
        const nextQty = Number.parseInt(raw, 10);
        if (Number.isNaN(nextQty)) {
          qtyInput.value = String(qty);
          return;
        }
        cart.setQty(productId, variantId, nextQty);
      };

      qtyInput.addEventListener("change", applyQtyFromInput);
      qtyInput.addEventListener("blur", applyQtyFromInput);
      qtyInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        applyQtyFromInput();
      });

      itemsList.append(li);
    });

    totalEl.textContent = `${total} ₴`;
  });
}

/* ===== Focus Trap ===== */
function trapFocus(modal) {
  const focusable = Array.from(
    modal.querySelectorAll("button, a, input, [tabindex]")
  ).filter((el) => !el.hasAttribute("disabled"));

  if (!focusable.length) {
    return () => {};
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function loop(e) {
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  modal.addEventListener("keydown", loop);
  first?.focus();

  return () => modal.removeEventListener("keydown", loop);
}
