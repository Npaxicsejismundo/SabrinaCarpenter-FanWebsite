import type { Metadata } from "next";
import Image from "next/image";
import { eras } from "@/content/eras";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { PageShell } from "@/components/chrome/PageShell";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "Credits and sources",
  description: "Image credits, licences and sources for this unofficial Sabrina Carpenter fan site.",
  alternates: { canonical: "/credits" },
};

const sources = [
  ["Billboard chart history", "https://www.billboard.com/artist/sabrina-carpenter/"],
  ["Grammy.com", "https://www.grammy.com/artists/sabrina-carpenter/"],
  ["Wikipedia: list of awards and nominations", "https://en.wikipedia.org/wiki/List_of_awards_and_nominations_received_by_Sabrina_Carpenter"],
  ["Billboard: first Emmy", "https://www.billboard.com/music/awards/sabrina-carpenter-first-primetime-emmy-the-muppet-show-1236335170/"],
  ["Rolling Stone: the Coachella promise", "https://www.rollingstone.com/music/music-news/sabrina-carpenter-predicts-coachella-set-1235428667"],
  ["Wikipedia: Coachella 2026", "https://en.wikipedia.org/wiki/Coachella_2026"],
  ["The Hollywood Reporter: Alice in Wonderland musical", "https://www.hollywoodreporter.com/movies/movie-news/sabrina-carpenter-alice-in-wonderland-movie-musical-1236424035/"],
  ["Billboard: the Sabrina Carpenter Fund", "https://www.billboard.com/music/music-news/sabrina-carpenter-raises-one-million-charity-1236011015"],
] as const;

export default function Credits() {
  return (
    <PageShell>
      <div className="container-show max-w-5xl pt-[calc(var(--header-h)+3rem)] pb-24">
        <p className="eyebrow text-muted">The small print</p>
        <h1 className="font-display soft mt-3 text-display font-black">Credits</h1>
        <p className="mt-6 max-w-2xl text-lede">{site.disclaimer}</p>

        <h2 className="font-display soft mt-16 text-3xl font-black">Photos</h2>
        <p className="mt-2 text-muted">
          Freely licensed photos from Wikimedia Commons. Thank you to every photographer.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {Object.values(photos).map((p) => (
            <li key={p.src} className="flex gap-4">
              <Image src={p.src} alt="" width={96} height={96} sizes="96px" className="size-24 shrink-0 rounded-lg object-cover" />
              <div className="text-sm">
                <p className="font-semibold">{p.caption}{p.year ? `, ${p.year}` : ""}</p>
                <p className="mt-1">
                  {p.credit.author} ·{" "}
                  <a href={p.credit.licenseUrl} className="underline hover:text-accent">
                    {p.credit.license}
                  </a>
                </p>
                <a href={p.credit.sourceUrl} className="mt-1 inline-block underline hover:text-accent">
                  Source on Wikimedia Commons
                </a>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="font-display soft mt-16 text-3xl font-black">Album artwork</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Cover art belongs to the releasing labels and is shown from Spotify&apos;s official image CDN,
          the same images its players display. The Can&apos;t Blame a Girl for Trying EP isn&apos;t on
          Spotify, so a labelled placeholder stands in.
        </p>
        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          {eras.map((e) => (
            <li key={e.slug}>
              <span className="font-semibold">{e.stylized ?? e.title}</span> ({e.year}) © {e.label}
              {e.cover.kind === "placeholder" && " · placeholder"}
            </li>
          ))}
        </ul>

        <h2 className="font-display soft mt-16 text-3xl font-black">Embeds</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Music and video players are official Spotify and YouTube embeds. They only load when you press
          play. YouTube videos use the privacy-enhanced youtube-nocookie.com domain.
        </p>

        <h2 className="font-display soft mt-16 text-3xl font-black">Fact sources</h2>
        <p className="mt-2 text-muted">Facts were checked in October 2026. Main sources:</p>
        <ul className="mt-6 space-y-2">
          {sources.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="underline hover:text-accent">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
