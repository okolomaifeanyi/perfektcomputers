# Perfect Computers Marketing Site — Design Spec

Status: Approved by user, v1 scope (dark mode deferred)
Date: 2026-08-06

## 1. Goal

A single-page marketing/portfolio site (perfectcomputers.com.ng) whose one job
is to turn Nigerian small-business owners into a WhatsApp conversation. Sells
the developer's own services (web + mobile development, payment/VTU
integration) using real past projects as proof of work. Not an e-commerce
site (that is the separate PerfektMart project).

Audience: local SMB owners in Nigeria, not developers. Design and copy must
read as trustworthy, fast, and competent.

## 2. Tech stack

- Next.js (App Router) + TypeScript, strict mode, no `any`
- Tailwind CSS v4 + shadcn/ui primitives (themed via CSS variables, never
  left at shadcn defaults)
- lucide-react for icons (kept per explicit brief instruction, overriding
  the installed anti-slop skill's default icon-library preference)
- `geist` npm package for typefaces (self-hosted via `next/font`, zero
  external font requests)
- `motion` (Motion / Framer Motion) for scroll-reveal-on-entry and CTA
  press feedback only
- No backend/database, no CMS — static content. No contact form beyond the
  WhatsApp link in v1.
- Deploy target: Vercel

**Explicitly out of scope for v1:** dark mode / theme toggle / `next-themes`
(cut from the original design pass to ship this week — see Section 4 for how
the token structure keeps this a clean future add-on, not a rework). Any
contact form beyond the WhatsApp link. CMS or backend of any kind.

## 3. Design system

**Design read:** Trust-first SMB conversion landing page for non-technical
Nigerian small business owners, confident-and-precise visual language, built
on Tailwind v4 + shadcn/ui with restrained, purposeful motion.

**Dial values** (from the installed `design-taste-frontend` anti-slop skill,
reasoned from this brief rather than left at baseline):
- `DESIGN_VARIANCE: 6` — asymmetric hero and service grid, grid-anchored,
  not chaotic
- `MOTION_INTENSITY: 4` — fluid entrance/scroll-reveal and tactile CTA
  feedback only; no scroll-hijacking, no parallax
- `VISUAL_DENSITY: 4` — standard marketing-page rhythm

### 3.1 Color tokens (v1: light mode only)

6 named roles, defined as CSS variables so a `.dark` block (or
`prefers-color-scheme` media query) can be added later without renaming any
token or touching component code:

| Role | Light hex | Used for |
|---|---|---|
| `--paper` | `#F6F7F9` | page background |
| `--ink` | `#0E1524` | primary text; also the footer/contact band background |
| `--indigo` | `#3854E6` | brand accent — links, icons, focus rings, Care Plan / Standard-tier highlight |
| `--signal` | `#25D366` | WhatsApp CTA only — the actual WhatsApp brand green (chosen for recognition, not decoration) |
| `--muted` | `#5B6472` | secondary text, captions |
| `--line` | `#E3E6EC` | hairline borders/dividers |

Dark-mode hex pairs were discussed during design (paper `#0B0F1A`, ink
`#F2F4F7`, indigo `#6B85FF`, signal unchanged, muted `#9AA3B2`, line
`#232B3D`) and are recorded here for whoever picks up the future dark-mode
task, but are **not implemented in v1**.

### 3.2 Typography

- **Geist** (sans): headlines, UI, body text.
- **Geist Mono**: tech-stack tags on case-study cards, pricing figures,
  process step numerals, footer contact details. Reserved for "precise
  data," never body prose.

### 3.3 Icons, shape, motion

- Icons: lucide-react, `strokeWidth` standardized at `1.5`.
- Shape system (one rule, applied everywhere): cards `rounded-xl` (12px),
  CTA buttons fully pill-shaped, inputs/tags `rounded-md`.
- Motion: `motion/react` for scroll-reveal-on-entry (`whileInView`) and CTA
  press feedback (`active:scale-[0.98]`) only. Everything wrapped in
  `useReducedMotion()` and degrades to static under
  `prefers-reduced-motion: reduce`.

## 4. Page structure

1. **Sticky nav** — wordmark left; Services / Work / Pricing anchor links +
   a "Chat on WhatsApp" button on the right. Collapses to wordmark + CTA
   only under 768px (no hamburger — too few links to need one). Max 72px
   tall, single line at desktop.
2. **Hero** — asymmetric split. Left: headline, subhead, primary CTA.
   Right: a WhatsApp chat-bubble mockup showing a snippet of a lead-to-
   conversation exchange (the signature hero moment — it visualizes what
   clicking the CTA actually produces). Stacks vertically on mobile,
   mockup below the CTA.
   - Headline (no em dash, per anti-slop rule): "Websites & Apps That Get
     Your Business Found, and Paid"
   - Subhead: one line, full-stack web + mobile developer, Paystack + VTU
     integration experience.
   - Primary CTA: "Chat on WhatsApp" → `https://wa.me/2349030658008`,
     visually the loudest control on the page (`--signal` fill).
3. **Services** — 5 items as an asymmetric grid, not 5 identical cards: a
   row of 3 standard cards (Business Websites, Online Stores, Mobile
   Apps), then Payments & Wallets (wide) + Care Plan (visually distinct,
   `--indigo`-tinted background, "recurring" framing) so Care Plan reads
   as a highlight rather than being buried, per the brief's explicit
   instruction.
4. **Work** — 6 case studies, including Cometake shown in full (confirmed
   in scope by the user). Varied-size grid (a couple of larger/featured
   tiles, rest standard), not a uniform 6-up grid. Tech stack shown as a
   small Geist Mono tag under each card, never in the card headline. Copy
   pattern per card: problem → what was built → one standout detail.
   - Cometake — mobile + web e-commerce app
   - Idikarh Properties — real estate brand site, "Real Estate, Real Easy"
   - International Journal of Spectrum Research — submissions, search,
     archives
   - Savannah Spot — local discovery app, premium glassmorphism UI
   - Yunivax Sports — real-time football platform, chat + live scores
   - Multi-vendor marketplace — vendor dashboards, roles, Paystack +
     wallet + VTU
5. **Process** — the one section using numbered markers, since it is a
   genuine sequence: a horizontal 4-step flow (Consultation → Fixed quote
   & timeline → Build with check-ins → Launch + handover), connected by a
   thin line; stacks vertically on mobile.
6. **Pricing** — 3-column tiers (Starter / Standard / Pro), Standard
   visually emphasized (elevated, `--indigo` border) so the row doesn't
   read as three equal, generic cards. ₦ figures are placeholders (see
   Section 6).
7. **Contact / Footer** — the one deliberate `--ink` (dark) band on an
   otherwise light page — the closing visual beat. Repeated WhatsApp CTA
   at full brightness, email backup
   (`ifeanyiokoloma@gmail.com`), no social row (none exist yet — easy to
   add a row later).

This spans 5+ distinct layout families across 7 sections (split-hero,
asymmetric bento, varied-image-grid, numbered-sequence, tiered-cards,
full-width band) — no two sections repeat a layout family.

## 5. Data & code architecture

- `lib/case-studies.ts` — typed `CaseStudy[]` array: `id`, `title`,
  `tagline?`, `problem`, `whatWasBuilt`, `standoutDetail`,
  `techStack: string[]`, `imageSrc`, `imageAlt`. Images live in
  `public/case-studies/`. Until real screenshots are provided, each entry
  points at a placeholder asset using the exact filename the real image
  should use, so swapping in the real file requires no code change.
- `lib/pricing.ts` — typed tiers array; the ₦ figures carry an
  `isPlaceholder: true` flag so they're greppable before launch.
- `lib/site-config.ts` — single source of truth for the WhatsApp number
  (`2349030658008`), email (`ifeanyiokoloma@gmail.com`), and the `wa.me`
  link builder.
- `components/ui/` — shadcn primitives, themed via the CSS variables in
  Section 3.1.
- `components/sections/` — `Nav`, `Hero`, `Services`, `Work`, `Process`,
  `Pricing`, `Contact`.

## 6. Content status / deferred items

- **Contact info**: real — WhatsApp `+234 903 065 8008`, email
  `ifeanyiokoloma@gmail.com`. Wired in from the start, no placeholder.
- **Cometake case study**: confirmed by user to show in full, no blur/
  placeholder gating needed.
- **Case-study images**: user will provide real screenshots/logos.
  Building against the `imageSrc` contract in `lib/case-studies.ts` so
  they drop in without touching layout code. Until then, cards use a
  neutral, clearly-labeled placeholder graphic (e.g. a flat tinted panel
  with the project name), never a fake stock photo standing in as a
  screenshot — this is proof-of-work content, and a fabricated "screenshot"
  would misrepresent real client work.
- **Pricing figures**: placeholders (`₦XX,XXX` etc.), flagged
  `isPlaceholder: true`, to be replaced with real rates before launch.
- **Dark mode**: deferred out of v1 (Section 2). Token structure keeps it
  a clean add-on.
- **Social links**: none exist yet; footer omits the row for now.

## 7. Non-functional requirements

Carried over from the original brief, unchanged:

**Security** — Security headers via `next.config` (CSP, X-Frame-Options,
Referrer-Policy, X-Content-Type-Options). No secrets in the client bundle.

**Performance** — `next/image` for every image with correct `sizes`, no
layout shift. Self-hosted fonts via `next/font` with `font-display: swap`.
Target Lighthouse ≥ 90 on Performance.

**SEO** — `<title>` / meta description, Open Graph + Twitter card tags,
`LocalBusiness` JSON-LD structured data, `sitemap.xml`, `robots.txt`,
semantic heading hierarchy with a single `h1`.

**Accessibility** — Semantic landmarks, `alt` text on every image, WCAG AA
contrast against the token palette above, full keyboard navigation with
visible focus states. Target Lighthouse ≥ 90 on Accessibility.

**Code quality** — `app/`, `components/ui/`, `components/sections/`, `lib/`
per Section 5. ESLint + Prettier passing. No `any` types.

**Testing** — Vitest + React Testing Library for interactive components
(nav, CTA buttons resolving to the correct `wa.me` link); a `jest-axe`
accessibility smoke test on the full page. No over-testing of static
markup.

## 8. Definition of done

- [ ] All seven sections (nav + 6 content sections) built, responsive from
      360px up
- [ ] Real WhatsApp number and email wired in
- [ ] Lighthouse ≥ 90 on Performance, Accessibility, SEO
- [ ] Tests passing for all interactive components
- [ ] README with local setup + deploy steps
- [ ] Cometake case study shown in full, per user confirmation
- [ ] Pricing figures clearly flagged as placeholders pending real rates
- [ ] Case-study images clearly placeholder-swappable pending real assets
