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
