import { eras } from "@/content/eras";
import { tracks } from "@/content/tracks";
import { PageShell } from "@/components/chrome/PageShell";
import { Achievements } from "@/components/sections/Achievements";
import { Beyond } from "@/components/sections/Beyond";
import { Coachella } from "@/components/sections/Coachella";
import { ErasRail } from "@/components/sections/ErasRail";
import { Hero } from "@/components/sections/Hero";
import { Meet } from "@/components/sections/Meet";
import { TopMusic } from "@/components/sections/TopMusic";

export const ensureStatic = "navigation";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Meet />
      <ErasRail eras={eras} />
      <TopMusic tracks={tracks} />
      <Achievements />
      <Coachella />
      <Beyond />
    </PageShell>
  );
}
