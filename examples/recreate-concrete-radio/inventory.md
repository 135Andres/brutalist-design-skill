# Inventory — concrete-radio

Reference: [`../references/ref-a-concrete-radio.png`](../references/ref-a-concrete-radio.png)
· Rights: original reference made in this repository (Apache-2.0) → literal reproduction
is fine.
Classification: **flat screenshot** (no perspective, no device frame, no photographic
noise) — `observed`. Grid and type metrics are measured everywhere.

> **How this inventory was made.** Every value below comes from the PNG through the
> skill's scripts; the exact commands are in [`commands.md`](commands.md) and their raw
> output in [`measure/`](measure/). The reference's HTML source was **not opened** during
> this recreation. **Limitation:** the same agent wrote that source earlier in the same
> session, so its knowledge is not independent — see the report's limitations.

## Reference

| Dimension | Value | State | Method |
|---|---|---|---|
| Canvas | 1440 × 900 px (1.6 : 1) | `observed` | image size |
| Top band | y 0–43 (44 px), ink | `measured` | `find_rules` full image: dark band 0–43 |
| Main area | y 44–840 | `measured` | between top band and bottom border |
| Bottom border | y 841–843, 3 px, ink | `measured` | `find_rules` full image |
| Footer | y 844–899 (56 px) | `measured` | below bottom border |
| Column split | vertical rule x 900–902 (3 px) → left 0.625 of width, right 0.375 | `measured` | `find_rules` full image, center fraction 0.6257 |
| Schedule header | y 44–88 (45 px), rule y 89–91 (3 px) | `measured` | `find_rules --crop` right column |
| Schedule rows | 5 rows sharing y 92–840; 1 px dividers at y 240, 690, 840; row 3 (y 390–540) filled with ink | `measured` | `find_rules --crop` right column, pixel rows at x=1300 |
| Footer cells | rules at x 1184–1186 and 1342–1344 (3 px); last cell x 1345–1439 filled signal red | `measured` | `find_rules --crop` footer |
| Palette · concrete | `#d8d5cc` (100 000 px, deviation 0) | `measured` | `sample_palette`, median of flat patch |
| Palette · ink | `#121212` (4 000 px, deviation 0) | `measured` | idem, inside top band |
| Palette · signal | `#ff3b1f` (300 px, deviation 0) | `measured` | idem, inside badge |
| Palette · other | `#74716d`, 0.8 % of pixels | `measured` | `sample_palette --clusters 4`: antialiasing only, not a color of the design |
| Text · marquee | `ON AIR ● NIGHT SHIFT WITH THE CONCRETE CHOIR ● REQUESTS OPEN UNTIL 02:00 ● ON AIR ● NIGHT SHIFT WITH THE CONCRETE CHOIR ● REQUESTS O…` (cut at the right edge) | `observed` | transcription |
| Text · kicker | `COMMUNITY RADIO · 94.1 FM · SINCE 1987` | `observed` | transcription |
| Text · headline | `CONCRETE` / `RADIO` (two lines) | `observed` | transcription |
| Text · badge | `LIVE` | `observed` | transcription |
| Text · schedule | `TONIGHT`; `20:00 TAPE HISS HOUR` · `21:30 BRASS & RUST` · `23:00 NIGHT SHIFT ●` · `02:00 STATIC UNTIL DAWN` · `05:00 MORNING GRAIN` | `observed` | transcription |
| Text · footer | `LISTENER-FUNDED. NO ADS. NO ALGORITHM.` · `CALL 555 0194` · `DONATE` | `observed` | transcription |
| Type · display (headline, badge, schedule names) | condensed grotesque, very heavy, uppercase | `observed` | — |
| Type · display family | best metric match **Anton** (width/cap ratio error 0.7 % on `CONCRETE`, −2.1 % on `TAPE HISS HOUR`); Bebas Neue 3.0 % / −3.2 %; League Gothic −10.6 %; Oswald +22 % | `ambiguous` (Anton favoured) | calibration: candidates rendered at 100 px, `ink_bbox` ratios ([`measure/calibration.json`](measure/calibration.json)) |
| Type · mono (marquee, kicker, times, header, footer) | monospace, bold in marquee/times/header/footer, regular in kicker; uppercase; tracked | `observed` | — |
| Type · mono family | Space Mono (error 1.0 % on `20:00`) vs IBM Plex Mono (1.7 %); JetBrains Mono −4.3 %; Courier Prime +18.8 % — not separable at 10 px cap height | `ambiguous` | calibration, idem |
| Headline size | cap height 204 px (`CONCRETE`: y 427–630) | `measured` | `ink_bbox` on letters with nothing below them |
| Headline position | left ink edge x 36; `CONCRETE` width 831 px; `RADIO` width 490 px, bottom y 827 | `measured` | `ink_bbox` |
| Headline overlap | `RADIO` rises into `CONCRETE`: second line's top ≈ y 624, first line's bottom y 630 | `estimated` | assumes both lines share the cap height (same size, `observed`) |
| Badge | circle ⌀ 150 px at x 702–851, y 84–233; 48 px from the column rule, 40 px below the top band | `measured` | `ink_bbox --color signal` |
| Badge text rotation | ≈ −16.6° (counter-clockwise) | `estimated` | principal axis of the text's ink pixels ([`measure/derived.txt`](measure/derived.txt)) |
| Badge text size | rotated box 72 × 52 px → unrotated cap ≈ 35 px, width ≈ 65 px | `estimated` | solved from the rotated box and the angle above |
| Kicker | cap 10 px at y 70; ink x 29–386 | `measured` | `ink_bbox` |
| Marquee | cap 12 px at y 17 (centered in the band); first ink x 25; items repeat every 813 px; red dots 6 px | `measured` | `ink_bbox`, dot centers ([`measure/derived.txt`](measure/derived.txt)) |
| Schedule header | `TONIGHT` cap 10 px at y 61, x 927 | `measured` | `ink_bbox` |
| Schedule row text | time cap 10 px at row top + 19 px, x 927; name cap 22 px at row top + 16 px, x 1036 | `measured` | `ink_bbox` rows 1 and 3 |
| Active row | ink fill; text concrete; signal dot ⌀ ≈ 20 px, 8 px after the name | `measured` | `ink_bbox` row 3 |
| Footer text | cap 8 px at y 868; left x 23; `CALL…` x 1210–1317; `DONATE` x 1368–1415 | `measured` | `ink_bbox` |
| Contrast | ink/concrete 12.77 : 1; ink/signal 5.26 : 1; concrete/signal 2.43 : 1 (only the badge's edge against the background — no text uses this pair) | `measured` | `sample_palette --contrast` |
| States (hover, focus, active) | — | `unknown` | a still shows none |
| Outside the crop (below the fold, other pages) | — | `unknown` | — |
| Trait suggesting motion | marquee text touches the right edge mid-word (`REQUESTS O…`) and its items repeat | `observed` | `derived.txt`: text ink in the last 3 columns |

## Inferences

| # | Reading | From trait | Note |
|---|---|---|---|
| I1 | the top band is a horizontal marquee scrolling right-to-left | cut text + repeated items | speed, direction and trigger stay `unknown` |
| I2 | the signal dot after `NIGHT SHIFT` marks the show on air now | active row + badge `LIVE` | meaning only; says nothing about motion |
| I3 | `DONATE` is a link or button | isolated, filled cell, imperative verb | its target is `unknown` |

## Assumptions & decisions

| # | Decision | Reason | Confidence | Affects |
|---|---|---|---|---|
| D1 | assume 1440 CSS px wide, DPR 1 | canvas 1440 × 900 is a common desktop capture size | medium | build, comparison |
| D2 | display font **Anton** | best metric match | medium (see limitation) | all display text |
| D3 | mono font **Space Mono** | marginally better match than IBM Plex Mono; letterforms look geometric | low (see limitation) | all mono text |
| D4 | font sizes from cap height ÷ cap-per-em of the chosen font (Anton 0.87, Space Mono 0.73), then adjusted in comparison | calibration | medium | sizes |
| D5 | adopt I1: animate the marquee | the cut text is an identity trait of the top band | — | motion plan |
| D6 | do not animate the signal dot (I2) | a blinking dot adds distraction and no information | — | motion plan |
| D7 | schedule as a `<table>` with caption `Tonight`; headline as `<h1>`; `DONATE` as a link (I3) with `href="#"` | semantics; target unknown | medium | build |
| D8 | mobile layout invented from the desktop principles | the reference shows desktop only | — | build (`INVENTED`) |
| D9 | no `build-a11y` variant | no text pair below AA | high | deliverables |
| D10 | fidelity rule for the report: `REPRODUCED` when every edge is within ±2 px, measured with the same crops on both images | makes the fidelity column checkable | — | report |
