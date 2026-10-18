# Homepage content

This is the authority for public facts and wording in [index.html](index.html). Last reviewed: October 17, 2026. The resume establishes personal facts; the user's clarification establishes both projects as internship work.

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

A web app that turns a game history into move analysis, explanations, and targeted practice. Review a mistake, compare a better move, then try the position again.

**A responsive analysis interface.** I ran Stockfish in a Web Worker and added request cancellation and result versioning, so changing positions would not leave an old result on screen.

**Feedback grounded in the game.** I added structured-output validation, checks against engine evidence, and fallbacks for API failures. Explanations adapt to the player's rating and language; saved reviews reopen without another LLM call.

Preview: real app capture showing the engine-backed Qe7 alternative. Walkthrough: Import, Review, Coaching, Compare, Practice, Solved. The three direct stage controls are Review, Compare, Practice. The pausable sequence uses genuine local screenshots and a sample game. Every enlarged/inline stage retains “Local app capture; no live LLM request.” This is a screenshot walkthrough, not a recording of live model requests.

## Fog of War chess AI

Python, PyTorch, FastAPI, JavaScript.

An agent for chess with incomplete information. I prepared player-visible observations from **1,554 games and 88,949 plies**, then worked on model training, self-play, and browser integration.

**Keeping hidden information hidden.** I split data by game and masked opponent histories, so the model's input would not reveal information the player could not know.

**Training through deployment.** I trained policy-and-value models in PyTorch and worked on self-play and checkpoint resumption. A FastAPI service and JavaScript browser script keep observations, inference, and move execution in sync.

Preview: original vector schematic of a partially visible board and Dataset/Train/Serve. Expanded illustration has Dataset, Train, Self-play, Serve stages. Keep “Illustrated workflow” visible. This is neither a training recording nor a model-performance benchmark. “Browser script” does not mean LLM-generated scripts.

## Research

University at Albany, SUNY. August 2024–May 2025.

**Sponsorship and health credentials on Instagram.** This is a descriptive heading, not a claimed publication title.

I studied how supplement-promotion posts disclose sponsorship and health credentials. I developed and validated a codebook for **417 posts** and analyzed the results in Python.

Our co-authored extended abstract was **accepted for presentation at the 112th NCA Annual Conference**, November 2026. NCA is the National Communication Association. Do not change to presented/published without new confirmation.

## Disclosure

Publish only approved interface demonstrations, resume-disclosed technical details and data scales. Exclude private source, datasets, internal reports, extra experimental metrics, credentials, phone/address, original resume files and inaccessible private repository links. Do not add unverified user counts, latency, cost, model gains, GRU architecture or rating claims.
