# recreate — rebuild a reference image as an interface

> **Status: specified** (closed, rev. 5). Vocabulary:
> [glossary](glossary.md). Loads, without repeating them: [effects](effects.md),
> [motion](motion.md), [accessibility](accessibility.md), [verify](verify.md).

Input: one or more images. Output: `recreations/<slug>/` (step 8). Reproduce
faithfully; do not lecture the user about originality.

## 0. Rights — before measuring anything

- Literal reproduction is fine when: it is the user's own design; a license allows it; it
  is public domain; it is a study exercise not published as one's own work.
- Always out of bounds: publishing another brand's distinctive identity as one's own
  (logo, wordmark, brand screens, copyrighted copy).
- Unknown rights: recreate it as a **study**; mark the files `study — not for
  publication` and say so in the report. What to do with the result is the user's call;
  do not redirect them to another command.
- This step is legal hygiene that protects the user, not a creativity mandate.
- The skill does not verify licenses; it records what the user states.

## 1. Classify the reference

Per image and, if mixed, per region: flat screenshot · photo of a screen · device mockup
(perspective) · scan/print · 3D render or composition · poster/collage (not UI).

- Measure grid and type metrics **only in flat-screenshot regions**; elsewhere record
  observed character, not measurements.
- Example: a flat screenshot with 3D-rendered regions (a logo in blocks, a tower): measure
  the sidebar, not the tower.
- If the image is not UI, which parts are navigable is invention, and is labelled so.

## 2. Inventory — `inventory.md`, before any code, in three parts

Template: [inventory](../templates/inventory.md).

**Reference**
- Canvas: pixel proportion, `observed`.
- Horizontal grid: fractions of the width, `measured` (invariant to DPR and scale) with
  `scripts/find_rules.py`; px only when DPR is known.
- Vertical rhythm: a scale relative to an observed unit (body line height or x-height),
  not a percentage of the width.
- Text: literal transcription (case, line breaks, punctuation), `observed`;
  `[illegible]`; partial readings are `ambiguous` with candidates.
- Type per role: classification, weight, case, tracking, relative size,
  `observed`/`measured` (sizes with `scripts/ink_bbox.py`). Identification: `observed` if unmistakable, otherwise
  `ambiguous` with candidates.
- Palette: `scripts/sample_palette.py` records region, pixel count and method (median of
  a flat patch / cluster) → `measured`; caveats: antialiasing, color profile, compression,
  gradients. By eye → `estimated`, method "visual".
- Effects: each with its role (identity/decoration) and cost ([effects](effects.md)).
- States (hover, focus, active, loading, empty, error, behaviour): `unknown`.
- Outside the crop: `unknown`.
- Traits that suggest motion: `observed` (see [motion](motion.md) §1).

**Inferences** — see [motion](motion.md) §1.

**Assumptions & decisions**
- Assumed CSS width and DPR (e.g. "1440 CSS px, DPR 1"): chosen once, used for both
  building and comparing. A truly known DPR moves to Reference as `observed`.
- Substitute font: confidence high/medium/low; it changes metrics and line breaks;
  compensate by adjusting size/tracking until the most visible line breaks in the same
  place, and declare it. In the report: a `SUBSTITUTED` row.
- Assets: reproduce (rights, or trivial geometry) / substitute (placeholder with the same
  proportions and tone) / omit; licenses of substitute fonts.

## 3. Effects

See [effects](effects.md) (role, ladder, rung rule). Build order: structure **together
with** identity effects → typography → color and texture → decoration.

## 4. Build

- In the detected stack and output format ([stacks](stacks.md) §2): one `index.html` by
  default, modular files when the project is modular.
- Horizontal in `%`/`fr`/`vw` with `clamp()`; vertical in rhythm units
  (`em`/`rem`/`lh`).
- **Fidelity build**: add only what does not change the look at rest — semantics, focus
  ring, alt text, `prefers-reduced-motion` — each marked `ADDED`.
- **Contrast below AA**: warn in the report with the measured pairs and ratios; offer the
  fix as a **separate variant** (`build-a11y`) marked `ADDED`; never inside the fidelity
  build. See [accessibility](accessibility.md).

## 5. Compare — a fixed rubric

- Recorded conditions: viewport = assumed width × proportional height; assumed DPR; 100 %
  zoom; fonts loaded (`document.fonts.ready`); animations frozen at their initial state.
- Constant content (transcribed text; same-size substitutes): shape against shape.
- No circularity: the comparison does not validate the assumed width; ratios stay
  comparable.
- Differences per inventory dimension, not by impression.
- `scripts/overlay.html` (reference under build, opacity slider, difference blend) as a
  hint, never a score; screenshots with `scripts/shots.mjs`.
- **At most two adjustment rounds**; report whatever remains.
- No browser available: code against inventory, dimension by dimension; write "visual
  comparison not performed".

## 6. Hand over to motion

[motion](motion.md) opens by declaring that the reference is static and all motion is
invention — or naming the animated source and what it shows.

## 7. Mobile

Derived from the principles recorded for desktop (identity, hierarchy, identity effects
kept); rows marked `INVENTED`, "derived from: …".

## 8. Evidence in files

`recreations/<slug>/`: reference (or its path) · `inventory.md` · `palette.json` + the
script · build · screenshots (reference, build, overlay) · `report.md`. What lives only
in chat does not count. `inventory.md` is the only home for the inventory; it is not exported to other formats.

## 9. Report — `report.md`

Columns from the [glossary](glossary.md). Template: [report](../templates/report.md). No
scores.
