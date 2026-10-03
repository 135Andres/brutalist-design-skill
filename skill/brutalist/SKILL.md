---
name: brutalist
description: Recreate brutalist and experimental web interfaces from reference images (screenshots, Pinterest captures), motion included, or take inspiration from them to design something original. Use when the user shares an image of a brutalist site and wants it built, animated, edited, verified or critiqued. Commands - recreate, motion, inspire, edit, verify, critique.
license: Apache-2.0
compatibility: Any agent that reads SKILL.md. Scripts need a shell, Python 3 with Pillow and numpy, and Node 22+ with Chromium for screenshots; without them the skill still works and marks estimates.
---

# brutalist

> **Draft (2026-10-03).** `recreate` is fully specified; `motion` is under review;
> `inspire` and `edit` are experimental; `verify` and `critique` are not yet specified.
> Each reference file states its own status at the top.

## Principles

1. **Impose nothing on the user.** `recreate` reproduces faithfully, with no lecture about
   originality. The only limit is rights hygiene, which protects the user. The skill holds
   no taste of its own: scale, colour, type, ornament and how strict "brutalist" is are the
   user's to decide; ask ([setup](references/setup.md)) and record their words.
2. **Say how you know.** Every property read from a reference carries an evidence state;
   everything you infer or choose is marked `INFERENCE` or `DECISION`. See
   [glossary](references/glossary.md).
3. **Native first.** Climb the effects ladder (native → library → WebGL) only when the
   result needs it, and never silently. See [effects](references/effects.md).
4. **Accessible by default.** Every command that builds loads
   [accessibility](references/accessibility.md).
5. **No scores.** Verify in a real browser, report what was and was not verified; the
   human judges.
6. **Work in the project's stack.** Detect it; do not impose one. One `index.html` by
   default; modular files when the project is modular. See [stacks](references/stacks.md).

## Commands

| Command | Use it to | Status |
|---|---|---|
| `recreate <image>` | rebuild a reference image as a working interface, with inventory and report | specified |
| `motion <page>` | plan and build motion, from an animated source or declared as invention | under review |
| `inspire <images…>` | turn references (or just an idea) into divergent sketches and digestible visual questions; starts with an optional setup | experimental |
| `edit <page>` | change an existing page: smallest change first, escalate only if needed | experimental |
| `verify <page>` | screenshots under fixed conditions, comparison, accessibility pass | not yet specified |
| `critique <page>` | a review without scores | not yet specified |

## What each command loads

The one list of loading rules; reference files do not repeat it.

| Command | Always | Only when |
|---|---|---|
| `recreate` | [recreate](references/recreate.md), [effects](references/effects.md), [motion](references/motion.md), [accessibility](references/accessibility.md), [stacks](references/stacks.md), [verify](references/verify.md) | — |
| `motion` | [motion](references/motion.md), [effects](references/effects.md), [accessibility](references/accessibility.md), [stacks](references/stacks.md) | verify: before delivering |
| `inspire` | [inspire](references/inspire.md), [setup](references/setup.md), [accessibility](references/accessibility.md), [stacks](references/stacks.md) | [field-map](references/field-map.md) when styles are offered; [craft](references/craft.md) once a style is chosen; motion and effects when a sketch animates; verify before delivering |
| `edit` | [edit](references/edit.md), [accessibility](references/accessibility.md), [stacks](references/stacks.md) | inspire's "Iterating on a sketch" for annotated screenshots; setup when the edit must choose a look on its own; field-map and craft when the page moves towards a named style; motion and effects when it animates; verify before delivering |
| `verify` | [verify](references/verify.md), [accessibility](references/accessibility.md) | — |
| `critique` | [critique](references/critique.md), [verify](references/verify.md), [accessibility](references/accessibility.md) | field-map and craft, once critique is specified |

`recreate` **never** loads setup, field-map or craft: it follows the reference.
[glossary](references/glossary.md): whenever a term is unclear. [resources](references/resources.md):
only when a section points to it for a concrete tool.

**No command given?** Infer it: an image plus "build this" → `recreate`; images plus
"ideas" / "inspire me" → `inspire`; an existing page plus "improve" / "more flavour" →
`edit`. If two fit, ask one short question. The user may name the skill (`/brutalist`,
`$brutalist`, `/skill:brutalist`, depending on the tool) or only describe the task.

## In any tool, with any model

- **Paths.** Links and `scripts/…` paths are relative to the folder that holds this file.
  Outputs go in the user's project (the working directory). Run a script by its path inside
  this folder, e.g. `python3 <this folder>/scripts/find_rules.py` (`python` or `py` on Windows).
- **Read before acting.** Read each file the table above lists, in full, before starting the
  command; this page is a router, not a summary of them.
- **Images.** Measure from the image file with the scripts, not from your view of it: tools
  may resize or compress an image before you see it. If you cannot see images at all (the
  model has no vision, or the tool did not pass the image), say so at once and never describe
  an image you have not seen: measure what the scripts can (palette, grid, ink boxes), ask the
  user to transcribe the text and describe the type and layout, and record those rows as
  `estimated`, method "user's description".
- **Questions.** Ask in plain text when the tool has no question widget. When no one can
  answer (a non-interactive or scheduled run), do not wait: take the most conservative
  choice, mark it `DECISION`, and list it in the report.

## Outputs

Everything lands in files, not only in chat:

```
recreations/<slug>/     recreate: reference (or path), inventory.md, palette.json,
                        build/ (one index.html, or modules if the project is modular),
                        screenshots (ref, build, overlay), report.md
motion-plan.md          motion, next to the build it animates
```

Templates: [inventory](templates/inventory.md) · [report](templates/report.md) ·
[motion plan](templates/motion-plan.md).

## Scripts

| Script | Use |
|---|---|
| [`sample_palette.py`](scripts/sample_palette.py) | colors of flat patches (median) or clusters; WCAG contrast between regions |
| [`find_rules.py`](scripts/find_rules.py) | rules and solid bands → grid positions as fractions |
| [`ink_bbox.py`](scripts/ink_bbox.py) | box of the pixels near a color → sizes, cap heights, line runs |
| [`overlay.html`](scripts/overlay.html) | reference under build: opacity slider, difference blend |
| [`shots.mjs`](scripts/shots.mjs) | headless screenshots with scripted steps; reduced motion; no JavaScript |
| `spring_to_css` | spring → `linear()` / `cubic-bezier` — **planned** |

Python scripts need Pillow and numpy; `shots.mjs` needs Node ≥ 22 and a Chromium. When a
script is not available, say which step was done by eye and mark it `estimated`.
Worked example of all of them: <https://github.com/135Andres/brutalist-design-skill/tree/main/examples/recreate-concrete-radio>.
