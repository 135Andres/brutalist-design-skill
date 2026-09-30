# Glossary

> **Status: new** (collects definitions from the closed `recreate` spec and the other
> reference files; no new rules).

The one home for the skill's vocabulary. Other files link here instead of redefining.

## Evidence states — for properties read from a reference

| State | Meaning |
|---|---|
| `observed` | directly visible: legible text, a proportion in pixels |
| `measured` | computed from observed pixels with a declared, repeatable rule |
| `estimated` | a visual judgement; method stated, low confidence by default; never presented as `measured` |
| `ambiguous` | more than one reading is possible; all are listed |
| `unknown` | cannot be determined from the reference |

## Your own contributions

| Marker | Meaning |
|---|---|
| `INFERENCE` | a reading about something not visible (e.g. "this cropped, repeated text suggests a marquee"); linked to the trait it reads |
| `DECISION` | something you chose: states the reason, the confidence and what it affects; has no evidence state |

Never mix the three kinds in one list: an inventory has **Reference**, **Inferences** and
**Assumptions & decisions** as separate parts.

## Report columns

One row per element: element · dimension · **action** · **fidelity** · **state** ·
evidence · method. No totals, percentages or scores.

| Action | Meaning |
|---|---|
| `BUILT` | built from the reference |
| `SUBSTITUTED` | replaced by an equivalent (e.g. a substitute font) |
| `ADDED` | not in the reference, added without changing its look at rest (semantics, focus ring, alt text, reduced motion) or as a separate variant |
| `INVENTED` | not in the reference, designed by you (e.g. motion from a static image, the mobile layout) |
| `OMITTED` | left out, with the reason |

| Fidelity | Meaning |
|---|---|
| `REPRODUCED` | matches under the recorded conditions (not "identical") |
| `APPROXIMATE` | visible difference, still recognizable; for an identity effect, also a serious loss |
| `DIVERGENT` | does not match |
| `NOT COMPARED` | no comparison was done (a fact about the process) |
| `—` | no counterpart in the reference |

## Effects

- **Ladder / rung** — the three levels of technique: 1 native browser, 2 animation
  library, 3 WebGL/shaders. See [effects](effects.md).
- **Identity effect** — without it the reference is no longer recognizable.
- **Decoration** — every other effect.
- **Cost vs permission** — the rung an effect *needs* vs the rung you *may* use; see
  [effects](effects.md).

## Rights

- **Study** — a recreation whose rights are unknown; its files are marked
  `study — not for publication`.

## Field terms

Definitions only; no rules. Positions built on them: [field-map](field-map.md).

- **Béton brut** — concrete cast in place that keeps the imprint of its formwork (Le Corbusier).
- **Art brut** — "raw art" (Dubuffet); one root of the new brutalism according to Banham.
- **As found** — valuing materials for their inherent qualities, without disguising them.
- **Image (Banham)** — what, once seen, affects the emotions; not classical beauty.
- **New brutalism** — the 1950s programme of the Smithsons and Banham; at once a label and a banner.
- **Brutalism (style)** — later label for architecture of exposed concrete.
- **Je-m'en-foutisme** — an attitude of indifference that Banham counts as central.
- **Web brutalism** — the aesthetic and technical reaction on the web since 2014.
- **Purists, UX minimalists, anti-ists** — Deville's micro-styles, as reported by O'Brien.
- **L'Internet brut / fou** — O'Brien's two kinds of web brutalism.
- **Brutalism / Antidesign (NN/g)** — a distinction by intent and effect.
- **Neobrutalism** — interface style with a thick border, an offset shadow without blur and a flat fill.

