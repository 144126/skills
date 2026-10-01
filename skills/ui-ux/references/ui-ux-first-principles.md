# UI/UX first principles

What makes an interface look professional, feel pleasant, stay memorable, and keep people engaged.

Floor, then layers. One more "why" after the floor is a different question (evolution / survival).

## The floor

A nervous system is a limited channel. It has to represent the world with as few spikes as it can, then stay a good model of that world.

Efficient coding (Barlow 1961): spikes are a code that "minimized the number of spikes needed to transmit a given signal" and that "aims to maximize available channel capacity by minimizing the redundancy between representational units." — https://en.wikipedia.org/wiki/Efficient_coding_hypothesis

Predictive processing (PP): the brain keeps guessing the next input. Mismatch is prediction error. Aesthetic pleasure is the feeling you get when you reduce that error better than usual.

> Aesthetic pleasure is "the positive affective feedback that we get when we are more successful than usual in making sense of our environment (or, in PP terms, in reducing prediction error)" and "the mark of a cognitive and existential conquest." The percepts that give more pleasure are "those that allow for more reduction in prediction error" and the why is "because they ensure our viability as models of the world." — https://pmc.ncbi.nlm.nih.gov/articles/PMC10725766/

That is the root. Pleasant UI is cheap, successful sense-making. Stimulating UI is sense-making that is not free: a gap you can close. Memorable UI is the few moments that survive compression. Professional UI is the look of a typical, low-complexity member of its class. Engaging UI keeps a goal, a gap, or a need alive.

One more "why" (why viability, why compression evolved) is biology, not interface design. Evidence for a deeper UI-specific layer stops here.

## How the brief words split

These are not one thing.

| Word | Channel | Mechanism |
|---|---|---|
| Pleasant / aesthetic | Pleasure | High fluency; error already low |
| Stimulating / engaging | Interest + wanting + needs | Disfluency you can reduce; a knowledge gap; autonomy / competence / relatedness |
| Memorable | Memory compression | Peak + end; isolation; familiarity |
| Professional | First-glance typicality | Low visual complexity + high prototypicality in ~17–50 ms |
| Awesome | Mixed | Peak intensity + competence + a closeable gap |

Pleasure and interest are two routes, not one liking score.

> "aesthetic pleasure and aesthetic interest are two distinct positive aesthetic responses" — https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00015/full

> "the effect of stimulus fluency on pleasure is mediated by a gut-level fluency experience. Stimulus fluency and interest, by contrast, are related through a process of disfluency reduction" — same paper, abstract

So a pretty-but-dead screen and a rough-but-gripping one are not design failures of the same kind. They hit different channels.

## Layers (shortest first)

### 1. Fluency is marked as good

> "Processing fluency is itself hedonically marked (that is, it possesses an inherent affective quality) and high fluency is subjectively experienced as positive." Things that raise fluency: "goodness of form, symmetry, figure-ground contrast" and "repeated exposure or prototypicality." — https://en.wikipedia.org/wiki/Processing_fluency_theory_of_aesthetic_pleasure

Too simple can be discounted (you see the source of the ease). Too complex stays disfluent. That is the inverted-U, not a taste slogan.

> "very complex patterns are not judged as beautiful because they are disfluent, and patterns are judged as more beautiful when they become less complex." — same page

Website first glance is this, timed.

> "In less than 50 milliseconds, users build an initial “gut feeling”" and "both visual complexity and prototypicality play crucial roles" "between 17 and 50 milliseconds." High complexity looks less beautiful even if familiar; low prototypicality looks uglier even if simple. "users strongly prefer website designs that look both simple (low complexity) and familiar (high prototypicality)." — https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/

That is "professional." It is typical + simple, judged before a blink.

### 2. The math is order over leftover uncertainty, not φ

Birkhoff wrote M = O/C. Later work restates O as compression of uncertainty.

> "Birkhoff's Aesthetic Measure is presented as the ratio between the algorithmic reduction of uncertainty (order) and the initial uncertainty (complexity)." — https://imae.udg.edu/~rigau/Publications/Rigau07B.pdf

A direct test of "prefer high symmetry, low complexity" does not give one human curve.

> "Birkhoff’s aesthetic-measure hypothesis predicts that people prefer images high in symmetry and low in complexity, and dislike the opposite." Result: "most, but not all subjects, formed two distinct natural clusters, termed “islands,”" — https://pmc.ncbi.nlm.nih.gov/articles/PMC10700581/

The golden ratio is not a facial or proportion law.

> "There is no convincing evidence that the golden ratio is linked to idealized human proportions or facial beauty." — https://pmc.ncbi.nlm.nih.gov/articles/PMC10792139/

Type scales (1.25, 1.333, 1.5) and 8-point grids are consistency tools. They raise fluency by removing one-off sizes. They are not a discovered constant of beauty.

### 3. Sensation is log / power, not linear

Just-noticeable difference: the smallest change noticed at least half the time. Weber: that step is a roughly constant fraction of the current level. Stevens: perceived magnitude is a power of physical intensity.

> a JND is "the amount something must be changed in order for a difference to be noticeable, detectable at least half the time." "the JND is a constant proportion/percentage of the reference level." Stevens "raises the stimulus to a constant power" — https://en.wikipedia.org/wiki/Just-noticeable_difference

UI consequence: spacing, type, motion, and color steps have to jump a fraction of the current size, not a fixed pixel. Tiny tweaks on a large heading are invisible. The same tweak on 12 px type is a shout.

### 4. Working memory is about 3–5 chunks

> "a central memory store limited to 3 to 5 meaningful items in young adults" and "a central working memory faculty limited to 3–5 chunks in adults" — https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/

Miller's 7±2 is the older, looser number (lists you can rehearse). Cowan's 3–5 is the store you get when rehearsal is blocked. Screens that ask you to hold a form, a rule, and three statuses at once are already over the limit.

Cognitive load theory names the three ways that budget is spent.

> "CLT was developed by John Sweller in 1988, who described “cognitive load” as the amount of information working memory can hold at one time." — https://pmc.ncbi.nlm.nih.gov/articles/PMC10804965/

> three types: intrinsic ("the effort associated with a specific topic"), germane ("the work put into creating a permanent store of knowledge (a schema)"), extraneous ("the way information or tasks are presented to a learner") — https://en.wikipedia.org/wiki/Cognitive_load

Professional UI spends the budget on the task (intrinsic + germane), not on decoding the chrome (extraneous).

### 5. Grouping is almost free; search is not

Near things group.

> "Objects that are near, or proximate to each other, tend to be grouped together." "Elements in close proximity are perceived to share similar functionality or traits." — https://lawsofux.com/law-of-proximity/

A shared box groups even harder.

> "items within a boundary are perceived as a group and assumed to share some common characteristic or functionality" — https://www.nngroup.com/articles/common-region/

Preattentive pop-out (color, size, orientation) is seen in 50–200 ms, and count does not wreck it the way serial search does.

> You can "detect their presence (or tell their absence) and point to where they were", "estimate how many", "detect boundaries between groups" "even if you only saw this image for a fraction of a second (50–200ms)" — https://eagereyes.org/blog/2015/treisman-preattentive-processing

Hierarchy is this fact used on purpose: one pop-out for the next act, grouping for the rest.

### 6. Time and pointing have equations

Fitts (pointing): time grows with log2(distance / width).

> "The law predicts that the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target." ID = log2(2D/W) — https://en.wikipedia.org/wiki/Fitts%27s_law

Hick (choice reaction): time grows with log2 of alternatives, because people bisect.

> "increasing the number of choices will increase the decision time logarithmically." "eliminating about half of the remaining choices at each step" — https://en.wikipedia.org/wiki/Hick%27s_law

Honest limit in real UI: menus you already know are not Hick experiments.

> "(1) Hick’s law speaks against, not for, the popular principle that ‘less is better’; … (3) the stimulus-response paradigm is rarely relevant to HCI tasks, where choice-reaction time can often be assumed to be constant" — https://perso.telecom-paristech.fr/rioul/publis/202001liugoririoulbeaudouinlafonguiard.pdf

Latency bands (Nielsen, stable for decades):

> "0.1 second is about the limit for having the user feel that the system is reacting instantaneously" / "1.0 second is about the limit for the user's flow of thought to stay uninterrupted" / "10 seconds is about the limit for keeping the user's attention focused on the dialogue." — https://www.nngroup.com/articles/response-times-3-important-limits/

Doherty (IBM 1982) moved the old 2 s bar to 400 ms.

> "set the requirement for computer response time to be 400 milliseconds, not 2,000 (2 seconds) which had been the previous standard." Under 400 ms, use was called “addicting.” — https://lawsofux.com/doherty-threshold/

### 7. People forage; they do not read sites

> "Information foraging is the fundamental theory of how people navigate on the web to satisfy an information need." They weigh "information scent" against "the perceived effort needed to extract that info." — https://www.nngroup.com/articles/information-foraging/

Math underneath: leave a patch when local gain falls below what you could get by travelling.

> "a forager should leave a patch when the rate of gain within the patch … drops below the rate of gain that could be achieved by traveling to, and foraging in," another patch. — https://www.peterpirolli.com/ewExternalFiles/31354_C01_UNCORRECTED_PROOF.pdf

Labels, nav, and empty states are scent. Slow pages and dead-end clicks are travel cost.

### 8. Color is contrast math plus learned object liking

WCAG contrast is a luminance ratio, not a taste rule.

> text needs "a contrast ratio of at least 4.5:1" (large text 3:1) because "adequate light-dark contrast is needed between the relative luminance of text and its background for good readability." — https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Text spacing that still has to work when users override it:

> line height "at least 1.5 times the font size"; paragraph spacing "at least 2 times the font size"; letter spacing "at least 0.12 times the font size"; word spacing "at least 0.16 times the font size." — https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html

You also read fastest what you already know.

> "one’s familiarity with a typeface influences one’s reading speed." — https://pmc.ncbi.nlm.nih.gov/articles/PMC7963459/

Hue preference tracks liked objects, not a mystic palette.

> "people like colors to the degree that they like the environmental objects that are characteristically those colors" e.g. "blues and cyans because they like clear sky and clean water" — Palmer & Schloss EVT, https://palmerlab.berkeley.edu/pdf/Palmer&Schloss.preferences.doc

### 9. Pretty is judged as usable, and beauty lights reward cortex

> people "perceive more aesthetic designs as much more intuitive than those considered to be less aesthetically pleasing." Kurosu & Kashimura: "the apparent usability is less correlated with the inherent usability compared to the apparent beauty." — https://en.wikipedia.org/wiki/Aesthetic%E2%80%93usability_effect

fMRI: judged beauty tracks medial orbitofrontal cortex.

> "the perception of beautiful vs ugly paintings elicited activity in the medial orbitofrontal cortex" and "the strength of activation in this area was proportional to the declared intensity of beauty." — https://lexicon.mimesisjournals.com/international_lexicon_of_aesthetics_item_detail.php?item_id=100

Norman splits the hit into three timescales.

> "Visceral design refers primarily to that initial impact, to its appearance. Behavioral design is about look and feel — the total experience of using a product. And reflection is about ones thoughts afterwards, how it makes one feel, the image it portrays" — https://jnd.org/emotional-design-people-and-things/

On screens, the designer mostly controls perceived possibility, not physics.

> Gibson: affordances are "the actionable properties between the world and an actor." Norman: "I should have used the term “perceived affordance,” for in design, we care much more about what the user perceives than what is actually true." "In graphical, screen-based interfaces, all that the designer has available is control over perceived affordances." — https://jnd.org/affordances-and-design/

### 10. Memory keeps peaks, ends, and oddballs

> people "judge an experience largely based on how they felt at its peak (i.e., its most intense point) and at its end, rather than based on the total sum or average of every moment" — https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule

> "when multiple similar objects are present, the one that differs from the rest is most likely to be remembered." — https://lawsofux.com/von-restorff-effect/

Isolation is not a click magnet by itself.

> "Isolation alone doesn’t predict selection well." — https://measuringu.com/von-restorff/

Mere exposure: seen before → liked more (and sometimes disliked more).

> people "tend to develop a liking or disliking for things merely because they are familiar with them." — https://en.wikipedia.org/wiki/Mere-exposure_effect

### 11. Engagement is a closeable gap + a need + a finish line

Curiosity is felt lack.

> Loewenstein: the gap is "a kind of cognitive deprivation." "Once attention focuses on the missing information, the absence becomes felt." — https://psychologyfanatic.com/information-gap-theory/

Wanting is not liking. Dopamine is mainly wanting.

> "the brain circuitry that mediates the psychological process of ‘wanting’ a particular reward is dissociable from circuitry that mediates the degree to which it is ‘liked’." Wanting includes "mesolimbic dopamine." Liking "is not dependent on dopamine." — https://pmc.ncbi.nlm.nih.gov/articles/PMC5171207/

So streaks, badges, and red dots can pull without pleasing. That is engagement without pleasantness.

Flow needs a clear goal, fast feedback, and a challenge you can meet.

> "The activity must have clear goals and progress." "The task must provide clear and immediate feedback." — https://en.wikipedia.org/wiki/Flow_(psychology)

Yerkes–Dodson is the arousal twin of the fluency inverted-U.

> "inverted-U curve: low arousal leads to boredom and poor results, moderate arousal boosts focus and efficiency, and excessive arousal leads to stress and mistakes." — https://www.simplypsychology.org/what-is-the-yerkes-dodson-law.html

Self-determination: three innate needs.

> "three innate psychological needs--competence, autonomy, and relatedness-- which when satisfied yield enhanced self-motivation and mental health and when thwarted lead to diminished motivation and well-being." — https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf

> "Conditions supporting the individual’s experience of autonomy, competence, and relatedness are argued to foster the most volitional and high quality forms of motivation and engagement" — https://selfdeterminationtheory.org/theory/

Goal-gradient: effort rises near the reward; fake head-starts work.

> "animals expend more effort as they approach a reward." "the illusion of progress toward the goal induces purchase acceleration (e.g., customers who receive a 12-stamp coffee card with 2 preexisting “bonus” stamps complete the 10 required purchases faster" — https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf

## What this is not

- Not one beauty number. Birkhoff's O/C is a sketch. People split into taste islands.
- Not the golden ratio. No good evidence for faces or ideal bodies.
- Not "fewer choices is always faster." Hick is a lab law; known UI choices are often constant-time.
- Not "make it pretty and it works." Pretty changes judged usability more than real usability.
- Not "dopamine = pleasure." Dopamine is closer to wanting.
- Not "isolation = clicks." Isolation helps memory; it did not reliably pick winners in the MeasuringU tests.

## Design translation (only what the layers force)

1. First 50 ms: look like the category, stay visually simple. That is "professional."
2. Spend the 3–5 chunk budget on the task. Group by proximity and boxes. One preattentive mark for the next act.
3. Make the next target big and near. Answer in 100 ms if you can, 400 ms if you must, never silent past 1 s, never blank past 10 s.
4. Contrast ≥ 4.5:1. Type and space in ratios, not one-off pixels. Prefer familiar letterforms for long reading.
5. Pleasant = fluent (symmetry, contrast, prototype). Stimulating = a gap the user can close. Do not mix them by accident.
6. Memory = one peak + a clean end + one odd thing. Do not make everything odd.
7. Engagement = visible progress + choice + competence + a scent trail. Watch for wanting without liking.

## Open edges (evidence ran out or stayed weak)

- Why 3–5 chunks: Cowan lists cost and efficiency hypotheses; "remain unclear."
- A single math of beauty: killed by taste islands.
- Color meaning charts (red = danger everywhere): not supported here; EVT is object-liking, not universal symbols.
- Whitespace "20% more comprehension" studies: primary pages did not fetch.
- Loewenstein 1994 PDF and Barlow 1961 PDF: blocked; secondary pages used.
- Brain "20% of metabolism" factoid: not pinned; dropped.

---

search turns: 35 | sources: 42 unique URLs fetched
