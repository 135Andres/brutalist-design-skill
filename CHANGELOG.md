# Changelog

## 0.3.0 — unreleased

- **Eight styles and five variants on the map**, researched: Webcore and Terminal are new; Swiss,
  Low-tech, Glitch, New Ugly and Frutiger Aero are variants inside the nearest style. Y2K and
  Rave were corrected (Rave now names two looks: the 1990s flyer and 2010s acid graphics).
  *Experimental.* Variants are mentioned only when you lean towards their style, so the list stays
  short.
- **Fixed from 0.2.0:** the Rave description said "fluorescent on black", which the stronger
  sources do not support; `critique.md` pointed to an internal decision id that users cannot
  see; `critique` now says plainly that it reviews the piece (yours or the skill's), never your
  taste.
- **How each style is built** (`craft.md`, new): for each style, an order of work, the simplest
  way to build each trait, common mistakes and style-specific accessibility risks, from
  research. Tools with their licences are listed in `resources.md`; archives without a licence
  are for study only. *Experimental.*
- **A quieter installer.** A two-row wordmark replaces the five-row banner and the scrolling
  ticker (which got cut off on narrow terminals). Steps are a numbered log (`[1/3] scope`),
  lists collapse into their result once chosen, and red is kept for selection and status.
  Press ← on the tools list to go back and change the scope; the list remembers your choice.
  On narrow terminals the help and the tagline wrap by words and paths are shortened, so the
  lists redraw cleanly.

## 0.2.0 — 2026-10-01

What changes for people who use the skill. Everything marked *experimental* has not been tried
with many users yet.

### Better results when you ask for something

- **The output format follows your project.** One `index.html` with inline CSS and JS by default;
  modular files in the project's own system when the project is modular (a framework, components,
  Sass partials, a split HTML/CSS/JS layout). The skill names the files that decided it, and your
  words win in either direction. *Experimental.*
- **Optional setup before sketching.** A few skippable questions about how strict the brutalism is,
  colour, typography, elements, motion, who reads the page first, content, and what to avoid. Answer
  some, all or none; what you skip is decided by the agent and declared. Your answers are kept in
  your own words. *Experimental.*
- **Styles by the names people use.** Brutalism, Efficiency, Antidesign, Neobrutalism, Y2K and Rave, each with
  a one-line description, a small preview and what to look up, offered as options and never imposed.
  You can pick by typing a name or describing what you want. *Experimental.*
- **Fewer wrong turns when iterating.** The agent says what it understood before building a motion
  (what triggers it, what moves, what stays), changes only what you asked and says what stays,
  checks a phone-sized viewport first, and reads annotated screenshots as feedback.

- **`critique` on your own page** (rule recorded, command still unspecified): the agent renders the
  page and looks at it; if it cannot render it, it reviews the quality of the code and says so.

### Accessibility and checks

- New rules for interaction driven by pointer position or dragging, content that appears on hover or
  focus, and text spacing; keyboard and touch equivalents; a visible cue so a first-time visitor
  knows what to do.
- The fidelity build and the accessible build are both delivered only when they differ.
- Verification now covers scroll-driven and pinned effects (screenshots at several scroll positions
  and back at the top), scaled elements that widen a mobile layout, and text over hatched or
  textured backgrounds.
- `shots.mjs` accepts `CHROME_ARGS` (needed in containers), takes file names with or without
  `.png` and prints where it saved each file.

### Effects and motion

- Using an animation library a project already has is not climbing the effects ladder; adding a new
  one is. Invented motion may use a higher rung if declared with a reason.
- `motion` no longer repeats accessibility rules and says which parts apply outside `recreate`.

### The skill itself

- Self-contained: no links or identifiers that point outside the installed `skill/` folder.
- `recreate` is unchanged.

### Not in this release

The templates collection and a lean, low-token mode are ideas recorded in `docs/NEXT.md`, not built.
