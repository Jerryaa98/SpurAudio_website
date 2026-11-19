/* SpurAudio project page: interactions and animations.
   Data comes from data.js (parsed from the paper's LaTeX tables) and clips.js (real test clips). */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const D = window.SPUR_DATA || null;
  const CLIPS = window.SPUR_CLIPS || [];
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceMQ.matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
  const easeOut = t => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  const SVGNS = 'http://www.w3.org/2000/svg';

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function sv(tag, attrs, text) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; }
  function rng(seed) { let x = (seed >>> 0) || 1; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }
  function hash(a, b, s) { let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) + Math.imul(s | 0, 1442695041)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  function smooth(x, s) { const i = Math.floor(x), t = x - i, a = hash(i, 7, s), b = hash(i + 1, 7, s); return a + (b - a) * t * t * (3 - 2 * t); }
  function safe(name, fn) { try { fn(); } catch (err) { if (window.console) console.error('[spuraudio] ' + name + ' failed:', err); } }
  function onVisible(node, cb, opts) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } }); }, opts || { threshold: 0.2 });
    io.observe(node);
  }
  function segGroup(root, onChange) {
    if (!root) return () => {};   // a missing control must never fall back to every button on the page
    const btns = $$('button', root);
    btns.forEach(b => b.addEventListener('click', () => {
      if (b.getAttribute('aria-pressed') === 'true') return;
      btns.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      onChange(b.dataset.v, true);
    }));
    return v => btns.forEach(o => o.setAttribute('aria-pressed', String(o.dataset.v === v)));
  }

  // One tab stop per widget; arrow keys (and Home/End) move between its items.
  function roving(root, sel, cols) {
    const items = () => $$(sel, root);
    items().forEach((n, i) => { n.tabIndex = i ? -1 : 0; });
    if (root._roving) return;
    root._roving = true;
    root.addEventListener('keydown', e => {
      const step = { ArrowDown: cols || 1, ArrowUp: -(cols || 1), ArrowRight: cols ? 1 : 0, ArrowLeft: cols ? -1 : 0 }[e.key];
      if (!step && e.key !== 'Home' && e.key !== 'End') return;
      const list = items(), i = list.indexOf(document.activeElement);
      if (i < 0) return;
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : clamp(i + step, 0, list.length - 1);
      list[j].focus(); e.preventDefault();
    });
    root.addEventListener('focusin', e => { const list = items(); if (list.indexOf(e.target) >= 0) list.forEach(n => { n.tabIndex = n === e.target ? 0 : -1; }); });
  }

  /* colour ramp shared by the hero and the rendered spectrogram images */
  const RAMP = [[0, 8, 8, 13], [.10, 17, 14, 43], [.26, 28, 29, 102], [.41, 33, 72, 163], [.54, 28, 130, 171], [.65, 34, 176, 156], [.75, 119, 203, 108], [.85, 220, 214, 75], [.93, 255, 207, 85], [1, 255, 244, 207]];
  function rampColor(t) {
    t = clamp(t, 0, 1);
    for (let i = 1; i < RAMP.length; i++) if (t <= RAMP[i][0]) {
      const a = RAMP[i - 1], b = RAMP[i], u = (t - a[0]) / (b[0] - a[0]);
      return 'rgb(' + Math.round(lerp(a[1], b[1], u)) + ',' + Math.round(lerp(a[2], b[2], u)) + ',' + Math.round(lerp(a[3], b[3], u)) + ')';
    }
    return 'rgb(255,244,207)';
  }

  /* ================================================================== tooltip (shared) */
  const tipEl = $('#tip');
  const Tip = {
    show(title, rows, x, y) {
      if (!tipEl) return;
      tipEl.textContent = '';
      tipEl.appendChild(el('div', 'tt', title));
      rows.forEach(r => {
        const row = el('div', 'tr');
        const key = el('i'); key.style.background = r.color || 'transparent'; row.appendChild(key);
        row.appendChild(el('b', null, r.value));
        row.appendChild(document.createTextNode(r.label));
        if (r.sub) row.appendChild(el('small', null, r.sub));
        tipEl.appendChild(row);
      });
      tipEl.hidden = false;
      this.move(x, y);
    },
    move(x, y) {
      if (!tipEl || tipEl.hidden) return;
      const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
      let left = x + 16, top = y - h - 12;
      if (left + w > window.innerWidth - 8) left = x - w - 16;
      if (left < 8) left = 8;
      if (top < 8) top = y + 18;
      tipEl.style.transform = 'translate(' + Math.round(left) + 'px,' + Math.round(top) + 'px)';
    },
    hide() { if (tipEl) tipEl.hidden = true; this.anchor = null; },
    anchor: null   // set while the tooltip belongs to a keyboard-focused mark
  };
  function bindTip(node, getContent) {
    const show = (x, y) => { const c = getContent(); if (c) Tip.show(c.title, c.rows, x, y); };
    const atNode = () => { const r = node.getBoundingClientRect(); return [r.left + r.width / 2, r.top]; };
    node.addEventListener('pointerenter', e => { Tip.anchor = null; show(e.clientX, e.clientY); });
    node.addEventListener('pointermove', e => { if (!Tip.anchor) Tip.move(e.clientX, e.clientY); });
    node.addEventListener('pointerleave', () => { if (!Tip.anchor) Tip.hide(); });
    node.addEventListener('focus', () => { const p = atNode(); show(p[0], p[1]); Tip.anchor = node; node._tipAt = atNode; });
    node.addEventListener('blur', () => Tip.hide());
  }
  // a pointer tooltip is dismissed by scrolling; a focus tooltip follows its mark instead
  window.addEventListener('scroll', () => { if (Tip.anchor) { const p = Tip.anchor._tipAt(); Tip.move(p[0], p[1]); } else Tip.hide(); }, { passive: true });

  /* ================================================================== hero: a spectrogram being mixed live
     A procedural mel-spectrogram scrolls in from the right. Each episode writes three clips:
     a support clip, a query with the same background (IID), and a query whose background was swapped (OOD).
     Bright cells are the foreground event, cool cells the background. Illustrative only. */
  safe('hero', function heroSpectrogram() {
    const hero = $('#top'), cvs = $('#spec');
    if (!hero || !cvs || !cvs.getContext) return;
    const ctx = cvs.getContext('2d');
    const hud = $('#hud'), hudEp = $('#hud-ep'), hudChip = $('#hud-chip');
    const LEVELS = 30, PAL = [];
    for (let i = 0; i < LEVELS; i++) PAL.push(rampColor(i / (LEVELS - 1)));
    const EPS = [
      { fg: 'coughing', fgKind: 'cough', sup: ['thunderstorm', 'thunder'], ood: ['vacuum cleaner', 'vacuum'] },
      { fg: 'pig', fgKind: 'pig', sup: ['church bells', 'bells'], ood: ['siren', 'siren'] },
      { fg: 'crow', fgKind: 'crow', sup: ['rain', 'rain'], ood: ['thunderstorm', 'thunder'] },
      { fg: 'coughing', fgKind: 'cough', sup: ['wind', 'wind'], ood: ['vacuum cleaner', 'vacuum'] },
    ];
    const KCOL = { support: '255,194,74', iid: '26,168,152', ood: '217,70,63' };
    const off = document.createElement('canvas'), octx = off.getContext('2d');
    let W = 0, H = 0, dpr = 1, pitch = 11, pitchD = 11, cellD = 9, rows = 0, cols = 0, bandTop = 62, segLen = 38, speed = 44;
    let t = 0, gen = -1, segs = [], cursor = 0, epIdx = 0, epNo = 0, phase = 0, seed = 5;
    let raf = 0, last = 0, onscreen = true, hudKey = '';

    const FG = {
      cough(c, r, f, R, s, ev) {
        let v = 0;
        for (let i = 0; i < ev.length; i++) {
          const d = c - ev[i];
          if (d < 0 || d > 4) continue;
          const amp = [1, .92, .56, .3, .14][d];
          v = Math.max(v, amp * (.52 + .48 * Math.exp(-f * 2.3)) * (.7 + .3 * hash(c, r, s)) * (f > .9 ? .45 : 1));
        }
        return v;
      },
      pig(c, r, f, R, s, ev) {
        let v = 0;
        for (let i = 0; i < ev.length; i++) {
          const d = c - ev[i];
          if (d < 0 || d >= 7) continue;
          const env = Math.pow(Math.sin(Math.PI * (d + .5) / 7), .7);
          const f0 = .085 * (1 + .2 * Math.sin(d * .9 + ev[i]));
          for (let k = 1; k <= 10; k++) {
            const fk = k * f0; if (fk > .98) break;
            const dist = Math.abs(f - fk) * (R - 1);
            if (dist < .9) v = Math.max(v, env * (1 - dist / .9) * (.55 + .45 * Math.exp(-Math.pow((fk - .38) / .22, 2))) * (.85 + .15 * hash(c, r, s)));
          }
          v = Math.max(v, .26 * env * hash(c, r, s + 3) * (f < .8 ? 1 : .4));
        }
        return v;
      },
      crow(c, r, f, R, s, ev) {
        let v = 0;
        for (let i = 0; i < ev.length; i++) {
          const d = c - ev[i];
          if (d < 0 || d >= 6) continue;
          const env = Math.pow(Math.sin(Math.PI * (d + .5) / 6), .6);
          const f0 = .13 * (1 + .1 * Math.sin(Math.PI * d / 6));
          for (let k = 2; k <= 7; k++) {
            const fk = k * f0; if (fk > .98) break;
            const dist = Math.abs(f - fk) * (R - 1);
            if (dist < .9) v = Math.max(v, env * (1 - dist / .9) * (.5 + .5 * Math.exp(-Math.pow((fk - .46) / .2, 2))) * (.86 + .14 * hash(c, r, s)));
          }
          if (f > .22 && f < .72) v = Math.max(v, .34 * env * hash(c, r, s + 9));
        }
        return v;
      }
    };
    const BG = {
      thunder(c, r, f, R, s, x) {
        let v = Math.exp(-f * 4) * (.4 + .25 * smooth(c / 5, s)) + (.11 + .12 * hash(c, r, s + 5)) * (.5 + .5 * f);
        for (let i = 0; i < x.length; i++) { const d = c - x[i]; if (d >= 0) v += .42 * Math.exp(-d / 6) * Math.exp(-f * 2); }
        return Math.min(.62, v);
      },
      vacuum(c, r, f, R, s) {
        const lines = [.14, .27, .41, .6, .78];
        for (let k = 0; k < lines.length; k++) if (r === Math.round(lines[k] * (R - 1))) return .54 + .07 * smooth(c / 3 + k * 9, s);
        return .2 + .13 * hash(c, r, s);
      },
      bells(c, r, f, R, s, x) {
        const part = [.1, .19, .27, .36, .5, .66], tau = [10, 8, 7, 5.5, 4.5, 3.5];
        let v = .08 + .08 * hash(c, r, s);
        for (let i = 0; i < x.length; i++) {
          const d = c - x[i]; if (d < 0) continue;
          if (d === 0) v = Math.max(v, .36 * (1 - f * .5));
          for (let k = 0; k < part.length; k++) if (r === Math.round(part[k] * (R - 1))) v = Math.max(v, .62 * Math.exp(-d / tau[k]));
        }
        return v;
      },
      siren(c, r, f, R, s) {
        let v = .07 + .07 * hash(c, r, s);
        const f0 = .27 + .11 * Math.sin(c * .52 + s);
        for (let k = 1; k <= 3; k++) {
          const fk = k * f0; if (fk > .98) break;
          const dist = Math.abs(f - fk) * (R - 1);
          if (dist < 1) v = Math.max(v, (1 - dist) * (.62 - .1 * k));
        }
        return v;
      },
      rain(c, r, f, R, s) { return (.2 + .2 * hash(c, r, s)) * (.75 + .45 * f) * (.8 + .3 * smooth(c / 7, s)); },
      wind(c, r, f, R, s) { const cf = .28 + .2 * smooth(c / 9, s); return .06 + .5 * Math.exp(-Math.pow((f - cf) / .15, 2)) * (.7 + .3 * hash(c, r, s)); }
    };

    function synth(fgKind, bgKind, len, R, s) {
      const a = new Float32Array(len * R), rnd = rng(s * 9973 + 17), ev = [], x = [];
      const gap = fgKind === 'cough' ? [7, 9] : fgKind === 'pig' ? [9, 4] : [8, 3];
      for (let c = 2 + (rnd() * 3 | 0); c < len - 6; c += gap[0] + (rnd() * gap[1] | 0)) ev.push(c);
      if (bgKind === 'bells') for (let c = 1 + (rnd() * 4 | 0); c < len; c += 11 + (rnd() * 4 | 0)) x.push(c);
      if (bgKind === 'thunder') { x.push(4 + (rnd() * 8 | 0)); x.push(20 + (rnd() * 10 | 0)); }
      for (let c = 0; c < len; c++) for (let r = 0; r < R; r++) {
        const f = r / (R - 1), fg = FG[fgKind](c, r, f, R, s, ev);
        // lift the foreground into the warm end of the ramp so the event reads apart from its background
        a[c * R + r] = Math.min(1, Math.max(fg > .05 ? .5 + .5 * Math.pow(fg, .55) : 0, BG[bgKind](c, r, f, R, s + 31, x)));
      }
      return a;
    }
    function nextSeg() {
      const ep = EPS[epIdx % EPS.length], kind = ['support', 'iid', 'ood'][phase];
      if (phase === 0) epNo++;
      const bg = kind === 'ood' ? ep.ood : ep.sup;
      segs.push({ start: cursor, len: segLen, kind: kind, fg: ep.fg, bg: bg[0], ep: epNo, data: synth(ep.fgKind, bg[1], segLen, rows, seed++) });
      cursor += segLen + 3;
      phase = (phase + 1) % 3; if (phase === 0) epIdx++;
      while (segs.length > 14) segs.shift();
    }
    function segFor(c) {
      while (cursor <= c) nextSeg();
      for (let i = segs.length - 1; i >= 0; i--) { const s = segs[i]; if (c >= s.start) return c < s.start + s.len ? s : null; }
      return null;
    }
    function setHud(s) {
      if (!hud) return;
      const label = s.kind === 'support' ? 'support · ' + s.fg + ' + ' + s.bg : s.kind === 'iid' ? 'IID query · same background ✓' : 'OOD query · now with ' + s.bg + ' ✗';
      if (label === hudKey) return;
      hudKey = label; hudChip.textContent = label; hud.dataset.state = s.kind; hudEp.textContent = String(s.ep).padStart(2, '0');
    }
    function genColumn(c, quiet) {
      const s = segFor(c);
      octx.globalCompositeOperation = 'copy';
      octx.drawImage(off, -pitchD, 0);
      octx.globalCompositeOperation = 'source-over';
      const x = cols * pitchD, g = (pitchD - cellD) >> 1;
      let lastLv = -2;
      for (let r = 0; r < rows; r++) {
        const e = s ? s.data[(c - s.start) * rows + r] : 0;
        const lv = e < .06 ? -1 : Math.round(e * (LEVELS - 1));
        if (lv !== lastLv) { octx.fillStyle = lv < 0 ? '#0f0f19' : PAL[lv]; lastLv = lv; }
        octx.fillRect(x + g, (rows - 1 - r) * pitchD + g, cellD, cellD);
      }
      if (s && c === s.start && !quiet) setHud(s);
    }
    function pill(x, y, text, kind) {
      ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
      const w = Math.ceil(ctx.measureText(text).width) + 30, h = 22;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, 11); else ctx.rect(x, y, w, h);
      ctx.fillStyle = 'rgba(8,8,13,.84)'; ctx.fill();
      ctx.strokeStyle = 'rgba(' + KCOL[kind] + ',.75)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'rgb(' + KCOL[kind] + ')'; ctx.fillRect(x + 10, y + 7.5, 7, 7);
      ctx.fillStyle = '#e9e6ef'; ctx.textBaseline = 'middle'; ctx.fillText(text, x + 22, y + h / 2 + .5);
      return w;
    }
    function draw() {
      const frac = t - Math.floor(t);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.drawImage(off, Math.round(cvs.width + (1 - frac) * pitchD - off.width), Math.round(bandTop * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const xOf = c => W + (1 - frac) * pitch - (gen - c + 1) * pitch;
      for (let i = 0; i < segs.length; i++) {
        const s = segs[i], x0 = xOf(s.start), x1 = xOf(s.start + s.len);
        if (x1 < 0 || x0 > W) continue;
        ctx.fillStyle = 'rgba(' + KCOL[s.kind] + ',.6)';
        ctx.fillRect(Math.max(0, x0), bandTop - 6, Math.min(W, x1) - Math.max(0, x0) - 2, 2);
        if (W < 560 && s.kind === 'support') continue;
        const verb = s.kind === 'support' ? 'SUPPORT' : s.kind === 'iid' ? 'QUERY · IID' : 'QUERY · OOD';
        const txt = W < 560 ? verb + (s.kind === 'iid' ? ' ✓' : ' ✗') : verb + '  ' + s.fg + ' + ' + s.bg + (s.kind === 'iid' ? '  ✓' : s.kind === 'ood' ? '  ✗' : '');
        if (x0 + 6 < W - 40) pill(x0 + 6, bandTop + 8, txt, s.kind);
      }
      const g = ctx.createLinearGradient(W - 70, 0, W, 0);
      g.addColorStop(0, 'rgba(255,194,74,0)'); g.addColorStop(1, 'rgba(255,194,74,.10)');
      ctx.fillStyle = g; ctx.fillRect(W - 70, bandTop, 70, rows * pitch);
    }
    function frame(now) {
      raf = 0;
      const dt = Math.min(.05, Math.max(0, (now - last) / 1000)); last = now;
      t += dt * speed / pitch;
      while (gen < Math.floor(t)) genColumn(++gen);
      draw(); loop();
    }
    function loop() {
      if (reduced()) { draw(); return; }
      if (!raf && onscreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }
    function resize() {
      const rect = hero.getBoundingClientRect(), w = Math.round(rect.width), h = Math.round(rect.height);
      if (w === W && Math.abs(h - H) < 60) return;
      W = w; H = h; dpr = Math.min(2, window.devicePixelRatio || 1);
      const mobile = W < 720;
      pitchD = Math.max(6, Math.round((mobile ? 9 : 11) * dpr)); pitch = pitchD / dpr; cellD = Math.max(4, pitchD - Math.max(2, Math.round(2 * dpr)));
      bandTop = mobile ? 50 : 62; segLen = mobile ? 26 : 38; speed = mobile ? 30 : 44;
      rows = clamp(Math.floor(((mobile ? Math.min(H * .38, 330) : H * .68) - bandTop) / pitch), 14, 64);
      cols = Math.ceil(W / pitch) + 1;
      cvs.width = Math.round(W * dpr); cvs.height = Math.round(H * dpr);
      off.width = (cols + 1) * pitchD; off.height = rows * pitchD;
      segs = []; cursor = 0; epIdx = 0; epNo = 0; phase = 0; seed = 5; gen = -1; hudKey = '';
      for (let c = 0; c <= cols; c++) genColumn(++gen, true);
      t = gen + (reduced() ? .999 : 0);
      for (let i = segs.length - 1; i >= 0; i--) if (segs[i].start <= gen) { setHud(segs[i]); break; }
      draw();
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero); else window.addEventListener('resize', resize);
    resize();
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { onscreen = es[0].isIntersecting; if (onscreen) loop(); }).observe(hero);
    document.addEventListener('visibilitychange', loop);
    if (reduceMQ.addEventListener) reduceMQ.addEventListener('change', loop);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    loop();
  });

  /* ================================================================== mixer: foreground + background = mixture
     Three waveform lanes scroll in. The foreground (and its label) never changes; the background does. */
  safe('mixer', function mixer() {
    const cvs = $('#mixer'), bgName = $('#mixer-bg');
    if (!cvs || !cvs.getContext) return;
    const ctx = cvs.getContext('2d');
    const SEG = 92, GAIN = Math.pow(10, -8 / 20);   // background sits 8 dB below the foreground
    const KINDS = [
      ['thunderstorm', i => Math.min(.85, .2 + .24 * smooth(i / 16, 3) + (((i % 46) >= 20) ? .5 * Math.exp(-((i % 46) - 20) / 8) : 0)) * (.82 + .18 * hash(i, 1, 2))],
      ['vacuum cleaner', i => .44 + .06 * hash(i, 2, 4)],
      ['wind', i => .1 + .62 * Math.pow(smooth(i / 20, 11), 1.5)],
      ['water drops', i => .05 + ((i % 11) === 0 ? .74 : (i % 11) === 1 ? .36 : (i % 11) === 2 ? .14 : 0) * (.8 + .2 * hash(i, 5, 6))],
    ];
    const cough = i => { const p = ((i % 48) + 48) % 48; let v = .02; [6, 12, 30].forEach(b => { const d = p - b; if (d >= 0 && d < 6) v = Math.max(v, [1, .82, .5, .3, .16, .08][d] * (.84 + .16 * hash(i, 3, 8))); }); return v; };
    const kindAt = i => KINDS[((Math.floor(i / SEG) % KINDS.length) + KINDS.length) % KINDS.length];
    let W = 0, H = 0, dpr = 1, t = SEG * .55, raf = 0, last = 0, onscreen = false, shown = '';

    function bar(x, cy, h, w) { h = Math.max(1, h); ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, cy - h, w, h * 2, w / 2); else ctx.rect(x, cy - h, w, h * 2); ctx.fill(); }
    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const wide = W > 620, gut = wide ? 172 : 0, top = wide ? 4 : 18, laneH = (H - top - 6) / 3, pitch = 5, bw = 3;
      const head = Math.floor(t), frac = t - head, n = Math.ceil((W - gut) / pitch) + 2;
      const names = [['Foreground', 'coughing · the label', '255,194,74'], ['Background', kindAt(head)[0] + ' · context', '110,168,255'], ['Mixture', 'what the model hears', '233,230,239']];
      for (let l = 0; l < 3; l++) {
        const cy = top + laneH * (l + .5);
        ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(gut, cy - .5, W - gut, 1);
        if (l > 0) { ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(0, top + laneH * l - .5, W, 1); }
        ctx.save(); ctx.beginPath(); ctx.rect(gut, top + laneH * l, W - gut, laneH); ctx.clip();
        for (let k = 0; k < n; k++) {
          const i = head - k, x = W - (k + frac) * pitch;
          const fg = cough(i), bg = kindAt(i)[1](i);
          const a = l === 0 ? fg : l === 1 ? bg : Math.min(1, fg + GAIN * bg);
          const fade = clamp((x - gut) / 60, 0, 1);
          ctx.fillStyle = 'rgba(' + names[l][2] + ',' + (l === 2 ? .82 : .92) * fade + ')';
          bar(x, cy, a * laneH * .42, bw);
          if (l > 0 && ((i % SEG) + SEG) % SEG === 0) {
            ctx.fillStyle = 'rgba(110,168,255,' + .55 * fade + ')'; ctx.fillRect(x - 1.5, top + laneH * l + 4, 1, laneH - 8);
            if (l === 1) { ctx.font = '500 10.5px "JetBrains Mono", ui-monospace, monospace'; ctx.textBaseline = 'top'; ctx.fillStyle = 'rgba(169,203,255,' + fade + ')'; ctx.fillText('→ ' + kindAt(i)[0], x + 5, top + laneH + 6); }
          }
        }
        ctx.restore();
        ctx.textBaseline = 'alphabetic';
        if (wide) {
          ctx.fillStyle = 'rgb(' + names[l][2] + ')'; ctx.fillRect(0, cy - 15, 3, 30);
          ctx.font = '600 14px "Instrument Sans", system-ui, sans-serif'; ctx.fillStyle = '#f4f1ea'; ctx.fillText(names[l][0], 14, cy - 2);
          ctx.font = '400 10.5px "JetBrains Mono", ui-monospace, monospace'; ctx.fillStyle = '#9896a8'; ctx.fillText(names[l][1], 14, cy + 14);
          if (l < 2) { ctx.font = '500 20px "JetBrains Mono", ui-monospace, monospace'; ctx.fillStyle = '#6c6a7e'; ctx.fillText(l === 0 ? '+' : '=', gut - 26, top + laneH * (l + 1) + 7); }
        } else {
          ctx.font = '500 10.5px "JetBrains Mono", ui-monospace, monospace'; ctx.fillStyle = 'rgb(' + names[l][2] + ')';
          ctx.fillText((l === 1 ? '+ ' : l === 2 ? '= ' : '') + names[l][0].toLowerCase(), 2, top + laneH * l + 12);
        }
      }
      const now = kindAt(head)[0];
      if (bgName && now !== shown) { shown = now; bgName.style.opacity = 0; setTimeout(() => { bgName.textContent = now; bgName.style.opacity = 1; }, 180); }
    }
    function frame(now) { raf = 0; const dt = Math.min(.05, Math.max(0, (now - last) / 1000)); last = now; t += dt * 11; draw(); loop(); }
    function loop() { if (reduced()) { draw(); return; } if (!raf && onscreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    function resize() {
      const r = cvs.getBoundingClientRect();
      W = Math.round(r.width); H = Math.round(r.height); dpr = Math.min(2, window.devicePixelRatio || 1);
      if (!W || !H) return;
      cvs.width = Math.round(W * dpr); cvs.height = Math.round(H * dpr); draw();
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(cvs); else window.addEventListener('resize', resize);
    resize();
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { onscreen = es[0].isIntersecting; if (onscreen) loop(); }).observe(cvs); else { onscreen = true; loop(); }
    document.addEventListener('visibilitychange', loop);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  });

  /* only one clip plays at a time across the page */
  document.addEventListener('play', e => { $$('audio').forEach(a => { if (a !== e.target) a.pause(); }); }, true);

  /* ================================================================== listen: one foreground, four backgrounds */
  safe('listen', function listen() {
    const panel = $('#listen-panel');
    if (!panel || !CLIPS.length) return;
    const GROUPS = [
      ['coughing', ['cough-thunderstorm', 'cough-vacuum', 'cough-waterdrops', 'cough-wind']],
      ['pig', ['pig-bells', 'pig-engine', 'pig-rain', 'pig-siren']],
      ['crow', ['crow-airplane', 'crow-footsteps', 'crow-rain', 'crow-thunderstorm']],
    ];
    const by = {}; CLIPS.forEach(c => { by[c.key] = c; });
    const fgRoot = $('#ls-fg'), bgRoot = $('#ls-bg'), play = $('#ls-play'), wrap = $('#ls-wrap'), ph = $('#ls-ph'), dim = $('#ls-dim'), read = $('#ls-read'), audio = $('#ls-audio');
    const imgs = [$('#ls-img-a'), $('#ls-img-b')];
    let gi = 0, key = GROUPS[0][1][0], front = 0, raf = 0;

    function setProgress(p) { ph.style.left = (p * 100) + '%'; dim.style.width = ((1 - p) * 100) + '%'; }
    function tick() {
      raf = 0;
      if (audio.paused) return;
      setProgress(audio.duration ? clamp(audio.currentTime / audio.duration, 0, 1) : 0);
      raf = requestAnimationFrame(tick);
    }
    function setPlaying(on) {
      play.setAttribute('aria-pressed', String(on));
      play.setAttribute('aria-label', on ? 'Pause clip' : 'Play clip');
      wrap.classList.toggle('playing', on);
      if (on && !raf) raf = requestAnimationFrame(tick);
    }
    function setClip(k, autoplay) {
      key = k;
      const c = by[k], next = imgs[1 - front];
      next.alt = 'Log-mel spectrogram of a ' + c.fg + ' clip mixed with ' + c.bg;
      next.src = 'assets/img/spec/' + k + '.webp';
      next.classList.add('on'); imgs[front].classList.remove('on'); front = 1 - front;
      audio.pause(); audio.src = 'assets/audio/' + k + '.wav'; setProgress(0); setPlaying(false);
      read.textContent = '';
      const a = el('span', 'rchip fg'); a.appendChild(el('small', null, 'label')); a.appendChild(document.createTextNode(c.fg));
      const b = el('span', 'rchip bg'); b.appendChild(el('small', null, 'background')); b.appendChild(document.createTextNode(c.bg));
      read.appendChild(a); read.appendChild(b);
      read.appendChild(document.createTextNode('The label never changes. Only the context does.'));
      $$('button', bgRoot).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.v === k)));
      if (autoplay) audio.play().catch(() => {});
    }
    function buildBg() {
      bgRoot.textContent = '';
      GROUPS[gi][1].forEach(k => {
        const b = el('button', null, by[k].bg); b.type = 'button'; b.dataset.v = k; b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => { if (k !== key) setClip(k, !audio.paused || play.getAttribute('aria-pressed') === 'true'); });
        bgRoot.appendChild(b);
      });
    }
    GROUPS.forEach((g, i) => {
      const b = el('button', null, g[0]); b.type = 'button'; b.dataset.v = String(i); b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => {
        if (i === gi) return;
        const was = !audio.paused; gi = i;
        $$('button', fgRoot).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        buildBg(); setClip(GROUPS[gi][1][0], was);
      });
      fgRoot.appendChild(b);
    });
    buildBg(); setClip(key, false);
    play.addEventListener('click', () => { if (audio.paused) audio.play().catch(() => {}); else audio.pause(); });
    wrap.addEventListener('click', e => {
      const r = wrap.getBoundingClientRect(), p = clamp((e.clientX - r.left) / r.width, 0, 1);
      const seek = () => { if (audio.duration) audio.currentTime = p * audio.duration; };
      if (audio.readyState >= 1) seek(); else audio.addEventListener('loadedmetadata', seek, { once: true });
      audio.play().catch(() => {});
    });
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('ended', () => { setPlaying(false); setProgress(0); });
  });

  /* ================================================================== patch bay: foreground -> background wiring */
  safe('patchbay', function patchBay() {
    const bay = $('#pb-bay');
    if (!bay || !D) return;
    const fgList = $('#pb-fg'), bgList = $('#pb-bg'), wires = $('#pb-wires'), info = $('#pb-info');
    const SPL = { test: 'Test', val: 'Validation', train: 'Train' };
    const rowsBy = ['test', 'val', 'train'].map(s => D.wiring.filter(w => w.split === s));
    const fgs = [].concat.apply([], rowsBy);
    // order backgrounds by the mean position of the foregrounds they are wired to (fewer crossings)
    const bgPos = {};
    fgs.forEach((w, i) => w.bgs.concat(w.hard).forEach(b => { (bgPos[b] = bgPos[b] || []).push(i); }));
    const bgs = Object.keys(bgPos).sort((a, b) => bgPos[a].reduce((x, y) => x + y, 0) / bgPos[a].length - bgPos[b].reduce((x, y) => x + y, 0) / bgPos[b].length);
    const fgBtn = {}, bgBtn = {}, paths = [];
    let mode = 'std', active = null, touched = false, timer = 0, anim = 0;

    rowsBy.forEach((list, gi) => {
      fgList.appendChild(el('li', 'pb-g', SPL[['test', 'val', 'train'][gi]] + ' · ' + list.length));
      list.forEach(w => {
        const li = el('li'), b = el('button', 'pb-n', w.fg); b.type = 'button'; b.dataset.split = w.split;
        li.appendChild(b); fgList.appendChild(li); fgBtn[w.fg] = b;
        const pick = () => select({ type: 'fg', name: w.fg });
        b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { stop(); pick(); } });
        b.addEventListener('focus', () => { stop(); pick(); });
        b.addEventListener('click', () => { stop(); pick(); });
      });
    });
    bgList.appendChild(el('li', 'pb-g', bgs.length + ' shared'));
    bgs.forEach(name => {
      const li = el('li'), b = el('button', 'pb-n', name); b.type = 'button';
      li.appendChild(b); bgList.appendChild(li); bgBtn[name] = b;
      const pick = () => select({ type: 'bg', name: name });
      b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { stop(); pick(); } });
      b.addEventListener('focus', () => { stop(); pick(); });
      b.addEventListener('click', () => { stop(); pick(); });
    });
    fgs.forEach(w => { for (let j = 0; j < 4; j++) { const p = sv('path', { 'data-split': w.split }); wires.appendChild(p); paths.push({ el: p, w: w, j: j, y1: 0, y2: 0 }); } });

    roving(fgList, '.pb-n'); roving(bgList, '.pb-n');
    const target = p => (mode === 'hard' ? p.w.hard : p.w.bgs)[p.j];
    let geo = { x1: 0, x2: 0 };
    function centerY(btn) { const r = btn.getBoundingClientRect(), o = bay.getBoundingClientRect(); return r.top - o.top + r.height / 2; }
    function setD(p) { const m = (geo.x1 + geo.x2) / 2; p.el.setAttribute('d', 'M' + geo.x1 + ',' + p.y1.toFixed(1) + 'C' + m + ',' + p.y1.toFixed(1) + ' ' + m + ',' + p.y2.toFixed(1) + ' ' + geo.x2 + ',' + p.y2.toFixed(1)); }
    function layout(animate) {
      const o = bay.getBoundingClientRect();
      if (!o.width) return;
      // cables run between the jacks: right edge of the foreground buttons, left edge of the background buttons
      const fgRight = Math.max.apply(null, fgs.map(w => fgBtn[w.fg].getBoundingClientRect().right));
      geo.x1 = Math.round(fgRight - o.left - 4.5); geo.x2 = Math.round(bgBtn[bgs[0]].getBoundingClientRect().left - o.left + 4.5);
      const from = paths.map(p => p.y2);
      paths.forEach(p => { p.y1 = centerY(fgBtn[p.w.fg]); p.to = centerY(bgBtn[target(p)]); });
      cancelAnimationFrame(anim);
      if (!animate || reduced()) { paths.forEach(p => { p.y2 = p.to; setD(p); }); return; }
      const t0 = performance.now();
      (function step(now) {
        const u = easeOut((now - t0) / 750);
        paths.forEach((p, i) => { p.y2 = lerp(from[i], p.to, u); setD(p); });
        if (u < 1) anim = requestAnimationFrame(step);
      })(t0);
    }
    function chips(names, cls) { const d = el('div', 'pi-list'); names.forEach(n => d.appendChild(el('span', 'chip ' + cls, n))); return d; }
    function select(sel) {
      active = sel;
      const map = w => (mode === 'hard' ? w.hard : w.bgs);
      Object.keys(fgBtn).forEach(k => fgBtn[k].classList.remove('on', 'lit', 'share'));
      Object.keys(bgBtn).forEach(k => bgBtn[k].classList.remove('on', 'lit', 'share'));
      paths.forEach(p => p.el.classList.remove('hot', 'share'));
      bay.classList.toggle('active', !!sel); bay.classList.toggle('bgsel', !!sel && sel.type === 'bg');
      info.textContent = '';
      if (!sel) { defaultInfo(); return; }
      if (sel.type === 'fg') {
        const w = fgs.filter(x => x.fg === sel.name)[0], mine = map(w);
        fgBtn[w.fg].classList.add('on');
        mine.forEach(b => bgBtn[b].classList.add('lit'));
        const sharers = fgs.filter(x => x !== w && map(x).some(b => mine.indexOf(b) >= 0));
        sharers.forEach(x => fgBtn[x.fg].classList.add('share'));
        paths.forEach(p => { if (p.w === w) { p.el.classList.add('hot'); wires.appendChild(p.el); } else if (mine.indexOf(target(p)) >= 0) p.el.classList.add('share'); });
        const k = el('div', 'pi-k'); k.appendChild(el('i', 'k ' + w.split)); k.appendChild(document.createTextNode(SPL[w.split] + ' class · foreground'));
        info.appendChild(k); info.appendChild(el('h4', null, w.fg)); info.appendChild(chips(mine, 'bg'));
        const p1 = el('p'); p1.appendChild(document.createTextNode('These four backgrounds are also wired to ')); p1.appendChild(el('b', null, sharers.length + ' other foregrounds')); p1.appendChild(document.createTextNode(' (blue cables).'));
        info.appendChild(p1);
        info.appendChild(el('p', 'pi-s', w.split === 'test'
          ? 'In an IID episode a ' + w.fg + ' query keeps the background pairing of its support clips. In an OOD episode it arrives with one that the support set ties to other classes.'
          : 'Train and validation classes use the same wiring, so the model can learn to lean on these cues before it is tested.'));
      } else {
        const users = fgs.filter(x => map(x).indexOf(sel.name) >= 0);
        bgBtn[sel.name].classList.add('on');
        users.forEach(x => fgBtn[x.fg].classList.add('lit'));
        paths.forEach(p => { if (target(p) === sel.name) { p.el.classList.add('hot'); wires.appendChild(p.el); } });
        const k = el('div', 'pi-k'); k.appendChild(el('i', 'sw bg')); k.appendChild(document.createTextNode('Background · context'));
        info.appendChild(k); info.appendChild(el('h4', null, sel.name)); info.appendChild(chips(users.map(x => x.fg), 'fg'));
        const cnt = s => users.filter(x => x.split === s).length;
        const p1 = el('p'); p1.appendChild(document.createTextNode('Mixed under ')); p1.appendChild(el('b', null, users.length + (users.length === 1 ? ' foreground' : ' foregrounds'))); p1.appendChild(document.createTextNode(': ' + cnt('train') + ' train, ' + cnt('val') + ' validation, ' + cnt('test') + ' test.'));
        info.appendChild(p1);
        info.appendChild(el('p', 'pi-s', 'Background classes are not tied to a split. The same contexts recur around seen and unseen foregrounds, which is what exposes the shortcut.'));
      }
    }
    function defaultInfo() {
      const k = el('div', 'pi-k', mode === 'hard' ? 'Hard OOD wiring' : 'Standard wiring');
      info.appendChild(k);
      info.appendChild(el('h4', null, fgs.length + ' foregrounds, ' + bgs.length + ' backgrounds'));
      info.appendChild(el('p', null, 'Hover, focus or tap a sound to trace its cables.'));
    }
    function stop() { touched = true; clearInterval(timer); }
    segGroup($('#pb-mode'), v => {
      mode = v; stop(); layout(true);
      if (v === 'hard') {
        const changed = fgs.filter(w => w.bgs.join() !== w.hard.join());
        const pool = Array.from(new Set([].concat.apply([], fgs.filter(w => w.split === 'test').map(w => w.hard))));
        select(null); info.textContent = '';
        info.appendChild(el('div', 'pi-k', 'Hard OOD wiring'));
        info.appendChild(el('h4', null, 'One shared pool'));
        info.appendChild(chips(pool, 'bg'));
        const p = el('p'); p.appendChild(document.createTextNode('All ' + fgs.filter(w => w.split === 'test').length + ' test classes are rewired onto these ')); p.appendChild(el('b', null, pool.length + ' backgrounds')); p.appendChild(document.createTextNode(', so every background in one class\'s support also shows up in the other classes\' queries.'));
        info.appendChild(p);
        info.appendChild(el('p', 'pi-s', changed.length + ' foregrounds change cables. Accuracy falls further than under the standard wiring.'));
      } else if (active) select(active); else select(null);
    });
    if ('ResizeObserver' in window) new ResizeObserver(() => layout(false)).observe(bay); else window.addEventListener('resize', () => layout(false));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => layout(false));
    layout(false); select(null);
    bay.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && mode === 'std' && !bay.contains(document.activeElement)) select(null); });
    // gentle demo: walk through the test classes until the visitor takes over
    onVisible(bay, () => {
      if (touched || reduced()) { if (!touched) select({ type: 'fg', name: 'pig' }); return; }
      const tour = ['pig', 'cough', 'crow', 'sneezing', 'chainsaw', 'blender', 'phone', 'crackling fire']; let i = 0;
      select({ type: 'fg', name: tour[0] });
      timer = setInterval(() => { if (document.hidden) return; i = (i + 1) % tour.length; select({ type: 'fg', name: tour[i] }); }, 2600);
    }, { threshold: 0.25 });
  });

  /* ================================================================== episode + feature-space sketch
     A 2-way 2-shot episode of real clips beside a schematic feature space: one direction per class,
     and the background sets the length. The nearest-prototype head measures plain distance, so a
     shorter feature can land closer to the wrong prototype. */
  safe('episode', function episode() {
    const root = $('#episode'), svg = $('#ep-svg');
    if (!root || !svg) return;
    const by = {}; CLIPS.forEach(c => { by[c.key] = c; });
    const audio = $('#ep-audio'), read = $('#ep-read'), acc = $('#ep-acc');
    // polar sketch: [clip, length, angle in degrees]
    const CL = {
      cough: { name: 'coughing', th: 62, sup: [['cough-thunderstorm-b', .80, 64.2], ['cough-thunderstorm-c', .89, 59.6]], q: { iid: ['cough-thunderstorm', .74, 57.5], ood: ['cough-vacuum', .44, 58.6] } },
      pig: { name: 'pig', th: 30, sup: [['pig-bells-b', .50, 32.6], ['pig-bells-c', .57, 27.8]], q: { iid: ['pig-bells', .62, 33.5], ood: ['pig-siren', .70, 34] } },
    };
    const IDS = ['cough', 'pig'];
    const OX = 40, OY = 336, R = 300;
    const rad = d => d * Math.PI / 180;
    const cart = (r, th) => [r * Math.cos(rad(th)), r * Math.sin(rad(th))];
    const xy = (r, th) => [OX + R * r * Math.cos(rad(th)), OY - R * r * Math.sin(rad(th))];
    let mode = 'iid', m = 0, raf = 0, touched = false, playing = null, ringKey = null;

    // ---- clip cards: click to listen, hover to ring the matching point
    function clipCard(key) {
      const c = by[key], b = el('button', 'clip'); b.type = 'button'; b.dataset.key = key;
      b.setAttribute('aria-label', 'Play ' + c.fg + ' with ' + c.bg);
      const img = el('img'); img.src = 'assets/img/spec/' + key + '.webp'; img.alt = ''; img.loading = 'lazy'; img.width = 1002; img.height = 384;
      const cl = el('span', 'cl'); cl.appendChild(el('i')); cl.appendChild(el('span', null, '+ ' + c.bg));
      const sp = el('span', 'sp'); sp.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
      b.appendChild(img); b.appendChild(cl); b.appendChild(sp); b.appendChild(el('span', 'pg'));
      b.addEventListener('click', () => {
        if (playing === b && !audio.paused) { audio.pause(); return; }
        playing = b; audio.src = 'assets/audio/' + key + '.wav'; audio.play().catch(() => {});
      });
      b.addEventListener('pointerenter', () => ring(key, true)); b.addEventListener('pointerleave', () => ring(key, false));
      b.addEventListener('focus', () => ring(key, true)); b.addEventListener('blur', () => ring(key, false));
      return b;
    }
    const qSlot = {};
    IDS.forEach(id => {
      const sup = $('#ep-sup-' + id), q = $('#ep-q-' + id);
      CL[id].sup.forEach(s => sup.appendChild(clipCard(s[0])));
      qSlot[id] = { box: q, card: null, verdict: el('div', 'verdict') };
    });
    function setQueryCards(flip) {
      IDS.forEach(id => {
        const s = qSlot[id], key = CL[id].q[mode][0];
        if (s.card && s.card.dataset.key === key) return;
        if (playing === s.card) audio.pause();
        const card = clipCard(key);
        card.classList.add(mode === 'iid' ? 'q-iid' : 'q-ood');
        if (flip && !reduced()) card.classList.add('flip');
        s.box.textContent = ''; s.box.appendChild(card); s.box.appendChild(s.verdict); s.card = card;
      });
    }
    audio.addEventListener('timeupdate', () => { if (playing) $('.pg', playing).style.width = (audio.duration ? audio.currentTime / audio.duration * 100 : 0) + '%'; });
    audio.addEventListener('play', () => { $$('.clip', root).forEach(c => c.classList.toggle('playing', c === playing)); });
    const stopAudio = () => { $$('.clip', root).forEach(c => { c.classList.remove('playing'); $('.pg', c).style.width = '0'; }); };
    audio.addEventListener('pause', stopAudio); audio.addEventListener('ended', stopAudio);

    // ---- static scene
    function protoOf(id) {            // mean of the support vectors, as [length, angle]
      let x = 0, y = 0;
      CL[id].sup.forEach(s => { const p = cart(s[1], s[2]); x += p[0]; y += p[1]; });
      x /= CL[id].sup.length; y /= CL[id].sup.length;
      return [Math.hypot(x, y), Math.atan2(y, x) * 180 / Math.PI];
    }
    const gGrid = sv('g'), gDyn = sv('g');
    svg.appendChild(gGrid); svg.appendChild(gDyn);
    [.25, .5, .75, 1].forEach(r => { const a = xy(r, 0), b = xy(r, 90); gGrid.appendChild(sv('path', { class: 'g-arc', d: 'M' + a[0] + ',' + a[1] + 'A' + R * r + ',' + R * r + ' 0 0 0 ' + b[0] + ',' + b[1] })); });
    gGrid.appendChild(sv('line', { class: 'g-ray', x1: OX, y1: OY, x2: xy(1.08, 0)[0], y2: OY }));
    gGrid.appendChild(sv('line', { class: 'g-ray', x1: OX, y1: OY, x2: OX, y2: xy(1.08, 90)[1] }));
    gGrid.appendChild(sv('text', { x: xy(1.08, 0)[0], y: OY + 18, 'text-anchor': 'end' }, 'length ‖z‖ →'));
    IDS.forEach(id => {
      const c = CL[id], e = xy(1.08, c.th), l = xy(1.12, c.th);
      gGrid.appendChild(sv('line', { class: 'ray', x1: OX, y1: OY, x2: e[0], y2: e[1] }));
      gGrid.appendChild(sv('text', { class: 'lbl', x: l[0] - 2, y: l[1] + (id === 'cough' ? -3 : 5) }, c.name));
    });
    // decision boundary of a nearest-prototype head: the perpendicular bisector of the two prototypes
    (function () {
      const a = cart.apply(null, protoOf('cough')), b = cart.apply(null, protoOf('pig'));
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[1] - a[1], dy = a[0] - b[0], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
      const t0 = -mx / ux, t1 = (1.06 - mx) / ux;   // clip to the plot's x range
      const p0 = [OX + R * (mx + ux * t0), OY - R * (my + uy * t0)], p1 = [OX + R * (mx + ux * t1), OY - R * (my + uy * t1)];
      gGrid.appendChild(sv('line', { class: 'bound', x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1] }));
      gGrid.appendChild(sv('text', { class: 'tag btag', 'text-anchor': 'end', x: p1[0], y: p1[1] - 7 }, 'decision boundary'));
    })();
    const shrink = gDyn.appendChild(sv('text', { class: 'tag stag', 'text-anchor': 'end' }));
    shrink.appendChild(sv('tspan', { dy: 0 }, 'same direction,'));
    shrink.appendChild(sv('tspan', { dy: 13 }, 'shorter'));
    const node = {};
    IDS.forEach(id => {
      const c = CL[id], isC = id === 'cough', n = node[id] = {
        sup: c.sup.map(s => { const p = xy(s[1], s[2]); return gDyn.appendChild(sv('circle', { class: 'sup', r: 6, cx: p[0], cy: p[1] })); }),
        ghost: gDyn.appendChild(sv('circle', { r: 7, fill: 'none', stroke: '#8d8ba3', 'stroke-width': 1.3, 'stroke-dasharray': '2 3' })),
        arrow: gDyn.appendChild(sv('line', { stroke: '#9896a8', 'stroke-width': 1.3, 'stroke-dasharray': '3 4' })),
        dec: gDyn.appendChild(sv('path', { class: 'dec' })),
        q: gDyn.appendChild(sv('path', { class: 'q' })),
        qtag: gDyn.appendChild(sv('text', { class: 'tag' }, 'query')),
        ring: gDyn.appendChild(sv('circle', { class: 'hl-ring', r: 15 })),
      };
      const pp = xy.apply(null, protoOf(id));
      gDyn.insertBefore(sv('circle', { class: 'proto', r: 12, cx: pp[0], cy: pp[1] }), n.ghost);
      gDyn.insertBefore(sv('text', { class: 'tag', 'text-anchor': isC ? 'end' : 'start', x: pp[0] + (isC ? -17 : 4), y: pp[1] + (isC ? -8 : 29) }, 'prototype'), n.ghost);
    });
    const star = (x, y, s) => { let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? s * .45 : s; d += (k ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ',' + (y + Math.sin(a) * rr).toFixed(1); } return d + 'Z'; };
    function ring(key, on) { ringKey = on ? key : null; render(); }

    function decide(id, md) {         // nearest prototype in plain (Euclidean) distance
      const q = CL[id].q[md], qc = cart(q[1], q[2]);
      let best = null, score = Infinity;
      IDS.forEach(k => { const p = cart.apply(null, protoOf(k)), s = Math.hypot(qc[0] - p[0], qc[1] - p[1]); if (s < score) { score = s; best = k; } });
      return best;
    }
    function render() {
      IDS.forEach(id => {
        const c = CL[id], n = node[id], isC = id === 'cough';
        const qi = c.q.iid, qo = c.q.ood, qp = xy(lerp(qi[1], qo[1], m), lerp(qi[2], qo[2], m));
        n.q.setAttribute('d', star(qp[0], qp[1], 11));
        n.qtag.setAttribute('x', qp[0] + 15); n.qtag.setAttribute('y', qp[1] + (isC ? 4 : -7));
        const gi = xy(qi[1], qi[2]), show = m > .02;
        n.ghost.setAttribute('cx', gi[0]); n.ghost.setAttribute('cy', gi[1]); n.ghost.style.opacity = show ? 1 : 0;
        n.arrow.setAttribute('x1', gi[0]); n.arrow.setAttribute('y1', gi[1]); n.arrow.setAttribute('x2', qp[0]); n.arrow.setAttribute('y2', qp[1]); n.arrow.style.opacity = show ? .9 : 0;
        if (isC) {
          const sx = (gi[0] + qp[0]) / 2 - 13;
          shrink.setAttribute('y', (gi[1] + qp[1]) / 2 - 3);
          Array.prototype.forEach.call(shrink.childNodes, ts => ts.setAttribute('x', sx));
          shrink.style.opacity = m > .6 ? 1 : 0;
        }
        const win = decide(id, mode), w = xy.apply(null, protoOf(win)), ok = win === id;
        n.dec.setAttribute('d', 'M' + qp[0].toFixed(1) + ',' + qp[1].toFixed(1) + 'L' + w[0].toFixed(1) + ',' + w[1].toFixed(1));
        n.dec.classList.toggle('no', !ok); n.q.classList.toggle('no', !ok);
        let rp = null;
        c.sup.forEach(s => { if (s[0] === ringKey) rp = xy(s[1], s[2]); });
        if (ringKey === qi[0] || ringKey === qo[0]) rp = qp;
        if (rp) { n.ring.setAttribute('cx', rp[0]); n.ring.setAttribute('cy', rp[1]); }
        n.ring.classList.toggle('on', !!rp);
      });
    }
    function describe() {
      const res = IDS.map(id => decide(id, mode)), right = res.filter((r, i) => r === IDS[i]).length;
      acc.textContent = 'episode accuracy ' + right + ' / ' + IDS.length;
      acc.className = 'acc ' + (right === IDS.length ? 'ok' : 'no');
      IDS.forEach((id, i) => {
        const v = qSlot[id].verdict, ok = res[i] === id;
        v.className = 'verdict ' + (ok ? 'ok' : 'no'); v.textContent = '';
        v.appendChild(el('span', 'vb', ok ? '✓' : '✗'));
        const vt = el('span', 'vt'); vt.appendChild(el('i', null, 'predicted ')); vt.appendChild(document.createTextNode(CL[res[i]].name)); v.appendChild(vt);
      });
      const T = {
        iid: ['Backgrounds match.', ' Query and support features have similar lengths, so each query sits beside its own prototype and the nearest one is the right one.'],
        ood: ['The cough now arrives over a vacuum cleaner.', ' Its feature still points in the coughing direction, but it is shorter, and in plain distance it ends up closer to the pig prototype.'],
      }[mode];
      read.textContent = ''; read.appendChild(el('b', null, T[0])); read.appendChild(document.createTextNode(T[1]));
      read.classList.toggle('no', right !== IDS.length);
    }
    function go() {
      const m1 = mode === 'ood' ? 1 : 0, m0 = m, t0 = performance.now();
      cancelAnimationFrame(raf); describe();
      if (reduced()) { m = m1; render(); return; }
      (function step(now) { const u = ease((now - t0) / 800); m = lerp(m0, m1, u); render(); if (u < 1) raf = requestAnimationFrame(step); })(t0);
    }
    const setMode = segGroup($('#ep-mode'), (v, user) => { mode = v; if (user) touched = true; setQueryCards(true); go(); });
    setQueryCards(false); describe(); render();
    // once the demo is in view, play the swap by itself unless the visitor got there first
    onVisible(root, () => { if (reduced()) return; setTimeout(() => { if (touched || mode !== 'iid') return; mode = 'ood'; setMode('ood'); setQueryCards(true); go(); }, 1700); }, { threshold: 0.45 });
  });

  /* ================================================================== dumbbell chart (shared renderer)
     Each row: a circle (value a), a diamond (value b) and the bar between them. */
  function dumbbell(root, cfg) {
    const lo = cfg.domain[0], hi = cfg.domain[1], pct = v => clamp((v - lo) / (hi - lo), 0, 1) * 100;
    const prev = root._pos || {}, pos = {}, armed = root._armed || reduced();
    root.textContent = '';
    root.style.setProperty('--n', Math.round((hi - lo) / cfg.step));
    const axis = el('div', 'axis'); axis.setAttribute('aria-hidden', 'true');
    axis.appendChild(el('span', 'ah', cfg.nameHead || ''));
    const tk = el('div', 'tk');
    for (let v = lo; v <= hi + 1e-9; v += cfg.step) { const s = el('span', null, cfg.tick ? cfg.tick(v) : String(Math.round(v * 100) / 100)); s.style.left = pct(v) + '%'; tk.appendChild(s); }
    axis.appendChild(tk); axis.appendChild(el('span', 'av', cfg.valHead || 'Δ'));
    root.appendChild(axis);
    let idx = 0, lastGroup = null;
    cfg.rows.forEach(r => {
      if (cfg.grouped && r.group !== lastGroup) { lastGroup = r.group; root.appendChild(el('div', 'grp', r.group)); }
      const row = el('div', 'row'); row.tabIndex = 0; row.setAttribute('role', 'img'); row.setAttribute('aria-label', r.aria);
      const nm = el('span', 'nm'); if (r.tag) nm.appendChild(el('small', null, r.tag)); nm.appendChild(document.createTextNode(r.name)); nm.title = r.title || r.name;
      const trk = el('div', 'trk'), bar = el('i', 'bar'), a = el('i', 'pt a'), b = el('i', 'pt b');
      trk.appendChild(bar); trk.appendChild(a); trk.appendChild(b);
      row.appendChild(nm); row.appendChild(trk); row.appendChild(el('span', 'dv', r.val));
      const tgt = { a: pct(r.a), b: pct(r.b) }, from = prev[r.id] || { a: tgt.a, b: tgt.a };
      const place = p => { a.style.left = p.a + '%'; b.style.left = p.b + '%'; bar.style.left = Math.min(p.a, p.b) + '%'; bar.style.width = Math.abs(p.a - p.b) + '%'; };
      bar.classList.toggle('up', r.b > r.a);
      place(armed ? from : { a: tgt.a, b: tgt.a });
      pos[r.id] = tgt; row._place = () => place(tgt);
      if (!prev[r.id] && armed && !reduced()) { row.classList.add('enter'); row.style.setProperty('--rd', Math.min(idx * 18, 420) + 'ms'); }
      bindTip(row, () => r.tip);
      root.appendChild(row); idx++;
    });
    roving(root, '.row');
    root._latest = pos;
    root._pos = armed ? pos : {};
    const settle = () => $$('.row', root).forEach(row => { row.classList.remove('enter'); row._place(); });
    if (armed) requestAnimationFrame(() => requestAnimationFrame(settle));
    else if (!root._watch) {
      // first time on screen: open the gaps from the collapsed state
      root._watch = true;
      onVisible(root, () => { root._armed = true; root._pos = root._latest; requestAnimationFrame(() => $$('.row', root).forEach(row => row._place && row._place())); }, { threshold: 0.12 });
    }
  }

  const BB = [
    { id: 'conv64', name: 'Conv-64F', kind: '4-layer CNN', cnn: true }, { id: 'resnet12', name: 'ResNet-12', kind: 'residual CNN', cnn: true }, { id: 'resnet18', name: 'ResNet-18', kind: 'residual CNN', cnn: true },
    { id: 'clap', name: 'CLAP', kind: 'contrastive audio-text' }, { id: 'audiomae', name: 'AudioMAE', kind: 'masked autoencoder' }, { id: 'ast', name: 'AST', kind: 'supervised transformer' },
    { id: 'qwen2', name: 'Qwen2-Audio-7B', kind: '7B audio LLM' }, { id: 'htsat', name: 'HTSAT-CLAP', kind: 'HTS-AT + CLAP' }, { id: 'beats', name: 'BEATs', kind: 'self-supervised' },
    { id: 'passt', name: 'PaSST', kind: 'AudioSet transformer' }, { id: 'wav2vec2', name: 'Wav2Vec 2.0', kind: 'speech transformer' },
  ];
  const FAM = { finetune: 'Fine-tuning', meta: 'Meta-learning', metric: 'Metric', contrastive: 'Contrastive', transductive: 'Transductive' };
  const FAMS = ['finetune', 'meta', 'metric', 'contrastive', 'transductive'];
  const SHORT = { 'ProtoNet + contrastive': 'ProtoNet + contr.', 'ProtoNet + contrastive + attention': 'ProtoNet + contr. + attn' };
  const f2 = v => v.toFixed(2), f1 = v => v.toFixed(1);
  const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
  const signed = v => (v < 0 ? '−' + f2(-v) : f2(v));
  const C = { iid: '#1aa898', ood: '#d9463f' };

  /* ================================================================== headline tiles (computed from the tables) */
  safe('tiles', function tiles() {
    if (!D) return;
    const cnn = ['conv64', 'resnet12', 'resnet18'];
    let n = 0, d = 0, max = null;
    cnn.forEach(b => D.backbones[b].forEach(r => { d++; if (r.s5.delta > 0) n++; if (!max || r.s5.delta > max.v) max = { v: r.s5.delta, m: r.method, b: b }; }));
    const big = ['clap', 'ast', 'audiomae', 'qwen2'];
    const of = m => big.map(b => D.backbones[b].filter(r => r.method === m)[0].s5.delta);
    const proto = of('ProtoNet');
    const set = (id, v) => { const e = $('#' + id); if (e) { if (e.dataset.count != null) e.dataset.count = v; e.textContent = v; } };
    set('t-drop-n', n); set('t-drop-d', d); set('t-max', f1(max.v));
    set('t-big-lo', f1(Math.min.apply(null, proto))); set('t-big-hi', f1(Math.max.apply(null, proto)));
    // mean gap per head across the four large encoders: most robust vs least robust
    const headMeans = D.backbones.clap.map(r => mean(of(r.method)));
    set('t-h-lo', f1(Math.min.apply(null, headMeans))); set('t-h-hi', f1(Math.max.apply(null, headMeans)));
  });

  /* ================================================================== results explorer */
  safe('explorer', function explorer() {
    const chart = $('#ex-chart');
    if (!chart || !D) return;
    const tabs = $('#ex-bb'), sum = $('#ex-sum'), table = $('#ex-table');
    const st = { bb: 'conv64', shot: 's5', sort: 'family', view: 'chart' };
    const rowTip = (r, v, bbName) => ({
      title: r.method + ' · ' + bbName + ' · ' + (st.shot === 's1' ? '1-shot' : '5-shot'),
      rows: [{ color: C.iid, value: f2(v.iid), label: ' IID', sub: '± ' + f2(v.iidSd) }, { color: C.ood, value: f2(v.ood), label: ' OOD', sub: '± ' + f2(v.oodSd) }, { value: signed(v.delta), label: ' gap Δ' }]
    });
    function update() {
      const bb = BB.filter(x => x.id === st.bb)[0];
      let rows = D.backbones[st.bb].slice();
      if (st.sort === 'gap') rows.sort((a, b) => b[st.shot].delta - a[st.shot].delta);
      else rows.sort((a, b) => FAMS.indexOf(a.family) - FAMS.indexOf(b.family));
      const vals = rows.map(r => r[st.shot]);
      const drop = vals.filter(v => v.delta > 0).length;
      sum.textContent = '';
      const add = (strong, rest) => { if (sum.childNodes.length) sum.appendChild(el('span', 'sep', '·')); sum.appendChild(el('b', null, strong)); sum.appendChild(document.createTextNode(rest)); };
      add(bb.name, ' ' + (st.shot === 's1' ? '1-shot' : '5-shot'));
      add(f1(mean(vals.map(v => v.iid))) + ' → ' + f1(mean(vals.map(v => v.ood))), ' mean accuracy');
      add(f2(mean(vals.map(v => v.delta))), ' mean Δ');
      add(drop + ' of ' + rows.length, ' lose accuracy');
      dumbbell(chart, {
        domain: [30, 100], step: 10, grouped: st.sort === 'family', nameHead: bb.cnn ? 'method' : 'head', valHead: 'Δ pts',
        rows: rows.map(r => {
          const v = r[st.shot], nm = (SHORT[r.method] || r.method) + (r.attn ? ' *' : '');
          return { id: r.method, name: nm, title: r.method + (r.attn ? ' (with an attention module)' : ''), tag: st.sort === 'gap' ? FAM[r.family] : '', group: FAM[r.family], a: v.iid, b: v.ood, val: signed(v.delta),
            aria: r.method + ': IID ' + f2(v.iid) + ' percent, OOD ' + f2(v.ood) + ' percent, gap ' + f2(v.delta) + ' points', tip: rowTip(r, v, bb.name) };
        })
      });
      // table view (the accessible twin of the chart)
      const t = el('table', 'dt'), th = el('tr');
      [bb.cnn ? 'Method' : 'Head', 'Family', 'IID', 'OOD', 'Δ'].forEach(x => th.appendChild(el('th', null, x)));
      const thead = el('thead'); thead.appendChild(th); t.appendChild(thead);
      const tb = el('tbody');
      rows.forEach(r => { const v = r[st.shot], tr = el('tr'); tr.appendChild(el('td', null, r.method + (r.attn ? ' *' : ''))); tr.appendChild(el('td', null, FAM[r.family])); tr.appendChild(el('td', null, f2(v.iid) + ' ± ' + f2(v.iidSd))); tr.appendChild(el('td', null, f2(v.ood) + ' ± ' + f2(v.oodSd))); tr.appendChild(el('td', 'd', signed(v.delta))); tb.appendChild(tr); });
      t.appendChild(tb); table.textContent = ''; table.appendChild(t);
      chart.hidden = st.view !== 'chart'; table.hidden = st.view !== 'table';
    }
    [true, false].forEach(cnn => {
      const g = el('div', 'tg');
      BB.filter(b => !!b.cnn === cnn).forEach(b => {
        const btn = el('button', null, b.name); btn.type = 'button'; btn.setAttribute('role', 'tab'); btn.setAttribute('aria-selected', String(b.id === st.bb)); btn.dataset.v = b.id;
        btn.addEventListener('click', () => { if (st.bb === b.id) return; st.bb = b.id; $$('button', tabs).forEach(o => o.setAttribute('aria-selected', String(o === btn))); update(); });
        g.appendChild(btn);
      });
      tabs.appendChild(g);
    });
    tabs.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const all = $$('button', tabs), i = all.indexOf(document.activeElement); if (i < 0) return;
      const n = all[(i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length]; n.focus(); n.click(); e.preventDefault();
    });
    const setShot = segGroup($('#ex-shot'), v => { st.shot = v; update(); });
    const setSort = segGroup($('#ex-sort'), v => { st.sort = v; chart._pos = chart._armed ? chart._pos : {}; update(); });
    const setView = segGroup($('#ex-view'), v => { st.view = v; update(); });
    update();
    // the "in one minute" links open the explorer on the evidence for their finding
    $$('a[data-ex-bb]').forEach(a => a.addEventListener('click', () => {
      st.bb = a.dataset.exBb; st.sort = a.dataset.exSort || 'family'; st.shot = 's5'; st.view = 'chart';
      $$('button', tabs).forEach(o => o.setAttribute('aria-selected', String(o.dataset.v === st.bb)));
      setShot(st.shot); setSort(st.sort); setView(st.view);
      update();
    }));
  });

  /* ================================================================== page chrome: reveals, counters, nav, copy */
  safe('chrome', function chrome() {
    // stagger siblings inside grids
    $$('.tl, .tiles, .defs').forEach(g => $$(':scope > .reveal', g).forEach((n, i) => n.style.setProperty('--d', (i * 70) + 'ms')));
    function countUp(node) {
      const to = parseFloat(node.dataset.count), dec = +(node.dataset.dec || 0), sep = node.dataset.sep;
      const fmt = v => { const s = v.toFixed(dec); return sep ? Number(s).toLocaleString('en-US') : s; };
      if (reduced() || !isFinite(to)) { node.textContent = fmt(to); return; }
      const t0 = performance.now(), dur = 1300;
      (function step(now) { const u = easeOut((now - t0) / dur); node.textContent = fmt(to * u); if (u < 1) requestAnimationFrame(step); else node.textContent = fmt(to); })(t0);
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target); e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(countUp);
      }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      $$('.reveal').forEach(n => io.observe(n));
    } else $$('.reveal').forEach(n => n.classList.add('in'));

    // scroll progress + active nav link
    const bar = $('#progress');
    const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? clamp(window.scrollY / max, 0, 1) : 0) + ')'; };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); onScroll();
    const links = $$('#nav-links a');
    if ('IntersectionObserver' in window) {
      const seen = {};
      const io2 = new IntersectionObserver(es => {
        es.forEach(e => { seen[e.target.id] = e.isIntersecting; });
        const cur = $$('main section[id]').map(s => s.id).filter(id => seen[id])[0];
        links.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + cur)));
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('main section[id]').forEach(s => io2.observe(s));
    }

    // copy buttons
    $$('.copy').forEach(btn => btn.addEventListener('click', () => {
      const src = document.getElementById(btn.dataset.copy); if (!src) return;
      const text = src.textContent.replace(/\n+$/, '');
      const done = () => { btn.textContent = 'Copied'; btn.classList.add('done'); setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallback());
      else fallback();
      function fallback() { const ta = el('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (err) { /* ignore */ } ta.remove(); }
    }));
  });
})();
