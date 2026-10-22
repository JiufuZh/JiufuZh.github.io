# Homepage content

Public facts and wording for [index.html](index.html), reviewed October 22, 2026. Sources: the resume, explicit user clarifications and inspected implementation. Preserve the distinction between demonstrated behavior and implementation notes.

## Profile

Jiufu Zhou, Seattle, Washington. [Email](mailto:zjfu2003@gmail.com), [GitHub](https://github.com/JiufuZh).

I'm Jiufu, a master's student in Information Management at the University of Washington. During my internship at DeepBrain Technology, I worked on a chess coaching app and a Fog of War chess agent.

My work covered React interfaces and Stockfish analysis, as well as PyTorch training and the browser script that uses model predictions. Earlier, I studied Informatics at the University at Albany, where I developed a codebook and analyzed 417 Instagram posts for a study of health supplement promotion.

Technical focus: web applications, applied machine learning and AI-assisted learning tools.

- University of Washington: MS Information Management, expected June 2027; GPA 3.90/4.00.
- University at Albany, SUNY: BS Informatics, May 2025; GPA 3.88/4.00.

## Internship

DeepBrain Technology (StaySafeNow, Inc.), Tenafly, NJ, hybrid. Software Development Engineer Intern, May–September 2026. Both projects are internship work.

## Chess Coaching

React, FastAPI, Stockfish WASM, OpenAI API.

Built the interface and feedback features that turn a game review into a lesson: find the mistake, compare a better move, then practice the idea on the board.

Contribution includes Stockfish in a Web Worker, request cancellation and result versioning; checks for LLM response structure and consistency with engine evidence; API-failure fallbacks; and saved reviews that reopen without another LLM call.

Two walkthroughs contain seven steps: **Review & explain** covers import, review, coaching and Qe7 preview; **Practice a mistake** covers the exercise, staged hint and Qxf7# solution. These are original local app screenshots. Qe7 is a preview overlay, not a played move. Coaching uses local engine evidence, with no live LLM request.

Separate implementation notes cover configurable teaching profiles, candidate exploration, FEN/board editing, multi-move practice, saved reviews and practice history. These verified capabilities extend beyond the recorded coverage; do not imply new footage or measured learning gains.

## Fog of War Chess Engine

Python, PyTorch, FastAPI, JavaScript.

From partial-board observations to a move in the browser. My work covered data preparation, policy-and-value training, and the script that puts model predictions into play.

The internship archive contains **1,554 games and 88,949 plies**. Contributions include player-visible observations, masked opponent histories, whole-game splits, policy/value training, self-play updates, checkpoint resumption and the FastAPI/browser bridge.

Five walkthroughs contain 19 steps:

- **Prepare observations:** original replay and encoders process a synthetic example; rendered outputs show visible input, masked history and whole-game splits.
- **Train a model:** original CPU training runs on a tiny synthetic fixture; a local event viewer displays observed training and checkpoint events.
- **Resume a checkpoint:** a second process restores weights and optimizer state, completes the next epoch and saves the browser demonstration's checkpoint.
- **Run self-play:** an actual capped rollout is reconstructed from saved moves as White's visible input. Model weights change, optimizer state is saved and the checkpoint reloads. No model promotion or strength result is claimed.
- **Play in the browser:** the original userscript connects a permitted local test-board adapter to real inference using the resumed training checkpoint, applies e2→e4 and reads back the board.

These local runs are separate from historical training. Dataset counts do not describe the fixture. Rendered execution traces and capture tools are not original product UI. The browser demonstration shows one decision, not an autonomous online match. “Browser script” means the integration userscript, not LLM-generated code.

## Presentation

About / Projects / Research navigation remains; Projects selects Chess Coaching or Fog of War Chess Engine. `#projects` defaults to Chess Coaching; preserve existing deep links. Topic rails, meaningful posters, controls above media and step-specific notes replace the narrow prose/media layout. Play starts at step one; manual navigation selects individual states. The repeated footer is removed. [README.md](README.md) documents controls and responsive behavior.

Seven walkthroughs contain 26 step entries. GIFs use edited snapshot timing, not continuous video or timing measurements. Preserve capture context in the inline notes and enlarged viewer.

## Research

Show the Instagram study first and struvite second, with independent advisers, dates and status.

### Health supplement promotion

University at Albany, SUNY, August 2024–May 2025. **Transparency and message processing in health supplement promotion on Instagram** is the resume project title, not a verified NCA abstract title.

Designed and refined a codebook for **417 Instagram posts** promoting branded health supplements: sponsorship disclosure, influencer type, product category and Elaboration Likelihood Model (ELM) message-processing routes. Multi-stage analysis achieved intercoder reliability of **0.95–1.00** and showed missing sponsorship labels and heavy peripheral-route persuasion among influencers in the sample. Statistical analysis and exploratory Python work examined associations among influencer characteristics, disclosure transparency and processing strategies. Do not infer coefficient type, significance or causality.

Advised by [Prof. Archana Krishnan](https://www.albany.edu/communication/faculty/archana-krishnan) and PhD candidate Alex R. Stankus. A co-authored extended abstract was accepted for presentation at the [112th NCA Annual Convention](https://www.natcom.org/nca-112th-annual-convention/), November 2026; not already presented/published. The [February 2026 adviser CV, page 12](https://www.albany.edu/sites/default/files/resumes/Archana%20Krishnan_CV%20%28Feb%202026%29.pdf#page=12) lists related “Unlabeled influence” work as a COMET submission. Neither link verifies an exact NCA abstract.

### Struvite nutrient release

**Wastewater-derived struvite for sustainable agriculture: characterization and controls on nutrient release.** User-supplied title. Research Aide, University at Albany ESE Research Lab, Albany, NY, February–May 2025. Advised by [Prof. Rixiang Huang](https://www.albany.edu/environmental-sustainable-engineering/faculty/rixiang-huang) and PhD candidate Shyrill F. Mariano.

Tracked three struvite types dissolving in organic acids and deionized water over 24 hours using inductively coupled plasma (ICP) measurements, with pH at seven time points. Soil-column experiments simulated environmental conditions with ICP dissolution measurements. Cleaned/processed ICP and pH data and visualized factors affecting dissolution. No resulting publication, authorship or agricultural-performance outcome is verified.

## Disclosure

Publish approved demonstrations, resume facts and explicitly supplied research details. Exclude private source, datasets, reports, extra metrics, credentials, phone/address, original resume files and private repository links. No unverified latency, cost, model gains, GRU architecture or rating claims.
