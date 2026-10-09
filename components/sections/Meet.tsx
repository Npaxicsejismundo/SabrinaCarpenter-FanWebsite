import type { CSSProperties } from "react";
import { bio, funFacts, timeline } from "@/content/bio";
import { sections } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heart, Sparkle, stickerFor } from "@/components/ui/Stickers";
import { Timeline } from "./Timeline";

export function Meet() {
  return (
    <section id="meet" aria-labelledby="meet-title" tabIndex={-1} className="relative overflow-x-clip py-24 outline-none md:py-36">
      <div className="container-show">
        <SectionHeading id="meet-title" eyebrow={sections.meet.eyebrow} title={sections.meet.title} />

        {/* Bio */}
        <div className="grid items-start gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div>
            <p className="font-display soft text-lede font-semibold text-balance">{bio.lede}</p>
            <Reveal className="mt-8 space-y-5 text-lg md:max-w-[38rem]">
              {bio.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Photo
              photo={bio.photo}
              reveal
              sizes="(min-width: 768px) 24rem, 90vw"
              imgClassName="h-auto w-full rounded-t-[12rem] rounded-b-3xl border-[6px] border-ink object-cover"
            />
            <Heart className="absolute -top-6 -right-4 w-20" tilt={14} float depth={0.7} />
            <Sparkle className="absolute top-1/2 -left-8 w-12" float depth={1.1} />
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-28 md:mt-36">
          <h3 className="eyebrow mb-6 text-muted">The channel guide · how she got here</h3>
          <Timeline entries={timeline} />
        </div>

        {/* Fun facts */}
        <div className="mt-28 md:mt-36">
          <h3 className="font-display soft text-title font-black">
            Fun facts, <em className="text-accent">fully fact-checked</em>
          </h3>
          <ul data-drop-group className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {funFacts.map((f, i) => {
              const Sticker = stickerFor[f.sticker];
              return (
                <li
                  key={f.id}
                  data-drop
                  className="group relative rotate-[var(--tilt)] rounded-3xl border-2 border-ink bg-surface p-6 pt-10 transition-[rotate,translate] duration-500 ease-[var(--ease-pop)] hover:-translate-y-2 hover:rotate-0"
                  style={{ "--tilt": `${[-2, 1.5, -1, 2][i % 4]}deg` } as CSSProperties}
                >
                  <Sticker className="absolute -top-7 right-5 w-16 transition-transform duration-500 group-hover:scale-110" tilt={[-10, 8, -4, 12][i % 4]} />
                  <p className="font-mono text-xs tracking-widest text-muted">FACT NO. {i + 1}</p>
                  <h4 className="font-display soft mt-2 text-2xl font-black">{f.title}</h4>
                  <p className="mt-3">{f.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
