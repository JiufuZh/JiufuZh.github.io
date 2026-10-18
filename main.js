(() => {
  'use strict';
  const recordings = window.projectRecordings || {};
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.getElementById('media-dialog');
  let enlarged = null;
  let opener = null;

  function revealHash() {
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
    target?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  addEventListener('hashchange', revealHash);
  if (location.hash) requestAnimationFrame(revealHash);

  function makePlayer(root) {
    const clips = recordings[root.dataset.player];
    if (!clips?.length) return;
    const image = root.querySelector('[data-image]');
    const caption = root.querySelector('[data-caption]');
    const chapters = root.querySelector('[data-chapters]');
    const play = root.querySelector('[data-play]');
    const previous = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const context = root.querySelector('[data-context]');
    const status = root.querySelector('[data-status]');
    let clipIndex = 0;
    let frameIndex = 0;
    let playing = false;
    let finished = false;
    let timer = null;
    let started = 0;
    let inView = true;
    let remaining = clips[0].frames[0].duration;
    const currentClip = () => clips[clipIndex];
    const currentFrame = () => currentClip().frames[frameIndex];
    const isEnlarged = () => dialog?.open && enlarged === api;

    function label() { return reducedMotion.matches ? 'Use the steps below' : playing ? 'Pause clip' : finished ? 'Replay clip' : 'Play clip'; }
    function controls() {
      play.textContent = label();
      play.disabled = reducedMotion.matches;
      play.setAttribute('aria-pressed', String(playing));
      play.setAttribute('aria-label', `${label()}: ${currentClip().title}`);
      previous.disabled = frameIndex === 0;
      next.disabled = frameIndex === currentClip().frames.length - 1;
      if (isEnlarged()) {
        const dplay = dialog.querySelector('[data-dialog-play]');
        dplay.textContent = label();
        dplay.disabled = reducedMotion.matches;
        dplay.setAttribute('aria-pressed', String(playing));
        dialog.querySelector('[data-dialog-prev]').disabled = previous.disabled;
        dialog.querySelector('[data-dialog-next]').disabled = next.disabled;
      }
    }
    function syncDialog() {
      if (!isEnlarged()) return;
      const frame = currentFrame();
      dialog.querySelector('#media-dialog-title').textContent = currentClip().title;
      dialog.querySelector('[data-dialog-image]').src = frame.src;
      dialog.querySelector('[data-dialog-image]').alt = frame.alt;
      dialog.querySelector('[data-dialog-original]')?.setAttribute('href', frame.src);
      dialog.querySelector('[data-dialog-caption]').textContent = `${frame.caption} ${currentClip().context}`;
      controls();
    }
    function show(announce = false) {
      const frame = currentFrame();
      image.src = frame.src;
      image.alt = frame.alt;
      caption.textContent = frame.caption;
      context.textContent = currentClip().context;
      root.querySelector('[data-download]').href = currentClip().gif;
      [...chapters.querySelectorAll('button')].forEach((button, index) => {
        if (index === frameIndex) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
      if (announce) status.textContent = `${frameIndex + 1} of ${currentClip().frames.length}: ${frame.label}`;
      controls();
      syncDialog();
    }
    function pause() {
      if (playing) remaining = Math.max(0, remaining - (performance.now() - started));
      clearTimeout(timer);
      timer = null;
      playing = false;
      controls();
    }
    function selectFrame(index) {
      if (index < 0 || index >= currentClip().frames.length) return;
      pause();
      frameIndex = index;
      finished = false;
      remaining = currentFrame().duration;
      show(true);
    }
    function schedule() {
      started = performance.now();
      timer = setTimeout(() => {
        timer = null;
        if (!playing) return;
        if (document.hidden || reducedMotion.matches || (!inView && !isEnlarged())) return pause();
        if (frameIndex === currentClip().frames.length - 1) {
          playing = false;
          finished = true;
          remaining = 0;
          controls();
          status.textContent = 'Clip complete. Replay or choose a step.';
          return;
        }
        frameIndex += 1;
        remaining = currentFrame().duration;
        show();
        schedule();
      }, Math.max(1, remaining));
    }
    function toggle() {
      if (playing) return pause();
      if (reducedMotion.matches || document.hidden || (!inView && !isEnlarged())) return;
      if (finished) { frameIndex = 0; finished = false; remaining = currentFrame().duration; show(); }
      playing = true;
      controls();
      schedule();
    }
    function selectClip(index) {
      if (!clips[index]) return;
      pause();
      clipIndex = index;
      frameIndex = 0;
      finished = false;
      remaining = currentFrame().duration;
      chapters.replaceChildren(...currentClip().frames.map((frame, index) => {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${index + 1}. ${frame.label}`;
        button.addEventListener('click', () => selectFrame(index));
        item.append(button);
        return item;
      }));
      root.querySelectorAll('[data-clip]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.clip) === index)));
      show();
    }
    const api = { pause, toggle, previous: () => selectFrame(frameIndex - 1), next: () => selectFrame(frameIndex + 1), syncDialog };
    play.addEventListener('click', toggle);
    previous.addEventListener('click', api.previous);
    next.addEventListener('click', api.next);
    root.querySelectorAll('[data-clip]').forEach(button => button.addEventListener('click', () => selectClip(Number(button.dataset.clip))));
    root.querySelector('[data-expand]').addEventListener('click', event => {
      enlarged?.pause();
      enlarged = api;
      opener = event.currentTarget;
      dialog.showModal();
      syncDialog();
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    reducedMotion.addEventListener('change', pause);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        if (!inView && !isEnlarged()) pause();
      }).observe(root);
    }
    selectClip(0);
  }
  document.querySelectorAll('[data-player]').forEach(makePlayer);
  dialog?.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());
  dialog?.querySelector('[data-dialog-play]').addEventListener('click', () => enlarged?.toggle());
  dialog?.querySelector('[data-dialog-prev]').addEventListener('click', () => enlarged?.previous());
  dialog?.querySelector('[data-dialog-next]').addEventListener('click', () => enlarged?.next());
  dialog?.addEventListener('close', () => {
    enlarged?.pause();
    enlarged = null;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
})();
