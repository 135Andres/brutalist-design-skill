# Inventory — <slug>

> Template. The rows below are **illustrative examples** — replace them. Vocabulary: [glossary](../references/glossary.md).

Reference: `<path or URL>` · Rights: <user's statement, or "unknown → study — not for publication">
Classification: <flat screenshot | photo of a screen | device mockup | scan/print | 3D render | poster/collage> (per region if mixed)

## Reference

| Dimension | Value | State | Method |
|---|---|---|---|
| Canvas | 1440 × 900 px (1.6 : 1) | `observed` | pixel size of the image |
| Grid | columns at 0.18 / 0.64 / 0.18 of width | `measured` | edges of column rules, 3 samples |
| Vertical rhythm | unit = body line height; gaps 2u, 4u | `measured` | … |
| Text · headline | "LITERAL TRANSCRIPTION" | `observed` | — |
| Type · headline | condensed grotesk, heavy, uppercase, tight tracking | `observed` | — |
| Type · headline family | candidates: A, B | `ambiguous` | — |
| Palette | #111111 ink (flat patch, 4 812 px) | `measured` | `sample_palette`, median |
| Effect · ticker | role: identity | `observed` | — |
| States (hover, focus…) | — | `unknown` | not visible in a still |
| Outside the crop | — | `unknown` | — |
| Trait suggesting motion | text cut at the right edge and repeated | `observed` | — |

## Inferences

| # | Reading | From trait | Note |
|---|---|---|---|
| I1 | suggests a horizontal marquee | "text cut … repeated" | behaviour stays `unknown` |

## Assumptions & decisions

| # | Decision | Reason | Confidence | Affects |
|---|---|---|---|---|
| D1 | assume 1440 CSS px, DPR 1 | typical desktop capture | medium | build, comparison |
| D2 | substitute font X for headline | original not identifiable | medium | line breaks → compensated with tracking |
| D3 | adopt I1 (marquee) | — | — | motion plan |
