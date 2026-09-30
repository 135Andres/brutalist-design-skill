# Motion plan — concrete-radio

**Source:** The reference is static; all motion in this build is invention.

| Layer | Trigger | Property | Parameters (`DECISION`) | Rung | From | Reduced variant |
|---|---|---|---|---|---|---|
| ambient loop — marquee | page load | `transform: translateX` | linear, 27 s per half-track (three repeated items) ≈ 90 px/s, right-to-left, infinite | 1 (CSS animation) | I1, adopted by D5 | no animation; the band shows its first frame, identical to the reference |
| interaction — pause | click/tap on the band, or the "Pause ticker" button (keyboard) | `animation-play-state` | immediate | 1 | WCAG 2.2.2 (`ADDED`) | n/a |
| main moment | — | — | none: the reference suggests no entrance | — | — | — |
| scroll | — | — | none | — | — | — |

Rejected: animating the signal dot of the active row (I2, D6) — a blink adds distraction
and no information.

**Why 90 px/s:** slow enough to read the uppercase mono at 14 px while it moves; the
reference cannot say (behaviour `unknown`). A first attempt ran at 181 px/s because the
duration was computed for one item instead of the three in each half — corrected before
the report.

**Accessibility:** the loop starts by itself, lasts more than 5 s and runs next to other
content, so it has a pause mechanism: clicking the band, or a "Pause ticker" button that
is invisible at rest (the fidelity build must not change the look) and appears on keyboard
focus. Nothing flashes. `prefers-reduced-motion` removes the animation. The duplicated
items are `aria-hidden`; one plain sentence carries the text for screen readers.
