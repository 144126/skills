---
name: sfx-gen
description: Generate original SFX with the ElevenLabs sound-generation API. Use when the user wants generated sound effects, hits, whooshes, ticks, UI sounds, foley, risers, or ambience.
---

# sfx-gen

Set `ELEVENLABS_API_KEY` in the environment.

## Generate

```bash
curl -s -o out.mp3 -X POST https://api.elevenlabs.io/v1/sound-generation \
  -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" \
  -d '{"text":"<prompt>","duration_seconds":<s>,"prompt_influence":0.3}'
```

- `duration_seconds`: 0.5–22. Use ~1 for one-shots.
- Play: `mpv --no-video out.mp3`

## Prompt rules

- One event per clip. Name material, size, decay: "tiny dry wooden tick, instant decay".
- Ban: tonal beeps, pitch-sweep lasers, bells, drums, long reverb, voice.
- Size = pitch (bigger = lower). Dry and close unless distance is the point.
- Never say a take works without hearing it. Play it, then ask which take works and why.

For synthesis without an API, `sfx-pack` (pack.py). For mixing and placement, `sound-design`.
