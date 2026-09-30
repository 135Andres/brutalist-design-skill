# verify — check the result in a real browser

> **Status: not yet specified.** Interim rules below, gathered from the other files and
> from experiments.

## Interim rules

- **Fixed conditions** for any visual comparison: see [recreate](recreate.md) §5.
- **Accessibility pass**: see [accessibility](accessibility.md) §Verify.
- **Motion**: see [motion](motion.md) §6.
- **Look at the screenshots.** Automated checks fail silently: text clipped by
  `overflow: hidden` does not register as page overflow; measure each element against its
  container and look at the images.
- Check at least a desktop width and 390 px (and 320 px for reflow). Mobile emulation
  widens the layout viewport when content is too wide, hiding the overflow from
  `scrollWidth`: confirm `innerWidth` equals the width you asked for.
- Console errors: none.
- Report what was **not** verified. "Verified" without evidence is not verified.
- No browser available: say so; compare code against the inventory instead.

Tool: [`shots.mjs`](../scripts/shots.mjs) takes headless screenshots at given sizes after
optional scripted steps, and warns when the viewport was widened.
