import { photos } from "./photos";
import type { FunFact, TimelineEntry } from "./types";

export const bio = {
  lede: "Pennsylvania girl, Disney kid, songwriter, two-time Grammy winner and the funniest person on any stage she walks onto.",
  paragraphs: [
    "Sabrina Carpenter was born on May 11, 1999, in Quakertown, Pennsylvania, and grew up in nearby East Greenville. By about ten she was posting cover songs on YouTube, and by her early teens she was in Los Angeles chasing it for real.",
    "She spent three seasons as Maya Hart on Disney Channel's Girl Meets World while releasing music on Hollywood Records. After moving to Island Records in 2021, she wrote her way into the big leagues: Short n' Sweet made her a two-time Grammy winner, and in 2026 she headlined Coachella.",
    "Singer, songwriter, actor, producer, and always in on the joke.",
  ],
  photo: photos.o2Portrait2025,
};

export const timeline: TimelineEntry[] = [
  {
    id: "youtube",
    when: "Age ~10",
    title: "Covers on YouTube",
    body: "She started posting cover songs online, and finished third in Miley Cyrus's online singing contest, The Next Miley Cyrus Project.",
    // Her first upload (2009), still on her official channel.
    video: {
      id: "bWYXB0MGRNo",
      title: "“Picture to Burn” (Taylor Swift cover), 2009",
      channel: "Sabrina Carpenter",
    },
    sticker: "camera",
  },
  {
    id: "gmw",
    when: "2014–2017",
    title: "Girl Meets World",
    body: "Cast as Maya Hart on Disney Channel. The show ran for three seasons, and she sang its theme song with co-star Rowan Blanchard.",
    photo: photos.disney2014,
    sticker: "star",
  },
  {
    id: "hollywood",
    when: "2014–2019",
    title: "Hollywood Records",
    body: "Her first label home: one EP and four albums, from Can't Blame a Girl for Trying to Singular: Act II.",
    photo: photos.jingleBall2016,
    sticker: "record",
  },
  {
    id: "island",
    when: "2021",
    title: "Island Records",
    body: "A new label and a new chapter, starting with \"Skin\" in January 2021 and leading to emails i can't send in 2022.",
    photo: photos.wiltern2022,
    sticker: "heart",
  },
  {
    id: "breakthrough",
    when: "2024",
    title: "The global breakthrough",
    body: "\"Espresso\" in April, a first Hot 100 No. 1 with \"Please Please Please\" in June, and Short n' Sweet at No. 1 by September.",
    photo: photos.erasTour2024,
    sticker: "trophy",
  },
  {
    id: "today",
    when: "Today",
    title: "Headliner",
    body: "Coachella headliner, Emmy winner as a producer of The Muppet Show, and a movie musical of Alice in Wonderland in development with her as star and producer.",
    photo: photos.primavera2025,
    sticker: "sparkle",
  },
];

export const funFacts: FunFact[] = [
  {
    id: "miley",
    title: "Bronze medal energy",
    body: "As a kid she finished third in Miley Cyrus's online singing contest, The Next Miley Cyrus Project.",
    sticker: "sparkle",
  },
  {
    id: "bart",
    title: "Ay, caramba",
    body: "Her step-aunt is Nancy Cartwright, the voice of Bart Simpson. Cartwright's stepbrother is Sabrina's dad.",
    sticker: "kiss",
  },
  {
    id: "instruments",
    title: "One-woman band",
    body: "She plays guitar and piano on stage, and says she can also play bass, ukulele and drums.",
    sticker: "bow",
  },
  {
    id: "sarah",
    title: "Sister act",
    body: "Her older sister Sarah, a photographer, is her longtime creative partner and works with her on pretty much everything.",
    sticker: "heart",
  },
];
