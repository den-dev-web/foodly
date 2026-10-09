import "./styles/critical.scss";
import "./main.scss";

import { initCategoryScrollIndicators } from "./scripts/ui.js";
import { initBenefitsReveal } from "./scripts/ui.js";
import { initFAQ } from "./scripts/ui.js";
import { initReviewsSlider } from "./scripts/reviews-slider.js";

import { products } from "./data/products.js";

import {
  PAGE_SIZE,
  renderCatalog,
  renderMoreItems,
} from "./scripts/catalog.js";
import { initCategoryFilter } from "./scripts/filters.js";
import { Cart, initCartUI } from "./scripts/cart.js";

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const filterRoot = document.querySelector(".category-filter__list");
const showMoreBtn = document.querySelector("[data-show-more]");

let currentCategory = "all";
let currentLimit = PAGE_SIZE;
let cart;

// Помощник — фильтруем товары по категории
function getCurrentList() {
  return currentCategory === "all"
    ? products
    : products.filter((p) => p.category === currentCategory);
}

window.addEventListener("load", () => {
  // Корзина
  cart = new Cart();
  initCartUI(cart);

  // Первоначальный рендер
  renderCatalog(getCurrentList(), cart, {
    category: currentCategory,
    limit: currentLimit,
  });

  // === ФИЛЬТРЫ ===
  initCategoryFilter(filterRoot, (category) => {
    currentCategory = category;
    currentLimit = PAGE_SIZE; // сброс пагинации

    renderCatalog(getCurrentList(), cart, {
      category: currentCategory,
      limit: currentLimit,
    });
  });

  // === ПОКАЗАТЬ ЕЩЁ ===
  showMoreBtn.addEventListener("click", () => {
    currentLimit += PAGE_SIZE;

    const list = getCurrentList();

    // если лимит превышает общее количество — скрываем кнопку
    if (currentLimit >= list.length) {
      showMoreBtn.hidden = true;
    }

    renderMoreItems(list, cart, currentLimit);
  });

  initCategoryScrollIndicators();
  initBenefitsReveal();
  initFAQ();
  initReviewsSlider();
});
