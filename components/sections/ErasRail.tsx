"use client";

import Link from "next/link";
import { useEffect, useRef, ViewTransition } from "react";
import type { Era } from "@/content/types";
import { sections } from "@/content/site";
import { formatDate } from "@/content/eras";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/motion";
import { applyVars, clearVars, eraVars } from "@/lib/theme";
import { CoverArt } from "@/components/era/CoverArt";
import { EraTitle } from "@/components/era/EraTitle";
import { TiltCover } from "@/components/era/TiltCover";
import { watchFontGate } from "@/components/ui/FontGate";
import { ArrowRight } from "@/components/ui/Glyph";
import { Magnetic } from "@/components/ui/Magnetic";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Starburst } from "@/components/ui/Stickers";

/**
 * The eras, as a sideways-scrolling rail on wide screens (a vertical stack
 * elsewhere). Whichever album is centre stage re-themes the whole page.
 */
export function ErasRail({ eras }: { eras: Era[] }) {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // Each album's title font loads once the rail is about a screen away.
  // (Watching the whole section: the panels themselves sit off to the side,
  // clipped, until the rail scrolls them in.)
  useEffect(() => watchFontGate(section.current!), []);

  useGSAP(
    () => {
      const scope = section.current!.closest<HTMLElement>(".theme-scope")!;
      const allVars = eraVars(eras[0]);
      const panels = gsap.utils.toArray<HTMLElement>("[data-era-panel]", track.current);
      let current = -1;

      const setEra = (i: number) => {
        if (i === current) return;
        current = i;
        if (i < 0) clearVars(scope, allVars);
        else applyVars(scope, eraVars(eras[i]));
        if (counter.current)
          counter.current.textContent =
            i < 0 ? "" : `${String(i + 1).padStart(2, "0")} / ${String(eras.length).padStart(2, "0")} · ${eras[i].mood}`;
      };

      /** Re-theme the page while album `i` is centre stage (and `live()` agrees). */
      const watch = (p: HTMLElement, i: number, extra: ScrollTrigger.Vars, live = () => true) =>
        ScrollTrigger.create({
          trigger: p,
          ...extra,
          onToggle: (self) => self.isActive && live() && setEra(i),
          onLeaveBack: () => i === 0 && setEra(-1),
          onLeave: () => i === eras.length - 1 && setEra(-1),
        });

      const mm = gsap.matchMedia();

      mm.add(MQ.rail, () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        // Progress values at which each album sits centre stage (plus both ends).
        const stops = () => [
          0,
          ...panels.map((p) =>
            gsap.utils.clamp(0, 1, (p.offsetLeft + p.offsetWidth / 2 - window.innerWidth / 2) / distance()),
          ),
          1,
        ];
        let snapPoints = stops();

        // The pinned rail owns the theme. Leaving it in either direction resets
        // the page, and album triggers only count while it's pinned. Otherwise
        // an album's colours could stick after scrolling back up: on wide
        // screens the first album is already "on" the moment the rail pins, and
        // a jump (Home key, a nav link) replays the album triggers while the
        // scrubbed rail catches up.
        let albums: ScrollTrigger[] = [];
        const onStage = () => setEra(albums.findIndex((st) => st.isActive));
        const offStage = () => setEra(-1);

        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onRefresh: () => {
              snapPoints = stops();
            },
            snap: {
              snapTo: (v: number) => gsap.utils.snap(snapPoints, v),
              duration: { min: 0.25, max: 0.7 },
              delay: 0.12,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              if (progress.current) progress.current.style.scale = `${self.progress} 1`;
            },
            onEnter: onStage,
            onEnterBack: onStage,
            onLeave: offStage,
            onLeaveBack: offStage,
          },
        });
        const pinned = () => tween.scrollTrigger!.isActive;

        albums = panels.map((p, i) => {
          const album = watch(p, i, { containerAnimation: tween, start: "left 55%", end: "right 55%" }, pinned);
          // Covers swing in 3D as they cross the stage.
          gsap.fromTo(
            p.querySelector("[data-swing]"),
            { rotateY: 28, rotateZ: -3 },
            {
              rotateY: -28,
              rotateZ: 3,
              ease: "none",
              scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
          return album;
        });
      });

      mm.add(`not all and ${MQ.rail}`, () => {
        panels.forEach((p, i) => watch(p, i, { start: "top 55%", end: "bottom 55%" }));
      });

      return () => clearVars(scope, allVars);
    },
    { scope: section },
  );

  return (
    <section id="eras" ref={section} data-font-gate aria-labelledby="eras-title" tabIndex={-1} className="relative outline-none">
      <div ref={pin} className="relative rail:h-[100svh] rail:overflow-hidden">
        <div
          ref={track}
          className="flex flex-col gap-20 py-24 rail:h-full rail:w-max rail:flex-row rail:items-center rail:gap-[6vw] rail:py-0 rail:pt-[var(--header-h)] rail:pr-[6vw]"
        >
          {/* Intro card */}
          <div className="container-show rail:w-[min(44rem,70vw)] rail:max-w-none rail:shrink-0 rail:pl-[var(--gutter)]">
            <p className="eyebrow text-muted">{sections.eras.eyebrow}</p>
            <SplitReveal as="h2" id="eras-title" className="font-display soft mt-3 text-display font-black">
              {sections.eras.title}
            </SplitReveal>
            <p className="mt-6 max-w-md text-lede text-muted">{sections.eras.intro}</p>
            <p className="eyebrow mt-10 hidden items-center gap-3 text-muted rail:flex">
              Keep scrolling <ArrowRight className="motion-safe:animate-pulse" />
            </p>
          </div>

          {eras.map((era, i) => (
            <EraPanel key={era.slug} era={era} index={i} total={eras.length} />
          ))}

          {/* Outro card: gives the last album room to reach centre stage */}
          <div className="container-show rail:w-[38vw] rail:shrink-0 rail:px-0">
            <p className="font-display soft text-title font-black">
              That&apos;s every era <em className="text-accent">so far.</em>
            </p>
            <Link
              href="/eras"
              className="mt-6 inline-flex rounded-full border-2 border-ink px-5 py-3 font-semibold text-ink no-underline hover:bg-ink hover:text-bg"
            >
              See all the eras side by side
            </Link>
          </div>
        </div>

        {/* Progress (rail mode only) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-6 hidden items-center gap-6 rail:flex">
          <span ref={counter} className="eyebrow min-w-[16rem] text-muted" />
          <span className="h-0.5 flex-1 bg-ink/15">
            <span ref={progress} className="block h-full origin-left bg-accent" style={{ scale: "0 1" }} />
          </span>
        </div>
      </div>
    </section>
  );
}

function EraPanel({ era, index, total }: { era: Era; index: number; total: number }) {
  const href = `/eras/${era.slug}`;
  return (
    <article
      data-era-panel
      aria-labelledby={`era-${era.slug}`}
      className="container-show grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 rail:w-[min(72rem,82vw)] rail:max-w-none rail:shrink-0 rail:px-0"
    >
      <div className="relative mx-auto w-[min(100%,26rem)] pr-[12%] [perspective:1400px] rail:w-[min(34vw,30rem)]">
        <div data-swing className="[transform-style:preserve-3d]">
          <TiltCover labelColor={era.theme.accent}>
            <ViewTransition name={`cover-${era.slug}`} share="cover" default="none">
              <div>
                <CoverArt era={era} sizes="(min-width: 1024px) 30rem, (min-width: 768px) 40vw, 90vw" />
              </div>
            </ViewTransition>
          </TiltCover>
        </div>
        {era.billboard200Peak === 1 && (
          <Starburst label="NO. 1" className="absolute -top-6 -left-6 z-10 w-24" tilt={-12} />
        )}
      </div>

      <div className="min-w-0">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 text-muted">
          <span>
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span aria-hidden>·</span>
          <span>
            {era.kind}, {era.year}
          </span>
        </p>
        <EraTitle
          era={era}
          id={`era-${era.slug}`}
          className="mt-3 text-[length:calc(clamp(2.75rem,6.5vw,6.5rem)*var(--title-scale))] text-balance"
        />
        <p className="mt-2 font-mono text-sm text-muted">
          {formatDate(era.releaseDate)} · {era.label} · “{era.mood}”
        </p>
        <p className="mt-5 max-w-xl text-lg">{era.story}</p>
        <ul aria-label="Key tracks" className="mt-5 flex flex-wrap gap-2">
          {era.keyTracks.map((t) => (
            <li key={t} className="rounded-full border border-ink/30 px-3 py-1 text-sm">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic>
            <Link
              href={href}
              prefetch
              data-cursor="Open"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent no-underline transition-transform hover:scale-[1.03]"
            >
              Step into the era <span className="sr-only">{era.title}</span>
              <ArrowRight />
            </Link>
          </Magnetic>
          <SpotifyEmbed spotify={era.spotify} title={era.title} compact className="sm:max-w-xs" />
        </div>
      </div>
    </article>
  );
}
