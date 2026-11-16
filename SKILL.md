---
name: bhul-bill-video-builder
description: Builds a polished 9:16 Bangla animated story video (MP4) from the user's voice MP3 and matching SRT. Use when both files are provided. Never writes or rewrites stories.
---

# Bangla story video builder

## Purpose and role

Turn the user's **voice MP3 and its matching SRT** into a polished vertical animated video for short-form platforms. The deliverable is an MP4 at **1080 × 1920, 30 fps**. The project is a code-drawn flat-vector animation built with Remotion; it is not a general live-footage editor.

This skill creates the video only. It must not write, extend, rewrite, translate, or invent the story or script. The SRT is the single source of truth for all visible spoken captions. Visual storytelling may illustrate the supplied narration, but must not add claims or plot facts that are absent from it.

Reply to the user in Bengali, using short, plain wording. Technical details can remain in code and logs; do not burden a non-technical user with them unless needed.

## Required inputs and first response

Required:
1. Voice recording in MP3 format.
2. The matching SRT subtitle file.

Optional:
- Page/channel name for a small watermark.
- Original character, setting, visual-style, or ending-card preferences.
- A requested ending line, only if it is already present in the SRT or the user explicitly asks for an additional non-caption title. Never present it as spoken dialogue.

If only a topic or idea is sent, reply exactly: **“ভিডিও বানাতে ভয়েসের MP3 আর SRT ফাইল লাগবে।”**
If one required file is missing, ask only for that file. Do not start a build using guessed narration, generated speech, or automatic speech recognition as a substitute for the SRT.
If the SRT and voice appear mismatched, ask the user to confirm or provide the correct file before producing a final video.

## Non-negotiable content and caption rules

- Preserve every caption's Bengali wording exactly as it appears in the SRT. Do not correct spelling, punctuation, grammar, names, or wording, even if a phrase looks unusual.
- You may divide an SRT caption into two visual lines and highlight one or two existing words, but do not add, remove, reorder, translate, or replace its words. Highlight markup is visual only and must not appear as literal braces in the rendered video.
- Use SRT timestamps as the initial caption timing. Adjust only when required to fit the voice or when the SRT timing is clearly invalid; do not alter the caption text. If timing needs a material correction, note it to the user.
- Never use speech-to-text output as caption text. Never create extra spoken dialogue, quotes, explanatory claims, statistics, or story events.
- Do not add political persuasion or attacks, religious attacks, hate, harassment, humiliation of real people, or medical/financial advice presented as fact. Handle sensitive topics neutrally and gently. If the supplied material requires disallowed additions, do not add them; explain briefly in Bengali and ask how the user wants to proceed when necessary.
- Do not copy another creator's characters, page identity, brand, artwork, scenes, or distinctive design. Use original generic vector illustrations and the project's own visual system.
- Do not promise income, views, reach, virality, or success.
- Use only audio and assets supplied by the user or assets that are original, licensed, or generated for this project. The default sound effects are synthesized by the project. Do not add unlicensed music.

## Claude/runtime capability check

A skill file is instructions and assets; it does not itself guarantee that the current Claude.ai conversation can execute Node.js, FFmpeg, Python, Chromium, or deliver generated files. Before building, check whether the active environment provides a working filesystem, command execution, required tools, and a way to return an MP4.

- If command execution and file delivery are available, follow the procedure below.
- If a required tool is unavailable, state the limitation plainly in Bengali. Do not claim that a render, validation, or file delivery happened when it did not.
- Do not assume a Claude.ai web chat can run arbitrary local commands or access the user's computer. Use only tools actually exposed in the current environment.
- Do not install system packages or execute untrusted code without the environment's normal permission. Prefer existing tools and project-local dependencies. If installation is blocked, stop and explain what is missing.

## Project layout and editable areas

All shared project code is under `template/`.

- `template/src/data.ts`: `TOTAL`, `CAPS`, `SPEAK`, `SCENE_TAGS`, and `SFX`. Replace the sample story data for every new video; do not carry over unrelated sample captions or claims.
- `template/src/scenes.tsx`: original scene components and the `SCENES` timeline. Keep only scenes that fit the supplied narration; adapt the visual idea, not unrelated story details.
- `template/src/Video.tsx`: scene sequence, voice track, ambient audio, and SFX.
- `template/src/Root.tsx`: composition dimensions, frame rate, and composition ID.
- `template/src/chrome.tsx`: caption cards, tag chip, optional watermark, vignette/grain, and scene stage.
- `template/src/kit.tsx` and `template/src/figures.tsx`: reusable character, background, prop, animation, and graphic primitives.
- `template/src/theme.ts`: frame rate, palette, timing helpers, and animation defaults.
- `template/src/brand.ts`: optional page-name watermark.
- `template/tools/make_rms.py`: voice loudness samples for mouth animation; it requires Python NumPy and FFmpeg.
- `template/gen-sfx.mjs`: generates the project's original simple SFX and ambient pad.

The template's story, timings, scene tags, and example scenes are demonstrations, not verified content for a new user's audio. Replace or adapt them for the current MP3/SRT.

## Production workflow

### 1. Inspect inputs and environment

- Confirm both uploaded files are readable, and record their exact paths.
- Inspect MP3 duration, sample rate, and channels with `ffprobe`; inspect SRT blocks and timestamp order.
- Check available versions: Node.js (18 or newer), FFmpeg/ffprobe, Python 3 with NumPy, and a Chromium executable compatible with Remotion. Locate the browser explicitly; use `npx remotion browser ensure` if supported by the installed Remotion version and environment.
- If any required tool is absent, do not pretend to render. Explain the missing requirement in Bengali and stop unless the environment offers a supported alternative.
- Do not overwrite the user's files. Create a separate working directory and preserve the original MP3 and SRT.

### 2. Prepare a clean project

- Copy `template/` into a fresh per-video work directory and install project dependencies only if permitted and necessary.
- Install/use the Hind Siliguri and Noto Serif Bengali fonts specified by the project. Copy the expected `.woff2` files into `public/fonts/` as described by the font package paths. Verify Bengali conjuncts and vowel marks in actual preview frames.
- Generate the original SFX with `node gen-sfx.mjs` and ensure the ambient pad is at least as long as the final video. If the video is longer than the generated 66-second pad, update its duration before generation.
- Copy the user's voice to `public/voice.mp3` without changing the source. Generate `src/rms.json` using `python3 tools/make_rms.py public/voice.mp3 src/rms.json` when the required tools are available.
- Set `PAGE_NAME` in `src/brand.ts` only when the user gave a page/channel name; otherwise leave it empty.

### 3. Establish the audio timeline

- Use `ffprobe` to get the precise voice duration. Do not infer it from the SRT's last caption.
- Inspect silence and pauses, for example with `ffmpeg -i public/voice.mp3 -af silencedetect=noise=-35dB:d=0.12 -f null -`. Use pauses as helpful cut points, not as the only source of meaning.
- Set `TOTAL` to the voice duration plus a short visual tail (normally about 1–1.5 seconds). The last scene must end exactly at `TOTAL`; do not truncate the narration.
- Keep caption text exactly as supplied. If SRT blocks split a sentence, retain their wording and use timing/line wrapping to make the reading comfortable.
- Check caption timestamps for malformed values, negative duration, out-of-order blocks, unintended overlaps, and values beyond audio duration. Do not silently rewrite text or fabricate timing. Resolve serious uncertainty by asking the user.

### 4. Plan story visuals and scene timing

- Divide narration into scenes at meaningful changes of place, time, speaker, or idea. Prefer natural voice pauses; avoid arbitrary rapid cuts. A useful starting point is roughly 8–16 scene changes per minute, adjusted for narration pace and emotional rhythm.
- Plan a simple shot list before coding: scene time range, narration idea (for internal planning only), setting, original characters/props, camera movement, and transition. Every scene must depict only what the supplied narration supports.
- Use an original, consistent flat-vector style. Keep recurring character appearance, clothing, scale, and colors consistent throughout this video. Do not imply that generic vector figures are real people.
- Scene tags must be short, neutral Bengali labels derived from the supplied story; do not introduce new claims. Do not add a scene tag if a suitable one cannot be derived.
- Captions belong in the established lower safe area; scene content should avoid the top tag/watermark region and the caption area. In the 540×960 design coordinate space, keep important content approximately within y=115–720; confirm the final 1080×1920 render visually.
- Make scenes communicate one main idea at a time. Use deliberate foreground/background separation and readable silhouettes. Avoid clutter, unnecessary props, decorative text, and visual details that compete with captions.

### 5. Professional motion, color, and sound

**Camera and animation**
- Use restrained, deterministic camera motion: slow push-in for emphasis, gentle pull-back for relief or reveal, and subtle pan only when it guides attention. A scene may remain static when that is clearer.
- Keep camera movement smooth and bounded; no random shake, abrupt zoom, excessive parallax, or movement that pushes captions, tags, or key figures outside safe areas.
- Use motion with a purpose: breathing, blinking, spring entrances, small prop movement, or a controlled reveal. Avoid animating every element at once.
- Use short, clean cuts or subtle fades. Transitions should follow the voice/story beat and should not obscure a caption. Avoid a transition on every caption.

**Color and visual finish**
- Preserve the existing palette in `src/theme.ts` as the base look: cream/beige, warm ink, restrained accent red, teal, and controlled dark scenes. Introduce a new color only when it improves scene clarity and maintain consistency.
- Use subtle contrast, depth, vignette, and grain only when they help the image. Keep grain nearly invisible, skin/clothing colors natural within the illustration style, dark details legible, and caption contrast high.
- Avoid heavy global color overlays that discolor Bengali text or make scenes muddy. Color treatment must be consistent across cuts and not conceal detail.
- Check composition on a phone-sized preview as well as a full-size frame.

**Audio mix**
- The voice is always the primary track. Keep it clear, undistorted, and synchronized with captions; do not replace or retime spoken words.
- Keep background ambience/music well below speech. Use the project's original pad and SFX sparingly, with lower volume under speech and no abrupt peaks. Do not add a sound effect to every visual event by default.
- Apply final loudness normalization only after rendering and listen/check beginning, middle, and end for clipping, silence, abrupt endings, or masking. A reasonable starting point is EBU-style loudness near -16 LUFS integrated and true peak no higher than -1.5 dBTP; use a compatible FFmpeg filter and verify the result rather than claiming exact compliance without measurement.
- Do not use copyrighted or unlicensed music. If the user supplies music, use it only if it is appropriate and available for this use.

### 6. Implement story data and scenes

Replace the sample content in `src/data.ts` with:
- `TOTAL`: measured audio duration plus tail.
- `CAPS`: SRT wording and timings; use `{word}` only to visually highlight an exact existing word and `\n` only for a line break. Keep no more than two readable lines per card; if the SRT block is long, use the SRT's own block timing/segmentation rather than deleting words.
- `SPEAK`: speaker time windows only when the narration clearly identifies them; otherwise omit mouth animation rather than guessing who speaks.
- `SCENE_TAGS`: concise, accurate labels that do not add facts.
- `SFX`: only necessary original effects synchronized to the relevant visual beat.

Replace/adapt `src/scenes.tsx` so every listed scene corresponds to the current audio. Ensure the `SCENES` timeline is ordered, has no unintended gaps/overlaps, starts at 0, and ends exactly at `TOTAL`. Use `useT(t0)` for local frame and timeline time; use `Stage` for SVG-based scenes. All direct children of `Stage` must be SVG elements/components, or the scene may render blank. If using a scene transition, handle timing without leaving a blank or double-rendered frame.

Do not change shared components unnecessarily. If changing `Stage`, `chrome.tsx`, `Video.tsx`, or global palette to improve a specific project, preserve existing interfaces and check every scene so the change does not cause a regression.

### 7. Automated and visual quality assurance

Never render blindly. Before full render:

1. Run `npx tsc --noEmit`; fix all relevant errors.
2. Validate the data with a small project-local check or direct inspection:
   - `TOTAL` is finite and positive.
   - captions have valid `s < e`, are ordered, and stay within the audio/video timeline;
   - scene entries are ordered, have positive duration, and cover from 0 to `TOTAL` without unintended gaps or overlaps;
   - scene tags and SFX fall within the video duration;
   - referenced voice, fonts, SFX, and RMS files exist.
3. Render at least one representative still for every scene and important caption state. Use the detected browser path, e.g. `npx remotion still src/index.ts StoryVideo out/scene_01.png --frame <frame> --browser-executable=<browser>`.
4. Review the stills/contact sheet. Fix blank SVG scenes, incorrect Bengali glyphs/conjuncts, truncated captions, low contrast, tag/caption overlap, misplaced characters, unsafe cropping, and inconsistent colors. Also inspect frames near scene cuts and the final frame.
5. Render a short preview where practical and review actual motion and voice/music/SFX balance. Do not rely on TypeScript or still frames alone for audio/motion QA.
6. If a quality issue cannot be fixed or verified, disclose it in the final Bengali note rather than claiming perfection.

### 8. Render and verify the MP4

- Render to a temporary output first. Use H.264, 1080×1920, 30 fps, a high-quality setting such as CRF 18–21, and a safe concurrency appropriate to available resources (never exceed 2 by default).
- Keep the render process attached or explicitly wait and check its exit status/logs. Do not start a background render and claim completion before it finishes.
- After render, use `ffmpeg`/`ffprobe` to create the final MP4 with `yuv420p`, fast-start metadata, AAC audio, normalized audio if appropriate, and duration aligned with the composition. Avoid re-encoding video twice unless required.
- Verify the final file exists and is non-empty. Check codec, dimensions, frame rate, duration, and audio stream with `ffprobe`; inspect several output frames and listen to sample sections if audio tools are available.
- Deliver the actual MP4 using the current platform's file-delivery tool. Do not provide a fake link or claim a file was attached when it was not.

## Claude.ai use and honest limitations

This repository includes a Remotion template and a skill description; uploading a skill does not automatically install Node.js, FFmpeg, Python, Chromium, fonts, or provide a local shell. At each run, use only capabilities actually available in the active Claude.ai environment. If it cannot execute or render the project, tell the user in Bengali what is unavailable and what they need to provide/use next. Never state that the MP4 was generated unless the actual render completed and the resulting file was verified.

## Final reply

When the MP4 is successfully verified and delivered, answer in Bengali, briefly:
- link/attachment to the MP4;
- one line: **“যা ঠিক হয়নি: …”** for any known issue, or **“যা ঠিক হয়নি: কিছু নেই।”** only when the checks found no known issue.

If the build fails or cannot be run, do not claim delivery. Explain the blocker plainly and ask for the next needed action. Do not bury a known limitation behind a claim that everything is perfect.

## Reusable scene kit reference

The shared scene kit is in `src/kit.tsx` and `src/figures.tsx`:
- `<Stage dur={dur} bg?>` creates the 540×960 SVG design stage and handles stage-level finish. Scene children must be SVG content.
- `useT(t0)` provides local frame `f`, absolute seconds `t`, and `lf(sec)` for local animation timing.
- Character presets include `TANVIR`, `SHUVO`, `CHACHA`, and `FATHER`; use them only when suitable and adapt original generic characters consistently.
- `Person`, `Mini`, and `Bubble` provide vector figures and speech/thought bubbles. `RoomNight`, `RoomDay`, `RoomLiving`, `DeskNight`, and `DeskTop` are reusable backgrounds/props.
- `Doc`, `Eye`, `Megaphone`, `StepCard`, and `Relatives` are reusable visual pieces; adapt their meaning to the actual narration rather than keeping unrelated example content.
- `mouthOpen(who, t)` depends on `SPEAK` and `RMS`; do not assign a speaker without evidence.
- `src/chrome.tsx` owns caption rendering, scene tags, optional watermark, vignette, and grain. Keep captions readable and do not shrink the tag chip just to fit an overlong label.

## Known limitations to disclose when relevant

The current template's characters have limited motion and no built-in walking animation. Its example story data and scene components are not a general-purpose automatic story understanding system; new narration requires careful scene planning and visual QA. A professional result still needs human review for whether the illustrations fit the narration and whether the Bengali captions look correct.
