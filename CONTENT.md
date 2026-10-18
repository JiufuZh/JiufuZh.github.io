# Homepage content

This is the authority for public facts and wording in [index.html](index.html). Last reviewed: October 18, 2026. The resume establishes personal facts; the user's clarification establishes both projects as internship work.

## Profile and introduction

Jiufu Zhou. MS Information Management, University of Washington. Seattle, Washington. [Email](mailto:zjfu2003@gmail.com), [GitHub](https://github.com/JiufuZh).

I'm Jiufu, a master's student in Information Management at the University of Washington. I work on software engineering and applied AI, with experience across web interfaces, inference services, and model training.

During my internship at DeepBrain Technology, I worked on two chess projects: an app that helps players understand their moves, and an agent that learns to play with only a partial view of the board.

Technical focus summarizes demonstrated work: web applications, applied machine learning, and AI-assisted learning tools. It does not claim personal hobbies or unverified specialties.

## Education

- University of Washington: MS Information Management, expected June 2027; GPA 3.90/4.00.
- University at Albany, SUNY: BS Informatics, May 2025; GPA 3.88/4.00.

## Internship

DeepBrain Technology (StaySafeNow, Inc.). Software Development Engineer Intern. May–September 2026. Tenafly, NJ, hybrid.

Both projects below belong to this internship. The shared introduction reads: “Two projects from my internship, from analyzing a visible board to learning from an incomplete one.”

## Chess analysis and coaching

React, FastAPI, Stockfish WASM, OpenAI API.

I built the analysis interface and feedback features that take a player from reviewing a mistake to practicing the same position. Stockfish supplies the engine evidence; the app connects it to explanations and candidate moves.

One problem was keeping the interface correct when a player changed positions quickly. I ran Stockfish in a Web Worker, cancelled old requests, and versioned results so a late response would not overwrite the current board.

I also added structured-output validation and checks against engine evidence, with fallbacks for API failures. Saved reviews reopen without another LLM call.

The clip has six plain chapters: Import, Review, Explain, Compare, Practice, Solve. Actual local app screenshots show a sample PGN, the critical 3…Nf6 move, engine-backed coaching, the Qe7 alternative arrow, and practice ending with Qxf7#. The alternative is an overlay, not a played move. No live LLM request was made during capture; keep this context visible beneath the clip and in the enlarged viewer.

## Fog of War chess AI

Python, PyTorch, FastAPI, JavaScript.

I worked on an agent that plays with only a partial view of the board: preparing observations from **1,554 games and 88,949 plies**, training policy-and-value models, and connecting inference to a browser script.

The main data constraint was making sure the model could not see what the player could not. I constructed player-visible observations, masked opponent move histories, and kept complete games together when splitting training and evaluation data.

I worked on self-play updates and resumable checkpoints, then connected the model to a FastAPI service and JavaScript browser bridge.

Two selectable clips show fresh local execution:

- **Training run:** the project's original trainer runs on CPU with a tiny synthetic fixture. A new local event viewer displays observed training, checkpoint-save and resume events. The viewer was built for this demonstration; its events come from the running project code.
- **Browser integration:** the project's original userscript connects a newly built, permitted local test board to real FastAPI inference using the checkpoint from the training demonstration. It requests and applies a model-selected move.

These are short demonstrations, recorded separately from the historical training run. The approved archive counts describe the internship dataset, not the tiny fixture shown in the clip. The clips do not establish playing strength, production deployment, or performance on the full dataset. “Browser script” means the integration userscript, not LLM-generated source code.

## Media and presentation

Project summaries lead into large captures, plain chapter links and visible engineering notes. Each clip starts paused and provides play/pause, previous/next, an enlarged viewer and GIF download. Reduced-motion users can navigate manually. Playback pauses when the page is hidden or the inline player leaves view; the enlarged viewer can continue playing.

The players and GIFs use snapshots of actual execution. Frame timing is edited for readability; these are not continuous screen videos or measurements of execution time. Captions must identify the local demonstration conditions in both inline and enlarged views.

## Research

University at Albany, SUNY. August 2024–May 2025.

**Sponsorship and health credentials on Instagram.** This is a descriptive heading, not a claimed publication title.

I studied how supplement-promotion posts disclose sponsorship and health credentials. I developed and validated a codebook for **417 posts** and analyzed the results in Python.

Our co-authored extended abstract was **accepted for presentation at the 112th NCA Annual Conference**, November 2026. NCA is the National Communication Association. Do not change to presented/published without new confirmation.

## Disclosure

Publish only approved interface demonstrations, resume-disclosed technical details and data scales. Exclude private source, datasets, internal reports, extra experimental metrics, credentials, phone/address, original resume files and inaccessible private repository links. Do not add unverified user counts, latency, cost, model gains, GRU architecture or rating claims.
