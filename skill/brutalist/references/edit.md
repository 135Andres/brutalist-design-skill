# edit — change an existing page

> **Status: experimental.** Proposed by the maintainer ("give it more flavour"); one test so far, on a page the agent had written itself — a
> test on someone else's page is still missing. Findings: [FINDINGS](../../../docs/FINDINGS.md).

## Procedure (current best guess)

1. **Read before touching.** The whole page, what the user said about it, and what must
   not change. Ask for the goal if it is not clear: what to keep, what bothers them, how
   far the edit may go.
2. **Fix the truth first.** If the page states something false, fix that before polishing
   its design.
3. **Copy, don't overwrite.** Work on a copy; record the original's file and hash.
4. **Smallest change first.** Solve the concrete complaint with the least change, and show
   it. Escalate only if it is not enough:
   **restyle** (type, spacing, weight — same structure) → **recompose** (order and
   structure).
5. **Make variants switchable** when the question is "which one?" (e.g. four typefaces ×
   two scales on the same page) instead of rebuilding.
6. **Map every move to a known playbook** and log it: quieter (noise), bolder / delight
   (flavour), typeset (type) from Impeccable; restyle vs recompose from claude-design.
7. **Log the edit**: what you read, the diagnosis, the playbook, what changed, what was
   kept, why, the evidence.

## Lessons

- A recomposition the user picked from a preview was rejected once built; only what
  changed least survived. On a page the user likes, start minimal.
- "More flavour" does not mean "bigger": character comes from behaviour and detail.
