"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Track } from "@/content/types";
import { sections } from "@/content/site";
import { gsap, MQ } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

/**
 * Greatest hits as a jukebox: each row opens a Spotify player and the
 * official video. On desktop the artwork trails the cursor.
 */
export function TopMusic({ tracks }: { tracks: Track[] }) {
  const [open, setOpen] = useState<string | null>(null);
  // Rows that have been opened keep their players mounted, so closing can
  // animate instead of the content vanishing first.
  const [seen, setSeen] = useState<ReadonlySet<string>>(() => new Set());
  const [hovered, setHovered] = useState<Track | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia(MQ.finePointer).matches;
    if (!fine.current) return;
    const list = listRef.current!;
    const fl = floatRef.current!;
    const xTo = gsap.quickTo(fl, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(fl, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(fl, "rotate", { duration: 0.8, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    list.addEventListener("pointermove", move);
    return () => list.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (!fine.current || !floatRef.current) return;
    gsap.to(floatRef.current, {
      autoAlpha: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.6,
      duration: 0.4,
      ease: "expo.out",
    });
  }, [hovered]);

  return (
    <section id="hits" aria-labelledby="hits-title" tabIndex={-1} className="relative py-24 outline-none md:py-36">
      <div className="container-show">
        <SectionHeading id="hits-title" eyebrow={sections.hits.eyebrow} title={sections.hits.title} intro={sections.hits.intro} />

        <div ref={listRef} className="relative" onPointerLeave={() => setHovered(null)}>
          <div
            ref={floatRef}
            aria-hidden
            className="pointer-events-none invisible absolute top-0 left-0 z-20 -mt-28 -ml-28 hidden size-56 opacity-0 fine:block"
          >
            {hovered && (
              <Image
                src={hovered.artwork.src}
                alt=""
                width={224}
                height={224}
                sizes="224px"
                className="size-full rounded-lg object-cover shadow-2xl"
              />
            )}
          </div>

          <Reveal as="ol" className="border-t-2 border-ink" y={30} stagger={0.05}>
            {tracks.map((t, i) => {
              const isOpen = open === t.id;
              const panelId = `hit-${t.id}`;
              return (
                <li key={t.id} className="border-b-2 border-ink" onPointerEnter={() => setHovered(t)}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        setOpen(isOpen ? null : t.id);
                        setSeen((s) => new Set(s).add(t.id));
                      }}
                      data-cursor={isOpen ? "Close" : "Play"}
                      className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-5 text-left md:grid-cols-[4rem_minmax(0,1fr)_14rem_6rem] md:py-7"
                    >
                      <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        {/* `truncate` clips to this box, so it needs room for descenders (g, y, p). */}
                        <span className="font-display soft block truncate pb-[0.08em] text-[clamp(1.9rem,5.5vw,4.5rem)] leading-[1.05] font-black transition-[translate,color] duration-500 ease-[var(--ease-show)] group-hover:translate-x-3 group-hover:text-accent">
                          {t.title}
                        </span>
                        {t.artists !== "Sabrina Carpenter" && (
                          <span className="mt-1 block text-sm text-muted">{t.artists}</span>
                        )}
                      </span>
                      <span className="hidden text-sm text-muted md:block">
                        {t.release} · {t.year}
                      </span>
                      <span className="flex items-center justify-end gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-xs font-bold whitespace-nowrap ${
                            t.hot100Peak === 1 ? "bg-accent text-on-accent" : "border border-ink/40"
                          }`}
                        >
                          <span className="sr-only">Billboard Hot 100 peak: </span>#{t.hot100Peak}
                        </span>
                        <span
                          aria-hidden
                          className={`grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink text-lg transition-transform duration-500 ${isOpen ? "rotate-45 bg-ink text-bg" : ""}`}
                        >
                          +
                        </span>
                      </span>
                    </button>
                  </h3>
                  {/* Opens smoothly: the row's height animates via grid-template-rows. */}
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-show)] motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="grid gap-6 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:pl-[4rem]">
                        <div className="space-y-4">
                          <p className="text-sm text-muted md:hidden">
                            {t.release} · {t.year}
                          </p>
                          {t.note && <p className="text-lg">{t.note}</p>}
                          <p className="font-mono text-xs text-muted">Hot 100 peak: No. {t.hot100Peak}</p>
                          {seen.has(t.id) && <SpotifyEmbed spotify={{ type: "track", id: t.spotifyId }} title={`${t.title} by ${t.artists}`} compact />}
                        </div>
                        {seen.has(t.id) && <YouTubeEmbed video={t.video} />}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
        <p className="mt-6 text-sm text-muted">
          Chart peaks: Billboard Hot 100, as of October 2026. No lyrics are reproduced on this site.
        </p>
      </div>
    </section>
  );
}
