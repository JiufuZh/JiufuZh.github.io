(() => {
  'use strict';
  const recordings = window.projectRecordings || {};
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.getElementById('media-dialog');
  let enlarged = null;
  let opener = null;

  document.addEventListener('pagechange', () => {
    if (dialog?.open) dialog.close();
  });

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
    const progress = root.querySelector('[data-progress]');
    const retry = root.querySelector('[data-retry]');
    const topics = root.querySelector('[data-topics]');
    const clipTitle = root.querySelector('[data-clip-title]');
    const clipSummary = root.querySelector('[data-clip-summary]');
    const noteTitle = root.querySelector('[data-note-title]');
    const note = root.querySelector('[data-note]');
    let clipIndex = 0;
    let frameIndex = 0;
    let showingPoster = false;
    let playing = false;
    let finished = false;
    let timer = null;
    let started = 0;
    let inView = true;
    let loading = false;
    let imageError = false;
    let shownSource = null;
    let remaining = clips[0].frames[0].duration;
    const currentClip = () => clips[clipIndex];
    const currentFrame = () => currentClip().frames[frameIndex];
    const isEnlarged = () => dialog?.open && enlarged === api;
    const imageReady = () => image.complete && image.naturalWidth > 0;
    const stepLabel = () => `Step ${frameIndex + 1} of ${currentClip().frames.length}`;

    function announce(message) {
      if (status) status.textContent = message;
      const dialogStatus = isEnlarged() && dialog.querySelector('[data-dialog-status]');
      if (dialogStatus) dialogStatus.textContent = message;
    }

    function imageState() {
      root.dataset.loading = String(loading);
      root.dataset.imageError = String(imageError);
    }

    function label() { return reducedMotion.matches ? 'Use the steps below' : playing ? 'Pause clip' : finished ? 'Replay clip' : 'Play clip'; }
    function controls() {
      play.textContent = label();
      play.disabled = reducedMotion.matches || imageError;
      play.setAttribute('aria-pressed', String(playing));
      play.setAttribute('aria-label', `${label()}: ${currentClip().title}`);
      previous.disabled = frameIndex === 0;
      next.disabled = frameIndex === currentClip().frames.length - 1;
      if (isEnlarged()) {
        const dplay = dialog.querySelector('[data-dialog-play]');
        dplay.textContent = label();
        dplay.disabled = reducedMotion.matches || imageError;
        dplay.setAttribute('aria-pressed', String(playing));
        dialog.querySelector('[data-dialog-prev]').disabled = previous.disabled;
        dialog.querySelector('[data-dialog-next]').disabled = next.disabled;
      }
    }
    function syncDialog() {
      if (!isEnlarged()) return;
      const frame = currentFrame();
      dialog.querySelector('#media-dialog-title').textContent = currentClip().title;
      const dialogImage = dialog.querySelector('[data-dialog-image]');
      const source = frame.originalSrc || frame.src;
      if (dialogImage.getAttribute('src') !== source) dialogImage.src = source;
      dialogImage.alt = frame.alt;
      dialog.querySelector('[data-dialog-original]')?.setAttribute('href', source);
      dialog.querySelector('[data-dialog-caption]').textContent = `${frame.caption} ${currentClip().context}`;
      controls();
    }

    function imageFailed() {
      const shouldAnnounce = !imageError;
      loading = false;
      imageError = true;
      imageState();
      pause();
      if (shouldAnnounce) announce('This image could not load. Retry the image or choose another step.');
    }

    function imageLoaded() {
      // A late event must not schedule a still-pending replacement image.
      if (!imageReady()) return;
      loading = false;
      imageError = false;
      imageState();
      controls();
      schedule();
    }

    function requestImage(force = false) {
      const source = currentFrame().src;
      if (!force && source === shownSource) return;
      shownSource = source;
      loading = true;
      imageError = false;
      imageState();
      if (force) image.removeAttribute('src');
      image.src = source;
      if (imageReady()) imageLoaded();
      else if (image.complete) imageFailed();
    }

    function show(announce = false) {
      const frame = currentFrame();
      image.alt = frame.alt;
      caption.textContent = frame.caption;
      context.textContent = currentClip().context;
      if (noteTitle) { noteTitle.textContent = frame.noteTitle || ''; noteTitle.hidden = !frame.noteTitle; }
      if (note) { note.textContent = frame.note || ''; note.hidden = !frame.note; }
      if (progress) progress.textContent = stepLabel();
      root.querySelector('[data-download]').href = currentClip().gif;
      [...chapters.querySelectorAll('button')].forEach((button, index) => {
        if (index === frameIndex) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
      if (announce) announceStep();
      requestImage();
      controls();
      syncDialog();
    }

    function announceStep() {
      announce(`${stepLabel()}: ${currentFrame().label}`);
    }

    function pause() {
      if (timer !== null) remaining = Math.max(0, remaining - (performance.now() - started));
      clearTimeout(timer);
      timer = null;
      playing = false;
      controls();
    }
    function selectFrame(index) {
      if (index < 0 || index >= currentClip().frames.length) return;
      pause();
      frameIndex = index;
      showingPoster = false;
      finished = false;
      remaining = currentFrame().duration;
      show(true);
    }
    function schedule() {
      if (!playing || timer !== null || loading || imageError || !imageReady()) return;
      if (document.hidden || reducedMotion.matches || (!inView && !isEnlarged())) return pause();
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
          announce('Clip complete. Replay or choose a step.');
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
      if (reducedMotion.matches || imageError || document.hidden || (!inView && !isEnlarged())) return;
      // The same image is also used by the viewer, even when its inline copy is offscreen.
      image.loading = 'eager';
      if (finished || showingPoster) {
        frameIndex = 0;
        finished = false;
        showingPoster = false;
        remaining = currentFrame().duration;
        show();
      }
      if (imageError) return;
      playing = true;
      controls();
      schedule();
    }
    function selectClip(index, announceSelection = false) {
      if (!clips[index]) return;
      pause();
      clipIndex = index;
      const clip = currentClip();
      showingPoster = Number.isInteger(clip.posterIndex) && clip.posterIndex >= 0 && clip.posterIndex < clip.frames.length;
      frameIndex = showingPoster ? clip.posterIndex : 0;
      finished = false;
      remaining = currentFrame().duration;
      if (clipTitle) clipTitle.textContent = clip.label || clip.title;
      if (clipSummary) { clipSummary.textContent = clip.summary || ''; clipSummary.hidden = !clip.summary; }
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
      show(announceSelection);
    }
    const api = { pause, toggle, previous: () => selectFrame(frameIndex - 1), next: () => selectFrame(frameIndex + 1), syncDialog };
    image.addEventListener('load', imageLoaded);
    image.addEventListener('error', () => {
      if (image.complete && !image.naturalWidth) imageFailed();
    });
    retry?.addEventListener('click', () => {
      pause();
      finished = false;
      remaining = currentFrame().duration;
      image.loading = 'eager';
      requestImage(true);
      controls();
    });
    play.addEventListener('click', toggle);
    previous.addEventListener('click', api.previous);
    next.addEventListener('click', api.next);
    if (topics) {
      topics.replaceChildren(...clips.map((clip, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.clip = String(index);
        button.textContent = clip.label || clip.title;
        return button;
      }));
    }
    root.querySelectorAll('[data-clip]').forEach(button => button.addEventListener('click', () => selectClip(Number(button.dataset.clip), true)));
    root.querySelectorAll('[data-expand]').forEach(button => button.addEventListener('click', event => {
      if (!dialog) return;
      enlarged?.pause();
      enlarged = api;
      opener = event.currentTarget;
      image.loading = 'eager';
      dialog.showModal();
      syncDialog();
      announceStep();
    }));
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    document.addEventListener('pagechange', pause);
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
