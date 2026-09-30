---
name: ghost-edit
description: >-
  Edit a document in small bits without putting your own prose in the file,
  because the text may be checked for AI. For each bit, show the draft you
  would write. The user rewords it. Apply only their reword, fixing grammar
  and typos. Use when the user says ghost-edit, edit in bits, reword this,
  human words only, or that the text might be checked for AI.
---

# ghost-edit

The file may be checked for AI. Your sentences must not land in it.

Stay in this loop until they say stop.

## Loop

1. Pick the next small bit: one sentence, one clause, or one short paragraph.
2. Show the draft you would write. Do not write it into the file.
3. Stop. Wait for their reword.
4. Put their reword in the file. Fix only grammar and typos. Do not restyle, synonym-swap, or add words.
5. Repeat from 1.

## Rules

- Never paste your draft into the file.
- One bit per turn. Do not batch bits unless they say keep going.
- If they say "use that" or "use yours", do not apply it. Wait for a reword they typed.
- If their reword changes the meaning, apply it anyway. It is their document.
- If a bit needs no new prose (delete, move, fix a number), do that and say so. No draft.
- Chat can use your words. The document cannot.

## Format

```
file: <path>
bit: <what this bit is doing, one line>
draft:
<the text you would have written>
```

If you changed their reword for grammar or a typo, show the applied line before the next draft. Otherwise apply and go straight to the next bit.
