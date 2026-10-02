# Motion plan — <slug>

> Template. The rows below are **illustrative examples** — replace them. Vocabulary: [glossary](../references/glossary.md).

**Source:** The reference is static; all motion in this build is invention.
<!-- or: "Animated source: <file>, shows <what>; frames in frames/."; or, with no reference (inspire, edit): "No reference; all motion is invention." -->

| Layer | Trigger | Property | Parameters (`DECISION`) | Rung | From | Reduced variant |
|---|---|---|---|---|---|---|
| main moment | load | `transform` | spring k=170 c=26 m=1 → `linear()` | 1 | I1 | final state, no motion |
| interaction | hover / focus / tap | `opacity` | 180 ms, `cubic-bezier(.2,.8,.2,1)` | 1 | no inference | instant |
| scroll | scroll position | `transform` | scroll-driven, 0→1 over section | 1 | no inference | static |
| ambient loop | always | `transform` | 26 s linear, pause control | 1 | I1 | stopped |

Accessibility: pause control for loops over 5 s · nothing flashes > 3/s · loops pause off-screen.
