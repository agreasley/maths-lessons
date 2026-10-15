# Financial Mathematics: Year 10

These six lessons accompany the supplied **10MA Financial Mathematics.pdf**. References below use the booklet's printed page numbers. Plan approximately 50–60 minutes per lesson, including worked examples in OneNote.

## Sequence

| Lesson | Coverage | Main decision point | Homework |
|---|---|---|---|
| 1. Percentage change | §§1.1–1.4; Examples 1.1–1.5; pp. 2–4 | Interpret a single multiplier before successive changes | No separate allocation |
| 2. Simple interest | §2.1; Examples 2.1–2.3; pp. 5–6 | Match annual rates with time in years | Homework 1 |
| 3. Building compound interest | §3.1; Examples 3.1–3.3; pp. 7–9 | Distinguish the original principal from the current balance | Continue existing Homework 1 |
| 4. Compound interest formula | §4.1; Examples 4.1–4.2; pp. 10–11 | Convert both the rate and the number of periods | Homework 2 |
| 5. Interest and depreciation | §§4.1–4.2; Examples 4.3–4.4; pp. 12–13 | Use the retained proportion for repeated decrease | Homework 3 |
| 6. Exponential growth and decay | §4.3; Examples 4.5–4.6; pp. 14–15 | Interpret a constant percentage loss | Homework 4 |

Each lesson retains the shared cover, followed by its one-sentence objective and success criterion, then the recap. Individual slides live in `lessons/lesson-N/`; reorder their includes in `lessons/lesson-N.qmd`.

The examples retain the source wording, numerical values, numbering and subparts. Long examples are split without changing their order. The page-7 worked comparison and Example 3.1 are taught as one staged walkthrough. Blank working pages and the booklet's final additional-space section have no separate slides.

## Source clarifications

- **Page 10 rate notation:** the source displays `A=P(1+r/100)^n` but calls `r` a decimal. The approved correction keeps the formula and defines `r` as the **percentage rate per compounding period**. Uppercase `R` in `I=PRN` remains a decimal, as in the source. For 5%, the compound formula uses `r=5`, while the simple-interest formula uses `R=0.05`. Do not divide by 100 twice.
- **Example 4.1 daily compounding:** assume 365 compounding periods each year and 1460 periods over four years.
- **Example 4.5(b):** the interpolated model reaches $180 000 at about 3.14 years. At whole-year checkpoints the first value below $180 000 is year 4. No integer year gives exactly the target. Use trial and improvement; logarithms are not required.
- **Homework timing:** the booklet prints Homework 2 and 3 together after Example 4.4. The approved sequence assigns Homework 2 after Lesson 4 and Homework 3 after Lesson 5. Questions are unchanged.
- **Homework 4:** the front summary is blank, so allocations come from the complete box on p. 15.
- Round displayed money to cents unless the question requests whole dollars. Keep full precision in intermediate calculations. The models follow the same convention.
- The rates are mathematical assumptions, not claims about actual investment returns or all leaking tanks.

## Syllabus grounding

The supplied booklet identifies **Financial mathematics B (MA5-FIN-C-02)** and lists compound interest, depreciation, repeated simple-interest calculations for up to three periods, repeated multiplication using digital tools, the compound formula and comparisons of simple and compound interest. Lessons 2–5 follow that progression. Lesson 1 supplies percentage prerequisites; Lesson 6 follows the booklet's broader exponential applications.

The supplied syllabus box uses `FV=PV(1+r)^n` with decimal `r`; the lesson formula using percentage `r/100` is equivalent. No additional syllabus claims or textbook contents have been assumed.

## Hinge questions

Use four numbered choices, the shared hand icons and a default 60-second adjustable timer. Students begin with a **fist on their chest**, think independently, then show **1–4 fingers simultaneously** on the teacher's verbal “show” cue. The answer reveal is separate from the timer. Reset clears the selected answer and hides the explanation; navigation and the slide map pause running timers.

| Lesson | Correct choice | Key understanding |
|---|---:|---|
| 1 | 4 | Multiplying by 0.82 retains 82%, so the decrease is 18% |
| 2 | 3 | 2400(0.06)(9/12) calculates interest, not total amount |
| 3 | 2 | Year-two interest on $1100 at 10% is $110 |
| 4 | 4 | Monthly compounding at 12% p.a. for two years uses 5000(1.01)^24 |
| 5 | 2 | Two 15% decreases use 20000(0.85)^2 |
| 6 | 4 | 0.92 retains 92% and loses 8% of the current volume |

The revised Lesson 1 hinge deliberately contains **only one multiplier** and precedes successive changes. Choices: (1) 82% increase; (2) 18% increase; (3) 82% decrease; (4) 18% decrease.

Every hinge's presenter notes include the rationale, each distractor's misconception, and responses for a ready class, divided responses and a class needing further explanation. For divided responses, use paired justification and a second simultaneous poll before revealing.

## Interactive representations

All controls work by tap, click or keyboard, without accounts, data collection or external applets. Reset restores the booklet values and hides reveals. Changing model inputs resets or hides predictions as appropriate.

| Representation | Starting model | Controls | Follow-up |
|---|---|---|---|
| Successive percentages | $60, +5%, −10% | Starting amount, signed changes, reveal each calculation then the net dollar and percentage change | Why does the second percentage use a different base? |
| Simple/compound table | $2000, 6% p.a., three years | Principal, rate, separate interest/balance reveals | Which base stays fixed and which changes? |
| Compounding frequency | $8000, 5% p.a., four years | Frequency; reveal each balance | Why does more frequent compounding change the total? |
| Investment comparison | Example 4.3 | Whole-year checkpoint and graph reveal | Why does the difference grow over time? |
| Depreciation table | $38 000, 14% p.a. | Initial value, rate, next-year reveal | Why does the dollar loss change? |
| Target trials | $300 000, 15% decline, $180 000 target | Test time; independent graph reveal | What changes for whole-year valuations? |
| Tank and graph | 15 000 L, 6% loss/hour | Time, loss rate, 2 h/5 h presets, reveal | Why does the graph flatten? |

The investment graph's lines join whole-year checkpoints; they do not imply continuous interest crediting. The portfolio target graph uses an interpolated exponential curve. The tank is an idealised constant-percentage model. The target activity retains the latest six trial estimates on screen.

Additional activities are labelled separately from booklet examples. Lesson 6's population model is an idealised additional growth example. No external thinking-routine attribution or applet link is required for these locally authored prediction, sorting and paired-explanation prompts.

## Worked answer checks

| Example | Answer |
|---|---|
| 1.1 | Both methods give $81 |
| 1.2 | Both methods give $69 |
| 1.3 | Sale price $105.60 |
| 1.4 | $60, then $63, then $56.70; combined multiplier 0.945 |
| 1.5 | Original price $550 |
| 2.1 | Interest $585; total $6585 |
| 2.2 | 0.25 years = 3 months |
| 2.3 | 6% p.a. |
| 3.1 | $2120; $2247.20; $2382.03 |
| 3.2(i) | Simple interest $225; total $1725 |
| 3.2(ii) | Compound balances $1575; $1653.75; $1736.44 |
| 3.2(iii) | Extra interest $11.44 |
| 3.3 | $1248; $1297.92; $1349.84 |
| 4.1(a–d) | Annual $9724.05; semi-annual $9747.22; monthly $9767.16; daily $9771.09 |
| 4.1(e) | Value increases with frequency at the same quoted nominal annual rate |
| 4.2 | Interest $1966.81 |
| 4.3(a) | Compound interest $43 503, nearest dollar |
| 4.3(b) | Simple interest $21 120 |
| 4.3(c) | Extra interest $22 383, nearest dollar; $22 383.34 to cents |
| 4.4 | Remaining value $17 876.23 |
| 4.5(a) | $96 173.13 |
| 4.5(b) | About 3.14 years interpolated; year 4 is first whole-year value below target |
| 4.6(a) | 13 254 L |
| 4.6(b) | Approximately 11 008.56 L |
| 4.6(c) | V=15000(0.94)^t; V in litres, t in hours |

## Homework allocations

Textbook files were not supplied. References are copied from the booklet, not independently checked against textbook pages.

| Homework | Cambridge exercise | Mild | Medium | Spicy |
|---|---|---|---|---|
| 1 | Year 9, 1K | Q1, Q3, Q5, Q7, Q9 | Q3–Q5, Q9–12 | Q3, Q9–13 |
| 2 | Year 9, 1L | Q1, Q3–7 | Q1, Q3–7, Q8 | Q3–7, Q8, Q11, Q15–16 |
| 3 | Year 9, 1M | Q1, Q2–4 LHS, Q5–Q7 | Q2–4 LHS, Q6, Q7, Q9 | Q2–4 LHS, Q6, Q7, Q9, Q14 |
| 4 | Year 10, 3G | Q1, Q3 | Q3–Q6 | Q3–Q6, Q7, Q9, Q12 |

## Preview and publication

Edit the individual slide sources. Topic-only styles and models are in `financial.css` and `financial.js`; navigation, timed hinges and maths rendering use the shared assets.

From the repository root, run:

```bash
quarto preview courses/year-10/financial-mathematics/lessons/lesson-1.qmd
```

Render the site with `quarto render`. Follow the repository README for committing, pushing and manually running **Publish Quarto lessons**. Building or committing alone does not publish. Existing lesson URLs are unchanged.
