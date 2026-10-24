# Introduction to Vectors

## Sequence and sources

This topic follows the user's revised six-deck sequence. Original program Lessons 1 and 2 are combined; original Lessons 3–7 become revised Lessons 2–6. Only Lesson 1 has been built.

| Revised lesson | Booklet coverage | Homework |
|---|---|---|
| 1. Vector meaning and geometric operations | Sections 1–2; Examples 1.1–1.3 and 2.1–2.4 | 1 |
| 2. Coordinates, components and position vectors | Section 3; Examples 3.1–3.11 | 2 |
| 3. Magnitude, distance, midpoints, unit vectors and algebraic scalar product | Section 4; Examples 4.1–4.14 | 3 |
| 4. Geometric scalar product and magnitude | Section 5; Examples 5.1–5.4 | 4 |
| 5. Angles, perpendicularity and parallelism | Section 6; Examples 6.1–6.15 | 5 |
| 6. Projections and perpendicular components | Section 7; Examples 7.1–7.10 | 6 |

Primary source: *12MAX1 – Introduction to Vectors.pdf*, supplied 24 October 2026, printed pp. 1–13 for this lesson. Program: *Program.pdf*, Introduction to Vectors [E1], original Lessons 1–2. Textbook: *Cambridge Mathematics Extension 1 Year 12*, Second Edition, Chapter 9, especially 9A. Older slide sources inform the explanations: *What are vectors*, *Vectors in 2D* and the applicable spatial representations in *Vectors in 3D*. The booklet controls scope, wording and examples. Mathematical derivations and short applications remain in scope; standalone advanced geometric-proof lessons, vector equations and motion applications belong to later work.

The five SVGs in `media/` are exact diagram crops from the supplied booklet, with fonts converted to paths. They contain the diagrams only. The supporting parallelogram for Example 2.1 is new, and is labelled as such on the slide. The same original prism diagram appears on both slides of Example 2.4, preserving the context when its subparts are split.

## Lesson 1 pacing

Plan for roughly 70–90 minutes in total, depending on discussion and student working time. Use two teaching periods if needed. Keep the first hook to 4–5 minutes and give students time to reason before each reveal. Slides are separated for readability, not to prescribe a minute count per slide.

- Cover, signed 1D motion, a turn in 2D, unmeasured journey, then objective: this follows the explicitly approved opening order.
- Vector meaning and notation, translated equal vectors, opposite/zero/unit vectors, Examples 1.1–1.3.
- Triangle/parallelogram addition, Example 2.1, subtraction, Example 2.2 and hinge.
- Closed paths and scalar multiplication, then Examples 2.3–2.4, consolidation and Homework 1.

A natural stopping point is **after Scaling and parallel vectors**, before Example 2.3. If continuing next period, retrieve what reversal and a negative multiplier mean, trace A→O→B again, and ask students to predict the result with A and B interchanged. This can be done on the existing hinge slide using Reset; collect a fresh explanation. Then proceed to the midpoint/path applications. Keep a single lesson deck and retain the full homework selection. Lessons 2, 3, 5 and 6 may each need two teaching periods; avoid forcing the six decks into six periods.

## Hook and the purpose of the unit

Students have already used a chosen positive direction and signed numbers in 1D motion. Build on that fact, rather than treating vector direction as entirely new.

1. Five metres right then two metres left gives displacement +3 metres; distance travelled is 7 metres.
2. Five metres east then two metres north still gives distance 7 metres, but that alone does not specify the endpoint. No magnitude or angle calculation is needed. If asked, the displacement has magnitude √29 metres and direction arctan(2/5) north of east.
3. Movement a, then b, then −a has resultant b. Reveal the arrows separately, predict, then reveal the resultant. Change a's length and direction; its reverse stays linked. The 3D option uses a parallel projection, preserving addition and equality but not apparent spatial lengths or angles.

Suggested framing: Familiar geometry remains useful. Algebra helps us reason without knowing particular numbers; vectors let us work with magnitude and direction without needing every length or angle. One symbol can represent a whole movement. The same reasoning works in two dimensions and three dimensions.

This is a short predict–explain activity, not a named Project Zero routine. No external applet or network connection is required by the lesson. Use the shared mathematical renderer for all vector labels and dynamic expressions.

## Worked checks

Use the booklet's undertilde notation in handwritten examples. The slides also introduce equivalent bold notation.

- **1.1:** The original grid arrow goes three squares right and two up. Draw two translates with different tails.
- **1.2(a):** Any length-one arrow; one grid edge is a simple choice. A square's diagonal has length √2 and is not a unit vector. **(b):** Three squares left and two down.
- **1.3:** In spatial small-edge units, the given arrow moves one unit in each horizontal direction and two units up. A translated copy can start at the front bottom edge midpoint and finish at the top right edge midpoint. Reverse the original for −a. Any one small edge is a unit vector. Perspective screen lengths are not spatial measurements.
- **2.1:** DA=−b; AC=a+b; BD=b−a, using B→A→D.
- **2.2:** b−a=−r. The two differences have opposite directions. The special case a=b gives zero for both, without making subtraction commutative in general.
- **2.3(a):** BC=−a+b+c. **(b):** BM=(−a+b+c)/2. **(c):** AM=(a+b+c)/2. Do not assume the quadrilateral is a parallelogram.
- **2.4(a):** AF=a+c; FM=b/2. **(b):** AM=a+b/2+c. **(c):** CM=c−b/2; NM=a. **(d):** NM and AB are equal directed vectors; the segments are parallel and equal in length, with the named directions agreeing. Connect N→E→F→M cancellation to the opening journey.

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
- A unit vector has magnitude one; defer the normalising formula to revised Lesson 3.
- Non-zero parallel vectors may have the same or opposite directions. Do not attribute a direction to the zero vector.
- Triangle and parallelogram constructions work in 3D. Non-parallel tail-to-tail vectors determine a plane; parallel vectors do not determine a unique plane.
- The later component-resolution lesson must use r cos θ in the x-direction and r sin θ in the y-direction when θ is measured from positive x, correcting the old swapped formula.

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
