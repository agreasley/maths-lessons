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


# Lesson 2 — Vector inequalities and geometric proof

## Approved scope and delivery

All Examples 2.1–2.17 and every subpart from booklet Chapter 2, printed pp. 11–35, appear in their original order in one 40-slide deck. The teacher chooses examples and stopping points and may spread the deck across two periods. No examples are relegated to an appendix and no homework split is imposed. Example 2.12 has two slides for legibility, adding one slide to the approximate 39-slide overview.

Objective: We are learning to use vectors to prove inequalities and geometric results. Success criterion: I can translate a mathematical claim into vector notation and construct a justified proof. Prior learning: Extension 1 vectors, including unit vectors and projections, plus Lesson 1 scalar-product properties and triangle inequality.

## Sequence

1–7: shared cover, objective, recall, angle-controlled Cauchy–Schwarz visual, Example 2.1, hinge, Example 2.2.
8–15: proof tips, vector RTP targets, four definitions, median construction, altitude via projection, in-plane perpendicular bisector, internal angle bisector via unit vectors, centroid/orthocentre reference.
16–19: Examples 2.3–2.4, concise quadrilateral properties and sufficient conditions.
20–25: Example 2.5(a–b), compare approaches, Example 2.6, Example 2.7(i–ii).
26–38: Examples 2.8–2.17 in order, with splits for 2.8, 2.12 and 2.17.
39–40: key ideas, Homework 2.

## Mathematical and teaching notes

- Cauchy–Schwarz: use |cos θ|≤1 for non-zero vectors, handle zero vectors separately. Equality holds for non-zero parallel vectors in either direction, and for a zero vector. Example 2.2 maximum 10 occurs at (6/5,8/5); an upper bound must be shown attainable.
- Hinge: correct option 3 (both 6 and −6). Options 1 and 2 omit one alignment; option 4 confuses perpendicularity with equality. Adjustable timer defaults to 60 seconds, with separate answer reveal. Ready: continue. Divided: compare 0° and 180° then revote. Needs explanation: revisit signed versus absolute dot product. Use the shared simultaneous 1–4 fingers routine.
- Fixed-vector tip: two non-parallel vectors span a plane; three non-coplanar vectors span space. Pairwise non-parallel does not suffice in 3D.
- Constructions: with a=AB, b=AC, the median vector is (a+b)/2. For d=b−a, the altitude vector is h=a−(a·d)/(d·d)d. Its endpoint lies on the supporting line BC, including outside the segment. The perpendicular-bisector line is through the midpoint parallel to h within the triangle’s plane. The internal angle-bisector direction is a/|a|+b/|b|. Its endpoint is not generally on BC. Full justifications appear in presenter notes.
- Example 2.3: comparing coefficients gives AM=(2/3)AD; do not assume the centroid result.
- Example 2.4: AB=b−a; OC=a+b; BM=(a+b)/2.
- Example 2.5: keep both coordinate and vector arguments. The partner prompt is “Choose your vectors. Write the statement that would finish the proof. Identify the given fact that will make it true.” Follow with “What makes that enough to prove the geometric claim?” This is a short adaptation of Project Zero’s What Makes You Say That? (https://pz.harvard.edu/resources/what-makes-you-say), attributed in presenter notes.
- Example 2.6: MN=AB/2 gives both claims at once.
- Example 2.7: use the supplied MQ and NR expressions without proof. Pairs prepare different squared-length expansions; the class combines them. Both sides reduce to 3(|b|²+|c|²+|d|²)−2(b·c+b·d+c·d). The mixed terms do not all cancel.
- Example 2.8: AE=(p+q)/2, BD=q−p, MB=p/2−q; NM=MB.
- Example 2.9: λ=1 gives B=C and λ=−1 gives A=C. No value gives three distinct collinear points. Treat λ=−1 separately before any division.
- Example 2.10: both diagonals have midpoint p+r.
- Example 2.11: QX=QA/3. The 1:2 ratio means PX=PB/3, not PB/2.
- Example 2.12: MA=a/2, BA=a−b, AQ=(b−a)/2; MN=AQ proves the parallelogram.
- Examples 2.13–2.14: squared-magnitude expansion proves Pythagoras; b=−a and |a|=|c| make CA·CB=0 for the semicircle.
- Example 2.15: PQ=(1,−1,3), RS=(2,−2,6)=2PQ; unequal opposite side lengths rule out a parallelogram.
- Example 2.16: |a+b|²+|b−a|²=2|a|²+2|b|².
- Example 2.17: equate |a+b|² and |kb−a|², factor 1+k and divide; k>0 justifies this. Do not divide by 1−k.

## Homework 2

Mild: Exercise 4F Q3; 4G Q1–3, Q7; 4H Q1.
Medium: Exercise 4F Q3, Q18; 4G Q4–8; 4H Q1, Q10.
Spicy: Exercise 4F Q18; 4G Q7, Q8, Q16, Q17; 4H Q5, Q10.

## Implementation

The shared unit cover appears only on the presentation opening slide. The existing numbered hinge, timer and slide map are reused. New vector diagrams use native SVG paths and the existing VectorDiagramMath label helper, with no foreignObject labels. Geometry diagrams remain static; the Cauchy–Schwarz visual has one touch-sized angle slider and presets. All required assets are local and embedded into the standalone HTML. Detailed worked solutions remain in presenter notes for OneNote teaching.

## Lesson 2 validation

Rendered with Quarto 1.10.18. Verified all 40 top-level slides, every example number and subpart, and complete forward/backward navigation in Chromium. Checked slide-map jumps, the initially hidden hinge answer, adjustable duration, Pause/Resume, a full 30-second expiry without answer reveal, deliberate answer reveal and Reset. Cauchy–Schwarz states checked at 0°, 60°, 90°, 120° and 180°. All static diagrams and the interactive diagram rendered using native SVG labels, without mathematical-renderer errors or foreignObject elements. Reviewed the cover, definitions, all four constructions, rhombus, pyramid and homework visually, and checked slide-content bounds across the full deck. Adjusted altitude and pyramid labels after visual review.

Construction perpendicularity and equal-angle identities were checked numerically, and the pyramid squared-length identity was verified on 100 integer-vector cases. Worked arguments were reviewed against the source questions, including the coincident-point cases in Example 2.9 and the ratio in Example 2.11.

Available browser: Chromium at 1363×936. WebKit, touch emulation, rotation and physical-iPad testing remain unavailable. The lesson uses native SVG coordinates and touch-sized controls without device-specific offsets. The established generated-preview escaping workaround was applied after rendering; repository source is unchanged by that preview workaround.
