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

Screenshots remain in ignored `.qa/`. GitHub Pages built `0a2ca81`; the live page loads the revised assets and both project step controls work. The GIF returns HTTP 200 as image/gif with the expected 1,646,996 bytes. Live screenshot saved locally. Temporary preview server/tab were closed and browser emulation restored.

---

# Verification — October 18, 2026

This revision replaces the FOW illustrations with actual local execution captures and simplifies both project sections. Prior publication and portrait checks are preserved in [QA-HISTORY.md](QA-HISTORY.md); they do not substitute for these checks.

| Check | Evidence / result |
|---|---|
| Training execution | Original training code ran on a tiny synthetic fixture on CPU. A fresh epoch saved a checkpoint; a second process restored weights and optimizer and completed epoch 2. Checkpoint loading and actual inference passed. Original private source hashes remained unchanged. |
| Browser execution | The unchanged original browser script called the real inference service using that exact resumed checkpoint. Returned e2e4 was a rule-authoritative candidate; the script clicked both squares and the resulting board matched a replay of the move. Refresh showed the pawn on e4. |
| Media provenance | Five training and four browser PNGs were captured from the running local viewer/test board. Independent visual/evidence review passed. GIFs contain those exact states with edited timing: training 22.5 seconds / 116,213 bytes; browser 18.5 seconds / 402,151 bytes. These are snapshot sequences, not continuous video. |
| Disclosure | Public captions distinguish original execution code from the new capture viewer/test board, and synthetic demo data from the resume-disclosed dataset. No strength claims, private source, paths, objective values or experimental metrics appear. Session token remains masked. Source, checkpoints, raw events and audit evidence stay ignored. |
| Content | Independent review matched contributions and resume facts, including both projects' internship attribution. CONTENT, README, DESIGN and BRIEF agree. No LLM script-generation claim. |
| Desktop / mobile | Desktop project view and 390px phone view inspected. Layout measurements at 320, 390, 768 and 1440px show no horizontal overflow. Full-resolution image links allow closer inspection of small interface details. |
| Chapters | All six Chess, four browser and five training chapters load the correct image and caption. FOW clip switching updates chapters, context and GIF link. |
| Controls | Real browser checks passed playback, final-frame Replay, restart/pause, offscreen pause, enlarged view, Escape and focus return. Full-resolution image link points to the active capture. Reduced-motion emulation disables timed playback in both projects while manual steps work. |
| Controller | Eight isolated tests pass remaining-duration pause/resume, final stop/replay, bounds, clip switching, reduced motion, visibility, modal controls and focus restoration. These tests are not real-device checks. |
| Structure / console | Asset, fragment and ARIA targets exist; no duplicate IDs. JavaScript syntax and diff whitespace checks pass. Browser console has no warnings/errors during final interactions. |
| Direction | User-approved agent simulation checked the real-media/plain-chapter direction; no Jev API or paid service was called. About and portrait remain unchanged. |
| Publication | GitHub Pages built `de1bfe8`. Live browser verified both clip switches, final training capture and actual browser move. Both GIFs return HTTP 200 as image/gif with the expected sizes. Live screenshot saved locally. |

Private evidence and screenshots stay in ignored `.research/` and `.qa/`. No Safari/Android device or formal accessibility certification is claimed.

---

# Verification — October 21, 2026

This revision separates About, Chess, FOW and Research into navigation-selected views and rewrites the second biography paragraph. Earlier recording, portrait and publication checks remain in [QA-HISTORY.md](QA-HISTORY.md).

| Check | Evidence / result |
|---|---|
| Sources | About facts match the resume. Independent review confirms both projects belong to the internship. Research links point to the official NCA conference, adviser profile and February 2026 adviser CV; the CV listing is explicitly a COMET submission, not the NCA abstract. |
| Navigation | Isolated checks pass exclusive views, current-link state, titles, hash aliases, descendant anchors, unknown hashes, browser history handling, same-hash clicks, keyboard focus, skip link and modified/external links. |
| Playback | Nine isolated controller checks pass, including page-change closure of the enlarged viewer and pausing every player without losing the selected frame. |
| Structure | All 29 local references resolve, 14 IDs are unique, and script syntax checks pass. Independent source review confirms desktop columns and mobile intro → media → notes order. Existing three clips and 15 frames are unchanged. |
| Direction | User-approved Jev agent simulation approved the view-switching prototype direction. No Jev API or paid service was called. |
| Desktop / phone | Inspected live About, Chess, Research and FOW desktop captures plus a full 390px FOW capture. All four views measured at 320, 390, 768 and 1440px with no horizontal overflow. Mobile retains intro → media → notes. |
| Live navigation | Only one view appears in the page and accessibility tree. Selected navigation, titles, back/forward and legacy Chess/FOW links work. Enter moves focus to the destination heading; the skip link focuses main without changing the active page. |
| Live media | Navigating away pauses playback. Back while the enlarged viewer plays closes it and pauses both players; forward retains the selected FOW frame. Both FOW recordings, chapter selection and enlarged image were exercised. Reduced-motion emulation disables timed playback while manual steps still work. |
| Console | No warnings or errors during final interactions. Viewport and motion overrides restored. |
| Publication | GitHub Pages built `22398cd`. The public site visibly serves the new biography, four-view navigation and research destinations. Screenshots saved locally. The inaccessible local preview was not retried or bypassed. |

Private test scripts and screenshots stay in ignored `.research/` and `.qa/`. No physical phone, Safari or formal accessibility certification is claimed.


## October 21 closeout

# Verification — October 21, 2026

The table records the earlier polish pass; subsequent portrait and grouped-navigation checks follow below. Earlier source, recording and navigation verification remains in [QA-HISTORY.md](QA-HISTORY.md).

| Check | Evidence / result |
|---|---|
| Baseline and scope | Inspected incumbent About and Chess at 1440×1000 and phone FOW at 390px; captured current Chess at 900×1100 and 1440×1000. UI Taste polish/craft and independent design review support local changes, not a new identity. |
| Content | Independent content review found no factual defects. Copy now avoids repeated education and vague summaries. Counts, internship attribution, research status, original images and capture disclosures are retained. Both source repositories are private, so no inaccessible source link was added. |
| Structure | 28 local references resolve and 14 IDs are unique. Navigation checks and script syntax pass. Prose links are underlined; primary controls and chapters have 44px targets. |
| Player | 19 isolated behavior checks pass: original playback/route checks plus delayed loading, failures/retry, late events, both enlargement openers, progress and modal announcements. Initial setup stays silent; explicit recording switches announce the new first step. |
| Direction | Jev agent simulation was used under the user's prior provider choice; no API or paid service was called. It advised a bounded refinement and required rendered verification. |
| Visual comparison | Inspected the new About and Chess at 1440×1000 against the saved baseline. At 900px, the larger recording replaces the narrow column. At 390px, inspected separate top and controls/notes viewport captures; full-page capture was unreliable. Portrait and capture pixels are unchanged. |
| Responsive layout | All four views measured at 320, 390, 768, 1000 and 1440px: one active page and no horizontal overflow. Controls and chapter labels wrap within the selected page. |
| Native browser behavior | Screenshot opens with Enter, modal Next updates its live status, and Escape restores the screenshot-button focus. Playback advances through browser frames and pauses on navigation. Reduced-motion disables timed playback while manual training steps work. |
| Failure recovery | Temporarily blocked one public image request in the test tab. The error state appeared, Play disabled, and manual steps remained available. After removing the block, Retry loaded the image and stayed paused. Network and media overrides restored. |
| Follow-up | Live review found an old training-step announcement remaining after a recording switch. Corrected and covered by the 19th controller check. Live 1638e90 confirms switching back from training announces “Step 1 of 4: Read the board.” |
| Publication | Pages built `a3af764` and final correction `1638e90`. Revised layouts, copy and controls verified on the public site. No JavaScript warnings or errors during the browser checks. |

Evidence remains in ignored `.research/` and `.qa/`. No physical-device or formal accessibility-conformance claim is made.

## Portrait framing correction

Pages built `8fd9c60`. The existing photo now uses a horizontally centered, top-aligned crop. Inspected live captures at 1440px and 390px: the full head remains visible in the unchanged 230×250 and 170×185 frames. Phone horizontal center differs from its profile container by less than 1px. Original image pixels are unchanged. Screenshots are saved in `.qa/portrait-centered-desktop.png` and `.qa/portrait-centered-mobile.png`.

## Grouped Projects navigation

Pages built `749132d`. Top navigation now reads About / Projects / Research; Projects contains Chess / FOW links and defaults to Chess. Existing project content, portrait and recordings are unchanged.

Isolated navigation checks pass for group selection, secondary visibility, current states, project switching, history, focus, skip link, old hashes and invalid routes. All 19 player checks still pass; 29 references resolve and 15 IDs are unique.

Live browser inspection at 1440×1000 and a 390×844 phone viewport confirms the new hierarchy, one project at a time, and no horizontal overflow. Secondary links measure at least 44px high. Projects remains active on FOW; Research hides the secondary links. Back/Forward restores the selected project, Enter focuses the project heading, and switching to FOW pauses Chess playback. Browser warnings/errors: none. Viewport overrides were restored.

Screenshots: `.qa/projects-navigation-desktop.png`, `.qa/projects-navigation-mobile.png`, and `.qa/projects-fow-mobile.png`. Phone screenshots show viewport portions, not the whole page. This was a scoped UI Taste refinement; no new design concept or Jev judgment was needed.

## Project names

Pages built `03d339c`. Navigation, headings, browser titles and recording titles now use Chess Coaching and Fog of War Chess Engine. Stable hashes and media assets remain unchanged. Navigation checks, recording-script syntax and local-reference validation pass. Inspected the live names at 1440px and 320px; both navigation labels wrap cleanly on the narrow phone with no horizontal overflow. Screenshots: `.qa/project-names-desktop.png` and `.qa/project-names-mobile.png`. Viewport overrides restored.

## UAlbany ESE research

Pages built `f28dfa5`. New title comes from the user's linked chat; role, dates, advisers and three contributions match the supplied text. Huang's official faculty page was verified. The two research entries have separate dates and advisers; the NCA/COMET status stays with health-promotion research.

Navigation checks and 30 references / 19 unique IDs pass. Compared live 1440×1100 layout with the prior Research page, then inspected upper and lower 390×844 phone views. Both entries are readable without horizontal overflow; Research remains selected. No browser warnings/errors. Viewport overrides restored. Evidence: `.qa/research-ese-desktop.png`, `.qa/research-ese-mobile.png`, `.qa/research-ese-mobile-lower.png`.

## Research order and expanded Instagram study

Pages built `bcf010f`. Live order is health-promotion research, then struvite. Three bullets include all supplied variables, 417 posts, 0.95–1.00 intercoder reliability, findings and exploratory analysis. Advisers, dates, links and struvite text are preserved. Local checks pass: 30 references, 19 unique IDs. Desktop screenshot and 390px phone upper-view screenshot inspected; DOM widths show no horizontal overflow. Full-page captures were unreliable, so this is viewport verification. Valid evidence: `.qa/research-health-first-desktop.png`, `.qa/research-health-first-mobile.png`. Browser logs clear; viewport overrides restored.
