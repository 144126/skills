# Sound design: root research

Question: what makes sound design work and feel good? Psychology, science, and math, peeled to first principles, for Claude to use when making or mixing sound.

Status: done (40 search turns, 29 sources). Sync with picture and beat timing: [video-edit-first-principles.md](https://github.com/144126/skills/blob/master/skills/video-edit/references/video-edit-first-principles.md). Same prediction floor as [creativity-first-principles.md](https://github.com/144126/skills/blob/master/skills/creative/references/creativity-first-principles.md).

The rule I follow: [sound-design](https://github.com/144126/skills/blob/master/skills/sound-design/SKILL.md).

## Floor

Hearing is a fast event detector. It answers: what happened, how big, what material, how far, is it coming at me, is it dangerous. It reads a few physical cues: pitch, how fast a sound dies away, level, echo compared to direct sound, rising level, and roughness (a fast loudness wobble).

Sound design works by feeding those cues on purpose, locked to the picture, so the brain fuses sound and image into one event. Keep the sensory cost low (roughness, piercing highs, masking, loudness jumps) unless alarm is the goal.

Taste has two parts. Dislike of roughness looks inborn. Liking of consonance (notes that blend) is largely learned.

## Layers peeled (shortest first)

1. Give each sound the right cues, sync it to the picture, keep it clear and not harsh, and set its level to fit.
2. Why do cues work? The ear decodes events. Material comes from decay, size from pitch, distance from level, echo, and lost highs. Approach comes from rising level.
3. Why does sound move feelings? Voice and music share one emotion code (fast, loud, high, bright means high energy). Sudden, loud, dissonant, or fast sounds trigger the brainstem directly.
4. Why is harshness unpleasant? Roughness is the acoustic signature of screams and alarms. It reaches the brain's danger system. Chalk-squeal sounds sit at 2.5–5.5 kHz with a 1–16 Hz flutter.
5. Why does roughness exist? Two partials (single sine-wave parts of a sound) inside one ear filter beat against each other. The clash peaks at about a quarter of that filter's width. That is math about the inner ear, not culture.
6. Why does sync matter? The brain binds a sound to whatever visual event happens at the same moment. A click at the moment of contact turns two passing dots into a bounce.
7. Next "why" (why did hearing evolve as an event and threat detector?) is a different question. Stop.

## Lookalikes split

- **Meaning vs comfort vs emotion.** What the sound says (event, size, place), how it feels on the ear (rough, sharp, loud), and what mood it sets are different jobs.
- **Measured level vs felt loudness.** dB, LUFS, and true peak are meters. Felt loudness also depends on frequency and on whether the sound is speech or music.
- **Inborn vs learned.** Looming bias, the brainstem startle, and roughness dislike look inborn. Consonance preference and genre codes are learned.

## Where the evidence is thin

- Looming bias: later work found the rise-over-fall bias only at loud levels; at soft levels it flipped.
- Roughness theory has messy definitions and overfit models (2025 review).
- A 2023 meta-analysis reportedly ranks speech above sound icons above beeps for alerts. I could not open it; it is left out.
- Speech band importance (which frequencies carry intelligibility): no readable table found. Left out.
- "Good audio makes video look better": the one study found says the reverse effect is bigger. Page blocked; left out.

## Evidence (pinned)

### Sounds carry events: size, material, distance, approach

> Material from impact sounds: listeners never confused the big groups (steel/glass vs wood/plexiglass); within a group they fell back on size. — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=20058982,16521778&rettype=abstract&retmode=text §Abstract (Giordano 2006) — "Listeners' performance was perfect with respect to gross material categories (steel-glass and wood-plexiglass)"

> Level is a strong distance cue, especially for familiar sounds and for sounds coming closer or moving away. — https://pcl.upjs.sk/wp-content/uploads/2019/12/Kopco_NeuroImage_2019.pdf §Introduction — "A reliable cue for auditory distance is the overall received stimulus level, which dominates distance perception of familiar objects and of looming vs. receeding sound sources"

> The ratio of direct sound to echo is a distance cue that works without level. — same URL §Abstract — "two intensity-independent cues are available, interaural level difference (ILD) and direct-to-reverberant energy ratio (DRR)"

> Rising level is judged as a bigger change than the same fall, at loud levels (30 people). — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=20677706&rettype=abstract&retmode=text §Abstract — "At the high-intensity region, increasing stimuli were perceived to change more in loudness than decreasing-intensity stimuli."

> Limit: at soft levels it flipped. — same URL — "At the low-intensity region and under balanced end-level conditions, decreasing-intensity stimuli were perceived to change more in loudness than increasing-intensity stimuli."

> People match high pitch with small, bright, and high up. — http://www.daysyn.com/Spence_-_2011_-_Crossmodal_correspondences_A_tutorial.pdf §Abstract — "people consistently match high-pitched sounds with small, bright objects that are located high up"

> Round-sounding "bouba" goes with round shapes and sharp "kiki" with spiky ones, across 25 languages. — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34775818,22355125&rettype=abstract&retmode=text §Abstract — "Overall, we found strong evidence for the effect across languages, with bouba eliciting more congruent responses than kiki."

### Timbre: what makes sounds of the same pitch differ

> Three confirmed dimensions: brightness, attack time, and spectral jaggedness. — https://www.mcgill.ca/mpcl/files/mpcl/mcadams_2015_oxfordhdbkmuspsychol.pdf §Timbre dimensions — "spectral centroid (representing the relative weights of high and low frequencies and corresponding to timbral brightness"

> Attack time splits struck or plucked from blown or bowed. — same URL — "the logarithm of the attack time (distinguishing continuant instruments that are blown or bowed from impulsive instruments that are struck or plucked)"

### Emotion and arousal

> Voice and music use one emotion code (104 voice studies, 41 music studies). — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=23055488,22593872,9002513,11130706,12956543&rettype=abstract&retmode=text §Abstract (Juslin & Laukka 2003) — "the emotion-specific patterns of acoustic cues used to communicate each emotion"

> Brainstem reflex: sudden, loud, dissonant, or fast sounds arouse or displease. — https://ppw.kuleuven.be/okp/_pdf/Moors2008DBTTO.pdf §3.1.1 Brain stem reflex — "sounds that are sudden, loud, dissonant, or feature fast temporal patterns induce arousal or feelings of unpleasantness in listeners"

> Chills come most from a new voice entering, loudness changes, and contrasts. — https://www.immm.hmtm-hannover.de/fileadmin/www.immm/Publikationen/Grewe_Katzur_2010.pdf §Introduction — "Musical events, such as the entrance of a voice, changes in loudness and contrasts between two voices, were found to elicit chills more frequently than other musical structures."

> Nature sounds sped recovery from stress (40 people). — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=20617017&rettype=abstract&retmode=text §Abstract — "SCL recovery tended to be faster during natural sound than noisy environments."

> Rhythm in music follows 1/f: predictable and surprising at once (1,788 movements). — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34775818,22355125&rettype=abstract&retmode=text §Abstract (Levitin 2012) — "Much of our enjoyment of music comes from its balance of predictability and surprise."

### Harsh, rough, pleasant

> Screams live in the roughness band (30–150 Hz wobble), which alarms reuse and the danger system reads. — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=26190070,9744266&rettype=abstract&retmode=text §Abstract (Arnal 2015) — "human screams cluster within restricted portion of the acoustic space (between ∼30 and 150 Hz modulation rates)"

> Roughness makes sounds easier to detect and engages danger circuits. — same URL — "the presence of roughness in sounds boosts their detection in various tasks. Using fMRI, we show that acoustic roughness engages subcortical structures critical to rapidly appraise danger."

> The most unpleasant sounds (like chalk squeal) sit at 2.5–5.5 kHz with a 1–16 Hz flutter. — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=19206807,18941413&rettype=abstract&retmode=text §Abstract (Kumar 2008) — "The existence region corresponded to spectral frequencies between 2500 and 5500 Hz, and temporal modulations in the range 1-16 Hz."

> Unpleasant sound engages the amygdala, which talks back to the hearing cortex. — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=23055488,22593872,9002513,11130706,12956543&rettype=abstract&retmode=text §Abstract (Kumar 2012) — "the amygdala encodes both the acoustic features of a stimulus and its valence (perceived unpleasantness)."

> Consonance tracks harmonicity (partials lined up like one natural sound), not the absence of beats (250+ people). — https://mcdermottlab.mit.edu/papers/McDermott_Lehr_Oxenham_2010_consonance_individual_differences.pdf §Summary — "only the preference for harmonic spectra was consistently correlated with preferences for consonant over dissonant chords."

> Consonance preference is learned: the Tsimane (Amazonians with little Western music) had none. — https://news.mit.edu/2016/music-tastes-cultural-not-hardwired-brain-0713 — "This study suggests that preferences for consonance over dissonance depend on exposure to Western musical culture, and that the preference is not innate"

> But they disliked roughness like everyone else. — same URL — "They also showed the same dislike for a musical quality known as acoustic roughness."

> Caution: the roughness evidence has messy definitions (2025 review). — https://arxiv.org/pdf/2510.14159 §Abstract — "There are fundamental issues with the definition and interpretation of results due to tautology in the definition of roughness"

### The math

> Two pure tones clash most at about a quarter of an ear filter's width, and blend once they are more than one width apart. — https://www.mpi.nl/world/materials/publications/levelt/Plomp_Levelt_Tonal_1965.pdf §Abstract — "Simple-tone intervals are evaluated as consonant for frequency differences exceeding this bandwith, whereas the most dissonant intervals correspond with frequency differences of about a quarter of this bandwidth."

> Ear filter width (ERB, the equivalent rectangular bandwidth): 24.7 × (4.37 × F + 1) Hz, with F in kHz. At 1 kHz that is about 133 Hz. — http://audres.org/stn/dlmsupp/DLM-refs/Glasberg1990HearRes47-103.pdf §Equation 3 — "ERB = 24.7(4.37F + l), (3) where F is frequency in kHz."

> Low sounds mask higher sounds more than the reverse ("upward spread of masking"). — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=16261268&rettype=abstract&retmode=text §Abstract — "The upward spread of masking refers to the higher growth rate of masking for maskers lower in frequency than the signal"

> Missing fundamental: the ear hears the bass note from its overtones even when the note itself is gone. — https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2022.1074752/full §Introduction — "We perceive a pitch corresponding to the F0 of a harmonic complex tone, even when the component at F0 itself is missing"

> Equal loudness is not equal dB: the curves were remeasured, with old errors up to 14 dB below 500 Hz. — https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=15376658&rettype=abstract&retmode=text §Abstract — "These differences are most pronounced below 500 Hz and the discrepancy is often as large as 14 dB."

> Endless rise (Shepard tone): octave-spaced partials under a fixed bell-shaped envelope. — https://acousticstoday.org/wp-content/uploads/2017/09/Article_1of3_from_ATCODK_6_3.pdf §Shepard tones — "The amplitudes of the partials were scaled by a fixed, bell-shaped spectral envelope"

### Sound with picture

> A sound at the moment two moving dots meet makes people see a bounce instead of a pass. — https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5562831/fullTextXML §Introduction — "a brief sound at the moment of coincidence" (reverses perception toward bouncing; Sekuler 1997)

### Mixing voice, music, and ambience

> Keep commentary at least 10 LU above music, and 15 LU above ambience. — https://www.audioblog.iis.fraunhofer.com/awards-fraunhoferiis-aes146 — "an LD of at least 10 LUs for commentary over music and 15 LUs for commentary over ambience"

> Ordinary listeners want a bigger gap than experts. — same URL — "non-experts are in favor of LDs that are four loudness units (LUs) higher than the experts"

> At equal measured loudness, speech sounds 2–3 dB louder than music. — https://aes.org/wp-content/uploads/2024/01/20210924_TD1008_v3.13.pdf §Speech vs. Music — "speech normalized to the same BS.1770 Integrated Loudness as music is typically perceived 2 to 3 dB louder than the music"

### Delivery loudness

> Broadcast: −23 LUFS. — https://tech.ebu.ch/docs/r/r128.pdf §recommends h) — "the Programme Loudness Level shall be normalised to a Target Level of −23.0 LUFS."

> Broadcast peak limit: −1 dBTP. — same URL §recommends m) — "the True Peak Level of a programme shall not exceed −1 dBTP"

> Streaming (AES): speech −18 LUFS, music −16 LUFS, peaks under −1 dBTP. — https://aes.org/wp-content/uploads/2024/01/20210924_TD1008_v3.13.pdf §Table 1 — "Table 1 recommends that speech within streams be normalized to -18 LUFS"

> Same document, peak limit. — same URL — "For all content, it is recommended that the Maximum True Peak level not exceed -1 dBTP"

> Spotify normalizes to −14 LUFS. — https://support.spotify.com/us/artists/article/loudness-normalization/ — "We adjust tracks to -14 dB LUFS, according to the ITU 1770 standard."

> Spotify peak advice. — same URL — "If your master is louder than -14dB integrated LUFS, keep True Peak below -2dB to avoid extra distortion."

### UI and alert sounds

> Real-world sound icons beat abstract beeps (earcons) on intuitiveness, learnability, memory, and preference. — https://purehost.bath.ac.uk/ws/files/110773883/garzonis_chi09.pdf §Abstract — "auditory icons performed significantly better in all measures"

Search turns: 40. Sources: 29.
