"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ } from "@/lib/motion";

/**
 * Custom cursor: a dot plus a trailing ring that swells over anything
 * clickable. Add `data-cursor="Play"` to an element to show a label.
 * Mouse users only; touch and reduced-motion users keep the native cursor.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia(MQ.finePointer).matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const tag = labelRef.current!;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const follow = (el: HTMLElement, duration: number) => ({
      x: gsap.quickTo(el, "x", { duration, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration, ease: "power3" }),
    });
    const d = follow(dot, 0.12);
    const r = follow(ring, 0.45);
    const t = follow(tag, 0.45);

    let visible = false;
    const show = (on: boolean) => {
      if (on === visible) return;
      visible = on;
      gsap.to([dot, ring], { autoAlpha: on ? 1 : 0, duration: 0.2 });
      if (!on) gsap.to(tag, { autoAlpha: 0, duration: 0.2 });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      show(true);
      d.x(e.clientX);
      d.y(e.clientY);
      r.x(e.clientX);
      r.y(e.clientY);
      t.x(e.clientX);
      t.y(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("iframe")) return show(false);
      const hit = target?.closest<HTMLElement>("a, button, [data-cursor], summary, label");
      const text = hit?.dataset.cursor ?? "";
      setLabel(text);
      gsap.to(ring, { scale: hit ? (text ? 2.6 : 1.7) : 1, duration: 0.45, ease: "expo.out" });
      gsap.to(dot, { scale: hit ? 0 : 1, duration: 0.25 });
      gsap.to(tag, { autoAlpha: text ? 1 : 0, duration: 0.25 });
    };

    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference">
      <div
        ref={ringRef}
        className="invisible absolute top-0 left-0 -mt-5 -ml-5 size-10 rounded-full border border-white opacity-0"
      />
      <div
        ref={labelRef}
        className="invisible absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono text-xs font-bold tracking-widest whitespace-nowrap text-white uppercase opacity-0"
      >
        {label}
      </div>
      <div
        ref={dotRef}
        className="invisible absolute top-0 left-0 -mt-1 -ml-1 size-2 rounded-full bg-white opacity-0"
      />
    </div>
  );
}
