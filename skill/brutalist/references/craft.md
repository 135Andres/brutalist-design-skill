# craft — how each style is built

> **Status: experimental**, from a research compiled 2026-10-01; most of it rests on tutorials
> and vendor guides (grade B), and practitioner methods were not found for several styles
> (marked). When it is loaded: [SKILL.md](../SKILL.md). Methods here are starting points, not
> rules: the user's words win.

What this file adds: a sourced order of work and the lowest rung of the
[effects ladder](effects.md) for each trait, so the agent does not improvise methods. Tools
are named only in [resources](resources.md); accessibility rules live in
[accessibility](accessibility.md) and are not repeated, only the style-specific risks.

## Shared methods (every style)

1. **Content and body text first.** Plain text that reads well (size, line spacing, line
   length), then the style on top. Style only to solve a problem you can name.
2. **Real text, never images of text** (1.4.5). Distort art, not information.
3. **One readable panel on a dense page**: time, place, price, the main action, body copy —
   opaque or high-tint, never straight on a pattern, gradient or translucent surface.
4. **Write the style as a few tokens first** (custom properties: border, shadow, fill;
   chrome gradient; mono font) and reuse them.
5. **Lowest rung that works.** CSS and SVG first; animate only `transform` and `opacity` where
   possible (blur, shadow and filter repaint); WebGL only for fluid shaders.
6. **Measure contrast at the worst area** of a gradient, texture or translucent surface.
7. **Gate motion**: reduced motion, a pause, no flashing above 2.3.1 ([accessibility](accessibility.md)).
8. **Archives and galleries are for study.** Draw your own badges, tiles and ornaments;
   copy code or fonts only under a licence that allows it ([resources](resources.md)).

## Per style

### Brutalism (and Swiss)
- **Order:** the plain page (black left-aligned text on white, real links and buttons) →
  decide the "raw material" ([field-map](field-map.md)) → grid → type scale → the one
  decoration the page justifies. `INFERENCE`: the order is assembled from Copeland and the
  Swiss definition; no practitioner wrote it out.
- **Traits:** visible grid and lines — CSS Grid, borders, `<hr>`; Swiss asymmetry —
  `grid-template-columns` with unequal tracks, type with `clamp()`. No rung above 1.
- **Mistakes:** rawness read as neglect (the original ethic demanded relentless coherence);
  "no CSS at all" is not the method.
- **Cost:** cheap to produce and serve (only Efficiency is lighter to serve).

### Efficiency (and Low-tech)
- **Order (Low-tech Magazine's own build):** a static site → default typefaces (omit
  `font-family`) and no logo image → dither images at build time → no tracking, ads or cookies.
  They report a page five times lighter and image weight cut by 89% (their numbers only).
- **Traits:** system fonts; dithered images pre-processed; a tiny classless stylesheet; no JS.
- **Mistakes:** dithering images that need colour; treating "light" as the look alone (a
  light page can still read badly).
- **Risks:** dithered images still need `alt` and contrast for any text on them.

### Antidesign (and Glitch, New Ugly)
- **Order (`INFERENCE`; no practitioner method found):** build a readable, accessible page
  first, then add the rule-breaking layer, and keep a way to switch it off.
- **Traits:** overlap — several items in one grid area, `mix-blend-mode`; RGB split — two
  `aria-hidden` duplicates (pseudo-elements or spans) moved with `transform` and sliced with
  `clip-path`; warped text or noise — inline SVG `feTurbulence` + `feDisplacementMap` via
  `filter: url(#id)`; corrupted images — pre-processed assets; heavy distortion — WebGL.
- **Mistakes:** effects with no concept (Menkman: easy effects turn into fashion);
  breaking hierarchy or navigation, not only the look (NN/g).
- **Risks:** a duplicate made with `content: attr(...)` may be read aloud — test it, or use
  `aria-hidden` spans; animated `clip-path` and SVG filters repaint, so "60 fps" claims in
  tutorials are unproven.

### Neobrutalism
- **Order:** three tokens (a 2–5 px border, a hard offset shadow with 0 blur, a flat fill) →
  a palette → hierarchy (headline, support text, main action) kept obvious.
- **Traits:** `border`, `box-shadow: 4px 4px 0`; pressed button — `transform` by the shadow
  offset and remove the shadow; marquee — CSS animation with a pause. No rung above 1.
- **Mistakes:** one size for everything (flattened hierarchy); subtle shadows and light
  colours, which hurt low-vision users; the border used as the only focus state.
- **Contested:** vendors say the style is high-contrast by construction; an accessibility
  expert warns about light palettes. Measure.

### Y2K (and Frutiger Aero)
- **Order:** build each material as its own recipe — chrome type, glossy button, translucent
  panel, ornament — as tokens, then compose.
- **Traits:** chrome text — `background-clip: text`, transparent colour, a gradient with a
  **hard white highlight band** (without it, it reads as grey); `text-shadow` fights
  `background-clip`. Gloss — a sharp colour step at mid-height plus a top highlight.
  Translucent panel — an `rgba()` fill, `backdrop-filter: blur()` kept modest, an `@supports`
  fallback with a solid fill. Refraction ("liquid glass") — SVG inside `backdrop-filter`,
  Chromium only: skip unless needed. Starbursts — `clip-path: polygon()` on a gradient. 3D
  icons — image assets.
- **Mistakes:** chrome as a plain grey gradient; over-blurring ("frosted glass, not Aero");
  text baked into images.
- **Risks:** a translucent panel has no fixed contrast ratio; use a strong tint under the
  blur. `backdrop-filter` is costly over large areas; a pre-blurred image behind a plain
  translucent panel keeps the look for less.

### Rave
- **Order:** use the look chosen from [field-map](field-map.md) (both offered; a `DECISION` if
  the user did not choose). Flyer: mismatched letters, wavy
  vector lines, few colours. Acid graphics: chrome type, distorted portraits, 3D. Either way,
  distort the art (SVG or pre-processed raster) and keep every fact as live HTML in one
  readable panel.
- **Traits:** fluorescent fields — CSS colour, gradients, `mix-blend-mode`; warped type —
  SVG displacement on live text, or a raster for purely decorative words; collage — grid
  overlap and positioned images; fluid backgrounds — WebGL (the one place it is justified),
  paused off-screen, with a still fallback.
- **Mistakes:** no readable panel; mixing the two looks unintentionally; strobing cuts.
- **Cost:** the costliest style here when shaders are used; a pre-rendered loop with a still
  under reduced motion is the lighter route.

### Webcore
- **Order:** hand-written HTML with no build step (the revival's own way of working) →
  background tile → content in simple boxes → ornaments (badges, counters, signs) drawn for
  this page, after studying archives.
- **Traits:** tiled background — a small repeating `background-image`; pixel images —
  `image-rendering: pixelated`; marquee — a CSS animation with a pause, not `<marquee>`;
  Windows-style UI — a classless retro stylesheet ([resources](resources.md)).
- **Mistakes:** pastiche that does not know what it quotes; copying archive GIFs, whose
  rights are unclear.
- **Risks:** fast-blinking GIFs (2.3.1); body text straight on a tile; give badges `alt`.

### Terminal
- **Order:** the monospace column is the grid → dark base with phosphor green or amber →
  text-native graphics (ASCII, box-drawing, brackets) → effects last and faint.
- **Traits:** monospace stack; box-drawing characters (check the font covers them) or 1 px
  borders; scanlines — a `repeating-linear-gradient` overlay with `pointer-events: none`;
  glow — subtle `text-shadow`; cursor — CSS blink, static under reduced motion; typewriter —
  CSS `steps()` or JS, shown at once under reduced motion; ASCII images — pre-rendered.
- **Mistakes:** dim "secondary" greens that fail 4.5:1; scanlines over content; a web app with
  ASCII decoration rather than a page that reads like a terminal.
- **Risks:** a fake command line still needs real form controls and visible focus. All
  sources for this style are grade B.

## Cost to produce and serve (`INFERENCE`, except Low-tech's own numbers)

| Style | Produce | Serve |
|---|---|---|
| Brutalism, Swiss, Neobrutalism, Terminal | cheap | cheap |
| Efficiency, Low-tech | cheap | cheapest |
| Webcore | cheap | light to moderate (GIFs, tiles) |
| Antidesign, Glitch | moderate | cheap to moderate (SVG filters, blur) |
| Y2K, Frutiger Aero | moderate | moderate (`backdrop-filter`, image assets) |
| Rave | costly | costly with WebGL |

## Not found by the research

Practitioner methods for Swiss on the web, New Ugly, Rave on the web, Terminal and
Antidesign; measured costs of SVG filters, `backdrop-filter`, shaders and glitch effects;
whether duplicated pseudo-element text is announced by screen readers.
