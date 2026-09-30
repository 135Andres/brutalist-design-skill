# Specification status

> Working document. The **content** of the skill lives in
> [`skill/brutalist/`](../skill/brutalist/SKILL.md), one home per fact; this file keeps
> only the status of each part, why it is shaped this way, and what is still open.
> Decisions: [DECISIONS](DECISIONS.md) (`DR5-n`, `A-n`). The earlier Spanish version of
> the full spec is in the git history (commit `5a4ba36`).

## Status

| Part | File | Status |
|---|---|---|
| Router and principles | [`SKILL.md`](../skill/brutalist/SKILL.md) | draft (A-4) |
| `recreate` | [`recreate.md`](../skill/brutalist/references/recreate.md) | **closed** by the maintainer (rev. 5) |
| `motion` | [`motion.md`](../skill/brutalist/references/motion.md) | rev. 3, **pending review** |
| Effects ladder | [`effects.md`](../skill/brutalist/references/effects.md) | pending review (with motion) |
| Resources | [`resources.md`](../skill/brutalist/references/resources.md) | pending review (with motion) |
| Accessibility | [`accessibility.md`](../skill/brutalist/references/accessibility.md) | **new draft** from the audit; pending review |
| Glossary | [`glossary.md`](../skill/brutalist/references/glossary.md) | new; collects existing definitions |
| `inspire` | [`inspire.md`](../skill/brutalist/references/inspire.md) | **experimental** (A-1): formats 2–4 still to test |
| `edit` | [`edit.md`](../skill/brutalist/references/edit.md) | **experimental**: needs a test on a page the agent did not write |
| `verify` | [`verify.md`](../skill/brutalist/references/verify.md) | not specified (interim rules) |
| `critique` | [`critique.md`](../skill/brutalist/references/critique.md) | not specified |
| Stacks | [`stacks.md`](../skill/brutalist/references/stacks.md) | **partly specified**: output format (one file / modular) drafted (A-10), untested |
| Templates | [`templates/`](../skill/brutalist/templates/) | new; follow the closed vocabulary |
| Scripts | `sample_palette.py`, `find_rules.py`, `ink_bbox.py`, `overlay.html`, `shots.mjs` | written; used in the worked example. `spring_to_css`: planned |
| Per-tool installer | [`install.mjs`](../install.mjs) (`npx brutalist-design-skill`) | done (A-6, A-7); **published on npm, 0.1.0**, and `npx brutalist-design-skill` tested from the registry; copy tested into Claude Code, Codex and Hermes folders of a test home; loading inside each tool not tested |
| Gallery and site | [`examples/gallery/`](../examples/gallery/), [`index.html`](../index.html) | live on GitHub Pages (A-5, A-8); axe-core: 0 violations on every page after the second audit |
| Worked example | [`examples/recreate-concrete-radio/`](../examples/recreate-concrete-radio/README.md) | done; not an independent test (same author as its reference) |
| Tests against real references | — | planned (DR5-5) |

## Why it is shaped this way

- **Evidence states** exist because a still image cannot tell you speed, hover states or
  what lies outside the crop; the skill must not present guesses with the confidence of
  measurements.
- **Inferences and decisions are separate** from observations so a reader can see which
  parts of a recreation are the reference and which are the agent.
- **Cost vs permission** in the ladder keeps faithful effects faithful, lets invented
  motion stay cheap, and still allows ambition as long as it is declared.
- **No scores** because self-evaluation by the model is not evidence of quality.
- **Accessibility as a separate variant** in recreate (DR5-7) keeps the study faithful
  without shipping an inaccessible page silently.

## Open questions

- **A.** If the project already uses an animation library, does using it count as
  climbing a rung?
- **B.** May invented motion justify a higher rung when declared, or only the static look
  and an animated source? (`effects.md` assumes yes, declared.)
- **C.** Should `recreate` also export the inventory as `DESIGN.md`?
- **D.** Is `accessibility.md` loaded by every command that writes code? (audit A1;
  `SKILL.md` already assumes yes.)
- **E.** Deliver both builds (fidelity and `build-a11y`) and state which is publishable?
  (audit A3; draft rule in `accessibility.md`.)

## Next

1. Maintainer review of `motion`, `effects`, `resources`, `accessibility`.
2. Creative-mode formats 2–4 → specify `inspire`.
3. A second `edit` test on a page the agent did not write.
4. Specify `verify`, `critique`, `stacks`; write the scripts.
5. Installer per tool; tests against real references.
