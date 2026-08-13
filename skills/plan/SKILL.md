---
name: plan
description: Write and run a long multi-session implementation plan that a cold session executes one gated step at a time. A planner session at maximum thinking settles every decision and writes the gates. An executor session at lower thinking implements one step, sees nothing else, and decides nothing the plan already decided. The `plan` CLI runs every check itself, refuses out-of-order marks, halts on staleness, and blocks back to the planner instead of waiting on a human. Use when a job is too big for one session, when work must survive compaction or a model swap, or when the user says "write a plan", "plan this out", "plan.json", "execute the plan", or names a `*.plan.json` file. Not for a task that one or two edits finish.
---

# plan

A step tracker for work that outlives one session. It splits the job three ways:

- The **planner** thinks at full depth, settles every decision, and writes the gates.
- The **executor** implements one step in a cold session, at lower thinking depth.
- The **tool** runs every check itself.

The executor is as capable as the planner. It reads code, runs commands, and looks at a
page. It is not weak. It is **cold** and **narrow**: it never watched the plan get
written, it sees one step at a time, and it must never grade its own work.

So the plan carries decisions, not code. Write the contract, not the diff.

No step waits on a human. When work cannot continue, the tool halts into
`plan/<name>.blocked.md` for the planner to amend.

## Install

`bin/plan.ts` is a single dependency-free file. Node 22.6+ strips the types natively.

```bash
ln -s ~/.agents/skills/plan/bin/plan.ts ~/.local/bin/plan
chmod +x ~/.agents/skills/plan/bin/plan.ts
node ~/.agents/skills/plan/bin/plan.test.ts   # self-checks, prints "all green"
```

## Commands

```bash
plan <name>                          # the one step to do now
plan <name> <step>                   # run its gate, mark it done, print the next
plan <name> <step> --block "why"     # halt and hand the step back to the planner
plan <name> --note "what you learnt" # record a fact every later step needs
plan <name> -l                       # validate and print the tree (run after you write a plan)
```

Use a bare name and no extension. `foo` resolves to `plan/foo.plan.json` under the
current directory and nowhere else, so plans stay per-repo. The tool prints exactly one
leaf, the next one, and refuses to mark any other. On the last step it prints `0` and
moves the file to `wip-plans/`. `plan/<name>.log` keeps the date and the commit of every
mark. `plan/<name>.notes.md` keeps the executor's notes and prints with every step.

## The file

`plan/<name>.plan.json` is an ordered tree. Any step can hold its own steps.

```json
{
	"_": "context every step needs: stack, conventions, aliases, traps",
	"scaffold_auth": {
		"s": "short group label — context only, never work",
		"t": "pnpm test && pnpm check",
		"c": {
			"session_cookie": {
				"s": "the outcome, the settled decisions, the pointers, the fence",
				"d": 0,
				"v": "test -f src/lib/session.ts",
				"t": "bash plan/verify_tests.sh && pnpm test && pnpm check"
			}
		}
	}
}
```

| key | meaning |
|---|---|
| `_` | top level only. The preamble prints with **every** step. It is the only place shared context can live |
| `s` | leaf: the whole step. Group (a node with `c`): a short label, context only |
| `d` | `0` or `1`, leaves only. Groups derive it from their children |
| `v` | staleness check, run **before** the step. Non-zero means the repo moved and the step's premise is gone, so the tool blocks it. Never runs at mark time |
| `t` | proof gate, run on the mark. Non-zero means no mark. Required on every undone leaf. `"-"` waives it on purpose |
| `c` | children. This makes the node a group. Groups never execute, only their leaves do |

Step names are snake_case and never numeric. Insertion order **is** plan order, and V8
reorders integer-like keys. To reorder, move the entry. Never rename it.

## Writing a plan

**Grill the user first.** Ask everything unresolved, in one pass. A plan written over an
unasked question gets rewritten. Then read the code and trace the real flow. A plan
written from the request alone is guesswork.

**`_` carries everything shared.** Stack, conventions, import aliases, traps, and the
repo's own rules. It is the only text the executor sees on every step. Anything parked
in step 1 is read once and lost, because a cold session runs each leaf and opens nothing
else.

**Decompose until no leaf holds a plan-level decision.** A step that a competent
implementer could take two defensible ways is a group. Give it `c` and split it.
Architecture, file layout, naming that later steps depend on, data shape, and library
choice all belong to the planner. Choices that die inside one function belong to the
executor.

## How much to write

The old failure was a vague plan given to a model that could not fill the gap. The new
failure is a plan that re-specifies work the executor does better itself. Both waste the
same thing: the planner's attention.

Write what the executor cannot recover. Write nothing else.

**Write this:**

- **The outcome.** One sentence for what is true when the step is done.
- **The decisions.** Paths, module layout, data shape, key names, the library, and the
  error contract. Anything a later step depends on, and anything a good implementer
  would settle a different, defensible way.
- **The pointers.** File paths and function names to start from.
- **The traps.** A gotcha you found when you read the code, and the reason for a choice
  that looks wrong from inside one step.
- **The fence.** Any tempting next thing that belongs to a later step.

**Do not write this:**

- **The implementation.** No quoted current code, no replacement code, no diff.
- **The procedure.** No "open the file, find the function, add the import".
- **Rediscoverable facts.** The executor reads the repo faster than you can quote it.
- **A defence of the choice** against alternatives the executor never considers.

A leaf runs 40 to 120 words. More than that means the leaf holds two steps, or it holds
an implementation. Split it, or cut it.

Quote code verbatim only when the exact bytes matter and the executor cannot derive
them: a magic constant, a credential name, a regular expression, a SQL migration, an
API payload shape, or a config block.

## Gates

**Every leaf is gated.** `t` is the command that proves the step. Combine three things:
the repo's own test and check commands, `test -f` or `grep -q` clauses for whatever the
step creates, and the step's own test when it has one. A green suite alone proves that
nothing broke, which is equally true when nothing was done. The existence clauses prove
that the step happened. The tool refuses to load a plan that has an ungated undone leaf.
A group's `t` fires when its last child is marked, so the whole-feature suite belongs
there.

**One-shot checks belong in the gate, not in a test file.** "`DESIGN.md` exists" and
"the demo folder is gone" are `test -f` and `test ! -d` clauses. They die with the plan.
Only real behaviour becomes a test that the repo carries for life.

**A visual step still gets a machine gate.** The executor opens the page and looks at
it, so say so in the step. But eyes are not a gate, because the tool never sees them.
Gate on something a command proves: the route returns 200, the built HTML holds the
class, the token appears in the CSS bundle. Let the eyes catch the rest. A step that
needs a real card, a real account, or a human decision gets `"t": "-"` and text that
tells the executor to block it at once.

**`v` guards a premise, not a patch.** Give a leaf a `v` when it assumes something
specific already exists: a file, an export, a table, or a route. Plans go stale, and a
step written today runs next week against a repo that moved. One `test -f` or one
`grep -q` turns a confusing failure into a clean block. A leaf that only creates new
things needs no `v`.

### Staged tests

The grader is never the student. A model that writes its own gate writes a gate that
passes.

Stage a test as a file when a wrong pass ships a real bug: money, authentication, access
control, data integrity, and the core behaviour the feature exists for. Everywhere else,
gate on the suite plus existence clauses, and let the executor write its own tests.

A staged test waits out of the way, at its destination path plus `.txt`:

```
plan/tests/<its real destination path>.txt
```

Mirror the destination path exactly. The `.txt` keeps every test runner and typechecker
off the file while it waits. A test cannot live at its final path from day one, because
it imports modules that later steps create, and every earlier gate would fail on them.

The leaf then gives one line per file, and says plainly not to edit it:

```
cp plan/tests/src/lib/pw.test.ts.txt src/lib/pw.test.ts
```

Ship `scripts/verify_tests.sh` from this skill as `plan/verify_tests.sh` beside the
plan. It runs `cmp` on every staged test that is already placed, and exits non-zero on
the first changed byte. Put it at the front of every gate, so a weakened step 3 test
fails step 12.

Write every staged test against the repo you are planning, and check that it imports
the module the plan creates. A staged test that no step copies is dead weight, and
`plan <name> -l` reports it.

Order leaves by dependency, foundations first. Each leaf leaves the repo green on its
own. Every leaf starts at `"d": 0`. Finish with `plan <name> -l` and fix every warning.

## Executing a plan

- Run `plan <name>`. Do what it prints, nothing else, and no "while I am here".
- Never open the plan file. Never pick a step. Never read ahead. Read-ahead makes you
  build for a step that the plan may drop.
- **Decide nothing the plan decided.** Its paths, data shape, names, and library choices
  are settled, and later steps depend on them. Inside those lines, implement the way you
  judge best. If the step does not name it, it is yours to choose, and the smallest
  thing that works and passes the gate wins.
- **Never weaken a staged test.** Copy it with the `cp` the step gives, byte for byte.
  Make it pass by a change to the implementation. You may add tests. You may not edit
  the planner's.
- **Settle the step completely.** A failed gate, a broken import, a red neighbouring
  test, or a surprise in the code all belong to this step. Fix it now.
- **Look at what you built** when the step touches a page, then still pass the machine
  gate.
- Run `plan <name> --note "<one line>"` when you learn a fact that a later step needs: a
  real API shape, a version trap, a name you had to pick. Notes print with every later
  step, and they are how one cold session tells the next what it found.
- Mark with the exact command that `plan` printed, and give it a generous timeout. Gates
  run on the mark. A failed gate means the step is unfinished, not that the tool is in
  the way.
- One step at a time. Commit after the mark, scoped to that step id.
- **Stuck, wrong, impossible, or already done another way**: run
  `plan <name> <step> --block "what you hit"`. Do not improvise, skip, or mark. Three
  failed gate attempts block the step for you.

## Unblocking a plan

`plan/<name>.blocked.md` is the planner's inbox, never the user's. It carries the step,
its gates, the failure output, the commit, and the reason. Read it, read the code it
points at, then pick one of three answers. Delete the file, which is what lets work
resume.

- **Fix the step.** This is the default, and it covers most blocks. The problem is
  local: a stale `v`, a wrong path, or a step that turned out to be two. Rewrite its
  `s`, fix its `v`, or give it `c` children and let traversal descend. Everything
  downstream stays untouched.
- **Truncate and regrow, in the same file.** Use this when the block changed what comes
  after it. Keep every `"d": 1` leaf, delete the undone ones, and write a fresh tail
  against the repo as it is right now. The untouched tail was written against a repo
  that has since moved, so it was half-stale anyway. Reach for this more often than
  feels natural.
- **New plan.** Only when the goal moved, or when the done work is abandoned. Archive
  the old plan to `wip-plans/` as a partial record.

Read `plan/<name>.notes.md` before you amend anything. It holds what the executor found
that you did not know when you wrote the plan.

Never delete a plan and rewrite it from scratch while you chase the same goal. The
`d: 1` marks and `plan/<name>.log` are the only record of what already exists, and
without them the executor redoes shipped steps.

The plan is a guess. The committed code is the fact. When they disagree, the code wins
and the plan is rewritten around it. A plan you are reluctant to throw away is about to
make you build the wrong thing to protect a sunk cost.

## Why it is shaped this way

Every rule here closes a hole that was found in practice.

- Shared context has nowhere to live, so it gets parked in step 1 and never read → `_`.
- A step assumes code that moved, and a cold session cannot tell → `v`.
- An optional gate is no gate. Two thirds of leaves once had none → gates are mandatory.
- "I looked at it in the browser" is not a check the tool can run → a visual step still
  gets a command that proves it.
- A test the executor typed is a test the executor can weaken → staged files plus `cmp`.
- "Stop and ask the user" dead-ends when nobody is watching → `--block` routes to the
  planner, and three strikes does it for you.
- A failing group gate used to un-tick the leaf that passed → the leaf stays done.
- One session finds a fact and the next session repeats the mistake → `--note`.
- A plan that quotes the implementation goes stale in a week and buries the decision it
  exists to carry → write the contract, not the diff.
