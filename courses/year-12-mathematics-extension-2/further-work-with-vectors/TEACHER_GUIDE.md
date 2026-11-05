# Further Work with Vectors — teacher guide

## Lesson 1: Properties of the scalar product

Approved coverage: all of booklet Chapter 1, printed pp. 1–10, Examples 1.1–1.7. Sources: `12MAX2 - Further Vectors(1).pdf` (102 PDF pages) and `Further Vectors Lesson Sequence.pdf`. The supplied program names scalar-product properties and standard unit vectors for Lesson 1; the teacher explicitly added the triangle inequality as an application of those properties. Cauchy–Schwarz remains for Lesson 2. Students have completed Extension 1 Introduction to Vectors. No old-syllabus slides were supplied for this lesson.

Objective: We are learning to use the algebraic properties of the scalar product.

Success criterion: I can use scalar product properties to simplify expressions and justify vector identities.

The shared cover and objective precede the recap. The lesson has 22 slides, including separate cover, key-ideas and homework slides. For approximately 50 minutes: opening/recap 4; algebra properties and transfer 7; hinge and Example 1.1 5; unit vectors and Example 1.2 7; Examples 1.3–1.6 15; triangle inequality proof and interpretation 10; close/homework 2. This is a full lesson: keep the numerical illustrations brief and Example 1.5 a short independent expansion. Two interactive triangle-inequality slides give separate interpretations of the upper and lower bounds, followed by a combined-bounds summary. Keep the demonstration brief, with no additional routine. Example wording, values, notation, subparts and numbering are preserved. Solutions and optional prompts are in presenter notes for OneNote working.

## Mathematical checks

- Commutative means order; associative means grouping; distributive means multiplication over a sum. Use the scalar-multiplication identity for one scalar and two vectors. There is no separate three-vector associativity discussion. The final algebra form a(mb) uses commutativity as well as associativity.
- Example 1.1 answers: (a) 30, (b) 3, (c) 1.
- Example 1.2: nine terms reduce to three because distinct standard unit vectors are perpendicular.
- Example 1.3: distribute in both arguments and cancel the mixed terms by commutativity.
- Example 1.4: 4a·b=0; the non-zero condition gives perpendicularity.
- Example 1.5: three self-products plus three doubled cross-products.
- Example 1.6: xp+yq+(xq+yp)cosθ; part (b) θ=π/2. The quantifier “for all” is essential.
- Example 1.7(a): handle a zero vector directly; otherwise expand the squared magnitude, use the geometric dot-product formula and cosθ≤1, then take non-negative square roots. Do not invoke Cauchy–Schwarz.
- Example 1.7(b): apply the upper bound to a=(a+b)+(−b), then exchange a and b. Combine the two differences into an absolute value.
- Triangle equality: non-zero vectors in the same direction attain the upper bound; opposite directions attain the lower bound. If either vector is zero, both hold with equality.

## Hinge and controls

The hinge is an additional diagnostic, not a booklet example. Correct choice 1: 2(a·b)+2(a·c). Choice 2 doubles only one term; choice 3 doubles both factors in each dot product; choice 4 replaces addition with multiplication. Shared 1–4 finger icons and the simultaneous-response cue are retained. Default 60 seconds, adjustable 30/45/60/90/120. Start/Pause/Resume, Reset and teacher-controlled Reveal answer remain independent; expiry does not reveal. Ready: Example 1.1. Divided: compare reasoning then revote. Needs explanation: revisit 2x(y+z), map back to vectors and recheck.

## Homework 1

Cambridge Year 12 Extension 2, Exercise 4F. Mild: Q1(a,d), Q4(a), Q6, Q8, Q10(a). Medium: Q1, Q2, Q4, Q5–8, Q10(a), Q14. Spicy: Q2, Q4(b), Q5–8, Q10(a), Q14, Q18, Q19. Copied unchanged from the supplied booklet.

## Unit image and diagrams

The reusable cover asset is `media/spherical-spiral.svg`, used only on presentation covers; the topic contents page has no graphic. It plots (√(9−t²)cos(π(t+3)), √(9−t²)sin(π(t+3)), t), −3≤t≤3, on the radius-3 sphere, with three full turns. This is an exact mathematical illustration inspired by Example 3.38, with no coordinate labels or instructional task on the cover.

The interactive triangle reuses the existing Extension 1 `VectorDiagramMath` helper and local MathJax SVG renderer. Diagram labels and arrows share one SVG coordinate system; no foreignObject labels. Student text and equations use the shared local KaTeX rendering.

## Preview and publishing

From the repository root, run `quarto preview courses/year-12-mathematics-extension-2/further-work-with-vectors/lessons/lesson-1.qmd`. Render the site with `quarto render`. After review and merge, run the repository’s manual **Publish Quarto lessons** workflow on `main`. Committing or merging alone does not deploy GitHub Pages.

## Validation completed

Rendered the lesson, topic page, course page and homepage using Quarto 1.10.18. At that validation stage, the rendered lesson contained 21 top-level slides and no unintended nested slides. Chromium checks covered every slide with Next and Previous, slide-map jumps, initial answer hiding, numbered option mapping, a complete 30-second expiry with the answer still hidden, Pause/Resume, Reset, adjustable duration, pausing on opening the slide map, the unit-vector table reveal and Example 1.3(b) reveal. All KaTeX expressions and six native SVG labels rendered without errors. Representative cover, hinge, unit-vector table, Example 1.6 and triangle-inequality layouts were visually reviewed at the available 1363×936 browser viewport. Course → topic → lesson links resolve to rendered HTML.

WebKit, touch-device emulation at 1024×768 and 1194×834, orientation changes and a physical iPad were not available in this environment; those checks remain outstanding. No device-specific offsets or HTML foreignObject labels were introduced.

The environment's static preview server injects live-reload code at literal closing HTML tags, including tags inside the embedded Reveal presenter-notes string. For this local preview and the standalone HTML copy, closing body/head/html tags inside script strings were escaped as `<\/body>`, `<\/head>` and `<\/html>`, leaving the JavaScript runtime strings unchanged. This is a generated-preview workaround, not a source or publishing change; GitHub Pages does not use that preview server.

## Requested refinements

Definitions and all numerical/algebraic results on the commutative, associative and distributive slides are visible immediately; colour tracks repeated factors. The upper-bound interpretation states that the shortest distance between two points is a straight line. The lower-bound interpretation uses cancellation in opposite directions and a separate interactive diagram. The unit cover remains on the presentation opening slide only.

Earlier refinement checks: re-rendered the lesson and topic page; verified 21 top-level slides, zero maths-rendering errors, six SVG labels, zero buttons in the three definition slides, zero images on the topic contents page, and the retained lesson link. Visually checked the coloured associative/distributive identities and both triangle-bound slides in Chromium; the new lower-bound slide fits without clipping.

## Interactive triangle inequality update

The upper and lower interpretations now each have magnitude sliders (0–6), an angle slider (0–180 degrees), same/opposite direction presets and Reset. Native SVG arrows and labels update together. The resultant uses the actual sum components; outputs are rounded to two decimal places. A zero vector disables the undefined angle and explains equality in both bounds. The following new slide combines both inequalities and their equality conditions. This remains a brief demonstration, without a thinking routine.

Validation: 22 top-level slides; Chromium checked default diagrams, same/opposite directions, equal-opposite cancellation, zero vectors, a 3–4–5 resultant with the second vector longer, reset, slide-map navigation, all 22 slides in order and the combined slide. No mathematical rendering errors or foreignObject labels. WebKit, touch emulation and physical iPad checks remain unavailable.
