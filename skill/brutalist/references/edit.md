# edit — change an existing page

> **Status: experimental.** Born from the request to "give a page more flavour"; one test so far, on a page the
> agent had written itself — a test on someone else's page is still missing.

## Procedure (current best guess)

1. **Read before touching.** (Feedback given as an annotated screenshot: see
   [inspire](inspire.md) "Iterating on a sketch".) The whole page, what the user said about it, and what must
   not change. Ask for the goal if it is not clear: what to keep, what bothers them, how
   far the edit may go.
2. **Fix the truth first.** If the page states something false, fix that before polishing
   its design.
3. **Keep the original recoverable.** In a project under version control, edit in place and show
   the diff (the history keeps the original). Otherwise work on a copy next to it
   (`<name>.edit.<ext>`), record the original's file and hash, and replace it only when the user
   says so.
4. **Smallest change first**, unless the user asks for more. Solve the concrete complaint
   with the least change, and show it. Escalate only if it is not enough, or if the user
   says to:
   **restyle** (type, spacing, weight — same structure) → **recompose** (order and
   structure). If the edit moves the page towards a named style, load [craft](craft.md).
5. **Make variants switchable** when the question is "which one?" (e.g. four typefaces ×
   two scales on the same page) instead of rebuilding.
6. **Name every move** and log it: *quieter* (remove noise: ornament, extra colour, motion),
   *bolder* (stronger contrast and scale), *delight* (one small detail that adds flavour),
   *typeset* (type only: family, size, spacing), *restyle* and *recompose* (step 4).
7. **Log the edit**: what you read, the diagnosis, the moves, what changed, what was
   kept, why, the evidence.
