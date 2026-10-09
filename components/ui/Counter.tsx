"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/motion";

/**
 * Counts up from zero when scrolled into view. The final value is rendered on
 * the server (and read by screen readers); only the visible digits animate.
 */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const n = { v: 0 };
      el.textContent = "0";
      gsap.to(n, {
        v: value,
        duration: 1.6,
        ease: "power3.out",
        snap: { v: 1 },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = String(n.v);
        },
      });
      return () => {
        el.textContent = String(value);
      };
    });
  });

  return (
    <span className={className}>
      <span ref={ref} aria-hidden className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
