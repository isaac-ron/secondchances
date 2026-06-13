import { config, fields, collection } from "@keystatic/core";

function getStorage() {
  if (process.env.KEYSTATIC_STORAGE_KIND === "github") {
    return {
      kind: "github" as const,
      repo: {
        owner: process.env.KEYSTATIC_GITHUB_REPO_OWNER!,
        name: process.env.KEYSTATIC_GITHUB_REPO_NAME ?? "second-chances",
      },
    };
  }
  return { kind: "local" as const };
}

const photoVariantField = fields.select({
  label: "Photo colour tint",
  description: "Applies a colour overlay to the photo to match the site's brand palette.",
  options: [
    { label: "Teal (default)", value: "teal" },
    { label: "Amber", value: "amber" },
    { label: "Ink (dark)", value: "ink" },
  ],
  defaultValue: "teal",
});

export default config({
  storage: getStorage(),

  ui: {
    brand: { name: "Second Chances" },
  },

  collections: {
    pillars: collection({
      label: "Service Pillars",
      slugField: "title",
      path: "src/content/pillars/*",
      format: { frontmatter: "yaml" },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "The name of this service pillar as it appears on the site.",
          },
          slug: {
            label: "Slug (auto-generated)",
            description:
              "A URL-safe identifier generated from the title — e.g. \"Education Support\" becomes \"education-support\". You rarely need to edit this.",
          },
        }),
        order: fields.number({
          label: "Display order",
          description: "Controls the order pillars appear on the page. Lower numbers appear first.",
          validation: { isRequired: true },
        }),
        anchor: fields.text({
          label: "Page anchor",
          description:
            'The ID used when linking directly to this section, e.g. setting this to "counselling" means the link https://secondchances.co.ke/how-we-help#counselling jumps straight here.',
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: "Summary",
          description: "A short description of this pillar shown on the home page. Keep it to 2–3 sentences.",
          multiline: true,
          validation: { isRequired: true },
        }),
        bullets: fields.array(
          fields.text({ label: "Bullet point" }),
          {
            label: "Bullet points",
            description: "Key details or services listed under this pillar on the How We Help page.",
            itemLabel: (p) => p.value ?? "—",
          }
        ),
        cta: fields.text({
          label: "Button label",
          description: 'Text on the call-to-action button. Defaults to "Talk to someone" if left blank.',
        }),
        photo: fields.image({
          label: "Photo",
          description: "Upload the image to display alongside this pillar.",
          directory: "public/images/pillars",
          publicPath: "/images/pillars/",
        }),
        photoVariant: photoVariantField,
      },
    }),

    stories: collection({
      label: "Stories of Change",
      slugField: "attribution",
      path: "src/content/stories/*",
      format: { frontmatter: "yaml" },
      schema: {
        quote: fields.text({
          label: "Quote",
          description:
            "The young person's words, anonymised. Never include a real name, location, or other identifying detail without documented consent on file.",
          multiline: true,
          validation: { isRequired: true },
        }),
        attribution: fields.slug({
          name: {
            label: "Attribution",
            description:
              'How the person is identified below their quote — e.g. "Amara, 21" or "Former resident, Nairobi". Use a pseudonym if the person prefers anonymity.',
          },
          slug: {
            label: "Slug (auto-generated)",
            description: "A URL-safe ID generated from the attribution. You rarely need to change this.",
          },
        }),
        tag: fields.text({
          label: "Context tag",
          description:
            'A short label giving extra context, shown in a small chip on the quote card. E.g. "Discontinued at 19 · now in college".',
        }),
        order: fields.number({
          label: "Display order",
          description: "Lower numbers appear first in the carousel.",
          defaultValue: 0,
        }),
        featured: fields.checkbox({
          label: "Show on home page",
          description: "Tick this to include the quote in the rotating Stories of Change section on the home page.",
          defaultValue: false,
        }),
      },
    }),

    team: collection({
      label: "Team & Board",
      slugField: "name",
      path: "src/content/team/*",
      format: { frontmatter: "yaml" },
      schema: {
        name: fields.slug({
          name: {
            label: "Full name",
            description: "The person's name as it should appear on the Our Story page.",
          },
          slug: {
            label: "Slug (auto-generated)",
            description: "A URL-safe ID generated from the name. You rarely need to change this.",
          },
        }),
        role: fields.text({
          label: "Role / Title",
          description: 'Their position at Second Chances, e.g. "Founder & Executive Director".',
          validation: { isRequired: true },
        }),
        order: fields.number({
          label: "Display order",
          description: "Controls the order people appear in the team grid. Lower numbers appear first.",
          defaultValue: 0,
        }),
        photo: fields.image({
          label: "Photo",
          description: "Upload a headshot or portrait photo.",
          directory: "public/images/team",
          publicPath: "/images/team/",
        }),
        photoVariant: photoVariantField,
      },
    }),

    posts: collection({
      label: "Updates & Announcements",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "The headline as it appears on the page and in the listing.",
          },
          slug: {
            label: "Slug (auto-generated)",
            description: "Determines the page URL — e.g. \"our-first-cohort\" becomes /updates/our-first-cohort. Auto-generated from the title; edit only if you need a specific URL.",
          },
        }),
        date: fields.date({
          label: "Publication date",
          description: "The date this update was published. Shown on the listing page and article header.",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          description: "Used to label the post in the listing and as a colour-coded chip on the article.",
          options: [
            { label: "Announcement", value: "Announcement" },
            { label: "Programme update", value: "Update" },
            { label: "Story of change", value: "Story" },
            { label: "Report", value: "Report" },
          ],
          defaultValue: "Update",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "1–2 sentences shown on the listing page and in link previews. Keep it under 160 characters.",
          multiline: true,
          validation: { isRequired: true },
        }),
        coverPhoto: fields.image({
          label: "Cover photo",
          description: "Upload the main image shown in the hero and on the listing card.",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        coverPhotoAlt: fields.text({
          label: "Cover photo description",
          description: "A brief description of the image for screen readers — e.g. \"A classroom filled with morning light.\"",
        }),
        author: fields.text({
          label: "Author",
          description: "Who wrote this post. Use \"Second Chances team\" for unsigned updates.",
        }),
        featured: fields.checkbox({
          label: "Feature at top of listing",
          description: "Shows this post as the large lead article on the Updates page. Only one post should be featured at a time.",
          defaultValue: false,
        }),
        order: fields.number({
          label: "Order (within same date)",
          description: "If two posts share a date, lower numbers appear first. Leave at 0 unless you need to control ordering precisely.",
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: "Post body",
          description: "Write the full article here. Use the toolbar for headings, bold, lists, links, and images.",
        }),
      },
    }),

    reports: collection({
      label: "Reports & Documents",
      slugField: "title",
      path: "src/content/reports/*",
      format: { frontmatter: "yaml" },
      schema: {
        title: fields.slug({
          name: {
            label: "Report title",
            description: "The full title of the report as it will appear on the site.",
          },
          slug: {
            label: "Slug (auto-generated)",
            description: "Determines the URL identifier. Auto-generated from the title; you rarely need to change this.",
          },
        }),
        year: fields.number({
          label: "Year",
          description: "The year this report covers — used to sort and group reports on the page.",
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Publication date",
          description: "The date this report was published or made public.",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Report type",
          description: "Used to label and filter the report in the listing.",
          options: [
            { label: "Annual report", value: "Annual Report" },
            { label: "Programme report", value: "Programme Report" },
            { label: "Financial report", value: "Financial Report" },
            { label: "Research / evidence", value: "Research" },
          ],
          defaultValue: "Annual Report",
        }),
        description: fields.text({
          label: "Summary",
          description: "1–2 sentences describing what this report covers. Shown on the reports listing page.",
          multiline: true,
        }),
        file: fields.file({
          label: "PDF document",
          description: "Upload the PDF file. Visitors will be able to download it directly from the site.",
          directory: "public/reports",
          publicPath: "/reports/",
        }),
        cover: fields.image({
          label: "Cover image (optional)",
          description: "A preview thumbnail of the report cover. Leave blank to show a default document icon.",
          directory: "public/images/reports",
          publicPath: "/images/reports/",
        }),
      },
    }),

    faqs: collection({
      label: "FAQs",
      slugField: "question",
      path: "src/content/faqs/*",
      format: { frontmatter: "yaml" },
      schema: {
        question: fields.slug({
          name: {
            label: "Question",
            description: "The question as it appears in the FAQ accordion on the site.",
          },
          slug: {
            label: "Slug (auto-generated)",
            description: "A URL-safe ID generated from the question. You rarely need to change this.",
          },
        }),
        order: fields.number({
          label: "Display order",
          description: "Controls the order questions appear. Lower numbers appear first.",
          defaultValue: 0,
        }),
      },
    }),
  },
});
