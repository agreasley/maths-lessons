# Section 3: Data — teacher guide

These are three lessons, following the homework breaks in the supplied booklet. Slide count reflects separate reveal and checking stages, not additional lessons. The source questions, datasets and all 14 numbered examples are retained; long examples are split across slides. Worked answers and pacing suggestions are in presenter notes.

## Booklet and lesson map

| Lesson | Booklet | Examples | Homework |
|---|---|---|---|
| 1. Random variables | Section 3.1, pp. 35–37 | 3.1–3.3 | Cambridge 15A |
| 2. Organising and displaying data | Sections 3.2–3.3, pp. 38–47 | 3.4–3.11 | Cambridge 15B |
| 3. Grouping and estimating probability | Sections 3.4–3.5, pp. 48–51 | 3.12–3.14 | Cambridge 15C |

## Topic files

- `index.qmd`: topic page and automatic lesson listing.
- `lessons/_metadata.yml`: shared presentation settings for this topic.
- `lessons/lesson-1.qmd`, `lesson-2.qmd`, `lesson-3.qmd`: lesson metadata and slide order.
- `lessons/lesson-1/`, `lesson-2/`, `lesson-3/`: individual slide files and presenter notes.

The lesson masters contain aliases for their former URLs under `year-11/probability-data/`. Quarto creates the redirect pages during rendering; there are no duplicate lesson sources.

## Lesson 1 — Exercise 15A

Define a random variable, classify possible values, complete Example 3.1, then use the classification cards and timed hinge. Example 3.2 is followed by a 16-outcome coin display. Finish with the wording discussion in Example 3.3 and the homework.

The hinge targets confusion between measurement precision and the underlying variable. Choose a duration that leaves time to obtain every student's response before revealing.

### Classification precision

- Actual running time remains a continuous physical quantity even when measured to 0.1 seconds.
- An explicitly defined *rounded recorded value* lies on a discrete grid. Always state which variable is intended.
- ATAR is awarded on a prescribed 0.05 scale; the recorded rank is discrete.
- In Example 3.3, **A** is the best reading of the *final amount charged in cents*. The underlying volume or an unrounded mathematical cost could instead be continuous. Keep that distinction explicit; do not use this potentially ambiguous item as the timed hinge.

## Lesson 2 — Exercise 15B

This is the densest lesson. The sequence is: frequency tables → event language and hinge → frequency/relative-frequency graphs → spreadsheet activity → cumulative graphs → median/mode → comparison question.

Use the reveal slides as checks after booklet working. The spreadsheet instructions from Example 3.7 are split across two slides. If students are already fluent with basic graph construction, display the graph explorer briefly and give more class time to cumulative frequency and the two middle positions.

### Graph conventions

- All classes here have equal widths. Adjoining bars represent a histogram; default spreadsheet columns with gaps need formatting.
- Ordinary-frequency polygons use value/class centres, with zero endpoints one class outside the data.
- Cumulative polygons use upper class boundaries and begin at zero at the first lower boundary.
- Under an interval convention `a ≤ x < b`, the cumulative count at the upper boundary is the count *below b*. Keep strict/inclusive boundary language consistent.
- A straight-line cumulative polygon gives an interpolated estimate. For discrete data, use cumulative counts to locate the middle observation(s) exactly. Example 3.9 has exact median **6**, while reading the upper-boundary polygon at cumulative frequency 20 gives about **6.1**.
- For Example 3.7, helper zero-frequency endpoints at scores 0 and 6 may be required to complete the polygon convention. This does not change the observed dataset.

## Lesson 3 — Exercise 15C

Explore class boundaries, complete Example 3.12 and change class width. Use the hinge before moving to experimental probability. Collect five real coin tosses per student for Example 3.13; enter the class totals on the slide. Use the simulator to extend the discussion, then finish Example 3.14.

The coin simulator models fair independent tosses. More trials tend to stabilise a proportion but do not guarantee it moves closer to 0.5 after every batch. Use the actual class outcome when answering Example 3.13(d), even if the pooled estimate happens to be farther from 0.5.

For Example 3.14(d), a sample of 50 is not automatically incapable of providing evidence. Seventeen sixes is a noticeable discrepancy from the fair model. Discuss chance variation, method and further evidence; formal significance testing is beyond the lesson. Do not label an empirical pattern as proof of bias.

## Answer checks

| Example | Checks |
|---|---|
| 3.1 | a discrete; b continuous; c discrete; d continuous; e discrete on the ATAR scale; f discrete. Define each variable explicitly. |
| 3.2 | Values 0–4; 16 ordered outcomes. Counts for 0,1,2,3,4 heads are 1,4,6,4,1. |
| 3.3 | A for the final recorded monetary charge; discuss the variable definition. |
| 3.4 | rf .30,.40,.20,.08,.02; cf 15,35,45,49,50; crf .30,.70,.90,.98,1. Parts c–e: .20,.90,.98. |
| 3.5 | n=25; rf .12,.24,.32,.20,.08,.04; cf 3,9,17,22,24,25; crf .12,.36,.68,.88,.96,1. Parts b–c: .68,.12. |
| 3.6 | n=16; mode 9. Polygon zero endpoints at x=4 and x=11. |
| 3.7 | n=32; rf .125,.25,.375,.1875,.0625. Divide all bar heights by 32. |
| 3.8 | Frequencies 10,0,4,0,3,8; mode 1; P(X≥5)≈.44. Explanation of the pattern is a hypothesis to investigate. |
| 3.9 | cf 2,6,8,9,15,23,30,36,38,40. Exact median 6. Width-2 grouped frequencies 6,3,14,13,4. |
| 3.10 | cf 1,4,8; median 2.5; mode 3. Middle positions 4 and 5 contain 2 and 3. |
| 3.11 | B: modes 9 and 8; both ranges 6. Histograms redrawn from the supplied figure. |
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
