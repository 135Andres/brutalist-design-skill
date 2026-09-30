# Provocations from zero (experiment)

Creative mode with **no reference image** (`inspire`, format 3). One invented, neutral brief —
a community tool library called "The Lending Shed"; everything on the pages is made up and
nothing is sent anywhere. Three premises taken from objects with a function:

| File | Premise | What the page does | First-visitor cue |
|---|---|---|---|
| [`shadow-board.html`](shadow-board.html) | A workshop shadow board: tools hang over painted outlines, so an empty outline shows what is out | The board is the menu; a dashed outline means "on loan"; pressing a tool shows its details | A legend sentence above the board |
| [`flyer.html`](flyer.html) | A photocopied flyer with tear-off tabs | Each tab is one action (join, hours…); pressing it tears it off and shows its content | "Tear one off ↓" on a yellow strip above the tabs |
| [`ledger.html`](ledger.html) | The paper loan slip a librarian stamps | A three-line form; the slip fills itself, computes the return date and stamps APPROVED | "Fill in the three lines" and numbered fields |

Each file's header comment records the premise, what was taken, and its decisions. Fonts are
system fonts. Open any file directly in a browser.

Checked in headless Chromium at 1440, 390 and 320 px, reduced motion on the flyer. Not
checked: screen reader, axe-core, a keyboard pass by a person, real devices. The reaction of
the maintainer is recorded in [`docs/FINDINGS.md`](../../../docs/FINDINGS.md).
