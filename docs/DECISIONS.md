# Decision log

> The maintainer's decisions about the skill. **Append-only**: nothing is rewritten; a
> new decision that changes an earlier one says so and points to it. Anything that does
> not cite this file is not a decision. Items marked `[proposal]` come from the agent.
>
> Work began in a private context (2026-09-27 → 2026-09-29) that is not part of this
> repository; only decisions about the general skill are recorded here.

## DR5 — a general brutalist design skill (2026-09-29)

- **DR5-1 · General skill.** Not tied to any project. The maintainer's words: "General, made for creative brutalist designs. I want every beautiful, animated brutalist design image on Pinterest to be recreatable." Rules specific to earlier
  projects are not carried over; the rule "reference to principle, never to copy" from an
  earlier method **does not apply to recreate**.
- **DR5-2 · Two modes:** recreate (reproduce a visual reference as an interface) and
  derive (extract principles and produce something original). *Scope changed by A-1.*
- **DR5-3 · Stack:** whatever the project uses; the skill does not impose one.
- **DR5-4 · Effects and motion: the full ladder.** Native browser features first; an
  animation library if needed; WebGL/shaders after that.
- **DR5-5 · Tests:** with references #35–#38 and more images the maintainer will add
  (those images are not published: see A-3).
- **DR5-6 · Form:** the open Agent Skills format (`SKILL.md` + `references/` +
  `scripts/`) with layered loading, plus a per-tool installer.
- **DR5-7 · Fidelity vs accessibility (recreate):** in study mode the original color is
  kept, a warning is given, and the fix is offered as a separate variant marked `ADDED`.
  Nothing is corrected silently.

**Defaults proposed by the agent and accepted** ("Yes, let's go with A"): provisional name
`brutalist-interfaces` (*superseded by A-4*); skill content in **English**
(*superseded by A-4*).

## A-1 · The creative mode stays open (2026-09-29)

*Changes DR5-2.* Recreate stays as is; the second mode becomes a **creative mode not yet
defined**, of which derive is only one possible form.

1. **The skill imposes nothing on the user.** Recreate reproduces faithfully, with no
   lecture about originality; its only limit is rights hygiene. The demand for character
   falls on what the skill produces in its creative mode. No scores, checklists or
   judgement of the user; the human judges.
2. **The creative mode is defined by experiment.** The maintainer's words: "It could be deriving, creating from scratch, applying derive's principles but letting the AI be inspired instead of recreating. It is more about the AI inspiring the user — maybe questions the user can digest, maybe sketches, maybe a round of questions; we have to experiment, because creating has no fixed shape."

Consequences: the creative mode is not specified until there are results; its name was
open (*resolved by A-4: `inspire`*). A **maintainer proposal** recorded later: the skill
should be able to **edit existing pages** ("There's no need to settle on one design from the start; we have to explore and experiment with different designs, so let's work hard on making recreation or inspiration from images really good".

## A-3 · Public repository (2026-09-29)

1. **Nothing from the private context of origin** is published: not its research, its
   experiments or its samples. Only the general work on the skill.
2. **License:** Apache-2.0.
3. **Reference images:** unknown rights → **not versioned** (`.gitignore`); only their
   description in `references/README.md`.

## A-4 · Structure before publishing (2026-09-29)

After the pre-publication audit ([`audits/2026-09-29-pre-publication.md`](audits/2026-09-29-pre-publication.md)):

1. **Language:** all public documents in **English**.
2. **Name:** the skill is **`brutalist`** (supersedes `brutalist-interfaces`).
3. **Commands:** one skill with six commands — `recreate`, `motion`, `inspire`, `edit`,
   `verify`, `critique`. `inspire` and `edit` are marked experimental.
4. **Examples:** create **original brutalist references** in this repository (rights
   held) and one fully worked example, so examples can be published.

`[proposal]` applied with this restructure (the maintainer asked to "I didn't like the recreate example as much — I get it, but it is brutalism; I'd like something more like this", with four third-party references (#39–#42, described in
`references/README.md`, not versioned). And of the type-test sketch from the private
experiments: "It's the one I liked most of what we made with this skill".

1. **Type-test design:** rebuilt with the **same design and invented content**; nothing
   from the private project is published (A-3 stands).
2. **Gallery:** new original pages in the spirit of #39–#42 (principles only) go at the top
   of the README; the Concrete Radio example stays as the step-by-step method demo.
3. **Live site:** the pages are published with GitHub Pages and linked from the README;
   the agent asks before enabling it.

## A-6 · A custom installer (2026-09-30)

The maintainer's words: "We were missing a command to install the skill — Impeccable uses npx, but I'd like something more custom, brutalist, with a beautiful, simple, animated design".

`[proposal]` applied: a single dependency-free `install.mjs` run with
`npx github:135Andres/brutalist-design-skill` (no npm publishing needed — *changed by A-7*); the word drawn in
blocks, a signal-red bar, a command ticker, a keyboard menu (where → which tools) and progress
bars; animation off outside a terminal, in CI, with `--no-anim` or `NO_MOTION`. Tool folders
follow the locations documented by each tool, as listed in Impeccable's README.

## A-7 · Published on npm (2026-09-30)

npm 12 refuses packages fetched from git by default (`allow-git = "none"`), so
`npx github:…` fails for its users. Offered three ways (npm, a flag, a curl script), the
maintainer chose **publishing on npm**: the command is `npx brutalist-design-skill`.

## A-8 · Pages live; second audit (2026-09-30)

1. The maintainer approved pushing and enabling GitHub Pages ("Yes, push it and enable Pages");
   the site is live at `https://135andres.github.io/brutalist-design-skill/`.
2. A second audit by another agent
   ([`audits/2026-09-30-second-audit.md`](audits/2026-09-30-second-audit.md)) was answered
   before publishing on npm. `[proposal]` applied in the response: updating the installed
   skill keeps an edited copy in `~/.brutalist-skill/backups/` instead of overwriting it.

## A-9 · Published; work continues remotely (2026-09-30)

1. `brutalist-design-skill@0.1.0` is on npm; `npx brutalist-design-skill` works from the
   registry.
2. The maintainer continues the work from a remote Claude session. What is pending lives in
   [`NEXT.md`](NEXT.md).

## A-10 · Output format follows the project; review fixes (2026-09-30)

The maintainer's request: by default the skill creates designs in one HTML file (it
already does), but if it detects that the project splits its files into modules, it should
do that too.

1. **Applied:** [`stacks.md`](../skill/brutalist/references/stacks.md) §2 — one `index.html`
   by default; modular files in the project's own system when detected, with the evidence
   named. Untested until run on a real modular project.
2. **`[proposal]`, applied as a draft, not yet reviewed:** the user's words override
   detection; sketches from `inspire` stay one file; `edit` never changes a page's format.
3. **Review fixes** (the maintainer asked for them after the review in chat): motion §5 no
   longer repeats `accessibility.md`; motion states which sections apply outside `recreate`;
   the two-rounds cap in motion now points to its home in `recreate` §5; `resources.md`
   column renamed "Consulted by"; `accessibility.md` gained input-equivalent, hover-content
   and text-spacing rows.
4. **Open questions A–E stay open**; the proposals made in chat are not decisions.

## A-11 · Open questions A, B, D, E decided; one language; branches (2026-09-30)

The maintainer accepted the agent's proposals for A, B, D and E as decisions.

1. **A — existing animation library:** using a library the project already has is **not** a
   rung climb; declare it in the motion plan. Adding a new animation dependency is a climb.
   Applied in `effects.md` and `stacks.md` §4.
2. **B — invented motion and higher rungs:** allowed **if declared** (`DECISION` + a
   concrete reason); climbing silently is never allowed. Applied in `effects.md`.
3. **D — accessibility loading:** `accessibility.md` is loaded by every command that writes
   code. `SKILL.md` already said so.
4. **E — two builds:** deliver the fidelity build and `build-a11y` **only when they differ**
   (a failed contrast or other check); otherwise one build, with a note saying so. Applied
   in `accessibility.md`.
5. **C — `DESIGN.md` export:** still open. Agent's view (`[proposal]`): not now. `inventory.md`
   is already the one home for that information; a second file would duplicate it (AGENTS
   rule 5), and the format could not be verified (designmd.ai was unreachable from the
   session; its license is unknown). If adopted later: a generated export, never hand-edited.
6. **Language:** everything documented and pushed is in **one language, English**.
7. **Branches:** the agent's working branch was renamed `v0.1` (a snapshot of the state at
   this decision); new changes go to a separate working branch, `claude/dev`.
8. **No code for now:** until told otherwise, the agent writes and edits documents only;
   it runs no tests and writes no programs.

## A-12 · The skill holds no judgements; an optional setup (2026-09-30)

The maintainer's direction: the skill must not carry the maintainer's own judgements (for
example that giant type is noise); that depends on the user of the skill, and not every
project ends up with giant letters while some do. Instead, when the user is still imagining
the page, the skill offers a **setup**: optional questions about colours, whether to add
elements or keep pure brutalism, typography and the like. Answering is never required.

1. **Applied:** new [`setup.md`](../skill/brutalist/references/setup.md), loaded by `inspire`;
   linked from `SKILL.md`. Unanswered questions become declared `DECISION`s; answers are
   recorded as `stated by the user`.
2. **Applied:** the judgements that had entered the skill text (about type scale, accent
   colours, which results were liked or rejected, a "brutalist check") were removed from
   `inspire.md` and `edit.md`. Reactions and lessons stay in [`FINDINGS.md`](FINDINGS.md),
   which records the maintainer's experiments, not the skill's rules.
3. Untested until run with a user.

## A-13 · A descriptive map of positions; a marker removed (2026-09-30)

1. `[proposal]` — **clarifies A-12, which stands.** The skill never imposes a definition of
   brutalism or a taste on the user's work or references; `recreate` is unchanged. The skill
   may carry a **map of positions** in the field, descriptive and sourced, with contested
   points marked, which agents may **offer** as options. Offering is not imposing. When the
   brief is silent and the agent picks a position, it is a `DECISION` with its reason, taken
   from the brief, the reference or the map (cited), not from silent preference. The map is
   never prescriptive and no command scores adherence to a position.
2. **Applied as a draft:** [`field-map.md`](../skill/brutalist/references/field-map.md)
   (experimental, reviewed 2026-09-30), a "Field terms" section in `glossary.md`, a
   "Positions" format in `inspire.md` (not tried), and one line in `SKILL.md`. The
   maintainer said to use the sources given by an earlier research; **the agent did not
   re-read the primary texts** (the session's network policy blocked them) and the map says so.
3. **Corrects A-12 item 1:** the marker `stated by the user` is dropped, because the
   vocabulary is closed (`INFERENCE`, `DECISION`). The user's answers are recorded in a
   "User's words" section of the notes instead. `setup.md` and `inspire.md` updated.
4. **Correction of a mistake:** `recreate.md`, which is closed, had been edited earlier in
   the session; it was restored to its closed text.
5. Open: whether `critique` may read a user's own page (question F in `SPEC.md`); how the
   setup question on strictness and the map relate; the map is untested with a user.

## A-14 · Plain names for the positions; a templates idea (2026-10-01)

1. The maintainer found the names of the four positions unintelligible except the second
   ("efficiency": some people want a cheap, light, working placeholder design) and, partly,
   the third, which is easier to understand while seeing previews in the CLI. They also said that
   neither their opinion nor anyone's should define what brutalism is: the skill is a helper for
   people who want to build it with AI.
2. **Applied as a draft (`[proposal]`):** `field-map.md` now uses plain names with a line of what
   you would see and an ASCII preview ("Structure and type only", "Just what's needed", "Breaks
   the rules", "Bold look, clear controls"); the research labels stay in brackets for traceability.
   The next Positions test starts by explaining the step in plain words (`inspire.md`).
3. The maintainer vouches for the sources of the research, so the map no longer carries a note that
   the agent did not re-read them.
4. **Idea recorded, not started:** a templates collection on the project site (see `NEXT.md`).

## A-15 · Styles are named by what people call them; "styles" replaces "positions" (2026-10-01)

1. The maintainer did not like the plain names proposed in A-14 (too long, or not convincing) and
   asked to use the names people already use: brutalism for brutalism, neobrutalism for the one
   with bold borders and clear controls, and the real name of the clash one, so that the user is
   encouraged to **research what a style means before asking the agent to design**. For the
   efficiency one the maintainer preferred the original name.
2. **Applied as a draft (`[proposal]`):** `field-map.md` names the four styles Brutalism,
   Efficiency, Antidesign and Neobrutalism, with a look-up hint and a preview each.
3. The word "positions" is replaced by **"styles"** in the skill files (a proposal; other words
   considered: modes, approaches, directions — "directions" is already used by the Derive format).
4. The user sees a style's name only when the agent says it in the conversation; they can pick it
   by typing the name or describing it, with no command. `field-map.md` is for the agent.
5. **Recorded in `NEXT.md`:** the project site should later be modular and optimised for fluid,
   animated, intuitive, fast and above all beautiful navigation.
6. Earlier entries (A-13, A-14) still say "positions"; they are history.

## A-16 · Proposals approved; release path (2026-10-01)

1. The maintainer approved as decisions the proposals marked `[proposal]` in **A-13** (item 1: the
   map of styles is descriptive, offered and never imposed), **A-14** (item 2: plain names with
   previews, superseded in detail by A-15) and **A-15** (items 2 and 3: the four style names and the
   word "styles"). The `[proposal]` marker in those entries is history; they now stand.
2. **Not covered:** the `[proposal]` in A-10 item 2 (the user's words override detection; sketches
   stay one file; `edit` keeps a page's format) is still unreviewed.
3. **Release path:** the work on `claude/dev` goes to `main` through a pull request, which lists what
   improves the quality of use for users; the npm package is to be updated (version 0.2.0). Publishing
   needs the maintainer's account and 2FA, so it is the maintainer's step after the merge.

## Open questions

Kept in one place: [`SPEC.md` § Open questions](SPEC.md#open-questions). *(This section
listed them until 2026-09-29; moved to avoid two copies.)*
