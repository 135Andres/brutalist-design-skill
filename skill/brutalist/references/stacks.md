# stacks — work in the project's stack

> **Status: partly specified.** The output-format rule (§2) was added on the maintainer's
> request (A-10) and is untested; §4 follows A-11 · A. Every command that writes code
> loads this file before writing it.

## 1. Detect, do not impose

Detect the stack from the project (framework, styling approach, existing animation
library) and build in it. Record it in the inventory under **Assumptions & decisions**
(`observed` if read from a file, `INFERENCE` if guessed).

## 2. Output format — one file by default, modular when the project is

Look at the project **before** choosing how many files to write.

| What you find | Write | Why |
|---|---|---|
| Nothing to read: empty folder, no project, or only images | **One `index.html`** with inline `<style>` and `<script>` | a study or sketch opens by double-click, travels as one file, and is easy to compare |
| Plain HTML project already split into `.html` + `.css` + `.js` files | The same split: `styles/`, `scripts/` (or the folders it already has); reuse existing files, do not add a second stylesheet for one page | match what is there |
| A component or module system: `package.json` with a framework (React, Vue, Svelte, Astro, Next, Vite…), `.vue` / `.svelte` / `.astro` / `.tsx` files, CSS Modules, Sass partials, `@import` chains | **Modular files in that system**: components, the project's styling method, tokens where it keeps them | a single HTML file would be foreign to the project and would not be wired into its build |
| Mixed or unclear signals | Ask one short question | two readings are plausible |

Rules:

- **Detection is evidence, not a guess.** Name the files that decided it in the inventory
  (e.g. "`package.json` lists `vite` and `svelte`; `src/lib/` holds components").
- **The user's words win**, in both directions: "give me a single file" forces one file
  inside a modular project; "split it" forces modules in an empty one. Record it as a
  `DECISION`.
- **Modular still keeps the design portable.** Whatever the split, the page's identity
  (tokens, fonts, effects) lives in named places: CSS custom properties in one file, one
  module per effect that has behaviour. Do not scatter the look across components.
- **Follow the project's conventions**: naming, folder layout, import style, lint and format
  config. Do not add a dependency for what native CSS/JS does
  ([effects](effects.md) rung 1); a new animation library is a rung climb and must be
  declared.
- **Experiments and sketches** (`inspire`, digestible questions) stay one file even inside
  a modular project, unless the user asks to wire them in: they are disposable and must be
  openable on their own. Put them under the project's scratch/examples folder, not in
  `src/`.
- **`edit`** never changes the format of the page it edits: a single file stays a single
  file, modules stay modules.
- **`recreate`** follows the table, and `recreations/<slug>/build/` holds the result of
  whichever row applies. If it is modular, add an `index.html` or a one-line `README` that
  says how to open it, so the study is still viewable.
- **Verification is the same** in every format: screenshots in a real browser
  ([verify](verify.md)). A modular project that needs a dev server or build: say which
  command you ran; if it could not run, say "not built, not verified" — do not claim it
  works from reading code.

## 3. No project yet

A single static `index.html` with inline CSS and JS for studies and sketches (§2, first
row). This was a proposal in DR5-3; it is now applied.

## 4. Animation library already present

Using a library the project already has is **not** a rung climb (A-11 · A); declare it in
the motion plan as a `DECISION` (which library, why). Adding a new one is a climb
([effects](effects.md)).
