# Findings from experiments

> Creative-mode and editing experiments, run with the brief of a private project that is
> **not in this repository**. Only the general lessons for the skill are kept here, with
> no content from that project. The maintainer's reactions are summarized, or quoted
> (Spanish, with a translation) when they reveal nothing about the project. The agent does
> not score; the maintainer judges. *Translated from Spanish on 2026-09-29 (A-4).*

## Creative mode — formats

| Format | What it is | Result |
|---|---|---|
| 1 · Digestible questions | 5 questions whose options are **visual** (ASCII sketches as previews), then one built sketch | Reaction to the format: «Me inspiró» (*it inspired me*). To the sketch: good and smooth; «se parece mucho a como lo mostró en la terminal» (*it looks a lot like what the terminal showed*); the huge type, «muucho ruido» (*way too much noise*) |
| 2 · Sketches first, from images | 4 divergent sketches without asking, **each inspired by a different reference image** (#35–#38), taking principles, not text or marks | reaction pending |
| 3 · Provocations | 3 unexpected premises, one sentence + one sketch each | not tried |
| 4 · Classic derive | one reference → explicit principles → 3 directions | not tried |

Lessons:
- The maintainer sometimes **does not pick** an option and brings an idea of their own (a
  motion idea): questions must leave room for that.
- ASCII previews that resembled the built result were valued.
- The maintainer's direction is to **explore many designs**, not converge early (A-2).

## Creative mode — format 1, second run (2026-09-30)

Two rounds of four digestible questions with ASCII previews, content invented. Answers:
round 1 — *pirate radio* · *one giant word* · *photocopied paper* · *the cursor moves
everything*; round 2 — word *ESTÁTICA* · the cursor *tunes* (moving sideways turns the dial;
only at 88.7 is the word sharp) · *tape* breaks the order · below, *listeners' messages*.
Built as [`examples/gallery/estatica/`](../examples/gallery/estatica/index.html). Reaction
(2026-09-30): «no me gusta la de radio estática, siento que se siente muy genérica, no tiene
nada en especial, además de que no es intuitiva con nuevos visitantes» (*I don't like the
Radio Estática one; it feels very generic, has nothing special, and isn't intuitive for new
visitors*). Not added to the landing or the README gallery.

- `INFERENCE`: an interaction the visitor must discover (the cursor tunes the word) needs a
  visible cue; without one, a first-time visitor does not know what to do.
- `INFERENCE`: a premise taken from the first answer that is a familiar genre ("pirate
  radio") gave a predictable result; the next run should try format 3 (provocations).

- A second round tailored to the first round's answers made the questions concrete (the
  word, what the cursor does *to it*) instead of generic.

## Editing an existing page — first test

On a sketch the agent itself had written (limitation: it knew the code and the intent;
**a test on someone else's page is still missing**).

1. **First attempt — recompose.** From an ASCII preview, the maintainer chose to reorder
   the page. Built, it was rejected: «Me gustó menos que el anterior» (*I liked it less
   than the previous one*). Only what changed **least** survived.
2. **Second attempt — minimal change.** The original page untouched; only the large type,
   with 4 families × 2 scales switchable live. Paused without a choice («podemos dejar
   este diseño para luego», *we can leave this design for later*).

Lessons for `edit`:
- **A choice made on a sketch is a hypothesis**, not a settled criterion: build cheaply
  and show it before treating the edit as right.
- **On a page the user likes, start with the smallest change** that solves the concrete
  complaint; escalate (restyle → recompose) only if it is not enough.
- Mapping every move to an existing playbook (Impeccable: `quieter`, `bolder`, `delight`,
  `typeset`; claude-design: restyle vs recompose) worked as a log.
- "More flavour" cannot mean "bigger": character comes from behaviour and detail.
- Fix the page's **truth** before polishing its design.
- A variant switchable live (family/scale) allows comparing without rebuilding.

## Verification — technical lessons

- Automated checks **fail silently**: text clipped by `overflow: hidden` does not register
  as page overflow; each element had to be measured against its container. Always look at
  the screenshots.
- Lines hidden with `opacity: 0` still take up space: an auto-scroll to the bottom showed
  an empty box. Hide with `display: none` plus an entrance animation.
- A wide family at a condensed family's scale overflows: "the same size" means the largest
  that fits.
- SVG filters (goo + lighting) give soft 3D relief on the native rung; small shapes may not
  pass the filter's threshold.
- `-webkit-text-stroke` on variable fonts shows overlapping internal contours.
- Automatic motion over 5 s alongside content needs a pause button (WCAG 2.2.2).
- Mobile emulation widens the layout viewport when content is too wide, so
  `scrollWidth − innerWidth` reports 0 while the screenshot shows clipped text (found in the
  worked example). Check that `innerWidth` is the width asked for.
- Test the **real** install path. The installer worked from a local package, but
  `npx github:…` failed on npm 12, which disables git packages by default
  (`allow-git = "none"`); only running the exact public command showed it.
- A fix in the last comparison round can regress something else (a wider headline pushed a
  grid track): re-run the whole comparison after every round.

Screenshot tool: [`shots.mjs`](../skill/brutalist/scripts/shots.mjs).
