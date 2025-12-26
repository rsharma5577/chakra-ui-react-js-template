import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    plugins: [
      // Fail fast in dev if ESLint finds errors (runs once on server start)

      eslintPlugin({
        include: ["src/**/*.{ts,tsx}"],
        failOnError: true,
        failOnWarning: false,
      }),
      react(),
      // TypeScript & ESLint checking - shows errors in terminal & browser overlay
      checker({
        typescript: true, // Type checking
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          useFlatConfig: true, // Using eslint.config.js (flat config)
        },
        overlay: {
          initialIsOpen: false, // Don't auto-open overlay
          position: "br", // Bottom-right position
        },
        enableBuild: true, // Also run during build (fails build on error)
      }),
      // Gzip compression for production builds
      !isDevelopment &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
          filter: /\.(js|css)$/i,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
