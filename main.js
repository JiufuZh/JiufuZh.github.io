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
  window.addEventListener('hashchange', () => revealHash());
  if (window.location.hash) window.requestAnimationFrame(() => revealHash());

  const image = document.getElementById('chess-capture');
  const caption = document.getElementById('capture-caption');
  const play = document.getElementById('capture-play');
  const details = document.getElementById('chess-details');
  const dialog = document.getElementById('demo-dialog');
  const dialogImage = document.getElementById('dialog-capture');
  const dialogPlay = document.getElementById('dialog-play');
  const dialogCaption = document.getElementById('dialog-caption');
  const buttons = [...document.querySelectorAll('[data-frame]')];
  if (!image || !caption || !play || !dialog || !dialogImage || !dialogPlay || !dialogCaption) return;

  const sequence = [
    { src: 'assets/chess/01-import.png', duration: 2200, stage: null, alt: 'Actual Chess interface importing a sample PGN game', caption: 'Import a sample game from its PGN move history.' },
    { src: 'assets/chess/04-review.png', duration: 3000, stage: 0, alt: 'Actual Chess interface showing Stockfish evaluation of a sample game', caption: 'Stockfish identifies a move allowing forced mate.' },
    { src: 'assets/chess/05-coaching.png', duration: 3500, stage: null, alt: 'Actual Chess interface explaining the tactical issue using engine and board evidence', caption: 'Read the engine-backed explanation of the tactical issue.' },
    { src: 'assets/chess/chess-poster.webp', duration: 3500, stage: 1, alt: 'Actual Chess interface highlighting Qe7 as a benchmark alternative to the played blunder', caption: 'Compare the played move with the engine-backed alternative.' },
    { src: 'assets/chess/07-practice.png', duration: 2200, stage: 2, alt: 'Actual Chess trainer asking the player to solve the reviewed position before revealing the answer', caption: 'Practice the critical position with the answer hidden.' },
    { src: 'assets/chess/09-solved.png', duration: 2800, stage: 2, alt: 'Actual Chess training interface confirming the checkmating move was solved', caption: 'Complete the checkmating move in targeted practice.' }
  ];
  const stageSteps = [1, 3, 5];
  let stage = 1;
  let step = 3;
  let started = false;
  let playing = false;
  let timer = null;
  let startedAt = 0;
  let remaining = sequence[step].duration;
  let opener = null;

  function updatePlaybackControls() {
    [play, dialogPlay].forEach(button => {
      button.textContent = playing ? 'Pause walkthrough' : 'Play walkthrough';
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} Chess walkthrough`);
    });
  }
  function syncDialog() {
    if (!dialog.open) return;
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = caption.textContent;
  }
  function showStep(index) {
    step = index;
    const current = sequence[index];
    if (current.stage !== null) stage = current.stage;
    image.src = current.src;
    image.alt = current.alt;
    caption.textContent = `${current.caption} Local app capture; no live LLM request.`;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.frame) === current.stage)));
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
    return !document.hidden && (dialog.open || !details || details.open);
  }
  function scheduleStep() {
    startedAt = performance.now();
    timer = window.setTimeout(() => {
      timer = null;
      if (!playing) return;
      if (!isVisible()) return pausePlayback();
      showStep((step + 1) % sequence.length);
      remaining = sequence[step].duration;
      scheduleStep();
    }, Math.max(1, remaining));
  }
  function togglePlayback() {
    if (playing) return pausePlayback();
    if (!isVisible()) return;
    if (!started) {
      showStep(0);
      remaining = sequence[0].duration;
      started = true;
    }
    playing = true;
    updatePlaybackControls();
    scheduleStep();
  }
  function selectStage(index) {
    if (!Number.isInteger(index) || index < 0 || index >= stageSteps.length) return;
    pausePlayback();
    showStep(stageSteps[index]);
    remaining = sequence[step].duration;
    started = true;
  }
  buttons.forEach(button => button.addEventListener('click', () => selectStage(Number(button.dataset.frame))));
  play.addEventListener('click', togglePlayback);
  dialogPlay.addEventListener('click', togglePlayback);
  document.querySelectorAll('#expand-demo, [data-enlarge-chess]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    if (!dialog.open) dialog.showModal();
    syncDialog();
  }));
  document.getElementById('close-demo')?.addEventListener('click', () => dialog.close());
  document.getElementById('dialog-previous')?.addEventListener('click', () => selectStage((stage + stageSteps.length - 1) % stageSteps.length));
  document.getElementById('dialog-next')?.addEventListener('click', () => selectStage((stage + 1) % stageSteps.length));
  dialog.addEventListener('close', () => {
    pausePlayback();
    if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
  });
  details?.addEventListener('toggle', () => { if (!details.open) pausePlayback(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { pausePlayback(); pauseFow(); }
  });
  motion.addEventListener('change', () => { pausePlayback(); pauseFow(); });
  showStep(3);
  updatePlaybackControls();
})();
