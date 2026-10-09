"use client";

import type Lenis from "lenis";
import { useEffect } from "react";
import { gsap, MQ, ScrollTrigger } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync. Mouse/trackpad users only: touch devices already scroll smoothly and
 * keep their native momentum (and their battery). Lenis is imported on demand,
 * so phones never download it.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MQ.finePointer).matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        lerp: 0.11,
        wheelMultiplier: 0.95,
        autoRaf: false,
      });
      window.__lenis = lenis;
      // Arrived while the preloader is still up: stay put. The preloader
      // starts Lenis again when it lifts.
      if (!window.__showStarted) lenis.stop();

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Pinned sections change the page height; keep Lenis's scroll limit in sync.
      const onRefresh = () => lenis.resize();
      ScrollTrigger.addEventListener("refresh", onRefresh);

      cleanup = () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

/** Scroll to an element by id, smoothly when Lenis is running, and move focus there. */
export function scrollToId(id: string) {
  const target = visibleById(id);
  if (!target) return false;
  const offset = -parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-h") ||
      "0",
  ) * 16;
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset, duration: 1.4 });
  } else {
    target.scrollIntoView({ block: "start" });
  }
  target.focus({ preventScroll: true });
  return true;
}

/**
 * Next keeps recently visited pages mounted but hidden, so an id can exist
 * more than once. Return the copy that is actually on screen.
 */
export function visibleById(id: string): HTMLElement | null {
  const all = document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`);
  for (const el of all) if (el.checkVisibility?.() ?? el.offsetParent !== null) return el;
  return null;
}
