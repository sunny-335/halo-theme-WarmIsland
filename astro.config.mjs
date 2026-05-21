// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  base: "/themes/warm-island",
  compressHTML: true,
  build: {
    assets: "assets",
    format: "file",
    cssMinify: true,
  },
  outDir: "./templates",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
