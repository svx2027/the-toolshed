/**
 * Fire an anonymous first-party event (a prompt copy, a download) to /api/event.
 * Fire-and-forget: never awaited, never throws into the caller, never blocks the
 * action it measures. Uses sendBeacon so it survives the page being navigated
 * away from; falls back to keepalive fetch. No cookies, no PII — just a name.
 */
export function track(name: string): void {
  try {
    const page = window.location.pathname.replace(/\/+$/, "") || "/";
    const payload = JSON.stringify({ name, page });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/event/", new Blob([payload], { type: "application/json" }));
      return;
    }
    void fetch("/api/event/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics must never break the page */
  }
}
