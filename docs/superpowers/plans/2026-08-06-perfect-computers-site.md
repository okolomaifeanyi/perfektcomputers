# Perfect Computers Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page Perfect Computers marketing site (perfectcomputers.com.ng) — Next.js + TypeScript + Tailwind v4 + shadcn/ui — that turns visiting Nigerian SMB owners into a WhatsApp conversation.

**Architecture:** A single `app/page.tsx` composed of one Server Component per section (`components/sections/*`), all reading from typed data in `lib/`. No client-side interactivity is needed anywhere (no state, no client-only APIs), so nothing requires `"use client"` — the whole page ships as static server-rendered HTML with a tiny CSS-only motion layer.

**Tech Stack:** Next.js (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui, lucide-react, `geist` (self-hosted Geist/Geist Mono fonts), Vitest + React Testing Library + jest-axe.

## Global Constraints

Copied verbatim (or paraphrased where noted) from `docs/superpowers/specs/2026-08-06-perfect-computers-site-design.md`. Every task below implicitly includes these:

- Next.js App Router + TypeScript strict — no `any` anywhere.
- Tailwind CSS v4 + shadcn/ui, themed entirely via CSS variables — shadcn primitives are never left at default colors.
- Icons: lucide-react only, `strokeWidth` standardized at `1.5`.
- Fonts: `geist` npm package (Geist + Geist Mono via `next/font`, self-hosted, zero external font requests).
- Motion: **simplified from the design spec** — pure CSS only (a single `@media (prefers-reduced-motion: no-preference)`-gated fade-in-up on the hero, plus standard `transition`/`active:` states for tactile CTA feedback). This delivers the spec's MOTION_INTENSITY 4 requirement (fluid entrance + tactile feedback, nothing scroll-hijacked) without pulling in the `motion` package or converting any section to a Client Component. Flagged here as a deliberate deviation from the spec's literal `motion/react` mention — same visual outcome, less complexity.
- No backend, database, CMS, or contact form beyond the WhatsApp link.
- No dark mode in v1 — tokens are named CSS variables so it is a clean future add-on, not a rework.
- WhatsApp number: `2349030658008` (built into `siteConfig.whatsappLink`); email: `ifeanyiokoloma@gmail.com`.
- Color tokens (light only): `--paper #F6F7F9`, `--ink #0E1524`, `--indigo #3854E6`, `--signal #25D366` (WhatsApp CTA exclusively — never used decoratively elsewhere), `--muted #5B6472`, `--line #E3E6EC`.
- Shape system: cards `rounded-xl`, CTA buttons fully pill-shaped (`rounded-full`), inputs/tags `rounded-md`.
- One CTA label everywhere on the page: **"Chat on WhatsApp"** — never a differently-worded CTA for the same intent.
- Zero em dashes anywhere in visible copy. Use a comma or period instead.
- Testing: Vitest + React Testing Library for interactive components only (nav, CTA links); one `jest-axe` accessibility smoke test on the full page. Do not write tests for static, non-interactive markup (Services, Work, Process sections) — this is a deliberate scope decision from the spec's own testing philosophy, not a gap.
- Case-study images: honest, clearly-labeled placeholders until the user supplies real screenshots. Never a fake stock photo standing in as a screenshot — this is proof-of-work content for real client projects.
- Pricing figures: placeholders, each flagged `isPlaceholder: true`, pending real ₦ rates.
- No `border-t`/`border-b` on every row of a list; no 3+ consecutive sections sharing a layout family; no em dash; no decorative status dots — general anti-slop guardrails from the installed `design-taste-frontend` skill, already baked into the section designs below.

---

## Task 1: Project scaffold & tooling

**Files:**
- Create: entire Next.js project (package.json, tsconfig.json, next.config.ts, app/, eslint.config.mjs, etc.) via `create-next-app`
- Create: `components.json`, `components/ui/button.tsx`, `components/ui/badge.tsx`, `lib/utils.ts` via `shadcn` CLI
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `.prettierrc.json`
- Modify: `eslint.config.mjs` (add Prettier compatibility)
- Modify: `package.json` (add `test`, `test:watch`, `typecheck`, `format`, `format:check` scripts)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a working Next.js + TypeScript + Tailwind v4 + shadcn/ui project, with `npm test` running Vitest against jsdom, `@testing-library/react`, `@testing-library/jest-dom`, and `jest-axe` available to every later task. Path alias `@/*` → project root.

- [ ] **Step 1: Scaffold the Next.js app**

Run in `c:/Users/ifean/Desktop/perfektcomputers` (the existing `.git` and `docs/` directory are safe to have present — `create-next-app` allow-lists both):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack --use-npm
```

If it prompts about existing files, confirm to proceed (only `.git`, `.gitignore`, and `docs/` should be flagged, all safe).

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: build succeeds with the default Next.js starter page.

- [ ] **Step 3: Install runtime dependencies**

```bash
npm install geist lucide-react
```

- [ ] **Step 4: Initialize shadcn/ui**

```bash
npx shadcn@latest init -y -d -b neutral --no-src-dir
```

- [ ] **Step 5: Add the Button and Badge primitives**

```bash
npx shadcn@latest add button badge -y
```

- [ ] **Step 6: Install test tooling**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe
```

- [ ] **Step 7: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 8: Create the Vitest setup file**

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
```

Note: `jest-axe`'s TypeScript types ship with the package as of its current major version. If `tsc` later reports missing types for `jest-axe`, install `@types/jest-axe` as a devDependency.

- [ ] **Step 9: Add npm scripts**

Modify `package.json` `scripts` block to include, alongside the existing `dev`/`build`/`start`/`lint`:

```json
"typecheck": "tsc --noEmit",
"test": "vitest run",
"test:watch": "vitest",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

- [ ] **Step 10: Install and configure Prettier**

```bash
npm install -D prettier eslint-config-prettier
```

Create `.prettierrc.json`:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5"
}
```

Modify `eslint.config.mjs` — add `eslint-config-prettier` to the config array so Prettier and ESLint don't fight over formatting rules. If the generated file looks like:

```js
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

change the last two lines to:

```js
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettierConfig,
];

export default eslintConfig;
```

- [ ] **Step 11: Write and run a smoke test to verify the pipeline**

Create `lib/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("test pipeline", () => {
  it("runs a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: 1 test file, 1 test, PASS.

Delete `lib/smoke.test.ts` once confirmed (it was only to prove the pipeline works; real tests start in Task 3).

- [ ] **Step 12: Verify lint, typecheck, and format all pass**

Run: `npm run lint && npm run typecheck && npm run format:check`
Expected: all three succeed (run `npm run format` first if `format:check` fails on generated files).

- [ ] **Step 13: Commit**

```bash
git add -A
git status
git commit -m "chore: scaffold Next.js project with Tailwind v4, shadcn/ui, and test tooling"
```

(Review the `git status` output before committing — it should show the generated Next.js project files, shadcn files, and config above; nothing unexpected.)

---

## Task 2: Design tokens & fonts

**Files:**
- Modify: `app/globals.css` (full replacement)
- Test: `app/globals.test.ts`

**Interfaces:**
- Consumes: nothing new
- Produces: Tailwind utility classes `bg-paper`, `text-ink`, `bg-indigo`, `text-indigo`, `border-indigo`, `bg-signal`, `text-signal`, `text-muted`, `border-line` (and their `/opacity` variants) available to every component from here on. CSS variables `--font-geist-sans` / `--font-geist-mono` are expected to be supplied by `<html className>` in `app/layout.tsx` (Task 12) — until then `font-sans`/`font-mono` fall back to the system font stack, which is fine for this task's own verification.

- [ ] **Step 1: Write the failing token test**

Create `app/globals.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("design tokens", () => {
  it("defines all six brand color tokens with their approved hex values", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).toContain("--paper: #F6F7F9");
    expect(css).toContain("--ink: #0E1524");
    expect(css).toContain("--indigo: #3854E6");
    expect(css).toContain("--signal: #25D366");
    expect(css).toContain("--muted: #5B6472");
    expect(css).toContain("--line: #E3E6EC");
  });

  it("never defines a .dark override block (dark mode is deferred)", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).not.toContain(".dark");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- globals.test`
Expected: FAIL (globals.css doesn't have the tokens yet, or has shadcn's defaults).

- [ ] **Step 3: Replace globals.css with the token system**

Open `app/globals.css`. If shadcn's init (Task 1) added an `@import` line for an animation helper package at the very top (e.g. `@import "tw-animate-css";`), keep that one line and replace everything below it with the following. Otherwise replace the entire file:

```css
@import "tailwindcss";

:root {
  --paper: #f6f7f9;
  --ink: #0e1524;
  --indigo: #3854e6;
  --signal: #25d366;
  --muted: #5b6472;
  --line: #e3e6ec;
  --radius: 0.75rem;
}

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-indigo: var(--indigo);
  --color-signal: var(--signal);
  --color-muted: var(--muted);
  --color-line: var(--line);

  --color-background: var(--paper);
  --color-foreground: var(--ink);
  --color-primary: var(--indigo);
  --color-primary-foreground: #ffffff;
  --color-secondary: var(--paper);
  --color-secondary-foreground: var(--ink);
  --color-muted-foreground: var(--muted);
  --color-accent: var(--indigo);
  --color-accent-foreground: #ffffff;
  --color-border: var(--line);
  --color-input: var(--line);
  --color-ring: var(--indigo);
  --color-card: #ffffff;
  --color-card-foreground: var(--ink);
  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

body {
  background-color: var(--paper);
  color: var(--ink);
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- globals.test`
Expected: PASS.

- [ ] **Step 5: Verify the build still succeeds**

Run: `npm run build`
Expected: succeeds (the default starter page will look unstyled/different since shadcn's default palette is gone — that's expected, it gets used starting Task 5).

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/globals.test.ts
git commit -m "feat: replace shadcn default tokens with Perfect Computers color and shape system"
```

---

## Task 3: Site config

**Files:**
- Create: `lib/site-config.ts`
- Test: `lib/site-config.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `siteConfig: { name: string; whatsappNumber: string; whatsappLink: string; email: string }`, imported by every section component from Task 5 onward as `import { siteConfig } from "@/lib/site-config"`.

- [ ] **Step 1: Write the failing test**

Create `lib/site-config.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("exposes the business name", () => {
    expect(siteConfig.name).toBe("Perfect Computers");
  });

  it("exposes the WhatsApp deep link built from the configured number", () => {
    expect(siteConfig.whatsappNumber).toBe("2349030658008");
    expect(siteConfig.whatsappLink).toBe(
      `https://wa.me/${siteConfig.whatsappNumber}`
    );
  });

  it("exposes the contact email", () => {
    expect(siteConfig.email).toBe("ifeanyiokoloma@gmail.com");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- site-config.test`
Expected: FAIL with "Cannot find module '@/lib/site-config'".

- [ ] **Step 3: Implement site-config.ts**

Create `lib/site-config.ts`:

```ts
const whatsappNumber = "2349030658008";

export const siteConfig = {
  name: "Perfect Computers",
  whatsappNumber,
  whatsappLink: `https://wa.me/${whatsappNumber}`,
  email: "ifeanyiokoloma@gmail.com",
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- site-config.test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/site-config.ts lib/site-config.test.ts
git commit -m "feat: add site config with WhatsApp and email contact details"
```

---

## Task 4: Case study & pricing data, placeholder images

**Files:**
- Create: `lib/case-studies.ts`
- Create: `lib/pricing.ts`
- Create: `public/case-studies/cometake.svg`
- Create: `public/case-studies/idikarh-properties.svg`
- Create: `public/case-studies/ijsr.svg`
- Create: `public/case-studies/savannah-spot.svg`
- Create: `public/case-studies/yunivax-sports.svg`
- Create: `public/case-studies/marketplace.svg`
- Test: `lib/case-studies.test.ts`
- Test: `lib/pricing.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `CaseStudy` type: `{ id: string; title: string; tagline?: string; problem: string; whatWasBuilt: string; standoutDetail: string; techStack: string[]; imageSrc: string; imageAlt: string; featured?: boolean }`, and `caseStudies: CaseStudy[]` (6 entries), consumed by the Work section (Task 8).
  - `PricingTier` type: `{ id: string; name: string; price: string; isPlaceholder: true; description: string; features: string[]; featured?: boolean }`, and `pricingTiers: PricingTier[]` (3 entries), consumed by the Pricing section (Task 10).

- [ ] **Step 1: Write the failing tests**

Create `lib/case-studies.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { caseStudies } from "@/lib/case-studies";

describe("caseStudies", () => {
  it("has exactly the 6 case studies from the brief", () => {
    expect(caseStudies).toHaveLength(6);
  });

  it("gives every case study the fields the Work section depends on", () => {
    for (const study of caseStudies) {
      expect(study.id).toBeTruthy();
      expect(study.title).toBeTruthy();
      expect(study.problem).toBeTruthy();
      expect(study.whatWasBuilt).toBeTruthy();
      expect(study.standoutDetail).toBeTruthy();
      expect(study.techStack.length).toBeGreaterThan(0);
      expect(study.imageSrc).toMatch(/^\/case-studies\//);
      expect(study.imageAlt).toBeTruthy();
    }
  });

  it("marks exactly two case studies as featured for the varied-size grid", () => {
    const featured = caseStudies.filter((s) => s.featured);
    expect(featured).toHaveLength(2);
    expect(featured.map((s) => s.id).sort()).toEqual([
      "savannah-spot",
      "yunivax-sports",
    ]);
  });
});
```

Create `lib/pricing.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { pricingTiers } from "@/lib/pricing";

describe("pricingTiers", () => {
  it("has exactly 3 tiers: Starter, Standard, Pro", () => {
    expect(pricingTiers.map((t) => t.id)).toEqual([
      "starter",
      "standard",
      "pro",
    ]);
  });

  it("marks exactly one tier as featured (Standard)", () => {
    const featured = pricingTiers.filter((t) => t.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].id).toBe("standard");
  });

  it("flags every price as a placeholder pending real rates", () => {
    for (const tier of pricingTiers) {
      expect(tier.isPlaceholder).toBe(true);
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- case-studies.test pricing.test`
Expected: both FAIL with "Cannot find module".

- [ ] **Step 3: Implement lib/case-studies.ts**

Create `lib/case-studies.ts`:

```ts
export interface CaseStudy {
  id: string;
  title: string;
  tagline?: string;
  problem: string;
  whatWasBuilt: string;
  standoutDetail: string;
  techStack: string[];
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cometake",
    title: "Cometake",
    problem:
      "Cometake needed a single storefront that worked the same way on the web and as a mobile app, without keeping two separate codebases in sync.",
    whatWasBuilt:
      "A mobile and web e-commerce app sharing one backend, so product listings, orders, and inventory stay in sync everywhere customers shop.",
    standoutDetail:
      "Customers can start browsing on the website and finish checkout in the app without losing their cart.",
    techStack: ["React Native", "Next.js", "Node.js"],
    imageSrc: "/case-studies/cometake.svg",
    imageAlt: "Placeholder cover image for the Cometake case study",
  },
  {
    id: "idikarh-properties",
    title: "Idikarh Properties",
    tagline: "Real Estate, Real Easy",
    problem:
      "Idikarh Properties needed a brand presence that made finding and enquiring about a listing feel effortless, matching their positioning.",
    whatWasBuilt:
      "A real estate brand site built around a browsable listings grid, property detail pages, and a direct enquiry path.",
    standoutDetail:
      "Every listing page is built to load fast on mobile data, where most property searches in Nigeria actually happen.",
    techStack: ["Next.js", "Tailwind CSS"],
    imageSrc: "/case-studies/idikarh-properties.svg",
    imageAlt: "Placeholder cover image for the Idikarh Properties case study",
  },
  {
    id: "ijsr",
    title: "International Journal of Spectrum Research",
    problem:
      "The journal needed a proper submissions pipeline instead of managing manuscripts over email.",
    whatWasBuilt:
      "An academic publishing platform with author submissions, full-text search and filtering, and a searchable archive of past issues.",
    standoutDetail:
      "Search and filtering were built to handle years of back issues without the archive page slowing down.",
    techStack: ["Next.js", "PostgreSQL", "Full-text search"],
    imageSrc: "/case-studies/ijsr.svg",
    imageAlt:
      "Placeholder cover image for the International Journal of Spectrum Research case study",
  },
  {
    id: "savannah-spot",
    title: "Savannah Spot",
    problem:
      "Local discovery in Nigerian cities is scattered across group chats and word of mouth. Savannah Spot needed a single place to browse hotels, gyms, and eateries.",
    whatWasBuilt:
      "A local discovery app with a premium glassmorphism interface, covering hotels, gyms, and eateries in one browsable, searchable experience.",
    standoutDetail:
      "The interface uses layered glass panels over real venue photography, a visual treatment few local discovery apps in the market use.",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    imageSrc: "/case-studies/savannah-spot.svg",
    imageAlt: "Placeholder cover image for the Savannah Spot case study",
    featured: true,
  },
  {
    id: "yunivax-sports",
    title: "Yunivax Sports",
    problem:
      "Football fans wanted live scores and match chat in one place, updating in real time instead of refreshing a page.",
    whatWasBuilt:
      "A real-time football platform combining live match scores with in-match chat, so fans follow and discuss a game as it happens.",
    standoutDetail:
      "Scores and chat messages both update over the same real-time connection, typically under a second behind the actual play.",
    techStack: ["Next.js", "WebSockets", "Node.js"],
    imageSrc: "/case-studies/yunivax-sports.svg",
    imageAlt: "Placeholder cover image for the Yunivax Sports case study",
    featured: true,
  },
  {
    id: "marketplace",
    title: "Multi-vendor marketplace",
    problem:
      "A multi-vendor marketplace needed each vendor to manage their own storefront while still sharing one checkout, payments, and wallet system.",
    whatWasBuilt:
      "A marketplace with per-vendor dashboards and role-based access, unified checkout via Paystack, an in-app wallet, and VTU airtime and data top-up built in.",
    standoutDetail:
      "Vendors get their own dashboard and permissions, but customers check out once, even when a cart spans multiple vendors.",
    techStack: ["Next.js", "Paystack", "Node.js"],
    imageSrc: "/case-studies/marketplace.svg",
    imageAlt: "Placeholder cover image for the multi-vendor marketplace case study",
  },
];
```

- [ ] **Step 4: Implement lib/pricing.ts**

Create `lib/pricing.ts`:

```ts
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  isPlaceholder: true;
  description: string;
  features: string[];
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₦XX,XXX",
    isPlaceholder: true,
    description: "A business website that gets you found online.",
    features: [
      "Up to 5 pages",
      "Mobile-friendly design",
      "WhatsApp contact built in",
      "1 round of revisions",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "₦XXX,XXX",
    isPlaceholder: true,
    description: "A website plus a working payment setup.",
    features: [
      "Everything in Starter",
      "Online store or booking flow",
      "Paystack integration",
      "2 rounds of revisions",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₦XXX,XXX+",
    isPlaceholder: true,
    description: "A web and mobile app built for growth.",
    features: [
      "Everything in Standard",
      "Native or cross-platform mobile app",
      "Play Store publishing",
      "Ongoing build support",
    ],
  },
];
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- case-studies.test pricing.test`
Expected: PASS.

- [ ] **Step 6: Create the placeholder case-study images**

Each image is an honest, clearly-labeled placeholder (never a fake screenshot), 1200x900, using the token colors from Task 2. Create all 6 files in `public/case-studies/` — the only difference between them is the title text on the second `<text>` line's neighbor and the filename.

`public/case-studies/cometake.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder image for Cometake">
  <rect width="1200" height="900" fill="#F6F7F9"/>
  <rect x="1" y="1" width="1198" height="898" fill="none" stroke="#E3E6EC" stroke-width="2"/>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="40" font-weight="600" fill="#0E1524" text-anchor="middle" dominant-baseline="middle">Cometake</text>
  <text x="600" y="490" font-family="system-ui, sans-serif" font-size="18" fill="#5B6472" text-anchor="middle" dominant-baseline="middle">Screenshot coming soon</text>
</svg>
```

`public/case-studies/idikarh-properties.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder image for Idikarh Properties">
  <rect width="1200" height="900" fill="#F6F7F9"/>
  <rect x="1" y="1" width="1198" height="898" fill="none" stroke="#E3E6EC" stroke-width="2"/>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="40" font-weight="600" fill="#0E1524" text-anchor="middle" dominant-baseline="middle">Idikarh Properties</text>
  <text x="600" y="490" font-family="system-ui, sans-serif" font-size="18" fill="#5B6472" text-anchor="middle" dominant-baseline="middle">Screenshot coming soon</text>
</svg>
```

`public/case-studies/ijsr.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder image for International Journal of Spectrum Research">
  <rect width="1200" height="900" fill="#F6F7F9"/>
  <rect x="1" y="1" width="1198" height="898" fill="none" stroke="#E3E6EC" stroke-width="2"/>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="34" font-weight="600" fill="#0E1524" text-anchor="middle" dominant-baseline="middle">Intl. Journal of Spectrum Research</text>
  <text x="600" y="490" font-family="system-ui, sans-serif" font-size="18" fill="#5B6472" text-anchor="middle" dominant-baseline="middle">Screenshot coming soon</text>
</svg>
```

`public/case-studies/savannah-spot.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder image for Savannah Spot">
  <rect width="1200" height="900" fill="#F6F7F9"/>
  <rect x="1" y="1" width="1198" height="898" fill="none" stroke="#E3E6EC" stroke-width="2"/>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="40" font-weight="600" fill="#0E1524" text-anchor="middle" dominant-baseline="middle">Savannah Spot</text>
  <text x="600" y="490" font-family="system-ui, sans-serif" font-size="18" fill="#5B6472" text-anchor="middle" dominant-baseline="middle">Screenshot coming soon</text>
</svg>
```

`public/case-studies/yunivax-sports.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder image for Yunivax Sports">
  <rect width="1200" height="900" fill="#F6F7F9"/>
  <rect x="1" y="1" width="1198" height="898" fill="none" stroke="#E3E6EC" stroke-width="2"/>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="40" font-weight="600" fill="#0E1524" text-anchor="middle" dominant-baseline="middle">Yunivax Sports</text>
  <text x="600" y="490" font-family="system-ui, sans-serif" font-size="18" fill="#5B6472" text-anchor="middle" dominant-baseline="middle">Screenshot coming soon</text>
</svg>
```

`public/case-studies/marketplace.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder image for the multi-vendor marketplace">
  <rect width="1200" height="900" fill="#F6F7F9"/>
  <rect x="1" y="1" width="1198" height="898" fill="none" stroke="#E3E6EC" stroke-width="2"/>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="40" font-weight="600" fill="#0E1524" text-anchor="middle" dominant-baseline="middle">Marketplace</text>
  <text x="600" y="490" font-family="system-ui, sans-serif" font-size="18" fill="#5B6472" text-anchor="middle" dominant-baseline="middle">Screenshot coming soon</text>
</svg>
```

- [ ] **Step 7: Commit**

```bash
git add lib/case-studies.ts lib/case-studies.test.ts lib/pricing.ts lib/pricing.test.ts public/case-studies
git commit -m "feat: add case study and pricing data with placeholder cover images"
```

---

## Task 5: Nav section

**Files:**
- Create: `components/sections/nav.tsx`
- Test: `components/sections/nav.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` from `lib/site-config.ts` (Task 3); `Button` from `components/ui/button.tsx` (Task 1); anchors `#services`, `#work`, `#pricing` (produced by Tasks 7/8/10) and `#top` (produced by Hero, Task 6).
- Produces: `Nav` component, rendered first in `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing test**

Create `components/sections/nav.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/sections/nav";
import { siteConfig } from "@/lib/site-config";

describe("Nav", () => {
  it("renders a WhatsApp CTA that links to the configured wa.me address", () => {
    render(<Nav />);
    const cta = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
  });

  it("renders the primary section anchor links", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#services"
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work"
    );
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "#pricing"
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- nav.test`
Expected: FAIL with "Cannot find module '@/components/sections/nav'".

- [ ] **Step 3: Implement the Nav component**

Create `components/sections/nav.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="text-lg font-semibold tracking-tight text-ink">
          {siteConfig.name}
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          className="rounded-full bg-signal text-white hover:bg-signal/90 active:scale-[0.98]"
        >
          <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- nav.test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/nav.tsx components/sections/nav.test.tsx
git commit -m "feat: add sticky nav with section anchors and WhatsApp CTA"
```

---

## Task 6: Hero section

**Files:**
- Create: `components/whatsapp-mockup.tsx`
- Create: `components/sections/hero.tsx`
- Test: `components/sections/hero.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 3), `Button` (Task 1), `.animate-fade-in-up` CSS class (Task 2).
- Produces: `Hero` component with `id="top"` (the Nav's wordmark anchor target), rendered second in `app/page.tsx` (Task 12). `WhatsappMockup` component, used only by Hero.

- [ ] **Step 1: Write the failing test**

Create `components/sections/hero.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/hero";
import { siteConfig } from "@/lib/site-config";

describe("Hero", () => {
  it("renders the headline as the page's h1", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Websites & Apps That Get Your Business Found, and Paid"
    );
  });

  it("renders a WhatsApp CTA that links to the configured wa.me address", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- hero.test`
Expected: FAIL with "Cannot find module '@/components/sections/hero'".

- [ ] **Step 3: Implement the WhatsApp mockup**

Create `components/whatsapp-mockup.tsx`:

```tsx
import { Check } from "lucide-react";

export function WhatsappMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-sm rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(14,21,36,0.04),0_12px_32px_rgba(14,21,36,0.08)]"
    >
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-sm font-semibold text-white">
          PC
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Perfect Computers</p>
          <p className="text-xs text-muted">Typically replies within an hour</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper px-3 py-2 text-sm text-ink">
          Hi, I saw your website. I need an online store for my shop.
        </div>
        <div className="ml-auto flex max-w-[85%] flex-col items-end gap-1">
          <div className="rounded-2xl rounded-tr-sm bg-signal/10 px-3 py-2 text-sm text-ink">
            Sure, let&apos;s talk about your store. What are you selling?
          </div>
          <span className="flex items-center gap-0.5 pr-1 text-muted">
            <Check className="h-3 w-3" strokeWidth={2.5} />
            <Check className="-ml-1.5 h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}
```

`aria-hidden="true"` because the mockup is a decorative illustration of what the CTA does, not real content — the accessible CTA text already conveys the same action.

- [ ] **Step 4: Implement the Hero component**

Create `components/sections/hero.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { WhatsappMockup } from "@/components/whatsapp-mockup";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:px-8"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Websites &amp; Apps That Get Your Business Found, and Paid
          </h1>
          <p className="mt-6 max-w-[46ch] text-base text-muted sm:text-lg">
            Full-stack web and mobile development, with Paystack and VTU
            integration experience.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-signal px-8 text-base text-white hover:bg-signal/90 active:scale-[0.98]"
            >
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <WhatsappMockup />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- hero.test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/whatsapp-mockup.tsx components/sections/hero.tsx components/sections/hero.test.tsx
git commit -m "feat: add hero section with WhatsApp chat-bubble signature moment"
```

---

## Task 7: Services section

**Files:**
- Create: `components/sections/services.tsx`

**Interfaces:**
- Consumes: `Globe`, `ShoppingCart`, `Smartphone`, `Wallet`, `RefreshCw` icons from `lucide-react`.
- Produces: `Services` component with `id="services"` (the Nav's "Services" anchor target), rendered third in `app/page.tsx` (Task 12).

No dedicated test file: this section is fully static (no links, no interactivity), which the spec's testing scope explicitly excludes from component-level tests. It is still covered by the full-page accessibility smoke test (Task 14).

- [ ] **Step 1: Implement the Services component**

Create `components/sections/services.tsx`:

```tsx
import { Globe, RefreshCw, ShoppingCart, Smartphone, Wallet } from "lucide-react";

const standardServices = [
  {
    icon: Globe,
    name: "Business Websites",
    description:
      "Landing pages and company sites that make a strong first impression.",
  },
  {
    icon: ShoppingCart,
    name: "Online Stores",
    description: "Full e-commerce storefronts with Paystack checkout built in.",
  },
  {
    icon: Smartphone,
    name: "Mobile Apps",
    description: "Android and iOS apps, including Play Store publishing.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Services
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {standardServices.map((service) => (
            <div
              key={service.name}
              className="rounded-xl border border-line bg-white p-6"
            >
              <service.icon className="h-6 w-6 text-indigo" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-semibold text-ink">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-6 sm:col-span-2">
            <Wallet className="h-6 w-6 text-indigo" strokeWidth={1.5} />
            <h3 className="mt-4 text-base font-semibold text-ink">
              Payments &amp; Wallets
            </h3>
            <p className="mt-2 text-sm text-muted">
              Paystack integration, in-app wallets, and VTU airtime and data
              top-up.
            </p>
          </div>
          <div className="rounded-xl border border-indigo/30 bg-indigo/5 p-6">
            <RefreshCw className="h-6 w-6 text-indigo" strokeWidth={1.5} />
            <h3 className="mt-4 text-base font-semibold text-ink">Care Plan</h3>
            <p className="mt-2 text-sm text-muted">
              A small monthly fee keeps your site updated, backed up, and
              supported.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: succeeds (the Services section isn't wired into `app/page.tsx` until Task 12, so this only verifies the file compiles standalone — TypeScript/ESLint will still check it).

Run: `npm run typecheck && npm run lint`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/sections/services.tsx
git commit -m "feat: add services section with Care Plan highlighted"
```

---

## Task 8: Work section

**Files:**
- Create: `components/sections/work.tsx`

**Interfaces:**
- Consumes: `caseStudies` from `lib/case-studies.ts` (Task 4); `next/image`.
- Produces: `Work` component with `id="work"` (the Nav's "Work" anchor target), rendered fourth in `app/page.tsx` (Task 12).

No dedicated test file, same reasoning as Task 7 (static content, covered by Task 14's full-page smoke test).

- [ ] **Step 1: Implement the Work component**

Create `components/sections/work.tsx`:

```tsx
import Image from "next/image";
import { caseStudies } from "@/lib/case-studies";

export function Work() {
  return (
    <section id="work" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Work
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className={`flex flex-col overflow-hidden rounded-xl border border-line bg-white ${
                study.featured ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-ink">{study.title}</h3>
                {study.tagline ? (
                  <p className="mt-1 text-sm italic text-muted">{study.tagline}</p>
                ) : null}
                <p className="mt-3 text-sm text-muted">{study.problem}</p>
                <p className="mt-2 text-sm text-ink">{study.whatWasBuilt}</p>
                <p className="mt-2 text-sm text-indigo">{study.standoutDetail}</p>
                <ul
                  className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted"
                  aria-label={`${study.title} tech stack`}
                >
                  {study.techStack.map((tech) => (
                    <li key={tech} className="rounded-md border border-line px-2 py-1">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Note: local images under `public/` work with `next/image` with zero extra `next.config` setup (no `remotePatterns` needed since nothing is fetched from an external domain).

- [ ] **Step 2: Verify typecheck and lint pass**

Run: `npm run typecheck && npm run lint`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/sections/work.tsx
git commit -m "feat: add work section rendering case studies in a varied-size grid"
```

---

## Task 9: Process section

**Files:**
- Create: `components/sections/process.tsx`

**Interfaces:**
- Consumes: nothing external.
- Produces: `Process` component, rendered fifth in `app/page.tsx` (Task 12).

No dedicated test file, same reasoning as Task 7.

- [ ] **Step 1: Implement the Process component**

Create `components/sections/process.tsx`:

```tsx
const steps = [
  {
    number: "1",
    title: "Consultation",
    description: "We talk through what you need and what success looks like.",
  },
  {
    number: "2",
    title: "Fixed quote & timeline",
    description:
      "You get a clear price and delivery date before any work starts.",
  },
  {
    number: "3",
    title: "Build with check-ins",
    description:
      "Regular updates as the site or app comes together, not a black box.",
  },
  {
    number: "4",
    title: "Launch + handover",
    description: "Your site goes live, and you get everything you need to run it.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="border-t border-line bg-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <span className="font-mono text-3xl font-semibold text-indigo">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

This is the only section that uses numbered markers, matching the spec's explicit "numbers only where it's a genuine sequence" rule.

- [ ] **Step 2: Verify typecheck and lint pass**

Run: `npm run typecheck && npm run lint`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/sections/process.tsx
git commit -m "feat: add process section with numbered 4-step sequence"
```

---

## Task 10: Pricing section

**Files:**
- Create: `components/sections/pricing.tsx`
- Test: `components/sections/pricing.test.tsx`

**Interfaces:**
- Consumes: `pricingTiers` from `lib/pricing.ts` (Task 4), `siteConfig` (Task 3), `Button` (Task 1).
- Produces: `Pricing` component with `id="pricing"` (the Nav's "Pricing" anchor target), rendered sixth in `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing test**

Create `components/sections/pricing.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pricing } from "@/components/sections/pricing";
import { siteConfig } from "@/lib/site-config";

describe("Pricing", () => {
  it("renders three tiers with WhatsApp CTAs linking to the configured wa.me address", () => {
    render(<Pricing />);
    const ctas = screen.getAllByRole("link", { name: /chat on whatsapp/i });
    expect(ctas).toHaveLength(3);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
    }
  });

  it("marks exactly one tier as most popular", () => {
    render(<Pricing />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- pricing.test`
Expected: FAIL with "Cannot find module '@/components/sections/pricing'".

- [ ] **Step 3: Implement the Pricing component**

Create `components/sections/pricing.tsx`:

```tsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 max-w-[60ch] text-sm text-muted">
          Starting prices below. Every project gets a fixed quote after a
          quick consultation.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-xl border p-6 ${
                tier.featured
                  ? "border-indigo bg-white shadow-[0_1px_2px_rgba(14,21,36,0.04),0_16px_40px_rgba(56,84,230,0.12)] sm:-mt-4 sm:mb-4"
                  : "border-line bg-white"
              }`}
            >
              {tier.featured ? (
                <span className="mb-3 inline-flex w-fit items-center rounded-md bg-indigo/10 px-2 py-1 text-xs font-medium text-indigo">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
              <p className="mt-2 font-mono text-3xl font-semibold text-ink">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className={`mt-6 rounded-full active:scale-[0.98] ${
                  tier.featured ? "bg-indigo text-white hover:bg-indigo/90" : ""
                }`}
              >
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- pricing.test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/pricing.tsx components/sections/pricing.test.tsx
git commit -m "feat: add pricing section with Standard tier emphasized"
```

---

## Task 11: Contact / Footer section

**Files:**
- Create: `components/sections/contact.tsx`
- Test: `components/sections/contact.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 3), `Button` (Task 1).
- Produces: `Contact` component with `id="contact"`, rendered last (outside `<main>`, as `<footer>`) in `app/page.tsx` (Task 12).

- [ ] **Step 1: Write the failing test**

Create `components/sections/contact.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/contact";
import { siteConfig } from "@/lib/site-config";

describe("Contact", () => {
  it("renders a WhatsApp CTA that links to the configured wa.me address", () => {
    render(<Contact />);
    const cta = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
  });

  it("renders a mailto link with the configured email", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: siteConfig.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${siteConfig.email}`);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- contact.test`
Expected: FAIL with "Cannot find module '@/components/sections/contact'".

- [ ] **Step 3: Implement the Contact component**

Create `components/sections/contact.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <footer id="contact" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something that works.
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-sm text-white/70">
          Message us on WhatsApp for a fast reply, or email if you prefer.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-signal px-8 text-base text-white hover:bg-signal/90 active:scale-[0.98]"
          >
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </Button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
          >
            {siteConfig.email}
          </a>
        </div>
        <p className="mt-12 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
```

This is the one deliberate dark (`--ink`) band on an otherwise light page, per the spec.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- contact.test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/contact.tsx components/sections/contact.test.tsx
git commit -m "feat: add contact/footer section as the dark closing band"
```

---

## Task 12: Root layout, page assembly, metadata & JSON-LD

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 5), `Hero` (Task 6), `Services` (Task 7), `Work` (Task 8), `Process` (Task 9), `Pricing` (Task 10), `Contact` (Task 11); `geist/font/sans` and `geist/font/mono`.
- Produces: the assembled `app/page.tsx` default export (consumed directly by Task 14's full-page test), and page-wide `<html>` font variables that make `font-sans`/`font-mono` (defined in Task 2) resolve to Geist.

- [ ] **Step 1: Implement the root layout**

Replace the contents of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const siteUrl = "https://perfectcomputers.com.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Perfect Computers | Websites & Apps for Nigerian Businesses",
  description:
    "Full-stack web and mobile developer building business websites, online stores, and apps for Nigerian small businesses, with Paystack and VTU integration experience.",
  openGraph: {
    title: "Perfect Computers",
    description:
      "Websites and apps that get your business found, and paid. Chat on WhatsApp for a fixed quote.",
    url: siteUrl,
    siteName: "Perfect Computers",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Computers",
    description: "Websites and apps that get your business found, and paid.",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Perfect Computers",
  url: siteUrl,
  email: "ifeanyiokoloma@gmail.com",
  areaServed: "NG",
  description:
    "Full-stack web and mobile development, payment and VTU integration for Nigerian small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Assemble the page**

Replace the contents of `app/page.tsx`:

```tsx
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Pricing />
      </main>
      <Contact />
    </>
  );
}
```

- [ ] **Step 3: Delete the default Next.js starter assets no longer used**

If `create-next-app` left `app/favicon.ico` alone, keep it. Remove any unused starter imports (e.g. leftover references to `next/image` logo assets) if `app/page.tsx` still imports them from before this step — the replacement above has none.

- [ ] **Step 4: Verify the app runs and looks right**

Run: `npm run dev`, open `http://localhost:3000`, and confirm: sticky nav, hero with chat mockup, services grid with Care Plan highlighted, work grid, 4-step process, pricing with Standard emphasized, and the dark contact band all render in order, and the "Chat on WhatsApp" buttons open `https://wa.me/2349030658008`.

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: assemble the full page with metadata and LocalBusiness JSON-LD"
```

---

## Task 13: Security headers, sitemap & robots

**Files:**
- Modify: `next.config.ts`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: response headers on every route; `/sitemap.xml` and `/robots.txt` routes.

- [ ] **Step 1: Add security headers**

Replace the contents of `next.config.ts`:

```ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

`style-src 'unsafe-inline'` is required because Tailwind/Radix-based components (via shadcn) rely on inline `style` attributes for positioning; there's no user-generated content on this static page, so the XSS surface this would otherwise guard against doesn't exist here. `'unsafe-eval'` and `ws:` are dev-only (Next.js's hot-reload client needs both) and are stripped in production.

- [ ] **Step 2: Add the sitemap**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://perfectcomputers.com.ng",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Add robots.txt**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://perfectcomputers.com.ng/sitemap.xml",
  };
}
```

- [ ] **Step 4: Verify headers and routes in production mode**

Run: `npm run build && npm run start` (in one terminal), then in another:

```bash
curl -sI http://localhost:3000 | grep -i "content-security-policy\|x-frame-options\|x-content-type-options\|referrer-policy"
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/robots.txt
```

Expected: all four security headers present; sitemap XML contains `perfectcomputers.com.ng`; robots.txt contains `Allow: /` and points at the sitemap. Stop the `npm run start` process afterward.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts app/sitemap.ts app/robots.ts
git commit -m "feat: add security headers, sitemap, and robots.txt"
```

---

## Task 14: Full-page accessibility smoke test

**Files:**
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `Home` default export from `app/page.tsx` (Task 12).
- Produces: nothing consumed by later tasks — this is the spec's required a11y gate.

- [ ] **Step 1: Write the test**

Create `app/page.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "@/app/page";

describe("Home page", () => {
  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has exactly one h1", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- page.test`
Expected: PASS. If `jest-axe` reports a real violation, fix the underlying markup in the relevant section component (do not suppress the rule) and re-run until it passes.

Note: if this is the first test to render a component using `next/image` (Task 8's `Work`), and it errors under jsdom rather than just warning, add a mock to `vitest.setup.ts`:

```ts
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));
```

(only add this if actually needed — `next/image` typically renders fine in jsdom without it).

- [ ] **Step 3: Commit**

```bash
git add app/page.test.tsx
git commit -m "test: add full-page accessibility smoke test with jest-axe"
```

---

## Task 15: README & final verification pass

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed by other tasks — this is the project's documentation and final gate.

- [ ] **Step 1: Write the README**

Create `README.md`:

```markdown
# Perfect Computers

Marketing site for Perfect Computers (perfectcomputers.com.ng), a single
page that turns Nigerian small business owners into a WhatsApp conversation.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Geist / Geist Mono (via the `geist` package)
- lucide-react

## Local setup

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Testing

\`\`\`bash
npm test          # run once
npm run test:watch
npm run typecheck
npm run lint
\`\`\`

## Before launch

- [ ] Replace placeholder pricing figures in `lib/pricing.ts` (`isPlaceholder: true`) with real ₦ rates.
- [ ] Replace placeholder case-study images in `public/case-studies/` with real screenshots, keeping the same filenames referenced in `lib/case-studies.ts`.
- [ ] Confirm `siteUrl` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` matches the production domain.

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repo at https://vercel.com/new.
3. No environment variables are required. The site is fully static content, no backend or database.
4. Vercel auto-detects Next.js; deploy with default settings.
5. Point the `perfectcomputers.com.ng` domain at the Vercel project under Project Settings → Domains.
```

- [ ] **Step 2: Run the full verification suite**

```bash
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

Expected: every command exits 0. Fix any failure before proceeding (do not skip or suppress).

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup, testing, and deploy instructions"
```

---

## Definition of Done (from the spec, for final confirmation)

- [ ] All seven sections (nav + 6 content sections) built, responsive from 360px up
- [ ] Real WhatsApp number and email wired in
- [ ] `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run format:check` all pass
- [ ] Cometake case study shown in full
- [ ] Pricing figures clearly flagged as placeholders pending real rates
- [ ] Case-study images clearly placeholder-swappable pending real assets
- [ ] README documents local setup and deploy steps
