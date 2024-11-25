import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  optimizeDeps: {
    include: [
      "prettier/standalone",
      "prettier/parser-babel",
      "prettier/plugins/estree",
    ],
  },
  build: {
    commonjsOptions: {
      include: [/prettier/],
    },
  },
});
