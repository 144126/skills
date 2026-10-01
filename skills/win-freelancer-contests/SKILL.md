---
name: win-freelancer-contests
description: Use when entering, picking, reviewing, or closing any freelancer.com contest. Wins every contest entered by controlling every input to the holder's decision, and skips any contest where that is not possible.
---

# Win freelancer contests

Research this skill came from — read it first: [references/win-freelancer-contests-first-principles.md](references/win-freelancer-contests-first-principles.md)

Always get contest and project details and submit contest entries and project bids through the Freelancer API. Never use the website for these actions. If the API fails, fix the API request or report the error; do not fall back to the website.

`<SKILL_DIR>` is this installed skill folder. Requires Bash, curl, and Python 3.

`FREELANCER_TOKEN` is set in the environment. Check that it is non-empty before API requests; never print its value.

A contest is one human's decision. A decision is a function of its inputs. Control every input. Never enter a contest where you cannot.

## Pick

Enter only when all of these hold:

- Guaranteed prize (the money exists and must be awarded).
- Holder is live: past awards, replies within a day, brief written like a real business.
- Brief is specific. A vague brief means an unpredictable judge. Skip.
- Field is beatable: low entry count now, or a niche you already own work for.
- Prize is worth the field. Skip the rest. Skipping is how you win the ones you enter.

## Decode

- Turn the brief into a hard checklist. Every line is a pass/fail gate. Miss one gate and you are out at elimination.
- Elimination is fast and emotional. Survive the one-second look first, win the small final pool second.

## Enter

- Submit every entry via the Freelancer API: `bash <SKILL_DIR>/scripts/fl-submit <contest_id> <title> <desc|@file> <image>...`. Title ≤50 chars, desc ≤1000 chars. Script handles rate-limit retries. One entry per image, so pack variations as separate files.
- Simple design, category-typical, exactly one twist. Fits the client's existing look if they have one.
- Enter early and enter all allowed slots. One strong concept with variation, not three unrelated shots.
- Highlight the lead entry. Withdraw and resubmit to stay near the top of the list.
- No AI where the brief bans it. Declare AI where the platform requires it. Original work only.

## Engage

- Post one sharp public question on the clarification board. Read the answer, update the checklist. Now you know the judge's taste better than the field does.
- Answer every holder message within minutes. Send a revision before it is asked for. Familiarity and speed tilt the final gut call.

## Close

- Sign the IP transfer the hour you win. Upload every file format in one pass.
- Fee is 10% of the prize or $5, whichever is greater. Handover done = money real.
- Holder stalls: handover dispute exists. Use it.

## Check

Can you name the controllable input for every risk in this contest? If any risk has no input you control, do not enter.
