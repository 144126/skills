---
name: research
description: "Search-loop web research with verbatim, pinned cites. Use for web research, evidence, fact checks, or whenever the user wants to find out what is true. Always goes all the way. Infinite mode never stops until the user says stop."
---

# Research

1. Split the question into the fewest checkable claims, hidden premises included.
2. Each round, one new query at the weakest claim, alternating: find it, then try to kill it. `tinyfish search query '<query>'`, take 9 hits. Never pass `--highlights`.
3. Read the primary hits. Snippets are never evidence.
4. Rewrite `~/search/<topic>.md`: answer, then each claim with grade (`solid`, `likely`, `weak`, `contested`, `absent`), rival, and cites as `<url> — "<verbatim quote>"`. Drop anything unpinned.
5. Stop after N rounds if set; `infinite` never stops. Else stop when every claim is graded and 2 rounds changed nothing. Reply: answer, grade, file, rounds, sources.
