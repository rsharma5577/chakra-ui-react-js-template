import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";

// ============================================================================
// Configuration Helpers
// ============================================================================

/**
 * Determines chunk name for vendor libraries
 */
const getVendorChunk = (id: string): string | undefined => {
  if (!id.includes("node_modules")) return undefined;

  if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
  if (id.includes("@chakra-ui")) return "vendor-chakra";
  if (id.includes("react-router")) return "vendor-router";
  if (id.includes("@tanstack")) return "vendor-tanstack";
  if (id.includes("@auth0")) return "vendor-auth";

  return "vendor";
};

/**
 * Determines chunk name for domain-specific code
 */
const getDomainChunk = (id: string): string | undefined => {
  if (!id.includes("/domains/")) return undefined;

  const domainMatch = id.match(/\/domains\/([^/]+)/);
  return domainMatch ? `domain-${domainMatch[1]}` : undefined;
};

/**
 * Generates optimized chunk file names
 */
const getChunkFileName = (chunkInfo: { facadeModuleId?: string | null }): string => {
  const facadeModuleId = chunkInfo.facadeModuleId
    ? chunkInfo.facadeModuleId.split("/").pop()?.replace(/\.[^.]*$/, "")
    : "chunk";

  return `assets/js/${facadeModuleId}-[hash].js`;
};

/**
 * Organizes asset file names by type
 */
const getAssetFileName = (assetInfo: { name?: string }): string => {
  const info = assetInfo.name?.split(".") || [];
  const ext = info[info.length - 1];

  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
    return `assets/images/[name]-[hash][extname]`;
  }

  if (/woff2?|eot|ttf|otf/i.test(ext)) {
    return `assets/fonts/[name]-[hash][extname]`;
  }

  return `assets/${ext}/[name]-[hash][extname]`;
};

// ============================================================================
// Vite Configuration
// ============================================================================

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isAnalyze = mode === "analyze";

  return {
    // ========================================================================
    // Plugins
    // ========================================================================
    plugins: [
      // Development: Code Quality
      eslintPlugin({
        include: ["src/**/*.{ts,tsx}"],
        failOnError: true,
        failOnWarning: false,
      }),

      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          useFlatConfig: true,
        },
        overlay: {
          initialIsOpen: false,
          position: "br",
        },
        enableBuild: true,
      }),

      // React Plugin
      react({
        jsxRuntime: "automatic",
        babel: {
          plugins: !isDevelopment
            ? [
                [
                  "babel-plugin-react-remove-properties",
                  { properties: ["data-testid"] },
                ],
              ]
            : [],
        },
      }),

      // Production: Compression
      !isDevelopment &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
          filter: /\.(js|mjs|json|css|html)$/i,
          threshold: 1024,
        }),

      !isDevelopment &&
        viteCompression({
          algorithm: "brotliCompress",
          ext: ".br",
          filter: /\.(js|mjs|json|css|html)$/i,
          threshold: 1024,
        }),

      // Analysis: Bundle Visualizer
      isAnalyze &&
        visualizer({
          open: true,
          filename: "dist/stats.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    // ========================================================================
    // Path Resolution
    // ========================================================================
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // ========================================================================
    // Build Configuration
    // ========================================================================
    build: {
      target: ["es2022", "edge88", "firefox78", "chrome87", "safari14"],
      minify: "esbuild",
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      assetsInlineLimit: 4096, // 4KB

      rollupOptions: {
        output: {
          // Code Splitting Strategy
          manualChunks: (id) => {
            return getVendorChunk(id) || getDomainChunk(id);
          },

          // File Naming
          chunkFileNames: getChunkFileName,
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: getAssetFileName,
        },
      },
    },

    // ========================================================================
    // Dependency Optimization
    // ========================================================================
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@chakra-ui/react",
        "@tanstack/react-query",
        "@tanstack/react-table",
        "@auth0/auth0-react",
      ],
    },

  };
});
