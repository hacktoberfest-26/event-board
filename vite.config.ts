import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  const offline = mode === "offline";

  return {
    base: "./",
    plugins: [react(), tailwindcss(), ...(offline ? [viteSingleFile()] : [])],
    build: {
      outDir: offline ? "dist-offline" : "dist",
      emptyOutDir: true,
      assetsInlineLimit: offline ? Number.MAX_SAFE_INTEGER : 4096,
    },
    server: { port: 8099, host: true },
    preview: { port: 8099 },
  };
});
