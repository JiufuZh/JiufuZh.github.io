# Homepage content

This file records the public copy and facts used in `index.html`. Both featured projects are internship projects. The resume is authoritative for dates and personal claims; user clarification is authoritative for project attribution. Last reviewed: October 17, 2026.

## Introduction

**Jiufu Zhou**

I'm a master's student in Information Management at the University of Washington, based in Seattle. I expect to graduate in June 2027.

During my software engineering internship at DeepBrain Technology, I worked on a chess coaching app and a Fog of War chess agent. My work covered the web interface, inference services, and model training.

Profile links: [Email](mailto:zjfu2003@gmail.com) · [GitHub](https://github.com/JiufuZh)

## Experience

**DeepBrain Technology**

Software Development Engineer Intern · May–September 2026

StaySafeNow, Inc., Tenafly, New Jersey (hybrid)

## Chess analysis and coaching

React, FastAPI, Stockfish WASM, OpenAI API

I built a web app that takes a PGN game history and produces move analysis, explanations, and practice recommendations. Players can review a mistake, compare it with an alternative, then practice the position.

**Keeping the interface responsive.** Stockfish runs in a Web Worker. I added request cancellation and result versioning so changing positions during analysis would not leave the interface showing an old result.

**Checking the feedback.** The coaching pipeline adapts explanations to the player's rating and language. I added structured-output validation, checks against engine evidence, and fallback responses for API failures. Saved reviews can be opened without another LLM call.

Walkthrough stages: Review · Compare · Practice

Initial caption: “Local sample game. Stockfish analysis; no live LLM request.”

The media consists of genuine local interface captures with a sample game. Keep capture context in the captions, including when enlarged. Describe the media as a walkthrough, rather than a video recording.

## Fog of War chess AI

Python, PyTorch, FastAPI, JavaScript

In Fog of War chess, players cannot see the entire board. I prepared training data from **1,554 games and 88,949 plies**, using observations limited to each player's view.

**Avoiding information leakage.** I split the data by game and masked opponent histories, so the input would not reveal information the player could not know.

**Training and integration.** I trained policy-and-value models in PyTorch and worked on self-play and checkpoint resumption. A FastAPI service and JavaScript browser script connect inference to the game, keeping observations and move execution in sync.

Walkthrough stages: Dataset → Train → Self-play → Serve

**Visual label:** Illustrated workflow.

**Visual caption:** Conceptual illustration of the engineering workflow.

## Education

**University of Washington** — MS Information Management. Expected June 2027 · GPA 3.90/4.00.

**University at Albany, SUNY** — BS Informatics. May 2025 · GPA 3.88/4.00.

## Research

At the University at Albany, I studied how Instagram posts disclose sponsorship and health credentials in supplement promotion. I developed and validated a codebook for **417 posts** and analyzed the results in Python.

Our co-authored extended abstract was accepted for presentation at the **112th NCA Annual Conference in November 2026**. NCA refers to the National Communication Association.

## Publication boundaries

Use only resume-disclosed technical details and results, plus approved public UI demonstrations. Do not publish private source code, training data, internal documentation, credentials, a phone number, or the original resume file. Private project repositories must not appear as publicly accessible code links. Keep “accepted for presentation” until the presentation has occurred and is confirmed. Do not add unverified usage, latency, cost, or performance claims.
