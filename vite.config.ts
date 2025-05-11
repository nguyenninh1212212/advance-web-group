import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      historyApiFallback: true,
      host: "0.0.0.0",
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    optimizeDeps: {
      exclude: ["html-docx-js"],
    },
    build: {
      commonjsOptions: {
        include: [/html-docx-js/, /node_modules/],
      },
    },
  };
});
