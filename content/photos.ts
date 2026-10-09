import type { Photo } from "./types";

/**
 * Freely licensed photos from Wikimedia Commons. Every entry is listed in
 * IMAGE_CREDITS.md; keep the two in sync when you swap images.
 *
 * Large originals use Commons' standard 1920px thumbnails so Next.js doesn't
 * have to download 20 MB files to optimise them.
 */

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const CC_BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const CC_BY_3 = "https://creativecommons.org/licenses/by/3.0/";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";

export const photos = {
  hydePark2025: {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Sabrina_Carpenter_at_BST_Hyde_Park_-_20250706_-_020_%28cropped%29.jpg",
    width: 850,
    height: 1230,
    alt: "Sabrina Carpenter on stage in a pink sequinned dress, blonde curls framing a sideways glance",
    caption: "Headlining BST Hyde Park, London",
    year: 2025,
    credit: {
      author: "Raph_PH",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_at_BST_Hyde_Park_-_20250706_-_020_(cropped).jpg",
    },
  },
  o2Portrait2025: {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/61/Sabrina_Carpenter_-_O2_Arena_2025_-_086_%28cropped_2%29.jpg",
    width: 683,
    height: 981,
    alt: "Sabrina Carpenter smiling on stage in a sparkling silver halter dress, microphone in hand",
    caption: "Short n' Sweet Tour, O2 Arena, London",
    year: 2025,
    credit: {
      author: "Raph_PH",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_-_O2_Arena_2025_-_086_(cropped_2).jpg",
    },
  },
  o2Wide2025: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Sabrina_Carpenter_-_O2_Arena_2025_-_015.jpg/1920px-Sabrina_Carpenter_-_O2_Arena_2025_-_015.jpg",
    width: 1920,
    height: 1082,
    alt: "Wide shot of Sabrina Carpenter singing on a pale, curved set at the O2 Arena",
    caption: "Short n' Sweet Tour, O2 Arena, London",
    year: 2025,
    credit: {
      author: "Raph_PH",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_-_O2_Arena_2025_-_015.jpg",
    },
  },
  primavera2025: {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/15/Primavera2025_%28139_of_182%29_%2854574520207%29_%28cropped%29.jpg",
    width: 1038,
    height: 1345,
    alt: "Sabrina Carpenter laughing on stage in a blue sequinned top",
    caption: "Headlining Primavera Sound, Barcelona",
    year: 2025,
    credit: {
      author: "Raph_PH",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Primavera2025_(139_of_182)_(54574520207)_(cropped).jpg",
    },
  },
  disney2014: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Sabrina_Carpenter.jpg/1920px-Sabrina_Carpenter.jpg",
    width: 1920,
    height: 1280,
    alt: "Teenage Sabrina Carpenter singing on a small stage beside a fellow performer, both holding microphones",
    caption: "Performing at a Disney event, Anaheim",
    year: 2014,
    credit: {
      author: "Sam Howzit",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter.jpg",
    },
  },
  redCarpet2015: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Sabrina_Carpenter_Feb_10_2015.jpg/1920px-Sabrina_Carpenter_Feb_10_2015.jpg",
    width: 1920,
    height: 2511,
    alt: "Close-up of a smiling Sabrina Carpenter on a red carpet, aged 15",
    caption: "At a Disney Channel premiere",
    year: 2015,
    credit: {
      author: "Red Carpet Report",
      license: "CC BY-SA 2.0",
      licenseUrl: CC_BY_SA_2,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_Feb_10_2015.jpg",
    },
  },
  jingleBall2016: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Sabrina_Carpenter_%40_Staples_Center_12_02_2016_%2854996914934%29.jpg/1920px-Sabrina_Carpenter_%40_Staples_Center_12_02_2016_%2854996914934%29.jpg",
    width: 1920,
    height: 1200,
    alt: "Sabrina Carpenter in white performing on an outdoor stage under a KIIS Jingle Ball banner",
    caption: "Jingle Ball, Los Angeles",
    year: 2016,
    credit: {
      author: "Justin Higuchi",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_@_Staples_Center_12_02_2016_(54996914934).jpg",
    },
  },
  wiltern2022: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Sabrina_Carpenter_%40_Wiltern_10_15_2022_%2852526443913%29.jpg/1920px-Sabrina_Carpenter_%40_Wiltern_10_15_2022_%2852526443913%29.jpg",
    width: 1920,
    height: 2400,
    alt: "Sabrina Carpenter singing in front of a giant glowing heart on a hot-pink stage",
    caption: "Emails I Can't Send Tour, the Wiltern, Los Angeles",
    year: 2022,
    credit: {
      author: "Justin Higuchi",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_@_Wiltern_10_15_2022_(52526443913).jpg",
    },
  },
  erasTour2024: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Sabrina_Carpenter%2C_The_Eras_Tour%2C_Singapore_National_Stadium%2C_9_March_2024.jpeg/1920px-Sabrina_Carpenter%2C_The_Eras_Tour%2C_Singapore_National_Stadium%2C_9_March_2024.jpeg",
    width: 1920,
    height: 1440,
    alt: "Sabrina Carpenter on a stadium screen above a packed crowd at Singapore National Stadium",
    caption: "Opening for The Eras Tour, Singapore",
    year: 2024,
    credit: {
      author: "TenthAvenueFreezeOut",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter,_The_Eras_Tour,_Singapore_National_Stadium,_9_March_2024.jpeg",
    },
  },
  coachella2024: {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sabrina_Carpenter_en_Coachella_01.jpg",
    width: 461,
    height: 573,
    alt: "Fan's-eye view of Sabrina Carpenter at a piano on the Coachella Stage, 2024",
    caption: "Coachella Stage (fan video still)",
    year: 2024,
    credit: {
      author: "ANITA CON SWING",
      license: "CC BY 3.0",
      licenseUrl: CC_BY_3,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_en_Coachella_01.jpg",
    },
  },
  coachella2026: {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Sabrina_Carpenter_at_Coachella_2026.png",
    width: 1280,
    height: 720,
    alt: "Fan's-eye view of Sabrina Carpenter performing under pink stage lights at Coachella 2026",
    caption: "Headlining Coachella (fan video still)",
    year: 2026,
    credit: {
      author: "Danielle Marie Carolan",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_at_Coachella_2026.png",
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
