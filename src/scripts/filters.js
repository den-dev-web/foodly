export function initCategoryFilter(root, onChange) {
  const buttons = Array.from(root.querySelectorAll("[data-category]"));
  let current = "all";

  root.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-category]");
    if (!btn) return;

    const newCategory = btn.dataset.category;
    if (newCategory === current) return;

    current = newCategory;

    // 🔥 переключение стиля (единственный правильный вариант)
    buttons.forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("category-filter__item--active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    // 🔥 форсируем обновление (убирает задержку фона)
    btn.offsetHeight;

    // 🔥 скроллим выбранный таб в центр
    btn.scrollIntoView({
      inline: "center",
      block: "nearest",
    });

    // callback
    onChange(newCategory);
  });
}
