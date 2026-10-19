# Sequences and Series

## Lesson 1: What is a sequence?

Year 12 Mathematics Advanced. Section 1 of the supplied booklet, Examples 1.1–1.7, printed pages 1–4, with Key Ideas and Homework 1 on page 5. Allow approximately 60 minutes. This lesson has 19 slides. Students complete working in their booklets and OneNote; full example solutions stay in presenter notes.

The class is comfortable with functions and inputs/outputs. There is no Previously slide. The cover is followed by a one-sentence objective and success criterion, then the OEIS exploration.

### Pacing

| Slides | Content | Approximate time |
|---|---|---|
| 1–2 | Cover and learning goal | 1 minute |
| 3–5 | OEIS: discover a rule, a familiar sequence, a birthday A-number | 6–8 minutes |
| 6–8 | Notation, finite/infinite sequences, rule representations | 6 minutes |
| 9–10 | Examples 1.1–1.2 | 6 minutes |
| 11 | Hinge, response and discussion | 3 minutes |
| 12–13 | Examples 1.3–1.4 | 9 minutes |
| 14 | Recursive rules and colour-coded working | 3 minutes |
| 15–17 | Examples 1.5–1.7 | 14 minutes |
| 18–19 | Key ideas and Homework 1 | 3 minutes |

Use remaining time for transitions or extra discussion. If time is tight, limit the Fibonacci builder to two reveals, preserving all booklet examples.

### OEIS exploration

1. Search `1,1,2,3,5,8,13` at https://oeis.org/. Find a matching entry, locate more terms and explain the rule. Do not name Fibonacci or supply the A-number before students search. The intended entry is A000045.
2. Search about six consecutive terms of another familiar integer sequence. Let students choose; offer square numbers, powers of two or primes if needed. Discuss unexpected or multiple matches.
3. Use `A` followed by a birthday in `DDMMYY` format, retaining leading zeros. A memorable date is also suitable. Record the A-number and first few terms, then share one observation or question. A complete explanation of advanced terminology is not expected. If no entry is found, use the teacher example or a partner's entry.

Teacher example: https://oeis.org/A131284 begins 5, 80, 86, 613668, 6384425704. Its terms are indices n where the prime factors of the nth semiprime differ by n. The fifth semiprime is 14=2×7 and 7−2=5. This explanation is optional. Do not treat the number of terms displayed on a page as proof that a sequence is finite.

External links open in a new tab. Slide 3 links to the OEIS homepage without giving away the intended entry. The mathematical lesson and interactive activities work without OEIS; the browsing exploration requires internet access. No OEIS iframe or API is required.

### Progressive reveals

Slide 7 opens with the finite example. Next reveals the infinite example alongside it and the comparison underneath. Slide 8 opens with the list of terms. Next reveals the explicit rule and its explanation; the next click adds the recursive rule and its explanation. Previous reverses these reveals. These are Reveal fragments on the same slides, so the slide count is unchanged by the reveals.

### Recursive rules

Slide 14 returns to the sequence found during the OEIS investigation. Start with a_1=a_2=1 and use a_n=a_{n-1}+a_{n-2} for n≥3. Next term reveals one value at a time, with four aligned lines: the general recurrence, substitution of the index, substitution of values, then the result. Two clicks reach the worked example a_4=a_3+a_2, a_4=2+1, a_4=3.

Blue marks the previous term and orange marks the term before it in the general rule, substituted working and term strip. The new term has a teal border. These roles update for each new term. Ask for a prediction before each reveal. Reset restores only the starting pair.

### Hinge

For the finite sequence a_n=n²−4 with n=1,2,3,4,5, identify the correct statement:

1. a_3=3. Confuses the index and value; a_3=5.
2. The sequence has no negative terms because n is positive. Transfers the index restriction to values; a_1=−3.
3. **12 is the fourth term. Correct:** a_4=12 and the index is allowed.
4. 32 is the sixth term of this sequence. Ignores the finite domain; this sequence ends at n=5.

Choices 1–4 correspond to A–D in the approved overview; correct 3 corresponds to C. Use the repository's simultaneous finger routine: fist on chest, think quietly, then everyone shows 1–4 fingers on the teacher's verbal cue. The default timer is 60 seconds, adjustable with start/pause/reset and a separate answer reveal. Timer expiry does not reveal correctness.

Ready: ask why choice 4 is tempting and proceed. Divided: have pairs justify choices and re-poll before revealing. Reteach: construct the full index–value table 1,…,5 and −3,0,5,12,21, then recheck domain and rule.

### Worked checks

| Example | Results and key reasoning |
|---|---|
| 1.1 | (a) Infinite, a_20=−90. (b) Finite, final index 13; a_20 does not exist. Preserve the source request for a twentieth term. |
| 1.2 | a_1=7; m=19; a_19=97. |
| 1.3 | (a) 13,16,19; a_n=3n−2. (b) 48,96,192; a_n=3×2^(n−1). (c) 25,36,49; a_n=n². These are the intended simple rules; an initial list does not determine a unique continuation. |
| 1.4 | Initial terms 1,5,9,13; a_20=77; 539 is not a term because n=135.5 is not an integer. |
| 1.5 | 1,1/2,1/3,1/4,1/5; conjecture a_n=1/n. Interpret the recurrence for n≥2. |
| 1.6 | 411 is a_21. The equation gives n=±21, of which only 21 is a valid index. |
| 1.7 | (a) 8 negative terms, indices 1–8. (b) 16 terms, indices 9–24; n=25 gives 200 and is excluded. |

### Homework 1

Cambridge Year 12 Exercise 1A, copied from the supplied booklet:

| Level | Questions |
|---|---|
| Mild | Q1–4 (alternate parts), Q8 |
| Medium | Q1–4 (alternate parts), Q8–10 |
| Spicy | Q1–4 (alternate parts), Q8–12 |

### Sources and scope

- Primary source: `12MA__2026____Sequences_and_Series.pdf`, Section 1 and Homework 1. Exact example wording, numbers, subparts and notation are retained.
- Teaching reference: `Defining Sequence.pptx`. Its original Examples 1.1–1.5 correspond to current booklet Examples 1.3–1.7. Use the current booklet's numbering and a_n notation, rather than the deck's T_n notation.
- The PDF cover says Year 12 Mathematics Extension 1. The teacher explicitly requested Year 12 Mathematics Advanced, so the lesson is placed in that course. The textbook edition was not supplied for independent homework verification.
- Syllabus scope follows the three bullet points supplied beside Section 1: ordered lists, a_n with positive integer n, and finite/infinite sequences. No additional syllabus code is asserted.
- https://oeis.org/ and https://oeis.org/hints.html: searching consecutive terms and A-numbers.
- https://oeis.org/A000045: Fibonacci recurrence and terms; OEIS starts its index at 0.
- https://oeis.org/A131284: birthday example. External sources checked 11 October 2026.

Formal arithmetic/geometric formulas, partial sums and series are reserved for later lessons. Example 1.5 omits the recursive index range; explain n≥2 without altering its prompt. Keep the interpretation of Example 1.1(b) and the non-uniqueness caveat for Example 1.3 in teaching notes.

### Preview and publishing

From the repository root:

```bash
quarto preview courses/year-12-mathematics-advanced/sequences-and-series/lessons/lesson-1.qmd
quarto render
```

The course and topic listings discover the new lesson automatically. Publish using the repository's manual **Publish Quarto lessons** GitHub Actions workflow after source changes are on `main`.

## Lesson 2: Partial sums and summation notation

Section 2, printed pages 5–9, Examples 2.1–2.4 and Homework 2. Eighteen slides, approximately 55–60 minutes plus an optional 2-minute extension. The objective is to understand the connections between sequence terms, partial sums and summation notation. The success criterion is to evaluate and write sums using summation notation and recover sequence terms from partial sums.

### Sequence and pacing

| Slides | Content | Approximate time |
|---|---|---|
| 1–2 | Cover and learning goal | 1 minute |
| 3 | Growing-square investigation | 3 minutes |
| 4–7 | Terms, partial sums, series, summation notation and the term-count rule | 10 minutes |
| 8–9 | Example 2.1(a–d) | 9 minutes |
| 10 | Hinge, response and discussion | 3 minutes |
| 11 | Example 2.2 and equivalent summation expressions | 6 minutes |
| 12–13 | Recovering terms and Example 2.3 | 8 minutes |
| 14–15 | Square border and algebraic proof, Example 2.4 | 10 minutes |
| 16 | Key ideas | 2 minutes |
| 17 | Optional extension: unrolling a sum | 2 minutes |
| 18 | Homework | 1 minute |

Allow remaining time for transitions and discussion. If needed, stop the opening after the fourth square and use only one change of summation bounds. Retain all four booklet examples.

### Unit cover graphic

Both lesson covers use `media/sequence-cover.svg`, with successive 1-, 4-, 9- and 16-dot squares and odd-numbered new layers. Use this graphic for later Sequences and Series lessons in place of the statistical bar motif. The topic's AGENTS.md records the teacher's preference.

### Interactions and reveals

- **Growing square:** Next layer adds the orange border but hides its new counts. Reveal counts records the number added and the total. Earlier recorded counts remain visible. Previous layer revisits earlier stages, and Reset restores the single dot and clears subsequent records. Stages 1–6 add 1,3,5,7,9,11 dots, with totals 1,4,9,16,25,36. The opening is about distinguishing a new term from a running total, not memorising a sum formula.
- **Representations:** Next adds the partial sum, then the infinite series. Keep a_n distinct from S_n. A finite partial sum does not imply a finite limiting sum.
- **Reading summation (sigma) notation:** Establish that the names mean the same thing. Place the upper and lower bounds above and below the summation symbol. Reveal the three substitutions at k=2,3,4 separately, then their sum. The introductory example is sum (2k+1) = 5+7+9 = 21, with bounds 2 through 4.
- **Counting terms:** The starting bounds are 3 through 7. Change either selector to update the included integer indices and corresponding a_k terms. Reveal count displays upper−lower+1. Changes to bounds hide the count; bounds remain valid, including the single-term case. Reset restores the starting bounds with the count hidden.
- **General term-count rule:** After the interactive count, write sum from n=p to q of a_n and expand it as a_p+a_(p+1)+…+a_q. Ask for the count before Next reveals q−p+1 and the explanation that q−p counts steps, while +1 includes the starting term. Next shows the cases p=1 and p=q. Use positive integer bounds with p≤q.
- **Example 2.2:** Show two valid forms only after students attempt the question. The button hides the forms again if needed.
- **Recovering terms:** Reveal cancellation of the shared total, then a_n=S_n−S_{n−1} for n≥2 and a_1=S_1.
- **Square border:** Reveal the row of n dots and the column of n−1 dots, then their total 2n−1. The corner belongs to the row and is counted only once. The diagram uses n=5 as a schematic example of the general structure.
- **Key ideas:** Display the partial-sum equation, the general summation with q−p+1 terms labelled beneath the expansion, and the equations for recovering a term. There is no additional exit question.
- **Optional extension:** After Key Ideas, expand the sum from n=p to q of a_n. Next separates a_p and raises the lower bound to p+1. Next separates a_q and lowers the upper bound to q−1. Blue and orange link each separated term to its changed bound. Both identities preserve the total. Use integer bounds 1≤p<q so the remaining sum is nonempty. For a concrete check, set p=2 and q=5. Taking p=1 in the last-term form recovers the earlier partial-sum relationship.

All slide fragments use the standard Next and Previous controls. Interactive states remain in page memory when navigating or opening the slide map. No external applet, account or network access is needed by the two activities.

### Hinge and response routine

For sum from k=2 to 5 of (2k−1), which statement is correct?

1. Five terms, sum 25: starts incorrectly at k=1.
2. **Four terms, sum 24: correct.** Indices 2,3,4,5 yield 3,5,7,9.
3. Three terms, sum 15: excludes the upper endpoint.
4. Four terms, sum 9: confuses the final term with the total.

Use the shared default 60-second timer and numbered finger choices. Fist on chest, quiet thinking, then 1–4 fingers together on the teacher's verbal “show” cue. Timer expiry does not reveal correctness; the teacher uses the separate answer reveal. Reset clears the choice, answer and timer.

Ready: justify the effect of the lower bound and proceed. Divided: compare lists of indices in pairs and re-poll. Reteach: align an index row with its term-value row, then count and add separately.

### Worked checks

| Example | Result and reasoning |
|---|---|
| 2.1(a) | 1+4+9+16+25+36+49+64=204. Eight terms. |
| 2.1(b) | 14+19+24+29+34=120. Five terms, indices 3–7. |
| 2.1(c) | 12−24+48−96=−60. Four terms, indices 2–5. |
| 2.1(d) | Eight copies of 2 sum to 16. The constant expression is included once per index. |
| 2.2 | Sum from k=2 to 6 of 1/(2k), or from k=1 to 5 of 1/(2k+2). Both reproduce 1/4+1/6+1/8+1/10+1/12. |
| 2.3 | a_7=S_7−S_6=70−51=19. |
| 2.4 | a_1=S_1=1. For n≥2, a_n=n²−(n−1)²=2n−1. Thus the sequence is 1,3,5,7,… . |

Use explicit expansion for Example 2.1, without requiring arithmetic-series or sum-of-squares formulas. Full example solutions are in presenter notes. The graphical border argument supports, but does not replace, the requested algebraic proof in Example 2.4.

### Homework 2

Cambridge Year 12 Exercise 1E, copied from the booklet's front summary and page 9:

| Level | Questions |
|---|---|
| Mild | Q1–5 (alternate parts), Q8 (a–f) |
| Medium | Q3–6 (alternate parts), Q8–9 |
| Spicy | Q5–10 |

### Sources and scope

The source booklet is `12MA__2026____Sequences_and_Series.pdf`, Section 2. The reference deck is `Series and Sigma Notation.pptx`: old Examples 1.6–1.9 correspond exactly to booklet Examples 2.1–2.4. Keep the current booklet's numbering, wording, subparts, bounds and values. Unlike the old deck's broad “finite series” wording, explicitly distinguish the nth partial sum from the corresponding infinite series, following the supplied syllabus notes. Formal arithmetic/geometric sum formulas and limiting sums belong to later lessons.

## Lesson 3: Arithmetic sequences and the general term

Section 3, printed pages 10–18, Examples 3.1–3.10 and Homework 3. Twenty-three slides. Allow approximately 75–90 minutes including booklet working, or use two periods with a natural pause after slide 14 (Example 3.4). The objective is to understand how a constant difference connects the recursive rule, general term and graph. The success criterion is to identify APs and use their general term to find terms, test membership and solve problems.

### Sequence and pacing

| Slides | Content | Approximate time |
|---|---|---|
| 1–3 | Cover, learning goal and Claim–Support–Question | 5 minutes |
| 4–5 | Plain-language definition, examples/non-examples and Example 3.1 | 6 minutes |
| 6–7 | Recursive rule, proof test and Example 3.2 | 7 minutes |
| 8–9 | Example 3.3, general term and HSC reference-sheet excerpt | 7 minutes |
| 10 | Hinge, response and discussion | 4 minutes |
| 11–14 | Example 3.4 and interactive graph | 16 minutes |
| 15 | Example 3.5, first negative term | 7 minutes |
| 16–18 | Examples 3.6–3.8, terms and membership | 10 minutes |
| 19–20 | Example 3.9, two known terms | 8 minutes |
| 21 | Example 3.10, multiples and inclusive counting | 6 minutes |
| 22–23 | Key ideas and homework | 3 minutes |

Keep the worked examples in the booklet/OneNote. Source questions retain their wording, values, example numbers and subparts. In particular, retain “series” in Examples 3.6, 3.7 and 3.9, while explaining verbally that these questions concern terms of the underlying sequence. Do not introduce the arithmetic partial-sum formulas yet.

### Interactions and reveals

- **Opening:** Use Claim–Support–Question with the four finite lists. Students choose an odd one out and support their choice with mathematical evidence. Accept multiple justified choices: 1 increases by a constant amount, 2 decreases, 3 is constant, and 4 has unequal consecutive differences. First click introduces Question so partners can question one another's claims or evidence. For example, ask whether zero counts as a constant difference. Second click asks what 1, 2 and 3 share that 4 does not. This is an open reasoning routine, not a single-answer multiple-choice check. Allow about 3 minutes.
- **Examples and non-examples:** Introduce the plain-language AP definition and the name common difference. Compare the three arithmetic lists with doubling, squares and alternating signs. First click reveals all consecutive differences; second click states that the common difference may be positive, negative or zero. Follow with Example 3.1.
- **Recursive rule and proof:** Initially show only a_1=a and a_n=a_(n−1)+d for n≥2. First click introduces the all-terms proof test a_n−a_(n−1)=d. Second click specialises to three terms, a_3−a_2=a_2−a_1. Follow immediately with Example 3.2. A check of three displayed terms alone does not establish an unspecified infinite continuation.
- **Example 3.3:** Four clicks reveal a, a+d, a+2d, a+3d. Blue identifies the first term and orange the accumulated change. Keep the question text visible throughout.
- **General term:** Collect a proposed rule, then reveal a_n=a+(n−1)d alongside the teacher-supplied HSC reference-sheet excerpt. The red box marks the first formula under Sequences and series. Next reveal checks at n=1 and n=4; finally state the index domain. There are n−1 increments from term 1 to term n. The original slide 8 is now slide 9. The other formulas in the excerpt will be studied in later lessons.
- **Graph:** Starts at a=2,d=5 with eight discrete points, n=1,…,8. The first point is blue. Sliders change a (−10 to 30) and d (−6 to 6), in integer steps. A fixed vertical scale from −60 to 80 keeps gradient changes comparable. “Show generating line” reveals the continuous orange line, y=dx+(a−d), gradient d and an open marker at the line intercept. That marker is not a sequence term. The visible segment represents a line continuing beyond the plot window. Presets are Increasing (2,5), Decreasing (20,−3), Constant (7,0). Sliders/presets preserve the current reveal state; Reset returns to (2,5) and hides the line. Navigation and the slide map preserve the activity state.
- **Example 3.4(b)(iii–iv):** Reveal the general linear relationship after students discuss the gradient and constant sequence. Pause here if using two periods.
- **Example 3.9(a):** Reveal a+2d=23 and a+7d=63 only after students translate the known terms.
- **Example 3.10:** Optionally reveal 1000<7k<10000, k integer, after students propose a counting method. Connect the inclusive index count with Lesson 2.

### Hinge and response routine

Given a_4=11 and common difference 3, find a_10. Default timer 60 seconds. Fist on chest, think quietly, then show 1–4 fingers together on the teacher’s verbal cue. The answer is revealed separately; expiry does not reveal it.

1. 26: adds five increments instead of six.
2. **29: correct.** a_10=a_4+(10−4)d=11+6(3)=29.
3. 38: treats the fourth term as the first term and adds nine increments.
4. 41: adds ten increments, ignoring the given term’s index.

Ready: request a second method using a=2. Divided: list indices 4 through 10, count the six transitions, and re-poll. Reteach: advance one term at a time before compressing the repeated addition.

### Worked checks

| Example | Working and answer |
|---|---|
| 3.1(a) | (i) a=4,d=2; (ii) a=21,d=−3; (iii) √12=2√3, √27=3√3, hence a=d=√3. |
| 3.1(b) | d=a_n−a_(n−1): later term minus earlier term. |
| 3.2 | Displayed differences are −1/3; intended next term is −1/2. See proof qualification below. |
| 3.3 | a, a+d, a+2d, a+3d; general term a_n=a+(n−1)d. |
| 3.4(a) | 2,7,12,17,22; a_20=97; f(x)=5x−3, m=5. |
| 3.4(b) | 20,17,14,11,8; a_n=23−3n, f(x)=23−3x; m=d=−3. For d=0,a_n=7, discrete points lie on y=7, with m=0. |
| 3.5 | a=200,d=−7; a_n=207−7n. Negativity requires n>207/7, so first negative term is a_30=−3; check a_29=4. |
| 3.6 | a_17=11+16(5)=91. |
| 3.7 | a_n=29−3n. Setting equal to −18 gives n=47/3, so −18 is not a term. Adjacent terms: a_15=−16, a_16=−19. |
| 3.8 | a_15=3+14(4)=59. |
| 3.9 | a+2d=23, a+7d=63 gives d=8,a=7. a_30=7+29(8)=239. |
| 3.10 | First and last multiples are 1001 and 9996, indexed by 143 and 1428. Count 1428−143+1=1286. Equivalently 9996=1001+(n−1)7 gives n=1286. |

**Proof qualification:** The booklet correctly distinguishes an all-terms proof from checking a finite prefix. Examples 3.2 and 3.5 nevertheless ask whether a sequence specified only by initial terms and an ellipsis is arithmetic. Preserve their wording and explain the intended constant-difference continuation. A full proof needs a defined rule: for 3.2, a_n=1/2−(n−1)/3 gives a_n−a_(n−1)=−1/3 for every n≥2. Do not repeat the old presentation’s claim that two matching differences prove any unspecified infinite sequence is arithmetic.

### Homework 3

- Mild: Cambridge Year 12 Exercise 1B Q1–4 (alternate parts).
- Medium: Cambridge Year 12 Exercise 1B Q1–6 (alternate parts).
- Spicy: Cambridge Year 12 Exercise 1B Q1–6 (alternate parts); Exercise 1D Q1, Q5, Q7(a,b).

These are the supplied booklet’s references, unchanged. The textbook edition was not independently verified.

### Source mapping

The source is `12MA__2026____Sequences_and_Series.pdf`, Section 3. `Arithmetic Progression.pptx` supplies the introductory ideas and old Examples 2.1, 2.3, 2.4, 2.5 corresponding to current Examples 3.1, 3.3, 3.4 and 3.5. `Further Arithmetic Progression.pptx` supplies old Examples 2.6–2.9 corresponding to current Examples 3.6, 3.7, 3.9 and 3.10. Use the current booklet’s expanded graph subparts in 3.4 and its additional Examples 3.2 and 3.8. The “Advanced HSC 2023 Q11 – 2 marks” attribution for 3.8 comes from the supplied booklet; the original paper has not been independently checked.

The opening adapts [Claim, Support, Question](https://www.pz.harvard.edu/resources/claim-support-question), developed by Project Zero, Harvard Graduate School of Education. The reference-sheet excerpt is the teacher's supplied screenshot, preserved unchanged as `media/hsc-reference-sheet-sequences.png`. [NESA's Mathematics Advanced 11–12 (2024) teaching and learning support page](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-advanced-11-12-2024/teaching-and-learning) lists the HSC reference sheet.

## Lesson 4: Arithmetic series and linear models

Section 4, printed pages 19–27, Examples 4.1–4.9 and Homework 4. Twenty-four slides. Allow approximately 80–95 minutes including booklet working, or use two periods with a natural pause after slide 16 (Example 4.6). The objective is to understand how constant differences lead to arithmetic-series formulas and models of linear growth and decay. The success criterion is to calculate arithmetic partial sums and distinguish a quantity at a particular time from an accumulated total.

### Sequence and pacing

| Slides | Content | Approximate time |
|---|---|---|
| 1–3 | Cover, learning goal and term-versus-sum recap | 4 minutes |
| 4 | Gauss and the classroom story | 1 minute |
| 5–6 | Example 4.1 and reversing/pairing activity | 7 minutes |
| 7–10 | Example 4.2, staged proof and both formulas | 12 minutes |
| 11–12 | Examples 4.3–4.4 | 8 minutes |
| 13 | Hinge, simultaneous response and discussion | 4 minutes |
| 14 | Example 4.5, two partial sums | 7 minutes |
| 15–16 | Example 4.6(a–b), including a lower bound other than 1 | 8 minutes |
| 17 | Example 4.7, pyramid of cans | 6 minutes |
| 18–20 | Linear models, simple-interest recap and Example 4.8 | 10 minutes |
| 21–22 | Example 4.9, draining tank and interpretation of a sum | 10 minutes |
| 23–24 | Key ideas and Homework 4 | 3 minutes |

Allow remaining time for transitions, discussion and independent working. Full worked answers are in presenter notes. Students complete the booklet examples in their booklets/OneNote. Question wording, values, numbering and subparts follow the booklet; scaffolding and model assumptions are separated from the source questions.

### Interactions and reveals

- **Recap:** For 3,7,11,… distinguish a_10 from S_10 before revealing a_10=39 and S_10=3+7+…+39. The sum is 210, but calculating it is not required at this point.
- **Gauss story:** Briefly introduce Carl Friedrich Gauss (1777–1855), then tell the familiar version in which a misbehaving pupil is set the 1-to-100 task and answers almost immediately. Label it as a classroom story with uncertain details. Next reveals 5050 and “How did he do it?” Do not reveal the pairing method until students tackle Example 4.1.
- **Reversing and pairing:** Start with n=100. The activity buttons reveal the reversed row, then equal column totals, then the doubled sum and final sum. Previous step reverses each stage. Change n to 5 or 9 to test an odd number of terms; 6 and 10 are also available. Both rows always contain n terms, so there are n columns even when n is odd. For large n, the ellipsis represents omitted columns. Changing n hides the working; Reset restores n=100 with one row. Navigation and the slide map preserve the activity state.
- **General proof:** Next reveals the reversed row, then the column totals, then S_n=n(a+l)/2. Each pair totals a+l. The two rows total 2S_n, which explains dividing by 2. The argument also works for negative or zero common differences and for odd n. Example 4.2(c) begins with S_n=n(a+l)/2. Orange links l to a+(n−1)d in the prompt and in the first revealed substitution. The next click simplifies to the second formula.
- **Reference sheet:** Show the teacher's screenshot supplied on 15 October 2026 at 2:15 pm, with the red box around the arithmetic-series row. The complete screenshot is displayed unchanged beside the typeset formulas. It is stored separately from the image used in Lesson 3. Relate “number of terms × mean of the endpoint values” to either formula.
- **Example 4.5:** Show the question only. Students set up the two equations in their own working; the setup and full solution remain in presenter notes.
- **Summation examples:** In Example 4.6(a), identify a_1=5, a_40=83 and 40 terms. In part (b), reveal 15−4+1=12 terms, followed by the endpoint calculation. The first included term is 20, not 5; 15 is the upper index, not the term count. Connect with Lesson 2.
- **Cans:** The diagram contains all 15 rows, with 5,7,9,…,33 cans and 285 circles in total. It is a schematic front view. The first four rows are labelled Row 1–Row 4, with 5, 7, 9 and 11 cans respectively. Ask for the bottom row before summing.
- **Linear models:** Distinguish a sequence beginning at index 1, a_n=a_1+(n−1)d, from a time-zero model, Q_n=Q_0+nd. Equal time intervals and a constant absolute change are essential.
- **Simple-interest recap:** Before Example 4.8, recall I=PRN: I is interest, P is the original principal, R is the decimal rate per period and N counts periods. Match the time units. Next reveals A_N=P+I=P+N(PR); the fixed increase each period is PR, so this is linear growth. Connect A_0=P and d=PR to the previous model. N may be fractional when measuring elapsed years; for an integer-indexed monthly sequence, use the monthly rate.
- **Simple interest:** The source question gives a rate without explicitly naming the interest model. State the simple-interest assumption before solving. Interpret 18 months as 1.5 annual periods. For a discrete monthly model, use n=0,…,18 and A_n=8000+n[8000(0.04)/12]. Keep the monthly increment exact until the final calculation; the requested interest is $480, not the $8480 final balance.
- **Tank:** The slider selects integer hours from 0 through 25. Both numerical readings are initially hidden; Remaining and Pumped out have independent reveal/hide buttons. The 10 hours shortcut changes time while retaining the reveal state. Reset restores time 0 and hides both readings. The tank empties at 25 hours, so the model does not continue to negative volumes. Navigation and the slide map preserve the state. For the hourly sequence, n∈{0,1,…,25}; the continuous model has t∈[0,25].
- **Sum of tank readings:** First compare the remaining 900 L with the pumped 600 L after 10 hours. Then reveal the sum of the ten hourly remaining-volume readings, 11700 L. The same water can be counted repeatedly across readings, so this is neither the water remaining at hour 10 nor the water pumped out. It is ten times the mean reading of 1170 L. Do not label the unweighted sum “litre-hours”; no time-width factor has been introduced.

### Hinge and response routine

An arithmetic sequence has a_1=2 and a_2=5. Evaluate the summation from k=1 to 10 of a_k. Keep the question in summation notation, with the bounds above and below the symbol.

1. 29: calculates a_10 instead of the sum.
2. **155: correct.** d=5−2=3, so the sum is 10[2(2)+9(3)]/2=155.
3. 170: uses n increments in the sum formula instead of n−1.
4. 245: treats the second term, 5, as the common difference.

Default timer: 60 seconds, adjustable. Fist on chest, think quietly, then show 1–4 fingers together on the teacher's verbal “show” cue. Timer expiry does not reveal the answer. Use the separate Reveal answer button after discussion; Reset clears the answer and selected choice as well as resetting the timer. Leaving the slide pauses the timer.

Ready: ask for the endpoint method, a_10=29 and 10(2+29)/2. Divided: identify what the summation asks for, then find a, d and n before re-polling. Reteach: write 2,5,8,…,29 and distinguish the tenth term from the sum of all ten terms.

### Worked checks

| Example | Working and answer |
|---|---|
| 4.1 | (a) 100 terms. (b) 2S=100×101, hence S=5050. |
| 4.2 | (a) S_n=a+(a+d)+…+(l−d)+l. (b) Reverse the terms and add the two rows: 2S_n=n(a+l). (c) Substitute l=a+(n−1)d to give S_n=n[2a+(n−1)d]/2. |
| 4.3 | First 50 positive even numbers: a=2,l=100,n=50; S_50=2550. |
| 4.4 | a_n=4n+5 gives a_1=9,d=4,a_16=69; S_16=624. |
| 4.5 | S_6=45 gives 2a+5d=15. S_12=−18 gives 2a+11d=−3. Therefore d=−3,a=15 and a_10=−12. |
| 4.6(a) | 40 terms from 5 to 83: sum=40(5+83)/2=1760. |
| 4.6(b) | Indices 4,…,15 give 12 terms from 20 to 75: sum=12(20+75)/2=570. Alternative: S_15−S_3=600−30=570. |
| 4.7 | Row 15 has 5+14(2)=33 cans; total=15(5+33)/2=285 cans. |
| 4.8 | (a) Principal $8000. (b) Annual rate 0.04. (c) 1.5 annual periods, or 18 monthly periods at rate 0.04/12. (d) Simple interest=8000(0.04)(1.5)=$480. |
| 4.9 | (a) V_n=1500−60n. (b) n∈{0,1,…,25} for the hourly sequence. (c) V_10=900 L. (d) S_10=1440+1380+…+900=11700 L; this is the sum of ten remaining-volume readings, not a single remaining or pumped volume. Pumped water after 10 hours is 600 L. |

Key ideas include the block-sum formula: sum from k=p to q of a_k equals (q−p+1)(a_p+a_q)/2 for an arithmetic sequence and integer indices 1≤p≤q. It uses the first and last included terms, not necessarily the sequence's first term.

### Homework 4

Cambridge Year 12, copied from the booklet:

| Level | Questions |
|---|---|
| Mild | Exercise 1F Q1–4 (alternate parts); Exercise 1B Q16 |
| Medium | Exercise 1F Q1–6 (alternate parts); Exercise 1B Q16–17 |
| Spicy | Exercise 1F Q1–8 (alternate parts); Exercise 1B Q16–17; Exercise 1F Q10, Q15 |

### Sources and scope

Primary source: `12MA__2026____Sequences_and_Series.pdf`, Section 4, printed pages 19–27. Teaching reference: `Arithmetic Series.pptx`; use the booklet's current Examples 4.1–4.9 and their values, wording and subparts. The old presentation informed the reversing-and-pairing explanation. Treat the Gauss classroom story as an anecdote, without asserting a particular age or punishment as an established historical fact. The HSC excerpt is the teacher-supplied `media/hsc-reference-sheet-arithmetic-sums.png`; the Lesson 3 image is unchanged. Gauss biography: [MacTutor, University of St Andrews](https://mathshistory.st-andrews.ac.uk/Biographies/Gauss/). Historical context: [Brian Hayes, ‘Gauss’s Day of Reckoning’, American Scientist 94 (2006), 200–205](https://eclass.uoa.gr/modules/document/file.php/MATH417/Bibliografia/HayesGaussDayofReckoning.pdf). The earliest known account specifies an arithmetic series but not 1–100, the pairing method or punishment for misbehaviour. Do not describe the popular version as verified history or as definitively disproven.

This lesson covers finite arithmetic sums and constant-rate models. Geometric sums and compound interest belong to later lessons. No additional syllabus code or independently verified textbook edition is asserted. The lesson and its activities work offline after rendering. Preview with `quarto preview courses/year-12-mathematics-advanced/sequences-and-series/lessons/lesson-4.qmd`; publish with the repository's manual workflow when ready.

## Lesson 5: Geometric sequences and the general term

Year 12 Mathematics Advanced. Section 5, printed pages 28–34, Examples 5.1–5.7 and Homework 5. Twenty-three slides. Allow approximately 70–80 minutes including booklet/OneNote working, or split after Example 5.5 (slide 14). The objective connects the constant ratio with the recursive rule, general term and graph. The success criterion is to recognise GPs, find unknown terms and explain their behaviour.

### Sequence and pacing

| Slides | Content | Approximate time |
|---|---|---|
| 1–2 | Cover and learning goal | 1 minute |
| 3–5 | Short, continuation summary, scale question and table | 5 minutes |
| 6–9 | Definition, examples/non-examples, Examples 5.1–5.2 and ratio proof | 12 minutes |
| 10–11 | Example 5.3, general term and formula sheet | 6 minutes |
| 12 | Timed hinge and discussion | 4 minutes |
| 13–14 | Examples 5.4–5.5 | 11 minutes |
| 15–16 | Example 5.6 and both possible ratios | 9 minutes |
| 17–18 | Exponential connection and interactive graph | 8 minutes |
| 19–21 | Example 5.7(a–c) | 12 minutes |
| 22–23 | Key ideas and Homework 5 | 3 minutes |

Leave the remaining time for transitions and discussion. Avoid turning the opening into a longer investigation. Geometric sums and compound interest remain for later lessons. No function input/output recap is needed.

### Interactions and reveals

- **Growing and shrinking:** Play the embedded 1-minute-38-second Short, “What's the smallest thing you can be?” from The Rest Is Science. Ask what mathematical pattern connects the two journeys. Use “Open the Short on YouTube” if the player is unavailable. Playback requires a tap and leaving the slide unloads the player. The separate “Watch later” link opens the full episode at 3:40 for optional viewing afterwards. If YouTube is unavailable, describe the two changes per second and continue.
- **The journey continues:** Briefly summarise what the full video goes on to say. Initially show the reported 30-second sizes: white blood cell and grain of sand. First click reveals the approximate 31-second meeting point, both the size of a human egg cell. Second click asks how long it would take to grow from the Planck length to the size of the observable universe at a factor of 10 per second. Third click reveals about 62 seconds: each person covers about 31 multiplicative steps before meeting, so the whole journey takes about 31+31 steps. These are scenario seconds, not video playback timestamps. The teacher notes provide an optional numerical explanation using 10^−35 m and 10^27 m: 27−(−35)=62 exponent steps. Keep this summary brief; the full episode is for later viewing.
- **Two journeys:** The table initially shows only L and U at time 0. Ask students to complete the next three rows. First click reveals 10L, 100L, 1000L and 0.1U, 0.01U, 0.001U. Ask for each column: “What is staying constant in this sequence?” Second click reveals the multipliers 10 and 0.1. Third click identifies both as geometric sequences. Time 0 is the first listed term, so term n corresponds to n−1 elapsed seconds. With the rounded starting lengths, both sequences reach 10^−4 m at 31 seconds. More precise physical estimates need not give equality at a whole-second sample.
- **Examples and non-examples:** Introduce the plain-language definition, then reveal all successive ratios together. Show positive, fractional, negative and unit ratios. A non-zero constant sequence is both AP and GP. The convention here requires non-zero terms and r≠0; r=1 and r=−1 are allowed.
- **Proof:** Start with a_1=a and a_n=ra_(n−1). Next reveals a_n/a_(n−1)=r for every n≥2 in the sequence domain. Next specialises to a_3/a_2=a_2/a_1 for three non-zero terms. Two checked ratios establish only those three terms are in GP. The infinite continuation requires a rule or an arbitrary-index argument.
- **Example 5.3:** Four clicks reveal a, ar, ar², ar³. Blue identifies a and orange the accumulated power of r. Ask for the nth term before moving on. There are n−1 multiplications from term 1 to term n.
- **General term:** First click reveals a_n=ar^(n−1) and the teacher-supplied HSC screenshot. The third formula has a separate teal HTML outline. The original screenshot is unchanged, including its red arithmetic-sum outline from Lesson 4. Next checks n=1 and n=4. The positive-integer domain remains explicit.
- **Example 5.6:** Students translate the known terms before a click reveals ar³=40 and ar⁵=480. Divide to eliminate a. On the follow-up slide, first click shows r=±2√3 and second click shows both paired values of a with the intervening fifth term. Do not discard the negative solution.
- **Exponential connection:** Show a_n=ar^(n−1)=(a/r)r^n. First click introduces the positive-base generating function and r=1 constant case. Second click explains the negative-base limitation. Negative-base integer powers still define an alternating GP.
- **Graph:** First eight terms at n=1,…,8, with the first term blue. Defaults a=3,r=2. Presets Growth (3,2), Decay (48,1/2), Constant (5,1) and Alternating (5,−1) align with Example 5.7. Selectors include negative first terms and negative ratios, but no zero. Ratio choices: −2,−1,−1/2,1/4,1/2,1,3/2,2,3. First-term choices: −12,−6,−3,−1,1,2,3,5,6,12,24,48. Numeric vertical tick labels update and a visible caption warns that the scale adjusts. Do not compare apparent steepness across different scales. Curve visibility never changes the numeric scale of the same sequence.
- **Graph curve:** Optional for r>0 and shown over 1≤x≤8; the full generating function has real domain. For r=1 it is horizontal. Choosing r<0 immediately hides and disables the curve. Changing back to a positive ratio leaves it hidden until requested. Other changes preserve visibility. Reset restores (3,2) and hides the curve. Navigation and the slide map retain activity state.

The opening video needs internet access and may depend on the school's YouTube restrictions. The follow-up table, graph controls and mathematics work offline after rendering. The native HTML/SVG graph keeps the mathematics precise and selectable through the controls. Existing lessons and shared response controls are unchanged.

### Hinge and response routine

A geometric sequence has a_1=2 and a_2=6. Find a_5.

1. 18: applies an arithmetic rule with difference 4, giving 2+4(4).
2. 81: omits the first-term multiplier and uses 3⁴.
3. **162: correct**, r=6/2=3 and a_5=2×3⁴.
4. 486: uses n instead of n−1, giving 2×3⁵.

Default 60 seconds with adjustable duration, start/pause/reset and separate answer reveal. Fist on chest. Think quietly. On the teacher's verbal “show”, hold up 1–4 fingers simultaneously. Timer expiry never reveals the answer. Ready: justify the four multiplications. Divided: compare ratio and difference, then re-poll. Reteach: list 2,6,18,54,162 with indices 1–5 before returning to the formula.

### Worked checks

| Example | Working and result |
|---|---|
| 5.1(a) | (i) a=2,r=2. (ii) a=3,r=1/3. (iii) a=√3,r=√2. |
| 5.1(b) | Divide the later term by its predecessor: r=a_n/a_(n−1). |
| 5.2 | Ratios (1/2)/(3/2)=(1/6)/(1/2)=1/3. The displayed three terms are in GP. Under the intended continuation, r=1/3 and the next term is 1/18. |
| 5.3 | a, ar, ar², ar³; a_n=ar^(n−1), n≥1 an integer. |
| 5.4 | x/(x−3)=(x+12)/x with x≠0,3. Then x²=x²+9x−36, so x=4. Terms 1,4,16 give r=4. |
| 5.5 | a=48,r=−1/4. a_9=48(−1/4)^8=3/4096≈0.000732421875, positive. |
| 5.6 | ar³=40, ar⁵=480 imply r²=12. Both (a,r)=(5√3/9,2√3) and (−5√3/9,−2√3) work. Their fifth terms are respectively 80√3 and −80√3, with fourth and sixth terms 40 and 480 in both cases. |
| 5.7(a) | f(x)=3×2^(x−1)=(3/2)2^x. First terms 3,6,12,24. Discrete points lie on an increasing exponential curve. |
| 5.7(b) | First terms 48,24,12,6. b_n→0 from above; no finite-index term equals zero. This is a term limit, not a series sum. |
| 5.7(c) | 5,−5,5,−5. The negative-base expression is not real for all real inputs, e.g. x=3/2. A positive-base exponential with non-zero coefficient has fixed sign and cannot generate these alternating points. |

### Mathematical qualifications

For positive a, r>1 increases the values, and 0<r<1 decreases them towards zero. For negative a, describe magnitude instead: r>1 moves farther below zero, while 0<r<1 approaches zero from below. For r<0, signs alternate and the magnitudes follow the positive ratio |r|. In particular r=−1 gives constant magnitude with no single limiting term value.

The absence of an ordinary real exponential curve for r<0 does not mean no smooth curve can pass through the sequence points. For instance, 5cos(π(x−1)) passes through Example 5.7(c)'s points, but is not exponential. Also avoid saying every non-integer power of a negative number is non-real; some rational exponents are real. The issue is extending the negative-base expression to every real input.

Preserve “series” in Example 5.5 because it is in the booklet, while clarifying verbally that it asks for the ninth term, not a sum. The all-zero sequence is outside the non-zero ratio-test convention used here, even though it can satisfy a multiplicative recurrence.

### Homework 5

Cambridge Year 12, copied from printed page 34 and the front summary:

| Level | Questions |
|---|---|
| Mild | Exercise 1C Q1–4 (alternate parts) |
| Medium | Exercise 1C Q1–6 (alternate parts) |
| Spicy | Exercise 1C Q1–6 (alternate parts); Exercise 1D Q2, Q6, Q7(c) |

### Sources and scope

Primary source: `12MA__2026____Sequences_and_Series.pdf`, Section 5, printed pages 28–34. Reference: `Geometric Progression.pptx`; its Examples 3.2–3.6 correspond to current Examples 5.2–5.6. Use the booklet's corrected wording, notation and current numbering. Examples 5.1 and 5.7 and the explicit infinite-sequence proof qualification come from the current booklet. The opener embeds [The Rest Is Science, “What's the smallest thing you can be?”](https://www.youtube.com/shorts/neBpfR1IswE), with an optional [full-video link from 3:40](https://www.youtube.com/watch?v=9yGdvsASj5c&t=220s) for later viewing. The teacher supplied the scenario and the continuation summary: at 30 seconds, a white blood cell and a grain of sand; at about 31 seconds, both the size of a human egg cell. These approximate comparisons are attributed to the video. [NIST's CODATA constants table](https://physics.nist.gov/cuu/Constants/Table/allascii.txt) gives the Planck length as approximately 1.616255×10^−35 m. [NASA's “How Big is Space?”](https://www.nasa.gov/science-research/astrophysics/how-big-is-space-we-asked-a-nasa-expert-episode-61/) estimates the observable universe's diameter at about 92 billion light-years, approximately 8.7×10^26 m. The teacher notes use rounded powers of ten, 10^−35 m and 10^27 m, to support the 62-second model estimate. The target is the observable universe's present diameter, treated as fixed during the thought experiment. The follow-up table retains symbolic starting lengths. The HSC excerpt reuses `media/hsc-reference-sheet-arithmetic-sums.png` with a separate teal annotation, leaving the supplied image and earlier lessons untouched. No independently verified textbook edition or additional syllabus code is asserted.

Preview with `quarto preview courses/year-12-mathematics-advanced/sequences-and-series/lessons/lesson-5.qmd`. Publishing remains manual through the repository's existing workflow.
