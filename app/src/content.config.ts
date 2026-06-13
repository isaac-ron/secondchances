import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(["Announcement", "Update", "Story", "Report"]).default("Update"),
    excerpt: z.string(),
    coverPhoto: z.string().optional(),
    coverPhotoAlt: z.string().default(""),
    author: z.string().default("Second Chances team"),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reports" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    publishDate: z.string(),
    category: z.enum(["Annual Report", "Programme Report", "Financial Report", "Research"]).default("Annual Report"),
    description: z.string().optional(),
    file: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { pillars, stories, team, faqs, posts, reports };
