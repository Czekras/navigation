import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// App version comes from package.json so the header tag updates on a version
// bump with no code change. Referenced in the app as the global __APP_VERSION__.
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));

// https://vitejs.dev/config/
//
// IMPORTANT for GitHub Pages:
//   `base` MUST match how the site is served.
//   - Project site  https://<user>.github.io/<repo>/   ->  base: "/<repo>/"
//   - User/org site https://<user>.github.io/          ->  base: "/"
//
// Replace "navigation" below with your actual repository name.
export default defineConfig({
  base: "/navigation/",
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
