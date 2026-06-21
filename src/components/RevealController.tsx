"use client";

import { useEffect } from "react";

/**
 * Arms scroll-reveals and drives them with IntersectionObserver (both directions).
 * The arming happens inside requestAnimationFrame, which only fires in an active,
 * painting tab — so a throttled/background tab simply leaves all content visible.
 */
export function RevealController() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.add("reveal-ready");
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) e.target.classList.toggle("in", e.isIntersecting);
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io!.observe(el));
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);
  return null;
}
