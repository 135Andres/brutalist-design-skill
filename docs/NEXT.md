# Next — where the work stands (2026-09-30)

Handoff for whoever continues (a remote Claude session, or anyone). Everything needed is in
this repository; the exceptions are listed at the end.

## State

- Repository: `main` on GitHub; site live on GitHub Pages
  (`https://135andres.github.io/brutalist-design-skill/`); npm `brutalist-design-skill@0.1.0`
  published (0.2.0 is prepared in `package.json`; publish after the merge), `npx brutalist-design-skill` works.
- Two audits answered: [`audits/`](audits/). axe-core: 0 violations on every page.

## Waiting for the maintainer

1. Open questions: none (C and F decided in A-17).
2. **Approval** of the drafts `motion.md`, `effects.md`, `resources.md`, `accessibility.md`
   (reviewed and corrected 2026-09-30, see A-10) and of `stacks.md` §2 (new).
3. Radio Estática was **not liked** (recorded in [`FINDINGS.md`](FINDINGS.md)); it stays out
   of the landing.

## Idea from the maintainer: a templates collection

On the project's GitHub Pages site, a collection of **open-source templates** that people can
start from or draw inspiration from, made together with the skill (the code, the tokens and the
tests behind each). Free to use, as the repository is. To scope before building:

- Where they live (for example `examples/templates/<name>/`) and what each holds: the page, a
  tokens file (CSS custom properties), a short README on how to adapt it, and the command that
  produced it.
- Content invented or neutral (A-3), principles taken from references, never their text or marks.
- Each template is accessible (accessibility.md) and says what was and was not verified.
- A landing section that presents them, separate from the existing gallery of experiments.

## Idea from the maintainer: beautiful pages with few tokens (to research)

Extend "Efficiency" beyond a style: make good-looking web pages while spending few tokens. Not
started; the maintainer wants a research first. **Decided (A-18, A-19): a modifier inside `brutalist`** that
combines with any command and style, in one reference file loaded only when used. The next bullet is the earlier view, kept as history.

- Agent's view (`[proposal]`, revised after the research): decide **after measuring**. For now the
  content can live in one reference file of this skill (cost zero until used), written so it can be
  lifted out. Reasons: a separate skill must be self-contained (the installer copies one skill
  folder, so links to another skill's files break), which means duplicating shared files; and the
  cost of one more skill is small (about 100 tokens of metadata per session, per vendor docs), so the
  real risk is overlapping descriptions, not tokens. Against staying a mode: the goal is
  beautiful pages with few tokens in **any** style, and someone who wants that would not search for
  a skill called "brutalist"; if that is the audience, a separate skill is the better home.
- Efficiency is better seen as an **axis that combines with any style** than as a style itself,
  though some styles are cheaper to generate and serve than others.
- Corrected numbers (the first estimates here were wrong in two ways): only a skill's metadata
  (about 100 tokens) is always loaded; the `SKILL.md` body enters when the skill is invoked and then
  **stays in the conversation**, so every line is a recurring cost. And models since Claude 4.7 use
  a tokenizer that yields about 30% more tokens for the same text, so the "4 characters per token"
  estimates (`SKILL.md` ≈ 1.2k, a typical command 6–8k, gallery pages 1.6k–4.5k) are lower bounds
  until counted with the model in use. For scale at list prices, output tokens cost five times input
  tokens and cache reads a tenth, so a page's output can cost more than reading the skill once.
- Costs easy to miss: reasoning ("thinking") tokens are billed as output and cannot be switched off
  in the newest models; each verification screenshot costs about 1.3k–2.7k input tokens; every tool
  call resends the history. Scripts that run without loading their code into the context are the
  best-documented saving, and `scripts/` already works that way.
- Candidate levers to test (none has independent evidence of saving for generating a page): a tokens
  file before the page (the open `DESIGN.md` format is one; see open question C in `SPEC.md`),
  templates, a script that builds a page from a small tokens JSON, system fonts, CSS-only effects,
  edits by diff, fewer verification screenshots, a smaller model.
- First real measurement (2026-10-01, Claude Code on Opus 5.5, 1M window, the installed 0.1.0 skill,
  after invoking `/brutalist` with no command): 42.3k tokens used in total: system tools 13.5k,
  skills 9.1k for 76 skills (about 120 tokens per skill's metadata), messages 16k, memory files
  0.2k, the rest system prompt and instructions. Not isolated yet: how much of the messages is the
  skill body, because there is no baseline taken before invoking it.
- Measuring: `/context` after invoking the skill and `/skill-doctor` in Claude Code show what the
  skill costs; `/usage` shows tokens by model and cache. The research's protocol (same brief,
  one variable at a time, several runs, record input, cache and output tokens, rounds and
  screenshots, judge quality by a person) is the way to compare; it is in the maintainer's private
  research, not in this repository.
- Questions for the research: what drives the cost of generating a page (output size, rounds of
  revision, screenshots, skill context); what levers exist (a tokens/design-system file first,
  reusable templates, system fonts, CSS-only effects, diffs instead of rewrites); what makes a
  small page look good; how to measure quality and cost together.
- Connects to the templates collection: a template turns a page into filling in content.

## The project site (later, once the skill is polished)

When the skill is polished there will be many designs from many points of view, and the site will
share different kinds of brutalism. Goals recorded by the maintainer:

- Optimised for **fluid, animated, intuitive, fast and beautiful** navigation, above all beautiful.
- **More modular** than today (separate files for styles and scripts, per
  [`stacks.md`](../skill/brutalist/references/stacks.md) §2) so that speed is prioritised.
- Starts after the skill is more polished; the templates collection above is part of it.

## Open after the Styles experiment

- The maintainer says the map helped (A-17). Y2K, Rave, Webcore, Terminal and five variants were
  added (A-19, from research); the next `inspire` run should show Y2K and Rave as sketches.
- C of the four sketches was dropped.

## Work that can start

- `inspire` from zero: re-run it on the maintainer's own projects (see the open question on where they live and what may be published), then the same flow with reference images; format 4 (classic derive) later — see
  [`inspire.md`](../skill/brutalist/references/inspire.md); record reactions in FINDINGS.
- `edit`: a second test on a page the agent did not write.
- Test `stacks.md` §2 on a modular project (React/Vue/Svelte/Vite) and on an empty folder.
- Specify `verify`, `critique`, the rest of `stacks`; write `scripts/spring_to_css`.
- Test the installed skill inside each tool (Claude Code first), Node 18 and Windows; check
  the tool folders of Codex, Cursor, Gemini CLI, Copilot and Hermes against their docs.
- A `recreate` test on a reference nobody here authored (the worked example is not
  independent).
- GitHub: repository *topics*; a social-preview image (1280 × 640).

## Releasing

Bump `version` in `package.json`, then `npm publish` (the maintainer's account needs 2FA:
`npm publish --otp=<code>`). Test with `npx brutalist-design-skill@latest --list` afterwards.
Pages rebuilds on every push to `main`.

## Not in the repository (on the maintainer's machine only)

- Third-party reference images #35–#42 (`references/images/`, unknown rights; described in
  [`references/README.md`](../references/README.md)). A remote session will not have them.
- The full texts of the two audits (the public summaries are in [`audits/`](audits/)).
- Screenshots need a Chromium; set `CHROME=/path/to/chrome` for `shots.mjs`.
