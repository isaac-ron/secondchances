// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://secondchances.co.ke",

  // Static by default. The adapter lets the few API routes
  // (forms) render on-demand as Cloudflare Workers via
  // `export const prerender = false`.
  adapter: cloudflare({ imageService: "compile" }),
  output: "static",

  integrations: [sitemap(), react(), markdoc(), keystatic()],

  // English at launch, Kiswahili in phase 2. Default locale is
  // served at the root (no /en prefix).
  i18n: {
    defaultLocale: "en",
    locales: ["en", "sw"],
    routing: { prefixDefaultLocale: false },
  },

  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },

  // @keystatic/astro and @keystatic/core import virtual:keystatic-config, which
  // is registered by the Keystatic Vite plugin AFTER esbuild pre-bundling runs.
  // Excluding them prevents esbuild from hitting the unresolvable virtual import.
  // @keystar/ui is NOT excluded so Vite can pre-bundle it and convert its CJS
  // lodash imports (lodash/debounce etc.) to ESM for the browser.
  vite: {
    // keystatic.config.ts runs in the browser (admin UI is client-side React),
    // so process.env doesn't exist there. Inline the values at build time.
    define: {
      "process.env.KEYSTATIC_STORAGE_KIND": JSON.stringify(env.KEYSTATIC_STORAGE_KIND || "local"),
      "process.env.KEYSTATIC_GITHUB_REPO_OWNER": JSON.stringify(env.KEYSTATIC_GITHUB_REPO_OWNER || ""),
      "process.env.KEYSTATIC_GITHUB_REPO_NAME": JSON.stringify(env.KEYSTATIC_GITHUB_REPO_NAME || "second-chances"),
    },
    optimizeDeps: {
      // @keystatic/astro/api imports virtual:keystatic-config, which is registered
      // by the Keystatic Vite plugin AFTER esbuild pre-bundling runs. Excluding the
      // whole package prevents esbuild from hitting the unresolvable virtual import.
      // @keystatic/core must NOT be excluded so Vite can pre-bundle its CJS deps.
      exclude: ["@keystatic/astro"],
    },
  },
});
