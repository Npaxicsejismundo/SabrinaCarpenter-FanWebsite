"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/motion";

/** How the children arrive. */
const VARIANTS = {
  /** Fade and lift (the default). */
  rise: (y: number) => [{ y, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }],
  /** Springy scale-and-spin, for stickers. */
  pop: () => [{ scale: 0, rotate: -25 }, { scale: 1, rotate: 0, ease: "back.out(2.2)", duration: 0.9 }],
  /** Swing down from the top edge like a card on a hinge. */
  flip: () => [
    { rotationX: -80, y: 24, opacity: 0, transformOrigin: "50% 0%", transformPerspective: 900 },
    { rotationX: 0, y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
  ],
  /** Rise from behind a clip, like a stage curtain going up. */
  curtain: () => [
    { clipPath: "inset(100% 0% 0% 0%)", y: 60 },
    { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.3, ease: "expo.out", clearProps: "clipPath" },
  ],
} satisfies Record<string, (y: number) => [gsap.TweenVars, gsap.TweenVars]>;

/**
 * Brings its direct children into view, one after another (see VARIANTS).
 *
 * The tween is only built when the block is about to enter the viewport:
 * building every from() tween at load makes GSAP read each item's computed
 * style, which forces a style recalc per item while the page is starting up.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  y = 48,
  stagger = 0.09,
  pop = false,
  variant = pop ? "pop" : "rise",
  start = "top 85%",
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  /** Shorthand for variant="pop". */
  pop?: boolean;
  variant?: keyof typeof VARIANTS;
  start?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        el.dataset.armed = ""; // taken over: cancels the CSS failsafe
        let tween: gsap.core.Tween | undefined;
        const run = () => {
          if (tween) return;
          gsap.set(el, { opacity: 1 });
          const [from, to]: [gsap.TweenVars, gsap.TweenVars] = VARIANTS[variant](y);
          // Hand the transform back to CSS afterwards: GSAP folds CSS
          // rotate/translate into its own transform, which would otherwise
          // switch off hover effects built on them.
          tween = gsap.fromTo(el.children, from, {
            ...to,
            stagger,
            clearProps: [to.clearProps, "transform,translate,rotate,scale"].filter(Boolean).join(","),
          });
        };
        const st = ScrollTrigger.create({ trigger: el, start, end: "max", once: true, onEnter: run });
        // Loaded already scrolled past it (e.g. refresh mid-page): show it now.
        if (st.progress > 0) run();
        return () => {
          st.kill();
          tween?.revert();
        };
      });
      mm.add(MQ.reduced, () => gsap.set(el, { opacity: 1 }));
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className} {...rest}>
      {children}
    </Tag>
  );
}
