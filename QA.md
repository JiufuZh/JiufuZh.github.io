# Verification — October 21, 2026

This revision separates About, Chess, FOW and Research into navigation-selected views and rewrites the second biography paragraph. Earlier recording, portrait and publication checks remain in [QA-HISTORY.md](QA-HISTORY.md).

| Check | Evidence / result |
|---|---|
| Sources | About facts match the resume. Independent review confirms both projects belong to the internship. Research links point to the official NCA conference, adviser profile and February 2026 adviser CV; the CV listing is explicitly a COMET submission, not the NCA abstract. |
| Navigation | Isolated checks pass exclusive views, current-link state, titles, hash aliases, descendant anchors, unknown hashes, browser history handling, same-hash clicks, keyboard focus, skip link and modified/external links. |
| Playback | Nine isolated controller checks pass, including page-change closure of the enlarged viewer and pausing every player without losing the selected frame. |
| Structure | All 29 local references resolve, 14 IDs are unique, and script syntax checks pass. Independent source review confirms desktop columns and mobile intro → media → notes order. Existing three clips and 15 frames are unchanged. |
| Direction | User-approved Jev agent simulation approved the view-switching prototype direction. No Jev API or paid service was called. |
| Browser / publication | Pending live verification. The local browser preview was inaccessible under the browser policy; it was not retried or bypassed. |

Private test scripts and screenshots stay in ignored `.research/` and `.qa/`. Isolated tests do not establish rendered layout or real-device accessibility.
