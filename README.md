# Jiufu Zhou

An English portfolio focused on software engineering, applied AI, and two projects from a DeepBrain Technology internship.

**Live site:** [jiufuzh.github.io](https://jiufuzh.github.io/)

## Run locally

No installation or build step is required. From this folder:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/ in a browser.

## Edit

- `index.html`: page content and structure.
- `styles.css`: responsive layout and presentation.
- `main.js`: six-step screenshot walkthrough, full-size viewer, engineering notes and direct section links.
- `fow-demo.js` and `fow-demo.css`: six-stage animated data, training and browser-inference walkthrough.
- `assets/`: portrait, favicon and approved project UI captures.
- [CONTENT.md](CONTENT.md): verified biographical and project facts.

Both projects show their main walkthroughs directly on the page. The Chess walkthrough plays six actual local UI captures using a sample game and bundled Stockfish; a captioned GIF is available to download. Pause retains the current screenshot. It does not show a live LLM request. The FOW walkthrough illustrates six stages from game records to browser moves, with several visual frames per stage. Its positions and data flow are examples, not a recording of training or a performance benchmark. Both demos start paused, provide step controls, and stop playback when hidden or offscreen. Reduced-motion users can inspect each step without automatic animation.

Private repositories, internal reports, original resume files, credentials and research notes are not part of this site. Keep `.research/`, `.qa/`, environment files and dependencies ignored by Git.

## GitHub Pages

This static site can be served directly from the repository root on the `main` branch. `.nojekyll` keeps it buildless. Use the GitHub Pages settings to select `main` and `/ (root)`.

The site is published from `main` at the repository root. Verification is recorded in [QA.md](QA.md), with progress in [LOGBOOK.md](LOGBOOK.md). No analytics, contact-form backend, external fonts, or paid service is required.

The displayed portrait uses `assets/jiufu-zhou-natural.webp`, a lossless copy with broad clothing moire reduced and original fine fabric detail retained. Face and neck pixels are preserved; the original supplied JPG remains available in assets.
