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
