"use client";

import { useState } from "react";
import type { SpotifyRef } from "@/content/types";

/**
 * Click-to-load Spotify player. Nothing from Spotify loads (no iframe, no
 * cookies) until the visitor asks for it, which keeps the page fast.
 */
export function SpotifyEmbed({
  spotify,
  title,
  compact = false,
  className = "",
}: {
  spotify: SpotifyRef;
  title: string;
  compact?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const height = compact ? 152 : 352;
  const src = `https://open.spotify.com/embed/${spotify.type}/${spotify.id}?utm_source=generator&autoplay=1`;

  if (loaded) {
    return (
      <iframe
        src={src}
        title={`Spotify player: ${title}`}
        height={height}
        className={`w-full min-w-0 rounded-xl border-0 ${className}`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      onPointerEnter={warmUp}
      onFocus={warmUp}
      data-cursor="Play"
      className={`group flex w-full min-w-0 items-center gap-4 rounded-xl border border-current/20 bg-surface p-4 text-left text-ink transition-colors hover:bg-ink hover:text-bg ${className}`}
      style={{ minHeight: compact ? 80 : 96 }}
    >
      <span
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-500 ease-[var(--ease-pop)] group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">
          Play {spotify.type === "album" ? "the album" : "the song"} on Spotify
        </span>
        <span className="block truncate text-sm opacity-80">
          Loads Spotify&apos;s player · {title}
        </span>
      </span>
    </button>
  );
}

let warmed = false;
/** Open the connection early so the player appears faster after the click. */
function warmUp() {
  if (warmed) return;
  warmed = true;
  for (const href of ["https://open.spotify.com", "https://embed-cdn.spotifycdn.com"]) {
    const l = document.createElement("link");
    l.rel = "preconnect";
    l.href = href;
    document.head.append(l);
  }
}
