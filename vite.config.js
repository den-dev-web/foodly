import { defineConfig } from "vite";
import path from "path";
import en from "./src/i18n/en.json";
import uk from "./src/i18n/uk.json";

// GitHub Pages serves the project from /foodly/; absolute paths keep / and /uk/ on the same assets
const BASE = "/foodly/";
const DEFAULT_LANG = "en";
// Each language: its dictionary and the page it is built into
const LANGUAGES = {
  en: { dict: en, fileName: "index.html" },
  uk: { dict: uk, fileName: "uk/index.html" },
};
const PLACEHOLDER = /\{\{\s*([\w.]+)\s*\}\}/g;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTemplate(html, lang) {
  const { dict } = LANGUAGES[lang];
  return html.replace(PLACEHOLDER, (match, key) => {
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
