# brutalist

**An agent skill for brutalist web design.** Give your coding AI a screenshot of a
brutalist site and it rebuilds it as a working page — motion included — or uses it as a
springboard for something new. One skill, six commands, measuring scripts, and a worked
example you can check pixel by pixel.

> **Status: early draft.** `recreate` is fully specified and demonstrated end to end.
> `motion` is under review; `inspire` and `edit` are experimental; `verify` and `critique`
> are not specified yet. Nothing is packaged: install by copying a folder (see below).

| Reference (a still image) | What `recreate` built from it | Difference (black = identical) |
|---|---|---|
| ![reference](examples/references/ref-a-concrete-radio.png) | ![build](examples/recreate-concrete-radio/screens/build.png) | ![difference](examples/recreate-concrete-radio/screens/overlay-diff.png) |

## Why

Brutalist and experimental sites are where the interesting references are — and the
hardest to rebuild from a picture. A still image does not tell you the font, the speed of
the marquee, what happens on hover, or what is below the fold. Left alone, an AI guesses
and presents the guesses as fact, or smooths the design back into a template.

This skill makes the agent **say how it knows**: every property it reads from a reference
is `observed`, `measured`, `estimated`, `ambiguous` or `unknown`; everything it infers or
chooses is marked `INFERENCE` or `DECISION`. It measures instead of eyeballing, climbs to
heavier techniques only when the design needs them, and never scores its own work — you
judge.

## Commands

```
/brutalist <command> <target>
```

| Command | What it does | Status |
|---|---|---|
| `recreate <image>` | Rebuild a reference image as a working interface: rights check, inventory, build, fixed-condition comparison, report | specified |
| `motion <page>` | Plan and build motion — from an animated source, or declared as invention for a still | under review |
| `inspire <images…>` | Turn references into divergent sketches and digestible visual questions, taking principles, not copies | experimental |
| `edit <page>` | Change an existing page: the smallest change first, escalate only if needed | experimental |
| `verify <page>` | Screenshots under fixed conditions, comparison and an accessibility pass | not specified |
| `critique <page>` | A design review without scores | not specified |

No command? Describe what you want — "rebuild this", "inspire me with these", "give this
page more flavour" — and the skill picks the command.

```
/brutalist recreate refs/poster-site.png
/brutalist motion recreations/poster-site/build/index.html
/brutalist inspire refs/*.png
/brutalist edit src/pages/home.html
```

## What makes it different

- **Evidence, not vibes.** An inventory before any code, in three parts that never mix:
  what the reference shows, what the agent infers, what it decides.
- **Measured.** Grid, palette and type sizes come from pixels through small scripts;
  fonts are identified by calibration and stay `ambiguous` when the pixels cannot tell.
- **Native first.** Effects climb a ladder — native browser features (CSS, SVG filters,
  Web Animations, scroll-driven animations, View Transitions) → an animation library →
  WebGL — and never silently.
- **Honest motion.** From a still image, all motion is invention and is declared as such;
  timings are decisions, not measurements.
- **Accessible by default.** Semantics, focus, reduced motion and pause controls without
  changing the look; contrast problems fixed in a separate variant; a table of the risks
  brutalism brings (giant type that does not reflow, outlined text, duplicated marquee
  text, rotated or 3D text…).
- **No scores.** Verified in a real browser, with what was *not* verified stated. The
  human judges.
- **No lectures.** Recreating a reference faithfully is fine. The only limit is rights:
  unknown rights make the result a study, not for publication.

## Worked example

[`examples/recreate-concrete-radio/`](examples/recreate-concrete-radio/README.md) — one
PNG to a working page: measured inventory, font calibration, two comparison rounds (and
the residuals reported, not hidden), a motion plan, accessibility checks, and every
command to reproduce it. Two more original references to practise on are in
[`examples/`](examples/README.md).

## Install (manual, for now)

The skill is a folder in the open [Agent Skills](https://agentskills.io) format:
[`skill/brutalist/`](skill/brutalist/SKILL.md). Copy it where your tool looks for skills,
for example in Claude Code:

```bash
cp -r skill/brutalist ~/.claude/skills/            # all projects
cp -r skill/brutalist your-project/.claude/skills/ # one project
```

Other tools that read Agent Skills have their own skills folder; a per-tool installer is
planned. Installation has not been tested in every tool yet.

**Scripts** (optional; without them the agent says which steps were done by eye):

| Script | Does | Needs |
|---|---|---|
| [`sample_palette.py`](skill/brutalist/scripts/sample_palette.py) | colors from flat patches or clusters; WCAG contrast between them | Python 3, Pillow, numpy |
| [`find_rules.py`](skill/brutalist/scripts/find_rules.py) | rules and bands → grid fractions | idem |
| [`ink_bbox.py`](skill/brutalist/scripts/ink_bbox.py) | box of the pixels near a color → sizes, cap heights, line runs | idem |
| [`overlay.html`](skill/brutalist/scripts/overlay.html) | reference under build, opacity slider, difference blend | a browser |
| [`shots.mjs`](skill/brutalist/scripts/shots.mjs) | headless screenshots with scripted steps, reduced motion, no-JS | Node ≥ 22, Chromium |
| `spring_to_css` | spring parameters → `linear()` / `cubic-bezier` | planned |

## Repository

| Path | Content |
|---|---|
| [`skill/brutalist/`](skill/brutalist/SKILL.md) | the skill: router, reference files, templates, scripts |
| [`examples/`](examples/README.md) | original references and the worked example |
| [`docs/SPEC.md`](docs/SPEC.md) | status of each part, rationale, open questions |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | the maintainer's decisions (append-only) |
| [`docs/FINDINGS.md`](docs/FINDINGS.md) | lessons from experiments |
| [`docs/audits/`](docs/audits/2026-09-29-pre-publication.md) | the pre-publication audit |
| [`references/`](references/README.md) | third-party references (described; images not versioned) |
| [`AGENTS.md`](AGENTS.md) | rules for AIs contributing here |

## Roadmap

1. Review `motion`, the effects ladder, resources and accessibility.
2. Finish the creative-mode experiments; specify `inspire`.
3. Test `edit` on a page the agent did not write.
4. Specify `verify`, `critique` and stack adaptation; write `spring_to_css`.
5. Per-tool installer; tests on references nobody here authored.

## Contributing

Read [`AGENTS.md`](AGENTS.md) (it applies to humans too): decisions belong to the
maintainer and are recorded in [`docs/DECISIONS.md`](docs/DECISIONS.md); proposals are
marked as such; no private content, and no third-party images in the repository.

## Credits

Shaped by [Impeccable](https://github.com/pbakaus/impeccable) (playbooks, the two-round
comparison limit, the README you are reading) and Anthropic's
[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
skill. Describing motion as spring parameters is a concept from
[Kinetics](https://kinetics.colorion.co); no code or values are copied.

## License

[Apache-2.0](LICENSE) © 2026 135andres. Third-party reference images belong to their owners
and are not part of this repository.
