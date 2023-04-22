import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:8080",
      "/server": "http://localhost:8080",
    },
  },
  build: {
    outDir: resolve(__dirname, "build"),
    emptyOutDir: true,
    assetsDir: "static",
    manifest: true,
  },
});
