# effects — the ladder

> **Status: under review** (with [motion](motion.md)). The one home of the ladder and the
> rung rule; other files link here instead of repeating it.

## Rungs

1. **Native browser** — static: CSS, SVG filters and masks; motion: CSS transitions and
   animations, Web Animations, scroll-driven animations, View Transitions, `linear()`.
2. **Animation library** — motion only (static effects skip this rung).
3. **WebGL / shaders** — static and motion.

**Alternative route: a pre-rendered asset** (image or video). Not a "stronger" rung — the
fallback when a live effect is not viable. Fidelity `APPROXIMATE` if it replaces something
interactive.

The ladder names no tools; concrete tools live in [resources](resources.md). Visual
intensity is a descriptive axis, not an order.

## Role of an effect (recreate)

- **Identity**: without it the reference is no longer recognizable.
- **Decoration**: everything else.

The criterion depends on the command: "is it recognizable without it?" (recreate) is not
"does it reveal information?" (an information-design lens). A scrolling ticker can be
decoration under the second and identity under the first.

## Rung rule — cost and permission are separate

- **Cost (default rung)**: the **higher** of
  (a) the rung the **static look** needs to be faithful — an identity effect is built on
  the rung it needs; if approximated, warn about a serious loss before delivering; and
  (b) the rung the **motion in the reference** needs — only an animated source can demand
  this.
  Invented motion **prefers the lowest rung that achieves it**.
- **Permission**: invented motion that needs a **higher** rung than the cost **is allowed
  if declared**: `DECISION` + a concrete reason (e.g. "interruption that preserves
  velocity, which CSS cannot do"). What is never allowed is **climbing silently**.
  *(Decided, A-11 · B.)*
- **Library already in the project**: using it is **not** a rung climb — the cost is
  already paid. Declare it in the motion plan (which library, why). Adding a **new**
  animation dependency is a climb and follows the permission rule above. *(Decided,
  A-11 · A.)*

## Examples

- A 3D block logo built in WebGL for its static look → making it rotate costs no new rung.
- A marquee with no animated source → rung 1 by cost; if the plan wants it to stop while
  keeping its velocity on hover, climbing to rung 2 is acceptable **when declared**.
