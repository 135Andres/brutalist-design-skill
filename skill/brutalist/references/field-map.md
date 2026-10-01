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

## Eight styles (a piece may combine several)

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
*Variant — Swiss:* strict grid, asymmetric layout, flush-left sans, photography, white space;
it serves legibility, where brutalism is raw. Look up: "International Typographic Style",
"Swiss style web design".
**Efficiency** — what you would see: the essentials and nothing else; light, quick and cheap to
produce, a working page with the indispensable parts. Not an established style name: it is the
research's label for the "UX minimalists" and for performance-first sites.
```
TITLE
one clear line of text
[ button ]
```
*Variant — Low-tech:* default typefaces, dithered images, a static page, sometimes a battery
indicator; built for low energy use. Look up: "low-tech website", "solar powered website".
Efficiency is also a mode that combines with any style (planned; A-19).
**Antidesign** — what you would see: overlapping or oddly ordered text, type over texture; made
to unsettle or to break convention. Legibility is the usual cost. Look up: "antidesign" (NN/g),
"l'Internet fou", Italian anti-design (a different, older movement).
```
 TITLE▒▒▒▒
   text over ▒▒▒
 ▒▒ odd order ▒▒
```
*Variants — Glitch:* RGB split, corrupted images, scanlines; failure used as material (look up
"glitch art", "Glitch Studies Manifesto"). *New Ugly:* feigned-amateur layouts by trained
designers, clashing colour, "wrong" spacing (look up "New Ugly design", "internet ugly").
**Neobrutalism** — what you would see: thick borders, flat colour, hard shadows, buttons that look
like buttons. Look up: "neubrutalism", "neobrutalism UI".
```
╔════════╗  ┌────────┐█
║ TITLE ║  │ button │█
╚════════╝  └────────┘█
```

**Y2K** — what you would see: chrome and metallic type, gradients and gloss, translucent
candy-coloured plastic, rounded pills and bevelled windows; the friendly-technology look of the
late 1990s and early 2000s. Polished, not raw: it is grouped with brutalism only by trend
articles. Look up: "Y2K aesthetic", "Y2K futurism" or "cyber Y2K" (excludes the fashion sense),
"Y2K web design". Some archives use "Y2K" for the whole Flash era, a wider sense.
```
╭━━━━━━━━━━━━━━━━╮
┃ ▓▒░ TITLE ░▒▓ ┃
╰━━━━━━━━━━━━━━━━╯
  ( pill button )
```
*Variant — Frutiger Aero:* glossy glass interfaces, water, bubbles, sky, green and blue; the
softer, later look (late 2000s). Look up: "Frutiger Aero", "Windows Vista Aero".
**Rave** — what you would see: loud or fluorescent colour, collage and dense layers, warped or
mismatched lettering (sometimes a different typeface per letter), the smiley. Two looks share
the name; ask which one: the **1980s–90s rave and acid house flyer** (look up "rave flyer 1990s",
"acid house flyers", "Designers Republic WipEout") and **acid graphics**, a 2010s revival with
chrome type and stretched textures (look up "acid graphics", "acidgrafix"). Legibility is the
usual cost; flashing effects must pass WCAG 2.3.1 ([accessibility](accessibility.md)).
```
 ≋T≋I≋T≋L≋E≋
 ░▒ warped ▒░▓
┌─────────────┐
│ date · place│
└─────────────┘
```
**Webcore** — what you would see: the hand-made personal web of the 1990s and its revival:
tiled backgrounds, visitor counters, "under construction" GIFs, pixel art, small 88×31 badges,
webrings. Raw like brutalism but decorative and maximal. Look up: "Neocities", "GeoCities
aesthetic", "webcore", "web revival".
```
░▓░▓ WELCOME ▓░▓░
 visitors: 000417
[88x31][88x31][88x31]
```
**Terminal** — what you would see: monospace everywhere, a dark background, phosphor green or
amber text, box-drawing borders, a blinking cursor, `[ OK ]` status lines. Look up: "terminal
aesthetic website", "TUI web design", "CRT phosphor UI".
```
┌─ TITLE ─────────┐
│ > text_         │
│ [ OK ] loaded   │
└─────────────────┘
```

| Style | Research label | Sources that describe it |
|---|---|---|
| Brutalism | honest medium | Copeland; the "purists" (Deville, via O'Brien); O'Brien's *brut*; NN/g "Brutalism" |
| Efficiency | efficiency | "UX minimalists" (Deville); Copeland on performance |
| Antidesign | clash | "Anti-ists" (Deville); O'Brien's *fou*; NN/g "Antidesign" |
| Neobrutalism | legible distinction | Neobrutalism (mostly trade blogs) |
| Y2K | — (added in A-17) | Wikipedia "Y2K aesthetic"; CARI; Web Design Museum (Flash-era sense) |
| Rave | — (added in A-17) | Eye on Design and Mixmag (flyers); CARI "Acidgrafix" (2010s) |
| Webcore | — (added in A-19) | press on Neocities (The Verge, Xataka); a university blog on the "web revival" |
| Terminal | — (added in A-19) | trade catalogues and design kits only (grade B) |

`INFERENCE` (from aligning four taxonomies): Efficiency has no name of its own in the other
taxonomies, and none of the pre-2020 ones covers Neobrutalism. Four may not be the right number.
The names are a proposal; the first run showed that the research labels were not understood.
Y2K and Rave were added at the maintainer's request (A-17) and researched separately
(2026-10-01): both are **adjacent aesthetics**, not kinds of brutalism. Y2K is linked to it only
by trend articles; Rave borrows antidesign's density and rule-breaking. Webcore and Terminal
(A-19) are close to brutalism (hand-made raw pages; text-first monospace); Terminal rests on
grade B sources only. The variants come from the same research and sit inside the nearest style
so the list stays short. Considered and left out: Vaporwave (not brutalist), Memphis,
maximalism and broken grid (an axis: layout formality), kinetic type (a motion setting).

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
- **Y2K:** dates (1990s per CARI; late 1990s–early 2000s per Wikipedia), origin (after Memphis,
  or in the UK rave scene per a fan wiki) and scope (Y2K, Y2K futurism, Cybercore, McBling).
- **Rave:** whether "acid graphics" means 1990s flyers or a 2010s category (CARI dates it to the
  mid-2010s); "garish" vs "minimal, cost-effective" palettes in the original flyers. A black
  background is not established by the stronger sources.
- **Webcore:** site counts for Neocities differ between sources (about 0.6 to 1.3 million).
- **Frutiger Aero:** named in 2017 or 2018, by a member of CARI; sources differ on the year.
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
- **P** CARI, "Y2K Aesthetic" — <https://cari.institute/aesthetics/y2k-aesthetic>; "Acidgrafix" — <https://cari.institute/aesthetics/acidgrafix> (extract)
- **S** Wikipedia, "Y2K aesthetic" — <https://en.wikipedia.org/wiki/Y2K_aesthetic>
- **S** AIGA Eye on Design, "What rave culture is teaching modern graphic designers" — <https://eyeondesign.aiga.org/what-rave-culture-is-teaching-modern-graphic-designers/>
- **S** Mixmag, acid house flyers — <https://mixmag.net/feature/we-turned-your-favourite-festival-line-ups-into-acid-house-flyers>
- **P** Low-tech Magazine, "How to build a low-tech website" — <https://solar.lowtechmagazine.com/about/the-solar-website/>
- **P** Menkman, *Glitch Studies Manifesto* — <https://artcornwall.org/features/Glitch_Studies_Manifesto.htm>
- **A** Martín-Sanromán et al. (2024), New Ugly and postmodernism, *Universum* — <https://uloyola.es/en/scientific-offer/publications/intersecciones-entre-posmodernismo-new-ugly-y-grafica-popular-en-el-diseno-grafico-contemporaneo-article>
- **S** Dazed on Frutiger Aero — <https://www.dazeddigital.com/life-culture/article/58103/1/what-is-frutiger-aero-aesthetic-tiktok-msn-messenger-windows-vista-noughties>
- **S** Xataka on Neocities — <https://www.xatakaon.com/retro/nostalgia-for-the-early-days-of-the-internet-is-a-real-thing-neocities-is-heaven-on-earth-if-you-miss-it-too>
- **B** daisyUI trend catalogue, "Terminal / CLI UI" — <https://trends.daisyui.com/trend/terminal-cli-ui/>
- **B** Webflow, daisyUI trend catalogue and others on Y2K and acid graphics (weak evidence that the names are used).
- **A/S/B** further sources: Harvard GSD 2024 exhibition, SAH Archipedia, a 2022 usability
  study, press pieces, and trade blogs on neobrutalism.

Not read by the research: Banham 1966, the Smithsons' texts, early-web primary sources.
