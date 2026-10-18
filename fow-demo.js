(function () {
  'use strict';

  let instanceCount = 0;
  const stages = [
    {
      name: 'Dataset',
      title: 'Learn from a partial view.',
      description: 'Turn recorded games into player-view observations and move histories. Hidden information stays outside the model input.',
      details: ['1,554 recorded games', '88,949 plies'],
      alt: 'Illustration of a partially visible chessboard becoming player-view training samples.'
    },
    {
      name: 'Train',
      title: 'Connect the board with its history.',
      description: 'Combine board and history representations to train a policy and value model for decisions under uncertainty.',
      details: ['Board observations', 'Move history'],
      alt: 'Illustration of board and history encoders joining a policy and value model.'
    },
    {
      name: 'Self-play',
      title: 'Close the learning loop.',
      description: 'Generate game trajectories through self-play, then use their outcomes for policy and value updates.',
      details: ['Game rollouts', 'Policy and value updates'],
      alt: 'Illustration of two policies playing a game and returning the outcome to the learning loop.'
    },
    {
      name: 'Serve',
      title: 'Bring the model to the board.',
      description: 'Connect local inference to a browser bridge script. The player view goes in; a suggested move comes back.',
      details: ['Local inference', 'Browser bridge script'],
      alt: 'Illustration of a browser chessboard exchanging a player view and suggested move with local inference.'
    }
  ];

  function board(x, y, size, reverse) {
    const unit = size / 8;
    const pieces = { '6,0': '♙', '6,1': '♙', '6,2': '♙', '6,3': '♙', '6,5': '♙', '6,6': '♙', '6,7': '♙', '7,0': '♖', '7,1': '♘', '7,2': '♗', '7,3': '♕', '7,4': '♔', '7,5': '♗', '7,7': '♖', '5,5': '♘', '4,4': '♙' };
    let cells = '';
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const visible = row >= 5 || (row === 4 && col >= 2 && col <= 6) || (row === 3 && col === 5);
        const fill = visible ? ((row + col) % 2 ? '#C6D6ED' : '#F6F8FC') : ((row + col) % 2 ? '#253A57' : '#304864');
        const px = x + col * unit;
        const py = y + (reverse ? 7 - row : row) * unit;
        cells += `<rect x="${px}" y="${py}" width="${unit + .2}" height="${unit + .2}" fill="${fill}"/>`;
        const piece = pieces[`${row},${col}`];
        if (piece) cells += `<text x="${px + unit / 2}" y="${py + unit * .77}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${unit * .88}" fill="#192B45">${piece}</text>`;
      }
    }
    return `<g>${cells}<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="none" stroke="#B8CAE2" stroke-width="1"/></g>`;
  }

  function box(x, y, width, height, label, secondary) {
    return `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="#FFFFFF" stroke="#B8CAE2"/><text x="${x + width / 2}" y="${y + (secondary ? height * .42 : height / 2 + 6)}" text-anchor="middle" fill="#192B45" font-size="18" font-weight="600">${label}</text>${secondary ? `<text x="${x + width / 2}" y="${y + height * .72}" text-anchor="middle" fill="#637389" font-size="15">${secondary}</text>` : ''}</g>`;
  }

  function illustration(index, id) {
    const arrow = `${id}-arrow`;
    const path = (d, extra) => `<path d="${d}" fill="none" stroke="#2859C5" stroke-width="2" marker-end="url(#${arrow})" ${extra || ''}/>`;
    let content = '';
    if (index === 0) {
      content = board(40, 44, 200, false) +
        '<text x="140" y="278" text-anchor="middle" fill="#637389" font-size="18">Player view</text>' +
        path('M260 144 H318') + box(340, 58, 252, 72, 'Game records', 'Replay each position') +
        path('M466 144 V172') + box(340, 190, 252, 72, 'Training samples', 'Visible board + history');
    } else if (index === 1) {
      content = board(30, 77, 160, false) +
        path('M206 154 H226 V94 H248') + path('M226 154 V220 H248') +
        box(264, 62, 154, 64, 'Board encoder') + box(264, 188, 154, 64, 'History encoder') +
        path('M430 94 H450 V155 H473') + path('M430 220 H450 V155') +
        box(488, 115, 132, 80, 'Policy', '+ value') +
        '<text x="110" y="278" text-anchor="middle" fill="#637389" font-size="18">Model input</text>';
    } else if (index === 2) {
      content = board(38, 44, 164, false) + board(438, 44, 164, true) +
        '<text x="120" y="241" text-anchor="middle" fill="#192B45" font-size="18">Policy</text>' +
        '<text x="520" y="241" text-anchor="middle" fill="#192B45" font-size="18">Opponent</text>' +
        path('M225 90 H413') + path('M414 164 H226') +
        '<text x="320" y="132" text-anchor="middle" fill="#637389" font-size="18">Game rollout</text>' +
        path('M120 256 V282 H240') + path('M520 256 V282 H400') +
        box(254, 256, 132, 52, 'Outcome');
    } else {
      content = '<rect x="32" y="32" width="204" height="250" rx="8" fill="#FFFFFF" stroke="#B8CAE2"/><path d="M32 65 H236" stroke="#B8CAE2"/><circle cx="48" cy="48" r="3" fill="#B8CAE2"/><circle cx="60" cy="48" r="3" fill="#B8CAE2"/><circle cx="72" cy="48" r="3" fill="#B8CAE2"/>' +
        board(50, 82, 168, false) +
        '<text x="134" y="311" text-anchor="middle" fill="#192B45" font-size="18">Browser bridge</text>' +
        path('M253 111 H374') + path('M374 221 H253') +
        '<text x="313" y="92" text-anchor="middle" fill="#637389" font-size="16">Player view</text>' +
        '<text x="313" y="248" text-anchor="middle" fill="#637389" font-size="16">Suggested move</text>' +
        box(395, 113, 215, 108, 'Local inference', 'Trained model');
    }
    return `<svg viewBox="0 0 640 336" role="img" aria-labelledby="${id}-svg-title" xmlns="http://www.w3.org/2000/svg"><title id="${id}-svg-title">${stages[index].alt}</title><defs><marker id="${arrow}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L7 4 L1 7" fill="none" stroke="#2859C5" stroke-width="1.5"/></marker></defs>${content}</svg>`;
  }

  window.renderFowDemo = function renderFowDemo(target) {
    if (!target || !(target instanceof Element)) return null;
    if (typeof target.fowDemoCleanup === 'function') target.fowDemoCleanup();
    const id = `fow-workflow-${++instanceCount}`;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let timer = null;
    let destroyed = false;
    target.classList.add('fow-demo');
    target.innerHTML = `<div class="fow-demo__toolbar"><span class="fow-demo__label">Illustrated workflow</span><button class="fow-demo__play" type="button" aria-pressed="false"><span aria-hidden="true">▶</span> <span data-play-label>Play walkthrough</span></button></div><div class="fow-demo__tabs" role="tablist" aria-label="Fog-of-War AI workflow stages">${stages.map((stage, index) => `<button class="fow-demo__tab" type="button" role="tab" id="${id}-tab-${index}" aria-controls="${id}-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}" data-stage="${index}"><span class="fow-demo__step" aria-hidden="true">${index + 1}</span>${stage.name}</button>`).join('')}</div><div class="fow-demo__panel" role="tabpanel" id="${id}-panel" aria-labelledby="${id}-tab-0" tabindex="0"><div class="fow-demo__figure"></div><div class="fow-demo__copy"><h4></h4><p></p><ul class="fow-demo__details"></ul></div></div><div class="fow-demo__footer"><span>Conceptual illustration of the engineering workflow.</span><span class="fow-demo__count" aria-hidden="true">1 / 4</span></div><span class="fow-demo__sr" role="status" aria-live="polite"></span>`;

    const tabs = Array.from(target.querySelectorAll('[role="tab"]'));
    const panel = target.querySelector('[role="tabpanel"]');
    const play = target.querySelector('.fow-demo__play');
    const status = target.querySelector('[role="status"]');
    function update(index, announce) {
      if (destroyed) return;
      current = ((index % stages.length) + stages.length) % stages.length;
      const stage = stages[current];
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === current));
        tab.tabIndex = i === current ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', `${id}-tab-${current}`);
      target.querySelector('.fow-demo__figure').innerHTML = illustration(current, id);
      target.querySelector('.fow-demo__copy h4').textContent = stage.title;
      target.querySelector('.fow-demo__copy p').textContent = stage.description;
      target.querySelector('.fow-demo__details').innerHTML = stage.details.map(item => `<li>${item}</li>`).join('');
      target.querySelector('.fow-demo__count').textContent = `${current + 1} / ${stages.length}`;
      if (announce) status.textContent = `${stage.name}. ${stage.title}`;
    }
    function pause() {
      window.clearInterval(timer);
      timer = null;
      play.setAttribute('aria-pressed', 'false');
      play.querySelector('[aria-hidden]').textContent = '▶';
      play.querySelector('[data-play-label]').textContent = 'Play walkthrough';
    }
    function start() {
      if (timer || destroyed) return;
      play.setAttribute('aria-pressed', 'true');
      play.querySelector('[aria-hidden]').textContent = 'Ⅱ';
      play.querySelector('[data-play-label]').textContent = 'Pause walkthrough';
      timer = window.setInterval(() => update(current + 1, false), 4500);
    }
    function onClick(event) {
      const tab = event.target.closest('[data-stage]');
      if (tab && target.contains(tab)) {
        pause();
        update(Number(tab.dataset.stage), true);
      } else if (play.contains(event.target)) {
        if (timer) pause(); else start();
      }
    }
    function onKeydown(event) {
      if (!event.target.matches('[role="tab"]')) return;
      let index = Number(event.target.dataset.stage);
      if (event.key === 'ArrowRight') index += 1;
      else if (event.key === 'ArrowLeft') index -= 1;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = stages.length - 1;
      else return;
      event.preventDefault();
      pause();
      update(index, true);
      tabs[current].focus();
    }
    function onVisibility() { if (document.hidden) pause(); }
    function onMotionChange() { if (motionQuery.matches) pause(); }
    function onFocus(event) { if (event.target.closest('[role="tablist"], [role="tabpanel"]')) pause(); }
    target.addEventListener('click', onClick);
    target.addEventListener('keydown', onKeydown);
    target.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    motionQuery.addEventListener('change', onMotionChange);
    update(0, false);
    const api = {
      setStage(index) { pause(); update(index, true); },
      destroy() {
        pause();
        destroyed = true;
        target.removeEventListener('click', onClick);
        target.removeEventListener('keydown', onKeydown);
        target.removeEventListener('focusin', onFocus);
        document.removeEventListener('visibilitychange', onVisibility);
        motionQuery.removeEventListener('change', onMotionChange);
      }
    };
    target.fowDemoCleanup = api.destroy;
    return api;
  };
}());
