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
