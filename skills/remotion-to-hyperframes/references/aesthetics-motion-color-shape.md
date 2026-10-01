# Why motion, color, and shape look good: the math, science, and psychology

Date: 2026-09-29 · Search turns: 91 · Sources: 80

Companion file: [motion-design-fundamentals.md](motion-design-fundamentals.md) (2026-09-28). It holds the motion physics: minimum-jerk easing, springs, the 2/3 power law, cause-and-effect timing, time scales. This file does not repeat it. This file adds the "why it feels good" layer, plus color, shape, and motion graphics.

---

## The short answer

The brain likes things it can **predict and learn with little effort**, plus **one small surprise it can solve**.

Five roots hold this up:

1. **Ease (fluency).** Things that are easy to see feel good: symmetry, a clear figure on its ground, contrast, repetition, typical forms.
2. **A surprise you can solve.** Pure ease gets dull. A broken pattern that the viewer then "gets" feels rewarding. Beauty = how well you can summarize a thing. Interest = how fast your summary is getting better.
3. **Nature's statistics.** The eye is tuned to the real world: smooth change, "pink" (1/f) wobble, fractal detail, light on curved surfaces, gravity. Work that matches these is easy on the eye. Work that breaks them (harsh stripes, fast flicker) causes discomfort, even seizures.
4. **Old survival biases.** Curves feel safe. Sharp downward V-points look like threat. Round baby-like forms look cute. Things coming toward you grab attention. Colors of good things (clear sky, clean water) are liked, colors of bad things (rot) are not.
5. **One beauty meter in the brain.** Beautiful pictures and beautiful music light up the same small brain area. It lights up more when the beauty feels stronger.

**One math rule runs through motion, shape, and color:** the eye flags a sudden jump in *how fast something changes*.
- In motion: a jump in speed or acceleration.
- In a curve: a jump in curvature (how sharply it bends).
- In a gradient: a jump in the slope of brightness.
- Smooth change reads as natural. One planned break reads as an accent.

---

## 0. Words used here

| Word | Plain meaning |
|---|---|
| fluency | how easy a thing is for the brain to take in |
| prototype | the most typical member of a group (the "average" chair) |
| derivative | how fast something changes (speed is the derivative of position) |
| curvature | how sharply a line bends at a point (a tight turn has high curvature) |
| G2 / G2-continuous | a curve whose curvature never jumps |
| luminance | how much light, as the eye's brightness sensor measures it |
| hue / chroma / lightness | which color (red, blue) / how strong or pure it is / how light or dark it is |
| gamma-encoded | stored numbers bent on purpose so dark shades get more steps; not proportional to real light |
| spatial frequency | how fine a pattern is (thin stripes = high frequency) |
| cycles per degree | stripes per 1° of your view (your thumbnail at arm's length is about 1–2°) |
| 1/f ("pink") noise | wobble with big slow drifts plus smaller fast jitters, in a fixed ratio |
| fractal dimension D | how much a line fills space: 1.0 = smooth line, near 2.0 = fills the page |
| saccade | a quick jump of the eye from one spot to another |
| smooth pursuit | the eye gliding to follow a moving thing |

---

## 1. The brain's rules for "beautiful" (all media)

### 1.1 Ease feels good (fluency)

The easier a thing is to take in, the more people like it. Symmetry, a clear figure, contrast, repetition, and typical shapes all make things easier to take in.

> Aesthetic pleasure rises with how fluently (easily) the viewer processes a thing — https://pubmed.ncbi.nlm.nih.gov/15582859/ §Abstract — "The more fluently perceivers can process an object, the more positive their aesthetic response."

> The things that make objects easy to process include goodness of form, figure-ground contrast, repetition, symmetry, and typicality — https://pubmed.ncbi.nlm.nih.gov/15582859/ §Abstract — "such as figural goodness, figure-ground contrast, stimulus repetition, symmetry, and prototypicality"

> Typical ("average") patterns are liked because they are easy to process; the ease explains much of the liking — https://pubmed.ncbi.nlm.nih.gov/16984298/ §Abstract — "fluency mediated the effect of prototypicality on attractiveness, although some effect of prototypicality remained when fluency was controlled."

> Even abstract dot patterns that are typical make faces smile slightly (measured by muscle sensors) — https://pubmed.ncbi.nlm.nih.gov/16984298/ §Abstract — "viewing abstract prototypes elicits quick positive affective reactions."

### 1.2 Typical but new wins ("most advanced, yet acceptable")

People like new designs **as long as** they still look like the thing they are. Novelty and typicality each help, but they fight each other.

> Novelty helps only while the design stays typical — https://pubmed.ncbi.nlm.nih.gov/12648393/ §Abstract — "people prefer novel designs as long as the novelty does not affect typicality"

> Typicality and novelty count equally but cancel each other out if you look at only one — https://pubmed.ncbi.nlm.nih.gov/12648393/ §Abstract — "typicality (operationalized as 'goodness of example') and novelty are jointly and equally effective in explaining the aesthetic preference of consumer products, but that they suppress each other's effect."

**Use:** keep the familiar skeleton (layout, genre look, logo shape). Put the new thing in one layer only.

### 1.3 A surprise you can solve

Great art often breaks the "easy" rules. The fix: the reward comes from going from confused to "I get it".

> Artists build a prediction, then break it — https://pubmed.ncbi.nlm.nih.gov/23145260/ §Abstract — "artists often destroy predictions that they have first carefully built up in their viewers"

> The pleasure comes from the move from uncertainty to predictability — https://pubmed.ncbi.nlm.nih.gov/23145260/ §Abstract — "The ensuing rewarding effect is derived from this transition from a state of uncertainty to a state of increased predictability."

The same idea in math (Schmidhuber). Beauty is how much you can compress (summarize) a thing. Interest is how fast your compression is improving: the slope of the learning curve.

> Data looks more beautiful once you learn to predict or compress it better — https://arxiv.org/abs/0812.4360 §Abstract — "once he learns to predict or compress the data in a better way, thus making it subjectively simpler and more beautiful."

> Interest is the first derivative (rate of change) of beauty — https://arxiv.org/abs/0812.4360 §Abstract — "This drive maximizes interestingness, the first derivative of subjective beauty or compressibility, that is, the steepness of the learning curve."

**Use:** in a video, set up a pattern (a rhythm, a grid, a repeated move). Break it once. Then resolve it so the viewer "gets" the new pattern.

### 1.4 "Just right" complexity is not one number

The famous inverted U (people like medium complexity best) can be an illusion made by averaging two kinds of people.

> In one study, one group liked simple images more and more, and another group liked complex images more and more — https://pmc.ncbi.nlm.nih.gov/articles/PMC4796011/ §Abstract — "one group of participants in our sample had increasingly lower liking ratings for increasingly more complex stimuli, while a second group of participants had increasingly higher liking ratings"

> The split was 20 people to 10 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4796011/ §Results — "Cluster 1 consisted of 20 participants (average age 25.1 ± 3.3, 7 males and 13 females), and Cluster 2 consisted of 10 participants"

Where a "sweet spot" does show up, it is domain-specific:

| Domain | Sweet spot | Section |
|---|---|---|
| fractal detail | D 1.3–1.5 | 2.3 |
| number of hues in a palette | not 1, not more than 2–3 | 6.6 |
| web pages (first look) | low complexity + typical layout | 1.6 |

**Use:** know your audience. A mass audience leans to the simple, typical side (section 1.6).

### 1.5 Exaggerate one thing (peak shift)

Ramachandran and Hirstein's "peak shift": if an animal learns "long rectangle = reward", it responds even more to an *even longer* rectangle. Caricature works this way. So does a cartoon's big head.

> The "eight laws" are heuristics artists use to excite the visual brain — https://www.dgp.toronto.edu/~hertzman/courses/csc2521/fall_2007/ramachandran-science-art.pdf §Abstract — "a set of heuristics that artists either consciously or unconsciously deploy to optimally titillate the visual areas of the brain"

> Peak shift: the exaggerated version beats the trained one — https://www.dgp.toronto.edu/~hertzman/courses/csc2521/fall_2007/ramachandran-science-art.pdf §Abstract — "If a rat is rewarded for discriminating a rectangle from a square, it will respond even more vigorously to a rectangle that is longer and skinnier that the prototype."

> Push one dimension, not all of them at once — https://www.dgp.toronto.edu/~hertzman/courses/csc2521/fall_2007/ramachandran-science-art.pdf §Abstract — "art is most appealing if it produces heightened activity in a single dimension (e.g. through the peak shift principle or through grouping) rather than redundant activation of multiple modules."

**Use:** pick one thing to exaggerate per piece: motion, *or* color, *or* shape. Keep the rest calm.

### 1.6 First impressions are fast and they stick

> Low complexity plus a typical layout was rated most appealing — https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/ §Abstract — "Overall, websites with low VC and high PT were perceived as highly appealing."

> These effects show up within 17 milliseconds — https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/ §Abstract — "VC and PT affect aesthetic perception even within 17ms"

> Colorfulness and complexity models (with age and education) explain about half of how appealing a site looks after a half-second — https://dash.harvard.edu/entities/publication/73120378-cc85-6bd4-e053-0100007fdf3b §Abstract — "these models explain approximately half of the variance in the ratings of aesthetic appeal given after viewing a website for 500ms only."

> Looks change how usable a thing *seems*, even after use; real usability did not — https://www.ise.bgu.ac.il/faculty/noam/papers/00_nt_ask_di_iwc.pdf §Abstract — "the degree of system's aesthetics affected the post-use perceptions of both aesthetics and usability, whereas the degree of actual usability had no such effect."

### 1.7 The beauty meter in the brain

> One area, the medial orbito-frontal cortex (a spot just behind the eyes), was active for both visual and musical beauty — https://pubmed.ncbi.nlm.nih.gov/21755004/ §Abstract — "only one cortical area, located in the medial orbito-frontal cortex (mOFC), was active during the experience of musical and visual beauty"

> It scales with how beautiful it feels — https://pubmed.ncbi.nlm.nih.gov/21755004/ §Abstract — "The strength of activation in this part of the mOFC was proportional to the strength of the declared intensity of the experience of beauty."

> Aesthetic experience comes from three systems working together: senses and movement, feeling and value, meaning and knowledge — https://neuroaesthetics.med.upenn.edu/assets/user-content/documents/publications/chatterjee-vartanian-2014-01.pdf §Abstract — "aesthetic experiences emerge from the interaction between sensory–motor, emotion–valuation, and meaning–knowledge neural systems."

**Use:** check all three. Does it look and move well (senses)? Does it make you feel something (value)? Does it mean something to this viewer (meaning)?

---

## 2. Nature's statistics: the hidden target

### 2.1 Pictures: art copies the fine-to-coarse pattern of nature

Split any image into coarse and fine patterns. In natural scenes, the amount of pattern falls smoothly from coarse to fine by a power law (a straight line on a log-log plot). Good graphic art does the same.

> Natural scenes follow a power law across scale, which means they look alike when zoomed (scale-invariant) — https://pubmed.ncbi.nlm.nih.gov/18073055/ §Abstract — "natural scenes display a Fourier power spectrum that tends to fall with spatial frequency according to a power-law."

> Graphic art matches this; household objects and science figures did not — https://pubmed.ncbi.nlm.nih.gov/18073055/ §Abstract — "Graphic art, but not the other image categories, resembles natural scenes in showing fractal-like, scale-invariant statistics."

> Painters squeeze the huge range of real light into paint with a bending (compressive) curve, not a straight scale-down — https://pubmed.ncbi.nlm.nih.gov/18073056/ §Abstract — "artists achieve some degree of nonlinear compression in their paintings."

**Use:** tone-map, don't just scale. This is also why a gamma or "filmic" curve looks better than linear light on screen.

### 2.2 The discomfort band: stripes near 3 cycles per degree

> Uncomfortable images have too much energy near 3 stripes per degree of view — https://pubmed.ncbi.nlm.nih.gov/18773732/ §Abstract — "uncomfortable images show a regression with disproportionately greater amplitude at spatial frequencies within two octaves of 3 cycles deg(-1)."

> Such stripes can cause headaches and seizures in some people — https://pubmed.ncbi.nlm.nih.gov/18773732/ §Abstract — "Striped patterns with spatial frequency within the above range are known to be uncomfortable and capable of provoking headaches and seizures in susceptible persons."

**Math (derived here):** "two octaves of 3" spans 0.75 to 12 cycles per degree. A phone about 7 cm wide at 30 cm covers about 13° of view (2·atan(3.5/30)). So about 10 to 160 black-white stripe pairs across the phone width sits in the risky band. Stripes that are also moving or flashing are worse (section 5.6).

### 2.3 Fractals: the 1.3–1.5 band

> People prefer fractal detail with dimension 1.3–1.5, whether made by nature, math, or Pollock's hand — https://www.algorithmic-worlds.net/blog/20090819-UnivAestFrac.pdf §Results — "consistent trend for aesthetic preference to peak within the fractal dimension range 1.3–1.5 for the three different origins of fractal image."

> Outside that band, preference drops — https://www.algorithmic-worlds.net/blog/20090819-UnivAestFrac.pdf §Results — "1.1–1.2 low preference, 1.3–1.5 high preference and 1.6–1.9 low preference."

**Use:** for textures, particle fields, organic lines, and noise-driven shapes, aim for the look of clouds or coastlines (about D 1.3), not static (near 2) and not a clean line (1.0).

### 2.4 Time: 1/f is the "just right" wobble

| Noise | Rule | Sounds / looks like |
|---|---|---|
| white | every moment independent | static, too random |
| 1/f (pink) | slow big drifts + small fast jitters | natural, pleasing |
| 1/f² (brown) | only slow drifts | too smooth, too predictable |

> Melodies made from 1/f noise sounded pleasing; white noise sounded too random; 1/f² sounded too correlated — http://physics.bu.edu/~redner/542/refs/voss-clarke.pdf §Abstract — "Those generated by white-noise sources sounded too random, while those generated by 1/f² noise sounded too correlated."

> Hollywood shot lengths drifted toward a 1/f pattern over 70 years — https://pubmed.ncbi.nlm.nih.gov/20424081/ §Abstract — "shots became increasingly more correlated in length with their neighbors and created power spectra approaching 1/f."

**Use:** for camera shake, float, flicker, and cut lengths, use layered noise (big slow + small fast), not `Math.random()` per frame, and not one slow sine wave.

---

## 3. The smoothness law: derivatives in motion, curves, light, and color

The eye is a derivative detector. It notices where the *rate* of change jumps.

| Domain | What must change smoothly | What a jump looks like | Section |
|---|---|---|---|
| motion | position, speed, acceleration | teleport, robot stop, cheap "kink" | companion file §1.1 |
| curves | direction (G1), curvature (G2) | a visible "joint" or flat spot | 7.5 |
| brightness ramps | slope of brightness | a false bright or dark stripe (Mach band) | below |
| color blends | lightness, chroma, hue path | a gray, muddy middle or a purple shift | 6.3 |

> For a curve, curvature is the steering wheel; G2 means the wheel never jerks — https://levien.com/phd/thesis.pdf §2.2 Continuity — "Intuitively, curvature is the position of the steering wheel when driving a car along the curve. Therefore, G2 continuity is equivalent to the lack of jerks of the steering wheel."

> Mach bands are false dark and bright bars where a brightness ramp starts and stops (its "foot" and "knee") — https://pubmed.ncbi.nlm.nih.gov/25408643/ §Abstract — "Mach bands are the illusory dark and bright bars seen at the foot and knee of a luminance trapezoid."

> One explanation: the brain expects such bands on sharply curved surfaces — https://pubmed.ncbi.nlm.nih.gov/25408643/ §Abstract — "Mach bands result from learned expectations about the pattern of light typically found on sharply curved surfaces."

So the same "minimum jerk" idea from the companion file shows up in space: a G2 curve is a path you could drive with no steering jerk.

**Use:**
- Animate with curves whose acceleration never jumps (companion file §1.2).
- Draw shapes with continuous curvature (squircles, Euler spirals; section 7.5).
- Ease gradient ends (a smooth-step ramp, not a straight ramp) so no Mach band appears.
- Blend colors in Oklab / OkLCh (section 6.3).

---

## 4. Motion design: what the brain reads from movement

(The kinematics are in the companion file. This section is what movement *means* to a viewer.)

### 4.1 Movement energy = emotional energy

> How "activated" (calm vs. excited) a movement looks tracks its kinematics (speed and timing); how pleasant it looks lives in how the body parts move relative to each other — https://pubmed.ncbi.nlm.nih.gov/11716834/ §Abstract — "the corresponding activation of perceived affect is a formless cue that relates directly to the movement kinematics while the pleasantness of the movement appears to be carried in the phase relations between the different limb segments."

Music and movement share one emotional code. One program made both a melody and a bouncing ball from five dials.

> The five dials — https://pubmed.ncbi.nlm.nih.gov/23248314/ §Abstract — "rate, jitter (regularity of rate), direction, step size, and dissonance/visual spikiness"

> The same settings gave the same emotion in sound and motion, in the US and in a remote Cambodian village — https://pubmed.ncbi.nlm.nih.gov/23248314/ §Abstract — "(ii) each combination expressed the same emotion in both music and movement, and (iii) this common structure between music and movement was evident within and across cultures."

**Use:** to match motion to music, match these five: speed = tempo, jitter = rhythmic regularity, direction up/down = pitch up/down, step size = interval size, spiky shapes and jerky moves = dissonance.

### 4.2 Motion shows weight, and the brain expects real gravity

> People can see how heavy a box is from motion alone (21 dots of light on a lifter) — https://pubmed.ncbi.nlm.nih.gov/6457088/ §Abstract — "the weight of the box, as a dynamic variable of the event, is well specified in the kinematic pattern and hence in the optic array."

> The brain uses a built-in model of gravity to predict falling objects — https://pubmed.ncbi.nlm.nih.gov/18499213/ §Abstract — "When intercepting a free-falling object, the delays can be overcome by a predictive model of the effects of gravity on target motion."

### 4.3 Size comes from timing (math, derived here)

A dropped thing falls height `h` in time `t = √(2h / g)`.

- Make the thing `k` times smaller, and it falls in `1/√k` of the time.
- So small things *look* fast, and big things *look* slow.
- A thing that falls "too slowly" for its on-screen size reads as huge. Too fast reads as a toy.

Example: a 1:16 model falls in 1/4 of the real time. To make it read as full size, slow it 4× (film at 4 × 24 = 96 fps and play at 24).

The same √ rule sets motion-graphics duration (companion file §1.8: `t = 2·√(d/a)`). Big, "heavy" elements get more time. Small ones snap.

### 4.4 Motion alone can set the genre

> Researchers varied only how a chasing block moved — https://pubmed.ncbi.nlm.nih.gov/19118823/ §Abstract — "movements of the chasing object were systematically varied as to parameters: velocity, efficiency, fluency, detail, and deformation."

> Small and medium departures from realism read as drama and action; big ones read as comedy — https://pubmed.ncbi.nlm.nih.gov/19118823/ §Abstract — "small and moderate deviations resulted in categorization as drama and action, and large deviations as comedy."

**Use:** want funny? Exaggerate squash, overshoot, and speed a lot. Want serious? Stay close to real physics.

### 4.5 Motion makes time feel longer

> Moving displays felt longer than still ones, and faster felt longer still — https://pubmed.ncbi.nlm.nih.gov/7885802/ §Abstract — "Each experiment showed that stimulus motion lengthened perceived time. In general, faster speeds lengthened perceived time to a greater degree than slower speeds."

> A progress bar with ribs that move backwards and slow down felt about 11% faster — https://www.chrisharrison.net/projects/progressbars2/ProgressBarsHarrison.pdf §Abstract — "animated ribbing that move backwards in a decelerating manner proved to have the strongest effect"

> Same source — https://www.chrisharrison.net/projects/progressbars2/ProgressBarsHarrison.pdf §Abstract — "reduces the perceived duration among our participants by 11%."

**Use:** busy, fast motion stretches felt time. Good for suspense. Bad for a loading screen, unless you use the backward-ribbing trick.

### 4.6 The eye's speed limit

> The eye can glide after a target at about 90% of its speed, up to about 100° per second — https://pubmed.ncbi.nlm.nih.gov/4060608/ §Abstract — "In four subjects eye velocity was approximately 90% of target velocity up to a target velocity of 100 deg/sec."

**Math (derived here):**
- Visual angle of a screen = `2·atan(width / (2·distance))`.
- Phone, 7 cm wide at 30 cm: about 13°. Crossing it in 0.13 s is about 100°/s, the limit.
- TV, 1.2 m wide at 3 m: about 23°. Crossing it in 0.23 s hits the same limit.
- **Use:** anything the viewer must read or track should take longer than that to cross. Faster moves become blurs, which is fine for whooshes and bad for text.

### 4.7 What grabs attention, and a myth about stagger

> Moving and looming (growing, coming closer) things grab attention; receding ones do not — https://pubmed.ncbi.nlm.nih.gov/14674628/ §Abstract — "We show that translating and looming stimuli also capture attention."

> Same source — https://pubmed.ncbi.nlm.nih.gov/14674628/ §Abstract — "We also show that receding stimuli do not attract attention."

> Stagger (small start delays across items) did not help people track moving dots, and sometimes hurt — https://pubmed.ncbi.nlm.nih.gov/26356938/ §Abstract — "We found that introducing staggering has a negligible, or even negative, impact on multiple object tracking performance."

> Why: stagger breaks "moving together" grouping and makes start times unpredictable — https://pubmed.ncbi.nlm.nih.gov/26356938/ §Abstract — "a loss of common-motion grouping information about which objects travel in similar paths, and less predictability about when any specific object would begin to move."

**Use:**
- To point at something, move it or scale it up toward the viewer. Shrinking away is a quiet exit.
- Use stagger to show *order* in a list (companion file §3.6). Do not use it when viewers must *follow* many moving items. Move those together.

### 4.8 Motion needs brightness contrast, not just color contrast

> The brain's motion path comes from the "magno" cells; form and color come mostly from "parvo" cells — https://pubmed.ncbi.nlm.nih.gov/3283936/ §Abstract — "The pathways selective for form and color seem to be derived mainly from the parvocellular geniculate subdivisions, the depth- and movement-selective components from the magnocellular."

> Red-green stripes of equal brightness looked slowed down and sometimes stopped — https://pubmed.ncbi.nlm.nih.gov/6470841/ §Abstract — "At low spatial frequencies, equiluminous gratings were appreciably slowed and sometimes stopped even though the individual bars of the grating could be easily resolved."

**Use:** a moving element should be clearly lighter or darker than what is behind it. Test: turn the frame to grayscale. If the mover vanishes, its motion will look mushy.

---

## 5. Motion graphics: cuts, rhythm, text, generative math, safety

### 5.1 Cuts the eye does not notice

> Cuts that follow continuity rules go unnoticed more, and cutting on a sudden start of motion hides them best — https://bop.unibe.ch/JEMR/article/view/2264 §Abstract — "A quarter of edits joining two viewpoints of the same scene were undetected and this increased to a third when the edit coincided with a sudden onset of motion."

> Viewers blink together at calm moments inside scenes: the end of an action, the main character gone, a long shot, a repeat — https://pubmed.ncbi.nlm.nih.gov/19640888/ §Abstract — "Synchronized blinks occurred during scenes that required less attention such as at the conclusion of an action, during the absence of the main character, during a long shot and during repeated presentations of a similar scene."

> People can get the meaning of a picture shown for only 13 ms in a fast stream — https://pubmed.ncbi.nlm.nih.gov/24374558/ §Abstract — "performance was significantly above chance at all durations, whether the target was named before or only after the sequence."

> The Kuleshov effect is real: a neutral face reads as the emotion of the shot next to it — https://pubmed.ncbi.nlm.nih.gov/27056181/ §Abstract — "The results suggest that some sort of Kuleshov effect does in fact exist."

**Use:**
- Cut on a motion onset to hide the cut. Cut at the end of an action to land a beat.
- Very fast flashes of images still carry meaning (gist), but not text.
- Context shots set the emotion of a neutral face or object.

### 5.2 Pacing

> In films, fewer cuts and less motion build the setup; more cuts and motion hit the climax — https://pubmed.ncbi.nlm.nih.gov/28180180/ §Abstract — "increasing shot durations and decreasing motion in the setup, darkening across the complication and development followed by brightening across the climax"

> Why pace works — https://pubmed.ncbi.nlm.nih.gov/28180180/ §Abstract — "Decreasing shot durations mean more cuts; more cuts mean potentially more saccades that drive attention; more motion also captures attention; and brighter and darker images are associated with positive and negative emotions."

**Use:** shape a short video like a film act: calmer start, darker middle, faster and brighter climax, then settle.

### 5.3 Sound and picture

> People detect sound-picture offset beyond +45 ms (sound early) or −125 ms (sound late) — https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.1359-1-199811-I!!PDF-E.pdf §considering (g) — "detectability thresholds are about +45 ms to –125 ms and acceptability thresholds are about +90 ms to –185 ms on the average, a positive value indicates that sound is advanced with respect to vision"

**Math (derived here), at 30 fps (33.3 ms per frame):**
- Sound may lag the hit by up to about 3 frames (125 ms) unnoticed.
- Sound may lead by only about 1 frame (45 ms).
- **Use:** if in doubt, put the sound a frame *after* the visual hit, never before.

> People link high pitch with small, bright things high up — https://pubmed.ncbi.nlm.nih.gov/21264748/ §Abstract — "people consistently match high-pitched sounds with small, bright objects that are located high up in space."

**Use:** rising pitch → move up, shrink, brighten. Low boom → big, low, dark.

### 5.4 Text on screen: how long to hold it

> Adults read English silently at about 238 words per minute (non-fiction) — https://gwern.net/doc/psychology/linguistics/2019-brysbaert.pdf §Abstract — "we estimate that the average silent reading rate for adults in English is 238 words per minute (wpm) for non-fiction and 260 wpm for fiction."

> Netflix caps English subtitles for adults at 20 characters per second — https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide §I.14 Reading Speed Limits — "Up to 20 characters per second"

> For children's shows, 17 — https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide §I.14 Reading Speed Limits — "Up to 17 characters per second"

**Math (derived here):** hold time ≥ the larger of `words / 3.97` and `characters / 20` seconds. Example: "Your brain loves smooth motion" = 5 words, 30 characters → 1.3 s and 1.5 s → hold at least 1.5 s. Add time if the text moves (section 4.6).

### 5.5 Generative motion math

**Flocks (boids).** Three local rules give lifelike group motion.

> Reynolds' three rules — https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/ §Simulated Flocks — "1. Collision Avoidance: avoid collisions with nearby flockmates 2. Velocity Matching: attempt to match velocity with nearby flockmates 3. Flock Centering: attempt to stay close to nearby flockmates"

**Curl noise.** Take noise, then take its curl (a math operation that turns a height map into swirling flow). The result swirls like real fluid and never piles up in "gutters".

> Curl noise is exactly incompressible, which gives the look of everyday fluids — https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf §Abstract — "exactly incompressible (necessary for the characteristic look of everyday fluids)"

> The velocity is the curl of a noise potential — https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf §Figure 1 — "velocity field is the curl of this potential: ~v = ∇ × ψ"

2D version: `v = (∂ψ/∂y, −∂ψ/∂x)`, where ψ is Perlin or simplex noise.

**Sunflower spiral (phyllotaxis).** Point `n` sits at radius `c·√n`, turned by the golden angle each step.

> Vogel's spiral and the golden angle — https://mathworld.wolfram.com/VogelSpiral.html §Definition — "The customary choice α=π(3−√5) is the golden angle and produces the interlacing spiral patterns used to model phyllotaxis in sunflower heads."

> The golden angle appears when a growth process avoids repeating (periodic) layouts — https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.68.2098 §Abstract — "The ordering is explained as due to the system's trend to avoid rational (periodic) organization, thus leading to a convergence towards the golden mean."

Math: `π(3−√5)` radians = `180·(3−√5)` ≈ **137.508°**. The `√n` radius gives equal area per point, so the dots pack evenly.

```js
const golden = Math.PI * (3 - Math.sqrt(5))
const phyllo = (n, c) => [c * Math.sqrt(n) * Math.cos(n * golden), c * Math.sqrt(n) * Math.sin(n * golden)]
const curl2d = (psi, x, y, e = 1e-3) => [(psi(x, y + e) - psi(x, y - e)) / (2 * e), -(psi(x + e, y) - psi(x - e, y)) / (2 * e)]
```

### 5.6 Flash and stripe safety (non-negotiable)

> WCAG rule — https://www.w3.org/TR/WCAG22/ §2.3.1 Three Flashes or Below Threshold — "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds."

> A "general flash" is a 10%+ brightness swing where the darker frame is below 0.80 — https://w3c.github.io/wcag/guidelines/22/ §general flash and red flash thresholds — "A general flash is defined as a pair of opposing changes in relative luminance of 10% or more of the maximum relative luminance (1.0) where the relative luminance of the darker image is below 0.80"

> Area limit: flashes may cover at most about 25% of any 10° patch of view — https://w3c.github.io/wcag/guidelines/22/ §general flash and red flash thresholds — "the combined area of flashes occurring concurrently occupies no more than a total of .006 steradians within any 10 degree visual field on the screen (25% of any 10 degree visual field on the screen)"

> Red is special — https://w3c.github.io/wcag/guidelines/22/ §general flash and red flash thresholds — "A red flash is defined as any pair of opposing transitions involving a saturated red"

> The 1997 Pokémon episode sent about 700 people, mostly children, to hospital — https://pubmed.ncbi.nlm.nih.gov/9893306/ §Abstract — "approximately 700 people around the nation (mostly children) were rushed to hospitals and treated for seizure symptoms."

> The scene was a 12 Hz red/blue flicker — https://pubmed.ncbi.nlm.nih.gov/9893306/ §Abstract — "the problematic TV scene as a low luminance, 12 Hz alternating red/blue stimulus"

**Math (derived here):** at most 3 flashes per second → one on-off pair every ≥ 10 frames at 30 fps. Never alternate saturated red over large areas. Avoid high-contrast stripes near 3 cycles per degree (section 2.2), especially when they move.

---

## 6. Color

### 6.1 How the eye builds color

Three cone types (color sensors) in the eye peak at about 420, 534, and 563 nm (blue, green, and red light).

> Long-wave ("red") cones — https://pubmed.ncbi.nlm.nih.gov/7359434/ §Abstract — "The long-wave cones ('red' cones) had a lambda max of 562.8 +/- 4.7 nm"

> Middle-wave ("green") cones — https://pubmed.ncbi.nlm.nih.gov/7359434/ §Abstract — "The middle-wave cones ('green' cones) had a lambda max of 533.8 +/- 3.7 nm"

> Short-wave ("blue") cones — https://pubmed.ncbi.nlm.nih.gov/7359434/ §Abstract — "The short-wave cones ('blue' cones) had a lambda max of 420.3 +/- 4.7 nm"

The red and green cones overlap a lot. So the brain compares cone signals (red vs. green, blue vs. yellow) and sends brightness on its own channel. Motion rides mostly on that brightness channel (section 4.8).

### 6.2 Color is a guess about the light

> "The dress": people who assume bluish daylight see white/gold; people who assume warm indoor light see blue/black — https://pubmed.ncbi.nlm.nih.gov/25981795/ §Abstract — "some people favor a cool illuminant (blue sky), discount shorter wavelengths, and perceive white/gold; others favor a warm illuminant (incandescent light), discount longer wavelengths, and see blue/black."

> Clear light cues flip what people see — https://pubmed.ncbi.nlm.nih.gov/25981795/ §Abstract — "by introducing overt cues to the illumination, we can flip the dress color."

> Saturated colors look brighter than gray of the same measured light (Helmholtz–Kohlrausch effect) — https://pubmed.ncbi.nlm.nih.gov/38638628/ §Abstract — "Saturated lights appear brighter than white lights of the same luminance."

**Use:**
- Show the light source (a warm key light, a cool sky) so the viewer reads your colors the way you meant.
- A saturated color will look brighter than its luminance number says. Check contrast by eye as well as by formula.

### 6.3 The math of color spaces

**Three kinds of "RGB math", three jobs:**

| Job | Space | Why |
|---|---|---|
| mixing real light (glow, blur, motion blur, fades of light) | linear-light sRGB | numbers match real light energy |
| even-looking steps (gradients, tints, scales) | Oklab | equal numbers = equal-looking steps |
| blends that keep color strong (no gray middle) | OkLCh | keeps chroma through the blend |
| old web behavior | gamma sRGB | compatibility only; gives dark or gray mixes |

> Normal RGB numbers are not additive, because they are gamma-encoded — https://drafts.csswg.org/css-color-4/ §2 Color Terminology — "Most RGB spaces are not additive, because the components are gamma encoded."

> Use linear-light spaces to mix light — https://drafts.csswg.org/css-color-4/ §13.2 Color Space for Interpolation — "In that case, the CIE XYZ, display-p3-linear or srgb-linear color spaces are appropriate, because they are linear in light intensity."

> Use Oklab for even steps — https://drafts.csswg.org/css-color-4/ §13.2 Color Space for Interpolation — "If colors need to be evenly spaced perceptually (such as in a gradient), the Oklab color space (and to a lesser extent, the older Lab), are designed to be perceptually uniform."

> Use OkLCh to avoid graying out — https://drafts.csswg.org/css-color-4/ §13.2 Color Space for Interpolation — "If avoiding graying out in color mixing is desired, i.e. maximizing chroma throughout the transition, OkLCh (and to a lesser extent, the older LCH) work well for that."

> Old sRGB mixing gives dark or grayish results — https://drafts.csswg.org/css-color-4/ §13.2 Color Space for Interpolation — "The sRGB color space, which is neither linear-light nor perceptually uniform, is the choice here, even though it produces poorer results (overly dark or greyish mixes)."

> CSS now defaults to Oklab when a syntax does not say otherwise — https://drafts.csswg.org/css-color-4/ §13.2 Color Space for Interpolation — "If the host syntax does not define what color space interpolation should take place in, it defaults to Oklab."

> But hex, rgb(), and hsl() colors still blend in old gamma sRGB unless you ask for Oklab — https://drafts.csswg.org/css-color-4/ §13.2 Color Space for Interpolation — "user agents must handle interpolation between legacy sRGB color formats (hex colors, named colors, rgb(), hsl() or hwb() and the equivalent alpha-including forms) in gamma-encoded sRGB space."

**Why HSL and old Lab fail:**

> HSL hue is uneven — https://drafts.csswg.org/css-color-4/ §7 HSL Colors — "The hue angle in HSL is not perceptually uniform; colors appear bunched up in some areas and widely spaced in others."

> HSV/HSL lightness is uneven across hues — https://bottosson.github.io/posts/oklab/ §Comparing Oklab to HSV — "Yellow, magenta and cyan appear much lighter than red and blue."

> In CIE Lab/LCH, blue turns purple as it is desaturated — https://drafts.csswg.org/css-color-4/ §9.1 CIE Lab and LCH — "as a saturated blue has it’s Chroma progressively reduced, it becomes noticeably purple."

> Oklab's goals — https://bottosson.github.io/posts/oklab/ §Motivation and derivation of Oklab — "Should predict lightness, chroma and hue well. L, C and h should be perceived as orthogonal, so one can be altered without affecting the other two."

> Oklab's fitted exponent landed near a cube root (1/3) — https://bottosson.github.io/posts/oklab/ §How Oklab was derived — "γ value ended up very close to 1/3, 0.323"

The cube root is the deep part. The eye squashes light. Doubling the light does not look twice as bright. A cube-root curve turns "light" into "looks equally spaced". This is also why gamma curves exist.

**Use:**
- CSS: `linear-gradient(in oklch, …)` or `color-mix(in oklab, …)`.
- Motion blur, glows, and cross-fades of light: do the math in linear light.
- Build palettes by stepping Oklab L (lightness) evenly.

### 6.4 Measuring colorfulness (a formula you can run)

> Hasler and Süsstrunk's quick opponent space — https://infoscience.epfl.ch/record/33994/files/HaslerS03.pdf §7 — "We use a very simple opponent colour space"

```
rg = R − G
yb = ½(R + G) − B
M  = √(σ_rg² + σ_yb²) + 0.3 · √(μ_rg² + μ_yb²)
```
(σ = spread across the pixels, μ = average, on 0–255 sRGB values.)

> The formula as printed — https://infoscience.epfl.ch/record/33994/files/HaslerS03.pdf §7 — "M̂ (3) = σrgyb + 0.3 · µrgyb"

> It matched people's colorfulness ratings at about 95% correlation — https://infoscience.epfl.ch/record/33994/files/HaslerS03.pdf §9 Conclusions — "achieves an even better correlation (95%) to the experimental data."

> Their scale — https://infoscience.epfl.ch/record/33994/files/HaslerS03.pdf §8 How to use the metric — "value of M̂ (3) = 59 means that the images is quite colourful."

**Use:** score each frame of a video. Keep M steady within a scene. Let it jump at a chapter change. This is the metric Reinecke's web study built on (section 1.6).

### 6.5 Why people like some colors

> People like colors of things they like (sky, clean water) and dislike colors of things they dislike (feces, rot) — https://pubmed.ncbi.nlm.nih.gov/20421475/ §Abstract — "People like colors strongly associated with objects they like (e.g., blues with clear skies and clean water) and dislike colors strongly associated with objects they dislike (e.g., browns with feces and rotten food)."

> But preferences are not universal; the Himba of Namibia showed none of the "universal" Western patterns — https://pubmed.ncbi.nlm.nih.gov/23148465/ §Abstract — "British and Himba color preferences are found to share few characteristics, and Himba color preferences display none of the so-called "universal" patterns or sex differences."

> Color-emotion links are largely shared across 30 nations — https://pubmed.ncbi.nlm.nih.gov/32900287/ §Abstract — "Pattern-similarity analyses revealed universal color-emotion associations (average similarity coefficient r = .88)."

> Sample — https://pubmed.ncbi.nlm.nih.gov/32900287/ §Abstract — "4,598 participants from 30 nations speaking 22 native languages"

> Brightness drives pleasure; saturation drives arousal (excitement) — https://pubmed.ncbi.nlm.nih.gov/7996122/ §Abstract — "Regression equations for standardized variables were; Pleasure = .69B + .22S, Arousal = -.31B + .60S, Dominance = -.76B + .32S."

Read the equations like this (B = brightness, S = saturation):
- Brighter → more pleasant, calmer, less dominant.
- More saturated → more exciting.

**Use:**
- Calm and friendly: light, soft colors.
- Energy: raise saturation, not just hue.
- Cheap-looking or "dirty": dark yellows and browns (the rot association).
- Check your audience's culture before trusting any "universal" color rule.

### 6.6 Harmony: what actually predicts a good palette

> Pairs of similar hues are rated more harmonious and more liked; liking also leans on lightness contrast — https://pubmed.ncbi.nlm.nih.gov/21264737/ §Abstract — "pair preference and harmony both increase as hue similarity increases, but preference relies more strongly on component color preference and lightness contrast."

> But a figure in a contrasting hue on its background is liked more as a figure — https://pubmed.ncbi.nlm.nih.gov/21264737/ §Abstract — "figural color preference ratings increase as hue contrast with the background increases."

> The color-wheel "hue templates" (complementary, triad, and so on) did not predict good palettes in large real datasets — https://www.dgp.toronto.edu/~donovan/color/colorcomp.pdf §1 Introduction — "Hue templates, the most popular models of color compatibility, are tested in several ways, and no evidence is found that they predict compatible colors."

> Best palettes use 2–3 hues — https://www.dgp.toronto.edu/~donovan/color/colorcomp.pdf §1 Introduction — "users generally prefer themes which are neither too simple (i.e., monochromatic), nor too complex (more than 2-3 different hues)."

> Lightness matters most; dark themes rate poorly; light-to-dark ramps rate well — https://www.dgp.toronto.edu/~donovan/color/colorcomp.pdf §1 Introduction — "lightness features are important; dark themes are poorly rated and gradients from light-to-dark or vice-versa are preferred."

> In palettes, people favor warm hues and cyans — https://www.dgp.toronto.edu/~donovan/color/colorcomp.pdf §1 Introduction — "The data reveals a preference for warm hues and cyans in color themes, which is distinct from preferences for purples and blues with single colors."

**Palette recipe from the evidence:**
1. Pick 2–3 neighboring hues for the field (harmony).
2. Spread them across lightness, light to dark (the strongest single factor).
3. Give the one focal element a contrasting hue (figure preference, section 1.5 "one dimension").
4. Avoid mostly-dark palettes unless the mood demands it.

### 6.7 Color for everyone

> About 8% of European men and 0.4% of women have red-green color deficiency — https://pubmed.ncbi.nlm.nih.gov/22472762/ §Abstract — "the prevalence of deficiency in European Caucasians is about 8% in men and about 0.4% in women"

> Rainbow and red-green color maps distort data and exclude color-deficient viewers — https://pubmed.ncbi.nlm.nih.gov/33116149/ §Abstract — "colour maps that visually distort data through uneven colour gradients or are unreadable to those with colour-vision deficiency remain prevalent in science. These include, but are not limited to, rainbow-like and red-green colour maps."

**Use:** carry meaning in lightness first and hue second. Never let red vs. green be the only difference.

---

## 7. Shapes

### 7.1 Curves feel safe, sharp points feel like threat

> Sharp contours may signal threat and trigger a negative bias — https://pubmed.ncbi.nlm.nih.gov/16913943/ §Abstract — "We hypothesized that sharp transitions in contour might convey a sense of threat, and therefore trigger a negative bias. Our results were consistent with this hypothesis."

> Meta-analysis (a study of many studies): 61 studies — https://pubmed.ncbi.nlm.nih.gov/36285721/ §Abstract — "Our meta-analysis included 61 studies which provided 106 independent samples and 309 effect sizes."

> A medium-sized effect — https://pubmed.ncbi.nlm.nih.gov/36285721/ §Abstract — "revealed a Hedges' g of 0.39-consistent with a medium effect size."

> Reliable, but not universal; it depends on time, stimulus, expertise, and task — https://pubmed.ncbi.nlm.nih.gov/36285721/ §Abstract — "preference for curvature is moderated by four factors: presentation time, stimulus type, expertise, and task."

> Curved rooms were judged more beautiful — https://pubmed.ncbi.nlm.nih.gov/23754408/ §Abstract — "participants were more likely to judge spaces as beautiful if they were curvilinear than rectilinear."

> Great apes share the curve preference — https://pubmed.ncbi.nlm.nih.gov/26558754/ §Abstract — "the human group and the great ape group indeed share a common preference for curved over sharp-angled contours"

> A plain downward-pointing V (like an angry brow) fires the brain's threat areas more than the same V pointing up — https://pubmed.ncbi.nlm.nih.gov/18823242/ §Abstract — "simple geometric forms containing only downward-pointing V-shapes elicit greater activation of the amygdala, subgenual anterior cingulate cortex, superior temporal gyrus, and fusiform gyrus, as well as extrastriate visual regions, than do presentations of the identical V-shape pointing upward."

**Shape language, backed by this:**
- Circles and soft curves: friendly, safe, calm.
- Sharp points, especially downward V's: tension, danger, aggression.
- Upward points (▲) are milder than downward ones (▼).

### 7.2 Sounds have shapes (bouba / kiki)

> Tested across 25 languages, 9 language families, 10 writing systems — https://pubmed.ncbi.nlm.nih.gov/34775818/ §Abstract — "tested the bouba/kiki effect across speakers of 25 languages representing nine language families and 10 writing systems"

> Strong evidence that "bouba" = round and "kiki" = spiky — https://pubmed.ncbi.nlm.nih.gov/34775818/ §Abstract — "Overall, we found strong evidence for the effect across languages, with bouba eliciting more congruent responses than kiki."

**Use:** match shape to sound design and to names. Soft "b/m/o" sounds with round forms. Sharp "k/t/i" sounds with spiky forms.

### 7.3 Cute = round face, big eyes

> Baby schema — https://pubmed.ncbi.nlm.nih.gov/19451625/ §Abstract — "a set of infantile physical features, such as round face and big eyes, that is perceived as cute and motivates caretaking behavior"

> It lights up the brain's reward center (nucleus accumbens) — https://pubmed.ncbi.nlm.nih.gov/19451625/ §Abstract — "baby schema activates the nucleus accumbens, a key structure of the mesocorticolimbic system mediating reward processing and appetitive motivation"

**Use:** for a lovable mascot, use a big round head, large low-set eyes, and a small nose and mouth. This is peak shift (section 1.5) aimed at the cuteness response.

### 7.4 Where a shape's information lives

> Information sits on edges and piles up at the sharpest bends — https://www.princeton.edu/~wbialek/rome/refs/attneave_54.pdf §A Demonstration — "is further concentrated at those points on a contour at which its direction changes most rapidly (i.e., at angles or peaks of curvature)."

> Attneave's cat: 38 points joined by straight lines still read as a sleeping cat — https://www.princeton.edu/~wbialek/rome/refs/attneave_54.pdf §Fig. 3 — "Drawing made by abstracting 38 points of maximum curvature from the contours of a sleeping cat, and connecting these points appropriately with a straightedge."

> Concave (inward-bending) parts carry more information than convex parts — https://pubmed.ncbi.nlm.nih.gov/15631595/ §Abstract — "segments of negative curvature (i.e., concave segments) literally carry greater information than do corresponding regions of positive curvature (i.e., convex segments)."

**Use:**
- To simplify an icon or logo, keep the points of sharpest bend and the concave notches. Smooth the rest.
- In a shape morph, match the high-curvature points between the two shapes first. Those are what the eye tracks.

### 7.5 Beautiful curves: continuous, monotone curvature

> The eye is very sensitive to where curvature peaks and dips — https://levien.com/phd/thesis.pdf §2.9 Monotone curvature — "The human visual system is particularly sensitive to minima and maxima of curvature."

> So each segment should bend in one steady trend, like the Euler spiral (curvature grows in a straight line with length) — https://levien.com/phd/thesis.pdf §2.9 Monotone curvature — "The Euler spiral, in which curvature varies linearly with arc length, obviously has this property"

> Continuity alone is not enough; less curvature variation looks fairer — https://levien.com/phd/thesis.pdf §2.2 Continuity — "It seems clear that the one on the left, the G2 spline, is fairer, because it exhibits less variation in curvature."

> Curves car designers call "aesthetic" follow a straight line on a log-log plot of curvature (log-aesthetic curves) — https://arxiv.org/html/2206.00235v1 §Introduction — "the curves that car designers regard as 'aesthetic' have the common property that the frequency histogram of the radius of curvature follows a piecewise linear relation in a log-log scale."

> A squircle's curvature is continuous; a rounded square's is not — https://www.figma.com/blog/desperately-seeking-squircles/ §body — "The curvature of a squircle's perimeter is continuous, whereas a rounded square's is not."

> Figma corner smoothing of 0.6 matches the iOS icon shape — https://www.figma.com/blog/desperately-seeking-squircles/ §body — "ξ = 0.6 just about nails the iOS shape."

**Why the plain rounded rectangle looks slightly "off":** the straight edge has curvature 0. The arc has curvature 1/r. At the join, curvature jumps from 0 to 1/r. That is a steering-wheel jerk (section 3). The eye reads the jump as a faint seam, most of all in highlights and in motion.

**Use:** corner smoothing about 60% for UI cards and icons. Use Euler-spiral or log-aesthetic transitions for logo curves and motion paths.

### 7.6 Symmetry, grouping, and complexity

> Symmetry and complexity both shape beauty judgments — https://pubmed.ncbi.nlm.nih.gov/16087351/ §Abstract — "Behavioral results confirmed the influence of stimulus symmetry and complexity on aesthetic judgments."

> The Gestalt grouping rules, old and new — https://pubmed.ncbi.nlm.nih.gov/22845751/ §Abstract — "the principles of grouping, both classical (e.g., proximity, similarity, common fate, good continuation, closure, symmetry, parallelism) and new (e.g., synchrony, common region, element and uniform connectedness)"

In motion graphics, the two "motion" rules are the strongest glue:
- **Common fate:** things that move together belong together.
- **Synchrony:** things that change at the same moment belong together.

### 7.7 Composition inside a frame

> Center bias: a single subject is liked most at or near the center — https://pubmed.ncbi.nlm.nih.gov/18534113/ §Abstract — "preference was greatest for pictures whose subject was located at or near the center of the frame and decreased monotonically and symmetrically with distance from the center (the center bias)."

> Inward bias: a subject facing sideways should face into the frame — https://pubmed.ncbi.nlm.nih.gov/18534113/ §Abstract — "there was an additional preference for objects to face into rather than out of the frame (the inward bias)."

> The rule of thirds plays at most a minor role — https://www.uniklinikum-jena.de/anatomie1_media/Inhalte/AmirshahiARTP2014.pdf §Abstract — "the rule of thirds seems to play only a minor, if any, role in large sets of high-quality photographs and paintings."

> Balance (visual "center of mass" near the middle) predicts *balance* ratings; liking also needs even spread (homogeneity) — https://pubmed.ncbi.nlm.nih.gov/27014143/ §Abstract — "aesthetic preference does not only depend on balance but also on homogeneity"

**Use:**
- One subject: center it. If it faces or moves sideways, shift it back so it faces into the open space.
- The same holds for motion: a thing moving right should start left of center, with room ahead.
- Use thirds as a habit, not a law.

### 7.8 The golden ratio: real but fragile

> Green's 1995 review — https://pubmed.ncbi.nlm.nih.gov/8848362/ §Abstract — "It is concluded that there seems to be, in fact, real psychological effects associated with the golden section, but that they are relatively sensitive to careless methodological practices."

**Use:** 1.618 is a fine ratio. It is not magic. Nearby ratios work about as well. Its one hard, practical use is the golden *angle* (137.508°) for even packing (section 5.5).

---

## 8. Myths vs. evidence

| Claim | Verdict | Section |
|---|---|---|
| Golden ratio makes things beautiful | Weak, fragile effect | 7.8 |
| Rule of thirds | Minor, if any, role | 7.7 |
| Color-wheel harmony templates (triads, complements) | No evidence they predict good palettes | 6.6 |
| Blue is everyone's favorite / color preference is universal | Not universal (Himba) | 6.5 |
| Stagger helps viewers follow moving items | No; it can hurt tracking | 4.7 |
| People like "medium" complexity | Often two groups: simple-lovers and complex-lovers | 1.4 |
| Kuleshov effect is film folklore | It is real | 5.1 |
| Curve preference is universal | Reliable, medium-sized, not universal | 7.1 |
| sRGB (hex) gradients are fine | They go dark or gray; use Oklab / OkLCh | 6.3 |

---

## 9. The working rulebook

### Motion
- Ease with no jumps in acceleration (companion file §1.2).
- Duration grows with √distance and √size (sections 4.3, companion §1.8).
- Match motion energy to the emotion: speed and jitter = arousal (section 4.1).
- Close to real physics = serious. Big exaggeration = comedy (section 4.4).
- Keep tracked things under about 100°/s. On a phone, do not cross the full width in under about 0.15 s (section 4.6).
- Movers must differ in brightness from the background (section 4.8).
- Point with motion onset or a loom toward the viewer. Exit by receding (section 4.7).

### Motion graphics
- Cut on a motion onset to hide a cut. Cut at an action's end to mark a beat (section 5.1).
- Pace like an act: calm → darker middle → fast, bright climax → settle (section 5.2).
- Sound may trail a visual hit by up to about 3 frames at 30 fps. It should never lead by more than 1 (section 5.3).
- Hold text at least `max(words/3.97, chars/20)` seconds (section 5.4).
- Wobble with 1/f noise, flow with curl noise, flock with 3 rules, pack with 137.508° (sections 2.4, 5.5).
- Fractal textures around D 1.3–1.5 (section 2.3).

### Color
- Mix light in linear sRGB. Step and blend in Oklab / OkLCh (section 6.3).
- 2–3 neighboring hues + a wide light-to-dark spread + one contrasting focal hue (section 6.6).
- Brightness sets pleasantness, saturation sets energy (section 6.5).
- Show the light source so colors read as meant (section 6.2).
- Meaning in lightness first. Never red-vs-green alone (section 6.7).
- Track colorfulness per frame with the Hasler metric (section 6.4).

### Shape and layout
- Curves for friendly, downward V's for threat (section 7.1).
- Round head and big eyes for cute (section 7.3).
- Keep curvature continuous and monotone; corner smoothing about 60% (section 7.5).
- Simplify by keeping curvature peaks and concave notches (section 7.4).
- Center a single subject; face and move it into the frame (section 7.7).
- Low complexity + typical layout for a mass audience (section 1.6).
- One exaggerated dimension per piece (section 1.5).

### Safety
- At most 3 flashes per second. No large saturated-red flicker. At 30 fps, at least 10 frames per on-off pair (section 5.6).
- No high-contrast stripes near 3 cycles per degree, above all when moving (section 2.2).

---

## 10. Gaps: claims I could not pin today

Left out because the primary page was blocked, down, or behind a CAPTCHA:
- Biederman & Vessel (2006): the "opioid gradient" theory of perceptual pleasure (americanscientist.org 503; geon.usc.edu refused connection).
- Hurlbert & Ling (2007): cone-axis colour preference and the sex difference (cell.com 403; ADS CAPTCHA).
- Treisman & Gelade (1980) feature-integration theory and Itti–Koch saliency (ScienceDirect 403; the PubMed record has no abstract).
- Lindgaard et al. (2006) "50 ms" first impressions (tandfonline 403). Tuch et al. (section 1.6) covers the same ground.
- Palmer & Schloss's "80% of variance" figure (PMC behind a CAPTCHA). Their core finding is cited from the abstract.
- The film "miniature frame-rate" rule of thumb (industry pages blocked). Section 4.3 derives it from free-fall physics instead.
- Ou & Luo (2006) two-colour harmony model and Stevens's (1957) brightness exponent: no verbatim primary text reached.

---

## Method

- 91 search turns: 89 WebSearch queries, plus 2 Europe PMC database queries at the start.
- 80 sources: 51 PubMed records (abstract text pulled through NCBI E-utilities), plus 29 papers, specs, and pages read in full or in part.
- Every quote was copied from the fetched text. Key spec and blog quotes were re-checked by exact text match.
- "Math (derived here)" blocks are my own arithmetic from the cited numbers, not quotes.
