# Gold Rebrand: Contrast Rationale

Date: 2026-08-07

## Why two gold tokens

The brand logo (`logo.png`) uses a bright metallic gold (~`#D4AF37`) ring on
a dark navy badge. Using that same bright gold as the site's new accent
color (replacing the earlier `--indigo`) runs into WCAG contrast failures
that the earlier indigo token didn't have, because gold is a much
lighter/higher-luminance color than indigo was.

Computed contrast ratios (WCAG 2.x relative-luminance formula):

| Color | vs `--paper` (#F6F7F9) | vs white | ink-on-color (fill use) |
|---|---|---|---|
| `#D4AF37` (bright gold) | 1.96:1 | 2.10:1 | 8.67:1 |
| `#8A6A1D` (deep gold) | 4.71:1 | 5.05:1 | 3.61:1 |

AA requires 4.5:1 for normal text, 3:1 for large text and non-text UI
components (borders, focus rings, icons conveying meaning).

Bright gold (`#D4AF37`) **fails** as text or a focus ring on the site's
light paper/white surfaces (1.96-2.10:1). It only works when something
dark (ink) sits on top of it as a fill, or when it's placed on the dark
navy footer band.

Deep gold (`#8A6A1D`) passes as text/ring on light surfaces (4.71-5.05:1),
but is too close in darkness to ink to give strong ink-on-gold fill
contrast (3.61:1) - it reads as bronze/brown rather than gold when used as
a large fill.

## The rule

- **`--gold`** (`#D4AF37`): fills and tints where ink or a dark background
  sits on top or behind (badge backgrounds, icon-chip tints at low
  opacity, decorative glows, the featured pricing button's background,
  focus rings on the dark footer band).
- **`--gold-deep`** (`#8A6A1D`): anything rendered as text or a focus ring
  directly on `--paper`/white (links, small accent text, the process step
  numerals, focus rings in the light-background nav).

This mirrors the fix already applied to the WhatsApp CTA earlier in the
build (`text-white` on `bg-signal` measured 1.98:1 and was flipped to
`text-ink` at 9.20:1) - same failure mode, same fix shape, caught before
shipping this time by computing the ratios up front instead of after a
review flagged it.
