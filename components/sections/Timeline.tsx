"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { TimelineEntry } from "@/content/types";
import { gsap, MQ } from "@/lib/motion";
import { ArrowLeft, ArrowRight, Dot } from "@/components/ui/Glyph";
import { PhotoCredit } from "@/components/ui/Photo";
import { Camera, stickerFor } from "@/components/ui/Stickers";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

/**
 * "Channel guide": an accessible tab list. Arrow keys, Home and End move
 * between channels; the screen shows the selected moment.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = useRef<HTMLDivElement>(null);
  const noise = useRef<HTMLSpanElement>(null);
  const uid = useId();
  const entry = entries[active];

  // Changing channel: a burst of static, then the new picture rolls into
  // place. After render, so it's the new picture that rolls.
  const shown = useRef(active);
  useEffect(() => {
    if (shown.current === active) return;
    shown.current = active;
    if (!screen.current || !window.matchMedia(MQ.motion).matches) return;
    gsap.fromTo(
      screen.current,
      { opacity: 0.2, filter: "brightness(2.2) contrast(0.6)", scale: 0.985 },
      { opacity: 1, filter: "brightness(1) contrast(1)", scale: 1, duration: 0.6, ease: "expo.out" },
    );
    gsap.fromTo(
      noise.current,
      { opacity: 0.95, backgroundPosition: "0px 0px" },
      { opacity: 0, backgroundPosition: "97px 53px", duration: 0.55, ease: "steps(7)" },
    );
    gsap.fromTo(
      screen.current.querySelectorAll("img"),
      { yPercent: -8 },
      { yPercent: 0, duration: 0.5, ease: "power3.out" },
    );
  }, [active]);

  const select = (i: number, focus = false) => {
    const next = (i + entries.length) % entries.length;
    if (next === active) return;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: entries.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  const Sticker = stickerFor[entry.sticker];

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
      <div
        role="tablist"
        aria-label="Career timeline"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:flex-col md:overflow-visible md:px-0"
      >
        {entries.map((e, i) => {
          const selected = i === active;
          return (
            <button
              key={e.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${e.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={`group relative flex min-w-[12rem] shrink-0 snap-start items-baseline gap-4 rounded-2xl border-2 px-4 py-3 text-left transition-colors md:min-w-0 ${
                selected
                  ? "border-ink bg-ink text-bg"
                  : "border-transparent hover:border-ink/30"
              }`}
            >
              <span className={`font-mono text-xs tracking-widest ${selected ? "text-bg/90" : "text-muted"}`}>
                CH.{String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display soft text-xl leading-tight font-bold md:text-2xl">
                  {e.title}
                </span>
                <span className={`block text-sm ${selected ? "text-bg/90" : "text-muted"}`}>{e.when}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${entry.id}`}
        tabIndex={0}
        className="relative"
      >
        <div className="rounded-[2rem] bg-ink p-3 md:p-4">
          <div
            ref={screen}
            className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-black"
          >
            {entry.photo ? (
              <Image
                key={entry.id}
                src={entry.photo.src}
                alt={entry.photo.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                // The screen is 4:3 and most photos are portraits: keep faces in frame.
                style={{ objectPosition: entry.photo.focus ?? "50% 25%" }}
              />
            ) : entry.video ? (
              <>
                <YouTubeEmbed key={entry.id} video={entry.video} fill sizes="(min-width: 768px) 50vw, 100vw" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 font-mono text-xs tracking-widest text-cream"
                >
                  <Dot className="text-lipstick" /> REC
                </span>
              </>
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_40%,#3a2a24,#120b09)] text-cream">
                <Camera className="w-28" tilt={-6} />
                <p className="font-mono text-sm tracking-[0.2em]">
                  <Dot className="text-lipstick" /> REC · HOMEMADE COVERS
                </p>
              </div>
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.14)_0_1px,transparent_1px_3px)]"
            />
            <span ref={noise} aria-hidden className="tv-static pointer-events-none absolute inset-0 opacity-0" />
            <span className="absolute top-3 left-3 rounded-md bg-black/70 px-2 py-1 font-mono text-xs tracking-widest text-cream">
              CH.{String(active + 1).padStart(2, "0")} · {entry.when}
            </span>
          </div>
        </div>
        <div className="relative mt-6 pr-16">
          <h4 className="font-display soft text-3xl font-black md:text-4xl">{entry.title}</h4>
          <p className="mt-3 max-w-prose text-lg">{entry.body}</p>
          {entry.photo && <PhotoCredit photo={entry.photo} />}
          {entry.video && (
            <p className="mt-2 text-xs leading-snug text-muted">
              On screen: her first YouTube upload, {entry.video.title}, from her official channel.
            </p>
          )}
          <Sticker className="absolute top-0 right-0 w-14" tilt={12} />
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => select(active - 1)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-bg"
          >
            <ArrowLeft /> Prev<span className="sr-only"> moment</span>
          </button>
          <button
            type="button"
            onClick={() => select(active + 1)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-bg"
          >
            Next<span className="sr-only"> moment</span> <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
