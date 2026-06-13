// Single source of truth for navigation, footer, contact details and the
// fund split. Editing here updates the whole site (header + footer + pages).

export const site = {
  name: "Second Chances",
  tagline: "Supporting Care Leavers",
  mission: "You were never meant to do this alone.",
  parentOrg: "Child in Family Focus Kenya",
  // Neutral tab titles (shared-device safety): page sets its own short title.
  domain: "secondchances.co.ke",
};

export const contact = {
  generalEmail: "hello@secondchances.co.ke",
  generalPhone: "+254 700 000 000",
  safeguardingEmail: "safeguarding@secondchances.co.ke",
  safeguardingPhone: "+254 700 000 111",
  whatsapp: "+254 700 000 000",
  location: "Nairobi, Kenya",
};

// Primary nav. `key` matches each page's `current` prop for the active state.
export const primaryNav = [
  { href: "/our-story", label: "Our Story", key: "our-story" },
  { href: "/how-we-help", label: "How We Help", key: "how-we-help" },
  { href: "/impact", label: "Our Impact", key: "impact" },
  { href: "/updates", label: "Our Updates", key: "updates" },
  { href: "/get-involved", label: "Get Involved", key: "get-involved" },
];

export const footerColumns = [
  {
    heading: "Get Support",
    links: [
      { href: "/get-help", label: "Get Help" },
      { href: "/how-we-help#counselling", label: "Counselling & Healing" },
      { href: "/how-we-help#education", label: "Education & Training" },
      { href: "/how-we-help#legal-aid", label: "Legal Aid" },
      { href: "/resources", label: "Resources & Guides" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { href: "/get-involved#donate", label: "Donate" },
      { href: "/get-involved#partnerships", label: "Partnerships" },
      { href: "/get-involved#volunteer", label: "Volunteer & Pro Bono" },
      { href: "/get-involved#refer", label: "Refer Someone" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/impact", label: "Our Impact" },
      { href: "/updates", label: "Updates & Announcements" },
      { href: "/safeguarding", label: "Safeguarding" },
      { href: "/reports", label: "Reports & Accountability" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

// Illustrative allocation — replace with audited figures before launch.
export const funds = [
  { label: "Direct support & stabilisation", pct: 70, color: "teal" },
  { label: "Education & vocational training", pct: 20, color: "amber" },
  { label: "Operations & safeguarding", pct: 10, color: "ink" },
] as const;
