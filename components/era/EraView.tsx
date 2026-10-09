import Link from "next/link";
import { ViewTransition } from "react";
import type { Era, FontKey } from "@/content/types";
import { eraNeighbours, eras, formatDate } from "@/content/eras";
import { CoverArt } from "./CoverArt";
import { EraTitle } from "./EraTitle";
import { TiltCover } from "./TiltCover";
import { FontGate } from "@/components/ui/FontGate";
import { ArrowLeft, ArrowRight } from "@/components/ui/Glyph";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Sparkle, Starburst } from "@/components/ui/Stickers";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

const FONT_NAMES: Record<FontKey, string> = {
  fraunces: "Fraunces",
  instrument: "Instrument Sans",
  courier: "Courier Prime",
  jost: "Jost",
  barlow: "Barlow",
  homemadeApple: "Homemade Apple",
  amatic: "Amatic SC",
  yesteryear: "Yesteryear",
  pinyon: "Pinyon Script",
  imFell: "IM Fell English",
};

export function EraView({ era }: { era: Era }) {
  const index = eras.findIndex((e) => e.slug === era.slug);
  const { prev, next } = eraNeighbours(era.slug);
  const facts: [string, string][] = [
    ["Released", formatDate(era.releaseDate)],
    ["Format", era.kind],
    ["Label", era.label],
    [
      "Billboard 200 peak",
      era.billboard200Peak ? `No. ${era.billboard200Peak}` : "Did not chart",
    ],
  ];

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="era-title" className="relative overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24">
        <div className="container-show">
          <Link href="/#eras" className="eyebrow inline-flex items-center gap-2 text-muted no-underline hover:text-accent">
            <ArrowLeft /> All eras
          </Link>

          <div className="mt-8 grid items-center gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
            <div className="relative mx-auto w-[min(100%,30rem)] pr-[12%]">
              <TiltCover labelColor={era.theme.accent}>
                <ViewTransition name={`cover-${era.slug}`} share="cover" default="none">
                  <div>
                    <CoverArt era={era} sizes="(min-width: 768px) 30rem, 85vw" eager />
                  </div>
                </ViewTransition>
              </TiltCover>
              {era.billboard200Peak === 1 && (
                <Starburst label="NO. 1" className="absolute -top-6 -left-6 z-10 w-28" tilt={-12} depth={0.5} />
              )}
            </div>

            <div className="min-w-0">
              <p className="eyebrow text-muted">
                Era {String(index + 1).padStart(2, "0")} of {String(eras.length).padStart(2, "0")} ·{" "}
                {era.kind} · {era.year}
              </p>
              <EraTitle
                era={era}
                as="h1"
                id="era-title"
                className="mt-4 text-[length:calc(clamp(3.25rem,9vw,9rem)*var(--title-scale))] text-balance"
              />
              <p className="font-era-accent mt-4 text-2xl text-accent">“{era.mood}”</p>
              <p className="mt-6 max-w-xl text-lede">{era.story}</p>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden className="border-y-2 border-ink bg-ink py-4 text-bg">
        <Marquee seconds={32}>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-4xl md:text-6xl">
              <EraTitle era={era} as="span" />
              <Sparkle className="w-8" />
              <span className="font-era-accent text-2xl md:text-3xl">{era.mood}</span>
              <Sparkle className="w-8" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Story + facts */}
      <section aria-labelledby="story-title" className="container-show grid gap-14 py-20 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:py-28">
        <div>
          <SplitReveal as="h2" id="story-title" className="font-display soft text-title font-black">
            The story
          </SplitReveal>
          <Reveal className="mt-8 space-y-5 text-lg md:text-xl">
            {era.details.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
        <div className="space-y-10">
          <dl className="divide-y-2 divide-ink border-y-2 border-ink">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="eyebrow text-muted">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="eyebrow text-muted">Key tracks</h3>
            <ol className="mt-4 space-y-2">
              {era.keyTracks.map((t, i) => (
                <li key={t} className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="era-title text-2xl md:text-3xl" style={{ textTransform: "none" }}>
                    {t}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Listen */}
      <section aria-labelledby="listen-title" className="bg-surface py-20 md:py-28">
        <div className="container-show grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <SplitReveal as="h2" id="listen-title" className="font-display soft text-title font-black">
              Press play
            </SplitReveal>
            <p className="mt-4 max-w-sm text-muted">
              {era.spotify.type === "track"
                ? "This EP isn't on Spotify as a standalone release. Its title track lives on Eyes Wide Open."
                : "The full album, courtesy of Spotify's official player."}
            </p>
          </div>
          <SpotifyEmbed spotify={era.spotify} title={era.title} />
        </div>
      </section>

      {/* Watch */}
      {era.videos.length > 0 && (
        <section aria-labelledby="watch-title" className="container-show py-20 md:py-28">
          <SplitReveal as="h2" id="watch-title" className="font-display soft text-title font-black">
            Official videos
          </SplitReveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {era.videos.map((v, i) => (
              <YouTubeEmbed
                key={v.id}
                video={v}
                className={era.videos.length % 2 === 1 && i === 0 ? "md:col-span-2" : ""}
              />
            ))}
          </div>
        </section>
      )}

      {/* How this page is dressed */}
      <section aria-labelledby="dressed-title" className="container-show py-20 md:py-28">
        <div className="rounded-[2rem] border-2 border-ink p-6 md:p-12">
          <h2 id="dressed-title" className="eyebrow text-muted">
            How this page is dressed
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-semibold">Colours sampled from the cover</p>
              <Reveal as="ul" variant="pop" stagger={0.08} className="mt-4 flex flex-wrap gap-3">
                {era.coverSwatches.map((hex) => (
                  <li key={hex} className="text-center">
                    <span className="block size-14 rounded-full border-2 border-ink" style={{ background: hex }} />
                    <span className="mt-1 block font-mono text-xs">{hex}</span>
                  </li>
                ))}
              </Reveal>
            </div>
            <div>
              <p className="font-semibold">Type</p>
              <p className="mt-4 text-3xl leading-tight">
                <span className="era-title">{FONT_NAMES[era.typography.display]}</span>
                {era.typography.accent !== era.typography.display && (
                  <>
                    {" + "}
                    <span className="font-era-accent">{FONT_NAMES[era.typography.accent]}</span>
                  </>
                )}
              </p>
              <p className="mt-3 text-muted">{era.typography.note}</p>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted">
            Cover art © {era.label}
            {era.cover.kind === "spotify" ? ", shown via Spotify's official image CDN." : ". Official artwork not available; placeholder shown."}
          </p>
        </div>
      </section>

      {/* Previous / next */}
      {/* Gated: these titles use other eras' fonts, which can wait. */}
      <FontGate as="nav" aria-label="More eras" className="container-show grid gap-6 pb-24 md:grid-cols-2">
        {[prev, next].map((e, i) =>
          e ? (
            <Magnetic key={e.slug} strength={0.08} className="block">
              <Link
                href={`/eras/${e.slug}`}
                prefetch
                data-cursor={i === 0 ? "Back" : "Next"}
                className="group flex items-center gap-5 rounded-3xl border-2 border-ink p-4 text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
              >
                <span className="w-24 shrink-0 overflow-hidden rounded-md md:w-28">
                  <CoverArt era={e} sizes="7rem" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow flex items-center gap-2 opacity-90">
                    {i === 0 ? (
                      <>
                        <ArrowLeft /> Previous era
                      </>
                    ) : (
                      <>
                        Next era <ArrowRight />
                      </>
                    )}
                  </span>
                  <EraTitle era={e} as="span" className="mt-2 block text-3xl md:text-4xl" />
                </span>
              </Link>
            </Magnetic>
          ) : (
            <span key={i} aria-hidden />
          ),
        )}
      </FontGate>
    </>
  );
}
