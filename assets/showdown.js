/* Thumbnail Showdown — guess which thumbnail won the higher CTR.
   Self-contained, no external images: thumbnails are drawn from data. */
(function () {
  // curated pairs. ctr = real-feeling click-through %, higher wins.
  const PAIRS = [
    [{t:'I tried every productivity app', g:['#6d5bb0','#2f6fae'], ch:'Focus Lab', ctr:4.1},
     {t:'Why your to-do list keeps failing you', g:['#c2693a','#c25274'], ch:'Focus Lab', ctr:9.3}],
    [{t:'How I read 100 books this year', g:['#2f8f63','#2f6fae'], ch:'Page Turner', ctr:11.2},
     {t:'My 2024 reading list (full review)', g:['#56524d','#1C1B1A'], ch:'Page Turner', ctr:3.4}],
    [{t:'This $5 gadget changed my desk', g:['#c2693a','#6d5bb0'], ch:'Desktopia', ctr:12.8},
     {t:'Desk setup tour 2024', g:['#2f6fae','#2f8f63'], ch:'Desktopia', ctr:5.1}],
    [{t:'I quit sugar for 30 days', g:['#c25274','#c2693a'], ch:'Wellish', ctr:8.7},
     {t:'Healthy habits that actually stick', g:['#2f8f63','#6d5bb0'], ch:'Wellish', ctr:6.2}],
    [{t:'The truth about passive income', g:['#1C1B1A','#56524d'], ch:'Money Notes', ctr:7.0},
     {t:'I made $0 from passive income', g:['#c2693a','#c25274'], ch:'Money Notes', ctr:13.4}],
    [{t:'Beginner mistakes in the kitchen', g:['#6d5bb0','#c25274'], ch:'Simmer', ctr:5.5},
     {t:'You’re cooking pasta wrong', g:['#c2693a','#2f8f63'], ch:'Simmer', ctr:10.9}],
    [{t:'A normal day in my life', g:['#2f6fae','#6d5bb0'], ch:'Slow Days', ctr:3.9},
     {t:'I tracked every minute for a week', g:['#2f8f63','#c2693a'], ch:'Slow Days', ctr:9.6}],
    [{t:'Photography tips for beginners', g:['#56524d','#2f6fae'], ch:'Frame', ctr:6.4},
     {t:'Stop buying expensive cameras', g:['#c25274','#6d5bb0'], ch:'Frame', ctr:11.7}]
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

  function thumbHTML(item, side) {
    return `<button class="sd-thumb" data-side="${side}">
      <div class="pic" style="background:linear-gradient(135deg, ${item.g[0]}, ${item.g[1]})">${item.t}</div>
      <div class="meta"><span>${item.ch}</span><span class="ctr" data-ctr></span></div>
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
    arena.dataset.left = left.ctr; arena.dataset.right = right.ctr;
    arena.innerHTML = thumbHTML(left, 'left') + thumbHTML(right, 'right');
    arena.querySelectorAll('.sd-thumb').forEach(btn => btn.addEventListener('click', () => pick(btn, left, right)));
  }

  function pick(btn, left, right) {
    if (locked) return;
    locked = true;
    const side = btn.dataset.side;
    const chosen = side === 'left' ? left : right;
    const other = side === 'left' ? right : left;
    const win = chosen.ctr >= other.ctr;

    const thumbs = arena.querySelectorAll('.sd-thumb');
    thumbs.forEach(t => {
      const isLeft = t.dataset.side === 'left';
      const it = isLeft ? left : right;
      t.querySelector('[data-ctr]').textContent = it.ctr.toFixed(1) + '%';
      t.classList.add(it.ctr >= (isLeft ? right.ctr : left.ctr) ? 'win' : 'lose');
    });

    if (win) {
      streak++;
      elResult.textContent = `Right! ${chosen.ctr.toFixed(1)}% beat ${other.ctr.toFixed(1)}%.`;
      elResult.className = 'sd-result good';
      if (streak > best) { best = streak; elBest.textContent = best; try { localStorage.setItem('sd_best', best); } catch (_) {} }
    } else {
      elResult.textContent = `Nope — the other one won ${other.ctr.toFixed(1)}% to ${chosen.ctr.toFixed(1)}%.`;
      elResult.className = 'sd-result bad';
      streak = 0;
    }
    elStreak.textContent = streak;
    qi++;
    setTimeout(render, win ? 1100 : 1600);
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
