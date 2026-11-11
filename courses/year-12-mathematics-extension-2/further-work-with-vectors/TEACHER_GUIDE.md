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

All Examples 2.1–2.17 and every subpart from booklet Chapter 2, printed pp. 11–35, appear in their original order in one 41-slide deck. The teacher chooses examples and stopping points and may spread the deck across two periods. No examples are relegated to an appendix and no homework split is imposed. Example 2.12 has two slides for legibility. The centroid and orthocentre now have separate slides, with acute, right-angled and obtuse diagrams on the orthocentre slide.

Objective: We are learning to use vectors to prove inequalities and geometric results. Success criterion: I can translate a mathematical claim into vector notation and construct a justified proof. Prior learning: Extension 1 vectors, including unit vectors and projections, plus Lesson 1 scalar-product properties and triangle inequality.

## Sequence

1–7: shared cover, objective, recall, angle-controlled Cauchy–Schwarz visual, Example 2.1, hinge, Example 2.2.
8–16: proof tips, vector RTP targets, four definitions, median construction, altitude via projection, in-plane perpendicular bisector, internal angle bisector via unit vectors, separate centroid and orthocentre references.
17–20: Examples 2.3–2.4, concise quadrilateral properties and sufficient conditions.
21–26: Example 2.5(a–b), compare approaches, Example 2.6, Example 2.7(i–ii).
27–39: Examples 2.8–2.17 in order, with splits for 2.8, 2.12 and 2.17.
40–41: key ideas, Homework 2.

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

The shared unit cover appears only on the presentation opening slide. The existing numbered hinge, timer and slide map are reused. New vector diagrams use native SVG paths and the existing VectorDiagramMath label helper, with no foreignObject labels. The four triangle construction slides now use teacher-controlled step animations and cumulative algebra; other geometry diagrams remain static. The Cauchy–Schwarz visual has one touch-sized angle slider and presets. All required assets are local and embedded into the standalone HTML. Detailed example solutions remain in presenter notes for OneNote teaching; the construction working is explicitly shown on the four construction slides.

## Lesson 2 validation

Rendered with Quarto 1.10.18. Verified all 40 top-level slides, every example number and subpart, and complete forward/backward navigation in Chromium. Checked slide-map jumps, the initially hidden hinge answer, adjustable duration, Pause/Resume, a full 30-second expiry without answer reveal, deliberate answer reveal and Reset. Cauchy–Schwarz states checked at 0°, 60°, 90°, 120° and 180°. All static diagrams and the interactive diagram rendered using native SVG labels, without mathematical-renderer errors or foreignObject elements. Reviewed the cover, definitions, all four constructions, rhombus, pyramid and homework visually, and checked slide-content bounds across the full deck. Adjusted altitude and pyramid labels after visual review.

Construction perpendicularity and equal-angle identities were checked numerically, and the pyramid squared-length identity was verified on 100 integer-vector cases. Worked arguments were reviewed against the source questions, including the coincident-point cases in Example 2.9 and the ratio in Example 2.11.

Available browser: Chromium at 1363×936. WebKit, touch emulation, rotation and physical-iPad testing remain unavailable. The lesson uses native SVG coordinates and touch-sized controls without device-specific offsets. The established generated-preview escaping workaround was applied after rendering; repository source is unchanged by that preview workaround.


## Construction and proof-guidance revisions

The median, altitude, perpendicular-bisector and internal-angle-bisector slides each begin with the known triangle. The median and perpendicular bisector have five steps; the altitude and angle bisector have four. Next step animates new SVG segments and reveals the associated algebra; earlier equations stay visible. Previous step and Reset construction allow retracing, independently of slide navigation. Returning to a slide or closing the slide map preserves its current step. The controls are at least 48 CSS pixels high, and the animation respects reduced-motion preferences. Diagram labels use native SVG throughout.

- Median: CB=CA+AB=a−b; CM=CB/2; AM=AC+CM; substitution; full simplification to (a+b)/2.
- Altitude: d=BC=b−a; project a onto d; place the projection with its head at B and call its tail H; subtract to find AH. The perpendicular component is recognised from the Extension 1 projection construction, without a separate check. The projection points opposite to d in the displayed triangle.
- Perpendicular bisector: construct M with the same midpoint working, reuse the altitude direction h, then draw the parallel line through M in the triangle’s plane. The final diagram suppresses the temporary midpoint-path arrowheads for clarity.
- Internal angle bisector: begin with the reminder that a rhombus diagonal bisects its opposite angles. Normalise both side vectors, translate and add them to form a rhombus, then use AD=k(u+v), k>0, with k chosen so D lies on BC. No dot-product check or calculation of k is included; a general parallelogram does not have the angle-bisecting property.

The quadrilateral slides now use a square as a case study. The properties slide points to the full six-shape reference in §2.2.2, printed pp. 18–19. The sufficient-conditions slide points to §2.2.3, p. 20, develops one vector route (parallelogram → rectangle → square), and includes the booklet’s two other square routes. Students are expected to know the reference for every shape. The target-square diagram has no markings that assume the conclusions.

The vector-choice tip is prominent: two non-parallel vectors for a plane; three non-coplanar vectors for space. Every required vector should be expressed using the same chosen set. Example 2.7 repeats the spatial choice explicitly. Its triangular pyramid now has two lightly shaded visible faces, one dashed hidden edge and only LP across its interior; all six original midpoint labels remain. Question wording, numerical values, subparts and the supplied formulas in part (ii) are unchanged.

Revision checks: rendered with Quarto 1.10.18; all 40 slides passed forward and backward navigation in Chromium at 1363×936. Exercised all five forward steps on each construction, all reverse steps on the altitude/perpendicular-bisector/angle-bisector components, and reset on all four. The median retained step 4 and its four visible working rows in the slide-map preview and on return. Completed construction layouts fit within the slide bounds; native SVG labels and equations rendered without errors or foreignObject elements. Visually reviewed the four constructions, square properties, square sufficient conditions, strengthened vector-choice guidance and simplified pyramid. The final controls measured 46.5 screen pixels high at the available viewport. Checked median, altitude and equal-angle identities on 200 deterministic random 2D/3D vector cases. WebKit, touch emulation, orientation changes and physical-iPad checks remain unavailable.

The altitude and internal-angle-bisector constructions were subsequently shortened to four steps as requested. Both algebraic verification steps were removed. The initial geometric reminder correctly names a rhombus, and the final angle-bisector vector is AD=k(u+v), k>0.

Shortened-construction checks: re-rendered the 40-slide deck; in Chromium verified the initial rhombus reminder, each of the four steps on both changed slides, disabled Next step at the new final step, Previous step and Reset, diagram labels and final layouts. No mathematical-rendering errors or foreignObject elements. Both slides fit within the slide bounds. Existing WebKit/iPad testing limitations remain.


## Separate triangle-centre slides

Slide 15 now shows only the medians and centroid, with all three medians coloured and the vertex-to-centroid ratio 2:1. Its existing identifier is preserved. New slide 16 compares acute, right-angled and obtuse triangles, each with all three altitude lines and perpendicular-foot markers. Grey dashed segments extend sides; coloured dashed segments extend altitudes. The right-angle case explicitly identifies H=B and shows two altitudes along the perpendicular sides. Orthocentres and feet are calculated from the triangle vertices, not placed by eye. The deck now has 41 slides; examples and homework are unchanged.

Triangle-centre revision checks: all 41 slides passed forward and reverse navigation in Chromium at 1363×936. The slide map contains both separate slides and all three orthocentre diagrams in its preview. Visually reviewed both slides and adjusted centroid/apex/orthocentre labels to avoid lines. Checked all nine altitude perpendicularities and the three orthocentre coordinates numerically; no invalid SVG path coordinates, mathematical-rendering errors or clipping. WebKit, touch emulation and physical-iPad checks remain unavailable.

## Lesson 3: Vector equations of lines

Approved coverage: §§3.1–3.2, printed pp. 36–48, Examples 3.1–3.7, Homework 3. The opening uses the booklet's x=3−t, y=2t and t=0, 0.5, 1, 2. Students know Year 11 parametrics and Extension 1 position vectors. Each parameter value gives a position vector from the origin; its tip traces the curve as the parameter varies. Today specialises that general idea to straight lines; other curves come later. Use “a multiple of a direction vector” for the vector added to the fixed position vector.

Objective: We are learning to construct vector equations of straight lines and connect them to Cartesian equations.

Success criterion: I can construct a vector equation of a line and express it in parametric and Cartesian form.

The deck contains 25 slides. Suggested 50-minute pacing: cover/objective/recap 3; point-to-position-vector bridge and line construction 9; Examples 3.1–3.3 and hinge 9; conversions and Example 3.4 12; Example 3.5 and parameter interpretation 8; gradient and Examples 3.6–3.7 7; finish/homework 2. Keep the single-mark questions brief; use OneNote for full working. All booklet subparts are retained in order. Worked solutions appear in presenter notes.

### Visuals

- The opening table uses two separate reveals for each of the four specified t values: show the amber point and coordinates first, then the blue position vector. Previous points remain on accurately scaled axes; the latest position vector starts at O. Predict each point before revealing it. Ask how the coordinates change when t increases by 1.
- The construction asks “How could we construct r so that its tip traces a line through A?” A=(3,0) and d=(−1,2) remain fixed. A slider moves the amber point P along the line: the fixed green OA plus gold λd gives the blue position vector r. Presets λ=−1,0,1,2 and Reset support discussion; there is no step routine. The full line permits all real λ; the slider shows a finite viewing window.
- The two-point slide asks students to propose a direction vector before revealing PQ=q−p and the resulting line equation. QP and non-zero multiples are also valid.
- A general conversion slide starts by letting r=xi+yj+zk, matching components, then using familiar parametric-equation techniques to eliminate the parameter. The 2D and 3D examples follow this method.
- The constant-coordinate graph revisits Example 3.1: the line x+y=2 lies in the plane z=1. Three labelled points all have z coordinate 1; the xy-plane below provides a height reference.
- Example 3.5 has touch-sized presets in booklet order, with points revealed only when selected. Ask why λ=1/3 gives PR:RQ=1:2. The follow-up uses a fixed spatial view modelled on the booklet diagram: a slider moves R before P, between P and Q, or beyond Q. It shows PR=λPQ, the endpoint cases and the interior ratio λ:(1−λ), including the midpoint. The segment restriction is 0≤λ≤1.
- All diagram labels use the shared native SVG maths renderer. No external applet or 3D rotation is used.

### Mathematical and hinge notes

- Example 3.1: (1,1,1), (4,−2,1), (101,−99,1), (−4,6,1). Revisit the constant z coordinate when introducing Cartesian equations.
- Example 3.2: AB=(−8,2,−5); λ=2 gives (−11,6,−4).
- Example 3.3 is the timed hinge. Screen choices 1–4 correspond to source A–D; correct 4 (D). Choice 1 swaps direction components, choice 2 uses a point vector as direction and an incorrect fixed point, choice 3 swaps the point and direction roles. Ready: continue to conversion. Divided: identify both ingredients and revote. Needs explanation: draw AB and calculate B−A. Default 60 seconds, adjustable; answer remains hidden until deliberately revealed. Use the shared fist-on-chest, 1–4 fingers response.
- The 2D bridge gives y=6−2x. In 3D all coordinate expressions use the same λ. Both equalities of the symmetric form must hold simultaneously. A constant coordinate remains a separate equation, e.g. x+y=2 together with z=1. Never divide by a zero direction component.
- Example 3.4(a): r=(−2,1,4)+λ(2,1,−2); Cartesian (x+2)/2=y−1=(z−4)/(−2). (b): r=(1,3,2)+λ(2,2,−2), or use direction (1,1,−1).
- Example 3.5: r=(1,2)+λ(6,3)=(1−λ)(1,2)+λ(7,5). Points (−5,−1), (1,2), (3,3), (7,5), (13,8). Ratio 1:2.
- Example 3.6: correct screen 3, source C, y+2x=5. Correct point alone does not exclude choice 1; the direction is essential.
- Example 3.7: y=(2/3)x+9. Use A as the required point, not the fixed point from the original line.
- Non-zero scalar multiples give equally valid direction vectors. The equation is not unique. The parameter interpretation is tied to the chosen parameterisation.

### Homework 3

Cambridge Year 12 Extension 2, Exercise 4A. Mild: Q1, Q2, Q4, Q6, Q8, Q9, Q17. Medium: Q3–Q6, Q8, Q9, Q16, Q18–Q20. Spicy: Q3–Q6, Q8(a), Q9(a), Q16, Q18–Q21. Preserved unchanged from the booklet.

### Lesson 3 publishing

Use the standard Quarto preview command with courses/year-12-mathematics-extension-2/further-work-with-vectors/lessons/lesson-3.qmd. The topic listing now shows three lessons and Homework 1–3. After source changes reach main, run the repository's manual Publish Quarto lessons workflow to update GitHub Pages.

### Lesson 3 validation

Initial-build validation: rendered the lesson and navigation pages with Quarto 1.10.18. Chromium at 1363×936 passed full forward/back navigation across the then 24 top-level slides, with no nested slides, mathematical-rendering errors or SVG foreignObject labels. Checked all four opening parameter values, the three construction steps and negative/zero/positive presets, all five Example 3.5 points, resets and retention through the slide map. Checked the hinge duration control, Start/Pause/Resume, a full 30-second expiry with the answer hidden, deliberate reveal and Reset, plus the Example 3.6 answer reveal. Reviewed representative cover, opening table, completed construction, 3D conversion, parameter diagram and homework layouts. All slide content fitted the available bounds. Topic navigation and the new lesson card were checked. Coordinate calculations and shared-parameter identities were checked independently.

WebKit is not installed, and this browser does not expose touch emulation or viewport/orientation controls. WebKit, iPad landscape sizes and physical-iPad checks remain outstanding. Native SVG labels and 48-pixel source controls follow the existing iPad compatibility conventions. The established generated-preview closing-tag escaping workaround was applied only to the rendered HTML.

### Separate point and position-vector reveals

Slide 4 now has eight teacher-controlled steps: point, then position vector, for each of t=0, 0.5, 1 and 2. Amber identifies the point and its coordinate entry. Blue identifies the position-vector arrow, its table entry and the matching r(t)=… label beneath the graph. The vector entry remains hidden during the point step. Earlier points and completed table entries remain visible; only the current vector is drawn. Previous step retraces one reveal and Reset clears all eight steps.

Separate-reveal checks: Chromium verified all eight forward and reverse steps. Every point step has no arrow, caption or current vector-table entry; each vector step has one blue arrow and the correct r(t) label. Reset clears the graph and table, and the slide map retains the selected point-only phase. Reviewed point-only, t=0 vector and completed t=2 layouts. The final content fits within the slide, with no maths errors. Existing WebKit/iPad testing limitations remain.


### Live line-construction and parameter update

The requested revision replaces the construction steps with a live vector sum, adds the two-point direction prompt and reveal, adds the general component-matching method, and illustrates the constant coordinate with a fixed spatial graph. The parameter interpretation now has a slider, presets, endpoint states and an interior-ratio display modelled on the booklet diagram.

Validation: Quarto 1.10.18 rendered 25 top-level slides with no nested slides. Chromium at 1363×936 checked the complete forward and backward sequence, slide-map jumps and state retention, the direction reveal/hide, negative/zero/positive construction presets, both slider endpoints and fractional increments, parameter regions and endpoint states, Reset and the interior ratio 1:3 at λ=1/4. Reviewed the revised construction, direction, conversion, constant-coordinate and parameter layouts; content fits the slide bounds. No maths-rendering errors or SVG foreignObject elements were found. Independently checked the coordinate and vector identities. Booklet examples, opening point/vector reveals, homework and existing hinge controls are retained. WebKit, touch emulation, iPad viewport/orientation and physical-iPad checks remain unavailable.

## Lesson 4: Parallel lines, points on lines and collinearity

Approved coverage: booklet §3.3, Examples 3.9–3.13, printed pp. 51–58, with Example 3.8 (p. 49) carried into the opening recap so it is not skipped after Lesson 3. Source wording, values, numbering and every subpart are retained. Intersections of two lines and skew-line tests remain for Lesson 5. The 17-slide deck assumes approximately 50 minutes and keeps booklet worked solutions in presenter notes for OneNote. Slide 6 includes an additional worked demonstration of point membership on screen.

Objective: We are learning to use vector equations to determine relationships between points and lines.

Success criterion: I can justify whether lines are parallel or points lie on a common line.

### Lesson 4 sequence and visuals

1–3: shared unit cover, learning statements, prerequisite recap with all of Example 3.8.
4–6: conceptual 3D diagram of parallel direction vectors, geometric distinction between distinct parallel and coincident lines, worked point-membership comparison.
7–9: Example 3.9(a), Example 3.9(b–c), diagnostic hinge.
10–11: three fixed coordinate-plane reference diagrams and Example 3.10.
12–15: common-starting-point collinearity diagram, Examples 3.11–3.13.
16–17: key tests and success criterion, Homework 4.

The 2D line comparison keeps ℓ1: r=(1,2)+λ(2,1) fixed. The second line has direction (−4,−2), a non-zero multiple of the first. Its fixed point toggles between B=(1,3), giving distinct parallel lines, and B=(5,4), giving coincident lines. Students predict before changing the preset, then explain what direction comparison and point membership each establish. The coincident state uses a dashed green line over the solid blue line so both remain visible. Reset restores distinct lines. The two lines have independent parameters. This is a short mathematical prediction and explanation, not a named Project Zero routine.

Slide 4 uses a fixed 3D projection of two parallel lines, with a pale xy-plane for context and coloured direction arrows. The arrows point in opposite senses to emphasise that this still gives parallel directions. Their actual vectors are proportional; no numerical comparison is displayed. Slide 5 stays geometric, with no coordinate-by-coordinate parameter explanation.

Slide 6 demonstrates r=(2,−1,1)+λ(1,2,−1). For P=(4,3,−1), x=4 gives λ=2, which also produces the required y and z coordinates. For Q=(4,3,0), the same x fixes λ=2 and y matches, but z=−1 differs from the required 0. This makes the need to check all three coordinates explicit. The successful test for P is visible first. One click of Next (or the right arrow) reveals Q and its failed test beside P; Previous hides Q again. The reveal uses the existing presentation navigation, with no extra button. These are additional teaching examples; Example 3.9 remains unchanged for student application.

Coordinate-plane diagrams use one fixed linear projection; yz means x=0, xz means y=0 and xy means z=0. The collinearity diagram draws AB and AC from exactly the same starting point. Native SVG maths labels share the diagram coordinate system; no foreignObject or 3D rotation is used. The cover illustration occurs only on the title slide.

### Lesson 4 mathematical checks and answers

- Example 3.8: possible vector equations are (0,4)+λ(2,−3), (0,−2)+λ(1,0) and (5,0)+λ(0,1), respectively; λ is real. The gradient in (a) is −3/2.
- Parallel directions mean d2=k d1 for one non-zero scalar. A common point then establishes coincidence; without one, the lines are distinct and parallel. Direction vectors must be non-zero. Avoid dividing by zero components.
- Example 3.9(a): x=−2+2λ, y=1−λ, z=2+3λ. (b) (1,2,3) implies incompatible values 3/2, −1 and 1/3; (−6,3,−4) works at λ=−2. (c) λ=0 and 1 give (−2,1,2) and (0,0,5), among many valid answers.
- Example 3.10: yz-plane (0,6,2), xz-plane (3,0,5), xy-plane (−2,10,0), at λ=−1, 2 and −3 respectively. Different points may use different parameters; every component of an individual point uses the same parameter.
- Example 3.11: AB=(1,−3,2), AC=(4,−12,8)=4AB, hence collinear.
- Example 3.12: AB=(4,8,16), AC=(6,12,24)=(3/2)AB, hence collinear. Use as a brief independent attempt before comparing reasoning.
- Example 3.13(i): r=(3,5,−4)+λ(4,−5,6). (ii) C gives λ=7/4, 0 and 1/3, so is not on the line. Any explicit inconsistency suffices. Retain supplied 1-mark and 2-mark allocations.

### Lesson 4 hinge

Additional diagnostic: which point lies on r=(1,−2,3)+λ(2,1,−1)? Choices 1 (5,0,2), 2 (4,2,−2), 3 (5,0,1), 4 (3,−1,4). Correct choice 3 uses λ=2 in every component. Choice 1 checks only x and y; choice 2 omits the fixed position vector; choice 4 uses the wrong sign for the z component. The shared timer defaults to 60 seconds with adjustable duration, Start/Pause/Resume and Reset. Teacher-controlled answer reveal is separate from expiry. Use the shared fist-on-chest, 1–4 fingers routine. Ready: coordinate planes. Divided: compare the values implied by each coordinate and revote. Needs explanation: substitute one shared value into all three equations, then recheck.

### Homework 4

Cambridge Year 12 Extension 2, copied unchanged from booklet p. 58.

- Mild: Exercise 4A Q10(a,c), Q11. Exercise 4B Q1(b), Q2, Q8, Q9.
- Medium: Exercise 4A Q10, Q11, Q13–15. Exercise 4B Q1, Q2, Q8, Q9.
- Spicy: Exercise 4A Q13–15. Exercise 4B Q2, Q8, Q9. Exercise 4E Q9.

### Lesson 4 preview and publishing

Render or preview `courses/year-12-mathematics-extension-2/further-work-with-vectors/lessons/lesson-4.qmd`. The topic lists four lessons and Homework 1–4. Once the source reaches main, run the manual Publish Quarto lessons workflow to update GitHub Pages.

### Lesson 4 validation

Staged point-test revision: Chromium confirmed Q is initially hidden, Next reveals it without changing slides, Previous hides it again, and the following Next advances to Example 3.9(a). Both states were visually checked, followed by full forward/backward navigation through all 17 slides.

Revision check: re-rendered the 17-slide deck after replacing slide 4's numerical comparisons with the fixed 3D diagram, simplifying both states of slide 5, and adding the two worked point tests on slide 6. Chromium at 1363×936 passed full forward/backward navigation, both line presets, Reset and state retention through the slide map. Screenshots of all three revised slides showed readable labels and no clipping; the worked demonstration fits above the footer/navigation. No nested slides, maths-rendering errors or foreignObject elements were present. Exact rational arithmetic confirms parameter values (2,2,2) for P and (2,2,1) for Q. Booklet example files, hinge and homework were unchanged.

Quarto 1.10.18 rendered the lesson and its topic listing. Chromium at 1363×936 passed full forward and backward navigation across 17 top-level slides, with no unintended nested slides, maths-rendering errors or foreignObject elements. Checked distinct/coincident presets, Reset and state retention through the slide map. Checked the 60-second default, changed duration to 30 seconds, Start/Pause/Resume, pause on opening the slide map, a complete expiry with the answer still hidden, deliberate reveal, correct/incorrect option mapping and Reset restoring a hidden answer. Reviewed cover, recap, direction comparisons, point test, line diagrams, coordinate planes, collinearity, hinge before/after reveal and homework layouts. All content fits the available slide bounds. Numerical solutions and the unique hinge answer were independently checked with exact rational arithmetic. The topic shows four lessons and links to the new deck.

WebKit, touch-device emulation, iPad landscape viewport/orientation controls and physical-iPad testing are unavailable here. These checks remain outstanding; native SVG labels and source controls of at least 48 pixels follow the existing conventions. The established generated-preview script closing-tag workaround was applied only to rendered HTML, not to the tracked source.

## Lesson 5: Intersections of vector lines

Approved coverage: booklet §3.4, printed pp. 59–68, all Examples 3.14–3.20 and every subpart. The source is 12MAX2 – Further Vectors(1).pdf, with syllabus scope from the supplied Further Vectors Lesson Sequence. The 21-slide deck includes the booklet's unnumbered 3D worked illustration, concurrency definition and Homework 5. Assume about 50 minutes; keep the final minimum-distance application available if it needs to carry over.

Objective: We are learning to determine how lines meet in two and three dimensions.

Success criterion: I can justify whether two vector lines intersect and find their common point when it exists.

Students know how to form vector/parametric/Cartesian line equations, compare directions and test point membership. They already know the minimum-distance/perpendicularity idea from Extension 1. The distance connection starts with A as the given point, B as a known point on the line and u=BA. It shows both projection and a dot-product equation, without rediscovering shortest distance.

### Lesson 5 sequence and interactions

1–3: unit cover, objective/success criterion, concise conceptual recap.
4–5: two independent parameters on Example 3.14's lines, followed by the unchanged question.
6–9: 3D worked illustration with the third-coordinate check on the next click, a fixed 3D intersecting/skew comparison, hinge, Example 3.15.
10–15: Example 3.16, classification table, Example 3.17, Example 3.18 split into (a–b) and (c–d), Example 3.19.
16–21: concurrency, minimum distance by projection, minimum distance by perpendicularity, Example 3.20, summary, Homework 5.

The independent-parameter visual has separate s and t sliders, local axis scales of equal unit length, a common-point preset and Reset. Blue r1(s)=(1,2)+s(2,1) and green r2(t)=(6,1)+t(−1,3) share (5,4) at s=2,t=1. Ask whether the parameters or position vectors must be equal. Reset restores s=t=0; values remain independent when either slider moves.

The skew visual uses r1(s)=(s,1,0), r2(t)=(2,t,h), with h=0 or 2. The fixed camera, coordinate axes and pale xy-plane show the spatial setting. Both states have non-parallel directions. The unique pair s=2,t=1 matches x and y; changing the height changes whether z matches. Presets and Reset are touch-sized. No rotation or external applet is required.

The concurrency diagram has three lines through exactly one P. The distance diagrams use A as the given point, B as a known point on the line and H as the perpendicular foot. They omit the origin and position-vector arrows. Projection first reveals BH and then the perpendicular remainder HA=BA−BH. The perpendicularity slide starts with a general P(t), BP=td and PA=u−td; Next changes P to H and reveals (u−td)·d=0. Blue u, green parallel parts and gold joining/perpendicular vectors are consistent across both diagrams. The right-angle markers are geometrically accurate; Previous reverses each stage. All SVG maths labels use the shared native-path renderer; no foreignObject. No named thinking routine is forced into this lesson.

### Lesson 5 mathematical checks and presenter answers

- Example 3.14: 2s+t=5 and s−3t=−1 give s=2,t=1 and intersection (5,4).
- Worked illustration, p. 59: the first two component equations give s=2,t=1; both z values are 5, so the intersection is (5,0,5). Use two independent equations, then check the remaining one with the same pair.
- Example 3.15: x,y give s=t=1, but the points are (2,2,1) and (2,2,2). No intersection; non-parallel directions imply skew.
- Example 3.16: direction vectors (b1,d1,f1),(b2,d2,f2). Parallel directions are non-zero scalar multiples; distinguish coincidence if distinct parallel lines are intended. Intersection requires one pair s,t satisfying all three equalities. Perpendicular lines meet and have b1b2+d1d2+f1f2=0.
- Example 3.17: directions are not multiples. x,y give t=−3,s=−5/2, with points (−4,−2,10),(−4,−2,7). No intersection, hence skew. Direction dot product 10, so not perpendicular.
- Example 3.18(a): d2=−(2/3)d1; the lines are distinct. (b) t=−1/9,u=7/3 gives (2/3,4/3,4/3). (c) d1·d3=0 and part (b) establishes intersection, so perpendicular. (d) d2·d3=0, but s=1/6,u=4/3 from x,y gives z=7/3 and 1/3. L2,L3 are skew with orthogonal directions.
- Example 3.19: d1=(4,5,−6), d2=(a−3,−10,12). (a) a=−5. (b) a=67/2. The y equation requires t+2s=2 and z requires t+2s=1, so no intersection. Preserve the distinction in the source between perpendicular directions and lines meeting at right angles.
- Example 3.20: B=(1,2,3), d=(−2,2,4), u=BA=(3,0,2). Projection gives BH=(u·d)/(d·d)d=(−1/6,1/6,1/3), then HA=(19/6,−1/6,5/3). Alternatively PA=u−td=(3+2t,−2t,2−4t) and PA·d=2−24t=0 give t=1/12 and the same HA. H=(5/6,13/6,10/3), minimum distance sqrt(77/6)=sqrt(462)/6. Both worked solutions and suggested, not official, 3-mark guides are in presenter notes. The optional calculus alternative minimises D²=24t²−4t+13, again at t=1/12; it is kept in notes.

### Lesson 5 hinge

Two non-parallel direction vectors are given. The only parameter pair matching x,y is s=2,t=1; the position vectors are (5,0,5),(5,0,7). Choices: 1 intersect at (5,0,5); 2 skew; 3 distinct parallel; 4 cannot decide because s,t differ. Correct choice 2. Distractors diagnose checking only two coordinates, equating non-intersection with parallelism, and requiring independent parameters to match.

Use the existing 60-second adjustable timer, Start/Pause/Resume, Reset and separate answer reveal. Expiry must not reveal the answer. Students respond simultaneously with 1–4 fingers. Ready: Example 3.15. Divided: compare the points and revote. Needs explanation: return briefly to the skew-lines visual.

### Homework 5

Cambridge Year 12 Extension 2, copied from booklet p. 68.

- Mild: 4B Q3, Q5(a), Q10, Q11(a). 4C Q8(b)(i), Q9, Q11.
- Medium: 4B Q3, Q5, Q10–14. 4C Q5, Q8(b), Q9, Q11.
- Spicy: 4B Q5(b), Q11–13, Q15, Q18, Q19. 4C Q8(b), Q10–Q11, Q13.

### Lesson 5 preview and publishing

Render courses/year-12-mathematics-extension-2/further-work-with-vectors/lessons/lesson-5.qmd. The topic lists five lessons and Homework 1–5. Commit source to main, then run the manual Publish Quarto lessons workflow to update GitHub Pages.

### Lesson 5 validation

Initial 20-slide build: Quarto 1.10.18 rendered the lesson and its topic/course listings. Chromium at 1363×936 passed full forward and backward navigation through all 20 top-level slides, including both staged reveals; there are no unintended nested slides, unrendered equations, KaTeX errors or foreignObject elements. Course → topic → Lesson 5 and the return link work. All booklet cues fit above the navigation; the revealed hinge retains 45 pixels of clearance.

Checked independent s/t sliders at zero, negative and positive values, common-point preset, Reset and state retention through the slide map. Reviewed both intersecting/skew presets, Reset, native SVG label placement, concurrency and the minimum-distance diagram. Verified the third-coordinate and dot-product reveals. The hinge defaults to 60 seconds; changing duration, Start/Pause/Resume, expiry without an answer reveal, deliberate reveal, wrong/correct choice mapping and Reset all passed. Reviewed examples, summary and the exact Homework 5 allocation. Numerical answers were independently checked using exact rational arithmetic.

WebKit, touch-device emulation, iPad viewport/orientation controls and physical-iPad testing are unavailable here; those checks remain outstanding. Diagram labels use native SVG paths in the same coordinate system and controls follow the existing touch-sized conventions. The existing script closing-tag workaround was applied to generated preview HTML only, not the tracked source.


Minimum-distance revision: the deck now has 21 slides. Chromium at 1363×936 passed complete forward and backward navigation, including projection stages 0/1/2 and perpendicularity stages 0/1. Visually reviewed every state of both revised native SVG diagrams; labels remain attached and the right-angle markers and arrow directions are correct. The revealed diagrams retain their state through the slide map. Both revised slides fit above navigation (booklet cues at 738 and 682 pixels; navigation starts at 880). There are 21 top-level slides, no nested slides, no unrendered mathematics or KaTeX errors, and no foreignObject elements. Example 3.20’s student-facing question is byte-for-byte unchanged. Exact rational arithmetic verified the projection, perpendicular remainder, zero dot product and squared distance 77/6; the calculus expression agrees. Existing hinge and other interactions were unchanged, so their earlier validation still applies. WebKit and physical-iPad checks remain unavailable.


Angled-distance diagram revision: both diagrams now use a 20-degree rising line. All endpoints, direction arrows and right-angle markers undergo the same rigid rotation and translation; mathematical labels remain upright at their transformed anchors. The perpendicularity slide now explicitly says to use the non-zero direction vector d. Its notes explain that (u−td)·(td)=0 is equivalent only when t≠0; otherwise it includes the automatic zero-vector solution t=0. For Example 3.20 this gives t(2−24t)=0, so t=0 must not be accepted as the closest point.

Angled-diagram validation: Chromium at 1363×936 reviewed all five diagram states, upright labels, accurate right-angle markers, diagram state retention through the slide map and complete forward/backward navigation through 21 slides. No unrendered mathematics, KaTeX errors or foreignObject elements. The expanded perpendicularity slide fits above navigation. A numerical geometry check confirmed that the rigid rotation preserves dot products and lengths. WebKit and physical-iPad testing remain unavailable.


## Lesson 6 — Vector equations of circles

Coverage: booklet §3.5, Examples 3.21–3.23, printed pages 69–73; Homework 6. A single approximately 50-minute lesson. Spheres are reserved for Lesson 7. Students already know parametric equations and position vectors. The objective is “We are learning to describe circles using vector equations.” The success criterion is “I can identify a circle and describe how it is traced from its vector equation.”

### Sequence and delivery

1–3: cover, objective/success criteria, and a line-to-circle recap. The unit graphic appears on the cover only.
4–6: connect x=R cos θ, y=R sin θ to r(θ); construct the translated circle; compare cos/sin and sin/cos tracing.
7: diagnostic hinge. 8–9: Example 3.21 split into its original parts (a) and (b).
10–12: fixed-distance form, Example 3.22(a–b), and Example 3.23.
13–15: one-minute partner prompt on reversing tracing, connected representations, and Homework 6.

Suggested pacing: 15 minutes for recap and concepts, 3 for hinge, 10 for Example 3.21, 17 for fixed-distance form and Examples 3.22–3.23, 5 for consolidation and homework. Worked solutions are in presenter notes; use OneNote for class working. Additional comparison and partner questions are explicitly distinguished from booklet examples. No named thinking routine is forced into the lesson.

The first circle visual starts with axes and a circle: Show point reveals the amber point and its coordinates, then Show position vector adds the blue arrow from O. Its parameter label r(θ) is below the graph. Quarter-turn buttons and a continuous angle slider support prediction before changing the point. Reset restores θ=0 and hides both reveals.

The translated-circle visual uses C=(2,−1), R=3, initially θ=π/3. Reveal OC=c in teal, then CP in gold, then OP=r in blue. Previous reverses these stages; Reset hides all arrows and restores the initial angle. At the final stage, move the angle to see r point to every point of the circle. The equal-scale graph and labels use native SVG paths, with no foreignObject. Point coordinates remain amber and the position-vector caption remains blue.

The tracing visual compares r(t)=3cos(t)i+3sin(t)j with r(t)=3sin(t)i+3cos(t)j. Choose an equation, predict the start, then reveal the start and successive quarter-turn points. Switching equations resets the prediction; a completed turn lists five parameter values including the repeated endpoint. The route traces anticlockwise for cos/sin and clockwise for sin/cos. The fixed-distance visual keeps |CP|=3 while |OP| varies, making the distinction between r and r−c visible.

### Answers and mathematical checks

- Example 3.21(a): x=cos t−sin t, y=2−cos t−sin t. Squaring and adding gives x²+(y−2)²=2, centre (0,2), radius √2. Alternatively eliminate cos t and sin t using the Pythagorean identity. A general c+a cos t+b sin t is not necessarily a circle; here a,b have equal length and are perpendicular.
- Example 3.21(b): t=0,π/2,π,3π/2,2π give (1,1),(−1,1),(−1,3),(1,3),(1,1). This is clockwise about (0,2).
- Example 3.22: (x−x₀)²+(y−y₀)²=λ², with λ>0. Sketch centre (x₀,y₀), radius λ. The source’s p denotes the fixed centre position vector and is preserved.
- Example 3.23: centre (3,4), radius 5, Cartesian equation (x−3)²+(y−4)²=25. Extreme points (−2,4),(8,4),(3,−1),(3,9). Optional axis intercepts (0,0),(6,0),(0,8).
- Partner prompt: replacing t by −t gives r(t)=(3+5cos t)i+(4−5sin t)j, with 0≤t≤2π, tracing the same circle clockwise. Its start is (8,4), followed by (3,−1) at t=π/2. Other valid clockwise parameterisations can have a different start.
- The fixed-distance and Cartesian forms specify a locus. The parameterised form additionally specifies its tracing. Use R for a positive scalar radius and r for the position vector.

### Hinge

Given r(t)=(2+3sin t)i+(−1+3cos t)j, 0≤t≤2π: where does it start and in which direction is it traced as t increases?
1. (5,−1), anticlockwise. 2. (2,2), anticlockwise. 3. (2,2), clockwise. 4. (5,−1), clockwise.
Correct answer 3: t=0 gives the top point (2,2); t=π/2 gives the rightmost point (5,−1). Distractor 1 assumes the usual cos/sin order; 2 assumes increasing t always means anticlockwise; 4 finds the direction but the wrong start. Ready: Example 3.21. Divided: compare t=0 and t=π/2 and revote. Needs explanation: revisit the swapped-order visual.

Everyone answers simultaneously with 1–4 fingers: “Fist on chest. Think quietly. On ‘show’, hold up 1–4 fingers.” Default adjustable timer 60 seconds; Start/Pause/Resume, Reset and separate teacher answer reveal. Expiry must not reveal the answer.

### Homework 6

Cambridge Year 12 Extension 2; copied unchanged from booklet p. 73.
- Mild: 4D Q1, Q3(a), Q5(a), Q10.
- Medium: 4D Q1, Q3(a), Q4, Q5(a), Q9, Q10, Q16.
- Spicy: 4D Q1, Q5(a), Q9, Q10, Q16; 4E Q15.

### Preview and publishing

Render courses/year-12-mathematics-extension-2/further-work-with-vectors/lessons/lesson-6.qmd. The topic lists six lessons and Homework 1–6. Source is pushed to main; run the manual Publish Quarto lessons workflow to update GitHub Pages. Existing lesson URLs are retained.


### Lesson 6 validation

Quarto 1.10.18 rendered the 15-slide lesson and topic/course/home listings. Chromium at 1363×936 passed complete forward and backward navigation through every slide. Course → topic → Lesson 6 and the return link work; the topic lists six lessons. No nested slides, unrendered data-math, KaTeX errors or foreignObject elements were found.

Reviewed all slides, the separate point/vector reveals, all translated-circle construction stages, both tracing sequences through a complete turn, and fixed-distance readouts. Checked quarter-turn presets, continuous slider movement, Previous, Reset and state retention through the slide map. Captions distinguish blue r from the amber point; approximate vector coordinates use ≈. Native SVG labels share the diagram coordinate system. Diagram axis units are equal. The final construction’s booklet cue ends at 830 pixels, above navigation at 880 pixels.

The hinge starts at 60 seconds. Changing to 30 seconds, Start/Pause/Resume, expiry without revealing the answer, deliberate answer reveal, wrong/correct option highlighting and Reset passed. Correct option 3 and all misconception notes were reviewed. Exact symbolic checks verified Example 3.21’s Cartesian equation and quarter-turn points, the general fixed-distance equation, and the reverse-tracing circle. Homework matches the supplied booklet allocation.

Buttons are at least 46 CSS pixels high and require no hover. WebKit, touch-device emulation, iPad viewport/orientation controls and physical-iPad testing are unavailable here; those checks remain outstanding. The existing preview-server script closing-tag workaround was applied only to generated HTML, not tracked source. Source publication and the manual Pages deployment are separate.


## Lesson 7 — Spheres and applications

Approved coverage: §3.6, Examples 3.24–3.31, every subpart in original order, printed pp. 74–82; Homework 7. One 21-slide deck. Approximately 65–75 minutes for all class working, with a natural stopping point after Example 3.28 if used across two periods. No homework split is imposed. Source wording, numerical values, labels and notation are preserved. Students have completed the circle lesson and already know scalar products, parametric equations and vector lines.

Objective: We are learning to use vector equations of spheres to solve geometric problems.
Success criterion: I can use a sphere’s equation to find its centre, radius and intersections.

### Sequence and teaching approach

1–4: cover, objective, fixed-distance recap and extension from a circle to a sphere.
5–7: Examples 3.24–3.25 and the hinge.
8–10: plane–sphere cross-section visual, then Example 3.26 split into parts (a) and (b).
11–13: Example 3.27, inside/on/outside comparison, Example 3.28.
14–15: angled line–sphere intersection visual and Example 3.29.
16–19: staged diameter interpretation, Example 3.30 split into (a) and (b), Example 3.31.
20–21: connected representations, Homework 7.

Keep full working in OneNote; solutions and prompts are in presenter notes. Supporting visuals are short prediction/discussion opportunities, not additional named thinking routines. R is a positive scalar radius and r a position vector. The sphere equation is a surface condition; its interior satisfies an inequality.

### Visuals and controls

Circle and sphere introduction: the same fixed-distance geometry with blue OP, teal OC and gold CP. No free rotation. Native SVG mathematical labels remain in the same coordinate system as the geometry. The sphere silhouette is circular under a true orthographic projection; hidden equator arcs are dashed.

Plane–sphere visual: begin with x²+y²+z²=9 and substitute a selected z-value. Left: fixed orthographic view; right: face-on view in that plane at the same unit scale. Presets z=0,1,2,3,4, continuous slider −4≤z≤4 and Reset to z=0. The Cartesian substitution and simplified equation update automatically and remain visible. For z=2, show x²+y²+(2)²=9 ⇒ x²+y²=5: a circle in the plane z=2. For z=−2 the size is the same but the plane differs. For z=3, x²+y²=0 gives only (0,0,3); for z=4, x²+y²=−7 has no real solutions. Ask students to predict the equation before selecting another z-value. No auxiliary radius formula or reveal button is used. Keep the plane condition with each circle equation; the right-hand view is only the xy-plane when z=0.

Example 3.26 diagram: spheres of radii 3 and 4 with centres at z=0 and z=4, shown transparently, sharing a highlighted horizontal circle. No numerical solution is revealed in the diagram. Students must retain z=9/8 alongside x²+y²=495/64; omitting the plane condition describes a cylinder in 3D.

Inside/on/outside diagram: a central cross-section with three points, compared by squared distances. In Example 3.28 the given point C is not the centre, so avoid reusing C for the centre in the working.

Line–sphere visual: central plane containing the whole line and the centre, radius 3, line angle 25°. Slider 0≤D≤4 sets perpendicular distance, with presets 0,2,3,4 and Reset to D=2. Correct right-angle marker. Two intersections for D<R, tangency for D=R, none for D>R. Connect these to positive/zero/negative quadratic discriminant and two/one/no real parameter values. Tangency has one repeated root and one point. This recalls minimum distance without reteaching projection.

Diameter visual: first a right-angle triangle on the circle with diameter AB, then circles in different planes through AB forming a sphere. Reveal sphere, Previous and Reset. The centre is (a+b)/2; radius |b−a|/2. For P=A or P=B, the dot product is still zero but the angle is undefined; the endpoints remain part of the locus.

### Mathematical answers

- 3.24: (x−x₀)²+(y−y₀)²+(z−z₀)²=λ², centre (x₀,y₀,z₀), radius λ>0.
- 3.25: (x+3)²+(y−2)²+(z+1)²=8, centre (−3,2,−1), radius 2√2.
- 3.26(a): subtract to obtain −8z+16=7, so z=9/8. (b): x²+y²=495/64 AND z=9/8, centre (0,0,9/8), radius 3√55/8.
- 3.27: (x−1)²+(y−1)²+(z+1)²=20, centre (1,1,−1), radius 2√5.
- 3.28: centre (1,−2,3), radius 3. Squared distances are 3,9,16 for A,B,C: inside, on, outside respectively.
- 3.29: substitution gives 9(λ+1)²=36, so λ=1 or −3; points (7,0,−5),(−1,4,3). Suggested, not official, marks: 1 substitution, 1 both parameter values, 1 both points. This particular line passes through the centre (λ=−1), so its intersections form a diameter.
- 3.30(a): (x−1)(x−3)+(y−2)(y+1)+(z−3)(z+3)=0 becomes (x−2)²+(y−1/2)²+z²=49/4. Centre (2,1/2,0), radius 7/2. (b): diameter AB, midpoint (2,1/2,0), |AB|=7, radius 7/2; use the diameter theorem in the plane APB and allow that plane to vary. Include A,B via zero-vector cases.
- 3.31: diameter endpoints (1,1,−1),(3,−1,−5), centre (2,0,−3), radius √6. Cartesian form (x−2)²+y²+(z+3)²=6.

### Hinge

For a variable 3D position vector r, (r−c)·(r−c)=16 with c=(1,−2,3). Choices: 1 sphere centre (1,−2,3), radius 4; 2 same centre, radius 16; 3 centre (−1,2,−3), radius 4; 4 all points inside or on the sphere centre (1,−2,3), radius 4. Correct answer 1. Distractors confuse radius squared with radius, reverse the centre signs, and mistake equality for inequality. Ready: cross-sections. Divided: rewrite as |r−c|²=16 and revote. Needs explanation: compare points at distances 3,4,5 from the centre. Shared 1–4 fingers routine, 60-second adjustable timer, Start/Pause/Resume, Reset and separate teacher-controlled answer reveal; expiry does not reveal.

### Homework 7

Cambridge Year 12 Extension 2, Exercise 4D, copied unchanged from booklet p. 82.
- Mild: Q2, Q3(b), Q5(b), Q7, Q8, Q12, Q13.
- Medium: Q2, Q3(b), Q5(b), Q6–8, Q11–14.
- Spicy: Q5(b), Q7, Q8, Q11–15, Q17.

### Preview and publishing

Render courses/year-12-mathematics-extension-2/further-work-with-vectors/lessons/lesson-7.qmd. The topic lists seven lessons and Homework 1–7. Commit source to main; the manual Publish Quarto lessons workflow updates GitHub Pages. Existing URLs are retained.


### Lesson 7 validation

Quarto 1.10.18 rendered the 21-slide lesson and topic/course/home listings. Chromium at 1363×936 passed complete forward and backward navigation through all slides. Course → topic → Lesson 7 and the return link work; the topic lists seven lessons. There are no nested slides, unrendered data-math elements, KaTeX errors or foreignObject elements.

Reviewed every slide, the circle/sphere vector diagrams, all plane-section cases (including negative heights), both diameter stages, and secant/tangent/exterior line states. Presets, continuous slider changes, Previous, Reset and diameter reveals work. The slice state survives opening the slide map and returning; native SVG labels remain attached in map previews. The final hinge cue ends at 854 pixels, above navigation at 880 pixels. The revised cross-section layout is checked separately below.

The hinge defaults to 60 seconds. Duration adjustment to 30 seconds, Start/Pause/Resume, expiry with the answer still hidden, deliberate answer reveal, wrong-option feedback and Reset passed. Correct option 1 and the three misconception checks were reviewed. Exact symbolic calculations verified the sphere completions, the two-sphere intersection plane and circle, both line–sphere intersection points, both diameter forms and the orthographic projection basis. All eight booklet examples, subparts and Homework 7 allocations were checked.

Controls require no hover, and new buttons have a 48 CSS-pixel minimum height. WebKit, touch emulation, iPad landscape/orientation controls and physical-iPad testing are unavailable here; those checks remain outstanding. The existing preview-server script closing-tag workaround was applied only to generated HTML, not tracked source. Source publication and the manual Pages deployment remain separate.


### Cartesian cross-section revision

Replaced the auxiliary radius relationship with direct substitution into x²+y²+z²=9. The selected z-value, substituted equation, simplified equation and plane interpretation are always visible. Removed the relationship reveal and the ρ diagram label; added a z=1 preset. Decimal slider values retain up to four places in 9−z² so displayed equalities stay exact.

Quarto render and Chromium checks passed for presets 0,1,2,3,4, negative z=−2, decimal z=1.95, Reset and state retention through the slide map. Circle, tangent and no-intersection diagrams match the equations. Full forward/backward navigation still visits 21 slides; no nested slides, KaTeX errors, unrendered data-math or foreignObject elements. At 1363×936 the revised booklet cue ends at 842 pixels, above navigation at 880. WebKit and physical-iPad checks remain unavailable.
