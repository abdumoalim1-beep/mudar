import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths relative so the build works on GitHub Pages
// under https://<user>.github.io/<repo>/ as well as on a custom domain.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
