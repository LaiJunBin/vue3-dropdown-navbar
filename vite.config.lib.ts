import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
import { rmSync } from "fs";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const configs = {
  js: {
    entry: resolve(__dirname, "src/index.ts"),
    name: "Vue3DropdownNavbar",
    fileName: "vue3-dropdown-navbar",
  },
  css: {
    entry: resolve(__dirname, "src/preflight.ts"),
    name: "Preflight",
    fileName: "preflight",
  },
};

const currentConfig = configs[process.env.LIB_TARGET as keyof typeof configs];

if (currentConfig === undefined) {
  throw new Error("LIB_TARGET is not defined or is not valid");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        target: 1,
      },
      afterBuild: () => {
        const distPath = resolve(__dirname, "dist", "dist");
        rmSync(distPath, { recursive: true, force: true });
      },
    }),
    cssInjectedByJsPlugin({
      useStrictCSP: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      ...currentConfig,
    },
    rollupOptions: {
      external: ["vue", "vue-router"],
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
        },
      },
    },
    emptyOutDir: process.env.LIB_TARGET === "js",
  },
});
