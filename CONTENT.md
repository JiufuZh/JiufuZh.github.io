# Homepage content

This file is the source of truth for public biographical copy, project attribution, dates, and selected resume-disclosed results. Both featured projects are internship projects. Last reviewed: October 17, 2026.

## Introduction

**Jiufu Zhou**

**Software engineering · Applied AI**

**Intelligent systems. Thoughtful software.**

I'm Jiufu, a software engineer and master's student at the University of Washington. I build across the full AI stack—from training data and models to reliable services and the interfaces people use.

Seattle, WA · MS Information Management, expected June 2027

Primary links: [Selected work](#work) · [Email](mailto:zjfu2003@gmail.com) · [GitHub profile](https://github.com/JiufuZh)

## Internship

**DeepBrain Technology (StaySafeNow, Inc.)**

Software Development Engineer Intern · May–September 2026 · Hybrid, Tenafly, NJ

I worked across two chess AI systems: a coaching product that explains decisions, and an agent that learns to act with incomplete information. My work spanned data preparation, model training, inference services, and user-facing workflows.

## 01 · Chess, explained

**Turn a game history into feedback a player can actually use.**

I designed, built, and deployed a full-stack chess coaching platform that turns PGN game histories into Stockfish-backed move analysis, personalized explanations, and targeted practice.

**The engineering challenge**

An explanation needs to agree with the position. A responsive interface also needs to handle long-running analysis and changing user input.

**What I built**

- An LLM coaching pipeline with bilingual explanations adapted to the player's rating, structured-output validation, engine-grounded consistency checks, and deterministic fallbacks when API calls fail.
- Browser-side Stockfish analysis in Web Workers, with request cancellation and result versioning to prevent stale updates.
- Saved reviews that can be revisited without additional LLM calls, plus personalized puzzle recommendations and spaced-repetition schedules.

**Workflow labels:** Game history → Engine analysis → Validated explanation → Targeted practice

**Stack:** React · Python · FastAPI · Stockfish WASM · OpenAI API · Railway

**Demo caption:** Actual interface captured locally with a sample game. No live LLM request.

Use this caption only for a genuine local interface capture. Illustrative or fixture-based states must be labeled as such. Describe the existing media as an app walkthrough, rather than a video recording.

## 02 · Learning through the fog

**An AI agent that has to decide without seeing the whole board.**

I built a training and inference pipeline for Fog of War chess, where an agent must choose moves without access to the full board.

**The engineering challenge**

Hidden information changes both the model and its evaluation. Training observations must preserve the player's limited view, and histories must not reveal information the player could not know.

**What I built**

- A pipeline processing **1,554 games and 88,949 plies** into player-visible observations and supervised targets, with game-level splits and masked opponent histories to guard against information leakage.
- A PyTorch policy-and-value model that combines board observations and move-history representations for decisions under uncertainty.
- Supervised and search-guided self-play training using recorded moves, search visit distributions, and terminal outcomes. I used updated models in self-play and tested checkpoint-resumption consistency.
- FastAPI inference and a JavaScript browser bridge that synchronize observations and move execution with live game state.

**Walkthrough labels:** Dataset → Train → Self-play → Serve

**Stack:** Python · PyTorch · FastAPI · JavaScript

**Visual label:** Illustrated workflow.

**Visual caption:** Conceptual illustration of the engineering workflow.

## Education

**University of Washington** — MS in Information Management, expected June 2027. GPA: 3.90/4.00. Coursework includes Machine Learning and Building and Applying LLMs.

**University at Albany, SUNY** — BS in Informatics, May 2025. GPA: 3.88/4.00.

## Research

**Transparency in health supplement promotion on Instagram**

Researcher · August 2024–May 2025

I developed and validated a content-analysis codebook for **417 posts**, achieved **0.95–1.00 intercoder reliability**, and conducted exploratory and statistical analysis in Python. A co-authored extended abstract was **accepted for presentation at the 112th National Communication Association Annual Conference**, New Orleans, November 2026.

## Publication boundaries

Use only resume-disclosed technical details and results, plus approved public UI demonstrations. Do not publish private source code, training data, internal documentation, credentials, a phone number, or the original resume file. Private project repositories must not appear as publicly accessible code links. Keep “accepted for presentation” until the presentation has occurred and is confirmed. Do not add unverified usage, latency, cost, or performance claims.
