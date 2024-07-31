import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: true,
        titleProp: true,
      },
      include: "**/*.svg",
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
});
