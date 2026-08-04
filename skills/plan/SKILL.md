---
name: plan
description: Write and run a long multi-session implementation plan that a small, cheap, unattended model can execute without deciding anything. A strong model writes the plan and every test in it; a weak executor implements one gated step at a time; the `plan` CLI runs every check itself, refuses out-of-order marks, halts on staleness, and blocks itself back to the planner instead of waiting on a human. Use when a job is too big for one session, when handing implementation to a cheaper model (deepseek, qwen, haiku, a local model), when work must survive compaction or a model swap, or when the user says "write a plan", "plan this out", "plan.json", "execute the plan", or references a `*.plan.json` file. Not for a task one or two edits finish.
---

# plan

A step tracker for work that outlives one session, built for a specific split:
**a strong model plans, a weak model implements, and the tool checks.**

Nothing is taken on the executor's word. No step ever waits on a human — when work
can't continue it halts into `plan/<name>.blocked.md` for the planner to amend.

## Install

`bin/plan.ts` is a single dependency-free file. Node 22.6+ strips the types natively.

```bash
ln -s ~/.agents/skills/plan/bin/plan.ts ~/.local/bin/plan
chmod +x ~/.agents/skills/plan/bin/plan.ts
node ~/.agents/skills/plan/bin/plan.test.ts   # 14 self-checks, prints "all green"
```

## Commands

```bash
plan <name>                          # the one step to do now
plan <name> <step>                   # run its gate, mark it done, print the next
plan <name> <step> --block "why"     # halt and hand the step back to the planner
plan <name> -l                       # validate + print the tree (run after writing a plan)
```

Bare name, no extension — `foo` resolves to `plan/foo.plan.json` under cwd and nowhere
else, so plans are per-repo. It prints exactly one leaf, the next one, and refuses to
mark any other. On the last step it prints `0` and moves the file to `wip-plans/`.
`plan/<name>.log` keeps the date and commit of every mark.

## The file

`plan/<name>.plan.json` — an ordered tree. Any step can hold its own steps.

```json
{
	"_": "context every step needs: stack, conventions, aliases, traps",
	"scaffold_auth": {
		"s": "short group label — context only, never work",
		"t": "pnpm test && pnpm check",
		"c": {
			"session_cookie": {
				"s": "the entire step, exhaustively, including the cp command for its test file",
				"d": 0,
				"v": "grep -qF 'export function create_session' src/lib/session.ts",
				"t": "bash plan/verify_tests.sh && pnpm test && pnpm check"
			}
		}
	}
}
```

| key | meaning |
|---|---|
| `_` | top level only. preamble printed with **every** step — the only place shared context can live |
| `s` | leaf: the entire step. group (one with `c`): a short label, context only |
| `d` | `0`/`1`, leaves only — groups derive it from their children |
| `v` | staleness check, run **before** the step. non-zero = the repo moved and the step is lying → auto-block. Never run at mark time |
| `t` | proof gate, run on mark. non-zero = not marked. Required on every undone leaf; `"-"` waives it on purpose |
| `c` | children — makes the node a group. Groups are never executed, only their leaves |

Step names are snake_case and never numeric: insertion order *is* plan order, and V8
reorders integer-like keys. Reorder by moving the entry, never by renaming it.

## Writing a plan

**Grill the user first.** Everything unresolved, in one pass. A plan written over an
unasked question gets rewritten. Then read the code and trace the real flow — a plan
written from the request alone is guesswork.

**`_` carries everything shared.** Stack, conventions, import aliases, traps, the
repo's own rules. It is the only text the executor sees on every step. Anything parked
in step 1 is read once and lost, because a leaf is executed by a cold session that
opens nothing else.

**Decompose until no leaf contains a decision.** A step the implementer could do two
defensible ways is a group — give it `c` and split it. Architecture, file layout,
naming, library choice, data shape, error handling, edge cases: all settled by the
planner. The executor is not designing anything.

**Every leaf is self-contained and exhaustive**: exact file and line, current code
quoted, root cause, replacement code verbatim, why that over the alternatives. No
"update the handler". A cold, weak model must execute it from that one string plus `_`,
without opening the plan file or reading siblings. Long is fine; vague is not.

**Every leaf that quotes code carries a `v`** — a `grep -qF` for the anchor line it is
about to replace. Plans go stale: a leaf written today runs next week against code that
moved, and a weak executor cannot tell. It will paste the patch anyway. That one grep
is the difference between a stale plan and a confident wrong patch, and it is the whole
reason days-old instructions can be trusted to a cheap model.

**Every leaf is gated.** `t` is the exact command that proves it — the leaf's tests plus
the repo's check/lint, plus `test -f`/`grep -q` clauses for anything the step was
supposed to create. A green suite alone proves "nothing broke", which is equally true
when nothing was done; the existence clauses are what prove the step happened. The tool
refuses to load a plan with an ungated undone leaf. A group's `t` fires when its last
child is marked — that is where the whole-feature suite belongs.

**One-shot checks belong in the gate, not in a test file.** "DESIGN.md exists",
"the demo folder is gone" are `test -f` / `test ! -d` clauses. They die with the plan.
Only real behaviour becomes a test the repo carries for life.

**Anything visible in a browser is a `t`, not a promise.** Executors often have no eyes
— they read a page through an accessibility tree. Express it as CLI output piped through
`grep -q`. If it cannot be grepped it cannot be checked, and it must not be in the plan.
A step that genuinely needs eyes, real accounts or a card gets `"t": "-"` and text
telling the executor to `--block` it immediately.

### The tests are the planner's, and they are files

The grader is never the student. A model that authors its own gate writes one that
always passes.

But carrying a test *inside* the step text does not fix that: a model has no copy
operation. To put a 60-line test in the repo it re-emits it token by token, and
re-emitting is editing — it quietly "fixes" an import, adapts an assertion that looks
wrong, drops a case it doesn't follow. The gate then runs the test the executor wrote.

So write each test as a real file, staged out of the way:

```
plan/tests/<its real destination path>.txt
```

Mirror the destination path exactly and add `.txt` so no test runner or typechecker
globs it while it waits. A test cannot live at its final path from day one — it imports
modules that later steps create, and every earlier gate would fail on them.

The leaf then gives one line per file and says plainly not to type it, not to open it
to "check" it, not to adapt an import that looks wrong:

```
cp plan/tests/src/lib/pw.test.ts.txt src/lib/pw.test.ts
```

Ship `scripts/verify_tests.sh` (in this skill) as `plan/verify_tests.sh` beside the
plan. It `cmp`s every staged test that has already been placed and exits non-zero on the
first altered byte. Put it at the front of every gate, so weakening step 3's test to
rescue step 12 fails step 12.

Order leaves by dependency, foundations first; each leaf leaves the repo green on its
own. Every leaf starts `"d": 0`. Finish with `plan <name> -l` and fix every warning.

## Executing a plan

- Run `plan <name>`; do exactly what it prints, nothing else, no "while I'm here".
  Never open the plan file, never pick a step, never read ahead.
- **Decide nothing.** If the step doesn't say it, it isn't in scope. No architecture,
  naming, library, refactor or cleanup calls of your own.
- **Never author or edit a test.** Copy it with the `cp` given. Make it pass by changing
  the implementation — editing a test is fabricating the proof.
- **Settle the step completely.** A failing gate, a broken import, a red neighbouring
  test, a surprise in the code — all belong to this step. Fix it now.
- Mark with the exact command `plan` printed, with a generous timeout — gates run on
  mark. A failing gate means the step is unfinished, not that the tool is in the way.
- One step at a time. After the mark, commit scoped to that step id.
- **Stuck, wrong, impossible, or already done differently:**
  `plan <name> <step> --block "what you hit"`. Don't improvise, don't skip, don't mark.
  Three failed gate attempts block it automatically.

## Unblocking a plan

`plan/<name>.blocked.md` is the planner's inbox, never the user's. It carries the step,
its gates, the failure output, the commit and the reason. Read it, read the code it
points at, then pick one — and delete the file, which is what lets work resume.

- **Fix the step.** The default, and most blocks. The problem is local: a stale `v`, a
  wrong path, a step that turned out to be two. Rewrite its `s`, fix its `v`, or give it
  `c` children and let traversal descend. Everything downstream is untouched.
- **Truncate and regrow, same file.** When the block changed what comes *after* it. Keep
  every `"d": 1` leaf, delete the undone ones, write a fresh tail against the repo as it
  is right now. The untouched tail was written against a repo that has since moved, so it
  was half-stale anyway. Reach for this more often than feels natural.
- **New plan.** Only when the *goal* moved, or the done work is being abandoned. Archive
  the old one to `wip-plans/` as a partial record.

Never delete a plan and rewrite it from scratch while chasing the same goal — the `d: 1`
marks and `plan/<name>.log` are the only record of what already exists, and without them
the executor redoes shipped steps.

The plan is a guess; the committed code is the fact. When they disagree the code wins
and the plan is rewritten around it. A plan you are reluctant to throw away is about to
make you build the wrong thing to protect a sunk cost.

## Why it is shaped this way

Every rule here is a hole that was found in practice, not a preference:

- Steps go stale, and an executor told to decide nothing cannot notice → `v`.
- Shared context has nowhere to live, so it gets parked in step 1 and never read → `_`.
- An optional gate is no gate: two thirds of leaves had none → gates are mandatory.
- "I looked at it in the browser" is unverifiable, and worthless from a model with no
  eyes → browser checks are greps, or they are blocked.
- A test the executor typed is a test the executor can weaken → staged files plus `cmp`.
- "Stop and ask the user" dead-ends when nobody is watching → `--block` routes to the
  planner, and three strikes does it automatically.
- A failing group gate used to un-tick the leaf that passed → the leaf stays done.
