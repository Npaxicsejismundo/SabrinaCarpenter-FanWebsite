"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** House easing: a quick, confident ease-out, and a little overshoot for stickers. */
gsap.defaults({ ease: "expo.out", duration: 1 });

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Media queries shared by every animated component (pass to gsap.matchMedia). */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  /** A real mouse: custom cursor, magnetic buttons, 3D tilt. */
  finePointer:
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  /** Wide enough for the pinned horizontal album rail. */
  rail: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MQ.reduced).matches;
