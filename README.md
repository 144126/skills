# skills

Agent skills, installable with the [skills](https://skills.sh) CLI.

```bash
pnpm dlx skills add 144126/skills
```

## web-build

Build websites with SvelteKit, TypeScript, pnpm, and Cloudflare. Add Qdrant when a database is needed. Personal preference files and companion skills are optional.

```bash
pnpm dlx skills add 144126/skills --skill web-build
```

[View on skills.sh](https://skills.sh/144126/skills/web-build).

## creative skills

Research reports are included in each skill that reads them. Color guidance is in `graphic-design` and the motion, color, and shape report. Sound effects use `sound-design`, `sfx-gen`, and `sfx-pack`.

```bash
pnpm dlx skills add 144126/skills --skill creative
```

Replace `creative` with any name below. Give several names to install them together.

| skill | use |
|---|---|
| [creative](skills/creative/SKILL.md) | Generate and choose fresh ideas. |
| [sound-design](skills/sound-design/SKILL.md) | Choose, place, and mix sound. |
| [sfx-gen](skills/sfx-gen/SKILL.md) | Generate sound effects with ElevenLabs. |
| [sfx-pack](skills/sfx-pack/SKILL.md) | Build sound effects with SoX and FFmpeg. |
| [video-edit](skills/video-edit/SKILL.md) | Choose cuts, pace, shot order, and caption timing. |
| [graphic-design](skills/graphic-design/SKILL.md) | Design layouts, type, color, and shapes. |
| [ui-ux](skills/ui-ux/SKILL.md) | Design and review screens and user flows. |
| [motion-doctrine](skills/motion-doctrine/SKILL.md) | Keep direction and motion continuous between scenes. |
| [motion-graphics](skills/motion-graphics/SKILL.md) | Build short motion graphics with HyperFrames. |
| [cut-the-curve](skills/cut-the-curve/SKILL.md) | Choose transitions and motion curves. |
| [oversized-cursor](skills/oversized-cursor/SKILL.md) | Use a cursor to lead action. |
| [seam-craft](skills/seam-craft/SKILL.md) | Render clean joins between scenes. |
| [captions-overlay](skills/captions-overlay/SKILL.md) | Place and time captions. |
| [remotion-to-hyperframes](skills/remotion-to-hyperframes/SKILL.md) | Convert Remotion source into HyperFrames. |
| [win-freelancer-contests](skills/win-freelancer-contests/SKILL.md) | Choose and enter design contests. |

The HyperFrames workflows also need its companion skills from [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes). Install those through HyperFrames setup. `sfx-gen` needs `ELEVENLABS_API_KEY`; contest submission needs `FREELANCER_TOKEN`.

## plan

A step tracker for work that outlives one session, built for a specific split: **a strong model plans, a weak model implements, and the tool checks.**

```bash
pnpm dlx skills add 144126/skills@plan
```

You write the plan and every test in it. A small, cheap, unattended model — deepseek, qwen, haiku, something local — implements one step at a time and decides nothing. The `plan` CLI runs every check itself.

- **one step at a time.** `plan <name>` prints exactly one leaf, the next one, and refuses to mark any other.
- **staleness checks.** Each step carries a `grep` for the code it is about to change. Plans go stale; an executor told to decide nothing cannot notice, and will paste the patch anyway. The grep fails first and halts.
- **mandatory gates.** A plan with an ungated step will not load. The gate is a shell command the tool runs on mark — non-zero exit means the step is not done.
- **the tests are yours.** They ship as staged files the executor copies, and a `cmp` guard fails the step if a single byte changed. A model has no copy operation: text inside a step gets re-emitted, and re-emitting is editing.
- **no human in the loop.** Stuck, stale, or three failed gates and it halts into `plan/<name>.blocked.md` for you to amend. It never waits on a person.

Needs Node 22.6+ and nothing else — `bin/plan.ts` is one dependency-free file.

Full docs in [`skills/plan/SKILL.md`](skills/plan/SKILL.md).

## atomic-task-graph

```bash
pnpm dlx skills add 144126/skills@atomic-task-graph
```

A long-horizon task as a graph, not a list: recursive interface-preserving decomposition, a pre-execution thought experiment, dependency-aware parallel execution, and minimal-subgraph repair that freezes validated work instead of replanning from scratch. Graphs are plain text you can read, diff and commit. Implements [arXiv 2607.01942](https://arxiv.org/abs/2607.01942).

## bible-search

```bash
pnpm dlx skills add 144126/skills@bible-search
```

Semantic search over the Bible (Young's Literal Translation) against a live API backed by a state-of-the-art embedding model. Finds a passage by what it means, not by remembering the reference.

## deepbibleresearch

```bash
pnpm dlx skills add 144126/skills@deepbibleresearch
```

Triggered by `dbr`. Loops on a question — searching, reading, re-searching from new angles — until it reaches an exact, unambiguous answer or has the evidence to synthesise one. For "prove that…", "find every place where…", "does scripture support…".

## digital-root

```bash
pnpm dlx skills add 144126/skills@digital-root
```

Triggered by `ndr`. Maps each letter to its alphabet position, adds any digits, reduces to one digit.

## speak-doc

```bash
pnpm dlx skills add 144126/skills@speak-doc
```

Compress a body of text into statements of fact and read it aloud with Gemini TTS. Saves the audio, Ctrl+S stops playback.

## condense

```bash
pnpm dlx skills add 144126/skills@condense
```

Turns one block of text or a file into quote-anchored facts — no web, no search. Every claim carries a verbatim quote from the source; numbers and negation are checked against that quote, and anything that can't be matched lands in a Rejected section instead of the output. For merging live web results into an audited ledger, see `condense-search`.

## condense-search

```bash
pnpm dlx skills add 144126/skills@condense-search
```

Triggered by `cnd`. Turns a web search into an audited claim ledger instead of a summary: search, fetch live pages through Firecrawl, extract quote-anchored claims per page, then grade each one — corroborated, single-source, contested, vendor-only, or unchecked. No claim is ever marked "settled." Needs a Firecrawl key at `~/.agents/secrets/firecrawl.env`.

## deep-research-prompt-engineer

```bash
pnpm dlx skills add 144126/skills@deep-research-prompt-engineer
```

Triggered by `drpe`. Sits in front of a deep-research skill and turns a vague topic into a hyper-detailed research prompt — 13 required dimensions, source-type and citation requirements, contrarian and gap-finding instructions — before invoking research with it. Can also pull its own topic queue from a personal reading-list file when none is given.

## dre

```bash
pnpm dlx skills add 144126/skills@dre
```

Triggered by `dre`. Deep Research → Markdown Report, with an authenticity bar: every source must be a first-person account from the operator themselves, with real numbers and real decisions — ghostwritten SEO listicles get discarded. Fans out parallel research agents across founder blogs, build-in-public posts, and interview transcripts, then synthesises a tiered, cited report to `~/research/<topic-slug>.md`.

## flyer-prompt-designer

```bash
pnpm dlx skills add 144126/skills@flyer-prompt-designer
```

Interviews the user category by category — genre, hierarchy, typography, color, CTA, format — then builds a single precisely engineered ChatGPT Image 2.0 prompt for a flyer or poster, applying prior deep-research reports on flyer design and image-model prompting.

## logo-prompt-designer

```bash
pnpm dlx skills add 144126/skills@logo-prompt-designer
```

Same approach as `flyer-prompt-designer`, for logos: loads generic logo-design research, invokes `deep-research-prompt-engineer` to research the user's specific industry and competitors, then interviews and builds a single ChatGPT Image 2.0 prompt applying both.

## snxe

```bash
pnpm dlx skills add 144126/skills@snxe
```

Triggered by `snxe`. Exhaustive multi-pass web research through Firecrawl — 8-20+ live (never cached) searches with citation tracking and bounded per-result output, for when a quick lookup isn't enough.

## wydsc

```bash
pnpm dlx skills add 144126/skills@wydsc
```

Triggered by `wydsc`. One-line answers for Waydroid keyboard shortcuts — no explanation, no preamble, just the key combo and what it does.

## compare-models

```bash
pnpm dlx skills add 144126/skills@compare-models
```

Compare two or more AI models on benchmark scores. Separates the benchmarks they share from the ones only one of them reports, so a comparison can't quietly cherry-pick. Triggers on "compare X vs Y", "benchmark scores for", "which is better".

## premium-web-design

```bash
pnpm dlx skills add 144126/skills@premium-web-design
```

Build sites with award-tier craft — concept-driven direction, editorial typography, choreographed motion, custom scroll feel. Use it when a page has to feel premium, expensive, cinematic, or simply not like a template, and when an existing design looks generic, default, or AI-generated and needs lifting to studio quality.

## ghost-edit

```bash
pnpm dlx skills add 144126/skills@ghost-edit
```

Edit a document in small bits without putting the agent's own prose in the file. The agent drafts one bit in chat, you reword it, and only your reword is written (grammar and typos fixed).

## design-ideation-engine

```bash
pnpm dlx skills add 144126/skills@design-ideation-engine
```

The thinking phase, before any code: a seven-step creative process for generating award-level design concepts, drawn from Glaser, Scher, Carson and Sagmeister interviews, Awwwards case studies and IDEO methodology. Acts as a creative director rather than an implementer — pair it with premium-web-design, which builds what it decides.

## research

```bash
npx skills add 144126/skills@research
```

Search-loop web research that goes all the way: search 9 hits, fetch the best pages to files, update succinct conclusions in `~/search/<slug>.md`, and loop on the gaps. Trigger `infinite` and it does not stop until told.

## root

```bash
npx skills add 144126/skills@root
```

Peel any question to its indivisible first-principles reason. Names the thing, asks "why that?" down through each layer, checks every empirical claim against live pages, and stops only when the next "why" changes the subject.

---

## Configuration

The research skills (`dre`, `deep-research-prompt-engineer`, `logo-prompt-designer`, `flyer-prompt-designer`) read two optional environment variables:

| variable | default | what it is |
|---|---|---|
| `RESEARCH_DIR` | `~/research` | where reports are written and read back from |
| `RESEARCH_QUEUE` | `~/research/queue.md` | plain list of topics, one per line, for unattended research runs |

Neither needs setting to use the skills — the defaults work.
