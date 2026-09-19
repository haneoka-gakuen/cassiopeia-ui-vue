import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: { index: "src/index.ts", player: "src/player-entry.ts", overview: "src/overview-entry.ts" },
      formats: ["es"],
      fileName: (_format, name) => name + ".js",
    },
    minify: false,
    sourcemap: true,
    target: "es2022",
    rollupOptions: {
      external: (id) => id.startsWith("@haneoka/") || id.startsWith("@sonolus/") || id === "three" || id === "vue",
    },
  },
});
