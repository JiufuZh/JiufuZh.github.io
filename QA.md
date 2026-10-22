# Verification — October 21, 2026 polish

This pass refines the established four-view homepage. Earlier source, recording and navigation verification remains in [QA-HISTORY.md](QA-HISTORY.md).

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
| Follow-up | Live review found an old training-step announcement remaining after a recording switch. Corrected and covered by the 19th controller check; final live deployment verification pending. |
| Publication | Pages built `a3af764`. Revised layouts, copy and controls verified on the public site. No JavaScript warnings or errors during the browser checks. |

Evidence remains in ignored `.research/` and `.qa/`. No physical-device or formal accessibility-conformance claim is made.
