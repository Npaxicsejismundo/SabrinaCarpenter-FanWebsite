import Image from "next/image";
import { coachellaActs, coachellaGallery } from "@/content/coachella";
import { sections } from "@/content/site";
import type { Photo } from "@/content/types";
import { FontGate } from "@/components/ui/FontGate";
import { PhotoCredit } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Sparkle, Ticket } from "@/components/ui/Stickers";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

export function Coachella() {
  const [act1, act2] = coachellaActs;
  // Only slots that have a photo are shown (see content/coachella.ts).
  const shots = coachellaGallery.flatMap((g) => (g.photo ? [g.photo] : []));

  return (
    <section id="coachella" aria-labelledby="coachella-title" tabIndex={-1} className="relative py-24 outline-none md:py-36">
      <div className="container-show">
        <SectionHeading
          id="coachella-title"
          eyebrow={sections.coachella.eyebrow}
          title={sections.coachella.title}
          intro={sections.coachella.intro}
        />

        {/* Act I */}
        <article aria-labelledby="coachella-act1" className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <Ticket label="COACHELLA" sub={`${act1.act.toUpperCase()} · ${act1.year}`} className="w-56" tilt={-4} />
            <h3 id="coachella-act1" className="font-display soft mt-6 text-title font-black">
              {act1.act}: <em className="text-accent">{act1.title}</em>
            </h3>
            <p className="eyebrow mt-3 text-muted">{act1.dates}</p>
            <Reveal className="mt-6 space-y-4 text-lg">
              {act1.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
          </div>

          {act1.quote && (
            <figure className="relative self-center rounded-[2rem] border-2 border-ink bg-surface p-8 md:p-12">
              <Sparkle className="absolute -top-6 -left-5 w-14" float depth={0.9} />
              <FontGate as="blockquote">
                <SplitReveal as="p" className="font-script text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-accent">
                  {`“${act1.quote.text}”`}
                </SplitReveal>
              </FontGate>
              <figcaption className="mt-6 text-sm text-muted">
                Ad-libbed in her &ldquo;Nonsense&rdquo; outro, 2024. As quoted by{" "}
                <a href={act1.quote.sourceUrl} className="underline hover:text-accent">
                  {act1.quote.source}
                </a>
                .
              </figcaption>
            </figure>
          )}
        </article>

        <div aria-hidden className="my-20 flex items-center gap-6 md:my-28">
          <span data-draw className="h-0.5 flex-1 bg-ink/20" />
          <span className="eyebrow text-muted">Two years later</span>
          <span data-draw className="h-0.5 flex-1 bg-ink/20" />
        </div>

        {/* Act II */}
        <article aria-labelledby="coachella-act2">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <Ticket label="HEADLINER" sub={`${act2.act.toUpperCase()} · ${act2.year}`} className="w-56" tilt={3} />
              <h3 id="coachella-act2" className="font-display soft mt-6 text-title font-black">
                {act2.act}: <em className="text-accent">{act2.title}</em>
              </h3>
              <p className="eyebrow mt-3 text-muted">{act2.dates}</p>
            </div>
          </div>
          <Reveal className="mt-6 grid gap-4 text-lg md:grid-cols-2 md:gap-10">
            {act2.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <Reveal variant="curtain" stagger={0.15} className="mt-12 grid gap-8 md:grid-cols-2">
            {act2.videos.map((v) => (
              <YouTubeEmbed key={v.id} video={v} sizes="(min-width: 768px) 45vw, 100vw" />
            ))}
          </Reveal>
        </article>

        {/* Scrapbook: fan photos from both years pinned either side of
            Coachella's own 2024 short, overlapping like a real collage. */}
        <div className="mt-28 md:mt-36">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-muted">From the crowd</p>
            <h3 className="font-display soft mt-3 text-title font-black text-balance">
              Two years, <em className="text-accent">one promise kept</em>
            </h3>
            <p className="mt-4 text-muted">
              Fan snapshots from both sets. In the middle: the short Coachella posted on April 12, 2024,
              the day of her debut. It never posted the full set.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl rounded-[2.5rem] bg-surface bg-[radial-gradient(rgb(0_0_0/0.07)_1px,transparent_1px)] bg-[size:20px_20px] px-6 py-14 md:px-10 md:py-20">
            <Sparkle className="absolute -top-7 right-10 w-14" float depth={1} />
            {/* Pinned up one by one as the board comes into view (Choreo) */}
            <ul data-drop-group className="grid items-center justify-items-center gap-14 md:grid-cols-[1fr_auto_1fr] md:gap-0">
              {shots[0] && <Polaroid photo={shots[0]} side="left" />}
              {/* Fixed width: in an auto-sized grid column the video has no width of its own. */}
              <li data-drop className="relative z-10 w-[min(100%,16rem)] md:w-64">
                <span data-tape className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 rotate-2 bg-white px-3 py-1.5 font-mono text-[0.7rem] font-bold tracking-[0.18em] whitespace-nowrap text-[#1f1b16] uppercase shadow-md">
                  Coachella&apos;s clip · 2024
                </span>
                <div className="rounded-[2.2rem] bg-ink p-2 shadow-[0_30px_60px_-25px_rgb(0_0_0/0.55)]">
                  <YouTubeEmbed
                    video={act1.videos[0]}
                    sizes="16rem"
                    className="[&_figcaption]:sr-only [&>div]:rounded-[1.8rem]"
                  />
                </div>
              </li>
              {shots.slice(1).map((photo, i) => (
                <Polaroid key={photo.src} photo={photo} side={i === 0 ? "right" : "none"} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A fan photo as a taped-down polaroid, labelled with its act and credited. */
function Polaroid({ photo, side }: { photo: Photo; side: "left" | "right" | "none" }) {
  const act = coachellaActs.find((a) => a.year === photo.year);
  // Either side of the clip, each photo tucks under the phone's edge; its
  // caption keeps clear of the phone on that side.
  const place = {
    left: "md:-mr-6 md:justify-self-end md:-rotate-6",
    right: "md:-ml-6 md:justify-self-start md:rotate-5 md:translate-y-8",
    none: "md:rotate-2",
  }[side];
  const clear = { left: "md:pr-10", right: "md:pl-10", none: "" }[side];
  return (
    <li data-drop className={`relative w-[min(100%,17rem)] -rotate-2 ${place}`}>
      <span
        aria-hidden
        data-tape
        className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 bg-deco-1/80 shadow-sm"
      />
      <figure className="bg-white p-3 pb-4 text-[#1f1b16] shadow-[0_25px_50px_-20px_rgb(0_0_0/0.45)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          <Image src={photo.src} alt={photo.alt} fill sizes="17rem" className="object-cover" />
        </div>
        {act && (
          <p className={`mt-3 font-display soft text-xl leading-tight font-bold italic ${clear}`}>
            {act.year} · {act.title.toLowerCase()}
          </p>
        )}
        <PhotoCredit photo={photo} className={`text-[0.7rem] text-[#4a4038]! ${clear}`} />
      </figure>
    </li>
  );
}
