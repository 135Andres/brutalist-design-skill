# Changelog

## 0.2.0 — unreleased

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
- **Styles by the names people use.** Brutalism, Efficiency, Antidesign and Neobrutalism, each with
  a one-line description, a small preview and what to look up, offered as options and never imposed.
  You can pick by typing a name or describing what you want. *Experimental.*
- **Fewer wrong turns when iterating.** The agent says what it understood before building a motion
  (what triggers it, what moves, what stays), changes only what you asked and says what stays,
  checks a phone-sized viewport first, and reads annotated screenshots as feedback.

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
