// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://secondchances.co.ke",

  // Static by default. The adapter lets the few API routes
  // (forms) render on-demand as Cloudflare Workers via
  // `export const prerender = false`.
  adapter: cloudflare({ imageService: "compile" }),
  output: "static",

  integrations: [sitemap()],

  // English at launch, Kiswahili in phase 2. Default locale is
  // served at the root (no /en prefix).
  i18n: {
    defaultLocale: "en",
    locales: ["en", "sw"],
    routing: { prefixDefaultLocale: false },
  },

  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
