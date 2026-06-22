"use client";

import { useEffect } from "react";

/** Registers the service worker (production only) after load, never blocking first paint,
 *  then, on idle, hands the SW the page's own loaded shell (HTML/JS/CSS/fonts/data) so even a
 *  first visit can go fully offline without a reload. */
export function Pwa() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const cacheShell = () => {
      const sw = navigator.serviceWorker.controller;
      if (!sw) return;
      const origin = location.origin;
      const urls = new Set<string>([origin + "/", origin + "/showdown-pairs.json"]);
      try {
        const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        for (const e of entries) {
          const u = new URL(e.name, origin);
          if (u.origin === origin && (u.pathname.startsWith("/_next/") || u.pathname.startsWith("/assets/"))) urls.add(e.name);
        }
      } catch {}
      sw.postMessage({ type: "cache", urls: [...urls] });
    };

    const onIdle = () => {
      if (navigator.serviceWorker.controller) cacheShell();
      else navigator.serviceWorker.addEventListener("controllerchange", cacheShell, { once: true });
    };

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then(() => {
          const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
          if (ric) ric(onIdle, { timeout: 5000 });
          else window.setTimeout(onIdle, 2500);
        })
        .catch(() => {});
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}
