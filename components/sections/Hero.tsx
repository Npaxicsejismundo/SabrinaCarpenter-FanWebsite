"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/content/site";
import { photos } from "@/content/photos";
import { tracks } from "@/content/tracks";
import { gsap, MQ, useGSAP } from "@/lib/motion";
import { onShowStart } from "@/lib/show";
import { ArrowDown, Dot, FourStar } from "@/components/ui/Glyph";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { PhotoCredit } from "@/components/ui/Photo";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Bow, Kiss, Sparkle, Starburst } from "@/components/ui/Stickers";
import { scrollToId } from "@/components/chrome/SmoothScroll";

const photo = photos.hydePark2025;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        // Starting states. CSS already hides these (globals.css) so nothing
        // flashes in its final place before this runs. `data-armed` cancels
        // the CSS failsafe that would otherwise show them after 5s.
        for (const el of q("[data-hero-in], [data-sticker]")) el.dataset.armed = "";
        gsap.set(q("[data-hero-in]"), { opacity: 0, y: 40 });
        // Transform only (no fade): the photo stays paintable for LCP.
        gsap.set(q("[data-tv]"), { scale: 0.88, rotate: -11, yPercent: 8 });
        gsap.set(q("[data-sticker]"), { scale: 0, rotate: -40, opacity: 1 });

        // One thing at a time, ~2.6s in all: the eyebrow, the name (its
        // letters rise on their own delays, see the SplitReveals below), the
        // TV switching on, the tagline and button, then the stickers.
        const stop = onShowStart(() => {
          gsap
            .timeline()
            // Text slides for the full duration but is fully opaque early, so
            // it's never caught half-faded (and low-contrast) for long.
            .to(q("[data-hero-in='intro']"), { y: 0, duration: 0.9 }, 0)
            .to(q("[data-hero-in='intro']"), { opacity: 1, duration: 0.4, ease: "power1.out" }, 0)
            .to(q("[data-tv]"), { scale: 1, rotate: 0, yPercent: 0, duration: 1.6 }, 0.8)
            .to(q("[data-hero-in='outro']"), { y: 0, stagger: 0.15, duration: 1 }, 1.3)
            .to(q("[data-hero-in='outro']"), { opacity: 1, stagger: 0.15, duration: 0.4, ease: "power1.out" }, 1.3)
            .to(q("[data-sticker]"), { scale: 1, rotate: 0, stagger: 0.15, ease: "back.out(2)", duration: 0.9 }, 1.6)
            // Once the set is on, a sheen of light crosses the screen.
            .fromTo(q("[data-glare]"), { xPercent: -130, opacity: 1 }, { xPercent: 130, duration: 1.4, ease: "power2.inOut" }, 2);
        });

        // Scroll: the name drifts apart and the TV floats up.
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-line='1']"), { xPercent: -8, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-line='2']"), { xPercent: 8, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-tv-wrap]"), { yPercent: -18, ease: "none", scrollTrigger: st });
        return stop;
      });

      // Mouse users: the hero is layered. The name, the TV and the stickers
      // follow the pointer by different amounts, and the TV turns towards it.
      mm.add(MQ.finePointer, () => {
        const q = gsap.utils.selector(ref);
        const tv = q("[data-tv]")[0];
        gsap.set(tv, { transformPerspective: 1100 });
        const follow = (el: Element, depth: number) => ({
          x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3" }),
          depth,
        });
        const layers = [
          follow(q("[data-line='1']")[0], 16),
          follow(q("[data-line='2']")[0], -12),
          follow(tv, -20),
          ...q("[data-sticker]").map((el, i) => follow(el, 34 + i * 10)),
        ];
        const turnY = gsap.quickTo(tv, "rotationY", { duration: 1.2, ease: "power3" });
        const turnX = gsap.quickTo(tv, "rotationX", { duration: 1.2, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          for (const l of layers) {
            l.x(nx * l.depth);
            l.y(ny * l.depth * 0.6);
          }
          turnY(nx * 14);
          turnX(-ny * 10);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[calc(var(--header-h)+1rem)]"
    >
      {/* Phones: one column, the TV below the name. From md up: the
          name and tagline on the left, the TV in its own column on the right,
          with the name sized so "Carpenter" never runs into the screen. */}
      <div className="container-show relative flex flex-1 flex-col justify-center py-8 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:content-center md:gap-x-[clamp(1.5rem,4vw,3.5rem)]">
        <p data-hero-in="intro" className="eyebrow mb-4 text-muted md:col-start-1">
          An unofficial fan tribute · Live from your screen
        </p>

        {/* From md up the name is sized by its own column (cqi = 1% of the
            h1's width), not the window, so "Carpenter" fits on one line at any
            screen size or zoom. It is ~4.5em wide; 20.5cqi plus the right padding
            keep it clear of the lips sticker that pokes out of the TV. */}
        <h1
          id="hero-title"
          className="relative z-10 font-display soft text-mega font-black text-ink italic md:col-start-1 md:pr-[clamp(0.5rem,calc(4rem_-_4vw),2rem)] md:@container"
        >
          <span className="sr-only">Sabrina Carpenter</span>
          <span aria-hidden data-line="1" className="block md:text-[length:min(20.5cqi,13rem)]">
            <SplitReveal as="span" on="show" by="chars" aria="none" stagger={0.06} delay={0.15} duration={1.3} className="block">
              Sabrina
            </SplitReveal>
          </span>
          <span aria-hidden data-line="2" className="block text-right md:text-[length:min(20.5cqi,13rem)]">
            <SplitReveal as="span" on="show" by="chars" aria="none" stagger={0.06} delay={0.55} duration={1.3} className="block text-accent not-italic">
              Carpenter
            </SplitReveal>
          </span>
        </h1>

        {/* The TV set */}
        <div
          data-tv-wrap
          className="pointer-events-none relative z-0 mx-auto mt-8 w-[min(78vw,26rem)] md:col-start-2 md:row-span-3 md:row-start-1 md:mx-0 md:mt-0 md:mr-5 lg:mr-0 md:w-[min(28vw,24rem,calc(56svh*0.72))] md:self-center"
        >
          <div data-tv className="pointer-events-auto relative rotate-3">
            <div className="rounded-[2.2rem] bg-ink p-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] md:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-black">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) min(28vw, 22rem), calc(78vw - 1.5rem)"
                  quality={60}
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover object-top"
                />
                {/* Scanlines and a vignette. Plain gradients: a blend mode or a
                    big inset shadow over the hero photo slows its first paint. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.12)_0_1px,transparent_1px_3px)]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgb(0_0_0/0.5)_100%)]"
                />
                {/* A sheen of light that crosses the screen once the set is on */}
                <span
                  aria-hidden
                  data-glare
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.3)_50%,transparent_65%)] opacity-0"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-lipstick px-2.5 py-1 font-mono text-[0.7rem] font-bold tracking-widest text-cream">
                  <Dot className="motion-safe:animate-pulse" /> LIVE
                </span>
              </div>
              <div aria-hidden className="mt-3 flex items-center justify-between px-2">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bg/90">CH. 25</span>
                <span className="flex gap-2">
                  <span className="size-3 rounded-full bg-deco-2" />
                  <span className="size-3 rounded-full bg-deco-1" />
                </span>
              </div>
            </div>
            <span data-sticker className="absolute -top-8 -left-10 w-24"><Bow tilt={-14} float /></span>
            <span data-sticker className="absolute -right-8 -bottom-6 w-28"><Starburst label="LIVE!" tilt={10} /></span>
            <span data-sticker className="absolute top-1/3 -right-10 w-14"><Sparkle float /></span>
            <span data-sticker className="absolute bottom-16 -left-12 w-24"><Kiss tilt={-8} /></span>
          </div>
          {/* Outside the tilted set, and clear of the LIVE! sticker, so the
              photographer's credit stays readable. */}
          <PhotoCredit photo={photo} className="pointer-events-auto mt-10 max-w-[22rem] text-[0.7rem]" />
        </div>

        <div className="relative z-10 mt-8 flex flex-col gap-6 md:col-start-1 md:mt-10 md:max-w-2xl md:flex-row md:items-end md:justify-between">
          <p data-hero-in="outro" className="font-display soft text-lede leading-tight font-semibold">
            {site.tagline[0]}
            <br />
            <em className="text-accent">{site.tagline[1]}</em>
          </p>
          <Magnetic strength={0.4}>
            <a
              data-hero-in="outro"
              href="#meet"
              data-cursor="Scroll"
              onClick={(e) => {
                if (scrollToId("meet")) e.preventDefault();
              }}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-ink px-5 py-3 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
            >
              {site.scrollPrompt}
              <ArrowDown className="motion-safe:animate-bounce" />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="border-y-2 border-ink bg-accent py-3 text-on-accent">
        <Marquee seconds={36}>
          {tracks.map((t) => (
            <span key={t.id} className="font-display soft flex items-center gap-6 pr-6 text-2xl font-bold italic md:text-3xl">
              {t.title}
              <FourStar className="text-base" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
