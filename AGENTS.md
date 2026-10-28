# Lesson authoring instructions

Follow the repository structure and publishing guidance in README.md. For a new lesson or a substantial redesign, propose the slide sequence before building and wait for approval. Once approved, complete implementation and checks; explicitly requested small edits can be made directly.

## Consistent lesson appearance

Begin each lesson with the shared `.cover` title slide used in Lesson 1: lesson eyebrow, large title, short subtitle, coloured bar motif and booklet/homework footer. Keep this cover when revising opening activities unless the teacher explicitly asks to remove it; put the lesson objective and success criterion immediately after the cover, followed by the opening activity.

Inside a layout div such as `.column-block`, use raw HTML `<h3>...</h3>` for a panel heading. A Markdown heading at the start of a div can make Pandoc emit a nested `<section>`, which Reveal mistakes for another slide and can break navigation. After rendering, check the slide count and navigate through the full sequence using Next and Previous.

## Multiple-choice response routine

- Use four numbered choices: **1, 2, 3, 4**, with one unambiguously correct answer. Use the same convention for timed hinges and other classroom multiple-choice checks.
- Student prompt: **Fist on chest. Think quietly. On “show”, hold up 1–4 fingers.**
- Everyone starts with a closed fist on their chest and considers the question independently. On the teacher's verbal “show” cue, everyone extends the number of fingers matching their choice at chest level, at the same time. Keep answers private until that cue. Do not substitute A–D signals, thumbs-up or an automatic reveal at timer expiry.
- Reuse the shared `hinge`/`quiz` components and `assets/images/finger-responses.png` cartoon hand icons. The printed number must remain visible alongside each icon; icons are supplementary and decorative for accessibility.
- Set `data-answer` and `data-correct` to the matching strings `"1"`–`"4"`. Preserve adjustable duration, start/pause/reset controls and a separate teacher-controlled answer reveal. Default to 60 seconds for timed hinges.
- Teacher notes must identify the correct number, explain each distractor and suggest responses when students are ready, divided or need further explanation.
- Preserve supplied booklet question wording, values, notation, order, example numbering and subparts. When screen choices are numbered but the source uses letters, explain in teacher notes that **1–4 correspond to A–D respectively**, retaining the source answer reference in the teacher guide.

## Mathematical typography

- Typeset variables and expressions, including lower-case **x** and upper-case **X**, using the lesson's mathematical renderer rather than ordinary body text or an unstyled HTML `var` element.
- In Quarto prose use `$x$`, `$X$` and normal LaTeX maths. Inside raw HTML use `<span data-math="x">x</span>` (and the corresponding expression). Shared JavaScript renders these with the embedded KaTeX library.
- For HTML content inside JavaScript-generated activities, use the shared `math(tex)` helper, including regenerated equations, reveal-button labels and result histories. For labels inside SVG diagrams, use the native SVG mathematics renderer described below. Preserve the distinction between lower- and upper-case symbols.

## iPad and browser compatibility

The teaching target is Safari on an iPad. A lesson that looks correct on a laptop, or in Chromium with an iPad-sized viewport, has not yet been checked for iPad browser compatibility.

- **Keep diagrams and their labels in the same SVG coordinate system.** Use native SVG text for ordinary tick values and native SVG paths for mathematical notation. Do not embed HTML/KaTeX labels using SVG `foreignObject` in new or revised diagrams: Safari/WebKit can misplace or mis-scale them when Reveal scales the slide or a group is translated. Do not compensate with device-specific offsets.
- **Reuse the existing SVG maths renderer.** The vector lessons use `VectorDiagramMath.label(...)` from `courses/year-12-mathematics-extension-1/introduction-to-vectors/diagram-math.js`, its configuration file and the locally bundled MathJax SVG component in `assets/vendor/mathjax-3.2.2/`. Reuse this approach for other topics; extract a shared helper when needed rather than creating divergent copies. Keep prose, controls and ordinary equations in KaTeX. Preserve offline use by embedding local dependencies.
- **Test the browser engine, not just the viewport.** For new or changed interactive diagrams, run the rendered lesson in both Chromium and WebKit. Use touch-enabled iPad landscape sizes (1024×768 and 1194×834), and resize to portrait and back. Playwright WebKit is a useful compatibility check, but it is not a physical-iPad test.
- **Exercise states that can expose label drift.** Check initial and revealed diagrams, representative positive/negative/zero values, relevant 2D/3D views, translated or dragged objects, and resets. Open the slide map and return to the lesson; labels must stay attached to their geometry in previews as well. Include fractions, coordinate labels and axis values where present.
- **Inspect visual output as well as assertions.** Review representative screenshots in both engines for displaced, clipped or overlapping labels. Verify that labels move and scale with their intended anchors and that touch controls still work. A clean console or correct arithmetic alone does not establish visual correctness.
- **Report what was actually tested.** Name the engines and checks performed. If WebKit or physical-device testing was unavailable, state that limitation; do not describe viewport-only Chromium checks as “tested on iPad”.

## Checks

Render the affected lessons and check mathematical correctness, option-to-answer mappings, simultaneous-response instructions, initially hidden answers, timer/reset behaviour, touch controls and layout at iPad landscape sizes. Preserve existing lesson URLs, navigation and homework allocations.
