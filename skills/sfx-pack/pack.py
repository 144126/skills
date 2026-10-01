#!/usr/bin/env python3
"""3 dry mechanical-digital SFX + audition reel + cue sheet. No samples."""
import argparse, json, shutil, subprocess, sys
from pathlib import Path

SOX = shutil.which("sox") or "sox"
FFMPEG = shutil.which("ffmpeg") or "ffmpeg"

# three dry ticks. no pitch sweep, no reverb, no drum, no bell
RECIPES = {
    "micro-cut": ["synth", "0.032", "brownnoise", "fade", "t", "0", "0.032", "0.024"],
    "object-lock": [
        "synth", "0.048", "whitenoise", "band", "2400", "900",
        "fade", "t", "0", "0.048", "0.032",
    ],
    "texture": [
        "synth", "0.16", "pinknoise", "band", "1100", "700",
        "fade", "0.004", "0.16", "0.08",
    ],
}
ALIAS = {"transition": "texture", "resolve": "object-lock"}


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.stderr.write(r.stderr or r.stdout)
        raise SystemExit(r.returncode)
    return r


def sox_stats(wav):
    r = subprocess.run([SOX, str(wav), "-n", "stats"], capture_output=True, text=True)
    text = r.stderr or r.stdout
    pk = None
    for line in text.splitlines():
        if line.startswith("Pk lev dB"):
            pk = float(line.split()[-1])
    return text, pk


def write_wav(out, recipe):
    run([SOX, "-n", "-r", "48000", "-b", "24", "-c", "1", str(out), *recipe, "norm", "-1"])
    run([SOX, str(out), str(out.with_suffix(".trim.wav")), "silence", "1", "0.001", "0.1%", "-1", "0.001", "0.1%"])
    out.with_suffix(".trim.wav").replace(out)


def check(wav):
    text, pk = sox_stats(wav)
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                        "stream=sample_rate,bits_per_raw_sample,channels",
                        "-of", "json", str(wav)], capture_output=True, text=True)
    info = json.loads(r.stdout or "{}")
    st = (info.get("streams") or [{}])[0]
    bad = []
    if int(st.get("sample_rate") or 0) != 48000:
        bad.append(f"rate {st.get('sample_rate')}")
    if str(st.get("bits_per_raw_sample") or "") not in ("24", ""):
        bad.append(f"bits {st.get('bits_per_raw_sample')}")
    if int(st.get("channels") or 0) != 1:
        bad.append(f"ch {st.get('channels')}")
    if pk is None or pk > -0.1:
        bad.append(f"peak {pk}")
    return bad, pk, text


def load_cues(path):
    cues = []
    for line in Path(path).read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        row = json.loads(line)
        fn = ALIAS.get(row["fn"], row["fn"])
        if fn not in RECIPES:
            raise SystemExit(f"unknown fn {row['fn']}")
        cues.append({"t": float(row["t"]), "fn": fn})
    return cues


def mux(video, cues, wavs, out_wav, out_mp4):
    parts = []
    filt = []
    i = 0
    for c in cues:
        parts += ["-i", str(wavs[c["fn"]])]
        filt.append(f"[{i}:a]adelay={int(c['t']*1000)}|{int(c['t']*1000)}[a{i}]")
        i += 1
    mix = "".join(f"[a{j}]" for j in range(i)) + f"amix=inputs={i}:normalize=0[a]"
    cmd = [FFMPEG, "-y", *parts, "-filter_complex", ";".join(filt + [mix]),
           "-map", "[a]", "-ar", "48000", "-c:a", "pcm_s24le", str(out_wav)]
    run(cmd)
    run([FFMPEG, "-y", "-i", str(video), "-i", str(out_wav),
         "-c:v", "copy", "-c:a", "aac", "-shortest", str(out_mp4)])


def main():
    p = argparse.ArgumentParser()
    p.add_argument("video", nargs="?")
    p.add_argument("--cues")
    p.add_argument("-o", "--out", default="sfx")
    args = p.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    wavs = {}
    sheet = []
    for name, recipe in RECIPES.items():
        wav = out / f"{name}.wav"
        write_wav(wav, recipe)
        bad, pk, _ = check(wav)
        wavs[name] = wav
        sheet.append({"name": name, "path": str(wav), "peak_db": pk, "ok": not bad, "bad": bad})
        if bad:
            sys.stderr.write(f"{name}: {', '.join(bad)}\n")

    # 1s pads, same peak, concat reel
    pads = []
    for i, name in enumerate(RECIPES):
        pad = out / f"_{name}.wav"
        run([SOX, str(wavs[name]), str(pad), "pad", "0", "0.85", "norm", "-3"])
        pads.append(pad)
    reel = out / "audition.wav"
    run([SOX, *[str(x) for x in pads], str(reel)])
    for pad in pads:
        pad.unlink()

    cues = load_cues(args.cues) if args.cues else []
    if args.video and cues:
        mux(args.video, cues, wavs, out / "mix.wav", out / "preview.mp4")

    cue_path = out / "cuesheet.json"
    cue_path.write_text(json.dumps({"sounds": sheet, "cues": cues, "reel": str(reel)}, indent=2) + "\n")
    print(cue_path)


if __name__ == "__main__":
    main()
