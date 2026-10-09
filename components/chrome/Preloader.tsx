"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { startShow } from "@/lib/show";

const NAME = "SABRINA".split("");

declare global {
  interface Window {
    /** When the intro started (performance.now()), set by app/layout.tsx. */
    __preloaderGo?: number;
  }
}

/*
 * Timings, in ms. The motion itself is CSS (see "Preloader" in globals.css),
 * started by the inline script in app/layout.tsx on the first visible frame.
 */
/** Earliest the curtain may lift, counted from the start of the intro: the
 * name has risen and the bar has filled (0.2s + 1.9s), plus a short hold. */
const LIFT_AFTER_INTRO = 2500;
/** And not before the page has had this long to settle after booting:
 * the work that follows hydration would otherwise make the lift stutter. */
const SETTLE = 800;
/** Into the exit: the curtain is starting to rise, so the hero's entrance
 * plays in view rather than behind it. */
const SHOW_AFTER = 800;
/** Into the exit: letters gone and the curtain fully up (0.45s + 1.4s). */
const DONE_AFTER = 1900;
/** Matches the CSS failsafe: by now the preloader has hidden itself. */
const FAILSAFE_AT = 10000;

/**
 * A curtain with her name, shown once per browser session. Skipped for
 * reduced motion and when JS is off (see the inline script in app/layout.tsx).
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const skipped =
      document.documentElement.classList.contains("skip-preloader") ||
      getComputedStyle(el).display === "none";
    if (skipped) {
      startShow();
      return;
    }

    const finish = () => {
      el.style.display = "none";
      try {
        sessionStorage.setItem("sabrina-preloaded", "1");
      } catch {}
      window.__lenis?.start();
    };

    // Very slow boot: the CSS failsafe has already hidden the curtain.
    if (performance.now() >= FAILSAFE_AT) {
      finish();
      startShow();
      return;
    }

    window.__lenis?.stop();
    const timers: number[] = [];
    const lift = () => {
      el.dataset.state = "out";
      timers.push(window.setTimeout(startShow, SHOW_AFTER));
      timers.push(window.setTimeout(finish, DONE_AFTER));
    };
    // Wait two frames so the intro has certainly started (frames don't run
    // in a background tab, so neither does the countdown).
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const go = window.__preloaderGo ?? performance.now();
        const wait = Math.max(SETTLE, go + LIFT_AFTER_INTRO - performance.now());
        timers.push(window.setTimeout(lift, wait));
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      delete el.dataset.state;
      window.__lenis?.start();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="preloader fixed inset-0 z-[80] flex flex-col items-center justify-center bg-espresso text-cream"
      aria-hidden
    >
      <p className="preloader-fade eyebrow mb-6 text-sm text-cream/80 md:text-base">
        Tonight&apos;s show is about to begin
      </p>
      <div className="flex overflow-hidden">
        {NAME.map((l, i) => (
          <span
            key={i}
            className="preloader-letter font-display soft text-[clamp(4rem,16vw,13rem)] leading-[0.9] font-black italic"
            style={{ "--i": i } as CSSProperties}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="preloader-fade mt-8 flex w-[min(16rem,60vw)] items-center gap-4">
        <span className="h-0.5 flex-1 overflow-hidden rounded-full bg-cream/20">
          <span className="preloader-bar block h-full bg-cream" />
        </span>
        <span className="preloader-count eyebrow w-[4ch] text-right text-sm text-cream/80 tabular-nums" />
      </div>
    </div>
  );
}
