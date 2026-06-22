/* =====================================================================
   FLOATING LANTERNS — ambient interactive background toy
   ---------------------------------------------------------------------
   CONFIG — safe for a non-coder to edit. Change a value, save, reload.
   ===================================================================== */
const CONFIG = {
  theme: null,          // null = auto-follow the site (paper/ink). Or force "paper" / "ink".
  accent: null,         // null = theme default (sky). Or any "#rrggbb".
  density: 3,           // 1..6  -> roughly 3..5 lanterns. Higher = more lanterns.
  interactive: true,    // false = pure ambient, ignores pointer.
  ripples: true,        // ripple rings on pointer move + tap.
  inkTrails: true,      // the soft glowing reflections lanterns leave on the water.
  stillness: true,      // calm/bloom state after a few seconds of no input.
  trailFadeSeconds: 22, // how many seconds a trail dab takes to fade out.
  idleSeconds: 6,       // seconds of no pointer input before the pond calms.
  transparent: false,   // true = draw ONLY lanterns over the page (no water fill).
  keepOut: null,        // optional (W,H) => {x,y,w,h}: a region lanterns avoid + bounce off.
  minWidth: 0,          // if the container is narrower than this many px, render nothing.
  autoHide: 0,          // seconds to linger before a graceful self-dismiss (0 = stay forever).
  fadeSeconds: 3.5      // how long the gentle fade-out takes when autoHide fires.
};
/* ===================================================================== */

(function () {
  "use strict";

  // Theme palettes ----------------------------------------------------
  // Each lantern reuses the old per-koi colour slots:
  //   fish     -> lantern paper body
  //   fishSoft -> faint ink outline / soft reflection tint
  //   belly    -> warm inner glow colour
  const PALETTES = {
    paper: {
      // DAY: cream/amber paper, charcoal ink outline, soft warm glow.
      bg:"#FCFCFA", fish:"#f3e6c8", fishSoft:"#3a352e", belly:"#ffcf8e",
      accents:{ sky:"#2f6fae", mint:"#2f8f63", peach:"#c2693a", lavender:"#6d5bb0", rose:"#c25274" },
      trailAlpha:0.05, fishAlpha:0.9
    },
    ink: {
      // NIGHT: luminous warm lanterns on near-black water, soft halos.
      bg:"#14110d", fish:"#f6d9a6", fishSoft:"#cdb58c", belly:"#ffca6a",
      accents:{ sky:"#84B6E6", mint:"#76C9A2", peach:"#E7A47E", lavender:"#B9ABE8", rose:"#E78EA8" },
      trailAlpha:0.05, fishAlpha:0.92
    }
  };

  function detectTheme() {
    if (CONFIG.theme === "paper" || CONFIG.theme === "ink") return CONFIG.theme;
    try {
      const dt = document.documentElement.getAttribute("data-theme");
      if (dt === "dark") return "ink";
      if (dt === "light") return "paper";
      if (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) return "ink";
    } catch (e) {}
    return "paper";
  }

  // small vector helpers ---------------------------------------------
  const TAU = Math.PI * 2;
  const clamp = (v,a,b)=> v<a?a:(v>b?b:v);
  const lerp = (a,b,t)=> a+(b-a)*t;
  const rand = (a,b)=> a+Math.random()*(b-a);

  function initKoiPond(container, options) {
    if (!container) return null;
    options = options || {};
    // merge options over CONFIG (options win)
    const cfg = Object.assign({}, CONFIG, options);

    // Honor reduced motion automatically.
    let reduceMotion = false;
    try { reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}

    // Canvas + context, degrade silently ------------------------------
    let canvas, ctx;
    try {
      canvas = document.createElement("canvas");
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";
      ctx = canvas.getContext("2d");
      if (!ctx) return null;
    } catch (e) { return null; }

    // accessible pause control (sr-only, keyboard reachable) ----------
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sr-only";
    btn.textContent = "Pause pond motion";
    btn.setAttribute("aria-pressed", "false");
    btn.style.cssText = "position:absolute;left:-9999px;";
    let userPaused = false;

    container.appendChild(canvas);
    container.appendChild(btn);

    // theme + palette, re-read on toggle ------------------------------
    let theme = detectTheme();
    let PAL = PALETTES[theme];
    let accentHex = cfg.accent || PAL.accents.sky;

    function refreshTheme() {
      theme = detectTheme();
      PAL = PALETTES[theme];
      accentHex = cfg.accent || PAL.accents.sky;
    }
    let mqDark = null;
    try {
      mqDark = matchMedia("(prefers-color-scheme: dark)");
      mqDark.addEventListener ? mqDark.addEventListener("change", refreshTheme)
                              : mqDark.addListener(refreshTheme);
    } catch(e){}
    // also watch the site's data-theme attribute toggle
    let themeObserver = null;
    try {
      themeObserver = new MutationObserver(refreshTheme);
      themeObserver.observe(document.documentElement, { attributes:true, attributeFilter:["data-theme"] });
    } catch(e){}

    // sizing with devicePixelRatio ------------------------------------
    let W = 0, H = 0, dpr = 1;
    function resize() {
      const r = container.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    let resizeRAF = 0;
    function scheduleResize() {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => { resizeRAF = 0; resize(); });
    }
    window.addEventListener("resize", scheduleResize, { passive:true });
    // self-heal if the container starts at 0 size (deferred layout / late embed)
    let ro = null;
    try {
      ro = new ResizeObserver(scheduleResize);
      ro.observe(container);
    } catch(e){}

    // hex -> rgba string ----------------------------------------------
    function rgba(hex, a) {
      const h = hex.replace("#","");
      const r = parseInt(h.substring(0,2),16);
      const g = parseInt(h.substring(2,4),16);
      const b = parseInt(h.substring(4,6),16);
      return "rgba("+r+","+g+","+b+","+a+")";
    }

    // ---------------------------------------------------------------
    // LANTERN  (internal vars keep the "koi" naming; behaviour is a lantern)
    // ---------------------------------------------------------------
    const SEG = 10;                 // spine segments (drive drift + separation)
    function makeKoi(rare) {
      const len = rand(46, 70);
      const segLen = len / SEG;
      const y = rand(H*0.2, H*0.8);
      let x = rand(W*0.2, W*0.8);
      // when a keep-out is set, spawn in the side margins so a lantern is never over text
      const _ko = cfg.keepOut ? ((typeof cfg.keepOut === "function") ? cfg.keepOut(W, H) : cfg.keepOut) : null;
      if (_ko && _ko.w > 0) {
        const leftW = _ko.x, rightW = W - (_ko.x + _ko.w);
        if (Math.max(leftW, rightW) > 36) {
          x = (Math.random() < leftW / (leftW + rightW + 0.01))
            ? rand(8, Math.max(10, _ko.x - 8))
            : rand(Math.min(W - 10, _ko.x + _ko.w + 8), W - 8);
        }
      }
      const spine = [];
      for (let i = 0; i < SEG; i++) spine.push({ x: x - i*segLen, y: y });
      const w = rand(11, 16);       // lantern body half-width
      return {
        spine, segLen,
        len,
        width: w,                   // half-width of the lantern body
        bodyH: w * rand(1.5, 1.9),  // half-height (vertical oval)
        x, y,
        angle: rand(0, TAU),
        speed: rand(7, 12),         // px/sec base drift (gentler than fish)
        vx: 0, vy: 0,
        wanderAng: rand(0, TAU),
        phase: rand(0, TAU),        // sway phase
        waveSpeed: rand(0.8, 1.3),  // slow gentle sway
        bobPhase: rand(0, TAU),     // vertical bob phase
        bobSpeed: rand(0.7, 1.1),
        burst: 0,                   // drift-away energy 0..1
        burstAng: 0,
        surface: 0,                 // surfacing/rising arc 0..1 during stillness
        surfaceCool: rand(3, 12),
        rare: !!rare,
        trailClock: 0
      };
    }

    let koi = [];
    function buildKoi() {
      const n = clamp(Math.round(2 + cfg.density), 3, 5); // density 1->3 .. 6->8 clamped to 5
      koi = [];
      for (let i = 0; i < n; i++) koi.push(makeKoi(i === 0 && cfg.density >= 1 && Math.random() < 0.85));
      // ensure exactly one rare koi tinted with accent
      if (!koi.some(k=>k.rare)) koi[0].rare = true;
    }
    buildKoi();

    // ---------------------------------------------------------------
    // WATER TRAILS  (soft glowing reflections; ring buffer, age-based cull)
    // ---------------------------------------------------------------
    // Cap must comfortably exceed the dabs alive within trailFadeSeconds so
    // age-cull (not buffer overwrite) ends a trail's life -> full fade, flat memory.
    // worst case ~5 lanterns * (1/0.16s) * fadeSeconds; 768 covers the default 22s.
    const TRAIL_CAP = reduceMotion ? 160 : 768;
    const trail = new Array(TRAIL_CAP);
    let trailHead = 0, trailCount = 0;
    function addTrail(x, y, r, rare) {
      const t = trail[trailHead] || (trail[trailHead] = {});
      t.x = x; t.y = y; t.r = r; t.born = clock; t.rare = rare;
      trailHead = (trailHead + 1) % TRAIL_CAP;
      if (trailCount < TRAIL_CAP) trailCount++;
    }

    // ---------------------------------------------------------------
    // RIPPLES (capped array)
    // ---------------------------------------------------------------
    const ripples = [];
    const RIPPLE_CAP = 28;
    function addRipple(x, y, strength) {
      if (!cfg.ripples || reduceMotion) return;
      ripples.push({ x, y, r: 2, max: rand(40, 80) * strength, born: clock, life: rand(2.2, 3.4) });
      if (ripples.length > RIPPLE_CAP) ripples.shift();
    }

    // ---------------------------------------------------------------
    // POINTER — listeners on window/document, passive, never block
    // ---------------------------------------------------------------
    const pointer = { x: -1, y: -1, active: false, lastMove: -1 };
    let lastInput = -9999;      // clock time of last input
    let rippleThrottle = 0;

    function toLocal(clientX, clientY) {
      const r = container.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    }
    function onMove(clientX, clientY) {
      if (!cfg.interactive) return;
      const p = toLocal(clientX, clientY);
      if (p.x < 0 || p.y < 0 || p.x > W || p.y > H) { pointer.active = false; return; }
      pointer.x = p.x; pointer.y = p.y; pointer.active = true;
      lastInput = clock;
      // throttle ripples to ~ every 0.12s of motion
      if (clock - rippleThrottle > 0.12) {
        rippleThrottle = clock;
        addRipple(p.x, p.y, 0.55);
      }
    }
    function onTap(clientX, clientY) {
      if (!cfg.interactive) return;
      const p = toLocal(clientX, clientY);
      if (p.x < 0 || p.y < 0 || p.x > W || p.y > H) return;
      lastInput = clock;
      addRipple(p.x, p.y, 1.15);
      // nearest lantern gently drifts away (ease-out, then settles)
      let best = null, bd = Infinity;
      for (const k of koi) {
        const d = (k.x-p.x)*(k.x-p.x) + (k.y-p.y)*(k.y-p.y);
        if (d < bd) { bd = d; best = k; }
      }
      if (best) {
        best.burst = 1;
        best.burstAng = Math.atan2(best.y - p.y, best.x - p.x);
      }
    }

    const opts = { passive: true };
    window.addEventListener("pointermove", e => onMove(e.clientX, e.clientY), opts);
    window.addEventListener("touchmove", e => { const t=e.touches[0]; if(t) onMove(t.clientX,t.clientY); }, opts);
    window.addEventListener("click", e => onTap(e.clientX, e.clientY), opts);
    window.addEventListener("touchend", e => { const t=e.changedTouches[0]; if(t) onTap(t.clientX,t.clientY); }, opts);

    // ---------------------------------------------------------------
    // SIMULATION
    // ---------------------------------------------------------------
    let calm = 0;       // 0 active .. 1 fully calm/still
    let clock = 0;      // seconds since start

    // text keep-out: lanterns avoid + bounce off this region (cached once per frame)
    let _koRect = null, _koClock = -1;
    function getKeepOut() {
      if (!cfg.keepOut) return null;
      if (clock === _koClock) return _koRect;
      _koClock = clock;
      try {
        const r = (typeof cfg.keepOut === "function") ? cfg.keepOut(W, H) : cfg.keepOut;
        _koRect = (r && r.w > 0) ? { x: r.x, y: r.y, w: r.w, h: r.h } : null;
      } catch (e) { _koRect = null; }
      return _koRect;
    }
    function inKeepOut(x, y, pad) {
      const r = getKeepOut(); if (!r) return false;
      return x > r.x - pad && x < r.x + r.w + pad && y > r.y - pad && y < r.y + r.h + pad;
    }

    function steer(k, dt) {
      // wander: slowly rotate a wander target
      k.wanderAng += rand(-0.6, 0.6) * dt;
      let desiredX = Math.cos(k.wanderAng);
      let desiredY = Math.sin(k.wanderAng);
      let weight = 1;

      // attraction to pointer (gentle, within radius)
      if (cfg.interactive && pointer.active && k.burst <= 0.01 && !inKeepOut(pointer.x, pointer.y, 0)) {
        const dx = pointer.x - k.x, dy = pointer.y - k.y;
        const dist = Math.hypot(dx, dy) || 1;
        const R = 230;
        if (dist < R) {
          const pull = (1 - dist / R) * 1.6;
          desiredX += (dx / dist) * pull;
          desiredY += (dy / dist) * pull;
          weight += pull;
        }
      }

      // separation: push away from nearby lanterns
      for (const o of koi) {
        if (o === k) continue;
        const dx = k.x - o.x, dy = k.y - o.y;
        const d2 = dx*dx + dy*dy;
        const minD = (k.width + o.width) * 3.4;
        if (d2 < minD*minD && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / minD) * 1.4;
          desiredX += (dx / d) * f;
          desiredY += (dy / d) * f;
          weight += f * 0.6;
        }
      }

      // soft edge steering: stay within bounds
      const margin = 70;
      if (k.x < margin) { desiredX += (1 - k.x/margin) * 1.8; }
      if (k.x > W - margin) { desiredX -= (1 - (W-k.x)/margin) * 1.8; }
      if (k.y < margin) { desiredY += (1 - k.y/margin) * 1.8; }
      if (k.y > H - margin) { desiredY -= (1 - (H-k.y)/margin) * 1.8; }

      // text keep-out: steer toward the nearest edge OUT of the reading region
      const ko = getKeepOut();
      if (ko) {
        const pad = k.width + 24;
        const x0 = ko.x - pad, x1 = ko.x + ko.w + pad, y0 = ko.y - pad, y1 = ko.y + ko.h + pad;
        if (k.x > x0 && k.x < x1 && k.y > y0 && k.y < y1) {
          const dl = k.x - x0, dr = x1 - k.x, dtp = k.y - y0, db = y1 - k.y;
          const m = Math.min(dl, dr, dtp, db), F = 3.6;
          if (m === dl) desiredX -= F; else if (m === dr) desiredX += F;
          else if (m === dtp) desiredY -= F; else desiredY += F;
          weight += F;
        }
      }

      // drift-away burst overrides direction (gentle, eases out)
      if (k.burst > 0.01) {
        desiredX = Math.cos(k.burstAng);
        desiredY = Math.sin(k.burstAng);
        weight = 3;
      }

      // desired heading
      const targetAng = Math.atan2(desiredY, desiredX);
      // smooth turn, limited turn rate
      let da = targetAng - k.angle;
      while (da > Math.PI) da -= TAU;
      while (da < -Math.PI) da += TAU;
      const maxTurn = (k.burst > 0.01 ? 2.6 : 1.4) * dt;
      k.angle += clamp(da, -maxTurn, maxTurn);

      // speed: base drift, slowed when calm, eased up on a drift-away
      const calmFactor = lerp(1, 0.32, calm);
      let spd = k.speed * calmFactor;
      // ease-out push: strongest at the start, fades smoothly to a settle
      if (k.burst > 0.01) spd += 46 * (k.burst * k.burst);
      if (reduceMotion) spd *= 0.4;

      k.vx = Math.cos(k.angle) * spd;
      k.vy = Math.sin(k.angle) * spd;
      k.x += k.vx * dt;
      k.y += k.vy * dt;

      // keep inside hard bounds (safety)
      k.x = clamp(k.x, 6, W - 6);
      k.y = clamp(k.y, 6, H - 6);

      // hard bounce off the keep-out so a lantern never sits over text
      const kob = getKeepOut();
      if (kob) {
        const pad = k.width + 6;
        const x0 = kob.x - pad, x1 = kob.x + kob.w + pad, y0 = kob.y - pad, y1 = kob.y + kob.h + pad;
        if (k.x > x0 && k.x < x1 && k.y > y0 && k.y < y1) {
          const dl = k.x - x0, dr = x1 - k.x, dtp = k.y - y0, db = y1 - k.y;
          const m = Math.min(dl, dr, dtp, db);
          if (m === dl) { k.x = x0; k.angle = Math.PI - k.angle; }
          else if (m === dr) { k.x = x1; k.angle = Math.PI - k.angle; }
          else if (m === dtp) { k.y = y0; k.angle = -k.angle; }
          else { k.y = y1; k.angle = -k.angle; }
        }
      }

      // decay the drift-away energy (ease-out, then settles)
      if (k.burst > 0) k.burst = Math.max(0, k.burst - dt * 1.1);

      // stillness rising/surfacing arc
      if (cfg.stillness && !reduceMotion) {
        if (calm > 0.6) {
          k.surfaceCool -= dt;
          if (k.surfaceCool <= 0 && k.surface <= 0) { k.surface = 0.0001; k.surfaceCool = rand(8, 18); }
        }
        if (k.surface > 0) {
          k.surface += dt * 0.5;
          if (k.surface >= 1) k.surface = 0; // one slow arc then reset
        }
      }

      // gentle sway + vertical bob, mostly independent of drift speed
      k.phase += dt * k.waveSpeed;
      k.bobPhase += dt * k.bobSpeed;
    }

    function updateSpine(k, dt) {
      // head leads; each segment follows at a fixed distance so the lantern
      // leaves a soft drifting wake of reflection points behind it.
      const head = k.spine[0];
      head.x = k.x; head.y = k.y;
      for (let i = 1; i < SEG; i++) {
        const prev = k.spine[i-1];
        const cur = k.spine[i];
        let dx = cur.x - prev.x, dy = cur.y - prev.y;
        let d = Math.hypot(dx, dy) || 0.0001;
        cur.x = prev.x + (dx/d) * k.segLen;
        cur.y = prev.y + (dy/d) * k.segLen;
      }

      // water trail: drop a soft glow/reflection dab beneath the lantern.
      if (cfg.inkTrails) {
        k.trailClock += dt;
        const interval = lerp(0.16, 0.32, calm);
        if (k.trailClock >= interval) {
          k.trailClock = 0;
          // a touch below the lantern body, where its glow meets the water
          addTrail(k.x, k.y + k.bodyH * 0.6, k.width * lerp(0.9, 1.6, calm), k.rare);
        }
      }
    }

    // ---------------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------------
    // draw a soft rounded-oval lantern body path centred at (0,0)
    function lanternBodyPath(w, h) {
      // a gently rounded vertical oval, slightly flattened top & bottom
      ctx.beginPath();
      ctx.moveTo(0, -h);
      ctx.bezierCurveTo(  w*1.16, -h*0.86,  w*1.16,  h*0.86,  0,  h);
      ctx.bezierCurveTo( -w*1.16,  h*0.86, -w*1.16, -h*0.86,  0, -h);
      ctx.closePath();
    }

    function drawKoi(k) {
      // surfacing lifts the lantern slightly (a slow gentle arc)
      const surf = k.surface > 0 ? Math.sin(k.surface * Math.PI) : 0;
      const scale = 1 + surf * 0.10;

      // gentle bob + slow sway, plus a small lift while surfacing
      const sway = Math.sin(k.phase) * (k.width * 0.10);
      const bob  = Math.cos(k.bobPhase) * (k.bodyH * 0.05);
      const cx = k.x + sway;
      const cy = k.y + bob - surf * (k.bodyH * 0.9);

      const w = k.width * scale;
      const h = k.bodyH  * scale;

      const paper   = k.rare ? accentHex : PAL.fish;        // paper body
      const glow    = k.rare ? accentHex : PAL.belly;       // warm inner light
      const outline = PAL.fishSoft;                         // faint ink outline
      const night   = theme === "ink";

      // --- faint reflection on the water beneath ---
      ctx.save();
      ctx.globalAlpha = night ? 0.22 : 0.16;
      const refl = ctx.createRadialGradient(cx, cy + h*1.5, 0, cx, cy + h*1.5, h*1.7);
      refl.addColorStop(0, rgba(glow, 1));
      refl.addColorStop(1, rgba(glow, 0));
      ctx.fillStyle = refl;
      ctx.beginPath();
      ctx.ellipse(cx, cy + h*1.45, w*1.05, h*0.6, 0, 0, TAU);
      ctx.fill();
      ctx.restore();

      // --- soft outer halo of glow ---
      ctx.save();
      const halo = ctx.createRadialGradient(cx, cy, h*0.2, cx, cy, h*2.0);
      halo.addColorStop(0, rgba(glow, night ? 0.30 : 0.16));
      halo.addColorStop(1, rgba(glow, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, h*2.0, 0, TAU);
      ctx.fill();
      ctx.restore();

      // --- top loop / hanger ---
      ctx.save();
      ctx.strokeStyle = rgba(outline, PAL.fishAlpha * 0.45);
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(cx, cy - h*1.16, w*0.16, 0, TAU);
      ctx.stroke();
      ctx.restore();

      // --- lantern body: paper fill + warm inner glow ---
      ctx.save();
      ctx.translate(cx, cy);

      // paper body
      lanternBodyPath(w, h);
      ctx.fillStyle = rgba(paper, PAL.fishAlpha * (night ? 0.42 : 0.6));
      ctx.fill();

      // warm inner light, brightest at centre
      const inner = ctx.createRadialGradient(0, h*0.05, 0, 0, 0, h*1.05);
      inner.addColorStop(0, rgba(glow, night ? 0.85 : 0.6));
      inner.addColorStop(0.55, rgba(glow, night ? 0.4 : 0.28));
      inner.addColorStop(1, rgba(glow, 0));
      lanternBodyPath(w, h);
      ctx.fillStyle = inner;
      ctx.fill();

      // faint ink outline
      lanternBodyPath(w, h);
      ctx.strokeStyle = rgba(outline, PAL.fishAlpha * (night ? 0.28 : 0.5));
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // a couple of faint vertical paper ribs
      ctx.strokeStyle = rgba(outline, PAL.fishAlpha * (night ? 0.14 : 0.22));
      ctx.lineWidth = 0.8;
      for (const rx of [-w*0.5, w*0.5]) {
        ctx.beginPath();
        ctx.moveTo(rx, -h*0.78);
        ctx.quadraticCurveTo(rx*1.18, 0, rx, h*0.78);
        ctx.stroke();
      }
      ctx.restore();

      // --- tiny bottom tassel ---
      ctx.save();
      ctx.strokeStyle = rgba(outline, PAL.fishAlpha * 0.4);
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(cx, cy + h);
      ctx.lineTo(cx, cy + h*1.28);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + h*1.32, w*0.1, 0, TAU);
      ctx.fillStyle = rgba(outline, PAL.fishAlpha * 0.4);
      ctx.fill();
      ctx.restore();

      // surfacing ripple ring on the water as it rises
      if (surf > 0.2) {
        ctx.beginPath();
        ctx.arc(k.x, k.y + h*1.45, h*2.0*surf, 0, TAU);
        ctx.strokeStyle = rgba(k.rare ? accentHex : PAL.fishSoft, 0.10 * surf);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }

    function drawTrails() {
      // soft glowing reflections that spread and fade on the water;
      // they bloom a touch wider when calm, accumulating into a calm wash.
      const fade = cfg.trailFadeSeconds;
      const bloom = 1 + calm * 0.7;
      const warm = theme === "ink" ? PAL.belly : PAL.fishSoft;
      for (let n = 0; n < trailCount; n++) {
        const idx = (trailHead - 1 - n + TRAIL_CAP * 2) % TRAIL_CAP;
        const t = trail[idx];
        if (!t) continue;
        const age = clock - t.born;
        if (age >= fade) continue;
        const lifeT = 1 - age / fade;          // 1 fresh -> 0 gone
        const a = (PAL.trailAlpha) * Math.pow(lifeT, 1.3);
        const r = t.r * bloom * (0.8 + (1 - lifeT) * 1.1); // widen as it ages
        const col = t.rare ? accentHex : warm;
        // soft-edged glow rather than a hard dab
        const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r);
        g.addColorStop(0, rgba(col, a));
        g.addColorStop(1, rgba(col, 0));
        ctx.beginPath();
        ctx.arc(t.x, t.y, r, 0, TAU);
        ctx.fillStyle = g;
        ctx.fill();
      }
    }

    function drawRipples(dt) {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const age = clock - rp.born;
        const t = age / rp.life;
        if (t >= 1) { ripples.splice(i, 1); continue; }
        const r = lerp(rp.r, rp.max, 1 - Math.pow(1 - t, 2));
        const a = (1 - t) * 0.16;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r, 0, TAU);
        ctx.strokeStyle = rgba(accentHex, a);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    // ---------------------------------------------------------------
    // LOOP — fixed timestep accumulator
    // ---------------------------------------------------------------
    const STEP = 1000 / 60;     // ms
    let acc = 0, last = performance.now(), raf = 0, running = false, destroyed = false;

    function simulate(dtSec) {
      clock += dtSec;
      // calm target: 1 if idle past threshold, else ease back fast on input
      const idle = clock - lastInput;
      const wantCalm = (cfg.stillness && idle > cfg.idleSeconds) ? 1 : 0;
      // ease toward calm slowly; ease back to active fast (~0.5s) on input
      calm += (wantCalm - calm) * clamp(dtSec * (wantCalm > calm ? 0.6 : 2.4), 0, 1);
      if (reduceMotion) calm = Math.max(calm, 0.85);

      for (const k of koi) { steer(k, dtSec); updateSpine(k, dtSec); }
    }

    function render() {
      if (cfg.transparent) {
        // embedded over the page: draw only lanterns, let the site show through.
        ctx.clearRect(0, 0, W, H);
      } else {
        // fade-paint the water to let reflections persist & bloom (translucent wash).
        const washA = lerp(0.10, 0.045, calm);   // slower fade when calm = glow blooms
        ctx.fillStyle = rgba(PAL.bg, washA);
        ctx.fillRect(0, 0, W, H);
      }

      drawTrails();
      drawRipples();
      for (const k of koi) drawKoi(k);
    }

    function frame(now) {
      if (!running) return;
      let dt = now - last; last = now;
      if (dt > 250) dt = STEP;          // clamp huge gaps (tab switch)
      if (userPaused) {                 // frozen: hold the last frame
        acc = 0;
        if (cfg.transparent) { ctx.clearRect(0,0,W,H); }
        else { ctx.fillStyle = rgba(PAL.bg, 0.04); ctx.fillRect(0,0,W,H); }
        drawTrails();
        for (const k of koi) drawKoi(k);
        raf = requestAnimationFrame(frame);
        return;
      }
      acc += dt;
      let steps = 0;
      while (acc >= STEP && steps < 5) { simulate(STEP/1000); acc -= STEP; steps++; }
      if (steps === 5) acc = 0;         // avoid spiral of death
      render();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || destroyed) return;
      running = true; last = performance.now(); acc = 0;
      // prime background once so first frames aren't empty (skip when transparent)
      if (!cfg.transparent) { ctx.fillStyle = PAL.bg; ctx.fillRect(0,0,W,H); }
      raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    // pause when hidden, resume on focus (reset accumulator) ----------
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else { if (!userPaused) { resize(); last = performance.now(); acc = 0; start(); } }
    });
    window.addEventListener("focus", () => { if (!document.hidden && !userPaused) { resize(); last = performance.now(); acc = 0; start(); } });

    // pause button toggles freeze ------------------------------------
    btn.addEventListener("click", () => {
      userPaused = !userPaused;
      btn.setAttribute("aria-pressed", String(userPaused));
      btn.textContent = userPaused ? "Resume pond motion" : "Pause pond motion";
      if (!userPaused) { last = performance.now(); acc = 0; }
    });

    start();

    // public handle
    const api = {
      destroy() {
        destroyed = true;
        stop();
        try { mqDark && (mqDark.removeEventListener ? mqDark.removeEventListener("change",refreshTheme) : mqDark.removeListener(refreshTheme)); } catch(e){}
        try { themeObserver && themeObserver.disconnect(); } catch(e){}
        try { ro && ro.disconnect(); } catch(e){}
        try { container.removeChild(canvas); container.removeChild(btn); } catch(e){}
      },
      setAccent(hex){ cfg.accent = hex; accentHex = hex; },
      pause(){ if(!userPaused) btn.click(); },
      resume(){ if(userPaused) btn.click(); }
    };

    // playful auto-dismiss: linger, then gently fade out and fully tear down,
    // so it is gone before anyone notices (no lingering animation loop).
    if (cfg.autoHide > 0) {
      const fadeMs = Math.max(0, (cfg.fadeSeconds != null ? cfg.fadeSeconds : 3.5) * 1000);
      setTimeout(() => {
        if (destroyed || userPaused) return;
        canvas.style.transition = "opacity " + (fadeMs / 1000) + "s cubic-bezier(.4,0,.2,1)";
        void canvas.offsetHeight;   // force a reflow so the opacity transition reliably animates
        canvas.style.opacity = "0";
        setTimeout(() => { try { api.destroy(); } catch (e) {} }, fadeMs + 120);
      }, cfg.autoHide * 1000);
    }

    return api;
  }

  // expose + auto-mount ----------------------------------------------
  window.initKoiPond = initKoiPond;
  function mount() {
    const el = document.getElementById("koi-pond");
    if (!el || el.__koiMounted) return;
    const ds = el.dataset || {};
    // desktop-only gate: skip where there is no margin room for lanterns
    if (ds.minWidth && window.innerWidth < parseFloat(ds.minWidth)) return;
    el.__koiMounted = true;
    const o = {};
    if (ds.density) o.density = parseFloat(ds.density);
    if (ds.accent) o.accent = ds.accent;
    if (ds.theme) o.theme = ds.theme;
    if (ds.autoHide) o.autoHide = parseFloat(ds.autoHide);
    if (ds.fadeSeconds) o.fadeSeconds = parseFloat(ds.fadeSeconds);
    if (ds.transparent === "true" || ds.transparent === "") o.transparent = true;
    if (ds.keepoutWidth) {                       // a centred reading band lanterns avoid
      const kw = parseFloat(ds.keepoutWidth);
      o.keepOut = function (W) { const bw = Math.min(kw, W); return { x: (W - bw) / 2, y: 0, w: bw, h: 1e7 }; };
    }
    try { initKoiPond(el, o); } catch (e) { /* degrade silently */ }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
