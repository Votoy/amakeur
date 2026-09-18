/**
 * AMAKEUR craft layer — shortcuts, externals, easter eggs, progress, clock.
 * Quiet, subtractive; respects prefers-reduced-motion + coarse pointer.
 */
(function () {
  const REDUCE = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COARSE = () => window.matchMedia('(pointer: coarse)').matches;
  const BUILD = typeof window.__AMAKEUR_BUILD__ === 'string' ? window.__AMAKEUR_BUILD__ : 'dev';

  /* —— Console stamp (once) —— */
  if (!window.__AMAKEUR_STAMPED__) {
    window.__AMAKEUR_STAMPED__ = true;
    const sty = 'font-weight:600;font-size:12px;color:#b85c38';
    console.log('%cAMAKEUR｜野造', sty);
    console.log("%cI don't code. I make.", 'font-style:italic');
    console.log('%cbuild ' + BUILD + ' · press ? for shortcuts · type make · long-press 野造', 'color:#9a948c;font-size:11px');
  }

  /* —— External links —— */
  function enhanceExternals(root) {
    const scope = root || document;
    scope.querySelectorAll('a[href^="http"]').forEach((a) => {
      try {
        const u = new URL(a.href);
        if (u.origin === window.location.origin) return;
        if (a.dataset.extDone === '1') return;
        a.dataset.extDone = '1';
        a.classList.add('ext-link');
        if (!a.getAttribute('rel')) {
          a.setAttribute('rel', 'noopener noreferrer');
        } else {
          const rel = new Set(a.getAttribute('rel').split(/\s+/).filter(Boolean));
          rel.add('noopener');
          rel.add('noreferrer');
          a.setAttribute('rel', [...rel].join(' '));
        }
        if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
        if (!a.querySelector('.ext-arrow')) {
          const tip = document.createElement('span');
          tip.className = 'ext-arrow';
          tip.setAttribute('aria-hidden', 'true');
          tip.textContent = '↗';
          a.appendChild(tip);
        }
      } catch (_) {}
    });
  }

  /* —— Nav sliding indicator —— */
  function placeNavIndicator() {
    const nav = document.getElementById('primary-nav');
    const ind = document.getElementById('nav-indicator');
    if (!nav || !ind) return;
    const active = nav.querySelector('[data-nav-active="true"]');
    if (!active) {
      ind.style.opacity = '0';
      return;
    }
    const nr = nav.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    const pad = 12; // matches px-3
    const left = ar.left - nr.left + pad;
    const width = Math.max(12, ar.width - pad * 2);
    ind.style.width = width + 'px';
    ind.style.transform = 'translateX(' + left + 'px)';
    ind.style.opacity = '1';
  }

  /* —— Logo 5× wink —— */
  function initLogoWink() {
    const brand = document.getElementById('brand-link');
    if (!brand || brand.dataset.winkBound === '1') return;
    brand.dataset.winkBound = '1';
    let count = 0;
    let resetTimer = 0;
    brand.addEventListener('click', (e) => {
      // allow navigation on normal clicks; only wink after 5 rapid taps without leaving
      count += 1;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => { count = 0; }, 900);
      if (count < 5) return;
      count = 0;
      e.preventDefault();
      const label = brand.querySelector('span');
      if (!label || REDUCE()) {
        brand.classList.add('is-wink');
        window.setTimeout(() => brand.classList.remove('is-wink'), 400);
        return;
      }
      const text = label.textContent || 'AMAKEUR';
      label.innerHTML = '';
      [...text].forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = 'logo-bounce-char';
        s.textContent = ch;
        s.style.animationDelay = i * 28 + 'ms';
        label.appendChild(s);
      });
      window.setTimeout(() => {
        label.textContent = text;
      }, 420);
    });
  }

  /* —— Reading progress —— */
  function initProgress() {
    const bar = document.getElementById('read-progress');
    const article = document.querySelector('[data-read-progress]');
    if (!bar || !article) {
      if (bar) bar.style.transform = 'scaleX(0)';
      return;
    }
    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 1;
      bar.style.transform = 'scaleX(' + p + ')';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* —— Copy link —— */
  function initCopyLink() {
    const btn = document.getElementById('copy-link');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    const label = btn.querySelector('[data-copy-label]');
    btn.addEventListener('click', async () => {
      const url = btn.dataset.url || window.location.href;
      try {
        await navigator.clipboard.writeText(url);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      btn.classList.add('is-copied');
      if (label) label.textContent = 'Copied';
      window.setTimeout(() => {
        btn.classList.remove('is-copied');
        if (label) label.textContent = 'Copy link';
      }, 1500);
    });
  }

  /* —— Footer clock + one-liner —— */
  const WIT = [
    'Amateur at code. Serious about making.',
    '野造 · make without permission',
    'Shipped with NL, AI, and stubborn taste.',
    '造物，不造势。',
    'No degree required. Curiosity preferred.',
    'Quiet tools. Loud intent.',
    'Last built before the coffee cooled.',
    'Slightly imperfect. Fully alive.',
  ];

  function initFooterStudio() {
    const clock = document.getElementById('studio-clock');
    const line = document.getElementById('studio-wit');
    const built = document.getElementById('studio-built');
    if (line && !line.dataset.set) {
      line.dataset.set = '1';
      line.textContent = WIT[Math.floor(Math.random() * WIT.length)];
    }
    if (built && !built.dataset.set) {
      built.dataset.set = '1';
      built.textContent = 'built ' + BUILD;
      built.title = 'Build ' + BUILD;
    }
    if (!clock) return;
    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      clock.textContent = hh + ':' + mm + ':' + ss;
      clock.setAttribute('datetime', now.toISOString());
    };
    tick();
    if (clock.dataset.timer) window.clearInterval(Number(clock.dataset.timer));
    clock.dataset.timer = String(window.setInterval(tick, 1000));
  }

  /* —— Shortcuts sheet —— */
  function ensureSheet() {
    let el = document.getElementById('shortcuts-sheet');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'shortcuts-sheet';
    el.className = 'shortcuts-sheet';
    el.setAttribute('hidden', '');
    el.innerHTML =
      '<div class="shortcuts-backdrop" data-close></div>' +
      '<div class="shortcuts-panel" role="dialog" aria-modal="true" aria-labelledby="shortcuts-title" tabindex="-1">' +
      '<div class="shortcuts-head">' +
      '<h2 id="shortcuts-title">Shortcuts</h2>' +
      '<button type="button" class="shortcuts-x" data-close aria-label="Close">Esc</button>' +
      '</div>' +
      '<ul class="shortcuts-list">' +
      '<li><kbd>?</kbd><span>Open this sheet</span></li>' +
      '<li><kbd>t</kbd><span>Toggle theme</span></li>' +
      '<li><kbd>g</kbd> <kbd>a</kbd><span>Apps</span></li>' +
      '<li><kbd>g</kbd> <kbd>b</kbd><span>Blog</span></li>' +
      '<li><kbd>g</kbd> <kbd>g</kbd><span>Games</span></li>' +
      '<li><kbd>g</kbd> <kbd>w</kbd><span>Web</span></li>' +
      '<li><kbd>g</kbd> <kbd>l</kbd><span>Labs</span></li>' +
      '<li><kbd>g</kbd> <kbd>h</kbd><span>Home</span></li>' +
      '<li><kbd>make</kbd><span>Reveal the lockup</span></li>' +
      '<li><kbd>esc</kbd><span>Close</span></li>' +
      '</ul>' +
      '</div>';
    document.body.appendChild(el);
    el.addEventListener('click', (e) => {
      if (e.target && e.target.closest('[data-close]')) closeSheet();
    });
    return el;
  }

  let lastFocus = null;
  function openSheet() {
    const el = ensureSheet();
    lastFocus = document.activeElement;
    el.removeAttribute('hidden');
    el.classList.add('is-open');
    const panel = el.querySelector('.shortcuts-panel');
    panel && panel.focus();
    document.documentElement.classList.add('shortcuts-open');
  }
  function closeSheet() {
    const el = document.getElementById('shortcuts-sheet');
    if (!el) return;
    el.setAttribute('hidden', '');
    el.classList.remove('is-open');
    document.documentElement.classList.remove('shortcuts-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function isSheetOpen() {
    const el = document.getElementById('shortcuts-sheet');
    return el && !el.hasAttribute('hidden');
  }

  function go(path) {
    closeSheet();
    if (window.location.pathname === path) return;
    window.location.href = path;
  }

  let gPending = false;
  let gTimer = 0;

  function onKey(e) {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === 'Escape') {
      if (isSheetOpen()) {
        e.preventDefault();
        closeSheet();
      }
      gPending = false;
      return;
    }

    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      if (isSheetOpen()) closeSheet();
      else openSheet();
      return;
    }

    if (isSheetOpen()) return;

    if (e.key === 't' || e.key === 'T') {
      const btn = document.getElementById('theme-toggle');
      if (btn) {
        e.preventDefault();
        btn.click();
      }
      return;
    }

    if (e.key === 'g' || e.key === 'G') {
      gPending = true;
      window.clearTimeout(gTimer);
      gTimer = window.setTimeout(() => { gPending = false; }, 800);
      return;
    }

    if (gPending) {
      gPending = false;
      window.clearTimeout(gTimer);
      const k = e.key.toLowerCase();
      const map = { a: '/apps', b: '/blog', g: '/games', w: '/web', l: '/labs', h: '/', o: '/about' };
      if (map[k]) {
        e.preventDefault();
        go(map[k]);
      }
    }
  }

  function initKeys() {
    if (window.__AMAKEUR_KEYS__) return;
    window.__AMAKEUR_KEYS__ = true;
    window.addEventListener('keydown', onKey);
  }

  /* —— Image fade-in —— */
  function initImages() {
    document.querySelectorAll('img:not([data-fade]), figure:not([data-fade])').forEach((el) => {
      el.dataset.fade = '1';
      if (el.tagName === 'IMG') {
        if (!el.getAttribute('alt')) el.setAttribute('alt', '');
        const apply = () => el.classList.add('is-shown');
        if (el.complete) apply();
        else el.addEventListener('load', apply, { once: true });
        el.classList.add('img-fade');
      } else {
        el.classList.add('fig-fade', 'is-shown');
      }
    });
  }

  function boot() {
    enhanceExternals(document);
    placeNavIndicator();
    initLogoWink();
    initProgress();
    initCopyLink();
    initFooterStudio();
    initKeys();
    initImages();
    ensureSheet();
  }

  boot();
  document.addEventListener('astro:page-load', boot);
  document.addEventListener('astro:after-swap', () => {
    // re-bind indicator after view transition swap
    requestAnimationFrame(placeNavIndicator);
  });
  window.addEventListener('resize', () => {
    placeNavIndicator();
  });
})();
