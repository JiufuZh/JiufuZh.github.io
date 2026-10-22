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
