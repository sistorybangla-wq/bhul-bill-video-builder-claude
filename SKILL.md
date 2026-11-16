---
name: reels-video-edits
description: Creates original Bangla 9:16 animated Reels videos from a user's voice MP3 and matching SRT. First presents a scene-by-scene storyboard for approval, then renders and delivers the final MP4 after explicit approval. Never writes or rewrites stories.
---

# Reels Video Edits

## Purpose

Create a polished vertical Bangla animated video from the user's **voice MP3 and matching SRT** using the included Remotion project. Target output: **9:16, 1080×1920, 30 fps, MP4**. This is a code-drawn 2D cartoon-inspired flat-vector animation workflow—not a general live-footage editor.

The skill does not write, extend, rewrite, translate, or invent stories/scripts. The SRT is the single source of truth for visible spoken captions. Visuals may illustrate the supplied narration but must not add unsupported events, claims, or dialogue.

Speak to the user in simple, concise Bengali.

## Required input

- Voice MP3.
- Matching SRT.

Optional: channel/page name for a small watermark, and original visual preferences (characters, setting, colors, or animation style).

If the user provides only a topic, respond: **“ভিডিও বানাতে ভয়েসের MP3 আর SRT ফাইল লাগবে।”** If one required file is missing, ask for that file only. Never substitute speech-to-text for a missing SRT. If the MP3 and SRT seem mismatched or timestamps are seriously unclear, ask the user before proceeding.

## Non-negotiable rules

- Keep SRT caption wording exactly as provided: do not correct, translate, add, remove, reorder, or replace words or punctuation. Line wrapping and visual highlighting of existing words are allowed; the visible text must still match the SRT.
- Use SRT timestamps as the starting point. Do not silently invent or materially change timing; disclose necessary timing corrections.
- Do not invent narration, quotes, facts, statistics, or story events. Keep scene tags grounded in the SRT.
- Do not add political or religious attacks, hate, harassment, humiliation of real people, or medical/financial advice presented as fact. Treat sensitive topics neutrally and gently.
- Do not copy another creator's page, brand, characters, artwork, scenes, or distinctive design. Use original generic artwork and the project's own visual style.
- Use only user-provided, original, or properly licensed assets. Do not add unlicensed music. Never promise views, income, reach, virality, or success.
- Never claim a render, test, or file delivery happened unless it actually did.

## Claude environment check

A skill upload does not itself provide Node.js, FFmpeg, Python/NumPy, Chromium, a shell, or file-delivery capability. Before attempting a render, check the tools available in the active Claude.ai environment. Use only capabilities actually exposed. If rendering or delivery is unavailable, explain this in Bengali; do not provide a fake file or link. Do not install system packages or execute untrusted code without permission.

## Two outputs: storyboard, then final MP4

### Output 1 — scene-by-scene storyboard (not a video)

After validating the MP3 and SRT, prepare a clear Bengali scene plan before rendering the final video. For every scene, include:

- Scene number and approximate start/end time.
- The relevant SRT caption/timestamp, quoting exact SRT wording only.
- What will be shown: setting, original characters/props, action/expression.
- Camera movement, transition, color mood, and proposed sound where relevant.
- How the visual relates to the supplied narration.

Show enough detail for the user to understand what the final animation will look like. If possible, provide static storyboard keyframes/contact sheet as review material; do not call it a video preview. Do not add unsupported story detail. Clearly flag assumptions and ask questions where needed.

Then stop and ask: **“এই দৃশ্য-পরিকল্পনা ঠিক আছে? পরিবর্তন চাইলে দৃশ্য নম্বর ও কী বদলাবেন বলুন। ঠিক থাকলে ‘অনুমোদন’ লিখুন; এরপর final MP4 বানাব।”**

### Revisions and approval

- Do not render or deliver the full-quality final MP4 before explicit approval.
- If the user requests scene changes, revise and show the updated storyboard; ask again for approval.
- If asked to change caption wording, request a corrected SRT. Do not alter the SRT wording yourself.
- Approval must be explicit, e.g. “অনুমোদন” or “ঠিক আছে, final করো”. Do not treat an unclear response as approval.
- If an important scene meaning/layout changes after approval, show an updated storyboard and ask again.

### Output 2 — final MP4

Only after explicit approval, implement the approved storyboard, render the full-quality MP4, perform the checks below, and deliver the actual verified file. If rendering fails or tools are unavailable, explain the blocker instead of claiming success.

## Project files

Shared Remotion code is in `template/`:

- `template/src/data.ts`: `TOTAL`, `CAPS`, `SPEAK`, `SCENE_TAGS`, `SFX`. Replace all sample story data for each new video.
- `template/src/scenes.tsx`: scene components and the timeline. Adapt/remove unrelated example scenes.
- `template/src/Video.tsx`: scene sequences, voice, ambience, and sound effects.
- `template/src/Root.tsx`: Remotion composition size, frame rate, and ID.
- `template/src/chrome.tsx`: captions, scene tags, watermark, stage, vignette/grain.
- `template/src/kit.tsx`, `template/src/figures.tsx`: reusable vector people, props, backgrounds, and animation helpers.
- `template/src/theme.ts`: frame rate, colors, timing and animation defaults.
- `template/src/brand.ts`: optional page/channel watermark.
- `template/tools/make_rms.py`: voice loudness samples for mouth movement (Python NumPy and FFmpeg required).
- `template/gen-sfx.mjs`: generates original simple sound effects and ambient pad.

The included story, timings, scene tags, and scene code are examples only—not content to reuse blindly.

## Production workflow after approval

### 1. Inspect inputs and runtime

- Confirm MP3/SRT are readable and preserve the originals in a separate working directory.
- Check MP3 duration with `ffprobe`; inspect SRT validity, order, and timestamps.
- Check Node.js 18+, FFmpeg/ffprobe, Python 3 + NumPy, and a Chromium browser compatible with Remotion. If a necessary tool is missing, stop and explain.

### 2. Prepare assets/project

- Copy `template/` into a fresh per-video work directory. Install project dependencies only if allowed and needed.
- Provide the Hind Siliguri and Noto Serif Bengali font files expected by `template/src/chrome.tsx` in `public/fonts/`; inspect Bengali conjuncts and vowel marks in rendered frames.
- Copy the voice to `public/voice.mp3` without changing the source. Generate `src/rms.json` using `python3 tools/make_rms.py public/voice.mp3 src/rms.json` when dependencies are available.
- Run `node gen-sfx.mjs`; make the generated ambient pad long enough for the project duration. Use only appropriate original/licensed sound.
- Set `PAGE_NAME` only if the user supplied a page/channel name; otherwise leave it blank.

### 3. Timing and visual plan

- Use actual MP3 duration, not the last SRT subtitle, to set `TOTAL`; ordinarily add a short 1–1.5 second ending hold. The last scene must end exactly at `TOTAL`.
- Use voice pauses as possible cut points. Change scene for meaningful changes in place, time, speaker, or idea; avoid arbitrary rapid cuts.
- Keep recurring character appearance and colors consistent. Use original 2D cartoon-inspired flat-vector illustrations.
- Keep a clear composition with one main idea per scene. In the 540×960 design area, keep important visuals roughly between y=115 and y=720; reserve upper area for watermark/tag and lower area for captions.
- Scene tags must be short and supported by the SRT; omit them if no accurate tag fits.

### 4. Professional motion, color, and audio

- Use smooth, restrained zoom-in/zoom-out or pan only when it guides attention. Use purposeful character/prop motion and clean cuts or subtle fades. Avoid random shake, abrupt zooms, excessive parallax, or transitions that obscure captions.
- Keep the base warm palette from `template/src/theme.ts`; use controlled accent colors, subtle contrast/depth, and restrained vignette/grain. Maintain legibility and color consistency; avoid muddy or over-processed frames.
- The voice remains prominent, clear, synchronized, and undistorted. Keep ambience and SFX low and sparse so they do not mask speech or peak abruptly. Do not add unlicensed music.
- If applying loudness normalization, use compatible FFmpeg processing and verify the resulting audio rather than claiming a measurement that was not made.

### 5. Implement

Replace sample `src/data.ts` values with:

- `TOTAL`: measured audio duration plus a short visual ending hold.
- `CAPS`: exact SRT wording and timings; `{word}` is visual highlighting for an existing word; `\n` is line wrapping only.
- `SPEAK`: speaker windows only when the speaker is clear; otherwise avoid guessing.
- `SCENE_TAGS`: concise labels derived from the story.
- `SFX`: necessary effects only, synchronized to the approved plan.

Adapt `src/scenes.tsx` to the approved storyboard. Ensure `SCENES` is time ordered, begins at 0, has no unintended gaps/overlaps, and ends at `TOTAL`. Use `useT(t0)` for timing and `Stage` for SVG-based scenes. All direct `Stage` children must be SVG elements/components or scenes may render blank. Avoid unnecessary edits to shared components; check for regressions if they are changed.

### 6. QA and final render

Before full render:

1. Run `npx tsc --noEmit` and fix relevant errors.
2. Validate finite positive `TOTAL`, caption ranges/order, scene coverage and ordering, tag/SFX ranges, and existence of voice/font/SFX/RMS assets.
3. Render a representative still for every scene and important caption state. Review all frames/contact sheet for blank scenes, Bengali glyph errors, clipped text, low contrast, overlap, cropping, and inconsistent characters/colors. Inspect cuts and ending.
4. Where possible, review a short motion/audio sample for timing, transitions, clipping, abrupt endings, and voice/music balance.
5. Render H.264 MP4 at 1080×1920 and 30 fps with suitable quality and safe concurrency (default maximum 2). Wait for completion and inspect logs/exit status.
6. Verify the actual final file exists and is non-empty. Use `ffprobe` to check codec, dimensions, frame rate, duration, and audio stream; inspect several final frames and listen to audio samples where possible.
7. Deliver only the verified final MP4. Mention any known/unverified issue honestly.

## Final response

After successful verification and delivery, reply briefly in Bengali with the MP4 attachment/link and one line:

- **“যা ঠিক হয়নি: [সমস্যাটি]”** if there is a known issue; or
- **“যা ঠিক হয়নি: কিছু নেই।”** only if the checks found no known issue.

If a final render cannot be completed, say so plainly and do not claim delivery.

## Reusable scene kit

The shared kit is in `template/src/kit.tsx` and `template/src/figures.tsx`. `<Stage dur={dur}>` creates the 540×960 SVG design stage; `useT(t0)` gives local frame/time; `Person`, `Mini`, and `Bubble` provide vector figures; `RoomNight`, `RoomDay`, `RoomLiving`, `DeskNight`, and `DeskTop` are reusable backgrounds/props; `Doc`, `Eye`, `Megaphone`, `StepCard`, and `Relatives` are reusable visual components. Adapt these to the approved story; do not retain unrelated sample content. `mouthOpen(who,t)` depends on `SPEAK` and `RMS`, so assign speakers only when supported by the SRT/audio.

## Known limitations

The template's characters have limited motion and no built-in walking animation. Its examples are not an automatic story-understanding system. Every video still needs scene planning and human review of story fit, Bengali text, and visual quality.
