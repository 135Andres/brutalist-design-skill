# Research prompt — how each style is built: methods, resources and pitfalls

> Prepared 2026-10-01 at the maintainer's request: give the agent real working methods and
> resources for each style, so it does not invent them. Paste everything below the line. The
> result feeds the skill's style map, its resources list and its effects ladder; it does not
> replace them.

---

## Context

I maintain an open-source agent skill that helps an AI coding agent design and build brutalist
and experimental web pages. The skill offers the user a map of styles. For each style it already
says **what you would see** and **what to search for**. It does not yet say **how practitioners
actually build it**, so the agent improvises methods. I want those methods sourced.

The styles, with their variants:

| Style | What you would see | Variants |
|---|---|---|
| Brutalism | text, lines and a visible grid; nothing added for decoration | Swiss (strict grid, flush-left sans, photography) |
| Efficiency | the essentials only; light, fast, cheap | Low-tech (default typefaces, dithered images, static page) |
| Antidesign | overlapping or oddly ordered text, type over texture; made to unsettle | Glitch (RGB split, corrupted images); New Ugly (feigned-amateur layouts) |
| Neobrutalism | thick borders, flat colour, hard offset shadows, obvious buttons | — |
| Y2K | chrome and metallic type, gloss, translucent candy plastic, rounded pills | Frutiger Aero (glossy glass, water, sky) |
| Rave | loud or fluorescent colour, collage, dense layers, warped or mismatched lettering; two looks: 1990s flyers and 2010s "acid graphics" | — |
| Webcore | the 1990s hand-made personal web and its revival: tiled backgrounds, counters, GIFs, 88×31 badges | — |
| Terminal | monospace, dark background, phosphor green or amber, box-drawing borders, a cursor | — |

The skill's rules that the answer must respect:

- **Native first.** Effects climb a ladder: plain HTML/CSS/SVG → a JavaScript library → WebGL.
  A higher rung is used only when the result needs it.
- **Accessible by default.** WCAG 2.2 AA: contrast, focus, keyboard, reduced motion, no
  flashing above WCAG 2.3.1 thresholds.
- **No cloning.** Galleries and catalogues are studied for principles, never copied; no text,
  logos or marks from references.
- **Licences matter.** A resource the agent may copy from (fonts, code, textures, images) is
  only useful if its licence allows it.

## What to research, for each style and variant

1. **Working methods.** How designers and front-end developers build the style today, step by
   step where sources describe it: how they start (grid first, type first, texture first…),
   what they decide early, what they leave to the end. Cite case studies, talks, write-ups or
   tutorials by people who built such sites.
2. **Techniques per trait.** For each trait in "what you would see", the usual way to build it,
   with the lowest rung of the ladder that works:
   - pure CSS or SVG (name the properties: `background-clip: text`, `mix-blend-mode`, SVG
     `feTurbulence` / `feDisplacementMap`, `backdrop-filter`, `image-rendering: pixelated`,
     variable-font axes, CSS grid…);
   - when a library is needed and which one;
   - when WebGL is truly needed.
   Note browser support problems (for example features that work only in Chromium).
3. **Resources an agent can use.** For each: name, URL, what it is for, and its **licence as
   stated by the source** (say "not found" if there is none). Types to look for:
   - typefaces (free and open: Google Fonts, Velvetyne, Open Foundry, Collletttivo, and others
     relevant to the style), and system-font stacks that fit;
   - generators and tools (gradients, dithering, ASCII, pixel art, 88×31 badges, glitch,
     chrome text, noise or grain);
   - texture and pattern sources with a licence that allows reuse;
   - galleries and archives for **studying** the style (not for copying), with how each is
     curated;
   - component libraries or design kits built for the style, and how faithful they are.
4. **Common mistakes.** What makes a page read as a cheap imitation of the style, according to
   practitioners or critics (for example "neobrutalism without real hierarchy", "Y2K as just a
   grey gradient", "rave without one readable panel").
5. **Accessibility recipes.** Concrete ways the style is kept accessible without losing its
   character: contrast strategies on textured, translucent or fluorescent surfaces; focus
   styles that fit; reduced-motion alternatives for glitch, flicker, marquee and shader effects.
   Prefer W3C, WebAIM, government or academic sources; mark practitioner advice as such.
6. **Cost.** Which techniques are heavy (page weight, CPU or GPU, battery) and lighter
   alternatives that keep the look; measured numbers where they exist, labelled opinion where
   they do not. Note which styles are cheap to produce and to serve.

## Closing questions

- Which **working methods** are shared by several styles (for example "start from the type
  scale", "build the grid in CSS first", "one readable panel on a dense page") and could be
  written once for all of them?
- Which resources appear across many styles and are worth listing once?
- Where do sources disagree on how a style should be built?

## Rules for the answer

- **Grade every source** by type: **P** primary (the author's own text or project), **A**
  academic or institutional, **S** press or encyclopedia, **B** blog, agency, vendor or
  community wiki. Prefer P, A and S; say when a claim rests only on B.
- Link every source; quote briefly. Record licences exactly as stated, with the date you read
  them.
- Separate **observations** from **inferences**, and label the inferences.
- Do not invent tools, URLs, licences, numbers or quotes. If you cannot find something, write
  **NOT FOUND**. If you could not open a page, say so.
- Trend articles count as weak evidence that a technique is used, not of how to do it well.
- Output in English, in Markdown: one section per style (variants inside their style), then a
  **shared methods** section, then a table of resources: name · URL · use · styles · licence ·
  date read · grade.
