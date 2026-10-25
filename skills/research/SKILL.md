---
name: research
description: "Search-loop web research with verbatim, pinned cites. Use for web research, evidence, fact checks, or whenever the user wants to find out what is true. Always goes all the way. Infinite mode never stops until the user says stop."
---

# Research

1. Split the question into the fewest checkable claims, hidden premises included.
2. Each round, one new query at the weakest claim, alternating: find it, then try to kill it. Search, take 9 hits.
3. Read the primary hits: fetch `<url>`. Snippets are never evidence. Check quotes against the original page or image, never against your own transcription.
   Blocked hosts (PubMed, PMC, ResearchGate, journal sites: `bot_blocked`, cookie wall, `target_unreachable`): get the abstract from Europe PMC REST, fetch 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:<pmid>&resultType=core&format=json' (field `abstractText`). Single-quote URLs containing `(`, `)` or `&`, or bash eval errors.
4. Rewrite `~/search/<topic>.md`: answer, then each claim with grade (`solid`, `likely`, `weak`, `contested`, `absent`), rival, and cites as `<url> — "<verbatim quote>"`. Drop anything unpinned.
5. Stop after N rounds if set; `infinite` never stops. Else stop when every claim is graded and 2 rounds changed nothing. Reply: answer, grade, file, rounds, sources.
