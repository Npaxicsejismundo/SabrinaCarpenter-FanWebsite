import type { CSSProperties, ReactNode } from "react";

/**
 * An endless ticker. The content is rendered twice for a seamless loop; the
 * copy is hidden from screen readers. Paused by reduced motion and by the
 * "Pause animations" toggle; pauses on hover.
 *
 * Clips sideways only: big display type (italics, scripts) has descenders
 * and swashes that reach outside its line box, and must stay visible.
 */
export function Marquee({
  children,
  className = "",
  seconds = 30,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  seconds?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`group flex overflow-x-clip whitespace-nowrap ${className}`}>
      <div
        className="animate-marquee flex shrink-0 group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${seconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
