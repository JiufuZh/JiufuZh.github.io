(() => {
  'use strict';
  const target = document.getElementById('fow-demo');
  if (typeof window.renderFowDemo === 'function' && target) window.renderFowDemo(target);

  const image = document.getElementById('chess-capture');
  const caption = document.getElementById('capture-caption');
  const play = document.getElementById('capture-play');
  const dialog = document.getElementById('demo-dialog');
  const dialogImage = document.getElementById('dialog-capture');
  const dialogPlay = document.getElementById('dialog-play');
  const buttons = [...document.querySelectorAll('[data-frame]')];
  const frames = [
    { src: 'assets/chess/04-review.png', alt: 'Actual Chess interface showing Stockfish evaluation of a sample game', caption: 'Local app capture: Stockfish identifies a move allowing forced mate. No live LLM request.' },
    { src: 'assets/chess/06-alternative.png', alt: 'Actual Chess interface showing Qe7 as a benchmark alternative to the played blunder', caption: 'Local sample game: compare the played move with the engine-backed alternative. No live LLM request.' },
    { src: 'assets/chess/09-solved.png', alt: 'Actual Chess training interface confirming the checkmating move was solved', caption: 'Local sample game: complete the checkmating move in targeted practice. No live LLM request.' }
  ];
  let frame = 0;
  let timer = null;
  function syncDialog() {
    if (!dialog.open) return;
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    document.getElementById('dialog-caption').textContent = caption.textContent;
    dialogPlay.textContent = timer === null ? 'Play walkthrough' : 'Pause walkthrough';
    dialogPlay.setAttribute('aria-pressed', String(timer !== null));
  }
  function showFrame(index) {
    frame = index;
    image.src = frames[index].src;
    image.alt = frames[index].alt;
    caption.textContent = frames[index].caption;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    syncDialog();
  }
  function stopPlayback() {
    if (timer !== null) showFrame(frame);
    timer = null;
    play.textContent = 'Play walkthrough';
    play.setAttribute('aria-pressed', 'false');
    play.setAttribute('aria-label', 'Play Chess walkthrough');
    syncDialog();
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    stopPlayback();
    showFrame(Number(button.dataset.frame));
  }));
  play.addEventListener('click', () => {
    if (timer !== null) return stopPlayback();
    image.src = 'assets/chess/chess-pipeline.webp';
    image.alt = 'Animated sequence of real Chess interface captures: import, analyze, compare, and practice a sample game';
    caption.textContent = 'Local UI captures with a sample game: import, analyze, compare, practice. No live LLM request.';
    buttons.forEach(button => button.setAttribute('aria-pressed', 'false'));
    timer = true;
    play.textContent = 'Pause';
    play.setAttribute('aria-pressed', 'true');
    play.setAttribute('aria-label', 'Pause Chess walkthrough');
    syncDialog();
  });
  document.getElementById('expand-demo').addEventListener('click', () => { dialog.showModal(); syncDialog(); });
  document.getElementById('close-demo').addEventListener('click', () => dialog.close());
  document.getElementById('dialog-previous').addEventListener('click', () => { stopPlayback(); showFrame((frame + frames.length - 1) % frames.length); });
  document.getElementById('dialog-next').addEventListener('click', () => { stopPlayback(); showFrame((frame + 1) % frames.length); });
  dialogPlay.addEventListener('click', () => play.click());
  dialog.addEventListener('close', stopPlayback);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopPlayback(); });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', stopPlayback);
  showFrame(0);
})();
