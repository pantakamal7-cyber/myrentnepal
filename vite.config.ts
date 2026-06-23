import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  root: "client",
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // 🛡️ Forces local environment proxies to match server configurations perfectly
  server: {
    historyApiFallback: true
  },
  preview: {
    historyApiFallback: true
  }
});
