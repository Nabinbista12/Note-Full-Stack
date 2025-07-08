import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import server from "./src/environment";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1/": {
        // target: "http://localhost:3000/api",
        target: `${server.prod}/api`,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
