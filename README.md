# Jiufu Zhou

An English portfolio for software engineering and applied AI roles, centered on two DeepBrain Technology internship projects. [Live site](https://jiufuzh.github.io/). Updated October 22, 2026.

## Structure

Top-level navigation is **About / Projects / Research**. Projects contains **Chess Coaching / Fog of War Chess Engine**, with one project visible at a time. `#projects` defaults to Chess Coaching; `#chess-analysis` and `#fog-of-war` remain stable. Hash navigation and browser history are handled by `nav.js`.

About retains the portrait, introduction, education and contact links. Research shows the Instagram study first and struvite work second. Project introductions sit above a topic rail and wide media area, with controls above each capture and engineering notes tied to its current step. At widths up to 1000px, topics appear above the full-width media and additional implementation notes follow it. The introduction stacks at 760px. The repeated footer has been removed.

## Run and edit

No installation or build step is required:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

- `index.html`: structure, biography, project ownership and research.
- `styles.css`: layout, typography and responsive behavior.
- `recordings.js`: topics, posters, steps, captions, engineering notes, timing and GIF links.
- `main.js`: shared player and enlarged viewer.
- `nav.js`: content selection, history and navigation state.
- `assets/`: portrait and approved demonstration media.
- [CONTENT.md](CONTENT.md): facts and disclosure limits; [DESIGN.md](DESIGN.md): presentation decisions.

## Walkthrough coverage

There are **seven walkthroughs with 26 step entries**. A training checkpoint image appears in both training and resumption; the count is not 26 unique captures.

| Project | Walkthrough | Steps | Evidence shown |
| --- | --- | ---: | --- |
| Chess Coaching | Review & explain | 4 | Original app screenshots: import, review, coaching and candidate preview |
| Chess Coaching | Practice a mistake | 3 | Original app screenshots: exercise, hint and accepted move |
| Fog of War | Prepare observations | 4 | Rendered outputs from original replay, observation and history encoders, plus the fixture split manifest |
| Fog of War | Train a model | 3 | Local event viewer observing the original CPU trainer |
| Fog of War | Resume a checkpoint | 3 | Saved state, second process, restored weights/optimizer and continued training |
| Fog of War | Run self-play | 5 | Actual capped rollout reconstructed from saved moves, then update/save checks |
| Fog of War | Play in the browser | 4 | Original userscript and real FastAPI inference on a permitted local test board |

Chess uses Stockfish and local coaching; no live LLM request was made. Its broader implementation notes describe verified features beyond the available footage, including saved reviews, configurable coaching, custom positions and practice history. Those notes do not imply additional recorded demonstrations.

FOW uses a tiny synthetic fixture. Observation and self-play graphics render actual execution traces; they are not original product screenshots. Training footage uses a demonstration event viewer. The browser runs the original integration script against a new local test-board adapter and uses the checkpoint from the resumed training run. Self-play is capped and demonstrates loop mechanics, changed weights and checkpoint reload, not playing strength or model promotion. The 1,554 games / 88,949 plies describe the internship archive, not the fixture.

## Player behavior

Topics are generated from metadata and start paused at their selected poster. Play begins at the first step; manual navigation cancels that poster behavior. Changing topics pauses playback and selects the new poster. Each step updates its caption, number and engineering note. Playback ends at the last step and can replay; pausing preserves remaining frame time.

Clicking a capture or Enlarge opens the same viewer. If supplied, `originalSrc` is used there and in the full-resolution link. Playback waits for loaded images; failures expose retry. View changes close the viewer and pause players. Hidden documents and offscreen inline players pause; an enlarged clip may continue until closed. Reduced-motion users navigate manually. Keep keyboard focus, live status messages and the existing 44px playback/chapter targets; topic buttons are at least 48px on desktop.

GIFs and players use edited snapshot timing, not continuous video or execution-speed measurements. Capture notes distinguish original screenshots, local viewers and rendered traces; the enlarged caption includes the selected topic's context.

## Research and publication

Research facts, advisers and dates remain in [CONTENT.md](CONTENT.md). The Instagram study's 0.95–1.00 reliability has no specified coefficient type; exploratory associations do not establish significance or causation. Its November 2026 NCA status is accepted for presentation. The general conference link is not an abstract, and the adviser's February CV lists related work as a COMET submission. The struvite entry has no verified resulting publication or authorship.

Keep private source, datasets, internal metrics, credentials, original resume files and research notes out of Git. Ignore `.research/`, `.qa/`, environment files and dependencies. GitHub Pages serves `main` from the repository root with `.nojekyll`; no external fonts, analytics or paid service are required. Verification belongs in [QA.md](QA.md), progress in [LOGBOOK.md](LOGBOOK.md).
