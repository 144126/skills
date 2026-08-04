# skills

Agent skills, installable with the [skills](https://skills.sh) CLI.

```bash
npx skills add 144126/skills
```

## plan

A step tracker for work that outlives one session, built for a specific split: **a strong model plans, a weak model implements, and the tool checks.**

```bash
npx skills add 144126/skills@plan
```

You write the plan and every test in it. A small, cheap, unattended model — deepseek, qwen, haiku, something local — implements one step at a time and decides nothing. The `plan` CLI runs every check itself.

- **one step at a time.** `plan <name>` prints exactly one leaf, the next one, and refuses to mark any other.
- **staleness checks.** Each step carries a `grep` for the code it is about to change. Plans go stale; an executor told to decide nothing cannot notice, and will paste the patch anyway. The grep fails first and halts.
- **mandatory gates.** A plan with an ungated step will not load. The gate is a shell command the tool runs on mark — non-zero exit means the step is not done.
- **the tests are yours.** They ship as staged files the executor copies, and a `cmp` guard fails the step if a single byte changed. A model has no copy operation: text inside a step gets re-emitted, and re-emitting is editing.
- **no human in the loop.** Stuck, stale, or three failed gates and it halts into `plan/<name>.blocked.md` for you to amend. It never waits on a person.

Needs Node 22.6+ and nothing else — `bin/plan.ts` is one dependency-free file.

Full docs in [`skills/plan/SKILL.md`](skills/plan/SKILL.md).
