// Прокрутка к секции
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scrollTo);
    target?.scrollIntoView();
  });
});

// ===== HEADER BURGER =====
const DESKTOP_MIN_WIDTH = 768;
const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const overlay = document.querySelector("[data-header-overlay]");

if (burger) {
  const setBodyLock = (lock) => {
    const cartOpen = document.querySelector('[data-cart][data-state="open"]');
    if (!lock && cartOpen) return;
    document.body.style.overflow = lock ? "hidden" : "";
  };

  const syncMenuState = (isOpen) => {
    burger.setAttribute("aria-expanded", isOpen);
    menu?.setAttribute("aria-hidden", isOpen ? "false" : "true");
    setBodyLock(isOpen);
  };

  const closeMenu = () => {
    header.classList.remove("header--open");
    syncMenuState(false);
  };

  burger.addEventListener("click", () => {
    const isOpen = header.classList.toggle("header--open");
    syncMenuState(isOpen);
  });

  menu?.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView();
    }
    if (header.classList.contains("header--open")) {
      closeMenu();
    }
  });

  overlay?.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("header--open")) {
      closeMenu();
    }
  });

  const handleResize = () => {
    if (!menu) return;
    const isDesktop = window.innerWidth >= DESKTOP_MIN_WIDTH;
    if (isDesktop) {
      closeMenu();
      menu.removeAttribute("aria-hidden");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    } else {
      syncMenuState(header.classList.contains("header--open"));
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();
}

// ===== CATEGORY FILTER =====
export function initCategoryScrollIndicators() {
  const container = document.querySelector(".category-filter");
  const list = document.querySelector(".category-filter__list");

  if (!container || !list) return;

  function update() {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const current = list.scrollLeft;

    if (maxScroll <= 0) {
      container.dataset.scroll = "none";
      return;
    }

    if (current <= 0) {
      container.dataset.scroll = "start";
    } else if (current >= maxScroll - 1) {
      container.dataset.scroll = "end";
    } else {
      container.dataset.scroll = "middle";
    }
  }

  list.addEventListener("scroll", update);
  window.addEventListener("resize", update);

  setTimeout(update, 0);
  update();
}

// ===== PRODUCT CARD =====
export function initProductCard(cardElement, cart) {
  const addBtn = cardElement.querySelector("[data-product-add]");
  const counter = cardElement.querySelector("[data-product-counter]");
  const increase = cardElement.querySelector("[data-product-increase]");
  const decrease = cardElement.querySelector("[data-product-decrease]");
  const qtyValue = cardElement.querySelector("[data-product-qty]");
  const id = cardElement.dataset.productId;

  if (!id) return;

  const setQtyDisplay = (value) => {
    if (!qtyValue) return;
    if (qtyValue instanceof HTMLInputElement) {
      qtyValue.value = String(value);
    } else {
      qtyValue.textContent = value;
    }
  };

  const applyQtyFromInput = () => {
    if (!(qtyValue instanceof HTMLInputElement)) return;
    const raw = qtyValue.value.trim();
    if (raw === "") {
      setQtyDisplay(cart.items[id] || 1);
      return;
    }
    const qty = Number.parseInt(raw, 10);
    if (Number.isNaN(qty)) {
      setQtyDisplay(cart.items[id] || 1);
      return;
    }
    cart.setQty(id, "", qty);
    setQtyDisplay(cart.items[id] || 1);
  };

  addBtn.addEventListener("click", () => {
    cart.add(id);
    setQtyDisplay(cart.items[id]);
    addBtn.hidden = true;
    counter.hidden = false;
  });

  increase.addEventListener("click", () => {
    cart.add(id);
    setQtyDisplay(cart.items[id]);
  });

  decrease.addEventListener("click", () => {
    cart.remove(id);
    setQtyDisplay(cart.items[id] || 0);

    if (!cart.items[id]) {
      addBtn.hidden = false;
      counter.hidden = true;
      setQtyDisplay(1);
    }
  });

  qtyValue?.addEventListener("change", applyQtyFromInput);
  qtyValue?.addEventListener("blur", applyQtyFromInput);
  qtyValue?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    applyQtyFromInput();
  });
}

// ===== BENEFITS =====
export function initBenefitsReveal() {
  const items = document.querySelectorAll("[data-benefit]");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.dataset.visible = "true";
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => {
    item.dataset.visible = "false";
    obs.observe(item);
  });
}

// ===== FAQ =====
export function initFAQ() {
  const items = document.querySelectorAll(".faq__item");

  items.forEach((item) => {
    const btn = item.querySelector(".faq__question");
    const panel = item.querySelector(".faq__answer");

    btn.addEventListener("click", () => {
      const isOpen = item.dataset.state === "open";

      // Закрываем все остальные
      items.forEach((i) => {
        if (i !== item) closeItem(i);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });

    function openItem(i) {
      const b = i.querySelector(".faq__question");
      const p = i.querySelector(".faq__answer");

      i.dataset.state = "open";
      b.setAttribute("aria-expanded", "true");
      p.setAttribute("aria-hidden", "false");

      // плавная анимация
      p.style.maxHeight = p.scrollHeight + "px";
      p.dataset.open = "true";
    }

    function closeItem(i) {
      const b = i.querySelector(".faq__question");
      const p = i.querySelector(".faq__answer");

      i.dataset.state = "closed";
      b.setAttribute("aria-expanded", "false");
      p.setAttribute("aria-hidden", "true");

      p.style.maxHeight = "0px";
      p.dataset.open = "false";
    }
  });
}
