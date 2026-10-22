# Homepage content

Public facts and wording for [index.html](index.html), reviewed October 21, 2026. Sources: the resume and user clarifications on internship attribution, research methods and findings.

## Profile and introduction

Jiufu Zhou. MS Information Management, University of Washington. Seattle, Washington. [Email](mailto:zjfu2003@gmail.com), [GitHub](https://github.com/JiufuZh).

I'm Jiufu, a master's student in Information Management at the University of Washington. During my internship at DeepBrain Technology, I worked on a chess coaching app and a Fog of War chess agent.

My work covered React interfaces and Stockfish analysis, as well as PyTorch training and the browser script that uses model predictions. Earlier, I studied Informatics at the University at Albany, where I developed a codebook and analyzed 417 Instagram posts for a study of health supplement promotion.

Technical focus: web applications, applied machine learning, and AI-assisted learning tools.

## Education

- University of Washington: MS Information Management, expected June 2027; GPA 3.90/4.00.
- University at Albany, SUNY: BS Informatics, May 2025; GPA 3.88/4.00.

## Internship

DeepBrain Technology (StaySafeNow, Inc.). Software Development Engineer Intern. May–September 2026. Tenafly, NJ, hybrid.

## Chess Coaching

React, FastAPI, Stockfish WASM, OpenAI API.

I built the interface and feedback features for a chess coaching app. Players can review a mistake with Stockfish, compare an alternative move, and practice the same position.

When players change positions, engine responses can arrive out of order. I ran Stockfish in a Web Worker and added request cancellation and result versioning to prevent an old response from overwriting the current analysis.

I validated LLM output against the expected structure and engine evidence, and added fallbacks for API failures. Saved reviews reopen without another LLM call.

Six chapters—Import, Review, Explain, Compare, Practice, Solve—use actual local screenshots: sample PGN, critical 3…Nf6, engine-backed coaching, Qe7 arrow and Qxf7# practice. The alternative is an overlay, not a played move. No live LLM request was made; preserve this context inline and enlarged.

## Fog of War Chess Engine

Python, PyTorch, FastAPI, JavaScript.

I worked on a chess agent that can see only part of the board. I prepared observations from **1,554 games and 88,949 plies**, trained policy-and-value models, and connected inference to a browser script.

Hidden information had to stay out of the model's input. I built observations from the player's view and masked opponent move histories. I also split the data by complete games, keeping positions from the same game together.

I worked on self-play updates and checkpoint resumption, and connected the model to a FastAPI service and JavaScript browser bridge.

Two selectable clips show fresh local execution:

- **Training run:** the original trainer runs on CPU with a tiny synthetic fixture. A new local viewer displays actual training, checkpoint-save and resume events.
- **Browser integration:** the original userscript connects a new permitted local test board to real FastAPI inference with the demonstration checkpoint, requesting and applying a model-selected move.

These demonstrations are separate from historical training. Dataset counts describe the internship archive, not the tiny fixture. The clips establish neither strength, production deployment nor full-dataset performance. “Browser script” means the integration userscript, not LLM-generated code.

## Media and presentation

Navigation is About / Projects / Research, with Chess Coaching / Fog of War Chess Engine under Projects. One project is shown; `#projects` defaults to Chess Coaching. Preserve `#chess-analysis`, `#fog-of-war` and browser history. Desktop projects pair text and recordings; widths up to 1000px stack introduction, media, then notes.

Clips start paused, with chapters, step counts, enlargement and GIF downloads. See [README.md](README.md) for playback, accessibility, loading and retry behavior.

Snapshots and GIFs use edited timing, not continuous video or execution-time measurements. Keep local demonstration conditions visible inline and enlarged.

## Research

Order: Instagram health-promotion study first; struvite research second. Keep their records independent.

### Health supplement promotion

University at Albany, SUNY. August 2024–May 2025.

**Transparency and message processing in health supplement promotion on Instagram.** This is the resume's project title, not a verified NCA abstract title.

I developed and validated a codebook for **417 branded health-supplement Instagram posts**, covering sponsorship disclosure, influencer type, product category and Elaboration Likelihood Model (ELM) message-processing routes.

In a multi-stage content analysis, intercoder reliability ranged from **0.95–1.00**. The sample showed missing sponsorship labels and heavy use of peripheral-route persuasion among influencers.

I used statistical analysis and Python to explore associations among influencer characteristics, disclosure transparency and message-processing strategies.

These user-supplied findings are approved public facts. Do not infer the reliability coefficient type, statistical significance or causality.

Advised by [Prof. Archana Krishnan](https://www.albany.edu/communication/faculty/archana-krishnan) and PhD candidate Alex R. Stankus.

An extended abstract I co-authored was **accepted for presentation at the [112th NCA Annual Convention](https://www.natcom.org/nca-112th-annual-convention/)**, November 2026. This status comes from the resume; the conference page is general event information. Do not change to presented/published without confirmation.

The [adviser's February 2026 CV, page 12](https://www.albany.edu/sites/default/files/resumes/Archana%20Krishnan_CV%20%28Feb%202026%29.pdf#page=12) lists related work, “Unlabeled influence,” as a COMET submission, not evidence of NCA acceptance. No exact public NCA abstract link is verified.

### Struvite nutrient release

**Wastewater-derived struvite for sustainable agriculture: characterization and controls on nutrient release.** User-supplied project title.

University at Albany ESE Research Lab, Albany, NY. Research Aide, February–May 2025. Advised by [Prof. Rixiang Huang](https://www.albany.edu/environmental-sustainable-engineering/faculty/rixiang-huang) and PhD candidate Shyrill F. Mariano.

I tested dissolution of three struvite types in organic acids and deionized water over 24 hours, using ICP measurements and recording pH at seven time points. I also conducted soil-column experiments simulating environmental conditions and used ICP measurements to track dissolution. I cleaned and processed ICP and pH data and visualized relationships between test conditions and dissolution.

These facts come from the user's research description. Keep this entry independent of the health-promotion study; no resulting publication or authorship is verified.

## Disclosure

Publish approved demonstrations, resume-disclosed facts and explicitly supplied research details. Exclude private source, datasets, reports, extra metrics, credentials, phone/address, original resume files and private repository links. Do not add unverified user counts, latency, cost, model gains, GRU architecture or rating claims.
