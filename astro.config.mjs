// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  base: "/themes/warm-island",
  compressHTML: true,
  build: {
    assets: "assets",
    format: "file",
    cssMinify: true,
  },
  outDir: "./templates",
  integrations: [vue()],
  vite: {
    plugins: [
      Icons({
        compiler: "vue3",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
