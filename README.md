# Perfect Computers

Marketing site for Perfect Computers (perfectcomputers.com.ng), a single
page that turns Nigerian small business owners into a WhatsApp conversation.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Geist / Geist Mono (via the `geist` package)
- lucide-react

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

- [ ] Replace placeholder pricing figures in `lib/pricing.ts` (`isPlaceholder: true`) with real ₦ rates.
- [ ] Replace placeholder case-study images in `public/case-studies/` with real screenshots, keeping the same filenames referenced in `lib/case-studies.ts`.
- [ ] Confirm `siteUrl` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` matches the production domain.

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repo at https://vercel.com/new.
3. No environment variables are required. The site is fully static content, no backend or database.
4. Vercel auto-detects Next.js; deploy with default settings.
5. Point the `perfectcomputers.com.ng` domain at the Vercel project under Project Settings → Domains.
