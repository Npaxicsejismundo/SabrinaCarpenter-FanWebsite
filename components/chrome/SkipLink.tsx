"use client";

import { visibleById } from "./SmoothScroll";

/** First stop for keyboard users. Targets the visible page's <main>. */
export function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        const main = visibleById("main");
        if (!main) return;
        e.preventDefault();
        main.focus();
        main.scrollIntoView({ block: "start" });
      }}
      className="sr-only-focusable fixed top-3 left-3 z-[100] rounded-full bg-espresso px-5 py-3 font-semibold text-cream"
    >
      Skip to content
    </a>
  );
}
