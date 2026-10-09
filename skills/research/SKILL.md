---
name: research
description: Search-loop web research. Search 9, fetch the most relevant results, read them, update succinct conclusions, search again. Always goes extremely deep and all the way. Infinite mode never stops until the user says stop.
---

# Research

You do the loop yourself. Do not run `research.ts`. Never read past `~/search` files.

Write `~/search/<slug>.md`. Keep it succinct. Rewrite the conclusions each round.

Always go extremely deep and all the way. A first good answer is not the answer. Keep peeling until the question has no gaps left and the sources run out.

## Loop

1. `tinyfish search query "<q>"` — take 9 hits (add `--page 1` if short).
2. Read every title + snippet. Fetch the most relevant results.
3. Fetch each page to a file, then read the file. Tinyfish often returns one JSON line; Pi bash keeps only the last 50KB of that line, so piping fetch to the model drops the start.
   `tinyfish fetch content get "<url>" --format markdown > /tmp/tf-<n>.md` then `read` that file. Never rely on fetch stdout.
4. Update the conclusions file. Cut anything the new pages kill. Add only what they actually say. Edit earlier conclusions when new pages prove them wrong or add more insight.
5. Decide the next query from the gaps. Go to 1.

Stop after N rounds if the user set N. Else stop only when the conclusions answer the question, every gap is closed, every claim is pinned, and a new round would mostly repeat. If they said `infinite` / `never stop`, do not stop until they say stop.

One query per round.

After every research, say search turns and sources used. A search turn is one query round. A source is one unique URL fetched. Put both numbers in `~/search/<slug>.md` and in the user reply.

## Cite

Every claim in `~/search/<slug>.md` must carry a pinpoint a skeptic can open and check in one jump.

Format:

```
> <claim> — <url> §<section or heading> — "<verbatim quote ≤40 words>"
```

Rules:

- Quote is copied from that URL. Do not tidy, paraphrase, or fix it.
- Every number, date, statute, and product name in the claim must sit in the quote.
- Absence: `> <claim> — <url> — searched for "<exact string>": 0 hits`. Name each string you searched.
- Drop any sentence you cannot pin. No unsourced paraphrase, no third-party restatement of a primary page.
- Keep the primary URL in the cite, not a local `/tmp` fetch.
- Publisher page bot-blocked: read the abstract at `https://colab.ws/articles/<doi, / as %2F>` and cite that URL.
- colab.ws/PubMed/ScienceDirect also blocked: `curl -sG https://www.ebi.ac.uk/europepmc/webservices/rest/search --data-urlencode "query=EXT_ID:<pmid>" -d resultType=core -d format=json` (cite `europepmc.org/article/MED/<pmid>`), or OpenAlex `api.openalex.org/works/doi:<doi>` → `abstract_inverted_index`.
- Replication check: `https://forrt.org/flora-replication-atlas/doi/<doi>/`.
- Never cite academia.edu "AI" takeaways or FAQs. They are machine-written, not the paper.
