import type { CSSProperties, ElementType } from "react";
import type { Era } from "@/content/types";
import { fontFamily } from "@/lib/font-family";

/**
 * An era's title set the way its artwork sets it: hairline lowercase for the
 * Hollywood debut, mirrored LOVE for EVOLution, hand-drawn SINGULAR, typewriter
 * emails, roundhand script for Short n' Sweet, letterpress for Man's Best Friend.
 * Screen readers always get the plain title.
 */
export function EraTitle({
  era,
  as: Tag = "h3",
  id,
  className = "",
  style,
}: {
  era: Era;
  as?: ElementType;
  id?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ty = era.typography;
  const base: CSSProperties = {
    ["--title-scale" as string]: ty.titleScale ?? 1,
    fontFamily: fontFamily[ty.display],
    fontWeight: ty.displayWeight,
    letterSpacing: ty.displayTracking,
    textTransform:
      ty.displayCase === "upper" ? "uppercase" : ty.displayCase === "lower" ? "lowercase" : "none",
    ...style,
  };
  const accent: CSSProperties = { fontFamily: fontFamily[ty.accent] };

  return (
    <Tag id={id} className={`leading-[0.95] ${className}`} style={base}>
      <span className="sr-only">{era.title}</span>
      <span aria-hidden>{renderLockup(era, accent)}</span>
    </Tag>
  );
}

function renderLockup(era: Era, accent: CSSProperties) {
  switch (era.slug) {
    case "evolution":
      return (
        <>
          <span className="inline-block -scale-x-100">LOVE</span>UTION
        </>
      );
    case "singular-act-i":
    case "singular-act-ii":
      return (
        <>
          Singular
          <span
            className="ml-[0.15em] inline-block -rotate-6 align-[-0.15em] text-[0.38em] normal-case"
            style={{ ...accent, letterSpacing: 0, fontWeight: 400 }}
          >
            {era.slug === "singular-act-i" ? "Act I" : "Act II"}
          </span>
        </>
      );
    case "emails-i-cant-send":
      return (
        <>
          emails i can&apos;t send
          <span className="ml-[0.05em] inline-block motion-safe:animate-pulse">_</span>
        </>
      );
    case "mans-best-friend":
      return (
        <>
          Man&apos;s <em className="italic">Best</em> Friend
        </>
      );
    default:
      return era.stylized ?? era.title;
  }
}
