# Differential Calculus — teacher guide

## Lesson 1: Differentiating exponential functions

Year 12 Mathematics Advanced. Approved coverage: booklet pp. 1–7, Examples 1.1–1.8. Allow approximately 50 minutes with routine subparts completed independently; working every subpart together will take longer.

Opening format: What / Why / Prior learning. The purpose is grounded in a hypothetical medicine-concentration model, and the same question is revisited at the end. For later lessons, choose a real-world purpose, a mathematical capability or a verified historical motivation as appropriate; avoid a generic abstract “why”.

Objective: We are learning to differentiate exponential functions with any positive base.

Success criterion: I can select and apply the appropriate differentiation rules to an exponential function.

Confirmed prior learning: derivative of e^x. Assumed prerequisites: index/logarithm laws; chain, product and quotient rules.

## Sources and fidelity

- Supplied `12MAX - Differential Calculus.pdf`, Section 1, printed pp. 1–7. The original example numbering, expressions, prompts, subparts and homework question selections are retained. Blank working spaces are replaced by oral prompts/OneNote work. Split slides retain their original part letters.
- Official NESA Mathematics Advanced reference sheet (2027), page 2: https://curriculum.nsw.edu.au/file/65945a13-8dc4-4ebe-97bc-b274a8169734/mathematics-advanced-11-12-2024-reference-sheet.pdf (checked 19 November 2026). `media/reference-sheet-page-2.png` is the complete, uncropped page 2. Red CSS outlines mark the two exponential rows without modifying the source image. Enlarged formulas beside the page aid readability. The composite base-a rule is explicitly labelled as an extension, not part of the printed sheet.
- The hinge, medicine context and base-a composite generalisation are additional supporting material.
- The supplied booklet's source label for Example 1.8 is retained; the original 2018 exam paper was not rechecked. Homework labels and selections are checked against the booklet, not a separately supplied textbook.
- No new syllabus quotations or historical claims have been added.

## Presentation and controls

Use OneNote for the worked examples. Example 1.3, Example 1.5 and the medicine comparison each reveal their complete working in a single chunk using Next; Previous hides the whole chunk. The reference-sheet generalisation also reveals on Next. No separate step controls are used. The hinge retains its separate answer reveal. The shared hinge uses numbered options 1–4, the existing finger icons, adjustable timer, Start/Pause/Resume, Reset and separate answer reveal. Timer expiry must not reveal answers. Opening the slide map or leaving the hinge pauses its timer. Homework is on two slides (Exercises 5B and 5F); both are part of Homework 1.

## Slide notes and worked checks

### Differentiating exponential functions

Allow about 50 minutes with brief proofs and some routine subparts completed independently. A full class worked solution to every subpart will need more time. The cover illustration is schematic, not a scaled mathematical graph. Students already know d(e^x)/dx=e^x. Chain, product and quotient rules and logarithm laws are assumed prior learning. Work the booklet examples in OneNote; solutions are in these notes and the topic teacher guide. Keep the usual cover, then the approved What/Why/Prior learning opening.

### What, why and prior learning

The opening replaces the usual objective/success-criteria pair. Success criterion, revisited near the end: I can select and apply the appropriate differentiation rules to an exponential function. Briefly introduce the relevance: concentration models and their rates of change help inform dose timing. No calculation or prediction is required from students here. The final slide is a short teacher-led illustration with a hypothetical concentration model, a target minimum and a tangent showing the rate of decrease. The crossing time is found with logarithms; differentiation gives the instantaneous rate. Actual dose schedules also depend on absorption, repeated doses and patient-specific factors. Source context is recorded in the final slide notes.

### Previously · The natural exponential

About two minutes. The derivative of e^x is confirmed prior learning. Ask what differentiation tells us: instantaneous rate of change / gradient of the tangent. Do not re-derive e^x from first principles. Recall that natural logarithms and exponentials undo each other. a is a positive constant; this identity will allow any positive base to be rewritten with base e.

### Example 1.1

Preserve all parts. Work in OneNote. (a) du/dx=a. (b) y=e^u, dy/du=e^u. (c) dy/dx=e^u×a=ae^(ax+b). The exponent stays unchanged. The multiplier is the derivative of the entire exponent, not the exponent itself. b has derivative zero, but still remains in the exponent of the final answer. About three minutes.

### Example 1.2(a–c)

(a) y'=4e^(4x). (b) Rewrite y=e^(-2x), so y'=-2e^(-2x)=-2/e^(2x). (c) y'=15e^(3x-2). Do not apply the quotient rule unnecessarily to (b); the reciprocal is a useful index-law connection. In (c), the outside coefficient 5 stays and multiplies the derivative 3 of the exponent. Use selected parts as independent practice; no answers appear on this slide.

### Example 1.2(d–f)

(d) y'=-e^(-x). (e) y'=8e^(1-4x). (f) y'=1/2 e^(x/2). Ask students to identify the derivative of each exponent before calculating. In (e), the two negative factors give a positive derivative; the original function has negative values but is increasing. Do not conflate sign of function and sign of derivative. About five minutes for both Example 1.2 slides together.

### Example 1.3(a)

One press of Next reveals the complete conversion as a single chunk; Previous hides the whole chunk. Ask students to attempt the conversion, then justify both equalities using an inverse identity and an index law. Orange identifies the same constant ln a in every line. a>0 ensures ln a is defined. Even a=1 is allowed: it gives the constant function 1. This is an equivalent expression for the same function, not an approximation or a change of function. Follow-up: “We now have base e. What is the derivative of its exponent?” Answers remain hidden until deliberately revealed. After the working is shown, the next press of Next advances to the next slide.

### Example 1.3(b–c)

One press of Next reveals the complete working; Previous hides it as a single chunk. Connect the multiplier to the derivative of x ln a. ln a is a constant, not a logarithmic function of x; do not use a logarithmic differentiation formula. The final step uses e^(x ln a)=a^x again. Ask “Why does this recover our familiar result when a=e?” Because ln e=1. For 0<a<1, ln a<0, so the derivative is negative. For a=1, ln 1=0, giving the derivative of a constant. About five minutes for the two Example 1.3 slides.

### Example 1.4

Before part (b), ask: “Should the derivative be positive or negative? Explain.” This brief prediction connects a base between zero and one to decreasing exponential values. (a) y'=(ln 2)2^x. (b) y'=5 ln(1/3)(1/3)^x=-5 ln 3 (1/3)^x. Keep logarithms exact. Explain why ln(1/3)=-ln3. Do not change the base to 1/5 or move the coefficient 5 into the exponent. About three minutes.

### Example 1.5

The statement to prove is part of the original question and remains visible. Complete the short proof in OneNote, then press Next once to reveal both lines together to consolidate. Previous hides the whole proof. The entire exponent remains inside the exponential. Differentiate it separately and multiply. Follow-up for the next slide: “If the base were a rather than e, which extra constant would appear?” ln a. About three minutes.

### HSC reference sheet

Show the complete, uncropped page 2 of the official sheet. The red outlines are teaching annotations over the two exponential derivative rows; the underlying page image is unchanged. The formulas alongside the image are enlarged for readability. Point out the surrounding rules so students can locate the exponential entries on their own sheet. Press Next to reveal the composite base-a rule. This generalisation is our annotation, not text printed on the reference sheet. Derive by y=a^u, u=f(x): dy/du=(ln a)a^u and du/dx=f'(x), so dy/dx=f'(x)(ln a)a^(f(x)). Alternatively rewrite a^(f(x))=e^(f(x)ln a). Make both origins explicit: ln a from the base and f'(x) from the exponent. The chain rule still applies even though the a^x row does not print a composite version. The full page image is embedded for offline use; the full-sheet link requires internet. About three minutes.

### Hinge question

Additional diagnostic, not a booklet example. Numbered options 1–4 correspond to A–D in the approved plan; correct answer 3 (C). The constant base is 3 and the inner derivative is 2. Distractor 1 omits the chain-rule factor. Distractor 2 treats base 3 like base e and omits ln3. Distractor 4 incorrectly applies the power rule to a variable exponent. Default 60 seconds. Everyone keeps a fist on their chest and thinks independently; collect simultaneous 1–4 responses on the teacher's “show” cue. Timer expiry never reveals the answer. Ready: proceed to Example 1.6. Divided: pairs explain where each factor comes from, then revote. Needs explanation: rewrite 3^(2x+1)=e^((2x+1)ln3), differentiate the exponent explicitly, then retry. Allow around three minutes including discussion.

### Example 1.6(a–c)

(a) y'=6xe^(x²+3). (b) y'=4(ln2)2^(4x-1). (c) y'=e^(sqrt(x))/(2sqrt(x)), for x>0; the original function is defined at x=0 but has no finite derivative there. In (a), distinguish the outside 3 from the +3 inside the exponent. In (b), the base is 2 and the exponent is 4x−1; ln2 remains as a constant factor. Ask students to name the inner function and its derivative. About four minutes.

### Example 1.6(d–f)

(d) y'=(-2x+2)e^(-x²+2x). (e) y'=-e^(1/x)/x², x≠0. (f) y'=-2x(ln5)5^(1-x²). In (e), rewrite 1/x as x^-1 to find the inner derivative. In (f), both the -2x and ln5 factors are essential. Ask: “Which part of your answer comes from the exponent? Which comes from the base?” About four minutes.

### Example 1.7(a)

Identify the outer structure as a product before differentiating. Let u=x and v=e^(2x); u'=1 and v'=2e^(2x). y'=e^(2x)+2xe^(2x)=e^(2x)(1+2x). Product rule supplies two terms; chain rule is needed within the derivative of v. Ask which rule acts on the whole expression and which rule acts inside one factor. Work in OneNote. About three minutes.

### Example 1.7(b)

Let u=e^x, v=x²; u'=e^x and v'=2x. y'=(x²e^x−2xe^x)/x^4=e^x(x−2)/x³, x≠0. Retain the correct subtraction order and square the entire denominator. Accept product rule applied to x^-2 e^x as an equivalent method, if offered. Work in OneNote. About three minutes.

### Example 1.8

Preserve the booklet's source label “2018 Advanced HSC 11g”; the original examination has not been independently rechecked. Allow a short independent attempt before OneNote discussion. y'=[(x+1)e^x−e^x]/(x+1)²=xe^x/(x+1)², x≠−1. Teacher checking guide, not an official marking scheme: correct quotient-rule substitution, then correct simplification. About three minutes. No automatic worked-answer reveal.

### Key ideas

Invite students to explain the role of each factor rather than memorise a string of symbols. Ask a student to contrast Example 1.6(b), Example 1.7(a) and Example 1.7(b). Evidence of success: identifies the expression's structure, keeps the original exponential factor and includes all necessary derivative factors. Record concise key ideas in the booklet. About one minute.

### Why timing matters

A brief teacher-led demonstration of relevance, not a student exercise or a booklet example. Allow about one minute. Say: “Once a medicine has been absorbed, its concentration can fall as the body clears it. For some medicines we want to keep that concentration above a target level.” Show the model and curve, then press Next ONCE: the target line, crossing time, tangent and all explanatory text appear together. Previous hides the entire annotation chunk. No questions, subparts or independent calculation are assigned.

All numbers are illustrative: C(t)=80(1/2)^(t/4) mg/L, with t measured in hours after absorption is effectively complete. The target is 30 mg/L. Solving C(t)=30 gives t*=4ln(30/80)/ln(1/2)=5.660149997 hours. C'(t)=[ln(1/2)/4]C(t), so C'(t*)=30ln(1/2)/4=-5.198603854 mg/L per hour, approximately -5.20. The displayed C'(5.66) is also -5.20 to two decimal places. The blue tangent has this slope on the labelled scales. The graph runs from zero to twelve hours, with a vertical scale from zero to ninety mg/L.

Connect to the opening Why: concentration models show when a target is crossed; differentiation supplies the rate of change. The threshold crossing uses logarithms, not differentiation. Do not describe 5.7 hours as a prescribed time for a second dose: actual dose timing also depends on absorption, accumulation with repeated doses, the medicine and the patient. Keep these qualifications in the spoken explanation if relevant rather than turning the slide into a clinical exercise. Source for the modelling context: D. J. Birkett, Pharmacokinetics made easy 11: Designing dose regimens, Australian Prescriber (1996), https://australianprescriber.tg.org.au/articles/pharmacokinetics-made-easy-11-designing-dose-regimens.html. The model parameters are invented for this demonstration, not taken from the article.

### Homework 1 · Exercise 5B

Exact allocation from booklet p. 7. Homework 1 includes BOTH Exercises 5B and 5F, displayed on consecutive slides for readability. Retain Mild, Medium and Spicy choices. No questions have been added or removed. Textbook question content has not been independently checked.

### Homework 1 · Exercise 5F

Exact allocation from booklet p. 7. Homework 1 includes BOTH Exercises 5B and 5F, displayed on consecutive slides for readability. Retain Mild, Medium and Spicy choices. No questions have been added or removed. Textbook question content has not been independently checked.

## Initial build validation

- Rendered with Quarto 1.10.18; new topic, course and homepage listings rendered successfully.
- Symbolically checked 18 worked derivative results, including the hinge; domain caveats appear in notes.
- Chromium browser: all 21 slides navigated forward and backward; no mathematical renderer errors or unrendered data-math spans; no measured content overflow at the available 1363 × 936 viewport.
- Exercised derivation reveals, the shared hinge's Start/Pause/Resume, reset, duration change, manual answer reveal, wrong-answer feedback and timer expiry with the answer still hidden. Opening the slide map pauses the running timer; returning preserves state.
- Visually reviewed the opening, learning-purpose slide, reference-sheet extract, hinge and homework; checked course → topic → lesson links and the return link.
- WebKit, physical iPad and exact iPad viewport/touch emulation were unavailable through the supplied browser interface. Do not describe this as iPad-tested.
- The local preview service's live-reload injection conflicts with a literal closing body tag inside Quarto's embedded speaker-notes script. For the preview/export only, that string was escaped as a JavaScript slash escape, preserving its evaluated contents. The Quarto source and normal GitHub Pages render do not require this preview-only adjustment.

## Publish

Review and merge the lesson branch, then manually run Actions → Publish Quarto lessons → main. As documented in the repository README, merging alone does not publish the site. The new topic is discovered automatically by the existing course listing; no existing URLs were changed.

## Course placement

This topic belongs to Year 12 Mathematics Advanced. Homework retains the assigned Cambridge Year 12 Extension 1 textbook references. Topic and lesson aliases preserve the former Extension 1 URLs.

## Reference-sheet and reveal revision

The formula-sheet slide now keeps all of page 2 visible, with red outlines over the exponential derivative rows and enlarged formulas alongside. Example 1.3(a–c) uses Next/Previous fragments instead of separate reveal/hide/reset buttons. The reference-sheet chain-rule extension also uses Next.

The complete-page image proportions and red-outline placement were checked in Chromium. The later presentation simplification groups each proof into a single Next reveal.

## Presentation simplification

Example titles now show only their number and relevant subparts; the hinge title is simply “Hinge question”. Plain content on the shared background, teal headings and light separators replace the white content panels. Derivation working reveals as a whole chunk on Next. The medicine application now displays C(t)=80(1/2)^(t/4) with units, its derivative and quantified rates at zero and eight hours.

Latest checks: rendered all 21 slides with Quarto 1.10.18; checked the numerical medicine rates and their 1:4 ratio; confirmed every booklet example expression is unchanged. In Chromium at 1363 × 936, checked the single-chunk Next/Previous behaviour for both Example 1.3 slides and Example 1.5, the medicine reveal and its equation layout, the simplified opening and reference-sheet appearance, and no maths-renderer errors. Safari/WebKit and physical-iPad testing remain unavailable.

## Relevance demonstration

The ending is now a one-minute teacher demonstration with a concentration graph, a 30 mg/L target, a crossing at approximately 5.7 hours and a tangent rate of approximately -5.2 mg/L per hour. One Next click reveals the annotations and explanation together. It does not ask students to calculate a dosing schedule. The opening Why statement uses the same rationale.

Validation of the relevance demonstration: recalculated the threshold crossing and derivative, rendered with Quarto 1.10.18, and checked the graph, tangent, labels, single-click reveal and Previous hide in Chromium at 1363 × 936. No maths errors or measured slide overflow. SVG labels use native text in the same coordinate system as the graph, with no foreignObject. Safari/WebKit and physical-iPad testing were unavailable.


## Lesson 2: Differentiating logarithmic functions

Year 12 Mathematics Advanced. Approved coverage: booklet pp. 8–15, Examples 2.1–2.8, unchanged Homework 2. User-approved refinement: move the speaker context from the end to the opening as a hook. Sequence: cover, What / Why / Prior learning, speaker hook, Previously, Examples 2.1–2.4, full reference sheet, hinge, Example 2.5, logarithm-law simplification, Examples 2.6–2.8, Key ideas, Homework 2. Twenty slides, approximately 50 minutes with selected routine subparts independent.

Objective: We are learning to differentiate logarithmic functions.

Success criterion: I can select and apply the appropriate rules to differentiate a logarithmic function.

Source fidelity: supplied `12MAX - Differential Calculus.pdf`, Section 2. Example wording, numbers, notation and subparts are retained; scaffold blanks are completed through grouped proof reveals. The booklet's Extension 1 headers do not change the user-confirmed Advanced course placement. Homework still names the supplied Cambridge Year 12 Extension 1 textbook. No new syllabus quotations are added. Reference sheet is the same complete NESA page 2 used in Lesson 1; red outline positions now identify the logarithmic rows. The supporting sound hook, hinge and composite other-base generalisation are additional material.

All proof reveals use ordinary Next/Previous, with the entire proof appearing together. The sound hook's two tangents and both rate explanations share one fragment index. No custom reveal widgets have been added; the shared hinge retains a separate deliberate answer reveal and adjustable timer. Existing shared files and Lesson 1 content are unchanged; new CSS is scoped to new classes or adds new highlight classes.

### Differentiating logarithmic functions

Allow approximately 50 minutes, using selected routine subparts as independent practice. Every supplied example and subpart is retained. Work in OneNote; solutions and domain details are in presenter notes. The cover curve is schematic. The speaker context appears at the start as a one-minute hook, immediately after What / Why / Prior learning, as requested.

### What, why and prior learning

Success criterion, revisited in Key ideas: I can select and apply the appropriate rules to differentiate a logarithmic function. Introduce sound level as a logarithmic measurement, then move straight to the speaker hook. Prior differentiation of composite exponentials is established by Lesson 1; logarithm laws and product/quotient rules were also used there.

### Moving away from a speaker

Additional context, not a booklet example. Keep this to about one minute: ask for an informal prediction, then press Next once to reveal both tangents and rates together. Previous hides them together. This is a demonstration of relevance, not a student calculation task. The orange and blue points correspond to two and ten metres. The graph's vertical axis starts at 55 dB and is labelled accordingly; distances have a linear scale. The tangent slopes are correctly scaled.

The illustrative model has a sound level of 80 dB at one metre. For distances measured numerically in metres, $L(r)=80-20\log_{10}r$, so $L'(r)=-20/(r\ln10)$. At two metres the rate is approximately -4.3429 dB per metre; at ten metres it is approximately -0.8686 dB per metre. These are instantaneous rates, not the exact changes over the next whole metre. Do not equate decibel level with perceived loudness. The derivative formula can be mentioned verbally as the tool we will learn; no working is required at the hook.

The simplified outdoor model assumes a compact sound source at distances large relative to its size, with negligible reflections and other attenuation. It is not intended to model a reverberant classroom or a large concert speaker array. Source for the inverse-square/distance relationship: UNSW School of Physics, “dB: What is a decibel?”, sections “Intensity, radiation and dB” and “Example problems”, https://animations.physics.unsw.edu.au/jw/dB.htm (checked 20 November 2026). The reference level and calculated tangent values are our illustrative choices. Follow-up: the curve falls at both points, but which tangent has the larger magnitude? Connect its flattening to the reciprocal in the derivative later. As requested, there is no second context slide at the end.

### Previously

About two minutes. Recall the chain-rule factor in the derivative of an exponential from Lesson 1. The inverse identity is the starting point for Example 2.1. In the change-of-base identity, a is a constant, so ln a is constant. Do not anticipate the new logarithm derivative before students reason through the proof.

### Example 2.1

Keep the derivative of ln x as an unknown while differentiating the composition. (a) $(d(\ln x)/dx)e^{\ln x}=1$. (b) Substitute the inverse identity to obtain $(d(\ln x)/dx)x=1$. (c) Divide by x, which is positive and therefore nonzero. Work in OneNote, then reveal the complete proof in one Next click; Previous hides it. The booklet's scaffold blanks are completed in the grouped reveal. Do not claim this proves differentiability from first principles; this is the syllabus-style chain-rule derivation. About four minutes.

### Example 2.2

(a) Change base to ln x/ln a. (b) The factor 1/ln a is constant because a is constant; its derivative is not needed. (c) The derivative is 1/(x ln a). Domains: x>0, a>0, a≠1. For a=e, ln e=1 recovers 1/x. Compare Lesson 1: exponential derivatives multiply by ln a; logarithmic derivatives divide by ln a. The conversion and all differentiation working reveal together on Next, after students attempt them in OneNote. Previous hides the whole group. About four minutes.

### Example 2.3(a–c)

Solutions: (a) $y'=4/x$; (b) $y'=1/(x\ln10)$; (c) $y'=1/(5x)$. All have domain x>0. Distinguish an outside coefficient from a logarithm base. Keep exact logarithms in denominators. Work in OneNote; no answers reveal on this slide. Around five minutes for both Example 2.3 slides, with selected parts independent.

### Example 2.3(d–f)

Solutions: (d) $y'=1/(x\ln2)$; (e) $y'=6x^2-3/x$; (f) $y'=2/(x\ln5)$. Domains x>0. ln 2 and ln 5 are constants. Retain the original numbers and subpart labels; no answers are shown on the student slide.

### Example 2.4

Outer derivative is 1/u; inner derivative is f'(x). Substitute u=f(x) after multiplying: f'(x)/f(x). Keep the entire argument in the denominator. Reveal the complete proof as one chunk on Next. The orange numerator is the derivative of the whole argument. The function is ln f(x), defined where f(x)>0, and f must be differentiable there. Do not change the question to ln|f(x)|; the booklet explicitly distinguishes the later integral result involving an absolute value. About three minutes.

### HSC reference sheet

The full reference-sheet page is unchanged and uncropped. Red outlines highlight only the two logarithmic derivative rows. Enlarged formulas alongside reproduce the printed derivatives. The composite other-base rule appears as a single Next reveal and is clearly labelled as our extension of the sheet. Domains: argument positive; constant base positive and not one. All primes use superscript prime notation. The original page is embedded for offline use; the link requires internet. About two minutes.

### Hinge question

Additional diagnostic, not a booklet example. Correct choice 3: y'=5/(5x)=1/x for x>0. Choice 1 omits the chain-rule multiplier. Choice 2 incorrectly uses x in the denominator while retaining the inner derivative 5. Choice 4 differentiates only the argument, ignoring the outer logarithm. Equivalent reasoning: ln(5x)=ln5+lnx, with ln5 constant. Default 60 seconds. Fist on chest; think quietly; simultaneous 1–4 fingers on the teacher's “show” cue. Timer expiry must not reveal the answer. Ready: proceed to Example 2.5. Divided: compare the chain-rule calculation with the logarithm-law expansion and revote. Needs explanation: identify outer ln u and inner u=5x; write dy/du=1/u and du/dx=5 before substituting, then retry. About three minutes including discussion.

### Example 2.5

(a) y'=3/(3x-2), original domain x>2/3. (b) y'=2x/(x^2+1), all real x. (c) y'=e^x/(1+e^x), all real x. The numerator is the derivative of the entire argument; the denominator keeps the entire argument. In (b), the function is defined even for negative x because x^2+1>0. For (c), keep the sum intact; ln(1+e^x) is not ln1+ln(e^x). Work in OneNote; around five minutes.

### Simplify before differentiating

Additional explanation immediately between Examples 2.5 and 2.6. Allow one to two minutes. Ask: “If we apply the chain rule directly, what rule would we need to differentiate the argument?” For ln(fg), the inner derivative would use the product rule; for ln(f/g), it would use the quotient rule. Expanding with logarithm laws first makes the outer expression a sum or difference of simpler logarithms. One Next click reveals both derivatives and the explanation together; Previous hides the whole group.

These are applications of the known logarithm laws and chain rule, not extra formulas to memorise. The direct methods remain valid: (f'g+fg')/(fg)=f'/f+g'/g, and [(f'g-fg')/g^2]/(f/g)=f'/f-g'/g. Each simpler argument may still require differentiation, including a product or quotient rule if that simpler argument itself has one. The positive-function assumption permits the displayed real logarithm expansions; do not infer that a positive product or ratio alone makes each separate logarithm defined.

Log laws apply to a product or quotient inside one logarithm. They do not remove the product rule for x^2 ln x or the quotient rule for (ln x)/x^3 in Example 2.7. There is no law that splits ln(f+g). Keep Example 2.6's particular expansion and solution for the following slide and OneNote working.

### Example 2.6

(a) y=ln2+lnx-ln(x+1). The stated x>0 ensures all separate logarithm arguments are positive. (b) y'=1/x-1/(x+1)=1/[x(x+1)]. ln2 differentiates to zero. The chain rule combined with the quotient rule also works but is less direct. Ask: “Which logarithm law saves us a quotient-rule calculation?” The original function also exists on x<-1, but the question explicitly restricts x>0; preserve that condition rather than silently extending this expansion. Around four minutes; solutions remain in notes for OneNote.

### Example 2.7(a)

The source uses log_e x; preserve that notation, then identify it with ln x in the working. Product rule: y'=2x ln x+x^2(1/x)=2x ln x+x=x(2 ln x+1). Domain x>0. Do not multiply the two derivatives. Around four minutes across both Example 2.7 slides.

### Example 2.7(b)

Quotient rule: y'=[x^3(1/x)-3x^2 ln x]/x^6=(1-3 ln x)/x^4, x>0. The numerator order matters. Alternatively write x^(-3) ln x and apply the product rule. Ask which structure students recognise before starting. Preserve the original quotient on the question slide.

### Example 2.8

Booklet source attribution retained: 2015 Advanced HSC 11f (2 marks). The original examination paper has not been independently rechecked. Product rule gives y'=ln x+(x+4)/x=ln x+1+4/x, x>0. A useful informal two-mark guide is one mark for correct product-rule substitution and one for the correct derivative; this is not claimed to reproduce the official marking guidelines. Use as a short independent consolidation before collecting a response. Around three minutes.

### Key ideas

Consolidate in the booklet. Ask students to contrast the structures of Examples 2.5, 2.6 and 2.7. If useful, refer verbally to the opening sound graph: differentiating 80-20log_10 r gives -20/(r ln10); the reciprocal dependence explains why the curve becomes less steep as r increases. No repeated context slide or additional student calculation is needed. Around one minute.

### Homework 2 · Exercise 6B

Exact allocation from booklet p. 15 and the Homework 2 summary. Homework 2 includes BOTH Exercises 6B and 6F, shown on consecutive slides. All Mild, Medium and Spicy selections are retained. Textbook question content has not been independently inspected. No advice or extra tasks are added to the homework slide.

### Homework 2 · Exercise 6F

Exact allocation from booklet p. 15 and the Homework 2 summary. Homework 2 includes BOTH Exercises 6B and 6F, shown on consecutive slides. All Mild, Medium and Spicy selections are retained. Textbook question content has not been independently inspected. No advice or extra tasks are added to the homework slide.

### Lesson 2 validation

- Rendered the nineteen-slide lesson and topic listing with Quarto 1.10.18.
- Symbolically verified fifteen derivative results: every routine booklet derivative, the hinge and the sound model. Recomputed both sound rates.
- Chromium at 1363 × 936: navigated the full sequence forward and backward, including grouped proof reveals and Previous hiding them. No mathematical renderer errors, unrendered data-math spans, nested slide sections or measured slide overflow.
- Visually reviewed the opening, sound graph, change-of-base proof, full reference-sheet page and red outlines, hinge and homework. Native SVG graph labels stay in the same coordinate system; no foreignObject is used.
- Confirmed both sound tangents and both rate explanations reveal together on one Next press, and hide together on Previous.
- Exercised hinge Start/Pause, reset, duration selection, expiry with answer hidden, incorrect selection and deliberate answer reveal. Opening the slide map pauses the timer; returning shows Resume and keeps the answer hidden after reset.
- Confirmed course → topic → Lesson 2 navigation and the return-to-topic link; both lessons appear under Mathematics Advanced.
- WebKit, exact iPad viewport/touch emulation and physical-iPad testing were unavailable in the supplied browser interface. Do not describe this as iPad-tested.
- Standalone HTML embeds all local assets and mathematics. Its Topic lessons link points to the existing hosted topic. The preview/export alone escapes literal closing body/html tags inside Quarto's notes script to avoid the managed preview relay's live-reload injection conflict; source and GitHub Pages rendering are unaffected.

Publication remains manual: after merging the lesson branch, run Actions → Publish Quarto lessons → main. A branch or PR alone does not publish the lesson.

### Logarithm-law transition revision

Added “Simplify before differentiating” immediately after Example 2.5 and before Example 2.6. It contrasts a product and quotient inside a logarithm, shows the log-law expansion first, and reveals both differentiated forms and the explanation together on Next. Notes distinguish this from the product/quotient rules still needed for the outer expressions in Example 2.7. The positive-function assumptions are explicit.

Rendered the revised twenty-slide lesson and topic listing with Quarto 1.10.18. Checked both displayed derivative identities symbolically. Chromium at 1363 × 936: verified the insertion order, single-chunk reveal and Previous hide, full forward/back navigation, and no maths-renderer errors or overflow on the added slide. No new interactive diagram or control was introduced; the previously validated hinge is unchanged. WebKit and physical-iPad testing remain unavailable.


## Lesson 3 — Differentiating trigonometric functions
Approved scope: Year 12 Mathematics Advanced, Section 3, Examples 3.1–3.11 (pp. 16–25), Key Ideas and Homework 3 (p. 26). Twenty-seven slides. The spring context shows the purpose of trig derivatives without referring to future study in another course. Approximately 60 minutes if selected routine subparts are completed independently; working every subpart together will take longer.
Source fidelity: all supplied example numbers, subparts, expressions, values and homework selections are retained. Fill-in proof scaffolds are supported by complete, grouped Next reveals. The informal graphing application and spring demonstration are additional teaching aids. No new syllabus attribution is inferred from the booklet’s Extension 1 headings.

### Differentiating trigonometric functions

Allow approximately 60 minutes with selected routine subparts completed independently. All booklet examples and subparts are included. Use OneNote for working; routine solutions are in notes. The spring hook is an additional context, not a booklet exercise. It does not assume any later course enrolment.

### What, why and prior learning

Success criterion, revisited at the end: I can select and apply the appropriate rules to differentiate a trigonometric function. Connect directly to the spring hook. Radians, trigonometric graphs and reciprocal identities are prerequisite recall rather than claims about the previous lesson.

### A mass on a spring

Additional hook, approximately two minutes. A>0 and omega>0 are constants; x measures signed displacement from equilibrium, not distance travelled. Play or drag the cycle slider; quarter-cycle buttons give exact turning points and equilibrium crossings. Pause at the right turning point, then at equilibrium. Ask students to notice where the mass is fastest, rather than calculate.

One Next reveals velocity, acceleration, their arrows and the takeaway together. Differentiate with respect to t twice: v=-A omega sin(omega t), a=-A omega^2 cos(omega t)=-omega^2 x. At either turning point v=0 but acceleration is largest in magnitude. At equilibrium acceleration is zero and speed is greatest. The acceleration always points towards equilibrium when displacement is nonzero. This proportional restoring acceleration defines simple harmonic motion. Arrows are schematic and separately scaled; do not compare lengths of displacement, velocity and acceleration as though they had the same units. No damping or driving force is modelled. Motion starts only on Play and pauses when leaving the slide, opening the slide map or hiding the tab. Reset returns to the right turning point but preserves the teacher-controlled reveal state. This is a relevance demonstration, not an extra student exercise. No reference to another course is needed.

### Previously

The first two rules were covered in Lessons 1 and 2. Ask which factor comes from differentiating the inside, then briefly recall when to use the product and quotient rules. The trigonometric identities and radians are prerequisite recall. Use each reciprocal identity only where its denominator is nonzero. Approximately two minutes.

### Example 3.1

Booklet Example 3.1: (a)–(b). The exact five angles and gradient values are retained. Move the tangent using the slider or angle buttons. The graph uses equal horizontal and vertical unit scales, so the tangent angle represents its gradient faithfully. Students estimate and record the gradients first; the right-hand axes and table are deliberately blank. Next reveals the completed table, linked derivative curve and derivative rule simultaneously. Previous hides them together. The derivative graph includes the five recorded points and the current gradient point; its values agree with the slope of the tangent on the left. Gradients: 1, 0, -1, 0, 1. Match cosine. This local graphing application supports part (d); five sample points alone do not prove the rule for every x. The plotted derivative is the exact derivative curve, providing an informal graphical verification rather than a formal proof. Radians are essential. Allow about five minutes across both slides.

### Example 3.1

Booklet Example 3.1: (c)–(d). The exact five angles and gradient values are retained. Move the tangent using the slider or angle buttons. The graph uses equal horizontal and vertical unit scales, so the tangent angle represents its gradient faithfully. Students estimate and record the gradients first; the right-hand axes and table are deliberately blank. Next reveals the completed table, linked derivative curve and derivative rule simultaneously. Previous hides them together. The derivative graph includes the five recorded points and the current gradient point; its values agree with the slope of the tangent on the left. Gradients: 0, -1, 0, 1, 0. Match negative sine. Ask why the derivative of cosine needs a minus sign. This local graphing application supports part (d); five sample points alone do not prove the rule for every x. The plotted derivative is the exact derivative curve, providing an informal graphical verification rather than a formal proof. Radians are essential. Allow about five minutes across both slides.

### Example 3.2

(i) 3 cos x. (ii) (1/2) sin x: two negative signs cancel. (iii) 2 cos x-4 sin x. (iv) 2x+sin x. Work in OneNote. All domains are real. About three minutes, selecting some parts for independent practice.

### Example 3.2

Differentiate first: dy/dx=2 cos x. At pi/6, gradient=2(sqrt(3)/2)=sqrt(3). Distinguish the function value 1 from the gradient sqrt(3). Keep the exact value. About one minute.

### Example 3.3

u'=cos x, v'=-sin x. Subtraction of the negative term produces a plus; use sin²x+cos²x=1. All equalities hold where cos x is nonzero. The booklet's fill-in scaffold is represented by the prompts and the complete proof is one Next reveal, after OneNote working. About two minutes.

### Example 3.3

The negative exponent means reciprocal, not the inverse cosine function. Differentiate the outer power and inner cosine. The negatives cancel. Domain cos x != 0. Complete proof reveals in one chunk after working. About two minutes.

### Example 3.4

Work both proofs in OneNote before one Next reveals both complete chunks. (a) requires sin x nonzero. (b) Source qualification: cot x=1/tan x is only valid where tan x exists and is nonzero. The displayed chain-rule proof therefore excludes x=pi/2+k pi, even though cot x is defined there. To justify the final derivative on cotangent's full domain, use cot x=cos x/sin x and the quotient rule: [-sin²x-cos²x]/sin²x=-cosec²x for sin x != 0. Preserve the supplied question; do not silently replace it. Negative exponents denote reciprocals, not inverse trigonometric functions. About three minutes.

### Example 3.5

(i) 5 sec²x. (ii) -2 sec x tan x. (iii) -(1/2)cosec²x. Results hold on the corresponding function domains. Emphasise signs and constant multiples. About three minutes across both (a) slides.

### Example 3.5

(iv) -4 cosec x cot x. (v) sec x tan x+sec²x. (vi) -cosec x cot x-sec²x. Use the domains of the original functions. In (vi) both terms have negative signs after differentiating.

### Example 3.5

dy/dx=3 sec²x. At pi/4, sec²(pi/4)=2, so the gradient is 6. Distinguish sec²x from sec(x²). About one minute.

### Example 3.6

The argument f(x) remains intact; multiply by its derivative. Orange highlights the inner derivative, with proper superscript prime typography. All three completed results appear in one Next reveal, after working. Assume f is differentiable, angles in radians; the tangent rule holds where cos f(x) != 0. About three minutes.

### HSC reference sheet

Entire unchanged page 2 is embedded, with red outlines on the sine, cosine and tangent rows. The enlarged formulas retain the printed composite forms. Reciprocal derivatives are not printed; the preceding proofs recover them. This sheet image and source link are the same supplied/verified resource used in Lessons 1 and 2. Around one minute.

### Hinge question

Additional diagnostic, not a booklet example. Correct choice 3: y=[sin(3x)]², so y'=2 sin(3x)·cos(3x)·3. Choice 1 omits the inner factor 3. Choice 2 differentiates sine then squares the derivative instead of applying the power rule. Choice 4 omits the cosine factor from differentiating sine. Show 1–4 fingers simultaneously using the on-screen routine. 60-second timer; expiry does not reveal the answer. Ready: proceed to Example 3.7. Divided: rewrite [sin(3x)]², identify the square, sine and linear layers, then revote. Needs explanation: differentiate the square, sine and 3x separately before combining and retrying. Around three minutes.

### Example 3.7

(a) 2 tan x sec²x, where cos x != 0. (b) 4 sin³x cos x. Rewrite powers as [tan x]² and [sin x]⁴ if needed. The exponent belongs to the whole trigonometric value. About four minutes across both slides.

### Example 3.7

(c) -4 sin 4x. (d) 6 sin²(2x) cos(2x). (e) 6x cos(3x²). All real x. In (d), identify the outer cube, then sine, then 2x. In (e), retain the entire argument 3x² after differentiating the sine.

### Example 3.8

(a) e^(sin x) cos x, all real x. (b) sec²x/tan x on intervals where tan x>0 (and defined). (c) cos x/sin x=cot x, on intervals where sin x>0. Simplifying the derivative does not enlarge the original logarithm domain. About four minutes across both slides.

### Example 3.8

(d) -e^(-x) cos(e^(-x)), all real x. (e) -sin(ln x)/x for x>0. Compare (a) with (d): the outer function changes. Students should identify the structure before differentiating.

### Example 3.9

Booklet attribution retained; the original examination paper has not been independently checked. f'=2 cos(2x), f''=-4 sin(2x). Therefore cos(2x)=-sqrt(3)/2 and sin(2x)=-1/2, with 0<2x<2pi. Both conditions hold at 2x=7pi/6, so x=7pi/12. Checking only the first derivative also gives 5pi/12, which fails f''=2. Verify the common solution in both derivatives. Link verbally to the spring model: the second derivative describes how the rate itself changes. No full solution reveal is needed; use OneNote. About four minutes.

### Example 3.10

Product rule gives dy/dx=e^x cos x-e^x sin x=e^x(cos x-sin x), all real x. Ask whether the function is a product or composition. About three minutes across both slides.

### Example 3.10

Quotient rule: y'=(x cos x-sin x)/x² for x!=0. Alternatively write x^(-1) sin x and use the product rule. Keep the numerator order consistent. The original function is not defined at zero; no extension by continuity is requested.

### Example 3.11

Booklet attribution retained; the original examination paper has not been independently checked. Product rule: 2x sin x+x² cos x. All real x. Use as short independent consolidation, around two minutes. Do not multiply the separate derivatives.

### Key ideas

Consolidate in the booklet. The product and quotient rules still apply when trigonometric functions are multiplied or divided by other functions. Briefly reconnect to the spring: x(t) gives position relative to equilibrium, x-prime(t) gives velocity and x-double-prime(t) gives acceleration. No additional exercise is needed. Approximately one minute.

### Homework 3 · Exercise 7B

Exact Homework 3 allocation from booklet p. 26. The textbook title remains Cambridge Year 12 Extension 1 as assigned; this lesson is listed under Year 12 Mathematics Advanced. All Mild, Medium and Spicy selections are preserved. Textbook question content has not been independently inspected.

### Lesson 3 validation

- Rendered Lesson 3 and the updated topic listing with Quarto 1.10.18: 27 slides, one ordered include per slide, no nested slide sections.
- Symbolically checked 28 derivative results, both exact-gradient calculations, both simultaneous derivative conditions in Example 3.9 and both spring derivatives. Domain qualifications remain in the presenter notes.
- Chromium at 1363 × 936: navigated the complete sequence forward and backward, including grouped proof reveals and Previous hiding the complete groups. Checked for mathematical rendering errors, missing inline maths and measured layout overflow across the example, reference, hinge and final slides.
- Visually reviewed the cover, spring in positive and negative displacement states, sine exploration before and after its reveal, complete reference-sheet page with all three red outlines, composite and reciprocal proofs, hinge, key ideas and homework.
- Verified all five sine and cosine sample gradients, moving tangent controls and simultaneous table/derivative reveals. Native SVG paths keep mathematical labels in the same coordinate system as their diagrams; no foreignObject is present.
- Exercised spring Play/Pause, quarter-cycle positions, slider, Reset and slide-map pause. At turning points velocity is zero and acceleration opposes displacement; at equilibrium acceleration is zero and speed is greatest. Reset returns to the right turning point and preserves reveal state.
- Hinge: verified answer 3, every distractor, adjustable duration, Start/Pause/Resume, Reset, incorrect selection, deliberate answer reveal and timer expiry with the answer still hidden.
- Checked the topic return link and the Mathematics Advanced topic listing with all three lessons. Existing URLs and Lessons 1–2 are unchanged.
- WebKit could not run because its required host libraries are unavailable. Exact iPad viewport/touch emulation, portrait/landscape rotation and physical-device tests were not available through the supplied browser interface. This is a Chromium check, not an iPad compatibility certification.
- The standalone export embeds all local assets and maths. Its return link points to the existing hosted topic. The local preview/export escapes literal closing body/html tags inside Quarto's notes script to prevent the preview relay injecting its reload script there; normal source and GitHub Pages rendering are unchanged.

Publish after merging by running Actions → Publish Quarto lessons → main. A draft PR does not publish the lesson.
