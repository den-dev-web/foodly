// Named imports keep only the "ui" section of each dictionary in the bundle
import { ui as en } from "../i18n/en.json";
import { ui as uk } from "../i18n/uk.json";

const UI_STRINGS = { en, uk };
const DEFAULT_LANG = "en";

// The page language is set at build time in <html lang>
const pageLang = document.documentElement.lang;
export const lang = pageLang in UI_STRINGS ? pageLang : DEFAULT_LANG;
export const t = UI_STRINGS[lang];
