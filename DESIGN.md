# Homepage design

Updated October 22, 2026. The accepted reference is [Yuyao Wang's homepage](https://kristoff-starling.github.io/): indigo navigation, a profile column beside biography and education, and restrained academic typography. Preserve the established About, Research and navigation identity. The current project revision makes actual work easier to inspect; it does not introduce a new visual theme.

## Structure

About / Projects / Research selects one main section. Projects contains Chess Coaching / Fog of War Chess Engine, with one project visible. `#projects` defaults to Chess Coaching; `#chess-analysis` and `#fog-of-war` remain valid. Preserve browser history, current-page indicators, keyboard focus and the selected page's starting position.

About keeps its portrait, first-person introduction, technical focus, education and contact links. Research presents the Instagram study first and struvite work second, with separate titles, dates/roles, advisers, contributions and links. NCA acceptance and the COMET CV note belong only to the Instagram study. The struvite adviser link is not a publication record. The repeated footer name, email and About link are removed; contact remains available in About.

## Projects

Place a readable title and concrete contribution paragraph above the walkthrough, with internship context alongside the introduction. Keep technology names subordinate. The contribution should explain what Jiufu worked on without implying sole ownership of either company project.

Below it, a 185px topic rail sits beside the wide media area. Topic buttons use plain task names and a visible selected state. The selected topic has a short heading and summary, then playback controls above the image. Captions, step navigation and an engineering note follow the image. Notes change with the selected step, connecting an observable result to the implementation decision behind it.

At widths up to 1000px, the rail becomes wrapping topic buttons above full-width media; broader implementation notes move below it. Step-note headings stack above their text. At 760px, the project introduction also stacks. Preserve original media aspect ratios and offer enlargement instead of hiding details through cropping.

Chess's “More in the app” uses compact disclosure sections for source-verified capabilities outside the available recordings: responsive analysis, saved reviews, adaptable coaching, custom positions and practice history. Its visible coverage note must remain. FOW's rail states the partial-observation constraint and provides a contribution disclosure. Essential ownership stays visible in the project introduction.

## Evidence and coverage

Seven walkthroughs contain 26 step entries: Chess review/explanation (4) and practice/hint/solution (3); FOW observations (4), training (3), resume (3), self-play (5) and browser integration (4). The training/resume topics share one saved-checkpoint capture.

Original Chess screenshots use local Stockfish coaching without a live LLM request. Original browser-script captures use real inference on a permitted local test board. Training runs through the original code with a demonstration event viewer. Observation and self-play graphics render genuine encoder outputs and saved moves; they are execution traces, not original product screenshots. Preserve these distinctions in capture notes and the enlarged viewer.

Use a meaningful poster for each topic. Play starts at its first step, while manual navigation lets visitors inspect any state. Topic changes pause playback. Each topic has its own downloadable GIF. Edited frame timing improves readability and does not represent execution speed. The historical archive counts are separate from the tiny synthetic fixture. Do not turn capped self-play into a strength benchmark or imply model promotion.

## Visual language

Use white #FFFFFF, paper grey #F6F7F9, ink #292D33, secondary #616975, indigo #4054AD and pale blue #EBEEF8. Georgia/Cambria carries prose; system sans-serif carries navigation and controls. Keep the centered 1140px frame, expanding to 1200px on wide screens.

Project titles are 34px; introduction prose 19px; topic headings 22px; captions 18px; engineering notes 17px. Ordinary project metadata is 14–15px. Keep prose left aligned, with sensible line lengths. Playback/chapter controls have at least 44px height; desktop topic buttons have 48px. Use spacing and the existing rules to organize content. Avoid extra cards, badges, fake terminal windows, numbered decoration or automatic entrance motion.

## Behavior and verification

Preserve paused startup, remaining-time pause/resume, final-step replay, image-loading/retry states and reduced-motion manual access. Clicking the screenshot and Enlarge open the same native dialog. View changes close it and pause playback; closing restores focus. Per-step status updates remain available to assistive technology. Details controls must stay keyboard reachable.

Applied frontend-design and UI Taste polish/distill guidance, alongside the previously researched [interactive-portfolio](https://github.com/sickn33/agentic-awesome-skills/blob/main/skills/interactive-portfolio/SKILL.md) and [personal-homepage](https://github.com/shengjidaguai-china/personal-homepage-skill/blob/main/SKILL.md) guides. External skills were read, not installed or executed. The approved Jev agent simulation is advisory; no Jev API was called.

[CONTENT.md](CONTENT.md) governs facts and disclosure; [README.md](README.md) describes implementation. Confirm the changed layout with real browser inspection at desktop, tablet and phone widths, including keyboard, reduced motion, topic switching, posters, loading/retry and the enlarged viewer. Source checks and simulation do not establish visual or accessibility conformance. Record actual results in [QA.md](QA.md) and progress in [LOGBOOK.md](LOGBOOK.md).
