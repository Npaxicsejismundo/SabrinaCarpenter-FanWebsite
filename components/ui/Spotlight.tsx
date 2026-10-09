"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/motion";

/**
 * A warm stage spotlight for a dark section. Mouse users steer it with the
 * pointer; on touch screens it drifts slowly by itself (CSS, see
 * "spotlight-drift" in globals.css). Off for reduced motion.
 *
 * Place it first inside a `relative isolate` section; it sits behind the
 * section's content.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current!;
    const host = light.parentElement!.parentElement!;
    if (!window.matchMedia(MQ.finePointer).matches) return;
    light.style.animation = "none"; // the pointer drives it instead of the drift
    const x = gsap.quickTo(light, "x", { duration: 0.9, ease: "power3" });
    const y = gsap.quickTo(light, "y", { duration: 0.9, ease: "power3" });
    const r = host.getBoundingClientRect();
    gsap.set(light, { x: r.width * 0.3, y: 200 });
    const onMove = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      x(e.clientX - b.left);
      y(e.clientY - b.top);
    };
    host.addEventListener("pointermove", onMove);
    return () => host.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={ref}
        className="spotlight absolute top-0 left-0 size-[46rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(232_176_75/0.2),rgb(232_176_75/0.06)_40%,transparent_68%)] motion-safe:animate-[spotlight-drift_18s_ease-in-out_infinite_alternate] motion-reduce:hidden"
      />
    </div>
  );
}
