(function () {
  'use strict';

  let instanceCount = 0;
  const STEPS = [
    {
      name: 'Replay games', note: 'Game records become positions.',
      title: 'Replay a game one move at a time',
      description: 'I prepared training data from 1,554 recorded games and 88,949 plies. Replaying each move reconstructs the position before the next decision.',
      input: 'Recorded game histories', action: 'Replay moves in sequence', output: 'Positions paired with the move that followed',
      phases: ['Start with a recorded game', 'Replay White’s first move', 'Replay the opponent’s reply', 'Capture the next decision']
    },
    {
      name: 'Mask the view', note: 'Separate the record from the input.',
      title: 'Keep only what the player can observe',
      description: 'The game record contains both sides of the board. The model input uses the player’s visible position, and opponent moves are replaced with hidden-history tokens.',
      input: 'A replayed position and its history', action: 'Keep visible information; mask opponent moves', output: 'A player-view board and masked history',
      phases: ['The record contains the full position', 'Hide squares outside the player’s view', 'Mask the opponent’s move history', 'Keep the same information boundary at inference']
    },
    {
      name: 'Build examples', note: 'Keep each game in one split.',
      title: 'Build examples without mixing a game across splits',
      description: 'Each decision becomes a training example. I split the data by complete game, keeping positions from the same game together during training and evaluation.',
      input: 'Player-view positions and game records', action: 'Pair inputs with targets; group by game', output: 'Separate training, validation, and test examples',
      phases: ['Pair an observation with its recorded move', 'Group examples by their source game', 'Assign complete games to separate splits', 'Keep every example from a game together']
    },
    {
      name: 'Train the model', note: 'Learn a policy and a value estimate.',
      title: 'Connect board observations with move history',
      description: 'I trained policy-and-value models in PyTorch. The policy learns which move to choose; the value model learns from game outcomes.',
      input: 'Visible board, masked history, recorded targets', action: 'Predict, compare with targets, and update', output: 'A trained policy-and-value model',
      phases: ['Read the board and masked history', 'Produce policy and value outputs', 'Compare outputs with recorded targets', 'Use the training signal to update the model']
    },
    {
      name: 'Self-play & save', note: 'Generate games and resume training.',
      title: 'Use self-play and save resumable checkpoints',
      description: 'I worked on self-play updates and checkpoint resumption. Generated game trajectories feed further learning, while saved training state allows a run to continue.',
      input: 'A policy-and-value model', action: 'Generate play, update the model, save state', output: 'A checkpoint that can resume training',
      phases: ['Start self-play from the model', 'Collect a sequence of decisions', 'Use game outcomes and save training state', 'Resume training from the saved checkpoint']
    },
    {
      name: 'Serve & automate', note: 'Connect inference to the browser.',
      title: 'Return a move to the browser',
      description: 'A JavaScript browser bridge sends the player’s view to a FastAPI inference service. The script receives a suggested move and keeps the board and observations in sync.',
      input: 'Current player view and loaded model', action: 'Request inference; return and execute a move', output: 'An updated board and the next observation',
      phases: ['Load the model and observe the test board', 'Send the player view to local inference', 'Return a suggested move to the script', 'Execute the move and refresh the observation']
    }
  ];

  const MOVES = [
    { from: 'e2', to: 'e4', label: 'e2 → e4', side: 'White' },
    { from: 'e7', to: 'e5', label: 'e7 → e5', side: 'Black' },
    { from: 'g1', to: 'f3', label: 'g1 → f3', side: 'White' }
  ];
  const GLYPHS = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' };

  function position(ply) {
    const result = {};
    'abcdefgh'.split('').forEach(function (file, i) {
      result[file + '1'] = 'RNBQKBNR'[i];
      result[file + '2'] = 'P';
      result[file + '7'] = 'p';
      result[file + '8'] = 'rnbqkbnr'[i];
    });
    MOVES.slice(0, ply).forEach(function (move) {
      result[move.to] = result[move.from];
      delete result[move.from];
    });
    return result;
  }

  // Visibility for these illustrative opening positions, using ordinary
  // piece geometry. This is a visual explanation, not a game engine.
  function visibleSquares(board, white) {
    const visible = new Set();
    const own = function (piece) { return !!piece && ((piece === piece.toUpperCase()) === white); };
    const square = function (x, y) { return x >= 0 && x < 8 && y >= 1 && y <= 8 ? 'abcdefgh'[x] + y : null; };
    Object.keys(board).forEach(function (from) {
      const piece = board[from];
      if (!own(piece)) return;
      visible.add(from);
      const x = from.charCodeAt(0) - 97;
      const y = Number(from[1]);
      const step = function (dx, dy) {
        const to = square(x + dx, y + dy);
        if (to && !own(board[to])) visible.add(to);
      };
      const ray = function (dx, dy) {
        for (let n = 1; n < 8; n += 1) {
          const to = square(x + dx * n, y + dy * n);
          if (!to || own(board[to])) break;
          visible.add(to);
          if (board[to]) break;
        }
      };
      if (piece.toLowerCase() === 'p') {
        const direction = white ? 1 : -1;
        const to = square(x, y + direction);
        if (to && !board[to]) {
          visible.add(to);
          const two = square(x, y + direction * 2);
          if (y === (white ? 2 : 7) && two && !board[two]) visible.add(two);
        }
        [-1, 1].forEach(function (dx) {
          const capture = square(x + dx, y + direction);
          if (capture && board[capture] && !own(board[capture])) visible.add(capture);
        });
      } else if (piece.toLowerCase() === 'n') {
        [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]].forEach(function (d) { step(d[0], d[1]); });
      } else if (piece.toLowerCase() === 'k') {
        [-1, 0, 1].forEach(function (dx) { [-1, 0, 1].forEach(function (dy) { if (dx || dy) step(dx, dy); }); });
      } else {
        const diagonals = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        const straights = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const directions = piece.toLowerCase() === 'b' ? diagonals : piece.toLowerCase() === 'r' ? straights : diagonals.concat(straights);
        directions.forEach(function (d) { ray(d[0], d[1]); });
      }
    });
    return visible;
  }

  function boardSVG(ply, masked, highlight, label, white) {
    white = white !== false;
    const state = position(ply);
    const visible = visibleSquares(state, white);
    let cells = '';
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const square = 'abcdefgh'[col] + (8 - row);
        const x = 24 + col * 34;
        const y = 10 + row * 34;
        const hidden = masked && !visible.has(square);
        const fill = hidden ? ((row + col) % 2 ? '#2f4953' : '#3a5660') : ((row + col) % 2 ? '#b9ccd5' : '#edf2f3');
        cells += '<rect x="' + x + '" y="' + y + '" width="34" height="34" fill="' + fill + '"/>';
        if (!hidden && highlight && (highlight.from === square || highlight.to === square)) {
          cells += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="32" height="32" fill="#efc66b" fill-opacity=".6" stroke="#a76c17" stroke-width="1.5"/>';
        }
        const piece = state[square];
        if (piece && !hidden) {
          const isWhite = piece === piece.toUpperCase();
          cells += '<text x="' + (x + 17) + '" y="' + (y + 27) + '" text-anchor="middle" font-family="Segoe UI Symbol,DejaVu Sans,serif" font-size="29" fill="' + (isWhite ? '#fff' : '#243344') + '" stroke="' + (isWhite ? '#243344' : '#edf2f3') + '" stroke-width="' + (isWhite ? '.8' : '.35') + '" paint-order="stroke fill">' + GLYPHS[piece.toLowerCase()] + '</text>';
        }
        if (hidden) cells += '<circle cx="' + (x + 17) + '" cy="' + (y + 17) + '" r="1.2" fill="#9ab2bb" opacity=".28"/>';
      }
    }
    let coordinates = '';
    for (let i = 0; i < 8; i += 1) {
      coordinates += '<text x="' + (41 + i * 34) + '" y="300" text-anchor="middle">' + 'abcdefgh'[i] + '</text><text x="12" y="' + (32 + i * 34) + '" text-anchor="middle">' + (8 - i) + '</text>';
    }
    return '<svg class="fow-board" viewBox="0 0 312 312" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + cells + '<g fill="#5c6877" font-family="Arial,sans-serif" font-size="12">' + coordinates + '</g></svg>';
  }

  function boardFigure(title, ply, masked, highlight, subtitle, white) {
    return '<figure class="fow-board-figure"><figcaption>' + title + '</figcaption>' + boardSVG(ply, masked, highlight, title + ': illustrative chess position', white) + '<p class="fow-board-note">' + subtitle + '</p></figure>';
  }

  function token(text, hidden, active) {
    return '<span class="fow-token' + (hidden ? ' is-hidden' : '') + (active ? ' is-active' : '') + '">' + text + '</span>';
  }

  function history(masked, active) {
    return '<div class="fow-token-line">' + token('start', false, active === 0) + token('e2 → e4', false, active === 1) + token(masked ? 'hidden' : 'e7 → e5', masked, active === 2) + token('g1 → f3', false, active === 3) + '</div>';
  }

  function flowItem(label, detail, active) {
    return '<div class="fow-flow-item' + (active ? ' is-active' : '') + '"><strong>' + label + '</strong><span>' + detail + '</span></div>';
  }

  function replayScene(frame) {
    return '<div class="fow-scene fow-scene--replay"><div class="fow-records"><h5>Recorded games</h5><p class="fow-scale"><strong>1,554 games</strong><span>88,949 plies</span></p><div class="fow-record-file"><span class="fow-file-label">Example move sequence</span>' + MOVES.map(function (move, i) {
      return '<div class="fow-move-row' + (frame === i + 1 ? ' is-active' : '') + (frame > i ? ' is-read' : '') + '"><span>' + move.side + '</span><strong>' + move.label + '</strong><span class="fow-move-state">' + (frame > i ? 'replayed' : 'queued') + '</span></div>';
    }).join('') + '</div><p class="fow-scene-note">The board advances with the highlighted move.</p></div>' + boardFigure('Reconstructed position', frame, false, frame ? MOVES[frame - 1] : null, frame ? 'After ' + MOVES[frame - 1].label : 'Before the first move') + '</div>';
  }

  function maskScene(frame) {
    return '<div class="fow-scene fow-scene--mask">' + boardFigure('Recorded position', 3, false, null, 'Available during offline replay') + boardFigure('Model input', 3, frame >= 1, null, frame >= 1 ? 'White’s visible squares; other squares stay hidden' : 'Next: remove hidden information') + '<div class="fow-history-strip"><h5>White’s move history</h5>' + history(frame >= 2, frame === 2 ? 2 : -1) + '<p>' + (frame >= 2 ? 'The opponent’s move becomes a hidden token.' : 'Recorded history before masking.') + '</p></div></div>';
  }

  function splitScene(frame) {
    const groups = [{ letter: 'A', split: 'Train', tone: 'a' }, { letter: 'B', split: 'Validation', tone: 'b' }, { letter: 'C', split: 'Test', tone: 'c' }];
    return '<div class="fow-scene fow-scene--split"><div class="fow-example"><h5>One decision example</h5><div class="fow-example-board">' + boardSVG(2, true, null, 'Player-visible example before the next White move') + '</div><dl><div><dt>Observation</dt><dd>Visible board</dd></div><div><dt>History</dt><dd>e2 → e4 · hidden</dd></div><div><dt>Target</dt><dd>Recorded move: g1 → f3</dd></div></dl></div><div class="fow-split-panel"><h5>' + (frame < 2 ? 'Group by source game' : 'Split by complete game') + '</h5><div class="fow-game-groups">' + groups.map(function (group, i) {
      return '<div class="fow-game-group fow-group-' + group.tone + (frame >= 2 ? ' is-assigned' : '') + (frame === 1 && i === 0 ? ' is-active' : '') + '"><div class="fow-group-name">Game ' + group.letter + '</div><div class="fow-example-chips"><span>Position</span><span>Position</span><span>Position</span></div><strong class="fow-split-destination">' + (frame >= 2 ? group.split : 'kept together') + '</strong></div>';
    }).join('') + '</div><p class="fow-scene-note">' + (frame === 3 ? 'Every example from the same game stays in one split.' : 'Illustrative groups; no split sizes are shown.') + '</p></div></div>';
  }

  function trainScene(frame) {
    return '<div class="fow-scene fow-scene--train"><div class="fow-training-inputs"><h5>Inputs</h5><div class="fow-mini-board">' + boardSVG(2, true, null, 'Visible board passed to the training model') + '</div><span class="fow-mini-label">Visible board</span><div class="fow-token-line">' + token('e2 → e4', false, frame === 0) + token('hidden', true, frame === 0) + '</div><span class="fow-mini-label">Masked history</span></div><div class="fow-training-center"><span class="fow-flow-arrow" aria-hidden="true">→</span><div class="fow-model-block' + (frame === 0 || frame === 3 ? ' is-active' : '') + '"><span>PyTorch</span><strong>Policy + value model</strong><div class="fow-model-nodes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><small>' + (frame === 3 ? 'Model updated' : 'Board + history') + '</small></div><div class="fow-update-path' + (frame >= 2 ? ' is-active' : '') + '"><span aria-hidden="true">↶</span> Training signal</div></div><div class="fow-training-outputs"><h5>Outputs</h5>' + flowItem('Policy', frame >= 1 ? 'Candidate move choices' : 'Which move to choose', frame === 1) + '<div class="fow-candidate-moves' + (frame >= 1 ? ' is-visible' : '') + '">' + token('g1 → f3', false, frame >= 2) + token('d2 → d4', false, false) + '</div>' + flowItem('Value', 'Game outcome estimate', frame === 1) + '<div class="fow-targets' + (frame >= 2 ? ' is-visible' : '') + '"><strong>Recorded targets</strong><span>Played move + game outcome</span></div></div><p class="fow-scene-note fow-training-disclosure">Example outputs illustrate the learning process. No measured scores or training curves are shown.</p></div>';
  }

  function selfPlayScene(frame) {
    const ply = frame === 0 ? 0 : 3;
    const visual = frame < 2
      ? boardFigure(frame === 0 ? 'Self-play starts' : 'A generated game excerpt', ply, true, frame === 1 ? MOVES[2] : null, frame === 0 ? 'Each side acts from its own view' : 'Decisions accumulate into a trajectory')
      : '<div class="fow-checkpoint-visual"><div class="fow-checkpoint-icon" aria-hidden="true"><span></span><span></span><span></span></div><h5>' + (frame === 2 ? 'Checkpoint saved' : 'Checkpoint restored') + '</h5><div class="fow-checkpoint-fields"><span>Model weights</span><span>Training state</span></div><p>' + (frame === 2 ? 'Keep the state needed to continue.' : 'Continue training from the saved state.') + '</p></div>';
    return '<div class="fow-scene fow-scene--selfplay">' + visual + '<div class="fow-selfplay-flow"><h5>Learning and continuity</h5>' + flowItem('Play', 'Model decisions produce game trajectories', frame === 0 || frame === 1) + '<span class="fow-vertical-arrow" aria-hidden="true">↓</span>' + flowItem('Update', 'Game outcomes inform policy and value updates', frame === 2) + '<span class="fow-vertical-arrow" aria-hidden="true">↓</span>' + flowItem('Save / resume', 'Restore a checkpoint to continue training', frame >= 2) + '<div class="fow-resume-line' + (frame === 3 ? ' is-active' : '') + '"><span aria-hidden="true">↶</span> Resume model training</div></div></div>';
  }

  function serveScene(frame) {
    return '<div class="fow-scene fow-scene--serve"><div class="fow-browser"><div class="fow-browser-bar"><span class="fow-browser-dot" aria-hidden="true"></span>Permitted test board</div>' + boardSVG(frame === 3 ? 3 : 2, true, frame >= 2 ? MOVES[2] : null, frame === 3 ? 'Browser board after the illustrative knight move' : 'Browser player view before the illustrative knight move') + '<p class="fow-board-note">' + (frame === 3 ? 'Knight moved; observation refreshed' : frame === 2 ? 'Suggested move: g1 → f3' : 'Current player-visible position') + '</p></div><div class="fow-bridge-flow"><div class="fow-checkpoint-tag"><span aria-hidden="true">✓</span> Trained checkpoint loaded</div>' + flowItem('Browser script', frame === 0 ? 'Observe the current board' : frame === 3 ? 'Execute move and observe again' : 'Send player-view information', frame === 0 || frame === 3) + '<div class="fow-request' + (frame === 1 ? ' is-active' : '') + '"><span class="fow-vertical-arrow" aria-hidden="true">↓</span><div><strong>Inference request</strong><span>Visible squares · own moves · candidate moves</span></div></div>' + flowItem('FastAPI service', 'Run local model inference', frame === 1) + '<div class="fow-response' + (frame >= 2 ? ' is-active' : '') + '"><span aria-hidden="true">↶</span><div><strong>' + (frame >= 2 ? 'g1 → f3' : 'Suggested move') + '</strong><span>' + (frame >= 2 ? 'Return the move to the browser script' : 'Awaiting the illustrated response') + '</span></div></div></div></div>';
  }

  const SCENES = [replayScene, maskScene, splitScene, trainScene, selfPlayScene, serveScene];

  window.renderFowDemo = function renderFowDemo(target) {
    if (!(target instanceof Element)) return null;
    if (typeof target.fowDemoCleanup === 'function') target.fowDemoCleanup();
    const id = 'fow-walkthrough-' + (++instanceCount);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let step = 0;
    let frame = 0;
    let timer = null;
    let destroyed = false;
    let inView = true;
    target.classList.add('fow-demo', 'walkthrough');
    target.innerHTML = '<div class="walkthrough-layout"><ol class="walkthrough-steps fow-step-list" role="tablist" aria-label="Fog of War workflow steps" aria-orientation="vertical">' + STEPS.map(function (item, index) {
      return '<li role="presentation"><button type="button" class="walkthrough-step fow-step" role="tab" id="' + id + '-step-' + index + '" aria-controls="' + id + '-panel" aria-selected="' + (index === 0) + '"' + (index === 0 ? ' aria-current="step"' : '') + ' tabindex="' + (index === 0 ? '0' : '-1') + '" data-fow-step="' + index + '"><span class="step-number" aria-hidden="true">' + String(index + 1).padStart(2, '0') + '</span><span><span class="step-title">' + item.name + '</span><span class="step-note">' + item.note + '</span></span></button></li>';
    }).join('') + '</ol><div class="walkthrough-main"><div class="walkthrough-toolbar fow-controls"><span class="fow-kind">Illustrated workflow</span><div class="fow-control-buttons"><button type="button" class="fow-frame-control" data-fow-action="previous" aria-label="Previous illustration frame">‹<span> Previous</span></button><button type="button" class="fow-demo__play" data-fow-action="play" aria-pressed="false" aria-label="Play Fog of War walkthrough"><span data-fow-play-icon aria-hidden="true">▶</span> <span data-fow-play-label>Play walkthrough</span></button><button type="button" class="fow-frame-control" data-fow-action="next" aria-label="Next illustration frame"><span>Next </span>›</button></div></div><section class="fow-tab-panel" id="' + id + '-panel" role="tabpanel" aria-labelledby="' + id + '-step-0" tabindex="0"><div class="fow-frame-heading"><span class="fow-phase-label"></span><span class="fow-frame-count" aria-hidden="true"></span></div><div class="fow-visual"></div><div class="fow-phase-progress" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="step-copy fow-step-copy"><h4></h4><p></p></div><dl class="step-io fow-step-io"><div><dt>Input</dt><dd data-fow-io="input"></dd></div><div><dt>Action</dt><dd data-fow-io="action"></dd></div><div><dt>Output</dt><dd data-fow-io="output"></dd></div></dl></section></div></div><p class="walkthrough-footnote fow-footnote">Illustrated using example positions and game groups. This is a visual explanation, not a recording of training or live model output.</p><span class="fow-sr-only" role="status" aria-live="polite"></span>';

    const tabs = Array.from(target.querySelectorAll('[role="tab"]'));
    const panel = target.querySelector('[role="tabpanel"]');
    const play = target.querySelector('.fow-demo__play');
    const visual = target.querySelector('.fow-visual');
    const status = target.querySelector('[role="status"]');
    const previous = target.querySelector('[data-fow-action="previous"]');
    const next = target.querySelector('[data-fow-action="next"]');

    function updateControls() {
      const atEnd = step === STEPS.length - 1 && frame === 3;
      const playing = timer !== null;
      previous.disabled = step === 0 && frame === 0;
      next.disabled = atEnd;
      play.disabled = motion.matches;
      play.setAttribute('aria-pressed', String(playing));
      play.setAttribute('aria-label', motion.matches ? 'Reduced motion: use the Previous and Next frame controls' : (playing ? 'Pause' : atEnd ? 'Replay' : 'Play') + ' Fog of War walkthrough');
      play.querySelector('[data-fow-play-icon]').textContent = motion.matches ? '' : playing ? 'Ⅱ' : '▶';
      play.querySelector('[data-fow-play-label]').textContent = motion.matches ? 'Reduced motion: use frames' : playing ? 'Pause walkthrough' : atEnd ? 'Replay walkthrough' : 'Play walkthrough';
      target.classList.toggle('is-playing', playing);
    }

    function render(announce) {
      if (destroyed) return;
      const item = STEPS[step];
      tabs.forEach(function (tab, index) {
        tab.setAttribute('aria-selected', String(index === step));
        if (index === step) tab.setAttribute('aria-current', 'step'); else tab.removeAttribute('aria-current');
        tab.tabIndex = index === step ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', id + '-step-' + step);
      visual.innerHTML = SCENES[step](frame);
      target.querySelector('.fow-phase-label').textContent = item.phases[frame];
      target.querySelector('.fow-frame-count').textContent = 'Frame ' + (frame + 1) + ' / 4';
      target.querySelector('.fow-step-copy h4').textContent = item.title;
      target.querySelector('.fow-step-copy p').textContent = item.description;
      ['input', 'action', 'output'].forEach(function (key) { target.querySelector('[data-fow-io="' + key + '"]').textContent = item[key]; });
      target.querySelectorAll('.fow-phase-progress i').forEach(function (dot, index) { dot.classList.toggle('is-current', index === frame); dot.classList.toggle('is-complete', index < frame); });
      updateControls();
      if (announce) status.textContent = item.name + '. ' + item.phases[frame] + '. ' + item.output + '.';
    }

    function pause() {
      window.clearInterval(timer);
      timer = null;
      updateControls();
    }

    function advance(direction, announce) {
      const total = STEPS.length * 4;
      const nextFrame = Math.min(total - 1, Math.max(0, step * 4 + frame + direction));
      step = Math.floor(nextFrame / 4);
      frame = nextFrame % 4;
      render(announce);
      if (nextFrame === total - 1) pause();
    }

    function start() {
      if (timer !== null || destroyed || document.hidden || !inView || motion.matches) return;
      if (step === STEPS.length - 1 && frame === 3) { step = 0; frame = 0; render(false); }
      timer = window.setInterval(function () { advance(1, false); }, 1900);
      updateControls();
    }

    function setStep(index, announce) {
      const parsed = Number(index);
      if (!Number.isFinite(parsed)) return;
      pause();
      step = ((Math.trunc(parsed) % STEPS.length) + STEPS.length) % STEPS.length;
      frame = 0;
      render(announce !== false);
    }

    function onClick(event) {
      const control = event.target.closest('button');
      if (!control || !target.contains(control)) return;
      if (control.hasAttribute('data-fow-step')) return setStep(control.dataset.fowStep);
      const action = control.dataset.fowAction;
      if (action === 'play') { if (timer !== null) pause(); else start(); }
      if (action === 'previous' || action === 'next') { pause(); advance(action === 'next' ? 1 : -1, true); }
    }

    function onKeydown(event) {
      if (!event.target.matches('[data-fow-step]')) return;
      let index = Number(event.target.dataset.fowStep);
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') index += 1;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') index -= 1;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = STEPS.length - 1;
      else return;
      event.preventDefault();
      setStep(index);
      tabs[step].focus();
    }

    function onFocus(event) {
      if (event.target.closest('[role="tablist"], [role="tabpanel"]')) pause();
    }
    function onVisibility() { if (document.hidden) pause(); }
    function onMotion() { if (motion.matches) pause(); else updateControls(); }

    target.addEventListener('click', onClick);
    target.addEventListener('keydown', onKeydown);
    target.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotion);
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (!inView) pause();
    }, { threshold: 0 }) : null;
    if (observer) observer.observe(visual);
    render(false);

    const api = {
      setStage: setStep,
      pause: pause,
      play: start,
      nextFrame: function () { pause(); advance(1, true); },
      getState: function () { return { step: step, frame: frame, playing: timer !== null, inView: inView }; },
      destroy: function () {
        pause();
        destroyed = true;
        target.removeEventListener('click', onClick);
        target.removeEventListener('keydown', onKeydown);
        target.removeEventListener('focusin', onFocus);
        document.removeEventListener('visibilitychange', onVisibility);
        motion.removeEventListener('change', onMotion);
        if (observer) observer.disconnect();
      }
    };
    target.fowDemoCleanup = api.destroy;
    target.fowDemoApi = api;
    return api;
  };
}());
