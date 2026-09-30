# Report — concrete-radio

Reference: [`../references/ref-a-concrete-radio.png`](../references/ref-a-concrete-radio.png)
· Rights: original, made in this repository → publishable.
Builds: [`build/index.html`](build/index.html) (fidelity). No `build-a11y`: no text pair is
below AA (D9).
Conditions: viewport 1440 × 900 CSS px, DPR 1 (D1), zoom 100 %, fonts loaded
(`document.fonts.ready`; `document.fonts.check` true for Anton and Space Mono), animations frozen at time
0 — headless Chromium.
Fidelity rule (D10): `REPRODUCED` when every edge of the element's ink box is within ±2 px
of the reference, measured with the same crops on both images
([`measure/compare.py`](measure/compare.py)); `APPROXIMATE` otherwise.

**Verified:** geometry by measurement ([`measure/compare-final.txt`](measure/compare-final.txt));
overlay and difference ([`screens/overlay.png`](screens/overlay.png),
[`screens/overlay-diff.png`](screens/overlay-diff.png)); widths 390, 320 and 640 (= 1280 at
200 % zoom) with no clipped element and a true viewport width; keyboard focus on both
focusable elements; axe-core: 0 violations, 24 passes, `color-contrast` incomplete
(contrast measured instead with `sample_palette`); marquee speed and pause; reduced motion;
no JavaScript ([`measure/checks.txt`](measure/checks.txt)).
**Not verified:** screen readers; real devices and touch; Firefox and Safari; real browser
zoom (emulated with a 640 px viewport); smoothness of the marquee (speed sampled, frames
not); the donate link's target (unknown).

## Rows

| Element | Dimension | Action | Fidelity | State | Evidence | Method |
|---|---|---|---|---|---|---|
| column split | position, 3 px rule | `BUILT` | `REPRODUCED` | `measured` | rules: x 900, 3 px in both | `minmax(0,903fr) minmax(0,537fr)` |
| top band | height 44 px | `BUILT` | `REPRODUCED` | `measured` | rules: 0–43 in both | grid row 44 px |
| bottom border, footer rules | position, 3 px | `BUILT` | `REPRODUCED` | `measured` | rules: y 841; x 1184 and 1342 in both | footer columns `1fr 158px 95px` |
| schedule header and rule | position | `BUILT` | `REPRODUCED` | `measured` | rule y 89; `TONIGHT` Δ ≤ 1 px | — |
| schedule dividers | rows 1–4 | `BUILT` | `REPRODUCED` | `measured` | y 240 / 391 / 692 vs 240 / 390 / 690 | table rows, equal content height |
| schedule, last divider | 1 px line at y 840, above the 3 px border | — | `DIVERGENT` | `measured` | present in the reference, absent in the build (visible in `overlay-diff.png`) | not corrected: found after the second round |
| palette | 3 colors | `BUILT` | `REPRODUCED` | `measured` | `palette.json`: exact hex | CSS custom properties |
| display type | family | `SUBSTITUTED` | `—` | `ambiguous` | calibration: Anton 0.7 % error, Bebas Neue 3.0 % | D2 |
| headline `CONCRETE` | size, width | `BUILT` | `APPROXIMATE` | `measured` | cap 204 = 204; width 838 vs 831 (+7 px, +0.8 %); right letters +3 to +4 px | 238 px, line-height .824, tracking −.006em; two rounds used |
| headline `RADIO` | position | `BUILT` | `APPROXIMATE` | `measured` | bottom 830 vs 827 (+3 px) | idem |
| headline overlap | the second line rising into the first | `BUILT` | `REPRODUCED` | `estimated` | visible in both; overlay | negative leading |
| mono type | family | `SUBSTITUTED` | `—` | `ambiguous` | Space Mono 1.0 % vs IBM Plex Mono 1.7 % | D3 |
| kicker | size, tracking | `BUILT` | `REPRODUCED` | `measured` | Δ ≤ 1 px | 13.7 px, .082em |
| marquee text | size, rhythm | `BUILT` | `REPRODUCED` | `measured` | box Δ 0 px; items and dots Δ ≤ 1 px | 14 px bold, .06em, dots 1.95em apart |
| badge circle | size, position | `BUILT` | `REPRODUCED` | `measured` | Δ 0 px | 150 px circle |
| badge text | size, rotation | `BUILT` | `REPRODUCED` | `estimated` | box Δ ≤ 1 px | 44 px, `rotate(-16.6deg)` from the principal axis |
| schedule times and names | size, position | `BUILT` | `REPRODUCED` | `measured` | Δ ≤ 2 px | times 13.7 px bold; names 25 px, .018em |
| active row | fill, text color, dot | `BUILT` | `REPRODUCED` | `measured` | dot Δ ≤ 1 px | — |
| footer left, `DONATE` | size, position | `BUILT` | `REPRODUCED` | `measured` | Δ ≤ 1 px | 11 px, .15em |
| footer `CALL 555 0194` | width | `BUILT` | `APPROXIMATE` | `measured` | 103 vs 108 px (−5 px) | same tracking as the other cells; the gap is unexplained |
| marquee | motion | `INVENTED` | `—` | `unknown` | [`motion-plan.md`](motion-plan.md) | from I1, adopted by D5 |
| marquee | pause mechanism | `ADDED` | `—` | — | pause drift 0 px, `aria-pressed` | click on the band; a button that appears on focus |
| marquee | text without JavaScript | `ADDED` | `—` | — | `screens/no-js.png` | three items in the HTML; JS doubles them for the loop |
| signal dot | blinking | `OMITTED` | `—` | — | — | I2 rejected (D6) |
| semantics | `lang`, `h1`, table with caption, one text copy for screen readers | `ADDED` | `—` | — | axe-core 0 violations | — |
| focus ring | all focusable elements | `ADDED` | `—` | — | `screens/focus-*.png` | 3 px outline |
| reduced motion | marquee | `ADDED` | `—` | — | 0 running animations | media query |
| `DONATE` hover | underline | `INVENTED` | `—` | `unknown` | — | a state the still cannot show |
| other states (rows, links) | hover, active | `OMITTED` | `—` | `unknown` | — | nothing to build from |
| mobile layout | ≤ 760 px | `INVENTED` | `—` | — | `screens/mobile-390.png`, `reflow-320.png` | derived from: same palette and rules, headline kept as identity, schedule after it (D8) |

Contrast (measured, [`palette.json`](palette.json)): ink/concrete 12.77 : 1; ink/signal
5.26 : 1 (badge text, `DONATE`, the dots on ink); concrete/signal 2.43 : 1 only where the
badge meets the background (no text). No pair used by text is below AA.

## Adjustment rounds

| Round | What the comparison showed | What changed |
|---|---|---|
| 0 | column rule −3 px; names at x 1010 instead of 1036; row 3 taller than the rest; marquee +7 % wide and +2 px tall; footer cells off by 5 px; headline ~10 px low; badge text −7 px | — (first build, from the inventory only) |
| 1 | almost everything within 0–4 px; headline cap 200 vs 204; names −6 px wide; times +6 px low; marquee items +4 px | grid 903/537; time column 131 px; equal row content; marquee 15 → 14 px and dot spacing; tracking of kicker, header and footer; badge text 40 → 44 px; headline up 9 px |
| 2 (last) | see the rows above | headline 234 → 238 px, line-height and tracking; row paddings; name tracking; dot spacing; footer tracking |

Round 2 introduced a regression: the wider headline pushed the grid and the column rule
moved to x 908. It was fixed as a layout bug (`minmax(0, …)` on the tracks), not as a
third round of tuning; nothing else was adjusted afterwards.

After the rounds, three changes that do not alter the desktop look at rest (the comparison
was run again and is unchanged): marquee items written in the HTML so the band is not empty
without JavaScript; marquee speed corrected from 181 to 90 px/s (a `DECISION`, see the
motion plan); mobile layout fixed after the checks found `CONCRETE` and the badge clipped at
390 px — hidden from the overflow check because mobile emulation had widened the viewport.

## Limitations

- **Not an independent test.** The agent that made this recreation also wrote the
  reference's HTML earlier in the same session. During the recreation the source file was
  **not opened**, and every value in the inventory comes from the PNG through the scripts
  (see [`commands.md`](commands.md)). But the agent could not forget what it had written:
  the font choices (D2, D3) were checked by calibration rather than taken on trust, and the
  badge angle uses the measured estimate, yet independence cannot be proven. This example
  shows the **artifacts and the method**, not how hard recreating an unknown design is. A
  test on a reference nobody here authored is still needed.
- Crops for the measurements were chosen by looking at the image; they are recorded, so
  they can be checked and re-run.
- The fidelity rule (±2 px) is a decision for this example, not a rule of the skill.
