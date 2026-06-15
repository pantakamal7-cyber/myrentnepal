import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import path from "node:path";

export default defineConfig({
  // Force assets to load relative to the current subdirectory path
  base: "./",
  
  plugins: [
    react(), 
    tailwindcss(), 
    jsxLocPlugin()
  ],
  
  resolve: {
    alias: {
      // Adjusted resolution paths because Cloudflare is executing inside the client directory
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "../shared"),
      "@assets": path.resolve(import.meta.dirname, "../attached_assets"),
    },
  },
  
  // Enforces a standard, clean deployment folder structure 
  build: {
    outDir: "dist",
    emptyOutDir: true,
  }
});
