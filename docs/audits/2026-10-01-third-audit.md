# Third audit — 2026-10-01

> Two independent audits run in parallel against prompts written by the agent that did the work
> (prompts and full reports kept locally, not versioned): one by Claude Opus 5.5 with tools
> (`O-n`), one by DeepSeek V4.1 Flash in six passes (`D-n`). Scope: this repository at `5ebc658`,
> the live site and the npm package (0.2.0 published, 0.3.0 merged). This file records the
> findings and what was done about them. Every finding below was re-checked before fixing.

**Verified by the auditors:** no broken relative links in the skill, site or gallery; WCAG 2.2
criteria numbered and levelled correctly; npm package contents; installer on Node 18; the worked
example reproduces byte for byte; the site on Pages matches the repository; 0 axe-core WCAG
violations on all 8 pages; no private paths or project names in the files.

| # | Finding | Severity | Response |
|---|---|---|---|
| O-1, D-1 | A commit on 2026-09-30 rewrote `DECISIONS.md`: A-2 and A-5 deleted, quotes attached to the wrong entries; four files still cite A-2 and A-5 | high | fixed by addition: A-22 restores the original text; notes in A-1 and A-4 point to it |
| O-2 | `shots.mjs` reported success on pages that did not load (dev-server URLs, missing files, missing selectors) | high | fixed: accepts `http(s)://`; fails on navigation errors, HTTP ≥ 400, missing files, selectors that match nothing and JS steps that throw; prints the URL loaded |
| O-3 | `shots.mjs` used a fixed port and could leave Chromium running | medium | fixed: a free port and a private profile per run; the browser and its profile are removed on every exit; Node version checked before launching |
| O-4 | Installer ignored misspelt options (`--dryrun` installed for real), `--tools x` with a space, and tools without a folder for the scope | medium | fixed: unknown options stop the run; `--tools x` / `--scope x` accepted; a requested tool without a folder stops the run before anything changes |
| O-5 | Uninstall removed edited copies without backup; a failed update could leave a skill without `SKILL.md`; symlinks replaced by copies | medium | fixed: uninstall backs up a copy that differs; copy beside, then swap (a failed copy leaves the old skill); symbolic links left untouched |
| O-6 | Tool folders and invocation against each tool's docs: Codex is invoked with `$brutalist`; Cursor, Gemini CLI and Copilot have global folders the installer lacks; any repo with `.github/` was "detected" as Copilot | medium | partly: the final message names `/brutalist` (Claude Code) and `$brutalist` (Codex); Copilot detection now needs `.github/skills` or `.github/copilot-instructions.md`; README warns about duplicates. **Global folders: maintainer's decision** |
| O-7, D-5 | npm serves 0.2.0 while the changelog dated 0.3.0 | medium | changelog marks 0.3.0 unreleased until published |
| O-8 | Merges made on GitHub's website put a personal email in the public history | medium | **maintainer's action** (GitHub email privacy settings; rewriting history is destructive) |
| O-9 | Three rules on how many questions to ask | medium | **maintainer's decision** (the number) |
| O-10, D-2 | `setup` could load inside `recreate` | medium | fixed: one loading table in `SKILL.md`; `recreate` never loads setup, field-map or craft |
| O-11, D-4 | `recreate.md` (closed) still asks open question C and names a spec section | medium | **maintainer's authorization needed** (the file is closed) |
| O-12 | `find_rules.py` cannot see light lines on dark pages | medium | fixed: `--polarity dark|light|auto`, and a warning when the default meets a dark crop; default output unchanged |
| O-13 | `sample_palette.py` used 2.1 GB on a retina screenshot; no check on regions | low | fixed: labels in blocks (318 MB on the same image); regions and contrast names validated; results unchanged |
| O-14, D-2 | Loading rules disagreed in both directions; two-build rule unclear outside `recreate` | medium | fixed: one table in `SKILL.md`, file headers point to it; two builds apply to `recreate`, other commands fix and declare `ADDED` (`[proposal]`) |
| O-15 | `edit.md` relied on two external manuals and did not say where the copy goes | low | fixed (`[proposal]`): each move defined in one line; under version control edit in place and show the diff, otherwise a copy beside the original |
| O-16 | "Name the default a design is subverting" assumed every design subverts one | low | fixed: "if a design subverts a default, name it" |
| O-17 | A-11.8 ("no code for now") never lifted, while code was later written | low | **maintainer's decision** |
| O-18, D-8 | Stale lines and a garbled sentence | low | fixed |
| O-19 | Installer redraw at under ~31 columns; "Ready" after a dry run | low | fixed: redraw counts real rows; dry run ends with "Dry run. Nothing changed." |
| O-20 | Kiln Type hid focus on the pressed weight button; three pages without `<main>`; favicon 404 | low | fixed; layout unchanged (screenshots compared); axe-core with all rules: 0 violations on the four pages touched |
| O-21 | The mandatory first line of the motion plan only fitted a static reference | low | fixed: declare static reference, animated source or no reference |
| O-22 | The Efficiency style and the planned efficient mode share a name | low | **open**, to settle with the mode's design |
| O-23 | Source grades for community archives and a mirrored manifesto | low | open |
| D-3 | `resources.md` column said sections "point here" when they do not | low | fixed: "Relevant to" |
| D-6 | The README shown on npm links files the package does not ship | low | not changed (npm resolves links against the repository; not verified) |
| D-7 | text-effects' MIT is only declared, with no LICENSE file | low | fixed: "verify at time of use before copying code" |
| D-9 | `--yes` falls back to Claude Code; Hermes default folder undocumented | low | fixed in README and `--help` |
