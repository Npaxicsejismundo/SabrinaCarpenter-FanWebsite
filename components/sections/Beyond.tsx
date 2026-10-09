import { fund, roles } from "@/content/beyond";
import { sections } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Glyph";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Bow, Heart } from "@/components/ui/Stickers";

export function Beyond() {
  return (
    <section id="offstage" aria-labelledby="offstage-title" tabIndex={-1} className="relative py-24 outline-none md:py-36">
      <div className="container-show">
        <SectionHeading id="offstage-title" eyebrow={sections.offstage.eyebrow} title={sections.offstage.title} />

        {/* Playbill cards */}
        <Reveal as="ul" variant="curtain" stagger={0.14} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <li
              key={r.id}
              className="group relative flex flex-col rounded-t-[10rem] rounded-b-2xl border-2 border-ink bg-surface px-6 pt-14 pb-6 text-center transition-[translate] duration-500 ease-[var(--ease-pop)] hover:-translate-y-2"
            >
              <p className="eyebrow text-muted">{r.kind}</p>
              <h3 className="font-display soft mt-3 text-[1.9rem] leading-tight font-black">{r.title}</h3>
              <p className="mt-1 font-mono text-sm">{r.year}</p>
              <p className="mt-4 flex-1">{r.body}</p>
              {r.status === "upcoming" && (
                <span className="mx-auto mt-5 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold tracking-widest text-on-accent">
                  COMING SOON
                </span>
              )}
            </li>
          ))}
        </Reveal>

        {/* Fund */}
        <div className="relative mt-20 overflow-hidden rounded-[2.5rem] bg-accent p-8 text-on-accent md:p-14">
          <Heart className="absolute -top-4 right-10 w-24 md:w-32" tilt={12} float depth={0.8} />
          <Bow className="absolute bottom-6 left-[60%] hidden w-24 md:block" tilt={-10} depth={0.5} />
          <p className="eyebrow">Giving back</p>
          <h3 className="font-display soft mt-3 max-w-2xl text-title font-black">{fund.title}</h3>
          <p className="mt-5 max-w-2xl text-lg">{fund.body}</p>
          <a
            href={fund.href}
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-on-accent px-6 py-3 font-semibold text-accent no-underline transition-transform hover:scale-[1.03]"
          >
            {fund.linkLabel} <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
