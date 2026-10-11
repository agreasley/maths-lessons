# Lesson authoring instructions

Follow the repository structure and publishing guidance in README.md. For a new lesson or a substantial redesign, propose the slide sequence before building and wait for approval. Once approved, complete implementation and checks; explicitly requested small edits can be made directly.

## Consistent lesson appearance

Begin each lesson with the shared `.cover` title slide used in Lesson 1: lesson eyebrow, large title, short subtitle, coloured bar motif and booklet/homework footer. Keep this cover when revising opening activities unless the teacher explicitly asks to remove it; put the lesson objective and success criterion immediately after the cover, followed by the opening activity.

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
- Inside JavaScript-generated activities use the shared `math(tex)` helper, including regenerated equations, reveal-button labels and result histories. Preserve the distinction between lower- and upper-case symbols.

## Checks

Render the affected lessons and check mathematical correctness, option-to-answer mappings, simultaneous-response instructions, initially hidden answers, timer/reset behaviour, touch controls and layout at iPad landscape sizes. Preserve existing lesson URLs, navigation and homework allocations.
