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

The new opening intentionally replaces the usual objective/success-criteria pair. Success criterion, revisited near the end: I can select and apply the appropriate differentiation rules to an exponential function. Use the medicine as a hypothetical exponential-decay model, not a claim that every medicine behaves this way. Ask orally: “A model starts at 80 mg/L and the concentration halves every four hours. Will it be falling at the same rate after eight hours as initially?” Take predictions without solving yet. Intended distinction: constant percentage decrease versus changing absolute rate of decrease. Return to the question near the end. No medical decisions or dosage calculations are involved.

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

### Medicine concentration

Additional hypothetical model, not a booklet example. Revisit the opening prediction: an initial concentration of 80 mg/L halves every four hours. The units of C'(t) are mg/L per hour, equivalently mg L^(-1) h^(-1). Invite students to differentiate the model in OneNote before pressing Next. One press reveals the derivative, both numerical rates and the comparison together; Previous hides that whole worked chunk. The chain-rule factor is 1/4 and ln(1/2)=-ln2. C'(0)=-20ln2≈-13.86294361 and C'(8)=-5ln2≈-3.46573590. The negative signs indicate decreasing concentration. C(8)=20 mg/L and C'(8)=C'(0)/4, so |C'(8)|/|C'(0)|=1/4. Distinguish the instantaneous rate after eight hours from the average change over the first eight hours, (20-80)/8=-7.5 mg/L per hour. The same percentage decrease over equal intervals does not imply a constant absolute rate. This is a mathematical model, not a statement about a particular medicine or dosage. Allow about three minutes.

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
