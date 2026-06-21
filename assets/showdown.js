/* Thumbnail Showdown — REAL YouTube videos. Guess which one over-performed its
   own channel more. "breakout" = vidIQ breakout score (how far a video beat its
   channel's typical performance); higher wins. Thumbnails load from YouTube.
   Data is a curated snapshot pulled via vidIQ outliers — refresh periodically. */
(function () {
  const PAIRS = [
    [{id:'-0C9rt84MdM', t:'Your iPhone Is Tracking You — Turn This Off', ch:'Trevor Nace', score:4862, views:4759417},
     {id:'KIwKEIMjBLM', t:"iPhone 17: A Photographer's Review", ch:'Tyler Stalman', score:22.7, views:2570033}],
    [{id:'CaeOdRY6Qnw', t:'New Freediving World Record — 126m', ch:'Molchanovs Freediving', score:958.9, views:4051266},
     {id:'nuBnP_GH_20', t:'Koenigsegg Jesko 0-400-0 — World Record', ch:'Koenigsegg', score:4.8, views:3003277}],
    [{id:'ZHI7COyl6WA', t:'Thor Björnsson — 510kg Deadlift World Record', ch:'Giants Live', score:95.5, views:1619878},
     {id:'2mR4WBD2L4c', t:"I Spent 24hrs With Kaleb Cooper on Clarkson's Farm", ch:'Eddie Hall The Beast', score:4.0, views:1749001}],
    [{id:'JwH30zXhXr8', t:'Vispy Kharadi — Heaviest Weight on the Body', ch:'Guinness World Records', score:36.4, views:2475676},
     {id:'QNPruY6Kxs0', t:'Vispy Kharadi — Hercules Pillars Record', ch:'Guinness World Records', score:23.2, views:1579933}],
    [{id:'-p-2DsC_El8', t:'Sydney McLaughlin Anchors Team USA 4x400', ch:'NBC Sports', score:115.1, views:2025819},
     {id:'7uB9BqanPtY', t:'Pro Climber Breaks Grip Strength World Record', ch:'Emil Abrahamsson', score:9.1, views:3372963}],
    [{id:'Mks7xPjHy4s', t:'5 Phones That Destroyed the iPhone 17 Pro Max', ch:'Gadget Evolution', score:56.5, views:2513113},
     {id:'eftuMBS-pzU', t:'This 3-Minute Breakfast Got Me to 12% Body Fat', ch:'Dan Go', score:25.8, views:1695929}],
    [{id:'qVS4vaNfPlQ', t:'New World Record: 240,000 Domino Planks', ch:'Hevesh5', score:12.6, views:7005285},
     {id:'-sgt2Ma2GO8', t:'Two Idiots Play GeoGuessr for $1000', ch:'ohnepixel raw', score:11.1, views:1640614}]
  ];

  const arena = document.getElementById('sd-arena');
  if (!arena) return;
  const elStreak = document.getElementById('sd-streak');
  const elBest = document.getElementById('sd-best');
  const elResult = document.getElementById('sd-result');
  const btnShare = document.getElementById('sd-share');

  let streak = 0;
  let best = 0;
  try { best = parseInt(localStorage.getItem('sd_best') || '0', 10) || 0; } catch (_) {}
  elBest.textContent = best;

  let order = shuffle([...Array(PAIRS.length).keys()]);
  let qi = 0;
  let locked = false;

  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function fmtScore(s) { return s >= 10 ? Math.round(s).toLocaleString() : s.toFixed(1); }
  function fmtViews(v) { return v >= 1e6 ? (v / 1e6).toFixed(1) + 'M' : v >= 1e3 ? Math.round(v / 1e3) + 'K' : String(v); }

  function thumbHTML(item, side) {
    return `<button class="sd-thumb" data-side="${side}">
      <div class="pic"><img src="https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg" alt="" loading="lazy"
        onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${item.id}/hqdefault.jpg'"></div>
      <div class="info">
        <div class="t">${item.t}</div>
        <div class="meta"><span class="ch">${item.ch}</span><span class="ctr" data-ctr></span></div>
      </div>
    </button>`;
  }

  function render() {
    locked = false;
    elResult.textContent = ''; elResult.className = 'sd-result';
    if (qi >= order.length) { order = shuffle(order); qi = 0; }
    const pair = PAIRS[order[qi]];
    const flip = Math.random() < 0.5;
    const left = flip ? pair[1] : pair[0];
    const right = flip ? pair[0] : pair[1];
    arena.innerHTML = thumbHTML(left, 'left') + thumbHTML(right, 'right');
    arena.querySelectorAll('.sd-thumb').forEach(btn => btn.addEventListener('click', () => pick(btn, left, right)));
  }

  function pick(btn, left, right) {
    if (locked) return;
    locked = true;
    const side = btn.dataset.side;
    const chosen = side === 'left' ? left : right;
    const other = side === 'left' ? right : left;
    const win = chosen.score >= other.score;

    arena.querySelectorAll('.sd-thumb').forEach(t => {
      const isLeft = t.dataset.side === 'left';
      const it = isLeft ? left : right;
      const opp = isLeft ? right : left;
      t.querySelector('[data-ctr]').textContent = 'breakout ' + fmtScore(it.score);
      t.classList.add(it.score >= opp.score ? 'win' : 'lose');
    });

    if (win) {
      streak++;
      elResult.textContent = `Right! Breakout ${fmtScore(chosen.score)} vs ${fmtScore(other.score)} — ${fmtViews(chosen.views)} views.`;
      elResult.className = 'sd-result good';
      if (streak > best) { best = streak; elBest.textContent = best; try { localStorage.setItem('sd_best', best); } catch (_) {} }
    } else {
      elResult.textContent = `Nope — the other one over-performed: breakout ${fmtScore(other.score)} vs ${fmtScore(chosen.score)}.`;
      elResult.className = 'sd-result bad';
      streak = 0;
    }
    elStreak.textContent = streak;
    qi++;
    setTimeout(render, win ? 1300 : 1800);
  }

  btnShare.addEventListener('click', async () => {
    const card = TS.makeCard({
      width: 1080, height: 1080,
      draw(ctx, w, h) {
        ctx.textAlign = 'center';
        ctx.fillStyle = TS.colors.inkFaint;
        ctx.font = `500 30px ${TS.MONO}`;
        ctx.fillText('THUMBNAIL SHOWDOWN', w / 2, 180);
        ctx.fillStyle = TS.colors.ink;
        ctx.font = `600 280px ${TS.SERIF}`;
        ctx.fillText(String(best), w / 2, h / 2 + 90);
        ctx.font = `500 46px ${TS.SANS}`;
        ctx.fillStyle = TS.colors.inkSoft;
        ctx.fillText('best streak — can you beat it?', w / 2, h / 2 + 200);
        TS.watermark(ctx, w, h, TS.SITE + '/#showdown');
      }
    });
    await TS.shareOrDownload(card, 'thumbnail-showdown.png', `My Thumbnail Showdown streak: ${best}. Beat me → ${TS.SITE}`);
    TS.confetti();
  });

  render();
})();
