# Jiufu Zhou

An English portfolio focused on software engineering, applied AI, and two projects from a DeepBrain Technology internship.

## Run locally

No installation or build step is required. From this folder:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/ in a browser.

## Edit

- `index.html`: page content and structure.
- `styles.css`: responsive layout and presentation.
- `main.js`: Chess walkthrough, playback and full-size viewer.
- `fow-demo.js` and `fow-demo.css`: illustrated training/inference workflow.
- `assets/`: portrait, favicon and approved project UI captures.
- [CONTENT.md](CONTENT.md): verified biographical and project facts.

The Chess animation is a sequence of actual local UI captures using a sample game and bundled Stockfish. It does not show a live LLM request. The FOW visual is a conceptual walkthrough, not a recording of training or a performance benchmark. Both demos are static initially, with optional playback and pause controls.

Private repositories, internal reports, original resume files, credentials and research notes are not part of this site. Keep `.research/`, `.qa/`, environment files and dependencies ignored by Git.

## GitHub Pages

This static site can be served directly from the repository root on the `main` branch. `.nojekyll` keeps it buildless. Use the GitHub Pages settings to select `main` and `/ (root)`.

Publication status is tracked in [LOGBOOK.md](LOGBOOK.md). No analytics, contact-form backend, external fonts, or paid service is required.
