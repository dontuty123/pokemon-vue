// vite.config.ts
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Add more aliases if needed
      // For example:
      // 'components': path.resolve(__dirname, 'src/components')
    },
  },
});
