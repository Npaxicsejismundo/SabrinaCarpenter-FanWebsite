import { photos } from "./photos";
import type { Photo, VideoRef } from "./types";

export interface CoachellaAct {
  id: string;
  act: string;
  year: number;
  title: string;
  dates: string;
  paragraphs: string[];
  quote?: { text: string; source: string; sourceUrl: string };
  videos: VideoRef[];
}

export const coachellaActs: CoachellaAct[] = [
  {
    id: "2024",
    act: "Act I",
    year: 2024,
    title: "The promise",
    dates: "Fridays, April 12 & 19, 2024 · Coachella Stage",
    paragraphs: [
      "\"Espresso\" came out on Thursday, April 11. The next day she made her debut on Coachella's main stage and sang it live.",
      "Somewhere in one of her improvised \"Nonsense\" outros, she made the crowd a promise.",
    ],
    quote: {
      text: "Coachella, see you back here when I headline.",
      source: "Rolling Stone",
      sourceUrl:
        "https://www.rollingstone.com/music/music-news/sabrina-carpenter-predicts-coachella-set-1235428667",
    },
    videos: [
      {
        id: "_XCh1ye6xTg",
        title: "Coachella: \"Can't sleep, won't sleep thinking about @sabrinacarpenter\"",
        channel: "Coachella",
        vertical: true,
      },
    ],
  },
  {
    id: "2026",
    act: "Act II",
    year: 2026,
    title: "The headline",
    dates: "Fridays, April 10 & 17, 2026 · Headliner",
    paragraphs: [
      "When the 2026 lineup dropped, there she was at the top of Friday, alongside Saturday's Justin Bieber and Sunday's Karol G. She reposted the 2024 clip with a caption: \"Woman of my word.\"",
      "The show was \"Sabrinawood\", an Old Hollywood fantasy built on Man's Best Friend. In weekend two, Madonna joined her for \"Vogue\", \"Like a Prayer\" and the live debut of their new song, \"Bring Your Love\".",
    ],
    videos: [
      {
        id: "1NgzOcU0Zvo",
        title: "Sabrina Carpenter x Madonna - Bring Your Love - Live at Coachella 2026",
        channel: "Coachella",
      },
      {
        id: "nrvQl4Nfqfc",
        title: "Espresso - Live at Coachella 2026",
        channel: "SabrinaCarpenterVEVO",
      },
      {
        id: "ZYP_qhrbzN0",
        title: "House Tour - Live at Coachella 2026",
        channel: "SabrinaCarpenterVEVO",
      },
      {
        id: "fUJwCJZbJBs",
        title: "Sugar Talking - Live at Coachella 2026",
        channel: "SabrinaCarpenterVEVO",
      },
    ],
  },
];

/**
 * The "From the crowd" scrapbook. Right now only two freely licensed Coachella
 * photos exist on Wikimedia Commons (low-res fan-video stills); the other
 * entries are slots for official press photos. Slots without a photo aren't
 * shown. Replace a `null` photo with a `Photo` object to add it.
 */
export const coachellaGallery: { id: string; photo: Photo | null; slotLabel: string }[] = [
  { id: "g1", photo: photos.coachella2024, slotLabel: "2024" },
  { id: "g2", photo: null, slotLabel: "Official 2024 press photo" },
  { id: "g3", photo: photos.coachella2026, slotLabel: "2026" },
  { id: "g4", photo: null, slotLabel: "Official 2026 press photo" },
  { id: "g5", photo: null, slotLabel: "Madonna & Sabrina, weekend two" },
];
