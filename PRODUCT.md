# Product

## Register

brand

## Users

**Primary: care leavers** — young people (12–25+) transitioning out of institutional care in Kenya, or who left care earlier and lost their footing. They arrive scared, often in unsafe situations, on low-bandwidth mobile devices. They need to feel safe immediately and find help without friction.

**Secondary: supporters** — donors (individual and institutional), partners, volunteers, and referring organisations. They need to trust the organisation's transparency, understand the impact model, and act quickly (donate, refer, partner).

**Dual-audience constraint:** both audiences share the same site. Care leavers must never feel like objects of pity or fundraising props. The site serves them first; it invites supporters alongside, not above.

## Product Purpose

Second Chances exists because Peter Kamau Muthui — himself a care leaver who aged out of a Nairobi children's home at 20 — waited for support that never came. He returned as a social worker and programmes manager, spent a decade inside the system, then built the organisation he once needed.

The website is the front door. It does three jobs:
1. **Connect care leavers to help** — counselling, education pathways, legal aid, peer community — through WhatsApp, phone, or email, with a quick-exit safety mechanism for those in danger.
2. **Tell the story honestly** — founder's lived experience, the four service pillars, impact transparency (fund allocation, outcomes, safeguarding).
3. **Mobilise support** — donations (M-Pesa + card via payment aggregator), partnerships, volunteering, referrals.

Success: a care leaver in crisis reaches out within minutes. A donor understands exactly where their money goes.

## Brand Personality

**Quiet. Resilient. Grounded.**

The voice is literary and direct — not loud, not clinical. It speaks from lived experience, not institutional distance. Warmth without sentimentality. Strength without bravado. The emotional register sits between a mentor's steady presence and a well-crafted essay.

Tagline: "Supporting Care Leavers"
Mission line: "You were never meant to do this alone."

## Anti-references

- **Minimalist tech portfolio** — all whitespace, no warmth. Beautiful but emotionally cold. Feels like a design studio, not a lifeline.
- **Startup SaaS landing page** — gradient blobs, floating UI mockups, metric dashboards, "Get started free" energy. Wrong universe entirely.
- **Generic charity template** — stock photos of sad children, red donate banners, guilt-driven copy. Undermines dignity.
- **Slick corporate NGO** — UNICEF/Save the Children polished-report aesthetic. The org becomes the hero instead of the people.

## Design Principles

1. **Safety first** — a user in danger can leave instantly. The quick-exit mechanism is always reachable, never decorative. Privacy by design: no tracking cookies, no identifying photos, data-minimising forms.
2. **Dignity, not pity** — care leavers are framed as resilient people navigating a broken system, not victims needing rescue. Copy, imagery, and layout all serve this framing.
3. **Lived experience is the authority** — Peter's story and the voices of care leavers (shared with consent) carry more weight than institutional credentials. The design lets those voices lead.
4. **Show where the money goes** — transparency is structural, not performative. Fund allocation, safeguarding policies, and accountability are first-class content, not buried footnotes.
5. **Work on the worst connection** — the primary user is on a low-bandwidth mobile in Nairobi. Performance, progressive enhancement, and minimal JavaScript are design decisions, not afterthoughts.

## Accessibility & Inclusion

- **Target: WCAG 2.1 AA** conformance.
- **Reduced motion:** all animations respect `prefers-reduced-motion: reduce` (already implemented in mockup).
- **Quick exit:** triple-Esc and visible exit button for users in unsafe environments. History replaced on exit.
- **Low bandwidth:** zero-JS-by-default (Astro), self-hosted subset fonts, responsive images (AVIF/WebP + srcset), minimal payload.
- **Language:** English at launch; Kiswahili planned for Phase 2.
- **Privacy:** no Google Analytics, no third-party trackers, cookieless analytics (Cloudflare Web Analytics or Plausible). Kenya Data Protection Act 2019 compliance.