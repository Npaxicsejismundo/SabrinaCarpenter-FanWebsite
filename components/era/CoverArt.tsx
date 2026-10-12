import Image from "next/image";
import type { Era } from "@/content/types";
import { fontFamily } from "@/lib/font-family";

/**
 * Official album art (from Spotify's image CDN, or a copy in /public/covers
 * for releases that aren't on Spotify), or a clearly labelled typographic
 * placeholder when no official artwork is available.
 */
export function CoverArt({
  era,
  sizes,
  eager = false,
  className = "",
}: {
  era: Era;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  if (era.cover.kind !== "placeholder") {
    const px = era.cover.kind === "file" ? era.cover.size : 640;
    return (
      <Image
        src={era.cover.src}
        alt={era.cover.alt}
        width={px}
        height={px}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={`aspect-square h-auto w-full object-cover ${className}`}
      />
    );
  }

  // Placeholder: echoes the cover's logotype so the rail still reads well.
  const t = era.theme;
  return (
    <div
      role="img"
      aria-label={era.cover.alt}
      className={`relative flex aspect-square w-full flex-col justify-end overflow-hidden p-[8%] ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 70% 10%, #fffaf0 0%, ${t.bg} 45%, ${t.deco[1]} 100%)`,
        color: t.ink,
      }}
    >
      <span
        className="absolute top-[6%] left-[6%] rounded-full border border-current px-3 py-1 font-mono text-[0.7rem] tracking-[0.14em] uppercase"
        style={{ background: t.bg }}
      >
        Placeholder art
      </span>
      <span
        className="block text-[clamp(1.75rem,5.5vw,3.5rem)] leading-[0.85] lowercase"
        style={{ fontFamily: fontFamily.jost, fontWeight: 200, color: t.ink }}
      >
        sabrina
        <br />
        carpenter
      </span>
      <span
        className="mt-3 block text-[0.65rem] tracking-[0.3em] uppercase"
        style={{ fontFamily: fontFamily.jost, color: t.accent }}
      >
        {era.title}
      </span>
    </div>
  );
}
