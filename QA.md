# Verification — October 22, 2026

This pass expands the project walkthroughs. Earlier checks are in [QA-HISTORY.md](QA-HISTORY.md).

| Check | Evidence / result |
|---|---|
| Scope and direction | Inspected 1265×712 incumbent project views. Preserve the accepted identity; move introduction above a larger recording, add a task selector and contextual notes, remove the redundant footer. Previously approved Jev agent simulation advised this direction; no API call. |
| Chess evidence | Two clips use seven existing real app captures, including the previously omitted hint. Original source images remain unchanged. Broader features are identified as implementation notes, not additional footage. No live LLM request. |
| FOW evidence | Five topics: observation preparation, CPU training, checkpoint resume, self-play, browser execution. Original-code data/self-play output is explicitly labeled as a rendered local execution trace. Training uses the earlier event viewer; browser footage uses the original userscript and local test board. |
| New execution | Original source hashes unchanged. Tiny synthetic fixture replay, visibility/history masking and disjoint game splits checked. Actual capped CPU self-play produced valid moves, changed weights, saved optimizer state and a reloadable checkpoint. No promotion or playing-strength claim. |
| Media | Seven GIFs have 26 frame entries. Every source and GIF exists; each GIF frame count and duration matches its clip metadata. New frames and caption strips visually inspected. |
| Controller | All 27 isolated checks pass: existing playback/loading/error/retry/modal lifecycle plus generated topics, poster-to-start playback, manual poster override, dynamic notes, original-image selection, failed initial loads and invalid poster fallback. |
| Navigation and structure | Grouped Projects and legacy routes pass. Static validation reports 28 resolved references, 19 unique IDs and valid ARIA references. Script syntax and diff whitespace checks pass. |
| Publication | GitHub Pages built `8894c41`; the public site loads the seven-topic version and no footer. |
| Desktop and tablet | Inspected desktop captures at a 1280×720 viewport and tablet at 900×1100. The larger media, top controls, readable notes and topic selection match the constrained baseline changes. Tablet media spans about 819px. |
| Phone | Inspected 390×844 top and media viewports; measured 320px controls. No horizontal overflow at 1280, 900, 390 or 320px. Playback targets remain 44px high and topics 48px. |
| Live interactions | All five FOW topics have one selected button, matching poster/count, note and GIF. Chess poster Play starts at step 1 and advances; switching to Practice pauses and the Hint step updates its note. Enlarge carries the correct image/context; Escape restores focus. |
| Keyboard and motion | Enter selects a topic. Reduced-motion disables timed playback and permits Next to the Hint. Changing to Research pauses FOW; project and research navigation preserve the expected views. Overrides restored. No browser warnings/errors observed. |

Private source, data, runs, checkpoints and detailed evidence stay in ignored `.research/` and `.qa/`. Only approved presentation assets are published. New Chess browser captures are unavailable in this environment; the page does not claim recordings of its broader feature set. No physical-device or formal accessibility-conformance claim.

Valid captures include `.qa/projects-fow-full.png`, `projects-desktop-final.png`, `projects-tablet-final.png`, `projects-phone-top-final.png` and `projects-phone-media-final.png`. Full-page capture was unreliable after resizing: two phone captures misplaced sticky elements, and a later desktop capture failed. They were not counted as layout passes; normal viewport captures and DOM measurements verified the affected states. A preview-control timeout recovered after resetting the viewport and reloading. Failure/retry behavior in this pass was checked by the isolated tests; earlier live failure checks remain in the history.
