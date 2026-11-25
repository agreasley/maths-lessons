# Geometrical Applications of Calculus

## Lesson 1: Continuity and differentiability

Year 12 Mathematics Advanced. The supplied program identifies this as Lesson 1. Coverage: booklet Section 1.1, Examples 1.1–1.4, printed pp. 1–7 (PDF pages 10–16). Allow about 50 minutes. Use the booklet alongside the slides and complete worked examples in OneNote.

Opening: cover, then the three rows What?, Why? and Prior learning. Success criterion is in presenter notes and revisited before homework. Prerequisites are limits, piecewise functions and the derivative as tangent gradient. A brief one-sided-limit recap follows the historical hook; do not describe these prerequisites as necessarily the immediately previous lesson.

- What? We are learning to identify where a function is continuous, where it is differentiable, and how differentiability differs from continuity.
- Why? Mathematicians needed to establish when derivatives exist, because even a graph with no breaks can have no gradient anywhere.
- Prior learning: Limits, piecewise functions and the derivative as the gradient of a tangent.
- Success criterion: I can identify and justify where a function is continuous and where it is differentiable, and explain why continuity does not guarantee differentiability.

The supplied syllabus content focuses on the difference-quotient definition, a non-vertical tangent, differentiability implying continuity, and identifying continuous but nondifferentiable points. It is reproduced conceptually from the supplied booklet/program; no new syllabus wording has been invented.

## Pacing

| Slides | Focus | Approximate time |
| --- | --- | --- |
| 1–6 | Opening, Weierstrass history/definition/amplitudes, prerequisite recall | 10 minutes |
| 7–10 | Continuity and Examples 1.1–1.2 | 12 minutes |
| 11–13 | Differentiability, Example 1.3 and failure cases | 11 minutes |
| 14 | Graphical hinge and response | 4 minutes |
| 15–16 | Example 1.4 | 10 minutes |
| 17–18 | Key ideas, success criterion and homework | 3 minutes |

## Historical background for the teacher

Many nineteenth-century mathematicians expected continuous functions to be differentiable apart from exceptional points. An isolated corner fits this intuition. Weierstrass's example demonstrated that continuity could coexist with failure of differentiability at every point.

These three ideas now appear as student-facing bullet points on a dedicated history slide, before the definition or graph. Allow about one minute, then advance to “Building the Weierstrass function” and the derivative-amplitude comparison.

Weierstrass presented his famous construction to the Berlin Academy on 18 July 1872. The proof was published by Paul du Bois-Reymond in 1875. Earlier examples existed, including Bolzano's unpublished construction. Say “Weierstrass presented his famous example in 1872”, not “he was the first to discover the possibility”. The definitions of continuity and differentiability preceded the example; it reinforced the need for rigorous foundations.

Suggested one-minute introduction:

> Most curves we have differentiated are smooth. A corner can stop a derivative existing at one particular point. But mathematicians faced a more surprising question: could a graph have no breaks and yet have no derivative anywhere? In 1872, Weierstrass presented an example that did exactly that. He added infinitely many waves, each smaller but more tightly packed than the last. This showed why we need to distinguish two questions: do the function values join up, and do the gradients settle towards one value? Today we start with simpler graphs where we can investigate that distinction ourselves.

The student slide now defines the infinite function explicitly:

\[
W(x)=\sum_{n=0}^{\infty}2^{-n}\cos(3^n x)
=\cos x+\tfrac12\cos(3x)+\tfrac14\cos(9x)+\cdots.
\]

Each successive wave has half the amplitude and oscillates three times as quickly: over the same interval it completes three times as many cycles, so its period is one third as long.

The next slide differentiates one term and compares the geometric amplitude sequences 1, 1/2, 1/4, 1/8, ... and 1, 3/2, 9/4, 27/8, ... . The chain-rule factor 3^n outweighs 2^(-n). The wave terms tend to zero because their absolute values are bounded by 2^(-n); their signed values need not decrease monotonically. Derivative amplitudes grow, rather than derivative values necessarily growing at every fixed x. Keep this explanation to about 4 minutes across the two slides.

The displayed approximation is

\[
W_N(x)=\sum_{n=0}^{N-1}2^{-n}\cos(3^n x),\qquad 1\leq N\leq6.
\]

This is a standard member of the Weierstrass family, rather than a claim to reproduce his original parameter choice. Each amplitude halves and each frequency triples. The infinite series is continuous: the tail after n=N is bounded uniformly by the tail of a convergent geometric series. Each individual term's derivative is

\[
-\left(\frac32\right)^n\sin(3^n x).
\]

These growing amplitudes give intuition, not a proof of nowhere differentiability. Differentiating an infinite series requires additional convergence conditions. A standard sufficient theorem: on a closed bounded interval, differentiable terms, convergence of the original series at one point and uniform convergence of the derivative series allow term-by-term differentiation (with the usual one-sided interpretation at endpoints). Power series can be differentiated inside their radius of convergence. A divergent formal derivative series alone does not prove the original function lacks a derivative.

At x=0, each term's derivative is zero, yet the infinite Weierstrass function is not differentiable there. This is a useful illustration of why convergence of the derivative series at a single point is insufficient. No proof of the Weierstrass result is required in this lesson.

Every computer graph here is a finite sum and is smooth. Enough magnification would reveal that smoothness. The display illustrates increasingly fine detail; it does not prove nowhere differentiability or show an exact infinite function. Avoid saying the curve simply has an ordinary corner at every point. At an ordinary corner, two finite one-sided gradients exist and disagree; that description is inadequate for the Weierstrass function.

Sources:
- Allan Pinkus, *Weierstrass and Approximation Theory*, especially pp. 3–5: https://www.math.auckland.ac.nz/hat/fpapers/wap.pdf
- John K. Hunter, *An Introduction to Real Analysis*, Example 9.24, pp. 180–181: https://www.math.ucdavis.edu/~hunter/intro_analysis_pdf/intro_analysis.pdf
- MacTutor, *The function concept*: https://mathshistory.st-andrews.ac.uk/HistTopics/Functions/
- Cauchy's 1821 explanation of the need to establish valid conditions: https://mathshistory.st-andrews.ac.uk/Extras/Cauchy_Calculus/

## Worked checks

| Example | Continuity | Differentiability / teaching point |
| --- | --- | --- |
| 1.1 | Both limits and f(0) are 2. | Question only asks continuity. Later, left/right gradients -3 and 0 explain the corner. |
| 1.2(a) | Continuous. | A join is not automatically a discontinuity. |
| 1.2(b) | Removable discontinuity: hole. | Limit exists but the point is missing. |
| 1.2(c) | Vertical-asymptote discontinuity at 0. | No finite limit. |
| 1.2(d) | Removable discontinuity. | Limit exists, but the filled point differs from it. |
| 1.2(e) | Continuous. | Smooth original graph. |
| 1.2(f) | Jump at 0. | Finite one-sided limits disagree. |
| 1.3 | Both limits and f(0) are 0. | Piecewise -x for x<0, x for x>=0. One-sided gradients -1 and 1 disagree. |
| 1.4(a) | Both limits and f(1) are 1. | Branch derivatives -1 and 2x give -1 and 2. Not differentiable. |
| 1.4(b) | Both limits and g(1) are 0. | Branch derivatives -2x and 2x-4 both give -2. Differentiable. |

Example 1.2 uses crops of all six original PDF diagrams, retaining labels and geometry. The original PowerPoint mistakenly groups (d) under “Jump/Step”. The new lesson uses the correct removable classification. The formal continuity equation uses lim f(x), correcting the PowerPoint typo lim f(a).

For piecewise joins: check the left limit, right limit and function value first. If continuous, compare the finite one-sided derivatives. For the smooth branches in these examples, their derivative formulas can be evaluated at the join. Do not imply that matching derivative formulas compensates for a jump in function values.

## Secant comparison

Example 1.3 opens with y=|x|. The positive distance h ranges from 1 to 0.01 and never reaches zero. Blue marks (-h,f(-h)); orange marks (h,f(h)). Both secants pass through (0,0). For |x| the gradients are -1 and +1. For the additional y=x^2 comparison they are -h and +h. Students predict before the teacher reveals values. Changing function hides gradients. Reset restores Example 1.3, h=1 and hidden values.

Follow-up: “Both graphs are continuous at the origin. What additional condition allows a derivative to exist?” Expect the same finite limiting secant gradient from both sides. Highlight that a zero gradient is valid.

## Diagnostic hinge

The diagram represents f(x)=3-|x-2| with a filled sharp peak at (2,3). Neither the equation nor numerical one-sided gradients appear to students. The axes use equal units. The question asks which statement is correct at x=2.

1. Continuous and f'(2)=0: treats every peak as stationary, or averages gradients.
2. Continuous and f'(2)<0: uses only the descending right-hand branch.
3. Continuous but f'(2) does not exist: **correct**. No gap, but unequal one-sided gradients.
4. Neither continuous nor differentiable: confuses a corner with a break.

“Fist on chest. Think quietly. On ‘show’, hold up 1–4 fingers.” Use the teacher's cue, not timer expiry, for simultaneous responses. The adjustable timer defaults to 60 seconds. Start/Pause/Resume and Reset are shared controls; answer reveal remains separate. Reset hides the answer again. Opening the slide map or leaving the slide pauses the timer.

- Ready: ask why continuity is insufficient, then Example 1.4.
- Divided: paired reasons, then revote before revealing.
- Needs explanation: return to the |x| comparison, distinguish function values from gradients, then recheck.

Craig Barton, *Diagnostic questions*: https://tipsforteachers.co.uk/diagnostic-questions/

## Thinking routine

Project Zero, Harvard Graduate School of Education, *What Makes You Say That?* (adapted): https://www.pz.harvard.edu/resources/what-makes-you-say

Prompt within Example 1.2: “Is this function continuous at the marked point? What do you see that makes you say that?” Allow 1–2 minutes of evidence-based discussion within the example. In (d), ask which continuity check fails. In (f), ask whether moving the filled point can repair the jump. Expected distinction: unequal point/limit versus unequal one-sided limits.

## Homework

Retain Homework 1 exactly: **Cambridge Year 12 Extension 1 — Exercise 3H**.

- Mild: Q1, Q2, Q3(a), Q4(a,c).
- Medium: Q1, Q2, Q4(a,b,d), Q7(a,c,d).
- Spicy: Q4(b,d), Q5(c,d), Q6(a), Q7(a,c), Q8.

The website course is Year 12 Mathematics Advanced. The supplied booklet nevertheless specifies this Extension 1 homework; no Advanced question mapping has been guessed. Student homework slide contains only the source and questions.

## Remaining topic pacing

The supplied program allocates 11 lessons but its detailed sequence is numbered 1–9, combining concavity and the second-derivative test. The booklet has 11 homework sets. This does not affect Lesson 1; reconcile later lesson boundaries during their planning stages.
