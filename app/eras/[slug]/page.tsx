import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eraBySlug, eras } from "@/content/eras";
import { site } from "@/content/site";
import { eraVars } from "@/lib/theme";
import { PageShell } from "@/components/chrome/PageShell";
import { EraView } from "@/components/era/EraView";

export const ensureStatic = "navigation";
// Every era is prerendered (generateStaticParams). Reading the slug before
// rendering is deliberate: unknown slugs get a real 404 instead of a shell.
export const instant = false;

export function generateStaticParams() {
  return eras.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/eras/[slug]">): Promise<Metadata> {
  const era = eraBySlug((await params).slug);
  if (!era) notFound();
  const title = `${era.stylized ?? era.title} (${era.year})`;
  const description = `${era.story} The ${era.kind.toLowerCase()} era, with key tracks, the story and a Spotify player.`;
  return {
    title,
    description,
    alternates: { canonical: `/eras/${era.slug}` },
    openGraph: { title: `${title} · ${site.name}`, description, url: `/eras/${era.slug}` },
  };
}

export default async function EraPage({ params }: PageProps<"/eras/[slug]">) {
  const era = eraBySlug((await params).slug);
  if (!era) notFound();
  return (
    <PageShell vars={eraVars(era)} era={era.slug}>
      <EraView era={era} />
    </PageShell>
  );
}
