"use client";

import { useState } from "react";
import { track } from "@/lib/track";

/**
 * Clipboard write that survives restrictive embeds (notably Instagram's in-app browser):
 * async clipboard API first, hidden-textarea execCommand as the fallback.
 */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }
}

/** Copies the full prompt text (the whole file, welcome note included) so the paste is always valid. */
export function CopyButton({ text, label, event }: { text: string; label: string; event?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    const ok = await copyText(text);
    if (ok && event) track(event); // count the activation, never block the copy
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 5000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline-2"
      aria-live="polite"
    >
      {state === "copied"
        ? "Copied. Now paste it into Claude Code ✓"
        : state === "failed"
          ? "Blocked here. Open in your browser (tap •••) or Download .md →"
          : label}
    </button>
  );
}

/** A download link that also counts the download as an anonymous event. */
export function TrackedDownload({
  href,
  download,
  event,
  className,
  children,
}: {
  href: string;
  download: string;
  event: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} download={download} onClick={() => track(event)} className={className}>
      {children}
    </a>
  );
}

/** For phone visitors: this workflow runs on a computer, so let them send the page to themselves. */
export function ShareLinkButton() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "SVX2027 TasteMaxxing", url });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return; // user closed the sheet on purpose
      }
    }
    const ok = await copyText(url);
    if (ok) track("share_link");
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 7000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-left text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
      aria-live="polite"
    >
      {state === "copied"
        ? "Link copied. Paste it in a note, DM, or email to yourself ✓"
        : state === "failed"
          ? "Blocked here. Tap ••• and choose “Open in external browser”, then retry"
          : "Send this link to my computer"}
    </button>
  );
}
