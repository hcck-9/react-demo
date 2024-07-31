import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
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
