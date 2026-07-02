"use client";

import { useEffect } from "react";

/**
 * Arms scroll-reveals and drives them with IntersectionObserver (both directions).
 * The arming happens inside requestAnimationFrame, which only fires in an active,
 * painting tab, so a throttled/background tab simply leaves all content visible.
 * A MutationObserver picks up [data-reveal] nodes mounted later (e.g. the Garage
 * grid re-rendering on filter), so late arrivals animate in instead of staying hidden.
 */
export function RevealController() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.add("reveal-ready");
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) e.target.classList.toggle("in", e.isIntersecting);
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io!.observe(el));
      mo = new MutationObserver((muts) => {
        for (const m of muts) {
          m.addedNodes.forEach((n) => {
            if (!(n instanceof Element)) return;
            if (n.hasAttribute("data-reveal")) io!.observe(n);
            n.querySelectorAll("[data-reveal]").forEach((el) => io!.observe(el));
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);
  return null;
}
