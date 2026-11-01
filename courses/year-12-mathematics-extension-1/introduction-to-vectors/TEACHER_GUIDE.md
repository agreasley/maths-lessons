# Introduction to Vectors

## Sequence and sources

This topic follows the user's revised seven-deck sequence. Original program Lessons 1 and 2 remain combined in Lesson 1. Booklet Section 3 is now split: Lesson 2 ends at Example 3.7, and Lesson 3 covers position vectors. Lessons 1–6 have been built. Lesson 4 is planned as one 50-minute teaching period, as explicitly requested.

| Revised lesson | Booklet coverage | Homework |
|---|---|---|
| 1. Vector meaning and geometric operations | Sections 1–2; Examples 1.1–1.3 and 2.1–2.4 | 1 |
| 2. Coordinates and components | Sections 3.1–3.3; Examples 3.1–3.7 | 2, first part |
| 3. Position vectors and vectors between points | Section 3.4; Examples 3.8–3.11 | 2, remaining questions |
| 4. Magnitude, distance, midpoints, unit vectors and algebraic scalar product | Section 4; Examples 4.1–4.14 | 3 |
| 5. Geometric scalar product and magnitude | Section 5; Examples 5.1–5.4 | 4 |
| 6. Angles, perpendicularity and parallelism | Section 6; Examples 6.1–6.15 | 5 |
| 7. Projections and perpendicular components | Section 7; Examples 7.1–7.10 | 6 |

Primary source: *12MAX1 – Introduction to Vectors.pdf*, supplied 24 October 2026, printed pp. 1–13 for this lesson. Program: *Program.pdf*, Introduction to Vectors [E1], original Lessons 1–2. Textbook: *Cambridge Mathematics Extension 1 Year 12*, Second Edition, Chapter 9, especially 9A. Older slide sources inform the explanations: *What are vectors*, *Vectors in 2D* and the applicable spatial representations in *Vectors in 3D*. The booklet controls scope, wording and examples. Mathematical derivations and short applications remain in scope; standalone advanced geometric-proof lessons, vector equations and motion applications belong to later work.

The cover and Key Ideas use precise vector diagrams with rendered mathematical labels. The five SVGs in `media/` are exact diagram crops from the supplied booklet, with fonts converted to paths. They contain the diagrams only. The supporting parallelogram for Example 2.1 is new, and is labelled as such on the slide. The same original prism diagram appears on both slides of Example 2.4, preserving the context when its subparts are split.

## Lesson 1 pacing

Plan for roughly 70–90 minutes in total, depending on discussion and student working time. Use two teaching periods if needed. Keep the first hook to 4–5 minutes and give students time to reason before each reveal. Slides are separated for readability, not to prescribe a minute count per slide.

- Cover with a vector-addition diagram, signed 1D motion, a turn in 2D, then objective.
- Vector meaning and notation, translated equal vectors, opposite/zero/unit vectors, Examples 1.1–1.3.
- Triangle/parallelogram addition, Example 2.1, subtraction, Example 2.2 and hinge.
- Closed paths and scalar multiplication, then Examples 2.3–2.4, the illustrated Key Ideas summary and Homework 1.

A natural stopping point is **after Scaling and parallel vectors**, before Example 2.3. If continuing next period, retrieve what reversal and a negative multiplier mean, trace A→O→B again, and ask students to predict the result with A and B interchanged. This can be done on the existing hinge slide using Reset; collect a fresh explanation. Then proceed to the midpoint/path applications. Keep a single lesson deck and retain the full homework selection. Lessons 2 and 7 may each need two teaching periods. Lesson 6 is explicitly one 50-minute period, with examples selected during teaching; all worked examples remain in the deck.

## Hook and the purpose of the unit

Students have already used a chosen positive direction and signed numbers in 1D motion. Build on that fact, rather than treating vector direction as entirely new.

1. Five metres right then two metres left gives displacement +3 metres; distance travelled is 7 metres.
2. Five metres east then two metres north still gives distance 7 metres, but that alone does not specify the endpoint. No magnitude or angle calculation is needed. If asked, the displacement has magnitude √29 metres and direction arctan(2/5) north of east.

Suggested framing: Familiar geometry remains useful. Algebra helps us reason without knowing particular numbers; vectors let us work with magnitude and direction without needing every length or angle. One symbol can represent a whole movement. The same reasoning works in two dimensions and three dimensions.

This is a short predict–explain activity, not a named Project Zero routine. No external applet or network connection is required by the lesson. Use the shared mathematical renderer for all vector labels and dynamic expressions.

## Subtraction demonstration and summary

Start with a and b at a common tail. Show −b to retain b as a dotted reference and draw its opposite. Use the placement slider to translate −b until its tail reaches the head of a; the Move head to tail button also completes this movement. The difference can be revealed only once the vectors are head to tail. Moving away from that position hides the result. Swap order begins a fresh construction of b−a and changes the displayed equation; Reset returns to a−b.

Reveal resultant in the addition activity is neutral while hidden and green only while the resultant is visible. The closing Key Ideas diagrams show head-to-tail addition, equal-length reversal, and subtraction as addition of the opposite. Complete the corresponding booklet boxes after discussion.

## Worked checks

Use the booklet's undertilde notation in handwritten examples. The slides also introduce equivalent bold notation.

- **1.1:** The original grid arrow goes three squares right and two up. Draw two translates with different tails.
- **1.2(a):** Any length-one arrow; one grid edge is a simple choice. A square's diagonal has length √2 and is not a unit vector. **(b):** Three squares left and two down.
- **1.3:** In spatial small-edge units, the given arrow moves one unit in each horizontal direction and two units up. A translated copy can start at the front bottom edge midpoint and finish at the top right edge midpoint. Reverse the original for −a. Any one small edge is a unit vector. Perspective screen lengths are not spatial measurements.
- **2.1:** DA=−b; AC=a+b; BD=b−a, using B→A→D.
- **2.2:** b−a=−r. The two differences have opposite directions. The special case a=b gives zero for both, without making subtraction commutative in general.
- **2.3(a):** BC=−a+b+c. **(b):** BM=(−a+b+c)/2. **(c):** AM=(a+b+c)/2. Do not assume the quadrilateral is a parallelogram.
- **2.4(a):** AF=a+c; FM=b/2. **(b):** AM=a+b/2+c. **(c):** CM=c−b/2; NM=a. **(d):** NM and AB are equal directed vectors; the segments are parallel and equal in length, with the named directions agreeing. Trace N→E→F→M to explain why the opposite half-edge vectors cancel.

## Hinge and response routine

Additional diagnostic: OA=a, OB=b; find AB. Choices 1 a+b; 2 a−b; 3 b−a; 4 −a−b. Correct **3**, since A→O→B gives −a+b.

- 1 adds without attending to the path's directions.
- 2 reverses the required vector and gives BA.
- 4 reverses both vectors instead of just OA.

Use 60 seconds by default, adjustable to 30, 45, 90 or 120. Start/Pause/Resume and Reset are shared controls. Timer expiry does not reveal the answer. Prompt: **Fist on chest. Think quietly. On “show”, hold up 1–4 fingers.** Collect responses simultaneously before deliberately revealing.

Ready: proceed. Divided: explain A→O→B to a partner and revote. Needs explanation: trace the reversed first segment explicitly and retry with the endpoints interchanged. Selecting a choice is a teacher presentation control, not an individual response-collection system.

## Corrections when reusing the old slides

- Scalar quantities may be negative. A real scalar multiplier can be positive, negative or zero.
- The zero vector has magnitude zero and no direction.
- A unit vector has magnitude one; defer the normalising formula to revised Lesson 4.
- Non-zero parallel vectors may have the same or opposite directions. Do not attribute a direction to the zero vector.
- Triangle and parallelogram constructions work in 3D. Non-parallel tail-to-tail vectors determine a plane; parallel vectors do not determine a unique plane.
- The later component-resolution lesson must use |a| cos θ in the x-direction and |a| sin θ in the y-direction when θ is measured from positive x, correcting the old swapped formula.

## Homework 1 (unchanged)

- Mild: Exercise 9A: Q3, Q5, Q6, Q7, Q8–9 (alternate parts).
- Medium: Exercise 9A: Q3–11, Q20(a).
- Spicy: Exercise 9A: Q3–12, Q19–20.

Assign when the relevant operations and path examples have been taught. Source: booklet Homework Summary p. iv and p. 13.

## Preview and publication

From the repository root:

```sh
quarto preview courses/year-12-mathematics-extension-1/introduction-to-vectors/lessons/lesson-1.qmd
```

Render with the repository's pinned Quarto 1.10.18. The shared scripts supply Next/Previous, Slide map, Topic lessons and finger-response icons. The topic-specific scripts and SVGs are embedded in the rendered lesson. Open on iPad in landscape. Dragging has button alternatives and no interaction depends on hover.

Publishing remains the repository's manual GitHub Actions workflow; a source commit or PR does not itself publish the lesson.

## Lesson 2: coordinates and components

Source scope: booklet printed pp. 14–22, Sections 3.1–3.3 and Examples 3.1–3.7. Cambridge Second Edition sections 9B, 9D and 9E provide the component, coordinate and 3D context. The old Vectors in component form and Vectors in 3D slides inform the unit-vector and operation diagrams. The booklet controls example wording, values, order and notation. The right-hand axes image is an exact crop from the supplied booklet. Example 3.2 is recreated at the original coordinates, with reversible reveals of individual signed unit-vector steps head to tail and the component/column answers; all other new diagrams are native mathematical constructions.

Allow approximately 75–90 minutes with student working time. There are 23 slides. The objective follows the cover, then the coordinate introduction; the translated-vector recap is already covered in Lesson 1. Introduce coordinates and coordinate planes, standard unit vectors and equivalent forms, resolve components, and equate corresponding components. A natural period break is after Example 3.4. Continue with component operations and Examples 3.5–3.6, a brief statement of the same component rules in 3D, the hinge, and Example 3.7. The hinge is immediately before Example 3.7, as requested. Position vectors and head-minus-tail are reserved for Lesson 3.

On the coordinate-planes slide, vary both in-plane coordinates while the highlighted missing coordinate stays zero. For example, on the xz-plane, x and z move freely while y=0. The separate Move off the plane slider varies the missing coordinate; return it to zero to put the point back on the plane. Reset and switching planes restore the two in-plane coordinates to 2, set the offset to zero and hide the equation.

The component operations controls deliberately stage the construction: choose addition or subtraction, show the negative vector when subtracting, move the second vector head to tail, then reveal the calculations. The slider preserves magnitude and direction while translating. The parallelogram view verifies the same result. Moving away from head-to-tail placement hides the answer. Buttons are neutral before a reveal and green only when active. All dragging/translation has button alternatives.

For resolving components, the angle is anticlockwise from positive x. Use x=|a| cos(theta), y=|a| sin(theta), correcting the swapped formula in the old slide source. The diagram keeps equal x/y scales, uses signed components and includes all quadrants. Three-dimensional diagrams use a fixed parallel projection of right-handed perpendicular axes; projected lengths/angles must not be measured as spatial lengths/angles.

### Lesson 2 worked checks

- 3.1: a) xy; b) xz; c) yz; d) xz and yz; e) all three; f) none.
- 3.2: a=(1,2), b=(-5,-1), c=(-1,3). In the original diagram, b points from (2,-2) to (-3,-3). Count displacement from each arrow's own tail.
- 3.3: a=6cos(150°)i+6sin(150°)j=-3sqrt(3)i+3j, approximately -5.20i+3.00j.
- 3.4: 3m+1=7 and 4n-9=-5, so m=2, n=1.
- 3.5: a) (2,-3); b) (-12,18), both as columns.
- 3.6: a) -2i-3j; b) -4i+7j; c) -25i+34j; d) 12i-16j.
- 3.7: a) 2j+3k; b) 6i-k; c) 8i-4j+16k; d) 5i-9j+9k. Retain mixed representations in the question and component-form final answers, as requested in the booklet.

### Lesson 2 hinge

Given a=(2,-1,3), b=(-1,4,2), find 2a-b. Correct choice 3: (5,-6,4).

1. (3,2,8) computes 2a+b.
2. (5,2,4) adds the y-components instead of subtracting: -2+4 instead of -2-4.
3. (5,-6,4) is correct.
4. (3,-5,1) computes a-b, omitting the factor 2.

Use the shared 60-second timer, adjustable duration, manual reveal and simultaneous 1–4 finger responses. Ready: move to 3.7. Divided: compare one component with a partner and revote. Needs explanation: write 2a=(4,-2,6), bracket the subtracted components, and explain the middle calculation before retrying. No automatic reveal at expiry; timers pause when leaving the slide or entering the slide map.

### Homework 2 split across Lessons 2 and 3

The combined allocation is unchanged from booklet p. 25 and the Homework Summary. No questions are added or dropped. Cambridge was checked before making this split: 9B Q4 explicitly asks for position-vector sketches, 9B Q7 and 9E Q1/5/6/12 use position vectors, 9D Q4 applies coordinate transformations, 9D Q5(a) reads cube coordinates, and 9E Q7 equates components.

| Level | After Lesson 2 | Reserve for Lesson 3 |
|---|---|---|
| Mild | 9B Q2(a,c,e); 9D Q1–2; 9E Q4(a,c) | 9B Q4,Q7; 9E Q1,Q5(a,b) |
| Medium | 9B Q2(a,c,e),Q3(a,c); 9D Q1–3; 9E Q4(a,c) | 9B Q4,Q7; 9D Q4(a–h); 9E Q1,Q5(a,b),Q6(a,b) |
| Spicy | 9B Q2(a,c,e),Q3(a,c); 9D Q1–3,Q5(a); 9E Q4(a,c),Q7 | 9B Q4,Q7; 9D Q4; 9E Q1,Q5(a,b),Q6(a,b),Q12 |

Preview Lesson 2 with `quarto preview courses/year-12-mathematics-extension-1/introduction-to-vectors/lessons/lesson-2.qmd`. Lesson-specific assets are components.js and components.css; shared navigation, finger-response icons and timers are unchanged.


## Lesson 3: position vectors

Allow 40–55 minutes for 13 slides, including independent work. Begin with component subtraction, distinguish a point from its position vector, and derive head minus tail using the path through the origin (Example 3.8). Use the movable-endpoint demonstration before the timed hinge. The hinge is immediately before Example 3.9. Keep the position-vector demonstration in 2D. Extend head minus tail to 3D using the component formula, without a spatial applet. Examples 3.10 and 3.11 are question-only slides for working in OneNote; their answers remain in presenter notes.

Hinge: A(2,−1), B(−3,4). Correct choice 3 is (−5,5). Choice 1 adds the positions; choice 2 reverses the direction; choice 4 uses B alone. Use the shared simultaneous finger-response routine and manual reveal. If divided, trace A → O → B; if secure, proceed to Example 3.9.

Worked checks: Example 3.8 AB=b−a; Example 3.9 (−4,−6); Example 3.10 endpoint (−1,8); Example 3.11 (4,2,0). In Example 3.11 the segment lies at z=8 and is parallel to the xy-plane, not in that plane. Justify parallelism from the zero vertical component.

Finish with the illustrated Key Ideas and the remaining Homework 2 selections shown in the deck. Magnitude, midpoint and normalisation remain in Lesson 4. Assets: positions.js and positions.css.


### Browser compatibility of vector diagrams

Diagram labels and tick values are rendered as native SVG paths using the locally bundled MathJax SVG component. This avoids Safari/WebKit's HTML-in-SVG (`foreignObject`) positioning issues when Reveal scales slides or a vector group is translated. KaTeX still renders the ordinary slide text and controls. Keep label placement in the diagram's SVG coordinates, and test in WebKit as well as Chromium; changing the viewport size in Chromium alone does not check iPad browser behaviour. The SVG helper also supports slide-map clones and offline presentation without a CDN.


## Lesson 4: magnitude and scalar product

One **50-minute lesson**, with 22 slides and no planned period break. Preserve the booklet's Sections 4.1–4.5, Examples 4.1–4.14, question wording and order (printed pp. 26–35). Use concise explanations and booklet working, with manually revealed solutions. Suggested allocation: opening and magnitude 8 minutes; distance 5; midpoints and ratio 8; unit vectors, hinge and applications 15; algebraic scalar product 11; Key Ideas and homework 3. The user explicitly corrected the earlier two-period estimate; do not reintroduce it.

The magnitude diagrams are static. First establish d²=x²+y² in 2D; then reuse the same teal diagonal as the base OQ in 3D. Q=(x,y,0) lies below P=(x,y,z). QP has length |z| and is perpendicular to the xy-plane, so |a|²=d²+z²=x²+y²+z². Labels are native SVG paths. Do not replace this sequence with an unrelated numerical 3D example or an interactive 3D construction.

The midpoint demonstration moves B while M remains (A+B)/2; Reset restores the initial diagram. The unit-vector demonstration compares a=(4,−3) with a/5: the original becomes dotted while the length-one vector is drawn in the same direction. Dot-product controls match component colours in 2D/3D and reveal the sum to a scalar. Initial answer panels and the hinge explanation remain hidden. All controls work with touch.

### Lesson 4 worked checks

- 4.1: |a|=sqrt(x²+y²+z²), obtained from the 2D base length.
- 4.2: a) 5; b) sqrt(38); c) 4; d) sqrt(5).
- 4.3: AB=b−a; its magnitude is sqrt((x2−x1)²+(y2−y1)²+(z2−z1)²). In 2D omit the z term.
- 4.4: AB vector=(6,−4,5); distance sqrt(77).
- 4.5: OM=a+(b−a)/2=(a+b)/2; average corresponding coordinates.
- 4.6: M=(2,1,7).
- 4.7: AP=(3,−2), AB=3AP=(9,−6), B=(7,−3). AP is one third of AB.
- 4.8: a) (4/5,−3/5); b) (−5/sqrt(89),8/sqrt(89)).
- 4.9: (1,2,3)/sqrt(14), expressed in i,j,k component form.
- 4.10: |a|=10; b=5(a/10)=(3,−4).
- 4.11: e=(−2,0,−2); unit a=(1,3,4)/sqrt(26); unit b=(−1,3,2)/sqrt(14); unit e=(−1,0,−1)/sqrt(2).
- 4.12: a) 11; b) −20; c) 0.
- 4.13: a) 7; b) 7; c) (3,2,−1)/sqrt(14); d) 7/sqrt(14)=sqrt(14)/2.
- 4.14: (i) 7i (vector); (ii) 5 (scalar). Booklet attribution: HSC 2024 Extension 1 Q11(a), 2 marks.

### Lesson 4 hinge and homework

The hinge is immediately **after Example 4.9 and before Example 4.10**. Given a=(2,−1,2), identify the unit vector in the same direction. Correct **3**, (2/3,−1/3,2/3). Choice 1 leaves magnitude 3; choice 2 divides by 9, giving magnitude 1/3; choice 4 gives a unit vector in the opposite direction. Keep the default 60-second timer, adjustable duration, 1–4 finger routine and separate manual reveal. If divided, check magnitude and direction separately before a revote. Proceed to 4.10 when secure.

Homework 3 is retained except the planning adjustment: defer **9C Q6** (Spicy) and **9F Q3** (Medium/Spicy) until Lesson 5. These already appear in Homework 4, so nothing is removed from unit coverage. Cambridge confirms these questions explicitly connect the self-dot product with magnitude. All other Homework 3 questions remain as in the booklet. Reserve the geometric dot-product expression, angles/perpendicularity interpretations and formal self-dot magnitude identity for the following lessons.

Preview with `quarto preview courses/year-12-mathematics-extension-1/introduction-to-vectors/lessons/lesson-4.qmd`. Assets: magnitudes.js and magnitudes.css, reusing the shared navigation, reveal panels, timer and native SVG maths renderer.

Validation: rendered all 22 slides and checked complete Next/Previous navigation, initial/revealed answers, midpoint motion/reset, unit-vector comparison/reset, 2D/3D dot-product controls, hinge timer expiry/manual reveal/reset and slide-map state in Chromium and WebKit. Tested touch at 1024×768 and 1194×834, with portrait rotation and return. SVG label offsets matched between engines; no external network requests, unrendered mathematics, JavaScript errors or slide-content overflow. Screenshot review included both proofs, midpoint, the 3D combined example, unit vectors and illustrated Key Ideas. These are desktop browser-engine checks, not a physical-iPad test.


## Lesson 5: geometric scalar product and magnitude

One 50-minute lesson, 19 slides. Preserve Section 5, Examples 5.1–5.4 and their subparts (printed pp. 36–40). The angle between non-zero vectors is explicitly defined before Example 5.1: translate them to a common tail without turning or rescaling, then measure the smaller angle in [0°,180°]. Example 5.1 is split across (a–b) and (c), with complete working visible under each scaffolded part. Part (c) shows both full expressions for AB² equated, followed by separate equations after subtracting |a|²+|b|², dividing by −2, and dividing by |a||b|. The two calculation methods are first compared in 2D according to the given information. The components method appears initially; the first Next click reveals the lengths-and-angle method and the reflex-angle note, and the second reveals a·b=a_x b_x+a_y b_y=|a||b| cos θ and “Both calculate the same scalar (dot) product”. The next slide extends the methods to 3D, followed by the supplied formula-sheet excerpt. The diagnostic hinge goes immediately AFTER Example 5.2, as explicitly requested: students practise using the geometric formula before the check. Example 5.3 then proves the magnitude identity using components; a following slide relates it to angle zero. A further slide uses |a|²=a·a and expands |b−a|²=(b−a)·(b−a), emphasising the use of scalar-product algebra to remove magnitude signs. Its visible note states that the expansion uses the distributive property, which students have not yet studied and will cover in Extension 2. Example 5.4 collects the special cases, with individual manual answer reveals. A second timed hinge follows immediately after Example 5.4. The success criterion concerns identifying the same direction, opposite directions and perpendicularity from the scalar product and magnitudes. Positive/negative signs alone do not establish parallelism.

The original figures for 5.1 and 5.2 are exact booklet crops with font glyphs converted to SVG paths. A new static, colour-coded triangle supports the cosine-rule derivation. Prove the 3D equivalence by including the extra z-term in the component expansion, using the same cosine-rule triangle in the plane of the two vectors. Do not add a 3D applet.

The 2D activity, “Interpreting the sign of the scalar product”, displays only the scalar result beside the diagram. Its angle and both positive magnitudes are adjustable: θ ranges 0°–180°, and each length ranges 1–5 in half-unit steps. The angle is labelled on the diagram and the length controls show their values. The result updates continuously. Presets are 0°, 90° and 180°; Reset restores |a|=2, |b|=5, θ=60°. Changing either length at a fixed angle changes the size of the result but not its sign. At 90° the result is exactly zero. At 0° the longer vector is drawn first so both arrowheads remain visible. Special-case diagrams use coincident arrows for equal vectors. All mathematical diagram labels use the shared native SVG renderer.

Worked checks:
- 5.1(a): AB=b−a. (b): |OA|=sqrt(a_x²+a_y²), |OB|=sqrt(b_x²+b_y²), |AB|=sqrt((b_x−a_x)²+(b_y−a_y)²). (c): Equate the component expansion of AB² to |a|²+|b|²−2|a||b|cos θ and cancel; cos θ=(a_x b_x+a_y b_y)/(|a||b|).
- 5.2: (a) 30 cos 40° ≈ 22.98; (b) 30 cos 140° ≈ −22.98. Both given angles are already tail-to-tail.
- 5.3: a·a=x²+y²+z²=|a|². This includes the zero vector; its angle is not defined.
- 5.4: (a) |a||b|; (b) −|a||b|; (c) 0; (d) |a|². Non-zero vectors have angles 0°, 180°, 90° and 0° respectively.

First hinge (after Example 5.2): magnitudes 3 and 4 with tail-to-tail angle 120°. Correct choice 2 is −6. Choice 1 gives 6 by dropping the negative sign or using the supplementary angle; choice 3 gives 12 by omitting cosine; choice 4 gives 6sqrt(3) by using sine. Use 60 seconds, adjustable, with simultaneous 1–4 fingers and a manual answer reveal. Ready: proceed to 5.3. Divided: predict the sign and revote. Needs explanation: revisit the angle activity at 90° and beyond, then reconnect to the cosine factor.

Second hinge (after Example 5.4): a·b=6, |a|=3, |b|=4. Choices: 1 same direction, 2 opposite directions, 3 perpendicular, 4 neither parallel nor perpendicular. Correct 4 because 6 is none of the special values 12,−12,0. Choice 1 diagnoses the misconception that a positive product establishes the same direction. Choices 2 and 3 require −12 and 0 respectively. Keep the adjustable 60-second timer, simultaneous finger response and separate manual reveal. Ready: Key Ideas. Divided: compare the three special values and revote. Needs explanation: revisit the sign activity at 60° and 0° with lengths 2 and 5. No inverse-cosine calculation is needed.

Angle convention: when asked to state the angle between non-zero vectors, report the smaller tail-to-tail angle in [0°,180°], including in Lesson 6. The geometric scalar-product formula still works with the other angle 360°−θ because cos(360°−θ)=cos θ; for 0°<θ<180° this other angle is reflex. For example cos 300°=cos 60°. Slide 4 defines the reported angle only. The reflex-angle note appears on slide 7 with the first reveal of the lengths-and-angle method, when the cosine formula is introduced.

Homework 4 is unchanged: Mild 9C Q2,Q6; 9F Q3,Q20. Medium 9C Q2,Q6,Q13; 9F Q3,Q20–21. Spicy 9C Q2,Q6,Q13,Q21; 9F Q3,Q20–22. Questions 9C Q6 and 9F Q3 deferred from Lesson 4 are included. The homework slide has only the heading, assignment table and source reference: no reminders, advice or next-lesson commentary. The allocation is not split across lessons. Keep future homework slides consistent with the repository-wide AGENTS.md rule.

Preview: quarto preview courses/year-12-mathematics-extension-1/introduction-to-vectors/lessons/lesson-5.qmd. Assets: geometric.js, geometric.css, the two SVG booklet figures and the supplied vector-formula-sheet.png. All five vector covers use vector geometry without the data-chart bar graphic. Lesson 6 retains calculation of unknown angles and solving perpendicularity/parallelism conditions; Lesson 7 retains projections.

Prior full-content validation: rendered all 18 slides and checked full Next/Previous navigation, scaffolded proof visibility, the formula-sheet image, individual answer reveals, the hinge immediately after Example 5.2, and assignment-only homework. Chromium and WebKit both passed touch checks at 1024×768 and 1194×834, portrait rotation and return, slide-map state, and timer pause/expiry/manual reveal. Tested angles 0°,30°,60°,90°,120°,150°,180° with lengths (2,5), (5,1), (1,5), (3.5,2.5), plus presets and reset. No JavaScript errors, external network requests, unrendered mathematics, SVG label drift or content overflow. Reviewed screenshots of the proof, angle definition, calculation methods, formula sheet, magnitude expansion and sign activity in both engines. Lesson 4's cover was also re-rendered and checked. These are browser-engine checks, not a physical-iPad test.

Validation of the 19-slide revision: Chromium and WebKit passed full Next/Previous navigation including both fragment steps, initially hidden/revealed/reversed method panels, slide-map previews and return, portrait rotation, and both independently controlled hinges (60-second default, pause on leaving, timer expiry without reveal, wrong/correct choice mapping and reset). Checked all slides with answers visible at 1024×768 and 1194×834; no overflow, JavaScript errors, unrendered maths or external requests. Reviewed the fully worked Example 5.1(c), both method reveals including the reflex-angle note on slide 7, the Extension 2 distributivity note on slide 15, and the second hinge in both engines. The self-contained download passed both engines. No physical-iPad test.


## Lesson 6: angles, perpendicularity and parallelism

One **50-minute lesson**, 31 slides, covering Section 6, Examples 6.1–6.15 (printed pp. 41–53). The user explicitly requested **no hinge**. Example 6.6 remains an ordinary multiple-choice worked example with no timer, quiz module or simultaneous-response routine. Its original A–D choices appear as 1–4 in the same order; D/4 is correct.

All original examples and subparts are retained, with complete, manually revealed and reversible solutions. The teacher chooses which examples to teach; use the slide map to move past additional applications. Suggested route: selected parts of 6.1, 6.2, 6.4, 6.9, 6.11, selected parts of 6.12 and 6.15. Opening 3 minutes; angles 12; perpendicularity 9; quarter turns 6; parallelism 16; Key Ideas and homework 4. No planned second period or homework split.

Move quickly from the known geometric scalar product to theta=arccos((a·b)/(|a||b|)). Calculate the scalar product, calculate both magnitudes, substitute, then use inverse cosine in degree mode, keeping exact values until the final step. Report the smaller tail-to-tail angle in [0°,180°]. The unit-vector identity cos theta=â·b̂ is justified by applying the geometric formula to two unit vectors: normalising preserves directions and the angle, and both magnitudes are one. Do not assume distributivity or scalar-factor laws, which are studied later in Extension 2.

Recall a·b=0 for perpendicular non-zero vectors rather than reteaching it at length. Example 6.9 explicitly verifies the two quarter turns using component products and magnitudes. The 2D shortcut is (a,b)→(-b,a) or (b,-a), not an unchanged 3D rule. For parallelism, prefer one common scalar multiplier when components are available, and compare the dot product with the full product of magnitudes when those quantities are given. The sign of the dot product alone does not establish parallelism. Example 6.15 revisits exactly the pairs in 6.11 so the methods can be compared.

Diagrams are static and use native SVG mathematical labels. Example 6.3 uses the exact original cube diagram cropped from the booklet, with font glyphs as paths; do not measure spatial angles from its perspective view. The support diagram for 6.8 is a new construction at the given coordinates. There is no 3D interactive or new diagram control. Shared Show/Hide solution controls preserve answers when moving through the slide map.

### Lesson 6 worked checks

- **6.1:** (a) dot 11, magnitudes sqrt(13), sqrt(17), angle approximately 42.27°; (b) dot -20, magnitudes sqrt(10), sqrt(40), angle 180°; (c) dot 0, magnitudes sqrt(13), sqrt(52), angle 90°; (d) dot -1, magnitudes sqrt(2), sqrt(5), angle approximately 108.43°.
- **6.2:** dot -3, both magnitudes sqrt(6), angle 120°.
- **6.3:** (a) CB=i, AB=j, CG=k; (b) OF=i+j+k, OG=j+k; (c) OF=i+j+k, AG=-i+j+k; (d) dot 1, both lengths sqrt(3), angle arccos(1/3) approximately 70.53°. This is already the requested acute intersection angle. Reversing one direction gives 109.47°, whose supplement is 70.53°.
- **6.4:** 2b-3=0, so b=3/2.
- **6.5:** 10-6-4=0, so the two non-zero vectors are perpendicular.
- **6.6:** dot products for original A–D / screen 1–4 are -10, 10, -5, 0. D/4 is correct. No timed hinge.
- **6.7:** 2x-3y+6z=0 and -6x+2y+3z=0. Adding three times the first to the second gives y=3z, then x=3z/2. Write z=2t to get n=t(3,6,2); length 7|t|=1 gives the two unit vectors ±(3,6,2)/7. Verify both dot products vanish. No cross product.
- **6.8:** (a) PQ=(-4,2), RQ=(4,8), dot zero. (b) RP=(8,6), dot with RQ=80, lengths 10 and 4sqrt(5); angle PRQ approximately 26.57°. (c) S=(3,7). (d) QS=(0,-5), RS=(4,3), both length 5. SP=(4,3), SQ=(0,5), dot 15, giving angle PSQ=arccos(3/5), approximately 53.13°. Use vectors starting at the named vertex.
- **6.9:** a(-b)+ba=0 and ab+b(-a)=0; each magnitude is sqrt(a²+b²). The assumed non-zero original vector ensures all three have direction.
- **6.10:** (4,3) and (-4,-3), both perpendicular to (3,-4), all length 5.
- **6.11:** (a) b=3a, same direction; (b) b=-2a, opposite; (c) component multipliers 4/3 and 3/4 disagree, so not parallel.
- **6.12:** (a) multiplier 5/2 gives m=-15/2, same direction; (b) multiplier -1/2 gives m=3/2, opposite direction. Only (a) has the same direction as the original vector.
- **6.13:** AB=(4,8,16), AC=(6,12,24)=(3/2)AB; common point A establishes collinearity.
- **6.14:** (a) distances AB=sqrt(14), BC=3sqrt(14), AC=4sqrt(14), so AB+BC=AC and B lies on segment AC. (b) AB=(1,-3,2), BC=(3,-9,6)=3AB; the consecutive vectors have the same direction, so ABC is straight. AC=4AB is an equivalent vector proof.
- **6.15:** (a) dot 15, magnitude product 15, same direction; (b) dot -18, magnitude product 18, opposite; (c) dot 24, magnitude product 25, not parallel. These agree with 6.11.

Homework 5 is unchanged and is not split. Mild: 9B Q10,Q12; 9C Q3,Q7,Q10(a); 9E Q10; 9F Q1,Q4(c),Q5. Medium: 9B Q10–12; 9C Q3,Q7,Q10–12; 9E Q10; 9F Q1–2,Q4(c),Q5–7,Q17(a). Spicy: 9B Q10–12,Q16; 9C Q3,Q7,Q10–12; 9E Q10; 9F Q1–2,Q4(c),Q5–7,Q17–18. The final slide contains only the assignment heading, table and source reference.

Preview: quarto preview courses/year-12-mathematics-extension-1/introduction-to-vectors/lessons/lesson-6.qmd. Assets: angles.css, angles.js, media/example-6-3.svg, and the existing shared navigation, answer panels and SVG maths renderer.

Validation: rendered all 31 slides without warnings. Chromium and WebKit passed touch checks at 1024×768 and 1194×834, complete Next/Previous navigation, all 29 reversible solution panels, slide-map jumps/state preservation, and portrait rotation and return. Inspected screenshots of the cover, angle formula, unit-vector connection, original cube, longer solutions, quarter turns, parallelism summary and homework. All mathematics rendered; no overflowing slide content, JavaScript errors, SVG foreignObject elements or external network requests. The standalone download passed both engines offline. Arithmetic checks independently verified angles, perpendicular unit vectors, triangle results and scalar multiples. These are browser-engine checks, not a physical-iPad test.
