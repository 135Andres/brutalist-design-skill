# AGENTS.md

For any AI working in this repository. Short: it routes, it does not explain.

1. **Read first** [`README.md`](README.md) and the status table in
   [`docs/SPEC.md`](docs/SPEC.md). The skill itself is in
   [`skill/brutalist/`](skill/brutalist/SKILL.md).
2. **Do not decide.** Decisions belong to the maintainer and live in
   [`docs/DECISIONS.md`](docs/DECISIONS.md). Propose, mark `[proposal]` (or `DECISION`
   for a choice inside a sketch), and ask.
3. **Do not rewrite history.** `DECISIONS.md` and quoted reactions are append-only: add,
   with a date and a pointer.
4. **Classify what you claim**: `observed / measured / estimated / ambiguous / unknown`
   for what comes from a reference; `INFERENCE` and `DECISION` for your own. If you don't
   know, write `unknown`. See the [glossary](skill/brutalist/references/glossary.md).
5. **One home per fact.** Skill content lives in `skill/brutalist/`; status and rationale
   in `docs/`. Before adding a file, check whether the fact already has a home.
6. **References**: unknown rights → study only; images are not versioned. When taking
   inspiration, take principles, never text, marks or illustrations.
7. **Experiments** are disposable; the maintainer judges, the agent does not score. Verify
   in a real browser and say what you did **not** verify.
8. **Public repository**: never add content from private projects or local paths. For
   experiments, use a neutral or invented brief and say so.
9. **English** for everything public, decisions included (A-4, A-11).
