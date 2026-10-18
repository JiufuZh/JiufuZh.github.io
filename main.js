(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fowTarget = document.getElementById('fow-demo');
  if (typeof window.renderFowDemo === 'function' && fowTarget) window.renderFowDemo(fowTarget);

  function pauseFow() {
    fowTarget?.querySelector('.fow-demo__play[aria-pressed="true"]')?.click();
  }
  ['chess', 'fow'].forEach(name => {
    const details = document.getElementById(`${name}-details`);
    document.getElementById(`show-${name}-details`)?.addEventListener('click', () => {
      if (!details) return;
      details.open = true;
      details.querySelector('summary')?.focus({ preventScroll: true });
      details.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    });
    if (name === 'fow') details?.addEventListener('toggle', () => { if (!details.open) pauseFow(); });
  });
  function revealHash() {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = id && document.getElementById(id);
    if (!target) return;
    let parent = target.closest('details');
    while (parent) {
      parent.open = true;
      parent = parent.parentElement?.closest('details');
    }
    target.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  window.addEventListener('hashchange', revealHash);
  if (window.location.hash) window.requestAnimationFrame(revealHash);

  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseFow(); });
  motion.addEventListener('change', pauseFow);

  const walkthrough = document.querySelector('[data-chess-walkthrough]');
  const image = document.getElementById('chess-capture');
  const caption = document.getElementById('capture-caption');
  const play = document.getElementById('capture-play');
  if (!walkthrough || !image || !caption || !play) return;

  const parentDetails = walkthrough.closest('details');
  const dialog = document.getElementById('demo-dialog');
  const dialogImage = document.getElementById('dialog-capture');
  const dialogPlay = document.getElementById('dialog-play');
  const dialogCaption = document.getElementById('dialog-caption');
  const buttons = [...walkthrough.querySelectorAll('[data-chess-step]')];
  const previousButtons = ['capture-previous', 'dialog-previous'].map(id => document.getElementById(id)).filter(Boolean);
  const nextButtons = ['capture-next', 'dialog-next'].map(id => document.getElementById(id)).filter(Boolean);
  const status = document.getElementById('chess-status');
  const sequence = [
    {
      src: 'assets/chess/01-import.png', duration: 4200,
      title: 'Import a game',
      description: 'Paste a PGN game or upload a .pgn file. The app reconstructs the board and move history so each position can be reviewed.',
      input: 'PGN move history from a completed game',
      output: 'A game ready for move-by-move review',
      alt: 'Real Chess app import panel containing the Scholar\'s Mate demonstration PGN',
      caption: 'The demonstration starts with a short Scholar\'s Mate game in the import panel.'
    },
    {
      src: 'assets/chess/04-review.png', duration: 6500,
      title: 'Find the turning point',
      description: 'Run the Stockfish review, then select 3…Nf6. The evaluation curve and move list identify the mistake that allows White a forced mate.',
      input: 'The game\'s positions, reviewed by Stockfish',
      output: '3…Nf6 flagged as a blunder allowing mate',
      alt: 'Real Chess app showing its Stockfish evaluation curve and the selected blunder 3…Nf6',
      caption: 'The same game after local engine review, with 3…Nf6 selected.'
    },
    {
      src: 'assets/chess/05-coaching.png', duration: 6500,
      title: 'Understand why it fails',
      description: 'Read the explanation alongside the board: the queen on h5 can capture f7 with checkmate. This capture uses the app\'s local engine-backed coaching, without a live LLM request.',
      input: 'The critical position and engine continuation',
      output: 'A concrete explanation of the Qxf7# threat',
      alt: 'Real Chess app explaining that the queen can move from h5 to f7 to deliver checkmate',
      caption: 'Grounded coaching connects the evaluated move to a specific piece, square, and tactical consequence.'
    },
    {
      src: 'assets/chess/06-alternative.png', duration: 5500,
      title: 'Compare a candidate move',
      description: 'Select the Qe7 benchmark to inspect another candidate. The board draws the queen\'s route from d8 to e7, linking the comparison to a visible move.',
      input: 'The played Nf6 move and the Qe7 benchmark',
      output: 'A candidate arrow on the same board',
      alt: 'Real Chess app overlaying an arrow from d8 to e7 for the Qe7 benchmark alternative',
      caption: 'The Qe7 arrow is an alternative-move overlay; the board is not replaying that move.'
    },
    {
      src: 'assets/chess/07-practice.png', duration: 4500,
      title: 'Try the position yourself',
      description: 'Open “Train this position” to turn the reviewed moment into a mate-in-one exercise. The answer starts hidden, with hints available if the player needs help.',
      input: 'The critical position from the game review',
      output: 'A playable exercise with the answer hidden',
      alt: 'Real Chess trainer presenting a mate-in-one position with its answer hidden',
      caption: 'Review becomes practice: solve the position before revealing its answer.'
    },
    {
      src: 'assets/chess/09-solved.png', duration: 5500,
      title: 'Check the result',
      description: 'Move the queen from h5 to f7. The trainer accepts Qxf7#, confirms the line is complete, and reveals the explanation for the solved position.',
      input: 'The player\'s queen move from h5 to f7',
      output: 'Solved confirmation and the completed line',
      alt: 'Real Chess trainer confirming Solved after the player makes the checkmating queen move to f7',
      caption: 'The actual trainer accepts the mating move and confirms the exercise is solved.'
    }
  ];
  let step = 0;
  let playing = false;
  let finished = false;
  let timer = null;
  let startedAt = 0;
  let remaining = sequence[0].duration;
  let inView = true;
  let opener = null;

  function updatePlaybackControls() {
    [play, dialogPlay].filter(Boolean).forEach(button => {
      button.disabled = motion.matches;
      button.textContent = motion.matches ? 'Reduced motion: use steps' : playing ? 'Pause walkthrough' : finished ? 'Replay walkthrough' : 'Play walkthrough';
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', motion.matches ? 'Automatic playback disabled; use the step controls' : `${playing ? 'Pause' : finished ? 'Replay' : 'Play'} Chess walkthrough`);
    });
  }
  function setText(id, value) {
    const target = document.getElementById(id);
    if (target) target.textContent = value;
  }
  function syncDialog() {
    if (!dialog?.open) return;
    if (dialogImage) { dialogImage.src = image.src; dialogImage.alt = image.alt; }
    if (dialogCaption) dialogCaption.textContent = `Step ${step + 1} of ${sequence.length} — ${sequence[step].title}. ${sequence[step].description} Local app capture; no live LLM request.`;
  }
  function showStep(index, announce = false) {
    step = index;
    const current = sequence[index];
    image.src = current.src;
    image.alt = current.alt;
    caption.textContent = current.caption;
    setText('chess-step-count', `Step ${index + 1} of ${sequence.length}`);
    setText('chess-step-title', current.title);
    setText('chess-step-description', current.description);
    setText('chess-step-input', current.input);
    setText('chess-step-output', current.output);
    buttons.forEach(button => {
      const selected = Number(button.dataset.chessStep) === index;
      button.dataset.active = String(selected);
      if (selected) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    previousButtons.forEach(button => { button.disabled = index === 0; });
    nextButtons.forEach(button => { button.disabled = index === sequence.length - 1; });
    if (announce && status) status.textContent = `Step ${index + 1} of ${sequence.length}: ${current.title}`;
    syncDialog();
  }
  function pausePlayback() {
    if (playing) remaining = Math.max(0, remaining - (performance.now() - startedAt));
    window.clearTimeout(timer);
    timer = null;
    playing = false;
    updatePlaybackControls();
  }
  function isVisible() {
    return !document.hidden && (dialog?.open || (inView && (!parentDetails || parentDetails.open)));
  }
  function scheduleStep() {
    startedAt = performance.now();
    timer = window.setTimeout(() => {
      timer = null;
      if (!playing) return;
      if (!isVisible() || motion.matches) return pausePlayback();
      if (step === sequence.length - 1) {
        playing = false;
        finished = true;
        remaining = 0;
        updatePlaybackControls();
        if (status) status.textContent = 'Walkthrough complete. Replay or choose any step.';
        return;
      }
      showStep(step + 1);
      remaining = sequence[step].duration;
      scheduleStep();
    }, Math.max(1, remaining));
  }
  function togglePlayback() {
    if (playing) return pausePlayback();
    if (!isVisible() || motion.matches) return;
    if (finished) { showStep(0); remaining = sequence[0].duration; finished = false; }
    playing = true;
    updatePlaybackControls();
    scheduleStep();
  }
  function selectStep(index) {
    if (!Number.isInteger(index) || index < 0 || index >= sequence.length) return;
    pausePlayback();
    finished = false;
    showStep(index, true);
    remaining = sequence[index].duration;
    updatePlaybackControls();
  }

  buttons.forEach(button => button.addEventListener('click', () => selectStep(Number(button.dataset.chessStep))));
  previousButtons.forEach(button => button.addEventListener('click', () => selectStep(step - 1)));
  nextButtons.forEach(button => button.addEventListener('click', () => selectStep(step + 1)));
  play.addEventListener('click', togglePlayback);
  dialogPlay?.addEventListener('click', togglePlayback);
  if (dialog && dialogImage) {
    document.querySelectorAll('#expand-demo, [data-enlarge-chess]').forEach(button => button.addEventListener('click', () => {
      opener = button;
      if (!dialog.open) dialog.showModal();
      syncDialog();
    }));
    document.getElementById('close-demo')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      pausePlayback();
      if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
    });
  }
  parentDetails?.addEventListener('toggle', () => { if (!parentDetails.open) pausePlayback(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pausePlayback(); });
  motion.addEventListener('change', pausePlayback);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      if (!inView && !dialog?.open) pausePlayback();
    }, { threshold: 0 });
    observer.observe(walkthrough);
  }
  showStep(0);
  updatePlaybackControls();
})();
