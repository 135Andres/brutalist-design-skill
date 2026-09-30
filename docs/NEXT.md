# Next — where the work stands (2026-09-30)

Handoff for whoever continues (a remote Claude session, or anyone). Everything needed is in
this repository; the exceptions are listed at the end.

## State

- Repository: `main` on GitHub; site live on GitHub Pages
  (`https://135andres.github.io/brutalist-design-skill/`); npm `brutalist-design-skill@0.1.0`
  published, `npx brutalist-design-skill` works.
- Two audits answered: [`audits/`](audits/). axe-core: 0 violations on every page.

## Waiting for the maintainer

1. **Reaction to Radio Estática** ([`examples/gallery/estatica/`](../examples/gallery/estatica/index.html)),
   the second run of the digestible-questions format. Record it verbatim in
   [`FINDINGS.md`](FINDINGS.md); if liked, add it to the landing (`index.html`, gallery grid,
   with a `cover-720.jpg` like the others) and to the README gallery.
2. **Review** of `motion.md`, `effects.md`, `resources.md` and `accessibility.md` (all drafts).
3. **Open questions A–E** in [`SPEC.md`](SPEC.md#open-questions).

## Work that can start

- `inspire`: try formats 3 (provocations) and 4 (classic derive) — see
  [`inspire.md`](../skill/brutalist/references/inspire.md); record reactions in FINDINGS.
- `edit`: a second test on a page the agent did not write.
- Specify `verify`, `critique`, `stacks`; write `scripts/spring_to_css`.
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
