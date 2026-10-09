import Link from "next/link";
import { sections, site, socials } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Glyph";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Bow, Kiss, Sparkle } from "@/components/ui/Stickers";
import { MotionToggle } from "./MotionToggle";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-current/15 bg-ink pt-16 text-bg">
      <Marquee seconds={40} className="mb-14 select-none">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="font-display soft flex items-center gap-8 pr-8 text-[clamp(3rem,9vw,8rem)] leading-[1.15] font-black italic">
            Thank you, goodnight
            <Sparkle className="w-[0.5em]" />
          </span>
        ))}
      </Marquee>

      <div className="container-show grid gap-12 pb-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow text-bg/90">{sections.curtain.eyebrow}</p>
          <h2 className="font-display soft mt-3 text-title font-black">
            {sections.curtain.title}
          </h2>
          <p className="mt-4 max-w-md text-bg/90">
            This is a love letter, not the official thing. For tour dates, merch and
            the real Sabrina, head to her official channels.
          </p>
          <div aria-hidden className="relative mt-8 h-16 w-48">
            <Bow className="absolute left-0 w-20" tilt={-12} />
            <Kiss className="absolute left-24 top-2 w-20" tilt={8} />
          </div>
        </div>

        <nav aria-label="Sabrina's official accounts">
          <Reveal as="ul" stagger={0.06} y={24} className="grid grid-cols-2 gap-x-6 gap-y-1">
            {socials.map((s) => (
              <li key={s.href}>
                <Magnetic strength={0.2}>
                  <a
                    href={s.href}
                    rel="noopener"
                    className="group inline-flex items-center gap-2 py-2 text-lg font-medium text-bg no-underline"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {s.label}
                    </span>
                    <ArrowUpRight />
                  </a>
                </Magnetic>
              </li>
            ))}
          </Reveal>
        </nav>
      </div>

      <div className="container-show flex flex-col gap-4 border-t border-bg/20 py-6 text-sm text-bg/90 md:flex-row md:items-center md:justify-between">
        <p className="font-medium text-bg">{site.disclaimer}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/credits" className="underline hover:text-deco-1">
            Image credits and sources
          </Link>
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
