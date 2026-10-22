window.projectRecordings = {
  "chess": [
    {
      "title": "Chess Coaching — review and explanation",
      "label": "Review & explain",
      "summary": "Import a game, find the turning point, and connect the engine result to a concrete alternative.",
      "gif": "assets/chess/chess-review.gif",
      "context": "Actual local app screenshots with a sample game, Stockfish and engine-backed coaching. No live LLM request. Captured states with edited timing.",
      "posterIndex": 3,
      "frames": [
        {
          "label": "Import",
          "src": "assets/chess/01-import.png",
          "duration": 4200,
          "alt": "PGN game import in the real Chess app",
          "caption": "Import a PGN game. The app reconstructs its board positions and move history.",
          "noteTitle": "A shared position history",
          "note": "PGN moves become a sequence of legal board states. The board, move list and review use that same sequence, so a selected move has a consistent position throughout the interface."
        },
        {
          "label": "Review",
          "src": "assets/chess/04-review.png",
          "duration": 6500,
          "alt": "Stockfish review flags 3…Nf6 as a blunder beside the evaluation curve",
          "caption": "The review flags 3…Nf6: White now has a forced mate. The move list and evaluation curve point to the same position.",
          "noteTitle": "Consistent engine evidence",
          "note": "The full-game review requires complete Stockfish results before it is marked finished. Move classifications and the evaluation curve read the same evidence, while mate remains distinct from an ordinary numerical score."
        },
        {
          "label": "Explain",
          "src": "assets/chess/05-coaching.png",
          "duration": 6500,
          "alt": "Local coaching explains why the queen on h5 can capture f7 with checkmate",
          "caption": "The explanation connects the result to the board: the queen on h5 can capture f7 with checkmate.",
          "noteTitle": "Grounded coaching with a fallback",
          "note": "Engine evidence supports the local coaching shown here. The optional LLM path adds checks for response structure and consistency with that evidence, with a local fallback when generation fails. This capture uses no live LLM response."
        },
        {
          "label": "Compare",
          "src": "assets/chess/06-alternative.png",
          "duration": 6000,
          "alt": "A preview arrow shows the Qe7 alternative from d8 to e7",
          "caption": "Preview Qe7 to inspect the candidate arrow from d8 to e7. The comparison does not change the recorded game.",
          "noteTitle": "Explore without losing your place",
          "note": "A candidate preview temporarily shows its referenced position and move arrow. Leaving the preview restores the selected game position, keeping exploration separate from the imported move history."
        }
      ]
    },
    {
      "title": "Chess Coaching — practice from a mistake",
      "label": "Practice a mistake",
      "summary": "Turn the reviewed position into an exercise, use a hint, and play the move to check the lesson.",
      "gif": "assets/chess/chess-practice.gif",
      "context": "Actual local app screenshots of a sample position turned into an exercise. Stockfish-backed practice; no live LLM request. Captured states with edited timing.",
      "posterIndex": 0,
      "frames": [
        {
          "label": "Practice",
          "src": "assets/chess/07-practice.png",
          "duration": 5000,
          "alt": "The reviewed position becomes a mate-in-one exercise with the answer hidden",
          "caption": "Train the reviewed position as a mate-in-one exercise. The answer stays hidden while you choose a move.",
          "noteTitle": "From review to an exercise",
          "note": "The trainer receives the position and a validated engine line from the review. This connects the explanation to a playable exercise without asking the learner to rebuild the board."
        },
        {
          "label": "Hint",
          "src": "assets/chess/08-hint.png",
          "duration": 6500,
          "alt": "A calculation-path hint appears while the mating answer remains hidden",
          "caption": "Ask for a hint: check forcing moves and calculate the reply. The final answer is still hidden.",
          "noteTitle": "Help before revealing the answer",
          "note": "Hints are revealed in stages. The trainer separates a hint from the full solution and records hint use with an attempt, so later progress can distinguish assisted practice from unassisted solves."
        },
        {
          "label": "Solve",
          "src": "assets/chess/09-solved.png",
          "duration": 6000,
          "alt": "The trainer accepts Qxf7# and confirms that the exercise is solved",
          "caption": "Play Qxf7#. The trainer checks the move and confirms that the exercise is solved.",
          "noteTitle": "Check moves and retain the attempt",
          "note": "Each move is checked against the exercise line. A completed attempt records its outcome, hint use and elapsed time for the local learning history; longer exercises also play the opponent’s reply before the learner continues."
        }
      ]
    }
  ],
  "fow": [
    {
      "title": "Fog of War Chess Engine — data and observations",
      "gif": "assets/fow/data-observations.gif",
      "context": "Local execution trace from a tiny synthetic fixture using the original replay, observation and history encoders. Split membership comes from the saved fixture manifest. Rendered outputs, not product UI or the historical dataset.",
      "frames": [
        {
          "label": "Replay",
          "src": "assets/fow/data-trace-01.png",
          "duration": 5000,
          "alt": "The original replay code reconstructs a synthetic opening and checks its moves against Fog of War rules. This full board is offline source data.",
          "caption": "The original replay code reconstructs a synthetic opening and checks its moves against Fog of War rules. This full board is offline source data.",
          "noteTitle": "Source data is not model input",
          "note": "The offline replay can reconstruct a full position. A separate observation step is essential: passing that full board straight into training would expose information the player cannot see."
        },
        {
          "label": "Visible input",
          "src": "assets/fow/data-trace-02.png",
          "duration": 5500,
          "alt": "The original encoder keeps White’s pieces and visible squares. Hidden opponent pieces are excluded from the input.",
          "caption": "The original encoder keeps White’s pieces and visible squares. Hidden opponent pieces are excluded from the input.",
          "noteTitle": "Enforce the visibility boundary",
          "note": "This view comes from the original observation encoder running on a synthetic example. Own pieces and visible squares remain; hidden opponents do not enter the encoded input."
        },
        {
          "label": "History & choices",
          "src": "assets/fow/data-trace-03.png",
          "duration": 6500,
          "alt": "White’s own move stays in history; Black’s move becomes a hidden token. The shown choices are a subset of the actual rule-authoritative candidates.",
          "caption": "White’s own move stays in history; Black’s move becomes a hidden token. The shown choices are a subset of the actual rule-authoritative candidates.",
          "noteTitle": "History can leak information too",
          "note": "Hiding pieces on the current board is not enough. The history encoder also masks the opponent’s move coordinates while retaining the player’s own moves."
        },
        {
          "label": "Game split",
          "src": "assets/fow/data-trace-04.png",
          "duration": 6500,
          "alt": "The saved split assigns the e-pawn fixture to training and the d-pawn fixture to validation. Each source game stays in one group.",
          "caption": "The saved split assigns the e-pawn fixture to training and the d-pawn fixture to validation. Each source game stays in one group.",
          "noteTitle": "Split by game, not by position",
          "note": "Positions from the same game share substantial context. The saved split keeps each complete source game in one group, so a game cannot appear in both training and validation."
        }
      ],
      "label": "Prepare observations",
      "posterIndex": 1,
      "summary": "Replay a sample game, remove hidden information, and keep whole games together when splitting the data."
    },
    {
      "title": "Fog of War Chess Engine — train a model",
      "gif": "assets/fow/fow-training.gif",
      "context": "Original training code, a tiny synthetic fixture, and CPU execution. A local viewer displays observed events. Captured states with edited timing; not the full internship dataset or a performance evaluation.",
      "frames": [
        {
          "label": "Start",
          "src": "assets/fow/training-01.png",
          "duration": 2500,
          "alt": "Local training viewer ready to start a small CPU run",
          "caption": "Start a fresh run with a small synthetic fixture. The viewer launches the project’s actual training code.",
          "noteTitle": "A small, reproducible run",
          "note": "This capture runs the actual training entry point on a tiny synthetic fixture. The internship dataset contained 1,554 games and 88,949 plies; it is not the data shown in this demo."
        },
        {
          "label": "Load data",
          "src": "assets/fow/training-03.png",
          "duration": 4000,
          "alt": "Running trainer has loaded the synthetic sample and separated whole games into splits",
          "caption": "PyTorch and the training code load. The sample is split by whole games before training starts.",
          "noteTitle": "Keep games together",
          "note": "Training and validation separate whole games. Neighboring positions from one game stay together instead of appearing on both sides of the split."
        },
        {
          "label": "Save",
          "src": "assets/fow/training-04.png",
          "duration": 6000,
          "alt": "Epoch one completed, checkpoint saved, and model inference verified",
          "caption": "The CPU training pass completes epoch 1 and saves a resumable checkpoint. Reloading it and running inference both succeed.",
          "noteTitle": "A checkpoint that can be used",
          "note": "After the training pass, the saved checkpoint is reloaded and inference is checked. The saved artifact is the handoff between training, resumption and serving."
        }
      ],
      "label": "Train a model",
      "posterIndex": 2,
      "summary": "The original trainer runs on a small synthetic fixture and saves a working checkpoint on CPU."
    },
    {
      "title": "Fog of War Chess Engine — resume a checkpoint",
      "gif": "assets/fow/fow-resume.gif",
      "context": "Original training code, a tiny synthetic fixture, and CPU execution. A local viewer displays observed events. Captured states with edited timing; not the full internship dataset or a performance evaluation.",
      "frames": [
        {
          "label": "Save",
          "src": "assets/fow/training-04.png",
          "duration": 4000,
          "alt": "Epoch one completed, checkpoint saved, and model inference verified",
          "caption": "The CPU training pass completes epoch 1 and saves a resumable checkpoint. Reloading it and running inference both succeed.",
          "noteTitle": "Persist the training state",
          "note": "The first process completes epoch 1 and saves the state needed to continue. A resumable training checkpoint carries more than the weights used for inference."
        },
        {
          "label": "Resume",
          "src": "assets/fow/training-06.png",
          "duration": 3000,
          "alt": "The real training process starts again after Resume saved run was clicked",
          "caption": "Resume saved run launches a second process using the checkpoint just saved.",
          "noteTitle": "Start again from a saved run",
          "note": "Resumption starts a separate training process. It reads the saved checkpoint rather than treating the resumed pass as a fresh model initialization."
        },
        {
          "label": "Continue",
          "src": "assets/fow/training-07.png",
          "duration": 7000,
          "alt": "Saved weights and optimizer restored, epoch two completed, and checkpoint verified",
          "caption": "Model weights and optimizer state are restored. Epoch 2 finishes and saves the checkpoint used by the browser demonstration.",
          "noteTitle": "Continue, then serve",
          "note": "Model weights and optimizer state are restored before epoch 2. The resulting checkpoint is the one used in the browser integration walkthrough."
        }
      ],
      "label": "Resume a checkpoint",
      "posterIndex": 2,
      "summary": "A second process restores model weights and optimizer state, then continues to the next epoch."
    },
    {
      "title": "Fog of War Chess Engine — self-play mechanics",
      "gif": "assets/fow/self-play.gif",
      "context": "Actual capped CPU self-play using the synthetic-fixture checkpoint. Boards are reconstructed from saved rollout moves and encoded as White’s view. Rendered execution trace, not product UI, an online match or a strength benchmark.",
      "frames": [
        {
          "label": "Turn 1",
          "src": "assets/fow/selfplay-trace-01.png",
          "duration": 4500,
          "alt": "Actual self-play, after recorded turn 1. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "caption": "Actual self-play, after recorded turn 1. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "noteTitle": "Start from a trained checkpoint",
          "note": "The original self-play code loads a fixture-trained model and selects moves under the Fog of War rules. This short run checks the training loop’s mechanics."
        },
        {
          "label": "Turn 2",
          "src": "assets/fow/selfplay-trace-02.png",
          "duration": 4500,
          "alt": "Actual self-play, after recorded turn 2. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "caption": "Actual self-play, after recorded turn 2. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "noteTitle": "Visibility changes with each turn",
          "note": "The displayed board is reconstructed from actual saved moves, then encoded from White’s perspective. An enemy piece appears only when the current observation makes it visible."
        },
        {
          "label": "Turn 3",
          "src": "assets/fow/selfplay-trace-03.png",
          "duration": 4500,
          "alt": "Actual self-play, after recorded turn 3. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "caption": "Actual self-play, after recorded turn 3. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "noteTitle": "Keep the same input rules",
          "note": "Self-play uses the project’s observation and history encoding. The visible history retains White’s moves and masks Black’s private move coordinates."
        },
        {
          "label": "Turn 4",
          "src": "assets/fow/selfplay-trace-04.png",
          "duration": 5500,
          "alt": "Actual self-play, after recorded turn 4. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "caption": "Actual self-play, after recorded turn 4. The board is reconstructed from the saved move trace and re-encoded as White’s visible input.",
          "noteTitle": "Bound the demonstration",
          "note": "This rollout ends at an explicit move cap. It shows the interaction between model decisions and changing observations; it does not represent a completed competitive match."
        },
        {
          "label": "Update & save",
          "src": "assets/fow/selfplay-trace-05.png",
          "duration": 6500,
          "alt": "The actual self-play run changed model weights and saved optimizer state. The updated checkpoint reloads successfully; no model was promoted and no playing-strength claim is made.",
          "caption": "The actual self-play run changed model weights and saved optimizer state. The updated checkpoint reloads successfully; no model was promoted and no playing-strength claim is made.",
          "noteTitle": "Verify the update artifact",
          "note": "The run changes model weights, saves optimizer state, and produces a checkpoint that reloads successfully. These are execution checks, not evidence of improved playing strength."
        }
      ],
      "label": "Run self-play",
      "posterIndex": 3,
      "summary": "A real capped CPU rollout, rendered from saved moves, followed by a model update and checkpoint checks."
    },
    {
      "title": "Fog of War Chess Engine — browser integration",
      "gif": "assets/fow/browser.gif",
      "context": "Original browser script and inference service on a local test board, using the checkpoint from the resumed training run. Captured states with edited timing; not an online match or strength benchmark.",
      "frames": [
        {
          "label": "Read the board",
          "src": "assets/fow/browser-01.png",
          "duration": 4000,
          "alt": "Original FOW browser bridge beside a local board with hidden opponent pieces",
          "caption": "The script reads White’s visible pieces. The local test board supplies the legal candidate moves.",
          "noteTitle": "Read only what is visible",
          "note": "The browser bridge builds an observation from the visible board. The local adapter supplies the candidate moves; the hidden board is not sent to the model."
        },
        {
          "label": "Connect",
          "src": "assets/fow/browser-02.png",
          "duration": 4000,
          "alt": "Browser bridge confirms the actual local model service is ready",
          "caption": "Check backend confirms that the inference service has loaded the checkpoint produced in the resume walkthrough.",
          "noteTitle": "Connect training to inference",
          "note": "The FastAPI service loads the checkpoint produced by the resumed CPU run. The browser uses that same model through the original integration script."
        },
        {
          "label": "Make a move",
          "src": "assets/fow/browser-03.png",
          "duration": 5500,
          "alt": "Original browser script has moved the white pawn from e2 to e4",
          "caption": "Move once requests a model decision. The returned move is e2→e4; the script clicks both squares and the board verifies and applies it.",
          "noteTitle": "Close the loop with the board",
          "note": "The prediction becomes two actual square clicks. The test board checks that the move matches the service decision and a legal candidate before applying it."
        },
        {
          "label": "Read it back",
          "src": "assets/fow/browser-04.png",
          "duration": 5000,
          "alt": "Refreshed browser bridge shows the pawn on e4 in its observed position",
          "caption": "Refresh position reads the updated board. The bridge’s own view now shows the pawn on e4.",
          "noteTitle": "Observe the resulting position",
          "note": "Reading the board again confirms the applied move in the bridge’s own observation. This demonstration covers one decision, not an autonomous online match."
        }
      ],
      "label": "Play in the browser",
      "posterIndex": 2,
      "summary": "The original userscript reads a local test board, requests a real prediction, and clicks the returned move."
    }
  ]
};
