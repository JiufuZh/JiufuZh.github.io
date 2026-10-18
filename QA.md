# Verification

Reference-led revision checked October 17, 2026. Local validation and GitHub publication verification are complete.

| Check | Evidence / result |
|---|---|
| Facts and disclosure | Independent review matched resume and user clarifications: employer, dates, education, GPAs, 1,554 games / 88,949 plies, 417 posts, NCA accepted status. No private source links, internal results, phone/address or raw resume. |
| Structure and assets | All local assets, fragment links and ARIA label targets exist; no duplicate IDs. Original FOW SVG parses as XML and contains no external resources/scripts. |
| Layout | Desktop, 768px tablet and 390px phone visually inspected. 320/390/768px widths have no horizontal page overflow. Thumbnail intrinsic-height issue fixed and visually rechecked. |
| Chess | Inline and preview-to-dialog entry points work; stage selection, playback/pause, previous/next, Escape and focus return checked. Pause now retains the current screenshot rather than resetting an animated WebP. |
| Playback timing | Agent's isolated clock/DOM checks verified paused remaining time, resume, detail/dialog close, page-hidden and motion-preference cleanup. This is a simulation of timer behavior, not a device test. |
| FOW | ArrowRight and End select correct tabs. Collapse stops playback. Direct engineering/workflow links reveal parent details. |
| Browser and scripts | Both JavaScript files pass syntax checks. Browser console reported no errors or warnings during local interaction checks. |
| Motion | Static by default. Reduced-motion cleanup inspected and exercised in the isolated handler check. No fresh device-level reduced-motion emulation is claimed for this revision. Navigation scrolling is immediate. |
| Direction | User supplied the reference site; a user-approved agent_simulation checkpoint checked consistency. No Jev API called; it is not a visual-quality certification. |
| Publication | GitHub Pages reported built for `3832529`. Live page shows the new layout; both project previews load and the Chess viewer opens. Final screenshot saved locally. |

The reference site's layout was inspected in the browser. No personal content, images or code were copied from it. Three agents handled content, media behavior, and the FOW preview independently. Current facts and captions are synchronized in [CONTENT.md](CONTENT.md).

Original revisions were previously published at `1218018` and `491dfbc`; the user rejected their visual direction. Their checks do not establish verification for this new design. Screenshots and private notes remain in ignored `.qa/` and `.research/`. No claim of WCAG certification, Safari/Android device testing, or measured user performance is made.

## Portrait moire repair

User approved non-generative local processing. Applied an inward-feathered apparel mask with mild texture filtering and local suppression of broad shoulder interference. Selected the lighter variant after full-size, 230/210/170px and 2x-density rendered comparisons. Independent review favored it over stronger blur. The final lossless WebP remains 779x1134; all pixels above y660, skin/neck pixels, and every pixel outside the apparel mask match the decoded original exactly. The original JPG's SHA-256 is unchanged. Local browser confirms the new asset loads at the same crop and size. GitHub Pages built commit 1ba435c; the live homepage loads the repaired 779x1134 WebP, and its displayed shirt was visually checked. Original photo retained; generated candidates were not published.

## Natural fabric refinement, October 18

User requested more texture after the initial repair looked too smooth. Restored fine weave and seam detail from the original photo within the same apparel mask, retaining broad shoulder-ripple suppression. The stronger of two detail-restoration candidates was preferred by independent visual review at full size and displayed 230/210px sizes. Final `assets/jiufu-zhou-natural.webp` is a lossless 779x1134 image. Repeated equality checks show zero changes above y660, to skin/neck, or outside the apparel mask; lossless encoding preserves the candidate exactly, and the original file hash is unchanged. GitHub Pages built `987915c`; the live homepage loads the new portrait and its displayed appearance was visually checked. Screenshot retained in ignored `.qa/portrait-natural-live.jpg`.

## Step-by-step projects, October 18

Both main demonstrations now appear directly in full-width project sections. Chess has six real UI stages and a captioned 32.7-second GIF (1.65 MB); its lossless animated WebP preserves each source screenshot exactly. FOW has six illustrated stages with four frames each. Independent content review found no remaining factual or disclosure issues; independent visual review passed all six FOW desktop scenes.

Browser verification passed: all six Chess step/image/caption mappings, previous/next bounds, playback progression, pause retaining its frame, end/replay, full-size dialog, Escape/focus return, and offscreen pause. FOW's 24 manual frames, keyboard Home/End navigation, play/pause, final-frame stop/replay and offscreen pause passed. Reduced-motion emulation disables automatic playback in both while manual navigation works. Whole-page widths and all FOW scenes were checked at 320, 390, 768 and 1440 pixels without overflow; the long examples/training scenes were visually inspected at 390 pixels. Console had no warnings/errors. Local asset/fragment/ARIA checks and both JavaScript syntax checks passed. A separate Chess timer simulation passed exact pause/resume and visibility lifecycle checks; these are not real-device tests.

Screenshots remain in ignored `.qa/`. Live publication pending.
