# Second Chances — website (Astro)

Supporting care leavers across Kenya. Astro static site + a thin Cloudflare Workers
layer for forms, deployed on Cloudflare Pages.

> The hand-built design mockup lives one level up (`../*.html`, `../assets`) and is the
> visual source of truth being audited via *impeccable*. This `app/` is the production port.

## Stack
- **Astro 5** (static; API routes render on-demand via the Cloudflare adapter)
- **Cloudflare Pages + Workers** — set the project **root directory** to `app/`
- **Git-based CMS** (Decap) at `/admin` — edits commit to the repo
- **Donations**: Paystack hosted checkout (M-Pesa + cards). Native M-Pesa STK Push (Daraja) is phase 2.
- **Sensitive forms**: serverless relay to a Postmark inbox, **no database**; Cloudflare Turnstile for spam
- **Analytics**: cookieless (Cloudflare Web Analytics) — never Google Analytics

## Develop
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
npm run preview
```

## Structure
```
src/
  config.ts            site nav, footer, contact, fund split — single source of truth
  content.config.ts    typed (Zod) content collections
  content/             pillars, stories, team, faqs (Markdown, CMS-editable)
  layouts/BaseLayout   <head>, header, footer, quick-exit, scripts
  components/          Header, Footer, Hero, SectionHead, DuotonePhoto, Doors,
                       Pillars, MediaBand, Callout, Faq, ExitButton, BrandMark
  pages/               index + 7 pages; pages/api/* form relays
  styles/global.css    the design system (ported from the mockup)
public/
  scripts/app.js       quick-exit, mobile nav, fund-bar animation
  admin/               Decap CMS (config.yml + index.html)
  fonts/               self-hosted fonts go here (phase 1 — currently using the Google CDN)
```

## Required environment (set in Cloudflare Pages → Settings → Variables, and `.dev.vars` locally)
```
POSTMARK_TOKEN=            # transactional email relay
RELAY_TO=safeguarding@... # monitored inbox that receives form submissions
TURNSTILE_SECRET=         # Cloudflare Turnstile spam protection
PUBLIC_TURNSTILE_SITEKEY= # public sitekey for the widget
PUBLIC_PAYSTACK_KEY=      # Paystack public key for donation checkout
```

## Outstanding (carried from the design audit / phasing)
- Self-host subset fonts (Oswald + Spectral) and add responsive `srcset` (P1 page weight)
- Replace Picsum placeholders with commissioned, duotone-treated imagery (no identifying youth faces)
- Kiswahili content (`sw` locale) — phase 2
- Native M-Pesa STK Push — phase 2
- Build the Resources / Guides page
- Confirm Tungsten web license, else keep Oswald (current decision: **Oswald**)
