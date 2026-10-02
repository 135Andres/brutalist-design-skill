# resources — pointers only

> **Status: under review.** A resource is listed only if it changes a section of the
> skill; what matters is folded into that section, and only the pointer and license stay
> here.

The skill depends on none of these at runtime. The column "Consulted by" names the section
that *points here*; the skill text itself names no tool (only the concept from Kinetics is
folded in, in [motion](motion.md) §2). Style catalogs: study them to name the
default you are subverting; never clone a catalog style as the design.

| Use | Resource | Consulted by | License (as recorded 2026-09-29) |
|---|---|---|---|
| Describing motion as spring parameters (concept only) | kinetics.colorion.co · github.com/ckissi/kinetics | [motion](motion.md) §2 | **none found** (no LICENSE file, no package.json field, not in README) → all rights reserved: do not copy code or parameter values |
| Rung-1 type effects | text-effects.colorion.co · github.com/ckissi/colorion-text-effects | [effects](effects.md) | **declared MIT** in its README and site footer; **no LICENSE file** in the repo |
| Rung-2 option, framework-agnostic | animejs.com | [motion](motion.md) §4 | verify at time of use |
| Real motion to observe; animated source for study | scrolltide.co | [motion](motion.md) §0; test corpus | "© 2026 Scrolltide. All rights reserved.", mostly paid: study only |
| Focus and semantics conventions | component.gallery | [accessibility](accessibility.md) | verify at time of use |
| `DESIGN.md` format (if export is adopted) | designmd.ai | [recreate](recreate.md) §8 | verify at time of use |
| Flat captures for recreate tests | minimal.gallery, appshot.gallery | test corpus | verify at time of use |
| Open typefaces (most under the OFL; some Apache 2.0 or UFL) | github.com/google/fonts · openfontlicense.org | [craft](craft.md), all styles | per font; "most" OFL-1.1 per the README (as recorded 2026-10-01) |
| Monospace and pixel fonts | JetBrains Mono · IBM Plex Mono · Space Mono · Press Start 2P | [craft](craft.md) Terminal, Webcore | OFL-1.1 (JetBrains Mono from its README; the others from package pages) |
| Experimental display fonts | velvetyne.fr · collletttivo.it · open-foundry.com | [craft](craft.md) Rave, Antidesign | **per font**; foundry-wide licence not found: read each font's licence |
| Retro desktop UI stylesheets | 98.css · XP.css | [craft](craft.md) Webcore, Y2K | MIT (READMEs) |
| Neobrutalist components (React, Tailwind) | github.com/ekmas/neobrutalism-components | [craft](craft.md) Neobrutalism | MIT (README); **no longer maintained** |
| Dithering, pixel and ASCII tools | Dither Studio · Image-to-Pixel · Retrofy · unsafe0x0/dither · img2ascii-py | [craft](craft.md) Efficiency, Antidesign, Terminal | MIT (READMEs; Image-to-Pixel's app Apache-2.0) |
| Textures | polyhaven.com · ambientcg.com | [craft](craft.md) Antidesign, Rave | CC0 per secondary guides; **verify at the source** |
| Study only (never copy assets) | brutalistwebsites.com · webdesignmuseum.org · cari.institute · frutigeraeroarchive.org · 88×31 button archives · Cameron's World | [craft](craft.md), [inspire](inspire.md) | CARI: "not a source of free assets"; the others: none found → study only |
| Shader backgrounds sold as components | Framer marketplace (e.g. Liquid Chrome) | [craft](craft.md) Rave, Y2K | single-use licence, no redistribution: do not copy |
| Contrast on gradients and images; reduced motion; flashing; compositor-only animation | webaim.org/articles/contrast · W3C Technique C39 · W3C Understanding 2.3.1 · web.dev/animations-guide | [craft](craft.md), [accessibility](accessibility.md) | reference reading |
| Default aesthetic to subvert; bank of mechanics | magicui, aceternity, animate-ui, 21st.dev, shadcn/ui, uiverse | [inspire](inspire.md), [critique](critique.md) | verify at time of use |

Notes:
- The subset of text effects useful for brutalism (glitch, sliced, split-flap,
  dot-matrix, LED, barcode, pixel-sort, CRT) versus aurora/glass/neon is a **taste
  heuristic**, not a property of the library.
- text-effects: the site says 90 effects, the repo README says 81 (unresolved).
- Reviewed and excluded (they change no section): kage.design, vibeprompts.dev, rtk,
  glass.samasante, gradientbuttons, circleloaders, 3dicons, mapcn, navbar/footer/cta/404
  galleries, microkit, uiable, kitbitz, styles.refero.
