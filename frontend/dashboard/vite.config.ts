import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import { config } from "dotenv";

// Choose the correct env variable
// config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6789,
  },
  mode: process.env.MODE || "development",
  resolve: {
    alias: {
      // src: path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "src/assets"),
      helpers: path.resolve(__dirname, "src/helpers"),
      utils: path.resolve(__dirname, "src/utils"),
      views: path.resolve(__dirname, "src/views"),
    },
  },
  plugins: [react()],
});
