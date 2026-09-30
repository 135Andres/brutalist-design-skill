# brutalist-design-skill

An **agent skill for brutalist web design**: it helps any coding AI (Claude Code, Codex,
Gemini CLI, Cursor…) **recreate** brutalist interfaces from reference images, motion
included, or **take inspiration** from them to make something of its own.

> **Status: early draft.** The skill itself is not written yet. This repository holds its
> specification (section by section), the decision log and findings from experiments.
> Working documents are in Spanish; the skill will be written in English.

## What it will do

- **Recreate** — turn a screenshot of a brutalist site into a faithful, working
  interface in whatever stack the project uses. Every property is classified by evidence
  (`observed / measured / estimated / ambiguous / unknown`), inferences and design
  decisions are declared, and the result is compared against the reference under fixed
  conditions. No scores: the human judges.
- **Motion** — if the reference is static, all motion is declared as invention; timings
  are decisions, not measurements. Effects climb a ladder only when needed: native
  browser features first (CSS, SVG filters, WAAPI, scroll-driven animations, View
  Transitions), then an animation library, then WebGL/shaders.
- **Create** — a creative mode that inspires the user instead of copying: digestible
  visual questions, divergent sketches from images, provocations. Still being defined by
  experiment.
- **Rights hygiene** — unknown rights mean the result is a study, not for publication.
  The skill never lectures the user; it only keeps them out of trouble.
- **Accessibility** — contrast warnings with a corrected variant offered separately,
  `prefers-reduced-motion`, pause controls for long-running motion, no flashing.

## Repository map

| Path | Content |
|---|---|
| [`spec/brutalist-interfaces-spec.md`](spec/brutalist-interfaces-spec.md) | the specification (draft; status table at the top) |
| [`decisions/DECISIONS.md`](decisions/DECISIONS.md) | the maintainer's decisions, append-only |
| [`experiments/FINDINGS.md`](experiments/FINDINGS.md) | lessons from creative-mode and editing experiments |
| [`skill/`](skill/README.md) | where the skill will live (Agent Skills format) — empty for now |
| [`references/`](references/README.md) | reference images (descriptions only; images are not versioned) |
| [`tools/shots.mjs`](tools/shots.mjs) | headless-Chromium screenshot helper used for verification |
| [`AGENTS.md`](AGENTS.md) | working rules for AIs contributing here |

## Roadmap

1. Review the motion section, the effects ladder and the resources list.
2. Finish the creative-mode experiments and specify that mode.
3. Decide where "edit an existing page" belongs.
4. Specify `SKILL.md` (router), verification, critique and stack adaptation.
5. Write the skill, a per-tool installer and tests against real references.

## License

[Apache-2.0](LICENSE) © 2026 135andres. Reference images belong to their owners and are
not part of this repository.
