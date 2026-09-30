# Second audit — 2026-09-30

> Done by a second agent against a brief written by the first (both kept locally, not
> versioned). Scope: this repository, the live site and the unpublished npm package. This
> file records the findings and what was done about them.

**Verified by the auditor** (reproduced, not taken on trust): no private content in files,
history or image metadata; third-party images not versioned; 0 broken relative links; the
worked example reproduces exactly (`compare.py`, `checks.sh`), its fidelity column follows
its ±2 px rule, and its build is not a copy of the reference's source (measured values
differ from the source's); installer install / update / uninstall / list / dry-run; npm
package contents (24 files); no overflow on the gallery pages; the English translation keeps
the rules of the closed spec. Not verifiable from the repository: the maintainer's quotes.

| # | Finding | Severity | Response |
|---|---|---|---|
| A1 | Gallery pages broke the skill's own accessibility rules: targets under 24 px (adrift, Slow Media, Kiln Type), a scrollable log not reachable by keyboard (Low Hours), `aria-label` on elements that cannot carry it, weight ladder built from focusable `<li>` without a role | medium | fixed: 24 px targets, the log is a focusable region, labels removed, the ladder uses `<button aria-pressed>`. Also fixed contrast found while re-checking: Radio Estática's red (4.25 → 5.87 : 1), Slow Media's unchecked filters (2.11 → 4.68 : 1), the landing's red `$` (3.56 → 5.07 : 1). axe-core 4.10.2 (WCAG 2.2 AA tags) now reports **0 violations** on all 8 pages at 1440 and 320 px |
| A2 | `SPEC.md` said Pages was pending while it was live | low | fixed; approval recorded as A-8 |
| A3 | The landing used other status words than README / SKILL / SPEC | low | fixed |
| A4 | A typo in `--tools` silently installed into Claude Code | low | fixed: unknown tools, or tools without a folder for the scope, stop with an error before anything runs |
| A5 | `glossary.md` had no status header | low | fixed |
| A6 | `shots.mjs` failed when its output folder did not exist | low | fixed: it creates it |
| A7 | The installer lacked OpenCode's global folder | low | fixed after checking OpenCode's docs: `~/.config/opencode/skills/` (OpenCode also reads `~/.claude/skills/` and `~/.agents/skills/`) |
| A8 | The README on GitHub still showed the failing `npx github:` command | medium | fixed when the pending commits are pushed |
| A9 | Updating overwrote an edited installed skill without warning | medium | fixed (`[proposal]`): an installed copy that differs from the new version is kept in `~/.brutalist-skill/backups/`, outside every skills folder |

**Questions of judgement left to the maintainer:** how close `adrift` and `kiln-type` are,
in composition, to their third-party references (no text, mark or image was copied) — the
maintainer chose to move them away: both were recomposed (letters on a horizon with
reflections; a live type tester with a staircase of weights); whether
the post-round changes in the worked example respect the two-round limit (they are declared
in its report).

**Still not verified:** screen readers, real devices, Firefox and Safari; Node 18 and
Windows; loading the skill inside each tool; the tool folders of Codex, Cursor, Gemini CLI,
Copilot and Hermes against each tool's documentation.
