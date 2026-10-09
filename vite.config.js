import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",
  base: "./",
  publicDir: path.resolve(__dirname, "public"),
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
