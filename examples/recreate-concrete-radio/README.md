# Worked example — `recreate` on "Concrete Radio"

One complete run of [`recreate`](../../skill/brutalist/references/recreate.md), from a
single PNG to a working page, with every number traceable to a command.

| Reference | Build (frozen at t = 0) | Difference |
|---|---|---|
| ![reference](../references/ref-a-concrete-radio.png) | ![build](screens/build.png) | ![difference blend](screens/overlay-diff.png) |

In the difference image, black means identical; the light outlines are where reference
and build disagree — mostly the headline, a few pixels off.

## Read it in this order

1. [`inventory.md`](inventory.md) — what the image shows, measured before any code:
   Reference (with evidence states), Inferences, Assumptions & decisions.
2. [`build/index.html`](build/index.html) — the page, built from the inventory.
3. [`motion-plan.md`](motion-plan.md) — the marquee: the reference is static, so the motion
   is declared invention.
4. [`report.md`](report.md) — one row per element (action, fidelity, state, evidence), the
   two adjustment rounds, what was and was not verified, and the limitations.
5. [`commands.md`](commands.md) — how to reproduce every number.

## What it demonstrates

- Grid, palette and type sizes **measured from pixels** with
  [`find_rules`](../../skill/brutalist/scripts/find_rules.py),
  [`sample_palette`](../../skill/brutalist/scripts/sample_palette.py) and
  [`ink_bbox`](../../skill/brutalist/scripts/ink_bbox.py).
- Fonts identified by **calibration** (candidates rendered and measured), and still marked
  `ambiguous` where the measurement cannot separate them.
- Comparison under fixed conditions with [`overlay.html`](../../skill/brutalist/scripts/overlay.html),
  **at most two rounds**, and the rest reported instead of hidden — including a regression
  and a missing 1 px line.
- Motion inferred from a trait ("text cut at the edge"), adopted as a decision, with a pause
  mechanism that does not change the look at rest.
- An accessibility pass: axe-core, keyboard, 320 px reflow, 200 % zoom, reduced motion, no
  JavaScript.

## Limitation

The same agent wrote the reference and did the recreation, in one session. The reference's
source was not opened during the recreation and every value comes from the PNG, but the
knowledge is not independent. Treat this as a demonstration of the method and its files,
not as evidence of how well the skill recreates a design it has never seen.
