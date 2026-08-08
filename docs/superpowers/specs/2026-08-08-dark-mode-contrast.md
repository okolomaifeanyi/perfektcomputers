# Dark Mode: Token Split and Contrast Rationale

Date: 2026-08-08

## Why `--ink` couldn't just flip

The obvious approach to dark mode is redefining each token's dark value and
letting everything using it adapt automatically. That works cleanly for
`--paper` (background) and the new `--fg`/`--surface` tokens, but `--ink`
is used in the codebase for two unrelated things:

1. **Page text color** (`text-ink` on headings, body copy, card content) -
   this should genuinely go light in dark mode.
2. **Fixed dark text on a solid accent fill** (`bg-gold text-ink` on every
   CTA button, `bg-signal text-ink` on the WhatsApp mockup avatar) and
   **the Contact footer's always-dark background** (`bg-ink`) - these must
   stay exactly as dark as they are today, in both themes, or the WCAG
   contrast fixes from earlier in the build break immediately. `bg-gold
   text-white` was already proven to fail at 2.1:1 (see
   `2026-08-07-gold-rebrand-contrast.md`); flipping `--ink` to a light
   value in dark mode would reintroduce exactly that failure on every CTA.

So `--ink` stays a fixed, non-adaptive token (role 2), and a new `--fg`
token was introduced for role 1. In light mode `--fg` equals `--ink`
exactly (`#0e1524`), so nothing visually changes for light-mode users; in
dark mode `--fg` becomes `#f2f4f7` while `--ink` stays `#0e1524`.

## The three `hover:text-ink` cases that needed the same fix

Three components use `hover:text-ink` to darken text on hover
(`nav.tsx` link hover, `work.tsx`'s "Visit site" link hover,
`pricing.tsx`'s outline-tier button hover). These are text sitting on the
*ambient page/card background*, not a solid accent fill - in dark mode
that background is dark, so hovering to a fixed dark `--ink` would produce
dark-on-dark, invisible text. All three were changed to `hover:text-fg`,
which correctly resolves to a light color in dark mode.

## Computed contrast ratios (dark mode)

| Pair | Ratio |
|---|---|
| `--fg` on `--paper` (body text) | 17.37:1 |
| `--fg` on `--surface` (card text) | 15.75:1 |
| `--muted` on `--paper` | 7.52:1 |
| `--muted` on `--surface` | 6.82:1 |
| `--gold-deep` on `--paper` (links/icons) | 9.10:1 |
| `--gold-deep` on `--surface` | 8.25:1 |
| `--signal` on `--paper` (decorative wave) | 9.65:1 |

All comfortably clear WCAG AA (4.5:1) and AAA (7:1) for text. `--ink` on
`--gold`/`--signal` (button labels) is unaffected by dark mode since
neither token changes value - it stays at the 8.67:1/9.20:1 already
verified in the light-mode work.

`--gold-deep` converges to the same value as `--gold` in dark mode: it was
only deepened to survive *light* backgrounds (bright gold measures 1.96:1
there); against the dark background, bright gold itself measures 9.10:1,
so there's no need to keep it artificially dim.

`--line` (borders, ~1.2-1.35:1 against the dark surfaces) and `--surface`
vs `--paper` (~1.10:1, the card "lift") are both well under the 3:1
non-text UI threshold, same as their light-mode counterparts. Both are
decorative dividers/elevation cues, not required to convey information on
their own (spacing and shadow/border combine to indicate card boundaries),
matching the precedent already shipped in light mode.

## Mechanism

Pure `@media (prefers-color-scheme: dark)` redefinition of the CSS custom
properties in `:root` - no `.dark` class, no toggle, no JavaScript. Every
component already reads colors through the named Tailwind utilities
(`bg-paper`, `text-fg`, etc.) which compile to `var(--paper)` / `var(--fg)`,
so redefining the variables' values inside the media query is sufficient
for the whole site to adapt automatically. This was the explicit intent
behind the original token architecture ("tokens are named CSS variables so
[dark mode] is a clean future add-on, not a rework" - original design
spec) and it held up: no component needed a `dark:` variant class for any
of the token-backed colors, only for the two literal (non-tokenized)
box-shadow rgba values, which don't read as elevation cues against an
already-dark background and are suppressed via `dark:shadow-none`.
