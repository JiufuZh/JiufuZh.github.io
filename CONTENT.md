# Homepage content

This is the authority for public facts and wording in [index.html](index.html). Last reviewed: October 21, 2026. The resume establishes personal facts; the user's clarification establishes both projects as internship work.

## Profile and introduction

Jiufu Zhou. MS Information Management, University of Washington. Seattle, Washington. [Email](mailto:zjfu2003@gmail.com), [GitHub](https://github.com/JiufuZh).

I'm Jiufu, a master's student in Information Management at the University of Washington. I work on software engineering and applied AI, with experience across web interfaces, inference services, and model training.

My background is in Informatics: I earned my bachelor's degree at the University at Albany and now study at the University of Washington. At DeepBrain Technology, I worked across the stack, from React interfaces and chess-analysis feedback to PyTorch training and browser-connected inference. Earlier, I helped study transparency in Instagram supplement promotions, developing a codebook and analyzing 417 posts. That research gave me experience turning a research question into a structured dataset and analysis.

Technical focus summarizes demonstrated work: web applications, applied machine learning, and AI-assisted learning tools. It does not claim personal hobbies or unverified specialties.

## Education

- University of Washington: MS Information Management, expected June 2027; GPA 3.90/4.00.
- University at Albany, SUNY: BS Informatics, May 2025; GPA 3.88/4.00.

## Internship

DeepBrain Technology (StaySafeNow, Inc.). Software Development Engineer Intern. May–September 2026. Tenafly, NJ, hybrid.

Both project views identify this internship and the contributions below.

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

Navigation selects one of four views: About, Chess, FOW or Research. Each project places internship context, contribution and engineering notes beside its recording on desktop; phones stack the active view. About links directly to both projects and Research. Hash links and browser history preserve navigation through [nav.js](nav.js).

Clips start paused and provide play/pause, previous/next, plain chapter links, an enlarged viewer and GIF download. Reduced-motion users navigate manually. Changing views pauses playback and closes the enlarged viewer. Playback also pauses when the document is hidden or the inline player leaves view; an enlarged clip can continue playing.

The players and GIFs use snapshots of actual execution. Frame timing is edited for readability; these are not continuous screen videos or measurements of execution time. Captions must identify the local demonstration conditions in both inline and enlarged views.

## Research

University at Albany, SUNY. August 2024–May 2025.

**Transparency and message processing in health supplement promotion on Instagram.** This is the resume's project title, not a verified NCA abstract title.

I studied how supplement-promotion posts disclose sponsorship and health credentials. I developed and validated a codebook for **417 posts** and analyzed the results in Python.

Advised by [Prof. Archana Krishnan](https://www.albany.edu/communication/faculty/archana-krishnan) and PhD candidate Alex R. Stankus.

Our co-authored extended abstract was **accepted for presentation at the [112th NCA Annual Convention](https://www.natcom.org/nca-112th-annual-convention/)**, November 2026. This status comes from the resume; the conference page is general event information. Do not change to presented/published without confirmation.

The [research listing in the adviser's CV, page 12](https://www.albany.edu/sites/default/files/resumes/Archana%20Krishnan_CV%20%28Feb%202026%29.pdf#page=12) identifies related work, “Unlabeled influence,” as a COMET submission in February 2026. It is not the NCA abstract or evidence of NCA acceptance. No exact public NCA abstract link has been verified.

## Disclosure

Publish only approved interface demonstrations, resume-disclosed technical details and data scales. Exclude private source, datasets, internal reports, extra experimental metrics, credentials, phone/address, original resume files and inaccessible private repository links. Do not add unverified user counts, latency, cost, model gains, GRU architecture or rating claims.
