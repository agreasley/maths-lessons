# Section 3: Data — teacher guide

These are three lessons, following the homework breaks in the supplied booklet. Slide count reflects separate reveal and checking stages, not additional lessons. The source questions, datasets and all 14 numbered examples are retained in the repository; Example 3.7 is omitted from the active Lesson 2 sequence by request. Long examples are split across slides. Worked answers and pacing suggestions are in presenter notes.

## Booklet and lesson map

| Lesson | Booklet | Examples | Homework |
|---|---|---|---|
| 1. Random variables | Section 3.1, pp. 35–37 | 3.1–3.3 | Cambridge 15A |
| 2. Organising and displaying data | Sections 3.2–3.3, pp. 38–47 | 3.4–3.6, 3.8–3.11 | Cambridge 15B |
| 3. Grouping and estimating probability | Sections 3.4–3.5, pp. 48–51 | 3.12–3.14 | Cambridge 15C |

## Topic files

- `index.qmd`: topic page and automatic lesson listing.
- `lessons/_metadata.yml`: shared presentation settings for this topic.
- `lessons/lesson-1.qmd`, `lesson-2.qmd`, `lesson-3.qmd`: lesson metadata and slide order.
- `lessons/lesson-1/`, `lesson-2/`, `lesson-3/`: individual slide files and presenter notes.

The lesson masters contain aliases for their former URLs under `year-11/probability-data/`. Quarto creates the redirect pages during rendering; there are no duplicate lesson sources.

## Multiple-choice response routine

Use numbered options **1–4** for all timed hinges and other multiple-choice checks. Students make a **fist on their chest** and think independently. On the teacher’s verbal **“show”** cue, everyone simultaneously extends **1, 2, 3 or 4 fingers at chest level** to match their chosen option. Keep the fist closed until the cue. The prompt on each slide is: **Fist on chest. Think quietly. On “show”, hold up 1–4 fingers.**

Matching cartoon hand icons sit alongside the printed numbers. Timer expiry does not reveal the answer or issue the “show” cue. Scan all responses and decide whether to proceed, discuss or reteach before using the separate answer reveal. For Examples 3.3 and 3.11, numbered screen choices 1–4 correspond to the booklet’s A–D respectively; wording, order and source attribution are preserved.

| Check | Correct screen choice |
|---|---|
| Lesson 1: fixed unknown versus random variable | 4 |
| Lesson 1: infinitely many reciprocal values | 3 |
| Example 3.3: amount charged | 1 (booklet A) |
| Lesson 2: median from a complete frequency table | 2 |
| Example 3.11: histograms | 2 (booklet B) |
| Lesson 3: class boundary | 2 |

Use proper maths typography for variables in slides and applets. The repository-wide conventions are recorded in `AGENTS.md` and `README.md`.

## Lesson 1 — Exercise 15A

This lesson is being taught to an Extension 1 mathematics class meeting random variables for the first time. Begin with the objective and success criteria, with no prerequisite recap. Keep the existing course/topic location and URLs for the shared Advanced content.

Use the side-by-side pen and four-coin applet before the formal definition. Allow approximately 6–8 minutes for the new introduction, definition and conceptual hinge. Let x be the pen price in dollars: purchases change, but the unit price is fixed at $4. Let X be the number of heads: its definition stays fixed, while its value depends on the random outcome. Ask students to predict, reveal and explain what can change. This contrasts a fixed unknown in this algebra problem with a random variable; it does not imply that every algebraic variable is fixed.

Each toss generates four independent fair-coin outcomes. Looking inside only reveals the value; it does not generate another outcome. New purchases and tosses close the corresponding box. The histories retain the last three revealed results, and Reset both clears them. A repeated head count is valid and is never artificially prevented. The initial coin display waits for the teacher's first toss.

The first timed hinge checks fixed unit price versus total cost, unknown versus random, and the misconception that a random value must change every time. Its answer is 4; the slide notes include responses for ready, divided and not-yet-ready students. Both the applet and this hinge are additional teaching material, not new numbered booklet examples.

Then classify possible values, complete Example 3.1, and use the existing classification cards. The second hinge provides a different, more challenging application: for a completed coin-toss trial ending at the first head, let $N$ be the number of tosses and $X=1/N$. It tests whether students recognise infinitely many, non-integer values as discrete, distinguish a list from an interval, and exclude the unattainable value zero. Default to 90 seconds; the correct choice is 3. Ask “Could $X=0.4$?” as a follow-up: it would require 2.5 tosses. The slide notes include the misconception behind each distractor and responses for ready, divided and not-yet-ready students. Example 3.2 is followed by the existing 16-outcome coin display. Finish with the wording discussion in Example 3.3, revisit the success criteria and set the unchanged homework.

### Classification precision

- Actual running time remains a continuous physical quantity even when measured to 0.1 seconds.
- An explicitly defined *rounded recorded value* lies on a discrete grid. Always state which variable is intended.
- ATAR is awarded on a prescribed 0.05 scale; the recorded rank is discrete.
- In Example 3.3, **screen choice 1 (booklet A)** is the best reading of the *final amount charged in cents*. The underlying volume or an unrounded mathematical cost could instead be continuous. Keep that distinction explicit; do not use this potentially ambiguous item as the timed hinge.

## Lesson 2 — Exercise 15B

The class has already met frequency tables, histograms, mean, median, mode, range, quartiles and IQR in Years 9–10. Start with the two-column Example 3.4 table and use only a brief definition reminder. The objective is to read and extend frequency tables, interpret cumulative frequency, and calculate/check summary statistics using tables and a calculator.

Sequence: two-column table → learning goal and quick definitions → cumulative frequency, relative frequency and cumulative relative frequency → insert fx and calculate the mean → summary statistics from ordered positions → calculator demonstration → Examples 3.4(c–e) and 3.5 → median hinge → histogram conventions → Examples 3.6 and 3.8 → Example 3.9 cumulative histogram/ogive → Examples 3.10–3.11 → recap and unchanged homework. Example 3.7's source files remain available but are not included in the lesson master.

The table builder begins with x and f only. Next entry reveals one calculation and highlights its inputs. Complete column finishes the current column; Back and Reset let you revisit the reasoning. Build cf first, then rf, then crf. Interpret each entry in context: at x=1, cf=35 means 35 households have at most one pet, rf=.40 means 40% have exactly one, and crf=.70 means 70% have at most one. The separate mean slide begins with these completed columns and inserts fx immediately after f. Products are 0,20,20,12,4; Σfx=56 and Σf=50, so the mean is 1.12 pets per household.

Use the statistic locator to connect rows to ordered positions. For Example 3.4, median=1 because both positions 25 and 26 lie in positions 16–35 (x=1). Mode=1, range=4, Q1=0, Q3=2 and IQR=2. For the quartiles, use the medians of the lower and upper halves; here the relevant positions are 13 and 38. The brief reminder's example values are hidden until requested.

### Calculator practice

The calculator slide opens https://classpad.net/note/#/tools/math in a new tab for live modelling, with the same x/f table visible in the lesson. Use Statistics → 1-Variable; enable TOOLS → Frequency → On before data entry, enter x and f in the corresponding columns, then open 1-Var Results. Check n=50 before reading mean, median, quartiles, minimum and maximum. Calculate range=max−min and IQR=Q3−Q1; read the mode from the table. If n=5, the frequencies were not entered correctly. The calculator's weighted Σx=56 corresponds to the table's Σfx.

Menu labels and the warning that changing Frequency clears data were checked against the official Casio fx-8200 AU manual: https://support.casio.com/global/en/calc/manual/fx-8200AU_en/using_calculator_apps/statistical_calculations.html . Other models may differ. Students should follow on their own calculators. Do not extend this lesson into variance/standard deviation.

### Median hinge

Display the complete six-column table in the order x, f, fx, cf, rf, crf. Values are 2,4,7,9,12 with frequencies 3,7,6,3,1. Thus n=20, fx=6,28,42,27,12, cf=3,10,16,19,20, rf=.15,.35,.30,.15,.05 and crf=.15,.50,.80,.95,1. Totals: Σf=20, Σfx=115 and Σrf=1; cumulative columns are not summed.

Correct choice 2 gives median 5.5: observation 10 is 4 and observation 11 is 7. The complete table deliberately requires students to select the relevant columns. Choices 1 and 3 use only one middle value (or confuse the mode/middle distinct value with the median); choice 4 gives the middle position 10.5. The crf=.50 entry at x=4 does not eliminate the need to check the next observation. Keep the 60-second default, simultaneous 1–4 finger response and separate answer reveal. Teacher notes include ready/divided/reteach responses.

### Cumulative graph interactive

In Example 3.9, Next bar builds running totals and Show all bars completes the histogram. Select a row or bar to interpret its count and ordered positions. Show points places points at upper class boundaries plus the initial zero point; Join ogive connects them. Median guides adds the half-total line and highlights the rows containing observations 20 and 21. Both are 6, giving exact median 6. Interpolation on the joined upper-boundary graph gives 6.125 (about 6.1).

Class width 2 rebuilds the table using groups 1–2,3–4,5–6,7–8,9–10. The middle observations are in the 5–6 group; the exact median cannot be recovered from that grouped table alone. The ogive estimate is approximately 6.07. Regrouping hides points/guides and resets the graph build; Reset returns to width 1. All interactions preserve the original Example 3.9 question parts and dataset.

### Graph conventions

- All classes here have equal widths. Adjoining bars represent a histogram. In the discrete integer demonstration, leave a half-column lead-in before the first bar and centre each integer below its bar. This is not a gap between adjacent bars. For continuous data, labels mark class boundaries; do not shift them to force a leading gap. Label the vertical axis frequency, relative frequency or cumulative frequency as appropriate.
- Ordinary-frequency polygons use value/class centres, with zero endpoints one class outside the data.
- Cumulative polygons use upper class boundaries and begin at zero at the first lower boundary.
- Under an interval convention `a ≤ x < b`, the cumulative count at the upper boundary is the count *below b*. Keep strict/inclusive boundary language consistent.
- A straight-line cumulative polygon gives an interpolated estimate. For discrete data, use cumulative counts to locate the middle observation(s) exactly. Example 3.9 has exact median **6**, while reading the upper-boundary polygon at cumulative frequency 20 gives about **6.1**.
- If using the omitted Example 3.7 later, helper zero-frequency endpoints at scores 0 and 6 may be required to complete the polygon convention. This does not change the observed dataset.

## Lesson 3 — Exercise 15C

Explore class boundaries, complete Example 3.12 and change class width. Use the hinge before moving to experimental probability. Collect five real coin tosses per student for Example 3.13; enter the class totals on the slide. Use the simulator to extend the discussion, then finish Example 3.14.

The coin simulator models fair independent tosses. More trials tend to stabilise a proportion but do not guarantee it moves closer to 0.5 after every batch. Use the actual class outcome when answering Example 3.13(d), even if the pooled estimate happens to be farther from 0.5.

For Example 3.14(d), a sample of 50 is not automatically incapable of providing evidence. Seventeen sixes is a noticeable discrepancy from the fair model. Discuss chance variation, method and further evidence; formal significance testing is beyond the lesson. Do not label an empirical pattern as proof of bias.

## Answer checks

| Example | Checks |
|---|---|
| 3.1 | a discrete; b continuous; c discrete; d continuous; e discrete on the ATAR scale; f discrete. Define each variable explicitly. |
| 3.2 | Values 0–4; 16 ordered outcomes. Counts for 0,1,2,3,4 heads are 1,4,6,4,1. |
| 3.3 | Screen choice 1 (booklet A) for the final recorded monetary charge; discuss the variable definition. |
| 3.4 | Added checks: Σfx=56, mean=1.12, median=mode=1, range=4, Q1=0, Q3=2, IQR=2. rf .30,.40,.20,.08,.02; cf 15,35,45,49,50; crf .30,.70,.90,.98,1. Parts c–e: .20,.90,.98. |
| 3.5 | n=25; rf .12,.24,.32,.20,.08,.04; cf 3,9,17,22,24,25; crf .12,.36,.68,.88,.96,1. Parts b–c: .68,.12. |
| 3.6 | n=16; mode 9. Polygon zero endpoints at x=4 and x=11. |
| 3.7 (omitted from teaching sequence) | n=32; rf .125,.25,.375,.1875,.0625. Divide all bar heights by 32. |
| 3.8 | Frequencies 10,0,4,0,3,8; mode 1; P(X≥5)≈.44. Explanation of the pattern is a hypothesis to investigate. |
| 3.9 | cf 2,6,8,9,15,23,30,36,38,40. Exact median 6. Width-2 grouped frequencies 6,3,14,13,4. |
| 3.10 | cf 1,4,8; median 2.5; mode 3. Middle positions 4 and 5 contain 2 and 3. |
| 3.11 | Screen choice 2 (booklet B): modes 9 and 8; both ranges 6. Histograms redrawn from the supplied figure. |
| 3.12 | n=25; centres 9.5–16.5 by 1; cf 1,3,8,10,17,22,24,25. Width 1 modal and median class 13≤x<14. Width 2 frequencies 3,7,12,3; cf 3,10,22,25; modal and median class 13≤x<15. |
| 3.13 | Experimental answers vary; fair-coin probability .5. Class estimate = total heads / total tosses. |
| 3.14 | rf .14,.10,.12,.14,.16,.34; P(X=4)≈.14; P(X>3)≈.64; predicted sixes 272 in 800 rolls. |

## Homework, unchanged

| Exercise | Mild | Medium | Spicy |
|---|---|---|---|
| 15A | Q1–6 | Q1–8, Q10, Q13 | Q1–8, Q10, Q13–15 |
| 15B | Q1–6 | Q1–9, Q11 | Q1–9, Q11–13, Q15 |
| 15C | Q1–4 | Q1–6 | Q1–6, Q8 |

## Source and implementation

Source: the user-supplied `11MAX - Probability and Data.pdf`, Section 3, printed pp. 35–51 (PDF pages 41–57). The original PDF is not required to run the site and is not copied into this repository. Example 3.3 retains the booklet's HSC Question Bank attribution; Example 3.11 retains its HSC Standard Mathematics 2011 Q11 attribution.

Each slide is a separate `_*.qmd` file. Each lesson master lists the slide includes. Custom SVG and JavaScript interactions are local and reusable; the optional source spreadsheet is a normal external link. No external GeoGebra or Desmos embeds are needed for this unit.
