"use client";

import { useSyncExternalStore } from "react";

/** The choice lives on <html data-motion="paused"> (restored before paint in layout.tsx). */
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => obs.disconnect();
}
const isPaused = () => document.documentElement.dataset.motion === "paused";

/**
 * Lets anyone pause the looping decoration (marquees, grain, floating
 * stickers, spinning records). Remembered per browser.
 */
export function MotionToggle({ className = "" }: { className?: string }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  const toggle = () => {
    const root = document.documentElement;
    if (paused) delete root.dataset.motion;
    else root.dataset.motion = "paused";
    try {
      localStorage.setItem("sabrina-motion", paused ? "on" : "paused");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className={`eyebrow inline-flex items-center gap-2 rounded-full border border-current/30 px-3 py-2 text-[0.7rem] transition-colors hover:bg-bg hover:text-ink ${className}`}
    >
      <span aria-hidden className="inline-flex">
        {paused ? (
          <svg viewBox="0 0 24 24" className="size-3 fill-current"><path d="M8 5v14l11-7z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-3 fill-current"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        )}
      </span>
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );
}
