(() => {
  'use strict';

  const pageIds = ['about', 'chess-analysis', 'fog-of-war', 'research'];
  const pages = pageIds.map(id => document.getElementById(id)).filter(page => page?.matches('[data-page]'));
  const byId = new Map(pages.map(page => [page.id, page]));
  if (!byId.has('about')) return;

  const links = [...document.querySelectorAll('[data-nav]')];
  const aliases = {
    experience: 'chess-analysis',
    work: 'chess-analysis',
    'chess-engineering': 'chess-analysis',
    'fow-workflow': 'fog-of-war',
    'fow-engineering': 'fog-of-war'
  };
  const titles = {
    about: 'Jiufu Zhou',
    'chess-analysis': 'Chess analysis and coaching — Jiufu Zhou',
    'fog-of-war': 'Fog of War chess AI — Jiufu Zhou',
    research: 'Research — Jiufu Zhou'
  };
  const headingIds = {
    about: 'about-title',
    'chess-analysis': 'chess-title',
    'fog-of-war': 'fow-title',
    research: 'research-title'
  };
  let activePage = null;
  let pendingClick = null;

  function decodeHash(hash) {
    try { return decodeURIComponent(hash.replace(/^#/, '')); }
    catch { return null; }
  }

  function resolve(hash) {
    const id = decodeHash(hash);
    if (id === 'main') return { kind: 'main', recognized: true };
    if (id === '') return { page: byId.get('about'), recognized: true };
    const direct = byId.get(aliases[id] || id);
    if (direct) return { page: direct, recognized: true };
    const target = id && document.getElementById(id);
    const parent = target?.closest('[data-page]');
    if (parent && byId.get(parent.id) === parent) return { page: parent, recognized: true };
    return { page: byId.get('about'), recognized: false };
  }

  function focus(element) {
    if (!element) return;
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  }

  function focusPageHeading(page) {
    const heading = page.querySelector('[data-page-heading]')
      || page.querySelector(`#${headingIds[page.id]}`)
      || page.querySelector('h1, h2, h3');
    focus(heading);
  }

  function show(page, moveFocus) {
    if (page !== activePage) {
      // Players must stop while their controls are still visible.
      document.dispatchEvent(new Event('pagechange'));
      pages.forEach(candidate => {
        const active = candidate === page;
        candidate.hidden = !active;
        candidate.classList.toggle('is-active', active);
      });
      activePage = page;
    }
    links.forEach(link => {
      const selected = resolve(link.getAttribute('href') || '').page === page;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = titles[page.id];
    window.scrollTo(0, 0);
    if (moveFocus) focusPageHeading(page);
  }

  function applyHash(moveFocus) {
    const route = resolve(window.location.hash);
    if (route.kind === 'main') {
      if (!activePage) show(byId.get('about'), false);
      window.scrollTo(0, 0);
      if (moveFocus) focus(document.getElementById('main'));
      return;
    }
    show(route.page, moveFocus);
  }

  window.addEventListener('hashchange', event => {
    // Rapid link clicks may queue an older hashchange after the URL moved on.
    if (event.newURL && new URL(event.newURL).hash !== window.location.hash) return;
    const id = decodeHash(window.location.hash);
    const moveFocus = pendingClick?.id === id ? pendingClick.moveFocus : true;
    pendingClick = null;
    applyHash(moveFocus);
  });

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const hash = link.getAttribute('href');
    if (!hash?.startsWith('#')) return;
    const route = resolve(hash);
    if (!route.recognized && !link.hasAttribute('data-nav')) return;
    event.preventDefault();

    if (route.kind === 'main') {
      window.scrollTo(0, 0);
      focus(document.getElementById('main'));
      return;
    }

    const moveFocus = event.detail === 0;
    const id = decodeHash(hash);
    if (decodeHash(window.location.hash) === id) {
      pendingClick = null;
      show(route.page, moveFocus);
      return;
    }
    pendingClick = { id, moveFocus };
    window.location.hash = hash;
  });

  applyHash(false);
})();
