# accessibility — for everything the skill builds

> **Status: draft, new** (from the pre-publication audit, findings A1–A4; loaded by every
> command that writes code, A-11 · D; wording pending the maintainer's review). The one home for accessibility rules; every command that writes
> code loads this file. Criteria refer to WCAG 2.2.

Brutalism breaks conventions on purpose. Keep the look; do not break the person using it.
Everything added here is marked `ADDED` in the report.

## In the fidelity build (does not change the look at rest)

- Real semantics: landmarks, one `h1`, headings in order, lists as lists, buttons as
  `<button>`, links as `<a>`.
- A visible focus ring on every interactive element (2.4.7), never hidden under sticky
  bars (2.4.11): add `scroll-margin-top` / `scroll-padding-top`.
- `alt` for meaningful images; `alt=""` for decoration.
- `lang` on `<html>`.
- `prefers-reduced-motion` in CSS **and** JS (see §Motion).

## Contrast

- Below AA (1.4.3 text 4.5:1 / large 3:1; 1.4.11 non-text 3:1): warn in the report with
  the measured pairs and ratios; the fix goes in a **separate variant** `build-a11y`,
  marked `ADDED`; never inside the fidelity build.
- **Both builds only when they differ** (A-11 · E): if any check fails (contrast or
  another fix that would change the look), deliver the fidelity build **and** `build-a11y`
  and say in the report which one is publishable. If nothing differs, deliver one build
  and say so in the report.

## Brutalist devices and their defaults

| Device | Risk | Default behaviour | WCAG |
|---|---|---|---|
| giant type, page-filling sentences | does not reflow at 320 px; clipped at 200 % zoom | sizes with `clamp()`; test 320 px and 200 % zoom; allow wrapping | 1.4.10, 1.4.4 |
| outlined text (`text-stroke`), text over texture | contrast of a thin stroke, not a fill | measure the stroke against the background; keep a solid fallback for small sizes | 1.4.3, 1.4.11 |
| marquees with duplicated text | screen readers read it N times | one real copy; duplicates `aria-hidden="true"`; pause control | 1.3.1, 2.2.2 |
| vertical, rotated, curved or 3D text | reading order and meaning break | real text in DOM order; decorative copies `aria-hidden`; an accessible name for the whole | 1.3.2, 1.1.1 |
| sticky bars and headers | focused element hidden underneath | `scroll-margin-top`; check with Tab | 2.4.11 |
| custom or hidden cursor | the pointer disappears | keep the system cursor or a clear replacement; never hide it on interactive areas | usability (no WCAG criterion covers the pointer itself) |
| interaction driven by pointer position or dragging (a cursor that "tunes", sliders, drag-to-scroll) | not discoverable; impossible by keyboard or touch | a visible cue saying what to do; a single-pointer, non-drag alternative (buttons, arrow keys) | 2.5.1, 2.5.7, 2.1.1 |
| content that appears on hover or focus | disappears before it is read; blocks other content | dismissible (Esc), hoverable, persistent | 1.4.13 |
| tight line height and letter spacing set on purpose | breaks when the user overrides text spacing | no fixed heights on text boxes; test with the 1.4.12 spacing values | 1.4.12 |
| raw links, text-only buttons | distinguished by color alone | underline or another non-color cue | 1.4.1 |
| tiny targets in dense grids | hard to hit | at least 24×24 CSS px or enough spacing | 2.5.8 |
| horizontal or hijacked scroll | disorients; keyboard trapped | native scroll where possible; every region reachable and escapable by keyboard | 2.1.1, 2.1.2 |
| meaning by color or shape only (tags, states) | not perceivable by everyone | add text or an icon with a name | 1.4.1 |

## Motion

- `prefers-reduced-motion`: honour it in CSS **and** in JS, including programmatic scroll;
  the reduced variant reaches the same end state.
- Nothing flashes more than 3 times per second (2.3.1).
- A way to pause, stop or hide moving content that meets **all three**: starts by
  itself, lasts more than 5 s, and runs alongside other content (2.2.2). A marquee next to
  content usually meets them.
- Loops pause off-screen and in hidden tabs; WebGL has a static fallback.

## Input equivalents

- Keyboard and touch equivalents for everything the pointer triggers (hover, drag,
  cursor position); the first-time visitor is told what to do (a visible cue). Focus
  behaviour and semantics follow the conventions of real design systems — behaviour, not
  style.

## Verify

Load [verify](verify.md). Until it is specified, at minimum:

1. An automated pass (e.g. axe-core through the browser) — evidence, not proof.
2. A keyboard pass: Tab through everything; focus always visible and never hidden;
   Escape closes what opens.
3. 320 px width and 200 % zoom screenshots.
4. Reduced motion emulated; no-JavaScript load if the page claims to work without it.
5. Say in the report what was **not** verified (screen reader, real devices…).
