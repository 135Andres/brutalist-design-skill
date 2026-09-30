# setup — ask how the user imagines the page

> **Status: experimental.** Loaded by [inspire](inspire.md) when the user is still imagining
> the page, and by any command that is about to choose look-and-feel on its own. Every
> question is **optional**.

The skill has no taste of its own to impose. Scale, colour, typography, ornament and how
strictly "brutalist" is read differ from project to project and from person to person; the
user decides them. This step only makes those choices easy to state.

## Rules

- **Never required.** The user may answer some, all or none, and may say "you choose".
  Unanswered → you decide, and each such choice is a `DECISION` in the notes with its reason.
- **Digestible**: at most four questions at a time; one idea per question; each option shown
  as a small ASCII sketch or a short example so it can be picked without design vocabulary.
- **Leave room**: always allow "something else" in the user's own words, and a free-text
  answer such as a colour code, a font name or a reference.
- **Record the answers as the user's words**, marked `stated by the user`, apart from your
  `DECISION`s. Do not paraphrase them into a judgement.
- **Do not steer.** Offer options neutrally; do not call one more or less "real" brutalism.
  If a choice has a cost (contrast, legibility, performance), say the cost once, plainly,
  and follow the user's decision ([accessibility](accessibility.md) still applies and is
  reported, not silently applied).
- Ask again only when the user changes the brief; do not repeat the set on every sketch.

## Questions (pick the ones that help; skip the rest)

1. **How strict is the brutalism?**
   *pure* (raw structure and material, nothing added for looks) · *with elements* (brutalist
   structure plus chosen devices such as marquees, stickers, collage) · *a mix* · *I don't
   know — show me both*. If the user uses the word in their own sense, take theirs.
2. **Colour.** One ink on paper · black and white plus one accent · a palette they give
   (hex codes, a reference, a brand) · a dark page · *you choose*. If they give a brand,
   ask whether it is a constraint or a starting point.
3. **Typography.** Grotesk · monospace · serif · a display face · a mix · a font they
   already use · *system fonts only*. Ask about size separately: *giant*, *moderate*,
   *mixed*, *you choose*.
4. **Elements**, as a multi-select: grid and rules, marquee, collage, stickers or labels,
   textures, raw tables and lists, stamps, none.
5. **Motion**: none · small (state changes) · expressive · *you choose*. Reduced motion is
   always honoured.
6. **Who reads it first?** A first-time visitor who must understand at once · someone who
   already knows the subject · a mix. This sets how much explanation the page carries; it
   is not a rule about design.
7. **Content**: real text they provide · invented (say so on the page) · a mix.
8. **Anything to avoid?** Free text.

## What to do with the answers

Write them at the top of the sketch's notes as `stated by the user`; build from them; list
your own `DECISION`s for everything left open. If a later answer contradicts an earlier one,
the later one wins and the earlier is kept in the notes.
