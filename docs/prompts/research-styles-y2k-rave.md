# Research prompt — Y2K, Rave, and which other styles to map

> Prepared 2026-10-01 for a deep-research run (A-17). Paste everything below the line. The result
> feeds [`field-map.md`](../../skill/brutalist/references/field-map.md); it does not replace it.

---

## Context

I maintain an open-source agent skill that helps an AI coding agent design brutalist and
experimental web pages. The skill offers the user a **map of styles** as options (never imposed),
each with a one-line description of what you would see, search terms so the user can look the
style up, and a tiny ASCII preview. The map currently has six styles:

- **Brutalism** — text, lines and a visible grid; nothing added for decoration.
- **Efficiency** — the essentials only; light, fast, cheap to produce.
- **Antidesign** — overlapping or oddly ordered text, type over texture; made to unsettle.
- **Neobrutalism** — thick borders, flat colour, hard offset shadows, obvious buttons.
- **Y2K** — chrome and liquid-silver type, translucent candy plastic, glossy pill buttons.
- **Rave** — fluorescent on black, warped lettering, dense layers, like a 1990s rave flyer
  ("acid graphics").

The first four come from an earlier research that aligned four taxonomies (Copeland's *Brutalist
Web Design*, Deville's Brutalist Websites, NN/g "Brutalism and Antidesign", O'Brien in Smashing
Magazine). Y2K and Rave were added from a short search and rest on trade blogs. I need them
researched to the same standard, and I need advice on what else belongs on the map.

## Part 1 — Y2K and Rave, each researched separately

For each of the two styles:

1. **Definition and boundaries.** What the term means in web and graphic design today, where it
   comes from (period, scenes, tools, people), and how it differs from neighbouring terms
   (for Y2K: Frutiger Aero, Vaporwave, Webcore, "Web 1.0"/GeoCities, cybercore; for Rave: acid
   graphics, acid house flyers, psychedelia, cyberpunk, techno minimalism). Say which neighbours
   are synonyms, sub-styles or separate styles.
2. **What you would see on a web page.** Concrete, observable traits: palette, type (families
   or kinds of lettering, distortion), surfaces and materials, borders, radius, shadows, texture,
   layout and density, imagery, iconography, motion and interaction. Separate traits that recur
   across many sources from traits only one source mentions.
3. **Relation to brutalism.** Is it a kind of brutalism, an adjacent aesthetic that borrows
   brutalist traits, or unrelated and only grouped with it by trend articles? Cite who says what.
4. **Web techniques.** How each trait is usually built today (plain CSS, SVG filters, canvas,
   WebGL, variable fonts, image assets), and which traits are hard or costly to build.
5. **Costs.** Known legibility, contrast, motion-sensitivity (flashing, strobing, parallax) and
   performance problems, with evidence where it exists. Flag claims that are only opinion.
6. **Examples.** 5–10 live websites or well-documented projects that are commonly cited as the
   style, with URL and who cites them. Describe them; do not reproduce their text or marks.
7. **Search terms** a person should type to see the style for themselves (Pinterest, Are.na,
   Google Images, Behance), in the order that gives the best results.
8. **Contested points.** Where sources disagree (origin, dates, what counts), stated as a
   disagreement and not resolved.

## Part 2 — Feedback: which other styles should the map include?

Go beyond the six. Propose **up to eight candidate styles** that a person designing an
experimental or brutalist-leaning web page might reasonably ask for. Candidates to evaluate
(add others you find, drop any that do not hold up): Swiss / International Typographic Style
on the web, editorial or "broken grid" layouts, Memphis, Vaporwave, Frutiger Aero, Webcore /
GeoCities nostalgia, terminal / CLI aesthetics, Bauhaus revival, glitch art, "dark academia",
New Ugly, maximalism, kinetic typography sites, low-tech / solar-powered design.

For each candidate give:

- one line on what you would see, and search terms to look it up;
- **evidence that people use the name** (articles, galleries, communities, search interest),
  graded by source type;
- **overlap** with the six existing styles: does it add something new, or is it a variant of
  one of them (and which)?
- whether it fits a skill about brutalist and experimental pages, and why;
- **a recommendation**: add as a style, add as a variant of an existing style, or leave out.

Then answer, in a short closing section:

- Is a flat list of styles the right shape, or would grouping help (for example by stance:
  serves usability / neutral / subverts it; or by period)? The map already has axes such as
  stance toward usability, relation to conventions, finish and motion.
- How many styles can a user scan before the list stops helping?
- Which of the six existing styles are weakest as categories, if any.

## Rules for the answer

- **Grade every source** by type: **P** primary (the author's own text or project), **A**
  academic or institutional, **S** press or encyclopedia, **B** blog, agency or vendor.
  Prefer P, A and S; say when a claim rests only on B.
- Link every source. Quote briefly; do not paste long passages.
- Separate **observations** (what sources say or what a page shows) from your **inferences**,
  and label the inferences.
- Do not invent examples, dates or quotes. If you cannot find something, say so.
- Trend articles ("web design trends 2025") count as weak evidence that a name is used, not as
  evidence of what the style is.
- Output in English, in Markdown, with one section per style and a summary table at the end:
  style · what you would see · relation to brutalism · strongest source · recommendation.
