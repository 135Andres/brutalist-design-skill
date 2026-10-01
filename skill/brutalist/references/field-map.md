# field-map — styles in the field of brutalism

> **Status: experimental**, reviewed 2026-09-30. Descriptive, not prescriptive. Loaded by
> [inspire](inspire.md), [edit](edit.md) and, once specified, [critique](critique.md);
> **never by [recreate](recreate.md)**. Source grades and claims are as compiled by the research
> behind this file.

Sources use "brutalism" for several different things. This file names the styles so they
can be **offered as options** ([setup](setup.md)). Offering is not imposing: the skill never
tells a user that their work or reference is, or is not, brutalism. When the brief is silent
and you pick a style, it is a `DECISION` with its reason, taken from the brief, the
reference or this map (cited).

## Six styles (a piece may combine several)

They use the names people already search for, so the user can look them up before deciding.
The user sees these names only when the agent says them in the conversation ([setup](setup.md),
[inspire](inspire.md)); this file is for the agent. The user can answer by typing a name or
describing what they want in their own words; no command or flag is needed. When offering a
style, also invite the user to look the name up before designing.

**Brutalism** — what you would see: text, lines and a visible grid; nothing added for decoration.
Look up: "web brutalism", Brutalist Web Design, "l'Internet brut".
```
┌───────────────────┐
│ TITLE            │
├─────────┬─────────┤
│ text    │ text    │
└─────────┴─────────┘
```
**Efficiency** — what you would see: the essentials and nothing else; light, quick and cheap to
produce, a working page with the indispensable parts. Not an established style name: it is the
research's label for the "UX minimalists" and for performance-first sites.
```
TITLE
one clear line of text
[ button ]
```
**Antidesign** — what you would see: overlapping or oddly ordered text, type over texture; made
to unsettle or to break convention. Legibility is the usual cost. Look up: "antidesign" (NN/g),
"l'Internet fou", Italian anti-design (a different, older movement).
```
 TITLE▒▒▒▒
   text over ▒▒▒
 ▒▒ odd order ▒▒
```
**Neobrutalism** — what you would see: thick borders, flat colour, hard shadows, buttons that look
like buttons. Look up: "neubrutalism", "neobrutalism UI".
```
╔════════╗  ┌────────┐█
║ TITLE ║  │ button │█
╚════════╝  └────────┘█
```

**Y2K** — what you would see: chrome and liquid-silver type, translucent candy-coloured
plastic, glossy pill buttons, the late-1990s desktop and early-web look. Often mixed with
brutalist rawness (pixel fonts, hard borders, visible windows). Look up: "Y2K aesthetic",
"Y2K web design", "Frutiger Aero" (a related, softer look).
```
╭━━━━━━━━━━━━━━━━╮
┃ ▓▒░ TITLE ░▒▓ ┃
╰━━━━━━━━━━━━━━━━╯
  ( pill button )
```
**Rave** — what you would see: fluorescent colour on black, warped or stretched lettering,
dense layers and distortion, like a 1990s rave flyer; today often called "acid graphics".
Legibility is the usual cost, so one plain panel usually holds the practical details. Look up:
"acid graphics", "rave flyer design", "acid house flyers".
```
 ≋T≋I≋T≋L≋E≋
 ░▒ warped ▒░▓
┌─────────────┐
│ date · place│
└─────────────┘
```

| Style | Research label | Sources that describe it |
|---|---|---|
| Brutalism | honest medium | Copeland; the "purists" (Deville, via O'Brien); O'Brien's *brut*; NN/g "Brutalism" |
| Efficiency | efficiency | "UX minimalists" (Deville); Copeland on performance |
| Antidesign | clash | "Anti-ists" (Deville); O'Brien's *fou*; NN/g "Antidesign" |
| Neobrutalism | legible distinction | Neobrutalism (mostly trade blogs) |
| Y2K | — (added 2026-10-01) | trade blogs only (Webflow, Setproduct); not in the research |
| Rave | — (added 2026-10-01) | AIGA Eye on Design on acid graphics; DJ Mag; trade blogs; not in the research |

`INFERENCE` (from aligning four taxonomies): Efficiency has no name of its own in the other
taxonomies, and none of the pre-2020 ones covers Neobrutalism. Four may not be the right number.
The names are a proposal; the first run showed that the research labels were not understood.
Y2K and Rave were added at the maintainer's request (A-17) from a short search, not from the
research: they are adjacent aesthetics that often borrow brutalist traits, not taxonomies of
brutalism, and their sources are weaker (grade B, one S).

## Axes that vary inside a style

| Axis | Values seen in sources |
|---|---|
| Stance toward usability | serves it · neutral · subverts it |
| Chosen "raw material" | content and context · markup · CSS primitives (border, shadow, fill) · grid and effects |
| Relation to conventions | respects · ignores · breaks |
| Coherence | one consistent system · deliberate collage |
| Layout formality | rigid grid · informal |
| Finish | under-designed and raw · polished |
| Motion | none · abrupt · expressive (almost no sources) |

**Colour, type, border, radius and shadow have no defaults here**: the sources disagree and
the skill does not choose for the user ([setup](setup.md)).

## Contested points (marked, not resolved)

- **Origin of the term.** Banham (1955) tells a London story and dismisses a Swedish one as
  untraceable; encyclopedic sources credit a 1950 Swedish use. Do not state one origin.
- **Ethic or style.** Banham calls it both a label and a banner; later sources treat it as a
  style label. Keep the two layers apart.
- **Banham's three criteria** (memorable image, clear exhibition of structure, materials
  valued "as found") are a revised list, and he finds them necessary but not sufficient:
  attitude and relentless coherence count too. Secondary sources often give them as a
  definition.
- **Intent on the web:** careless, deliberately broken, honesty of medium and studied
  ugliness are different motives.
- **Minimalism and anti-design** are used as defining traits by some sources and rejected by
  others; NN/g separates anti-design by its effect.
- **"Raw material" of a website:** content and context (Copeland) vs markup (purists) vs
  CSS primitives (neobrutalism). Declare which reading you apply.
- **Neobrutalism:** only a thick border, an offset shadow without blur and a flat fill recur
  across sources; radius, saturation, exact width, type and interaction vary. One component
  library reports a small radius and a pastel palette (read from an excerpt only).
- **Hand-made vs tooling:** curated examples include sites built with frameworks and
  visual builders, so the tool does not define the style.
- **Accessibility of neobrutalism:** vendors report passing contrast pairs; one usability
  study of a single brutalist site found navigation problems; no direct study of
  neobrutalism was found. Measure; do not assume ([accessibility](accessibility.md)).

## Not axes

Tooling (the skill imposes no stack, [stacks](stacks.md)). Concrete, monumentality and
regional schools: no evidence found for carrying them to the web; historical context only
([glossary](glossary.md) "Field terms").

## Sources

Grades describe the source, not the claim: **P** the author's own text or project site ·
**A** academic or institutional · **S** press or encyclopedia · **B** blog, agency or vendor.
They are not evidence states.

- **P** Banham, "The New Brutalism", *Architectural Review*, Dec 1955.
- **P** Copeland, *Brutalist Web Design* — <https://brutalist-web.design/>
- **P** Deville, Brutalist Websites (2014) — <https://brutalistwebsites.com/>
- **P** NN/g, "Brutalism and Antidesign" (2017) — <https://www.nngroup.com/articles/brutalism-antidesign/>
- **P** O'Brien, Smashing Magazine (Jan 2020) — <https://www.smashingmagazine.com/2020/01/split-personality-brutalist-web-development/> (cites Deville's three micro-styles)
- **P\*** neobrutalism.dev styling page — excerpt only.
- **S** AIGA Eye on Design, "Acid graphics are the new psychedelia" — <https://eyeondesign.aiga.org/acid-graphics-are-the-new-psychedelia-with-a-heady-dose-of-cynicism/>
- **B** Webflow, "Y2K aesthetic for web design" — <https://webflow.com/blog/y2k-aesthetic>; Setproduct, "Retro and brutalist UI design" — <https://setproduct.com/blog/retro-brutalist-ui-design-2026>
- **A/S/B** further sources: Harvard GSD 2024 exhibition, SAH Archipedia, a 2022 usability
  study, press pieces, and trade blogs on neobrutalism.

Not read by the research: Banham 1966, the Smithsons' texts, early-web primary sources.
