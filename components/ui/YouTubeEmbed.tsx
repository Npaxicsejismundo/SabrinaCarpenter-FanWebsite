"use client";

import Image from "next/image";
import { useState } from "react";
import type { VideoRef } from "@/content/types";

/**
 * Click-to-load YouTube player (privacy-enhanced youtube-nocookie domain).
 * Shows the official thumbnail until the visitor presses play.
 *
 * `fill`: fill the positioned parent instead (it sets the shape), with no
 * caption. Used for the TV screen in the career timeline.
 */
export function YouTubeEmbed({
  video,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fill = false,
}: {
  video: VideoRef;
  className?: string;
  sizes?: string;
  fill?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const aspect = video.vertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <figure className={`group ${fill ? "absolute inset-0" : ""} ${className}`}>
      <div className={fill ? "relative size-full" : `relative overflow-hidden rounded-2xl bg-ink ${aspect}`}>
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={`YouTube video: ${video.title}`}
            className="absolute inset-0 z-10 size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            data-cursor="Watch"
            className="absolute inset-0 size-full"
            aria-label={`Play video: ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes={sizes}
              // YouTube's 4:3 thumbnail letterboxes widescreen videos. A 16:9 frame
              // crops the bars off; a 4:3 parent (`fill`) needs a 4/3 zoom to do it.
              className={`object-cover transition-transform duration-700 ease-[var(--ease-show)] ${
                fill ? "scale-[1.34] group-hover:scale-[1.4]" : "group-hover:scale-105"
              }`}
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-xl transition-transform duration-500 ease-[var(--ease-pop)] group-hover:scale-110 md:size-20"
            >
              <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {!fill && (
        <figcaption className="mt-2 text-sm text-muted">
          {video.title} <span className="eyebrow ml-1 text-[0.7rem]">· {video.channel}</span>
        </figcaption>
      )}
    </figure>
  );
}
