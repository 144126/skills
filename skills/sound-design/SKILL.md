---
name: sound-design
description: Use when making, choosing, placing, or mixing sound for video, UI, apps, games, or ads - SFX, foley, whooshes, risers, hits, UI sounds, ambience, music under voice, loudness targets.
---

# Sound design

Research this skill came from — read it first: [references/sound-design-first-principles.md](references/sound-design-first-principles.md)

Hearing is a fast event detector: what happened, how big, what material, how far, coming closer, dangerous? Feed those cues on purpose, locked to the picture.

Meaning
- Size: bigger = lower. Material: metal and glass ring long; wood and plastic die fast.
- Distance: farther = quieter, more echo vs direct sound, fewer highs.
- Approach or build: rising level. Endless tension: Shepard rise (octave partials under a fixed bell envelope).
- Emotion: fast, loud, high, bright = energy; slow, soft, low, falling = sad or calm.
- UI: real-world sound icons beat abstract beeps. High pitch = small, light, up.

Sync
- Put the sound on the event's frame. A click at contact turns a pass into a bounce.
- Sound may land up to 3 frames late, never more than 1 frame early (30 fps).

Comfort
- Roughness (level wobble 30-150 Hz) and 2.5-5.5 kHz with 1-16 Hz flutter read as alarm or pain. Use them only for alarm.
- Two partials closer than one ear band clash most at a quarter band apart. Ear band = 24.7 x (4.37 x kHz + 1) Hz.

Mix
- Low sounds mask higher ones: high-pass everything that does not need lows.
- Voice at least 10 LU above music, 15 LU above ambience. Viewers want more gap than editors do.
- Phone speakers: add bass harmonics so the ear rebuilds the missing low note.
- +10 dB = about twice as loud.

Deliver
- Streaming speech -18 LUFS, music -16 (AES); Spotify -14; broadcast -23. True peak at most -1 dBTP (-2 if louder than -14).

Peaks
- Chills: a new voice or layer entering, a loudness jump, a contrast. Build, then land it.
- Calm: nature ambience.

Check: play it on a phone speaker and on headphones, quiet and loud.
