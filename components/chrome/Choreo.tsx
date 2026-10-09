"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/motion";

/*
 * Page-wide choreography, driven by data attributes so server components can
 * opt in without becoming client components:
 *
 *   data-depth="0.6"   drifts against the scroll (parallax; tablets and up).
 *                      Bigger = nearer.
 *   data-img-reveal    wipes up into view while its image settles from a zoom.
 *   data-drop-group    a container whose [data-drop] children drop onto the
 *                      page in turn, then any [data-tape] strips stick down.
 *   data-draw          a rule that draws itself from the centre
 *                      (data-draw="left" draws from the left).
 *
 * Marquees also react to scrolling: they speed up with it, run backwards when
 * you scroll up, and lean into the motion.
 *
 * Everything is scoped to this page's .theme-scope (Next keeps visited pages
 * mounted but hidden), only runs when motion is allowed, and is lazy: reveals
 * are built as they're about to enter, parallax once the page is idle.
 * Starting states are also set in CSS (globals.css) so nothing flashes.
 */
export function Choreo() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const scope = ref.current!.closest<HTMLElement>(".theme-scope");
    if (!scope) return;
    const all = (sel: string, root: ParentNode = scope) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, (context) => {
      const triggers: ScrollTrigger[] = [];

      /** Run `play` once, when `el` crosses `start` (or now, if it's already past). */
      const onEnter = (el: HTMLElement, start: string, play: () => void) => {
        let done = false;
        const run = () => {
          if (done) return;
          done = true;
          context.add(play);
        };
        const st = ScrollTrigger.create({ trigger: el, start, end: "max", once: true, onEnter: run });
        triggers.push(st);
        if (st.progress > 0) run();
      };

      // Images wipe up, settling from a slight zoom
      for (const el of all("[data-img-reveal]")) {
        el.dataset.armed = "";
        const img = el.querySelector("img");
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        onEnter(el, "top 85%", () => {
          gsap
            .timeline()
            .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
            .from(img, { scale: 1.3, duration: 2, ease: "expo.out" }, 0.1);
        });
      }

      // Things dropped onto the page: photos, clippings, cards
      for (const group of all("[data-drop-group]")) {
        const items = all("[data-drop]", group);
        const tapes = all("[data-tape]", group);
        for (const el of items) el.dataset.armed = "";
        gsap.set(items, { opacity: 0 });
        gsap.set(tapes, { scaleX: 0 });
        onEnter(group, "top 75%", () => {
          // GSAP folds an element's CSS rotate/translate (its resting tilt)
          // into its own transform, so fall towards that pose, not to zero,
          // then hand the transform back to CSS (hover effects need it).
          const rest = items.map((el) => ({
            r: Number(gsap.getProperty(el, "rotate")),
            y: Number(gsap.getProperty(el, "y")),
          }));
          gsap
            .timeline()
            .fromTo(
              items,
              {
                opacity: 0,
                y: (i: number) => rest[i].y - 160,
                rotate: (i: number) => rest[i].r + (i % 2 ? 16 : -14),
                scale: 1.08,
              },
              {
                opacity: 1,
                y: (i: number) => rest[i].y,
                rotate: (i: number) => rest[i].r,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.25)",
                stagger: 0.2,
                clearProps: "transform,translate,rotate,scale",
              },
            )
            .to(tapes, { scaleX: 1, duration: 0.45, ease: "power3.out", stagger: 0.12, clearProps: "transform,translate,rotate,scale" }, "-=0.5");
        });
      }

      // Rules that draw themselves
      for (const el of all("[data-draw]")) {
        gsap.set(el, { scaleX: 0, transformOrigin: el.dataset.draw === "left" ? "0% 50%" : "50% 50%" });
        onEnter(el, "top 90%", () => {
          gsap.to(el, { scaleX: 1, duration: 1.6, ease: "expo.inOut" });
        });
      }

      // Marquees feel the scroll
      const marquees = all(".animate-marquee");
      const lean = { now: 0, target: 0 };
      if (marquees.length) {
        triggers.push(
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              lean.target = gsap.utils.clamp(-5, 5, self.getVelocity() / 450);
            },
          }),
        );
      }
      let applied = 0;
      const tick = () => {
        lean.target *= 0.9; // ease back to normal once the scrolling stops
        lean.now += (lean.target - lean.now) * 0.12;
        if (Math.abs(lean.now - applied) < 0.01) return;
        applied = lean.now;
        for (const m of marquees) {
          for (const a of m.getAnimations()) {
            // 1 = normal speed; scrolling down speeds it up, up runs it backwards
            const rate = 1 + applied;
            if ("updatePlaybackRate" in a) a.updatePlaybackRate(rate);
            else (a as Animation).playbackRate = rate;
          }
          gsap.set(m.parentElement, { skewX: -applied * 1.6 });
        }
      };
      if (marquees.length) gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        triggers.forEach((t) => t.kill());
        for (const m of marquees) {
          for (const a of m.getAnimations()) (a as Animation).playbackRate = 1;
        }
      };
    });

    // Parallax, once the page is idle. Tablets and up only: on phones the
    // stickers sit right against the text and would drift over it.
    mm.add(`(min-width: 768px) and ${MQ.motion}`, (context) => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
      const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
      const idleId = idle(() =>
        context.add(() => {
          for (const el of all("[data-depth]")) {
            const d = parseFloat(el.dataset.depth || "0.4");
            gsap.fromTo(
              el,
              { y: d * 50 },
              {
                y: -d * 50,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
              },
            );
          }
        }),
      );
      return () => cancelIdle(idleId);
    });
  });

  return <span ref={ref} hidden />;
}
