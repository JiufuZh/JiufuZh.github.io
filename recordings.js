window.projectRecordings = {
  chess: [{
    title: 'Chess analysis and coaching',
    gif: 'assets/chess/chess-walkthrough.gif',
    context: 'Local app screenshots using Stockfish and engine-backed coaching. No live LLM request.',
    frames: [
      { label: 'Import', src: 'assets/chess/01-import.png', duration: 4200, alt: 'Game import in the real Chess app', caption: 'Import a PGN game. The app reconstructs its board positions and move history.' },
      { label: 'Review', src: 'assets/chess/04-review.png', duration: 6500, alt: 'Stockfish review flags 3…Nf6 as a blunder', caption: 'The review flags 3…Nf6: White now has a forced mate. The move list and evaluation curve point to the same position.' },
      { label: 'Explain', src: 'assets/chess/05-coaching.png', duration: 6500, alt: 'Local coaching explains the Qxf7# threat', caption: 'The explanation connects the result to the board: the queen on h5 can capture f7 with checkmate.' },
      { label: 'Compare', src: 'assets/chess/06-alternative.png', duration: 5500, alt: 'Qe7 alternative marked on the Chess board', caption: 'Select Qe7 to see the candidate arrow from d8 to e7. The overlay makes the alternative move concrete.' },
      { label: 'Practice', src: 'assets/chess/07-practice.png', duration: 4500, alt: 'Practice position with the answer hidden', caption: 'Turn the reviewed position into a mate-in-one exercise, with the answer hidden and hints available.' },
      { label: 'Solve', src: 'assets/chess/09-solved.png', duration: 5500, alt: 'Trainer confirms Qxf7# solves the exercise', caption: 'Play Qxf7#. The trainer checks the move and confirms that the exercise is solved.' }
    ]
  }],
  fow: [{
    title: 'FOW browser integration',
    gif: 'assets/fow/browser.gif',
    context: 'Original browser script and inference service on a local test board, using the checkpoint from the training clip. Captured states with edited timing; not an online match or strength benchmark.',
    frames: [
      { label: 'Read the board', src: 'assets/fow/browser-01.png', duration: 4000, alt: 'Original FOW browser bridge beside a local board with hidden opponent pieces', caption: 'The script reads White’s visible pieces. The local test board supplies the legal candidate moves.' },
      { label: 'Connect', src: 'assets/fow/browser-02.png', duration: 4000, alt: 'Browser bridge confirms the actual local model service is ready', caption: 'Check backend confirms that the inference service has loaded the checkpoint produced in the training clip.' },
      { label: 'Make a move', src: 'assets/fow/browser-03.png', duration: 5500, alt: 'Original browser script has moved the white pawn from e2 to e4', caption: 'Move once requests a model decision. The returned move is e2→e4; the script clicks both squares and the board verifies and applies it.' },
      { label: 'Read it back', src: 'assets/fow/browser-04.png', duration: 5000, alt: 'Refreshed browser bridge shows the pawn on e4 in its observed position', caption: 'Refresh position reads the updated board. The bridge’s own view now shows the pawn on e4.' }
    ]
  }, {
    title: 'FOW training and checkpoint resume',
    gif: 'assets/fow/training.gif',
    context: 'Original training code, a tiny synthetic fixture, and CPU execution. A local viewer displays observed events. Captured states with edited timing; not the full internship dataset or a performance evaluation.',
    frames: [
      { label: 'Start', src: 'assets/fow/training-01.png', duration: 2500, alt: 'Local training viewer ready to start a small CPU run', caption: 'Start a fresh run with a small synthetic fixture. The viewer launches the project’s actual training code.' },
      { label: 'Load data', src: 'assets/fow/training-03.png', duration: 4000, alt: 'Running trainer has loaded the synthetic sample and separated whole games into splits', caption: 'PyTorch and the training code load. The sample is split by whole games before training starts.' },
      { label: 'Save', src: 'assets/fow/training-04.png', duration: 6000, alt: 'Epoch one completed, checkpoint saved, and model inference verified', caption: 'The CPU training pass completes epoch 1 and saves a resumable checkpoint. Reloading it and running inference both succeed.' },
      { label: 'Resume', src: 'assets/fow/training-06.png', duration: 3000, alt: 'The real training process starts again after Resume saved run was clicked', caption: 'Resume saved run launches a second process using the checkpoint just saved.' },
      { label: 'Continue', src: 'assets/fow/training-07.png', duration: 7000, alt: 'Saved weights and optimizer restored, epoch two completed, and checkpoint verified', caption: 'Model weights and optimizer state are restored. Epoch 2 finishes and saves the checkpoint used by the browser demonstration.' }
    ]
  }]
};
