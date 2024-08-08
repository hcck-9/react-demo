import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// 引入原子CSS
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: true,
        titleProp: true,
      },
      include: ["**/*.svg", "**/*.svg?react"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      // '@assets': path.join(__dirname, 'src/assets')
    },
  },
  optimizeDeps: {
    entries: ["./src/index.tsx"],
  },
  build: {
    assetsInlineLimit: 8 * 1024,
  },
  server: {
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:9600/",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
