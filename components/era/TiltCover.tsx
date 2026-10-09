"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { MQ } from "@/lib/motion";

/**
 * Album cover with a vinyl record tucked behind it. On hover (mouse only) the
 * cover tilts toward the pointer and the record slides out and spins.
 */
export function TiltCover({
  children,
  labelColor,
  className = "",
}: {
  children: ReactNode;
  labelColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !window.matchMedia(MQ.finePointer).matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 18}deg`);
    el.style.setProperty("--rx", `${-y * 18}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group/cover relative isolate [perspective:1200px] ${className}`}
    >
      {/* the record */}
      <div
        aria-hidden
        className="absolute inset-[4%] z-0 translate-x-[14%] transition-[translate] duration-700 ease-[var(--ease-show)] fine:group-hover/cover:translate-x-[42%]"
      >
        <div
          className="vinyl relative size-full rounded-full fine:group-hover/cover:animate-spin-vinyl"
          style={{ ["--label" as string]: labelColor }}
        >
          <span className="absolute top-[37%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>
      {/* the sleeve */}
      <div
        className="relative z-10 overflow-hidden rounded-md bg-surface shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-[var(--ease-show)] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]"
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 fine:group-hover/cover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgb(255 255 255 / 0.35), transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
