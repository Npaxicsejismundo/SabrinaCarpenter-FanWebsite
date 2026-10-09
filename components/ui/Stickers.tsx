import type { CSSProperties, ReactNode } from "react";

/*
 * Hand-drawn sticker set. All original SVG, coloured by the live theme's decor
 * colours, with a white die-cut edge (stroke painted under the fill).
 * Decorative: hidden from screen readers.
 */

type StickerProps = {
  className?: string;
  /** Resting tilt in degrees. */
  tilt?: number;
  /** Gentle floating motion (paused for reduced motion). */
  float?: boolean;
  /** Scroll parallax: how far it drifts against the scroll (0.2 subtle, 1
   * strong: about 50px each way). Handled by components/chrome/Choreo. Only
   * for stickers with room around them: they must not drift over text. */
  depth?: number;
  style?: CSSProperties;
};

const EDGE = { stroke: "#fff", strokeWidth: 6, strokeLinejoin: "round" as const, paintOrder: "stroke" as const };

function Frame({
  children,
  viewBox,
  className = "",
  tilt = 0,
  float,
  depth,
  style,
}: StickerProps & { children: ReactNode; viewBox: string }) {
  // Two layers: the outer one is placed (and drifts with the scroll), the
  // inner one tilts and floats. Kept apart so the CSS float animation and
  // the scroll-driven transform don't overwrite each other.
  return (
    <span
      aria-hidden
      data-depth={depth}
      className={`pointer-events-none inline-block ${className}`}
      style={style}
    >
      <span
        className={`block drop-shadow-[0_6px_10px_rgb(0_0_0/0.18)] ${float ? "animate-float" : ""}`}
        style={{ "--r": `${tilt}deg`, rotate: `${tilt}deg` } as CSSProperties}
      >
        <svg viewBox={viewBox} className="block h-auto w-full overflow-visible">
          {children}
        </svg>
      </span>
    </span>
  );
}

export const Bow = (p: StickerProps) => (
  <Frame viewBox="0 0 120 84" {...p}>
    <g fill="var(--c-deco-1)" {...EDGE}>
      <path d="M56 42 L38 80 L50 75 L60 47Z" />
      <path d="M64 42 L82 80 L70 75 L60 47Z" />
      <path d="M60 38C44 16 16 6 8 22C2 36 20 54 60 44Z" />
      <path d="M60 38C76 16 104 6 112 22C118 36 100 54 60 44Z" />
    </g>
    <ellipse cx="60" cy="41" rx="10" ry="9" fill="var(--c-deco-2)" {...EDGE} />
    <path d="M22 24C28 18 38 20 46 28" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
  </Frame>
);

export const Kiss = (p: StickerProps) => (
  <Frame viewBox="0 0 120 70" {...p}>
    <path
      d="M8 34C24 12 44 6 60 19C76 6 96 12 112 34C96 40 76 45 60 43C44 45 24 40 8 34Z"
      fill="#C8102E"
      {...EDGE}
    />
    <path d="M8 34C30 62 90 62 112 34C96 39 76 43 60 43C44 43 24 39 8 34Z" fill="#A50D26" {...EDGE} />
    <path d="M40 50C50 54 70 54 80 50" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
  </Frame>
);

export const Sparkle = (p: StickerProps) => (
  <Frame viewBox="0 0 100 100" {...p}>
    <path
      d="M50 2C54 34 66 46 98 50C66 54 54 66 50 98C46 66 34 54 2 50C34 46 46 34 50 2Z"
      fill="var(--c-deco-2)"
      {...EDGE}
    />
  </Frame>
);

export const Heart = (p: StickerProps) => (
  <Frame viewBox="0 0 100 92" {...p}>
    <path
      d="M50 88C20 66 4 48 4 30C4 16 15 6 28 6C38 6 46 12 50 20C54 12 62 6 72 6C85 6 96 16 96 30C96 48 80 66 50 88Z"
      fill="var(--c-deco-1)"
      {...EDGE}
    />
    <path d="M22 24C24 18 30 15 36 16" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
  </Frame>
);

/** Points of a regular star / starburst (pure maths, same on server and client). */
function starPoints(n: number, outer: number, inner: number, cx = 50, cy = 50) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

export const Starburst = ({ label, ...p }: StickerProps & { label: string }) => (
  <Frame viewBox="0 0 100 100" {...p}>
    <polygon points={starPoints(14, 48, 38)} fill="var(--c-accent)" {...EDGE} />
    <text
      x="50"
      y="50"
      textAnchor="middle"
      dominantBaseline="central"
      fill="var(--c-on-accent)"
      style={{ font: "700 15px var(--font-courier), monospace", letterSpacing: "0.04em" }}
    >
      {label}
    </text>
  </Frame>
);

export const Star = (p: StickerProps) => (
  <Frame viewBox="0 0 100 100" {...p}>
    <polygon points={starPoints(5, 48, 20)} fill="var(--c-deco-2)" {...EDGE} />
  </Frame>
);

export const Ticket = ({ label, sub, ...p }: StickerProps & { label: string; sub?: string }) => (
  <Frame viewBox="0 0 200 90" {...p}>
    <path
      d="M10 6H190A4 4 0 0 1 194 10V34A11 11 0 0 0 194 56V80A4 4 0 0 1 190 84H10A4 4 0 0 1 6 80V56A11 11 0 0 0 6 34V10A4 4 0 0 1 10 6Z"
      fill="var(--c-deco-2)"
      {...EDGE}
    />
    <line x1="150" y1="14" x2="150" y2="76" stroke="var(--c-ink)" strokeDasharray="4 5" strokeWidth="2" />
    <text x="78" y="42" textAnchor="middle" fill="var(--c-ink)" style={{ font: "700 20px var(--font-courier), monospace" }}>
      {label}
    </text>
    {sub && (
      <text x="78" y="64" textAnchor="middle" fill="var(--c-ink)" style={{ font: "400 12px var(--font-courier), monospace", letterSpacing: "0.12em" }}>
        {sub}
      </text>
    )}
    <text x="172" y="50" textAnchor="middle" fill="var(--c-ink)" style={{ font: "700 13px var(--font-courier), monospace" }} transform="rotate(-90 172 50)">
      ADMIT 1
    </text>
  </Frame>
);

export const Vinyl = (p: StickerProps) => (
  <Frame viewBox="0 0 100 100" {...p}>
    <circle cx="50" cy="50" r="46" fill="#151515" {...EDGE} />
    {[38, 31, 24].map((r) => (
      <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#2c2c2c" strokeWidth="1.5" />
    ))}
    <circle cx="50" cy="50" r="15" fill="var(--c-deco-1)" />
    <circle cx="50" cy="50" r="2.5" fill="#fff" />
  </Frame>
);

export const Camera = (p: StickerProps) => (
  <Frame viewBox="0 0 120 90" {...p}>
    <rect x="8" y="22" width="84" height="56" rx="10" fill="var(--c-deco-3)" {...EDGE} />
    <path d="M92 38L114 26V74L92 62Z" fill="var(--c-deco-3)" {...EDGE} />
    <circle cx="50" cy="50" r="16" fill="#1a1a1a" stroke="#fff" strokeWidth="4" />
    <circle cx="44" cy="45" r="4" fill="#fff" fillOpacity=".7" />
    <circle cx="20" cy="32" r="4" fill="#C8102E" />
  </Frame>
);

export const Trophy = (p: StickerProps) => (
  <Frame viewBox="0 0 100 110" {...p}>
    <path d="M28 16H12C12 34 20 42 30 44M72 16H88C88 34 80 42 70 44" fill="none" stroke="#fff" strokeWidth="13" strokeLinejoin="round" />
    <path d="M28 16H12C12 34 20 42 30 44M72 16H88C88 34 80 42 70 44" fill="none" stroke="var(--c-deco-2)" strokeWidth="7" strokeLinejoin="round" />
    <path d="M28 8H72V40C72 54 62 64 50 64C38 64 28 54 28 40Z" fill="var(--c-deco-2)" {...EDGE} />
    <path d="M44 64H56V80H44Z M30 80H70V96H30Z" fill="var(--c-deco-2)" {...EDGE} />
    <path d="M38 18V38" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
  </Frame>
);

export const stickerFor = {
  bow: Bow,
  kiss: Kiss,
  sparkle: Sparkle,
  heart: Heart,
  star: Star,
  record: Vinyl,
  camera: Camera,
  trophy: Trophy,
} as const;
