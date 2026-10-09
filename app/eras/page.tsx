import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { eras } from "@/content/eras";
import { PageShell } from "@/components/chrome/PageShell";
import { CoverArt } from "@/components/era/CoverArt";
import { EraTitle } from "@/components/era/EraTitle";
import { FontGate } from "@/components/ui/FontGate";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "Every era",
  description:
    "All of Sabrina Carpenter's albums and EPs side by side, from Can't Blame a Girl for Trying (2014) to Man's Best Friend (2025).",
  alternates: { canonical: "/eras" },
};

export default function ErasIndex() {
  return (
    <PageShell>
      <div className="container-show pt-[calc(var(--header-h)+3rem)] pb-24">
        <SectionHeading
          id="all-eras-title"
          eyebrow="The full wardrobe"
          title="Every era"
          intro="Seven albums and two EPs, in release order. Pick one to step inside."
        />
        <Reveal as="ul" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {eras.map((era, i) => {
            const card = (
              <Link href={`/eras/${era.slug}`} prefetch data-cursor="Open" className="group block text-ink no-underline">
                <div className="overflow-hidden rounded-lg shadow-[0_25px_50px_-25px_rgb(0_0_0/0.5)]">
                  <ViewTransition name={`cover-${era.slug}`} share="cover" default="none">
                    <div className="transition-transform duration-700 ease-[var(--ease-show)] group-hover:scale-[1.04]">
                      <CoverArt era={era} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
                    </div>
                  </ViewTransition>
                </div>
                <p className="eyebrow mt-5 text-muted">
                  {era.kind} · {era.year}
                </p>
                <EraTitle era={era} as="h2" className="mt-2 text-4xl text-balance" />
                <p className="mt-2 text-muted">{era.story}</p>
              </Link>
            );
            // The first row's title fonts load straight away; titles further
            // down wait until they're near the screen (see FontGate).
            return i < 3 ? (
              <li key={era.slug}>{card}</li>
            ) : (
              <FontGate key={era.slug} as="li">
                {card}
              </FontGate>
            );
          })}
        </Reveal>
      </div>
    </PageShell>
  );
}
