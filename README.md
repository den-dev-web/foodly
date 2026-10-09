# Foodly

Foodly is a demo frontend project for a food delivery service, focused on clean architecture, UX quality, and modern frontend practices.

🔗 Live demo: https://den-dev-web.github.io/foodly/ (English) · https://den-dev-web.github.io/foodly/uk/ (Ukrainian)

---

## 📌 About the Project

The project represents a fully functional food catalog interface with product cards, filtering, cart logic, and state persistence.  
The main goal is to demonstrate a **scalable, well-structured frontend solution built without frameworks**.

---

## ⚙️ Tech Stack

- **Vite** — project bundling and development server  
- **Vanilla JavaScript (ES Modules)** — application logic and modular architecture  
- **SCSS** — component-based styling  
- **HTML5** — semantic markup  
- **LocalStorage** — cart state persistence  
- **Normalize.css** — cross-browser consistency
- **Custom Vite plugin** — static multilingual pages from one HTML template
- **Manrope** — self-hosted WOFF2 font, split by weight and subset

---

## 🧩 Architecture & Approach

- Component-based UI structure (product cards, sections, cart)
- Clear separation of concerns with dedicated modules:
  - `catalog` — product data and rendering
  - `filters` — category filtering logic
  - `cart` — cart state and calculations
  - `ui` — UI interactions and states
- Modular, maintainable JavaScript architecture
- Progressive enhancement and basic accessibility:
  - semantic HTML
  - ARIA attributes
  - focus management
  - WCAG AA text contrast on accent buttons
  - `prefers-reduced-motion` respected for scrolling and reveal animations
  - content stays visible without JavaScript
- Responsive layout with a mobile-first approach
- Smooth animations and transitions implemented without external libraries

### 🌐 Internationalization (EN / UK)

- One `index.html` template with `{{key}}` placeholders and JSON dictionaries in `src/i18n/`
- A small Vite plugin (no dependencies) renders the template per language: on the fly in dev, as `index.html` and `uk/index.html` on build
- Every language has its own URL with `lang`, `<title>`, description and `hreflang` + `x-default`, so the texts are in the HTML for search engines and work without JavaScript
- JavaScript takes the language from `<html lang>`; only the UI strings section of the dictionaries goes into the bundle
- The build fails on a missing translation key

---

## ✨ Key Features

- English and Ukrainian versions with a header language switcher
- Product catalog with category-based filtering and an empty-category state
- Pizza size selection with per-size prices
- **“Load more”** functionality for incremental card rendering
- Shopping cart with:
  - item quantity management
  - automatic total price calculation
- Keyboard-accessible quantity input
- Smooth scrolling between page sections
- Cart state persistence using **LocalStorage**

---

## 🛠 Getting Started

```bash
npm install
npm run dev      # http://localhost:5173/foodly/ and /foodly/uk/
npm run build    # dist/index.html + dist/uk/index.html
npm run deploy   # publish dist to GitHub Pages
```

---

## 🎯 What This Project Demonstrates

- Ability to build production-like interfaces using plain JavaScript
- Architectural thinking and modular code organization
- Attention to UX, responsiveness, and accessibility
- Clean project structure and readable codebase
- Build-time internationalization with SEO-friendly language URLs

---

## 🚀 Possible Improvements

- Product search functionality
- Enhanced state animations
- Extended filtering options
- API-based data source integration
