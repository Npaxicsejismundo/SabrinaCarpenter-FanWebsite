import type { ReactNode, SVGProps } from "react";

/*
 * Arrows and ornaments drawn as tiny inline SVGs. These characters aren't in
 * the fonts' latin subsets, so typing them makes the browser search the OS
 * for a fallback font, which stalls the first layout. Sized to the text (1em)
 * and coloured with it. Decorative: hidden from screen readers.
 */

type GlyphProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Svg({ className = "", children, ...rest }: GlyphProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block size-[1em] shrink-0 align-[-0.125em] ${className}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

/** ← */
export const ArrowLeft = (p: GlyphProps) => (
  <Svg {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </Svg>
);

/** → */
export const ArrowRight = (p: GlyphProps) => (
  <Svg {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);

/** ↓ */
export const ArrowDown = (p: GlyphProps) => (
  <Svg {...p}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </Svg>
);

/** ↗ (opens another site) */
export const ArrowUpRight = (p: GlyphProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

/** ✦ */
export const FourStar = (p: GlyphProps) => (
  <Svg {...p}>
    <path
      d="M12 3c.5 4.6 3.9 8 8.5 8.5-4.6.5-8 3.9-8.5 8.5-.5-4.6-3.9-8-8.5-8.5 4.6-.5 8-3.9 8.5-8.5Z"
      fill="currentColor"
      stroke="none"
    />
  </Svg>
);

/** ● */
export const Dot = (p: GlyphProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="6" fill="currentColor" stroke="none" />
  </Svg>
);
