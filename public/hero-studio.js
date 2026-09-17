(function () {
  const FINAL = "I don't code. I make.";
  const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz·—/';
  const REDUCE = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showToast(msg) {
    let el = document.querySelector('.studio-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'studio-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-on');
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => el.classList.remove('is-on'), 1800);
  }

  function initHero() {
    const stage = document.getElementById('hero-stage');
    const line = document.getElementById('hero-line');
    const secondary = document.getElementById('hero-secondary');
    const secInner = document.getElementById('hero-sec-inner');
    const section = stage && stage.closest('.hero-studio');
    const hint = document.getElementById('hero-hint');
    if (!stage || !line || !secondary || !secInner || stage.dataset.bound === '1') return;
    stage.dataset.bound = '1';

    line.innerHTML = '';
    const chars = [];
    [...FINAL].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'hero-char' + (ch === ' ' ? ' is-space' : '');
      const makeStart = FINAL.indexOf('make');
      if (i >= makeStart && i < makeStart + 4) span.classList.add('is-accent');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.dataset.final = ch === ' ' ? ' ' : ch;
      line.appendChild(span);
      chars.push(span);
    });

    let locked = false;
    let typed = '';

    const openSecondary = (force) => {
      if (locked && !force) return;
      secondary.classList.add('is-open');
      stage.setAttribute('aria-expanded', 'true');
      const base = secondary.dataset.line || '';
      secInner.innerHTML = '';
      const parts = base.split('code');
      if (parts.length === 2) {
        secInner.appendChild(document.createTextNode(parts[0]));
        const morph = document.createElement('span');
        morph.className = 'morph';
        morph.textContent = 'code';
        secInner.appendChild(morph);
        secInner.appendChild(document.createTextNode(parts[1]));
        if (!REDUCE()) {
          let step = 0;
          const from = 'code';
          const to = 'make';
          const tick = () => {
            step++;
            if (step <= to.length) {
              morph.textContent = to.slice(0, step) + from.slice(step);
              window.setTimeout(tick, 70);
            } else {
              morph.textContent = to;
            }
          };
          window.setTimeout(tick, 180);
        } else {
          morph.textContent = 'make';
        }
      } else {
        secInner.textContent = base;
      }
    };

    const closeSecondary = () => {
      secondary.classList.remove('is-open');
      stage.setAttribute('aria-expanded', 'false');
    };

    const runScramble = () => {
      if (REDUCE()) {
        chars.forEach((c) => {
          c.textContent = c.dataset.final === ' ' ? '\u00A0' : c.dataset.final || '';
        });
        if (hint) hint.classList.add('is-on');
        return;
      }
      chars.forEach((c) => c.classList.add('is-scrambling'));
      let frame = 0;
      const total = 18;
      const id = window.setInterval(() => {
        frame++;
        chars.forEach((c, i) => {
          const settleAt = 6 + Math.floor((i / chars.length) * 10);
          if (frame >= settleAt) {
            c.textContent = c.dataset.final === ' ' ? '\u00A0' : c.dataset.final || '';
            c.classList.remove('is-scrambling');
          } else if (c.dataset.final !== ' ') {
            c.textContent = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
          }
        });
        if (frame >= total) {
          window.clearInterval(id);
          if (hint) hint.classList.add('is-on');
        }
      }, 28);
    };

    runScramble();

    const onMove = (e) => {
      if (REDUCE() || window.matchMedia('(pointer: coarse)').matches) return;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty('--spot-x', x + 'px');
      section.style.setProperty('--spot-y', y + 'px');
      section.classList.add('is-lit');

      chars.forEach((c) => {
        if (c.classList.contains('is-space')) return;
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 110;
        if (dist < radius) {
          const force = (1 - dist / radius) * 8;
          c.style.transform = 'translate(' + ((dx / dist) * force || 0) + 'px, ' + ((dy / dist) * force || 0) + 'px)';
        } else {
          c.style.transform = '';
        }
      });
    };

    const onLeave = () => {
      if (section) section.classList.remove('is-lit');
      chars.forEach((c) => { c.style.transform = ''; });
    };

    if (section) {
      section.addEventListener('pointermove', onMove);
      section.addEventListener('pointerleave', onLeave);
    }

    stage.addEventListener('click', () => {
      locked = !locked;
      if (locked) openSecondary(true);
      else closeSecondary();
    });

    document.querySelectorAll('[data-chip]').forEach((chip) => {
      chip.addEventListener('pointermove', (e) => {
        if (REDUCE()) return;
        const r = chip.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        chip.style.setProperty('--mx', px * 6 + 'px');
        chip.style.setProperty('--my', py * 4 + 'px');
        chip.style.setProperty('--tilt', px * -4 + 'deg');
      });
      chip.addEventListener('pointerleave', () => {
        chip.style.setProperty('--mx', '0px');
        chip.style.setProperty('--my', '0px');
        chip.style.setProperty('--tilt', '0deg');
      });
    });

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (typed.endsWith('make')) {
        locked = true;
        openSecondary(true);
        showToast('Serious about making.');
        typed = '';
        if (document.documentElement.animate) {
          document.documentElement.animate(
            [{ filter: 'none' }, { filter: 'sepia(0.12)' }, { filter: 'none' }],
            { duration: 480, easing: 'ease-out' },
          );
        }
      }
    };
    window.addEventListener('keydown', onKey);
  }

  initHero();
  document.addEventListener('astro:page-load', initHero);
})();
