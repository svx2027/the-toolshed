/* The Toolshed — shared helpers (no build step, plain ES). Global: window.TS */
(function () {
  const TS = {};

  /* ---------- palette (mirrors brand.css) ---------- */
  TS.colors = {
    paper: '#FCFCFA', ink: '#1C1B1A', inkSoft: '#56524d', inkFaint: '#8b867f',
    lavender: '#E6E0F2', peach: '#F8E2D4', mint: '#DFF0E6', sky: '#DCEAF5',
    accSky: '#2f6fae', accMint: '#2f8f63', accPeach: '#c2693a', accLavender: '#6d5bb0', accRose: '#c25274'
  };

  /* ---------- toast ---------- */
  let toastEl;
  TS.toast = function (msg, ms = 2200) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove('show'), ms);
  };

  /* ---------- canvas helpers ---------- */
  TS.roundRect = function (ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  // soft pastel-rainbow wash for share cards
  TS.washBackground = function (ctx, w, h) {
    ctx.fillStyle = TS.colors.paper;
    ctx.fillRect(0, 0, w, h);
    const blooms = [
      [w * 0.12, h * 0.08, 'rgba(230,224,242,0.9)'],
      [w * 0.92, h * 0.12, 'rgba(248,226,212,0.85)'],
      [w * 0.85, h * 0.9, 'rgba(223,240,230,0.85)'],
      [w * 0.1, h * 0.92, 'rgba(220,234,245,0.88)']
    ];
    blooms.forEach(([cx, cy, col]) => {
      const r = Math.max(w, h) * 0.6;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, col);
      g.addColorStop(1, 'rgba(252,252,250,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
  };

  // wrap text into lines that fit maxWidth; returns array of lines
  TS.wrapText = function (ctx, text, maxWidth) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  };

  // shrink font until text fits one line within maxWidth
  TS.fitFont = function (ctx, text, family, weight, startPx, minPx, maxWidth) {
    let px = startPx;
    while (px > minPx) {
      ctx.font = `${weight} ${px}px ${family}`;
      if (ctx.measureText(text).width <= maxWidth) break;
      px -= 2;
    }
    return px;
  };

  TS.SERIF = "Fraunces, Georgia, serif";
  TS.SANS = "Inter, -apple-system, system-ui, sans-serif";
  TS.MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace";
  TS.SITE = "shivamvashisth.com";

  // small site watermark bottom-centre
  TS.watermark = function (ctx, w, h, label) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = TS.colors.inkFaint;
    ctx.font = `500 26px ${TS.MONO}`;
    ctx.fillText(label || TS.SITE, w / 2, h - 70);
    ctx.restore();
  };

  /* ---------- the share-card engine ----------
     opts: { draw(ctx,w,h), width=1080, height=1920, filename='card.png', wash=true } */
  TS.makeCard = function (opts) {
    const w = opts.width || 1080, h = opts.height || 1920;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if (opts.wash !== false) TS.washBackground(ctx, w, h);
    opts.draw(ctx, w, h);
    return c;
  };

  TS.canvasToBlob = function (canvas) {
    return new Promise((res) => canvas.toBlob(res, 'image/png', 0.95));
  };

  // download + native share if available. Returns true on success.
  TS.shareOrDownload = async function (canvas, filename, shareText) {
    const blob = await TS.canvasToBlob(canvas);
    const file = new File([blob], filename, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: shareText || '', title: 'The Toolshed' });
        return true;
      } catch (e) { if (e && e.name === 'AbortError') return false; /* fall through to download */ }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    TS.toast('Card saved to your downloads');
    return true;
  };

  TS.copyLink = async function (url) {
    try { await navigator.clipboard.writeText(url); TS.toast('Link copied'); }
    catch (e) { TS.toast('Copy failed — long-press to copy'); }
  };

  /* ---------- lightweight confetti (canvas, ~1.2s) ---------- */
  TS.confetti = function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas');
    c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:300';
    c.width = innerWidth; c.height = innerHeight;
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const cols = ['#6d5bb0', '#c2693a', '#2f8f63', '#2f6fae', '#c25274'];
    const N = 120, parts = [];
    for (let i = 0; i < N; i++) parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight / 3,
      vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 4,
      s: Math.random() * 8 + 4, col: cols[i % cols.length], rot: Math.random() * 6, vr: (Math.random() - .5) * .4
    });
    let t = 0;
    (function frame() {
      t++; ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach(p => {
        p.vy += 0.5; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); ctx.restore();
      });
      if (t < 90) requestAnimationFrame(frame); else c.remove();
    })();
  };

  /* ---------- shared footer injector ---------- */
  TS.footer = function () {
    const year = new Date().getFullYear();
    return `<footer class="foot"><div class="wrap">
      <span>Made in a garage, with AI, by one creator who replies to DMs.</span>
      <span>© ${year} Code for Creatives India · <a href="/">The Garage</a> · <a href="https://instagram.com/svx2027" target="_blank" rel="noopener">@svx2027</a> · <a href="mailto:hi@shivamvashisth.com">hi@shivamvashisth.com</a></span>
    </div></footer>`;
  };

  // standard back-to-Garage bar for tool pages
  TS.toolnav = function () {
    return `<nav class="toolnav"><div class="wrap">
      <a class="back" href="/">← The Garage</a>
      <a class="back" href="/#toolshed">more tools</a>
    </div></nav>`;
  };

  /* ---------- jargon: plain-English definitions on hover / tap ---------- */
  TS.GLOSSARY = {
    prompt: "What you type to tell an AI what you want.",
    terminal: "The text window where you type commands. Scarier-looking than it is.",
    ship: "To actually release it, not just plan it forever.",
    "no-code": "Building software with visual tools or AI, without writing code.",
    static: "A website that is just files. Fast, cheap, hard to break.",
    canvas: "The browser's drawing board. It's how the share-cards get made.",
    backend: "The server side you never see. Most apps here skip it.",
    api: "A way for two apps to talk to each other.",
    png: "An image file, the kind you would actually post.",
    github: "A giant, free library of code and tools anyone can use.",
    skill: "A saved instruction pack that teaches an AI one specific job."
  };
  var jCount = 0;
  TS.initJargon = function () {
    var nodes = document.querySelectorAll('.jargon[data-define]');
    for (var i = 0; i < nodes.length; i++) {
      (function (el) {
        if (el._jReady) return;
        var key = (el.getAttribute('data-define') || el.textContent || '').trim().toLowerCase();
        var def = TS.GLOSSARY[key];
        if (!def) return;
        el._jReady = true;
        var pop = document.createElement('span');
        pop.className = 'jargon-pop';
        pop.id = 'jdef-' + (++jCount);
        pop.setAttribute('role', 'tooltip');
        pop.textContent = def; // textContent only — never innerHTML
        el.appendChild(pop);
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-describedby', pop.id);
        function toggle(e) {
          e.preventDefault(); e.stopPropagation();
          var willOpen = !el.classList.contains('open');
          var others = document.querySelectorAll('.jargon.open');
          for (var k = 0; k < others.length; k++) others[k].classList.remove('open');
          if (willOpen) el.classList.add('open');
        }
        el.addEventListener('click', toggle);
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') toggle(e);
          else if (e.key === 'Escape') el.classList.remove('open');
        });
      })(nodes[i]);
    }
    if (!TS._jDoc) {
      TS._jDoc = true;
      document.addEventListener('click', function () {
        var open = document.querySelectorAll('.jargon.open');
        for (var k = 0; k < open.length; k++) open[k].classList.remove('open');
      });
    }
  };

  /* ---------- theme (light / dark) ---------- */
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

  TS.getTheme = function () { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; };
  TS.setTheme = function (t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('ts_theme', t); } catch (e) {}
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].innerHTML = t === 'dark' ? SUN : MOON;
      btns[i].setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btns[i].setAttribute('title', t === 'dark' ? 'Light mode' : 'Dark mode');
    }
  };
  TS.toggleTheme = function () { TS.setTheme(TS.getTheme() === 'dark' ? 'light' : 'dark'); };

  TS.initTheme = function () {
    if (!document.documentElement.getAttribute('data-theme')) {
      var stored = null; try { stored = localStorage.getItem('ts_theme'); } catch (e) {}
      var sys = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', stored || sys);
    }
    var host = document.querySelector('.nav .links') || document.querySelector('.toolnav .wrap');
    if (host && !host.querySelector('.theme-toggle')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-toggle';
      btn.addEventListener('click', TS.toggleTheme);
      host.appendChild(btn);
    }
    TS.setTheme(TS.getTheme());
  };

  window.TS = TS;

  function TS_init() { TS.initTheme(); TS.initJargon(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', TS_init);
  else TS_init();
})();
