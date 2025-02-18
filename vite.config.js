import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Ensure global object exists
  },
  resolve: {
    alias: {
      buffer: "buffer/", // Alias for Buffer polyfill
    },
  },
  build: {
    sourcemap: true, // Ensure source maps are generated
    minify: "terser", // Use Terser for better minification control
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separate vendor dependencies into a separate chunk
          }
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Polyfill Buffer
          process: true, // Optionally polyfill process
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
