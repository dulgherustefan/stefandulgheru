import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // The SSR build only feeds scripts/prerender.js; it doesn't need the public folder.
  build: { copyPublicDir: !isSsrBuild },
}));
