import { defineConfig } from "vite";
import path from "path";
import en from "./src/i18n/en.json";
import uk from "./src/i18n/uk.json";

// GitHub Pages serves the project from /foodly/; absolute paths keep / and /uk/ on the same assets
const BASE = "/foodly/";
// hreflang needs absolute URLs
const SITE_URL = "https://den-dev-web.github.io";
const DEFAULT_LANG = "en";
// Each language: its dictionary, the page it is built into and its URL path under BASE.
// "UA", not "UK": the "uk" code reads as United Kingdom
const LANGUAGES = {
  en: { dict: en, fileName: "index.html", path: "", label: "EN", name: "English" },
  uk: { dict: uk, fileName: "uk/index.html", path: "uk/", label: "UA", name: "Українська" },
};
const PLACEHOLDER = /\{\{\s*([\w.]+)\s*\}\}/g;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// <link rel="alternate"> for every language plus x-default → the default language
function renderAlternates() {
  const links = Object.entries(LANGUAGES).map(
    ([code, { path }]) => `<link rel="alternate" hreflang="${code}" href="${SITE_URL}${BASE}${path}" />`
  );
  links.push(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${BASE}${LANGUAGES[DEFAULT_LANG].path}" />`);
  return links.join("\n    ");
}

function renderLangSwitcher(currentLang) {
  return Object.entries(LANGUAGES)
    .map(([code, { path, label, name }]) => {
      const isCurrent = code === currentLang;
      return `<li>
                <a
                  class="lang-switcher__link${isCurrent ? " lang-switcher__link--current" : ""}"
                  href="${BASE}${path}"
                  hreflang="${code}"
                  lang="${code}"
                  title="${name}"${isCurrent ? '\n                  aria-current="true"' : ""}
                >${label}</a>
              </li>`;
    })
    .join("\n              ");
}

function renderTemplate(html, lang) {
  const { dict } = LANGUAGES[lang];
  // Markup built here, not translated text: inserted without escaping
  const generated = {
    "page.alternates": renderAlternates(),
    "page.lang_switcher": renderLangSwitcher(lang),
  };
  return html.replace(PLACEHOLDER, (match, key) => {
    if (key in generated) return generated[key];
    const value = key.split(".").reduce((node, part) => node?.[part], dict);
    if (typeof value !== "string") {
      throw new Error(`i18n: missing "${key}" in ${lang}.json`);
    }
    return escapeHtml(value);
  });
}

function langFromUrl(url = "") {
  const prefix = url.startsWith(BASE) ? url.slice(BASE.length) : url.replace(/^\//, "");
  const lang = prefix.split("/")[0];
  return lang in LANGUAGES ? lang : DEFAULT_LANG;
}

// One HTML template, one page per language: rendered on the fly in dev, emitted per language on build
function i18nPages() {
  return {
    name: "foodly-i18n-pages",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        // On build the placeholders stay until generateBundle renders every language
        return ctx.server ? renderTemplate(html, langFromUrl(ctx.originalUrl)) : html;
      },
    },
    // "post": index.html is emitted by Vite's own HTML plugin, so it exists only after that hook
    generateBundle: {
      order: "post",
      handler(options, bundle) {
        const template = bundle["index.html"].source;
        for (const [lang, { fileName }] of Object.entries(LANGUAGES)) {
          if (lang === DEFAULT_LANG) {
            bundle["index.html"].source = renderTemplate(template, lang);
          } else {
            this.emitFile({ type: "asset", fileName, source: renderTemplate(template, lang) });
          }
        }
      },
    },
  };
}

export default defineConfig({
  root: "src",
  base: BASE,
  publicDir: path.resolve(__dirname, "public"),
  plugins: [i18nPages()],
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: "../dist",
    assetsDir: "assets",
    emptyOutDir: true,
    cssCodeSplit: false,
    // Keep fonts as files: inlined base64 would always load, bypassing unicode-range
    assetsInlineLimit: (filePath) => (filePath.endsWith(".woff2") ? false : undefined),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
