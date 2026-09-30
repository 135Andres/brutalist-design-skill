# Pre-publication audit — 2026-09-29

> Requested by the maintainer: «antes de publicarlo quiero que hagamos una auditoría,
> veamos la accesibilidad y entendibilidad de la skill» (*before publishing, let's audit
> the skill's accessibility and understandability*). Done by the agent on commit
> `5a4ba36`; **line references point to that commit**. It proposes; it does not decide.
> Comparison point: the README of [pbakaus/impeccable](https://github.com/pbakaus/impeccable)
> (read 2026-09-29). *Translated from Spanish (A-4); the response is at the end.*

## Summary

| # | Finding | Axis | Severity |
|---|---|---|---|
| E1 | Nobody can **use** anything: no way to invoke the skill, no user journey | understandability | high |
| E2 | Mixed languages: English README, everything else Spanish; the skill will be English | understandability · accessibility | high |
| E3 | Three names and four mode names for the same things | understandability | high |
| E4 | Examples depend on images the repository does not publish | understandability | high |
| E5 | Citations a public reader cannot check (`[prev]` ×14, `[CD:575-590]`) | understandability · trust | medium |
| E6 | Internal jargon with no glossary (rung, evidence state, DR5-n, ADDED…) | understandability | medium |
| E7 | The spec mixes process (revisions, statuses) with content | understandability | low |
| A1 | Accessibility of the output is split across two sections, no single home | accessibility | medium |
| A2 | Accessibility risks **specific to brutalism** are missing | accessibility | high |
| A3 | Unclear which build is delivered (fidelity vs `build-a11y`) | accessibility | medium |
| A4 | Verifying accessibility has no method (no tool, no keyboard pass) | accessibility | medium |
| A5 | Barrier to entry: Chromium needed to verify; no installer exists | accessibility (of the skill) | low |

## Understandability

**E1 · No way to use it.** The README described what the skill *will* do
(`README.md:11-29`) but had no command, no "what do I give it / what do I get", no
example. Impeccable opens with a concrete promise, a one-line quick start, a command table
and usage examples. The recreate journey existed, buried in the spec: input = image;
output = `recreations/<slug>/` with `inventory.md`, build, screenshots and `report.md`
(`spec:228-231`). → Define the **interface** (commands) and put it at the top of the
README, marked "planned" until it exists.

**E2 · Languages.** README in English; spec, decisions, findings and `AGENTS.md` in
Spanish; the skill to be written in English. An English reader could not read the spec; a
Spanish reader entered through a README in another language. Report markers mixed
languages: `observed/measured` next to `REPRODUCIDO`, `AÑADIDO`, `SUSTITUIDO`
(`spec:68-73`), and would have ended up inside an English skill. → Decide the public
language; at least translate the markers now.

**E3 · Names.** Repo `brutalist-design-skill`, skill `brutalist-interfaces` (`spec:1`),
and modes: the README said *Recreate / Motion / Create* (`README.md:13-24`); the spec said
RECREAR, DERIVAR, "creative mode" (`spec:18,32`) and separately "edit pages" (`spec:19`).
Motion was not a mode in the spec but a layer the modes load. → One name and one command
list, used the same everywhere.

**E4 · Invisible examples.** The spec explained with #35–#38 (`spec:106,152,257,292`)
and the findings with "format 2 · s1–s4", but neither the images nor the sketches are in
the repository (rights, A-3). → Create **original references** (designed here, rights
held) and one complete worked example: image → inventory → build → report.

**E5 · Uncheckable citations.** `[prev]` appeared 14 times
(`spec:26,34,62,105,141,153,257,284,287,288,300,307,308,318`) and `[CD:575-590]` cited
lines of a local file (`spec:130`). Honest, but a reader cannot follow them. → Where a
rule stands on its own, drop the citation; where it does not, give the reason in one
sentence.

**E6 · Jargon.** "Rung", "ladder", "evidence state", "cost and permission", `DR5-n`,
`A-n`, `INFERENCE/DECISION`, five actions and five fidelities. All defined, but scattered.
→ `glossary.md` as the single home, linked everywhere.

**E7 · Process mixed with content.** "Closed (rev. 5)", "forward dependencies", "pending
question B" sat next to the rules. Fine for a working spec, confusing for a visitor. →
The README points to the spec as a working document; stable content lives in `skill/`.

## Accessibility

### Of what the skill produces

**Already covered** (well): contrast below AA warned with pairs and ratios, fix as a
separate variant (`spec:200-202`); semantics, focus ring, `alt`, `prefers-reduced-motion`
in CSS and JS (`spec:198-199,300`); WCAG 2.3.1 flashing and 2.2.2 pause with its three
conditions (`spec:301-304`); keyboard and touch equivalents (`spec:310-312`); loops paused
off-screen (`spec:309`).

**A1 · No single home.** It lived in recreate §4 and motion §5; the creative mode and
editing did not inherit it explicitly. → `accessibility.md`, loaded by every command.

**A2 · Brutalism-specific risks, not covered** — exactly the devices the skill will
recreate:

| Brutalist device | Risk | Criterion |
|---|---|---|
| giant type, page-filling sentences | no reflow at 320 px; clipped at 200 % zoom | WCAG 1.4.10, 1.4.4 |
| outlined text (`-webkit-text-stroke`), text over texture | contrast of the stroke, not the fill; illegible when thin | 1.4.3, 1.4.11 |
| marquees with duplicated text | screen readers read it N times | 1.3.1 (duplicates `aria-hidden`) |
| vertical, rotated, 3D or curved text | reading order and semantics break; decorative text without an equivalent | 1.3.2, 1.1.1 |
| sticky bar covering content | focus hidden (seen in the experiments) | 2.4.11 |
| custom or hidden cursor | the pointer disappears | 2.4.7 (visible focus), usability |
| unstyled links, text-only buttons | distinguished by color alone | 1.4.1 |
| tiny targets in dense grids | hard to hit | 2.5.8 |
| horizontal or hijacked scroll | disorienting; keyboard trapped | 2.1.1, 2.1.2 |
| meaning by color or shape only (e.g. tags) | not perceivable by everyone | 1.4.1 |

→ A table like this in `accessibility.md`, with a default behaviour for each device.

**A3 · What is delivered?** Recreate has a fidelity build and `build-a11y`
(`spec:198-202`); it did not say which is the default deliverable or how the user
chooses. Semantics and focus are `ADDED` *inside* the fidelity build, contrast is not. →
An explicit rule: deliver both; the report says which is publishable.

**A4 · No method to verify accessibility.** `verify.md` pending; no automated tool (e.g.
axe-core over CDP) and no manual keyboard pass (Tab through everything, visible focus,
Escape). The experiments showed automated checks fail silently. → Automated + manual +
screenshots, and state what was not verified.

### Of the skill itself

**A5.** Visual verification needs Chromium; there is a path without a browser ("visual
comparison not performed", `spec:215`) — good. No per-tool installer yet;
`tools/shots.mjs` needs `CHROME`. Layered loading keeps context small — good.

### Of the documents

Markdown with headings and tables: readable. Minor: very long table rows (`spec:19`),
emphasis by capitals, no table of contents in the spec (380 lines).

## Response (A-4, same day)

The maintainer decided: English everywhere; skill name `brutalist`; six commands
(`recreate`, `motion`, `inspire`, `edit`, `verify`, `critique`); original references for
publishable examples. Applied:

| Finding | Response |
|---|---|
| E1 | `SKILL.md` with a command table; README rebuilt around commands and a quick start |
| E2 | all public documents translated to English; markers now `BUILT · SUBSTITUTED · ADDED · INVENTED · OMITTED` and `REPRODUCED · APPROXIMATE · DIVERGENT · NOT COMPARED` |
| E3 | one name (`brutalist`) and one command list everywhere |
| E4 | three original references and one worked example in `examples/` — with a limitation: the same agent made the reference and the recreation, so it demonstrates the method, not its difficulty |
| E5 | `[prev]` and `[CD]` citations removed from the skill; rules stand on their own |
| E6 | [`glossary.md`](../../skill/brutalist/references/glossary.md) |
| E7 | content in `skill/brutalist/`; `docs/SPEC.md` keeps only status, rationale and open questions |
| A1, A2 | [`accessibility.md`](../../skill/brutalist/references/accessibility.md) (draft, pending review) |
| A3 | draft rule in `accessibility.md`; open question E in `docs/SPEC.md` |
| A4 | interim method in `accessibility.md` §Verify, applied in the worked example (axe-core, keyboard, 320 px, 200 % zoom, reduced motion, no JS); `verify.md` still to specify |
| A5 | unchanged: installer still planned |
