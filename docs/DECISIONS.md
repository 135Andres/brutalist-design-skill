# Decision log

> The maintainer's decisions about the skill. **Append-only**: nothing is rewritten; a
> new decision that changes an earlier one says so and points to it. Anything that does
> not cite this file is not a decision. Items marked `[proposal]` come from the agent.
>
> Work began in a private context (2026-09-27 → 2026-09-29) that is not part of this
> repository; only decisions about the general skill are recorded here.
>
> **Translated from Spanish on 2026-09-29 (A-4).** The Spanish original is in the git
> history (commit `5a4ba36`). The maintainer's own words are kept verbatim in Spanish,
> followed by a translation.

## DR5 — a general brutalist design skill (2026-09-29)

- **DR5-1 · General skill.** Not tied to any project. The maintainer's words: «General,
  hecho para diseños brutalistas creativos. Quiero que se puedan recrear todas las
  imagenes de diseños brutalistas con animaciones y bonitas que hay en pinterest.»
  (*General, made for creative brutalist designs. I want every beautiful, animated
  brutalist design image on Pinterest to be recreatable.*) Rules specific to earlier
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

**Defaults proposed by the agent and accepted** («sí, vamos con A»): provisional name
`brutalist-interfaces` (*superseded by A-4*); skill content in **English** (working
documents in Spanish — *superseded by A-4*).

## A-1 · The creative mode stays open (2026-09-29)

*Changes DR5-2.* Recreate stays as is; the second mode becomes a **creative mode not yet
defined**, of which derive is only one possible form.

1. **The skill imposes nothing on the user.** Recreate reproduces faithfully, with no
   lecture about originality; its only limit is rights hygiene. The demand for character
   falls on what the skill produces in its creative mode. No scores, checklists or
   judgement of the user; the human judges.
2. **The creative mode is defined by experiment.** The maintainer's words: «Puede ser
   derivar, crear desde 0, podria aplicar los principios de derivar pero en vez de
   intentar recrear, haria que la IA se inspire. Esto es más sobre que la IA inspire al
   usuario, tal vez que le haga preguntas que el usuario pueda digerir, tal vez que haga
   bosquejos, tal vez que haga una ronda de preguntas, hay que experimentar sobre esto
   porque crear no tiene pies ni cabeza.» (*It could be deriving, creating from scratch,
   applying derive's principles but letting the AI be inspired instead of recreating.
   It is more about the AI inspiring the user — maybe questions the user can digest,
   maybe sketches, maybe a round of questions; we have to experiment, because creating
   has no fixed shape.*)

Consequences: the creative mode is not specified until there are results; its name was
open (*resolved by A-4: `inspire`*). A **maintainer proposal** recorded later: the skill
should be able to **edit existing pages** («darle más sazón», *give it more flavour*);
whether that is its own mode was open (*resolved by A-4: `edit` command*).

## A-2 · Own repository and an image-first direction (2026-09-29)

1. The work lives in its own repository, `brutalist-design-skill`, under git.
2. Direction, in the maintainer's words: «no es necesario que quede 1 diseño desde el
   principio, recordemos que se tiene que explorar y experimentar diferentes diseños,
   por eso vamos a esforzarnos en hacer muy buenoel apartado de recreacion o inspiracion
   en base a imagenes» (*there's no need to settle on one design from the start; we have
   to explore and experiment with different designs, so let's work hard on making
   recreation or inspiration from images really good*).

## A-3 · Public repository (2026-09-29)

1. **Nothing from the private context of origin** is published: not its research, its
   experiments or its samples. Only the general work on the skill.
2. **License:** Apache-2.0.
3. **Reference images:** unknown rights → **not versioned** (`.gitignore`); only their
   description in `references/README.md`.

## A-4 · Structure before publishing (2026-09-29)

After the pre-publication audit ([`audits/2026-09-29-pre-publication.md`](audits/2026-09-29-pre-publication.md)):

1. **Language:** all public documents in **English** (supersedes the "working documents
   in Spanish" default). The maintainer's quotes stay in Spanish with a translation.
2. **Name:** the skill is **`brutalist`** (supersedes `brutalist-interfaces`).
3. **Commands:** one skill with six commands — `recreate`, `motion`, `inspire`, `edit`,
   `verify`, `critique`. `inspire` and `edit` are marked experimental.
4. **Examples:** create **original brutalist references** in this repository (rights
   held) and one fully worked example, so examples can be published.

`[proposal]` applied with this restructure (the maintainer asked to «estructurar un poco
más la skill», *structure the skill a bit more*; not separately approved): content moves from the spec into the skill's
reference files (one home per fact); `accessibility.md` and `glossary.md` are new; the
spec keeps only status, rationale and open questions.

## A-5 · A gallery, a live site, and the type-test design (2026-09-30)

After seeing the worked example, the maintainer's words: «no me gustó tanto la que pusiste
de ejemplo de recreado, entiendo eso pero pues es brutalismo, me gustaria mas algo como
esto» (*I didn't like the recreate example as much — I get it, but it is brutalism; I'd
like something more like this*), with four third-party references (#39–#42, described in
`references/README.md`, not versioned). And of the type-test sketch from the private
experiments: «es la que más me gustó que hicimos con esta skill» (*it's the one I liked
most of what we made with this skill*).

1. **Type-test design:** rebuilt with the **same design and invented content**; nothing
   from the private project is published (A-3 stands).
2. **Gallery:** new original pages in the spirit of #39–#42 (principles only) go at the top
   of the README; the Concrete Radio example stays as the step-by-step method demo.
3. **Live site:** the pages are published with GitHub Pages and linked from the README;
   the agent asks before enabling it.

## A-6 · A custom installer (2026-09-30)

The maintainer's words: «nos faltó un comando para instalar la skill! veo que impeccable usa
npx, pero me gustaria hacer algo un poco más custom, algo brutalista, con un diseño bonito,
simple, animado» (*we were missing a command to install the skill — Impeccable uses npx, but
I'd like something more custom, brutalist, with a beautiful, simple, animated design*).

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

1. The maintainer approved pushing and enabling GitHub Pages («Sí, sube y activa Pages»);
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

## Open questions

Kept in one place: [`SPEC.md` § Open questions](SPEC.md#open-questions). *(This section
listed them until 2026-09-29; moved to avoid two copies.)*
