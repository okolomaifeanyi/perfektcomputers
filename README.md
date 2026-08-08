# Perfekt Computers

Marketing site for Perfekt Computers (perfektcomputers.com.ng), a single
page that turns Nigerian small business owners into a WhatsApp conversation.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Geist / Geist Mono (via the `geist` package)
- lucide-react
- Dark mode: automatic, via `prefers-color-scheme` (no toggle, no JS) - see
  `docs/superpowers/specs/2026-08-08-dark-mode-contrast.md` for the token
  design and contrast math

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Testing

```bash
npm test          # run once
npm run test:watch
npm run typecheck
npm run lint
```

## Before launch

- [x] Real pricing figures are set in `lib/pricing.ts` (named constants at
      the top of the file: `starterPrice`, `standardPrice`, `proPrice`,
      `carePlanPrice`).
- [x] All case-study images in `public/case-studies/` are real screenshots.
- [ ] Confirm `siteConfig.url` in `lib/site-config.ts` matches the production domain (it's the single source of truth for `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`).
- [ ] `perfekthub.vercel.app` case study is on hold pending confirmation of what that project actually is - the live page's content didn't match either "Perfekt Hub" or an existing case study when checked.

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repo at https://vercel.com/new.
3. No environment variables are required. The site is fully static content, no backend or database.
4. Vercel auto-detects Next.js; deploy with default settings.
5. Point the `perfektcomputers.com.ng` domain at the Vercel project under Project Settings → Domains.
