# The math and science of great motion design

Date: 2026-09-28

## The short answer

Great motion looks like **a real body with mass (weight), pushed by a real force, seen by a real eye**.

Three roots hold it up:

1. **Physics** — things speed up and slow down smoothly. They never jump. Springs, gravity, and friction are the models.
2. **The body** — human movement minimizes jerk (sudden change in push). The best easing curve is the same curve the arm uses when it reaches.
3. **The eye and brain** — the brain guesses ahead, reads cause and effect from timing, and sees life in anything that moves by itself. Motion works when it feeds those guesses.

Everything else (Disney's 12 principles, easing presets, Material durations) comes from these three.

---

## 1. Physics: motion is a smooth curve through time

### 1.1 The four derivatives

A derivative is "how fast something changes".

| Name | What it is | What a viewer feels |
|---|---|---|
| position `x` | where it is | the path |
| velocity `x'` | how fast it moves | speed |
| acceleration `x''` | how fast speed changes | weight, force |
| jerk `x'''` | how fast acceleration changes | smooth vs. robotic |

Rule: **a break in any of the first three looks wrong.**

- A jump in position = a teleport (glitch).
- A jump in velocity = linear motion starts and stops dead (robot).
- A jump in acceleration = a small "kink" (cheap tween).

The smoothest motion keeps position, velocity, and acceleration all continuous. That is the math of "smooth".

### 1.2 The minimum-jerk curve (the best ease-in-out)

Flash and Hogan (1985) found that human arm reaches follow the path that makes total squared jerk as small as possible. The answer, for a move from 0 to 1 in time 1:

```
x(t) = 10t³ − 15t⁴ + 6t⁵
```

- Speed is 0 at the start and the end.
- Acceleration is also 0 at the start and the end.
- The top speed is at the middle, and it is **1.875×** the average speed.

**The surprise:** this is exactly Ken Perlin's "smootherstep" fade `6t⁵ − 15t⁴ + 10t³` from Improved Noise (2002). Perlin picked it for graphics because its first and second derivatives are 0 at both ends. The brain picked it for the arm. Same curve, two roots.

Compare:

| Curve | Formula | Speed 0 at ends? | Accel 0 at ends? |
|---|---|---|---|
| linear | `t` | no | — |
| smoothstep | `3t² − 2t³` | yes | no (kink) |
| minimum jerk / smootherstep | `10t³ − 15t⁴ + 6t⁵` | yes | yes |

- Flash & Hogan minimum jerk — https://www.jneurosci.org/content/jneuro/5/7/1688.full.pdf — "the trajectory that minimizes the amplitude of the first temporal derivative of acceleration, or 'jerk'" (via J Neurophysiol 1998 summary, https://journals.physiology.org/doi/full/10.1152/jn.1998.80.2.696)
- Perlin fade — https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/perlin-noise-part-2/improved-perlin-noise.html — "The key to improving the interpolant was to remove second-order discontinuities"

### 1.3 Cubic Bézier: the tool everyone uses

CSS `cubic-bezier(x1, y1, x2, y2)` and After Effects easing both use a cubic Bézier (a curve pulled by 2 control handles):

```
B(s) = (1−s)³·P0 + 3(1−s)²s·P1 + 3(1−s)s²·P2 + s³·P3
P0 = (0,0), P3 = (1,1)
```

- The x part is time. The y part is progress.
- To get progress at a time, you first solve x(s) = t for s (Newton's method, a quick guess-and-fix loop), then read y(s).
- CSS `ease` = `(0.25, 0.1, 0.25, 1)`. `ease-in-out` = `(0.42, 0, 0.58, 1)`.
- Handle slope = start/end speed. Flat handles (y1 = 0, y2 = 1) mean speed 0 at the ends.
- A Bézier can never make acceleration 0 at the ends and still move. So it is always a little "kinked" versus minimum jerk. It is a good enough stand-in.

**Asymmetric easing** is what makes motion feel good in UI:
- Entering things: **ease-out** (fast start, soft landing). The thing arrives with energy and settles. Example: `(0, 0, 0.2, 1)`.
- Leaving things: **ease-in** (slow start, fast exit). They get out of the way.
- Moving on screen: ease-in-out.

### 1.4 Springs: the physics of "alive"

A spring is a second-order system (the math of any mass tugged back to a rest point):

```
x'' + 2ζω·x' + ω²·x = 0
```

- `ω` (omega) = natural frequency (how stiff the spring is).
- `ζ` (zeta) = damping ratio (how much friction slows it).

Three kinds:

| ζ | Name | Look |
|---|---|---|
| < 1 | underdamped | overshoots, wobbles, settles |
| = 1 | critically damped | fastest arrival with no overshoot |
| > 1 | overdamped | slow, heavy, sluggish |

Key formulas:

- Overshoot fraction = `exp(−πζ / √(1−ζ²))`.
  - ζ = 0.5 → 16% overshoot (bouncy).
  - ζ = 0.7 → 4.6% (lively).
  - ζ = 0.8 → 1.5% (almost none).
- Wobble frequency = `ω·√(1−ζ²)`.
- Time to settle within 2% ≈ `4 / (ζω)`.
- Critically damped, from 1 at rest to 0: `x(t) = (1 + ωt)·e^(−ωt)`.

**Apple's designer version** (WWDC 2018, "Designing Fluid Interfaces") uses 2 knobs instead of mass/stiffness/damping:
- **damping** (ζ): "from 100% damping, where there will be no overshoot to 0% damping where the spring would oscillate indefinitely".
- **response**: "how quickly the value will try and get to the target". It is the period `2π/ω` in seconds.
- Convert: stiffness `k = (2π / response)² · mass`, damping `c = 4π·ζ·mass / response`.

Why springs beat fixed curves:
1. **No fixed duration.** The time comes from the physics. Short moves end fast, long moves end later.
2. **Interruptible.** A spring can start from any position and any speed. If the user grabs a thing mid-flight, the spring keeps the current velocity. A Bézier restarts from 0 speed, which makes a velocity jump (a visible glitch).
3. **Hands off velocity.** A fling gives a speed. Feed it into the spring as its starting speed. The motion continues the hand.

- Apple WWDC18 — https://developer.apple.com/videos/play/wwdc2018/803/ — "the technical terms for these two properties are damping ratio and frequency response"

### 1.5 Momentum projection (where a fling lands)

Scrolling on iOS loses a fixed share of speed each millisecond (`decelerationRate` ≈ 0.998 normal). Total glide distance is a geometric series (sum of a shrinking list):

```
distance = (v / 1000) · r / (1 − r)     // v in points per second, r per ms
```

Apple uses this to decide which corner a flicked picture-in-picture window goes to: project where it would stop, then snap to the nearest target from there.

- Apple WWDC18 — https://developer.apple.com/videos/play/wwdc2018/803/ — "I take the velocity of the PIP and the deceleration rate, and I create that imaginary PIP position"

### 1.6 Frame-rate-proof smoothing

For "follow a target" motion (a cursor trail, a camera), use exponential decay (shrink the gap by the same share each second). This works at any frame rate:

```js
x += (target - x) * (1 - Math.exp(-lambda * dt))
```

- `lambda` = speed. Half-life = `ln 2 / lambda`.
- The common bug `x += (target - x) * 0.1` runs faster at 120 fps than at 60 fps.

### 1.7 Gravity, arcs, and squash

- Thrown things follow a **parabola** (`y = v·t − ½g·t²`). Up is slow at the top, fast at the bottom. This is where "slow-in slow-out at the peak of a jump" comes from.
- Joints turn, so hands and feet trace **arcs**, not straight lines. Straight paths read as machines.
- A bounce loses a fixed share of height each hit (coefficient of restitution, `e`). Height after n bounces = `h·e^(2n)`. Each bounce time shrinks by `e`.
- **Squash and stretch keep volume.** In 2D, keep `scaleX · scaleY = 1`. Stretch along the speed direction, squash on impact. This tells the eye the object is soft, not that it grew.

### 1.8 How long should a move take?

Physics gives a clear answer. With a fixed push (constant acceleration a), time to cross distance d, starting and ending at rest:

```
t = 2·√(d / a)
```

So **duration grows with the square root of distance**, not in a straight line. Twice the distance → about 1.41× the time. Material Design says the same in words: bigger and longer moves get more time, and a full-screen move gets 375 ms against 300 ms for normal.

Fitts' law (for pointing) grows even slower: `MT = a + b·log₂(2D/W)`.

- Material Design — https://m1.material.io/motion/duration-easing.html — "Transitions on mobile typically occur over 300ms ... with large, complex, full-screen transitions occurring over 375ms"
- Material: tablet ~30% longer (390 ms), wearables ~30% shorter (210 ms). Bigger screen = longer path = more time. This is the square-root rule in practice.

---

## 2. The body: why human motion looks the way it does

### 2.1 The two-thirds power law (slow on curves)

Lacquaniti, Terzuolo, and Viviani (1983): when people draw, the pen slows on tight curves and speeds up on straight parts.

```
angular speed A = K · C^(2/3)      (C = curvature)
same thing:  speed V = K · R^(1/3) (R = radius of the curve)
```

- It holds for drawing, feet, and walking paths.
- Motion that breaks this law looks less natural to people.
- **Design use:** along a motion path, slow down in tight turns. Constant speed through a sharp corner looks mechanical.

- Lacquaniti 1983 — https://journals.physiology.org/doi/full/10.1152/jn.00421.2014 — "angular velocity is proportional to the curvature raised to the two-thirds power"

### 2.2 Anticipation is real physics

Before a jump, people dip down first (a countermovement). The muscle stretches, stores energy, then fires. That is Disney's **anticipation** principle. It also gives the viewer's eye a warning so it is looking in the right place when the main move happens.

### 2.3 Overlap and follow-through are low-pass filters

A body is a chain: torso → arm → hand → hair. Each link is loosely tied to the one before. So each one starts late and stops late. In math, each link is a spring driven by the link before it. The result is:

- lag (each part is behind), and
- overshoot at the end (hair keeps going after the head stops).

**Design use:** drive child parts with springs that follow the parent. Offset start times (stagger) do the cheap version.

### 2.4 Motion carries identity

Johansson (1973) put about 12 lights on an actor's joints in the dark. A still frame looks like random dots. The moving film instantly looks like a person walking, and people can even tell the sex, mood, and who it is.

**Lesson:** timing alone carries character. Get the timing right before the drawing.

- Johansson 1973 — https://en.wikipedia.org/wiki/Biological_motion_perception — "Stills from the resulting movies do not elicit impressions of a human figure"

---

## 3. The eye and brain: what the viewer actually sees

### 3.1 Motion is made from still frames (apparent motion)

Film is still images. The brain fills the gaps.

- **Korte's laws (1915):** bigger jumps between frames need longer gaps to still look like motion. If a thing jumps too far in one frame, the viewer sees two things blinking, not one thing moving.
- **Watson and Ahumada (window of visibility):** sampled motion looks the same as real motion only if the extra "copies" made by sampling fall outside what the eye can detect. Faster motion and sharper edges need higher frame rates.
- **Motion blur** hides this. Film uses a 180° shutter: at 24 fps each frame is exposed for 1/48 s. Blur length = speed × exposure time.

**Design use:**
- Fast, sharp-edged objects strobe (flicker in steps). Fix with more fps, motion blur, or softer edges.
- A long pan of fine detail at 24 fps judders. Slow it down or blur it.

- Korte — https://en.wikipedia.org/wiki/Korte's_third_law_of_apparent_motion — "larger separations require slower presentation rates"
- Watson & Ahumada — https://opg.optica.org/josaa/abstract.cfm?uri=josaa-3-3-300 — "The critical sample rate is shown to depend on the spatial and the temporal acuity of the observer and on the velocity and spatial-frequency content of the image"

### 3.2 The brain predicts ahead (representational momentum)

Freyd and Finke (1984): when a moving thing vanishes, people remember it a bit further along its path than where it stopped.

The brain runs a forward model (a guess of what comes next).

**Design use:**
- Overshoot and settle matches that guess. The thing goes where the brain expected, then comes back. It feels "right".
- A dead stop fights the guess. It feels like hitting a wall.
- Smooth motion is easy to predict, so it costs less attention.

- Freyd & Finke — https://en.wikipedia.org/wiki/Representational_momentum — "the tendency to misremember the final position of a briefly presented moving object as being displaced forward in the direction of its motion"

### 3.3 Cause and effect has a timing window (Michotte)

Michotte's launching effect: ball A hits ball B, A stops, B moves. People **see** A push B. It is a direct feeling, not a thought.

- A delay of 0–70 ms keeps the "push" feeling.
- Past about 100 ms, it becomes two separate motions.
- A 2025 replication found the delay results differ from Michotte's, so treat the numbers as rough.

**Design use:** when a tap causes a response, or one element knocks another, start the reaction within about 50–70 ms. Slower, and the link between them breaks.

- Michotte — https://pmc.ncbi.nlm.nih.gov/articles/PMC12434928/ — "observers could perceive a clear launching effect when a 0–70 ms delay was present"

### 3.4 The brain sees life in self-driven motion

- **Heider and Simmel (1944):** a short film of 2 triangles and a circle. Nearly everyone told a story of feelings, bullying, and escape.
- **Tremoulet and Feldman (2000):** a single dot looks alive when it changes speed or direction **with no outside cause**.

**Design use:**
- A thing that speeds up by itself, pauses, or turns reads as alive (a character).
- A thing that only slows down reads as a dead object obeying physics.
- Want a logo with personality? Give it self-caused changes: a pause, a look, a small hop before moving.

- Heider & Simmel — https://pmc.ncbi.nlm.nih.gov/articles/PMC7932368/ — "observers could perceive simple animated geometric shapes as characters with emotions, intentions"

### 3.5 Motion grabs attention, so it is a budget

Abrams and Christ (2003): a thing that **starts** moving grabs attention automatically. Things that are already moving do not.

- The eye is most sensitive to motion at the edge of vision (periphery).
- So a moving thing in the corner steals focus from what the user is reading.

**Design use:**
- Use a motion start to point at the one thing that matters.
- Never loop idle motion near text people must read.
- One lead motion at a time. Others follow it or stay still.

- Abrams & Christ — https://pubmed.ncbi.nlm.nih.gov/12930472/ — "there was an advantage for objects that had recently started to move despite the fact that the motion was uninformative"

### 3.6 Things that move together belong together (common fate)

Gestalt "common fate" (Wertheimer, 1923): elements that move the same way are seen as one group.

**Design use:**
- Move a card and its contents together. They read as one object.
- **Stagger** (small start delays, often 20–50 ms each) breaks a group into a list. The eye can then read the order.
- Too much stagger feels slow. Keep the total under about half a second.

### 3.7 Small changes are invisible (Weber's law)

People can notice a speed change of only about **5–6%** (McKee 1981 and later work).

**Design use:** tweaking a speed or duration by 2% does nothing people can see. Change in steps of 10% or more when tuning.

- Speed discrimination — https://www.science.org/doi/10.1126/science.131.3416.1809 and https://pubmed.ncbi.nlm.nih.gov/3739236 — "Weber fractions of about 0.06 for velocity discrimination"

### 3.8 Time to contact (tau)

Lee (1976): the eye judges "how soon will it hit me" from how fast an image grows, relative to its size:

```
tau = size / (rate of growth)
```

**Design use:** a zoom that grows at a steady rate feels like a crash coming. A scale that eases out feels like it arrives and stops. For a zoom that feels steady, scale **exponentially** (the same percent per frame), not linearly.

- Lee 1976 — https://www.researchgate.net/publication/236849990_Lee's_1976_Paper — "tau is defined as the inverse relative expansion rate of the object's image on the retina"

### 3.9 Motion quality depends on light, not color

The fast motion system in the eye reads **brightness (luminance)** differences. Two colors of the same brightness moving against each other look slow and mushy.

**Design use:** keep moving elements clearly lighter or darker than the background.

---

## 4. Time scales: the numbers that matter

| Time | What happens there | Source |
|---|---|---|
| ~8–17 ms | one frame at 120/60 fps | display |
| 0–70 ms | one event "causes" the next | Michotte |
| 100 ms | feels instant | Miller 1968, Nielsen |
| 150–300 ms | small UI moves (buttons, toggles) | Material practice |
| 300 ms | standard mobile transition | Material |
| 375 ms | full-screen transition | Material |
| 500 ms | one beat at 120 bpm, the tempo people move to naturally | Moelants 2002 |
| 1 s | flow of thought stays unbroken | Nielsen |
| 10 s | attention holds | Nielsen |

- Nielsen — https://www.nngroup.com/articles/response-times-3-important-limits/ — "0.1 second is about the limit for having the user feel that the system is reacting instantaneously"
- Moelants — https://www.semanticscholar.org/paper/Preferred-tempo-reconsidered.-Moelants/b0db06a5a8b2c1942afff5c317c5f6da55a7dcf7 — "participants moving naturally at a tempo of around 120 bpm (or a 500ms delay in between pulses)"

**Rhythm:** people entrain (lock on) to a beat between about 80 and 160 bpm. Cuts and hits placed on the beat feel "right" because the brain is already predicting that moment. This is the same forward-model idea as 3.2, applied to time.

---

## 5. When motion helps and when it hurts

Tversky, Morrison, and Bétrancourt (2002) reviewed studies. Animation often did **not** beat still pictures for teaching. Two rules decide it:

- **Congruence:** use motion only to show change over time, or a change in place.
- **Apprehension:** the viewer must be able to see and follow it. Most animations are too fast or too busy.

Dragicevic et al. (2011) tested object tracking during chart transitions. Slow-in/slow-out pacing helped people follow many moving objects better than constant speed. (Summary from the paper's CHI entry; the full text was not reachable today.)

Heer and Robertson (2007): break big transitions into **stages** (first move, then resize, then recolor). People track one change at a time much better.

- Tversky 2002 — https://www.sciencedirect.com/science/article/abs/pii/S1071581902910177 — "Animations are often too complex or too fast to be accurately perceived"
- Dragicevic 2011 — https://dl.acm.org/doi/10.1145/1978942.1979233

**Motion sickness:** big zooms, parallax (layers moving at different speeds), and spins can make some people sick. The eye says "moving", the inner ear says "still". Respect `prefers-reduced-motion`: swap big moves for fades.

---

## 6. Natural noise: why "random" should not be random

- Pure random jitter (white noise) looks like static.
- Nature shakes with **1/f noise** (pink noise): slow big drifts plus smaller fast shakes.
- Perlin noise with several octaves (layers) gives this. Each layer: double the speed (lacunarity 2), half the size (gain 0.5). This is fractal Brownian motion (fBm).

**Design use:** camera shake, floating, breathing, flicker — all use layered Perlin/simplex noise, not `Math.random()` each frame.

---

## 7. Disney's 12 principles, mapped to the roots

From Thomas & Johnston, *The Illusion of Life* (1981), brought to 3D by Lasseter (SIGGRAPH 1987).

| Principle | Root |
|---|---|
| Squash and stretch | volume kept: `sx·sy = 1` (1.7) |
| Anticipation | countermovement (2.2), warns the eye (3.5) |
| Staging | attention budget (3.5), apprehension (5) |
| Straight ahead / pose to pose | two ways to sample a curve |
| Follow-through and overlap | chained springs, low-pass lag (2.3) |
| Slow in and slow out | no velocity jumps (1.1), minimum jerk (1.2) |
| Arcs | joints rotate (1.7), two-thirds law (2.1) |
| Secondary action | coupled systems, noise (6) |
| Timing | mass shown through acceleration (1.8), identity (2.4) |
| Exaggeration | beat the 5% notice limit (3.7); push past it on purpose |
| Solid drawing | stable form so common fate groups it (3.6) |
| Appeal | self-caused motion reads as alive (3.4) |

---

## 8. A working recipe

1. **Decide the job.** Does the motion show a change, a cause, or a place? If none, cut it (5).
2. **Pick the model.**
   - User can touch or interrupt it → spring, start with ζ = 1, response 0.3–0.5 s. Add bounce (ζ 0.7–0.8) only for playful moments.
   - Fixed, one-off move → minimum-jerk or an ease-out Bézier.
   - Follow a moving target → exponential decay (1.6).
3. **Set duration by distance.** ~150 ms small, 300 ms normal, 375 ms full-screen. Grow with √distance.
4. **Use arcs, and slow down in curves** (2.1).
5. **React within 70 ms** to any input or impact (3.3).
6. **One lead motion.** Group with common fate, order with 20–50 ms stagger (3.6).
7. **Land with a small overshoot** when it should feel alive; stop clean when it should feel precise (3.2).
8. **Check frames.** Fast sharp things need blur or more fps (3.1).
9. **Tune in 10%+ steps** (3.7).
10. **Respect reduced motion** (5).

---

## Code: the core curves

```js
const min_jerk = t => t * t * t * (10 - 15 * t + 6 * t * t)

const smooth_follow = (x, target, lambda, dt) =>
  x + (target - x) * (1 - Math.exp(-lambda * dt))

function spring_step(s, target, zeta, response, dt) {
  const w = 2 * Math.PI / response
  const a = -w * w * (s.x - target) - 2 * zeta * w * s.v
  s.v += a * dt
  s.x += s.v * dt
  return s
}

const project = (v, r = 0.998) => (v / 1000) * r / (1 - r)
```

`spring_step` uses semi-implicit Euler (update speed first, then position). It stays stable at small `dt`. Run it at a fixed step, such as 1/240 s, for exact results.
