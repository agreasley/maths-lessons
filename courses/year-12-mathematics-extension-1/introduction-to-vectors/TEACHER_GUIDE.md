# Introduction to Vectors

## Sequence and sources

This topic follows the user's revised seven-deck sequence. Original program Lessons 1 and 2 remain combined in Lesson 1. Booklet Section 3 is now split: Lesson 2 ends at Example 3.7, and Lesson 3 covers position vectors. Lessons 1–3 have been built.

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

A natural stopping point is **after Scaling and parallel vectors**, before Example 2.3. If continuing next period, retrieve what reversal and a negative multiplier mean, trace A→O→B again, and ask students to predict the result with A and B interchanged. This can be done on the existing hinge slide using Reset; collect a fresh explanation. Then proceed to the midpoint/path applications. Keep a single lesson deck and retain the full homework selection. Lessons 2, 4, 6 and 7 may each need two teaching periods; avoid forcing seven decks into seven periods.

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

Allow 40–55 minutes for 13 slides, including independent work. Begin with component subtraction, distinguish a point from its position vector, and derive head minus tail using the path through the origin (Example 3.8). Use the movable-endpoint demonstration before the timed hinge. The hinge is immediately before Example 3.9. If students need more time, break after Example 3.10 and begin the next session with the two 3D slides.

Hinge: A(2,−1), B(−3,4). Correct choice 3 is (−5,5). Choice 1 adds the positions; choice 2 reverses the direction; choice 4 uses B alone. Use the shared simultaneous finger-response routine and manual reveal. If divided, trace A → O → B; if secure, proceed to Example 3.9.

Worked checks: Example 3.8 AB=b−a; Example 3.9 (−4,−6); Example 3.10 endpoint (−1,8); Example 3.11 (4,2,0). In Example 3.11 the segment lies at z=8 and is parallel to the xy-plane, not in that plane. The height slider translates an equal vector down to z=0. Spatial diagrams use a fixed parallel projection; screen lengths and angles are not spatial measurements.

Finish with the illustrated Key Ideas and the remaining Homework 2 selections shown in the deck. Magnitude, midpoint and normalisation remain in Lesson 4. Assets: positions.js and positions.css.
