"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, SplitText, useGSAP } from "@/lib/motion";
import { onShowStart } from "@/lib/show";

/**
 * Oversized type that rises line by line out of a mask. Runs on scroll, or
 * when the show starts (`on="show"`, used by the hero). With reduced motion the
 * text is simply there.
 *
 * Scroll reveals only split the text once the heading is about to enter the
 * viewport, so a long page doesn't pay for every split up front.
 */
export function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  id,
  on = "scroll",
  by = "words",
  delay = 0,
  stagger = 0.05,
  duration = 1.15,
  aria = by === "chars" ? "auto" : "none",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  on?: "scroll" | "show";
  by?: "words" | "chars";
  delay?: number;
  stagger?: number;
  /** Seconds each word or letter takes to rise. */
  duration?: number;
  /** Word splits stay readable as-is ("none"). Char splits need "auto"
   * (aria-label, headings only) or a parent with sr-only text. */
  aria?: "auto" | "none";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        el.dataset.armed = ""; // taken over: cancels the CSS failsafe
        let split: SplitText | undefined;
        let tween: gsap.core.Tween | undefined;
        let playing = on === "scroll";
        let stopWaiting = () => {};

        const run = () => {
          if (split) return;
          split = SplitText.create(el, {
            type: by === "chars" ? "lines,words,chars" : "lines,words",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            aria,
            onSplit(self) {
              gsap.set(el, { opacity: 1 });
              tween = gsap.from(by === "chars" ? self.chars : self.words, {
                yPercent: 115,
                rotate: by === "chars" ? 6 : 3,
                duration,
                stagger,
                delay,
                paused: !playing,
              });
              return tween;
            },
          });
        };

        if (on === "show") {
          run();
          stopWaiting = onShowStart(() => {
            playing = true;
            tween?.play();
          });
        } else {
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            end: "max",
            once: true,
            onEnter: run,
          });
          // Loaded already scrolled past it (e.g. refresh mid-page): show it now.
          if (st.progress > 0) run();
          stopWaiting = () => st.kill();
        }

        return () => {
          stopWaiting();
          split?.revert();
        };
      });

      mm.add(MQ.reduced, () => {
        gsap.set(el, { opacity: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-reveal className={className}>
      {children}
    </Tag>
  );
}
