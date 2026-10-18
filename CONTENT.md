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

I worked on the analysis interface and feedback pipeline for a chess coaching app. It connects Stockfish reviews to explanations, candidate moves, and practice on the same position.

**A responsive analysis interface.** I ran Stockfish in a Web Worker and added request cancellation and result versioning, so changing positions would not leave an old result on screen.

**Feedback grounded in the game.** I added structured-output validation, checks against engine evidence, and fallbacks for API failures. Explanations adapt to the player's rating and language; saved reviews reopen without another LLM call.

Visible six-step walkthrough: Import PGN → Find a critical move → Read a grounded explanation → Compare the alternative → Practice the position → Confirm the solution. The sample game reaches 3…Nf6; the engine-backed alternative is Qe7, and practice ends with Qxf7#. Each step has an actual local screenshot and a short input/action/output explanation. Optional playback and a downloadable GIF use the same real captures. Keep the local-engine/no-live-LLM context visible. This is a screenshot walkthrough, not a recording of live model requests.

## Fog of War chess AI

Python, PyTorch, FastAPI, JavaScript.

I prepared training data and trained policy-and-value models for chess with a partially visible board. My work also covered self-play, resumable training, and browser integration. The first walkthrough step shows the approved scale: **1,554 games and 88,949 plies**.

**Keeping hidden information hidden.** I split data by game and masked opponent histories, so the model's input would not reveal information the player could not know.

**Training through deployment.** I trained policy-and-value models in PyTorch and worked on self-play and checkpoint resumption. A FastAPI service and JavaScript browser script keep observations, inference, and move execution in sync.

Visible six-step illustration: Replay games → Mask hidden information → Build examples and split by game → Train policy and value → Self-play and checkpoints → Serve through a browser bridge. Within each stage, example boards, samples or data flow change to show the transformation. The final step shows a browser script sending observations to local inference and applying a returned move. Keep “Illustrated workflow” and the example-position context visible. This is neither a training recording nor a model-performance benchmark. Data-processing scripts and the browser userscript do not imply LLM-generated scripts.

## Research

University at Albany, SUNY. August 2024–May 2025.

**Sponsorship and health credentials on Instagram.** This is a descriptive heading, not a claimed publication title.

I studied how supplement-promotion posts disclose sponsorship and health credentials. I developed and validated a codebook for **417 posts** and analyzed the results in Python.

Our co-authored extended abstract was **accepted for presentation at the 112th NCA Annual Conference**, November 2026. NCA is the National Communication Association. Do not change to presented/published without new confirmation.

## Disclosure

Publish only approved interface demonstrations, resume-disclosed technical details and data scales. Exclude private source, datasets, internal reports, extra experimental metrics, credentials, phone/address, original resume files and inaccessible private repository links. Do not add unverified user counts, latency, cost, model gains, GRU architecture or rating claims.
