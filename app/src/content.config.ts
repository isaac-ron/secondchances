import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The four service pillars. Body (Markdown) holds the in-depth prose used on
// /how-we-help; `summary` is the short line used on the home page.
const pillars = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pillars" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    anchor: z.string(),
    summary: z.string(),
    bullets: z.array(z.string()).default([]),
    cta: z.string().default("Talk to someone"),
    photo: z.string().optional(),
    photoVariant: z.enum(["teal", "amber", "ink"]).default("teal"),
  }),
});

// Consented, anonymised care-leaver voices. `tag` is the short context label.
const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: z.object({
    quote: z.string(),
    attribution: z.string(),
    tag: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number().default(0),
    photo: z.string().optional(),
    photoVariant: z.enum(["teal", "amber", "ink"]).default("teal"),
  }),
});

// Body (Markdown) holds the answer.
const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { pillars, stories, team, faqs };
