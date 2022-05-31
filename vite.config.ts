import path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [solidPlugin(), Unocss()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
