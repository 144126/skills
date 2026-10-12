---
name: research
description: "Search-loop web research with verbatim, pinned cites. Use for web research, evidence, fact checks, or whenever the user wants to find out what is true. Frames the question, splits it into claims, searches 9 hits a round, reads the pages, traces each fact to its primary source, tries to kill each answer, and grades how sure each claim is. Always goes extremely deep and all the way. Infinite mode never stops until the user says stop."
---

# Research

The goal is an answer a skeptic can check. Pin every fact to the page that states it. Say how sure you are of every claim, and why.

Always go extremely deep and all the way. A first good answer is not the answer. Keep peeling until the question has no gaps left and the sources run out.

- Run the loop yourself. Do not run `research.ts`: it is the Pi copy's script (`~/.pi/agent/skills/research/bin/research.ts`).
- Files already in `~/search` are past outputs, never sources. Cite only the web URL of a page you fetched and read in this run.
- Search and fetch with tinyfish. Use curl only for Fallbacks. Never pass `--highlights`: it returns 403 on this account.
- Never stop to ask. If the question has two readings, research the likelier one and list the other under Open.

## Files

- `<file>` is `~/search/<topic>-first-principles.md`. `<topic>` is 2 to 6 lowercase words joined by hyphens. If the file exists and the user did not ask to continue it, pick a more specific topic.
- `<d>` is the scratch dir `/tmp/research-<topic>`.
- `<d>/queries.txt` gets one line per round: `<claim id> <find|kill> <query>`. A search turn is one round, so search turns = its line count.
- `<d>/urls.txt` gets one line per unique URL fetched. The page text for line n is in `<d>/f<n>.md`. A source is one unique URL fetched, so sources = its line count.
- `<file>` and `<d>` are your memory. After a context reset, read them before the next round.

Keep `<file>` succinct and in this shape. Rewrite it every round. Do not just add to the end.
```
# <the exact question>
Scope: <place, time, population, version>
Decision: <what the user will do with the answer; which answer would change that>
As of <YYYY-MM-DD>. Search turns: <k>. Sources: <m>. Rounds without change: <r>.
## Answer
<1 to 5 lines. Each joins claims by id (C1, C3), adds no fact, and ends with the grade of its weakest claim.>
## Claims
### C1 <one checkable claim> — <grade>: <why, e.g. one primary (official docs)>
> <cite, one per line>
## Open
- C2: <what is missing> — next: <query>
- root: <a "why" deeper than the question; the root skill's job, not this one>
```

## 1. Frame

Make the dirs: `mkdir -p ~/search <d> && touch <d>/queries.txt <d>/urls.txt`. Then write the head of `<file>`:
- Question: one exact sentence. Define each word that could mean two things.
- Scope: place, time, population, version. If the user gave none, use: as of today, the latest version, and the place and group the question implies.
- Decision: what the user will do with the answer, and which answer would change that. If the user did not say, write the likeliest use.

Done when no word in the question has two meanings left. Check: `grep -cE '^(# |Scope: |Decision: ).+' <file>` prints 3.

## 2. Claims

Split the question into the fewest claims that must all hold for an answer. Each claim is one checkable fact: who, what, how much, when, which version. Add the question's hidden premises as claims too, because a false premise changes the answer. Write each as `### C<n> <claim> — open: not searched`. What you already know is a lead for queries, never evidence. Add a claim whenever pages show the answer depends on something new.

Done when you can say "if C1 and C2 and … hold, then <answer>", and that answer needs no fact outside the claims.

## 3. Round

One round is one query aimed at one claim. Repeat until Stop.

1. Pick the target and the kind of query.
   - Target the claim that could most change the answer. A `solid` or `likely` claim with no kill round yet gets `kill`. Every other target gets `find`.
   - `find`: use the words a primary source would use: the exact term, error string, statute number, or spec name. Put exact phrases in double quotes inside single quotes: `'"exact phrase" word'`. Aim at primaries with `--include-domains a.org,b.gov`. Drop junk with `--exclude-domains x.com`. Use `--language` and `--location` when the Scope is another country. To find who cites a key source, search its exact title.
   - `kill`: search for what would prove the leading answer wrong. That is the opposite claim, or the claim plus wrong, bug, deprecated, amended, retracted, criticism, or failed to replicate.
   - Change the words each round: the technical term, the plain term, a synonym. Check the query is new: `cut -d' ' -f3- <d>/queries.txt | grep -cxF '<query>'` prints 0.
2. Log the query and search. The first command prints the round number `<k>`.
   `echo '<claim id> <find|kill> <query>' >> <d>/queries.txt && wc -l < <d>/queries.txt`
   `tinyfish search query '<query>' > <d>/s<k>.json && jq '.results | length' <d>/s<k>.json`
   Under 9 results: run it again with `--page 1` into `<d>/s<k>b.json` and use both files. It is still one round.
3. Read the first 9 titles and snippets. Then list the URLs you have not fetched yet.
   `jq -r '.results[:9][] | "\(.position) \(.date) \(.url)\n  \(.title)\n  \(.snippet)"' <d>/s<k>.json`
   `jq -r '.results[:9][].url' <d>/s<k>.json | grep -vxFf <d>/urls.txt`
   Rank the hits. Primary sources come first: original data, spec, code, filing, statute, official doc, paper. Then secondary: reviews, news. Then tertiary: blogs, SEO pages, AI summaries. Use a snippet only to pick what to fetch. Never cite one.
4. Fetch every new hit that is primary or may settle the claim. Fetch at least 3, unless fewer qualify. Fetch the whole batch in one command, with the Bash timeout set to 600000:
   ```
   for u in '<url>' '<url>'; do
     grep -qxF "$u" <d>/urls.txt && continue
     tinyfish fetch content get "$u" --format markdown > <d>/new.json
     if [ "$(jq '.results | length' <d>/new.json)" = 1 ]; then
       echo "$u" >> <d>/urls.txt; n=$(wc -l < <d>/urls.txt)
       jq -r '.results[0].text' <d>/new.json > <d>/f$n.md
       echo "f$n.md $(wc -w < <d>/f$n.md) words $u"
     else echo "FAILED $u $(jq -c '.errors' <d>/new.json)"; fi
   done
   ```
   Never read raw tinyfish output: it is one long JSON line, and long tool output gets cut. A failed fetch still exits 0, so trust only the results count. If a fetch prints FAILED, or the page is a short captcha, login, or "enable JavaScript" wall, use Fallbacks.
5. Read each new `<d>/f<n>.md` with Read. On a long page, find the parts with `grep -n -i '<term>' <d>/f<n>.md`, then read each whole section with offset and limit. Before you use a passage, check:
   - Section: it is about this thing, this version, and this place. It is not an example, a hypothesis, or a view the page rejects.
   - Date and version: they match the Scope. A page about v1 does not pin a claim about v3.
   - Numbers: find the unit, what is counted, out of what, and when. Leave out any number you cannot read that way.
   - Origin: if the page got the fact from somewhere else, fetch that origin and cite it instead.
   - Stake: ask who gains if it is believed. A source with a stake counts for what it says its product or study does, not for how good it is.
6. Rewrite `<file>`. Add only what the pages say. Cut what they kill. Fix earlier claims they prove wrong or add to. Pin each fact (see Cite), regrade each claim you touched (see Grade), and update the Answer, Open, and the counts line. Set Rounds without change to 0 if you added or cut a claim, changed a grade, or changed the Answer. Otherwise add 1.
   Check: Search turns equals `wc -l < <d>/queries.txt`. Sources equals `wc -l < <d>/urls.txt`.

## 4. Grade

Grade from the cites, never from how likely the claim sounds.
- `solid`: the source is the thing itself (the statute, spec, code, or record the claim is about), or two independent primaries agree, or a replication confirms it.
- `likely`: one primary.
- `weak`: every source has a stake in the claim or does not show how it knows.
- `contested`: credible sources disagree.
- `absent`: you searched where it would be, and it is not there. Use absence cites.
- `open`: not settled yet.

Two sources are independent only if neither copies the other and they do not share one origin. Same numbers, same wording, or the same cited origin count as one source.

Conflict: cite both sources, grade the claim `contested`, and say they conflict. Never flatten them into one answer. Example: a project's marketing FAQ said `SCHED_FIFO`/`SCHED_RR` return `EINVAL`, while its `docs/realtime.md` documented those policies. A marketing page can lag its docs or repo. Then look for the most primary source that settles it: code, changelog, spec, or raw data. If one settles it, regrade the claim, keep the losing cite, and say why it lost.

Check: `grep -c '^### C' <file>` equals `grep -cE '^### C[0-9]+ .+ — (solid|likely|weak|contested|absent|open): .+' <file>`.

## 5. Stop

- The user set N rounds: stop when `wc -l < <d>/queries.txt` reaches N.
- The user said `infinite` or `never stop`: do not stop until the user says stop. When the gaps run out, make new ones: kill rounds on `solid` claims, newer sources, other languages and places, who cites the key sources, and the claims your claims rest on.
- Otherwise, stop only when all four of these hold. If one fails, run another round.
  1. The Answer answers the exact question within its Scope.
  2. No claim is `open`, and every claim has a cite. A gap that no source closes is `absent`, with absence cites.
  3. `cut -d' ' -f1,2 <d>/queries.txt | sort | uniq -c` shows at least 2 `find` rounds for each claim graded below `solid`, and at least 1 `kill` round for each `solid` or `likely` claim.
  4. Rounds without change is 2 or more, so new rounds now mostly repeat.

## 6. Finish

1. Re-check every quote. `grep -nxF '<url>' <d>/urls.txt` gives its line number n. Then `grep -c -F '<quote>' <d>/f<n>.md` must print 1 or more. If it does not, copy the quote again from the page.
2. Run the Grade check again. Then check the form of every cite: `grep '^> ' <file> | grep -vE ' — https?://[^ ]+ (§.+ — ".+"|— searched for ".+": 0 hits)$'` prints nothing.
3. Write the final counts into `<file>`.
4. Move the scratch dir to the Trash. Never use `rm`. Run this as one command. It prints the three Trash Info lines.
   ```
   t=$HOME/.local/share/Trash; n=research-<topic>-$(date +%Y%m%d-%H%M%S)
   mkdir -p $t/files $t/info && mv /tmp/research-<topic> $t/files/$n &&
   printf '[Trash Info]\nPath=/tmp/research-<topic>\nDeletionDate=%s\n' "$(date +%Y-%m-%dT%H:%M:%S)" > $t/info/$n.trashinfo &&
   cat $t/info/$n.trashinfo
   ```
5. Reply in one line when you can: the answer and its grade, the file path, search turns, and sources.

## Cite

Every fact in `<file>` carries a pinpoint that a skeptic can open and check in one jump:

`> <claim> — <url> §<section or heading> — "<verbatim quote ≤40 words>"`

- Copy the quote from the page file. Do not tidy, paraphrase, or fix it. Before it goes in, `grep -c -F '<quote>' <d>/f<n>.md` must print 1 or more.
- If the quote crosses a line break or markdown marks (`**`, `[text](link)`), grep each plain piece. Put only the words in the quote.
- Every number, date, statute, and product name in the claim must appear in the quote.
- Absence: `> <claim> — <url> — searched for "<exact string>": 0 hits`. Name each string you searched for. Check: `grep -c -i -F '<string>' <d>/f<n>.md` prints 0.
- Drop any sentence you cannot pin. No unsourced paraphrase, and no third-party restatement of a primary page.
- Cite the web URL, never a `/tmp` or `~/search` file. Put one cite per line and at most 3 per claim: the most primary, an independent one, and the counter if there is one.
- Never cite academia.edu "AI" takeaways or FAQs. They are machine-written, not the paper.

## Fallbacks

For each fallback, add the URL you will cite to `<d>/urls.txt` if it is not there yet, and save the text as the matching `<d>/f<n>.md`.
- Publisher page bot-blocked: fetch the abstract at `https://colab.ws/articles/<doi, / as %2F>` and cite that URL.
- colab.ws, PubMed, and ScienceDirect also blocked: run `curl -sG https://www.ebi.ac.uk/europepmc/webservices/rest/search --data-urlencode "query=EXT_ID:<pmid>" -d resultType=core -d format=json > <d>/new.json`. Get the text with `jq -r '.resultList.result[0].abstractText' <d>/new.json`. Cite `https://europepmc.org/article/MED/<pmid>`.
- Or use OpenAlex: run `curl -s "https://api.openalex.org/works/doi:<doi>" > <d>/oa.json`. Get the text with `jq -r 'if .abstract_inverted_index == null then "NO ABSTRACT" else [.abstract_inverted_index | to_entries[] | .key as $w | .value[] | [., $w]] | sort_by(.[0]) | map(.[1]) | join(" ") end' <d>/oa.json`. If it prints NO ABSTRACT, OpenAlex has no text for this work; leave that claim to other sources. Cite `https://doi.org/<doi>`.
- To see which papers cite a paper, run `curl -s "https://api.openalex.org/works?filter=cites:$(jq -r '.id | split("/") | last' <d>/oa.json)&sort=cited_by_count:desc&per-page=10" | jq -r '.results[] | "\(.doi) \(.title)"'`. Log it as that round's query: `<claim id> find cites:<doi>`.
- Replication check: fetch `https://forrt.org/flora-replication-atlas/doi/<doi>/` for each key paper. A failed replication makes the claim `contested` at best.
- PDF with no text: `curl -sL -o <d>/p.pdf '<url>' && pdftotext <d>/p.pdf <d>/f<n>.md`.
- Any other blocked page: fetch `https://web.archive.org/web/<url>` and cite that URL.
