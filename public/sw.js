/* The Toolshed service worker: offline-capable Thumbnail Showdown + fast repeat loads.
   Strategy:
   - YouTube thumbnails (i.ytimg.com): cache-first, fetched with CORS so entries are
     real-sized (no opaque quota padding). Prefetched in the background for offline play.
   - /showdown-pairs.json: stale-while-revalidate.
   - /_next/static/* (immutable, hashed): cache-first.
   - everything else same-origin (HTML, tool pages, /assets/*): network-first with cache
     fallback, so updates always propagate and nothing is ever stuck stale.
   - /api/* and non-GET: passed straight to the network (never cached). */

const VERSION = "ts-v1";
const SHELL = `shell-${VERSION}`;
const THUMBS = `thumbs-${VERSION}`;
const DATA = `data-${VERSION}`;
const KEEP = [SHELL, THUMBS, DATA];

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

const isThumb = (url) => url.hostname === "i.ytimg.com" || url.hostname === "img.youtube.com";

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (isThumb(url)) return e.respondWith(thumbFirst(url.href));
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname === "/showdown-pairs.json") return e.respondWith(staleWhileRevalidate(req, DATA));
  if (url.pathname.startsWith("/_next/static/")) return e.respondWith(cacheFirst(req, SHELL));
  e.respondWith(networkFirst(req, SHELL));
});

async function fetchThumb(href) {
  let res = await fetch(href, { mode: "cors" }).catch(() => null);
  if (!res || !res.ok) res = await fetch(href, { mode: "no-cors" }).catch(() => null);
  return res;
}

async function thumbFirst(href) {
  const cache = await caches.open(THUMBS);
  const hit = await cache.match(href);
  if (hit) return hit;
  const res = await fetchThumb(href);
  if (res && (res.ok || res.type === "opaque")) cache.put(href, res.clone());
  return res || Response.error();
}

async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req, name) {
  const cache = await caches.open(name);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const hit = await cache.match(req);
    if (hit) return hit;
    if (req.mode === "navigate") {
      const home = await cache.match("/");
      if (home) return home;
    }
    return Response.error();
  }
}

async function staleWhileRevalidate(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  const net = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => hit);
  return hit || net;
}

// messages from the page:
//  - "prefetch": background-cache the thumbnail URLs (for offline play)
//  - "cache":    cache the page's own loaded shell (HTML/JS/CSS/fonts/data) so a
//                first visit can go fully offline without needing a reload
self.addEventListener("message", (e) => {
  const d = e.data || {};
  if (d.type === "prefetch" && Array.isArray(d.urls)) e.waitUntil(prefetch(d.urls));
  if (d.type === "cache" && Array.isArray(d.urls)) e.waitUntil(cacheShell(d.urls));
});

async function cacheShell(urls) {
  for (const u of urls) {
    try {
      const path = new URL(u, self.location.origin).pathname;
      const cache = await caches.open(path === "/showdown-pairs.json" ? DATA : SHELL);
      if (await cache.match(u)) continue;
      const res = await fetch(u);
      if (res && res.ok) await cache.put(u, res.clone());
    } catch {}
  }
}

async function prefetch(urls) {
  const cache = await caches.open(THUMBS);
  const BATCH = 6;
  for (let i = 0; i < urls.length; i += BATCH) {
    await Promise.all(
      urls.slice(i, i + BATCH).map(async (href) => {
        if (await cache.match(href)) return;
        const res = await fetchThumb(href);
        if (res && (res.ok || res.type === "opaque")) await cache.put(href, res.clone());
      })
    );
    await new Promise((r) => setTimeout(r, 120)); // gentle pacing, stays out of the way
  }
}
