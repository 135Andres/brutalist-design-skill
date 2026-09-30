# Next — where the work stands (2026-09-30)

Handoff for whoever continues (a remote Claude session, or anyone). Everything needed is in
this repository; the exceptions are listed at the end.

## State

- Repository: `main` on GitHub; site live on GitHub Pages
  (`https://135andres.github.io/brutalist-design-skill/`); npm `brutalist-design-skill@0.1.0`
  published, `npx brutalist-design-skill` works.
- Two audits answered: [`audits/`](audits/). axe-core: 0 violations on every page.

## Waiting for the maintainer

1. **Open question C** (`DESIGN.md` export) in [`SPEC.md`](SPEC.md#open-questions). A, B, D
   and E were decided in A-11.
2. **Approval** of the drafts `motion.md`, `effects.md`, `resources.md`, `accessibility.md`
   (reviewed and corrected 2026-09-30, see A-10) and of `stacks.md` §2 (new).
3. Radio Estática was **not liked** (recorded in [`FINDINGS.md`](FINDINGS.md)); it stays out
   of the landing.

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
