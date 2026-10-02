# motion — plan and build motion

> **Status: under review** (rev. 3). When it is loaded: [SKILL.md](../SKILL.md). §1 (traits
> and inferences) is defined only for `recreate`; §0, §2, §3 and §4–§7 apply to every command that animates
> (in `edit`, the plan may be one line per change). Vocabulary: [glossary](glossary.md). Rungs: [effects](effects.md).

## 0. Declare the source (mandatory)

- First line of `motion-plan.md` declares the source: a static reference ("The reference is
  static; all motion in this build is invention"), an animated source (below), or no
  reference, as in `inspire` or `edit` ("No reference; all motion is invention").
  Template: [motion plan](../templates/motion-plan.md).
- With a GIF or video: name it and say what it shows; extract frames with a script. Only
  what that source shows can reach `REPRODUCED`.
- No animated source: motion rows are `INVENTED`, fidelity `—`, behaviour `unknown`.

## 1. Traits, inferences and decisions (recreate only)

- **Trait** — what is visible ("text cut at the edge and repeated") → Reference,
  `observed`.
- **Motion reading** ("suggests a horizontal marquee") → Inferences, `INFERENCE`, linked
  to its trait; the behaviour stays `unknown`.
- **Adopting it** → a `DECISION` linking the inference. It can be rejected.
- An inference proves no speed, direction or trigger.

## 2. Character of the motion

- Duration, easing and spring parameters **cannot be measured from a still image**: they
  are `DECISION`s. Only with a GIF/video do they become `measured`.
- Visual material → motion material, as **heuristics**, not laws, each one a `DECISION`
  with its reason: hard edges → cuts or `steps()`; heavy blocks → mass, no bounce; raw
  monospace → character-by-character reveal; grain → living texture; playful or
  sculptural → springs allowed.
- **Physical parameters**: every entry as a spring (stiffness, damping, mass) or as a
  duration + curve; never "smooth" or "fast" without a number. The concept comes from
  Kinetics ([resources](resources.md)); its values and code are **not** copied (no
  license). The skill ships its own
  `scripts/spring_to_css` (planned): it simulates the spring and emits `linear()` and,
  when it fits, `cubic-bezier`.
- Native capabilities: a `cubic-bezier` gives **at most one overshoot with a small
  rebound** (or critically damped motion); sustained oscillation → sampled `linear()`,
  still native (rung 1). Rung 2 is for what CSS cannot do: **interruption that preserves
  velocity** and **gesture-driven physics**.

## 3. Motion plan — `motion-plan.md`

Four layers: the main moment (usually one) · interaction states (touch separately: there
is no hover) · scroll · ambient loops. Per entry: trigger, property, parameters
(`DECISION`), rung, source inference or "no inference", and a reduced variant that reaches
the same end state. Decorative motion is not forbidden: judge it by what it adds and what
it costs.

## 4. Rung

Apply the rule in [effects](effects.md) (cost and permission). Concrete tools:
[resources](resources.md).

## 5. Accessibility and performance

Motion rules (reduced motion in CSS and JS, flashing, pause control, off-screen loops,
WebGL fallback) live in one place: [accessibility](accessibility.md) §Motion. Specific to
performance: animate compositor properties (`transform`, `opacity`) by default; others
(`clip-path`, `filter`, `mask`, `grid-template-rows`) only if verified smooth. All marked
`ADDED`.

## 6. Verify

Before/during/after, with frames or video saved to files. Rounds are capped as in
[recreate](recreate.md) §5 (closed rule). A hidden browser tab freezes the
animation clock — sample in a visible or emulated-visible tab. No browser: "motion not
observed" (method column).

## 7. Report

Columns from the [glossary](glossary.md). No scores.
