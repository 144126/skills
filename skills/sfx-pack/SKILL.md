---
name: sfx-pack
description: Build an original SFX palette for a muted video without a DAW or third-party samples. Use when the user wants original SFX, a sound-design pack, Codex-style SFX, dry mechanical-digital hits, or audio for a silent edit.
---

# sfx-pack

No DAW. No sample pack. You cannot hear — never say a prototype works.

`<SKILL_DIR>` is this installed skill folder. Requires Python 3, SoX, and FFmpeg.

## 1. Map picture

Label each visual beat as one of: `micro-cut`, `object-lock`, `texture`, `transition`, `resolve`. Unknown times: scan skill, or

```bash
ffmpeg -i VIDEO -filter:v "select='gt(scene,0.25)',showinfo" -f null -
```

Write `cues.jsonl`: `{"t":1.24,"fn":"micro-cut"}`. First pass maps all five functions onto three sounds (`transition`→`texture`, `resolve`→`object-lock`).

## 2. Three sounds

```bash
python3 <SKILL_DIR>/pack.py -o ./sfx
python3 <SKILL_DIR>/pack.py VIDEO --cues cues.jsonl -o ./sfx
```

Dry mechanical-digital only. Ban tonal beeps, pitch-sweep lasers, bells, drums, long reverb. Writes 48 kHz / 24-bit mono WAVs, level-matched audition reel, cue sheet. Checks peaks, endings, mono.

AI-generated takes instead: `sfx-gen` (ElevenLabs sound-generation).

## 3. Stop

Ask which prototype works, which fails, and why. Iterate from that. Then variations or picture placement. Mix later with hyperframes-audio; do not pull catalog SFX from media-use.
