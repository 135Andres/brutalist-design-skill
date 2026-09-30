# Findings from experiments

> Creative-mode and editing experiments, run with the brief of a private project that is
> **not in this repository**. Only the general lessons for the skill are kept here, with
> no content from that project. The maintainer's reactions are summarized, or quoted
> when they reveal nothing about the project. The agent does not score; the maintainer
> judges.

## Creative mode — formats

| Format | What it is | Result |
|---|---|---|
| 1 · Digestible questions | 5 questions whose options are **visual** (ASCII sketches as previews), then one built sketch | Reaction to the format: "It inspired me". To the sketch: good and smooth; "It looks a lot like what the terminal showed"; the huge type, "Way too much noise" |
| 2 · Sketches first, from images | 4 divergent sketches without asking, **each inspired by a different reference image** (#35–#38), taking principles, not text or marks | reaction pending |
| 3 · Provocations | 3 unexpected premises, one sentence + one sketch each | tried once from zero, no reference (2026-09-30); the maintainer did not like the three sketches; deleted |
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
(2026-09-30): "I don't like the Radio Estática one; it feels very generic, has nothing special, and isn't intuitive for new visitors". Not added to the landing or the README gallery.

- `INFERENCE`: an interaction the visitor must discover (the cursor tunes the word) needs a
  visible cue; without one, a first-time visitor does not know what to do.
- `INFERENCE`: a premise taken from the first answer that is a familiar genre ("pirate
  radio") gave a predictable result; the next run should try format 3 (provocations).

- A second round tailored to the first round's answers made the questions concrete (the
  word, what the cursor does *to it*) instead of generic.

## Creative mode from zero — format 3, first run (2026-09-30)

No reference images; one invented neutral brief (a community tool library) in three sketches
(a shadow board, a tear-off flyer, a loan slip), each with a written first-visitor cue.
Reaction: "I really didn't like them" (the maintainer's words, translated). The sketches were
deleted. Asked for next: run the tests on the maintainer's own projects instead of an invented
brief.

- `INFERENCE`: an invented brief with utilitarian content, however well it passes a
  first-visitor check, did not give the maintainer anything to care about; the test needs a
  brief the maintainer knows.
**Second run (2026-09-30), real briefs from the maintainer's own projects** (kept local; only
general lessons are recorded here, by the maintainer's choice). Three landing sketches, one per
brief. Reaction: one was liked for its structure ("not as final, but it has good structure"),
the other two "don't feel brutalist" (the maintainer's words, translated).

- `INFERENCE`: the liked sketch made the product's own distinctions the page's visual code,
  used one ink and one texture, and read like a raw document. The other two used accent
  colours and product-style widgets.
- Found and fixed while building: a scaled stamp widened the mobile layout; hatched tags were
  unreadable; a fact was shown with the mark defined for "unknown"; one sketch ignored the
  earlier finding about oversized type. `shots.mjs` documentation and flags corrected.
- Not checked: contrast ratios, screen reader, axe-core, keyboard pass by a person.
- The draft procedure in [`inspire.md`](../skill/brutalist/references/inspire.md) came out of
  this run and is **unvalidated**.

## Creative mode — "Positions", first run (2026-09-30)

One real brief (text of a public README of the maintainer's own project; sketches kept local,
by the maintainer's choice) and four references, one or two per position. Four sketches, one per
position of [`field-map.md`](../skill/brutalist/references/field-map.md). Reactions, in the
maintainer's words (translated), seen on a phone:

- A (honest medium): "it feels incomplete… it lacks animations; up there [the wordmark at the
  top] I'd put an animation"; later, "it feels crude".
- B (efficiency): "it looks good; I don't know what I'd add".
- C (clash): "ugly… they don't look like the reference image; it looks like make-up colours or
  a clown's. In the original they were horses, like on some Deftones cover, with text without a
  background on top of the image".
- D (legible distinction): "it feels crude, like A".

- `INFERENCE`: in C the reference's identity was a figurative, motion-smeared image; replacing
  it with flat blurred colour shapes lost the reference. When a reference's main element is an
  image, the figure is part of what is being studied and cannot be swapped for abstract colour.
- `INFERENCE`: "missing animation" and "crude" were both about finish; the second versions of A
  and D added motion (a scan sweeping the wordmark, a signal along the pipeline, a dither whose
  threshold breathes) and finer lines. Reaction to those versions pending.
- Second round (same brief, phone): the scan animation in A was rejected ("it is not a scan, it is a
  decomposition of the word"); the next one (bands sliding sideways, word pinned full-screen) was
  rejected too; the user wanted the reference's upward-stretching echoes, the word at its earlier
  size, white space above it at rest, and a spring-like return at the top. D's numbered ladder was
  circled in red to be removed; D was also said to resemble a product page the agent had not seen.
  C was dropped at the user's request ("let's leave this") before the figure and palette were chosen.
- `INFERENCE`: most of the feedback was about execution (motion misread, layout changed unprompted,
  reference imagery replaced), not about the positions; the three questions about the map (names,
  whether it helped, what is missing) went unanswered, so the experiment does not show whether the
  map helps. B, which changed least between versions, was the one left as is.
- Applied to the skill as neutral process rules (`inspire.md`, "Iterating on a sketch"; `verify.md`).
- Mistake found while building: text columns in C first had contrast between 1.2:1 and 3.4:1
  against the colour blurs; a readable variant was needed (measured 7.55:1).

## Editing an existing page — first test

On a sketch the agent itself had written (limitation: it knew the code and the intent;
**a test on someone else's page is still missing**).

1. **First attempt — recompose.** From an ASCII preview, the maintainer chose to reorder
   the page. Built, it was rejected: "I liked it less than the previous one". Only what changed **least** survived.
2. **Second attempt — minimal change.** The original page untouched; only the large type,
   with 4 families × 2 scales switchable live. Paused without a choice ("We can leave this design for later").

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
