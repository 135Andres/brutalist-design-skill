# Decision log

> The maintainer's decisions about the skill. **Append-only**: nothing is rewritten; a
> new decision that changes an earlier one says so and points to it. Anything that does
> not cite this file is not a decision. Items marked `[proposal]` come from the agent.
>
> Work began in a private context (2026-09-27 → 2026-09-29) that is not part of this
> repository; only decisions about the general skill are recorded here.
>
> **Translated from Spanish on 2026-09-29 (A-4).** The Spanish original is in the git
> history (commit `d347d7f`). The maintainer's own words are kept verbatim in Spanish,
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

## Open questions

Kept in one place: [`SPEC.md` § Open questions](SPEC.md#open-questions). *(This section
listed them until 2026-09-29; moved to avoid two copies.)*
