import { awards, chartRecords, counters } from "@/content/achievements";
import { sections } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";
import { Sparkle, Star, Trophy } from "@/components/ui/Stickers";

const showOrder = ["Grammy Awards", "Emmy Awards", "MTV VMAs"] as const;

export function Achievements() {
  return (
    <section id="trophies" aria-labelledby="trophies-title" tabIndex={-1} className="relative isolate overflow-hidden bg-ink py-24 text-bg outline-none md:py-36">
      <Spotlight />
      <div className="container-show">
        <SectionHeading
          id="trophies-title"
          eyebrow={sections.trophies.eyebrow}
          title={sections.trophies.title}
          className="[&_p]:text-bg/90"
        />

        {/* Counters */}
        <Reveal as="dl" className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border-2 border-bg/25 bg-bg/25 md:grid-cols-5">
          {counters.map((c) => (
            <div key={c.id} className="flex flex-col justify-between gap-6 bg-ink p-6 md:p-8">
              <dt className="order-2">
                <span className="block font-semibold">{c.label}</span>
                <span className="mt-1 block text-sm text-bg/90">{c.detail}</span>
              </dt>
              <dd className="order-1 font-display soft text-[clamp(4rem,9vw,8rem)] leading-none font-black text-deco-2">
                <Counter value={c.value} />
              </dd>
            </div>
          ))}
        </Reveal>

        {/* Award cards: one row per show (the shows have very different
            numbers of wins, so side-by-side columns came out lopsided). */}
        <div className="mt-20 border-t border-bg/15">
          {showOrder.map((show) => {
            const won = awards.filter((a) => a.show === show).sort((a, b) => a.year - b.year);
            return (
              <div
                key={show}
                className="grid gap-6 border-b border-bg/15 py-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12"
              >
                <div className="flex items-center gap-4 lg:items-start lg:pt-4">
                  <Trophy className="w-9 shrink-0" />
                  <div>
                    <h3 className="eyebrow text-bg/90">{show}</h3>
                    <p className="mt-1 font-display soft text-2xl font-black text-deco-2">
                      {won.length} {won.length === 1 ? "win" : "wins"}
                    </p>
                  </div>
                </div>
                <Reveal as="ul" variant="flip" stagger={0.12} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {won.map((a) => (
                    <li
                      key={a.id}
                      className="relative flex flex-col rounded-2xl bg-bg p-5 text-ink transition-[rotate] duration-500 ease-[var(--ease-pop)] hover:-rotate-1"
                    >
                      <span className="absolute top-4 right-4 font-mono text-xs font-bold">{a.year}</span>
                      <p className="pr-12 font-display soft text-xl leading-tight font-black">{a.category}</p>
                      {a.work && <p className="mt-1 text-muted">{a.work}</p>}
                      {a.note && <p className="mt-2 text-sm">{a.note}</p>}
                    </li>
                  ))}
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Chart records as newspaper clippings */}
        <div data-drop-group className="mt-20 grid gap-6 md:grid-cols-3">
          {chartRecords.map((r, i) => (
            <article
              key={r.id}
              data-drop
              className="relative rotate-[var(--tilt)] bg-[#f4efe4] p-6 text-[#1f1b16] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]"
              style={{ ["--tilt" as string]: `${[-1.5, 1, -0.5][i]}deg` }}
            >
              <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase">The Chart Gazette</p>
              <h3 className="mt-2 border-y border-current py-2 font-display text-2xl leading-tight font-black">
                {r.headline}
              </h3>
              <p className="mt-3 font-display text-[1.05rem] leading-relaxed">{r.body}</p>
              {i === 0 && <Star className="absolute -top-6 -right-4 w-14" tilt={14} depth={0.8} />}
            </article>
          ))}
        </div>
      </div>

      <div aria-hidden className="mt-24 -rotate-2 border-y-2 border-bg bg-deco-2 py-3 text-ink">
        <Marquee seconds={28} reverse>
          {["Grammy winner", "Emmy winner", "Six-time VMA winner", "Two Hot 100 No. 1s", "Two No. 1 albums"].map((t) => (
            <span key={t} className="font-display soft flex items-center gap-6 pr-6 text-2xl font-black italic md:text-4xl">
              {t}
              <Sparkle className="w-6" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
