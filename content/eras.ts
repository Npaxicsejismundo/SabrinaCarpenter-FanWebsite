import type { Era, EraSlug } from "./types";

/**
 * Every album and EP, in release order. Order matters: the album rail and the
 * era pages' previous/next links follow it.
 *
 * Colours were sampled from each cover (see `coverSwatches`) and then nudged
 * until every text pair passes WCAG AA. Fonts follow the lettering on the cover
 * or, when a cover has no lettering, the era's lead single artwork.
 *
 * Artwork: official cover art served from Spotify's image CDN (same images the
 * Spotify players show), or, for a release that isn't on Spotify, a copy of
 * its official cover in /public/covers. Facts checked October 2026 (sources
 * in README).
 */

const spotifyArt = (hash: string) =>
  `https://i.scdn.co/image/ab67616d0000b273${hash}`;

const VEVO = "SabrinaCarpenterVEVO";

export const eras: Era[] = [
  {
    slug: "cant-blame-a-girl-for-trying",
    title: "Can't Blame a Girl for Trying",
    kind: "EP",
    year: 2014,
    releaseDate: "2014-04-08",
    label: "Hollywood Records",
    mood: "Golden hour",
    // Not on Spotify, so the official cover is stored in the project.
    cover: {
      kind: "file",
      src: "/covers/cant-blame-a-girl-for-trying.jpg",
      size: 491,
      alt: "Can't Blame a Girl for Trying cover: Sabrina lounges on a sofa in a sheer white blouse, sunlight flaring through her hair, her name in hairline lowercase letters across the bottom.",
    },
    // The EP isn't on Spotify; its title track lives on Eyes Wide Open.
    spotify: { type: "track", id: "5K7fGxZQB0K5sPKhLe9e07" },
    billboard200Peak: null,
    keyTracks: ["Can't Blame a Girl for Trying", "The Middle of Starting Over"],
    story:
      "The debut. A title track co-written by Meghan Trainor and a girl who clearly meant it.",
    details: [
      "Released on Hollywood Records in April 2014, the four-song EP introduced Sabrina while she was filming Girl Meets World.",
      "Its title track, co-written by Meghan Trainor, was her debut single. The EP didn't reach the Billboard 200, but it peaked at No. 16 on Heatseekers Albums.",
      "Every song later moved onto her first album, Eyes Wide Open, which is where you'll find them on streaming today.",
    ],
    videos: [
      {
        id: "HibDj27DHMI",
        title: "Can't Blame a Girl for Trying (Official Video)",
        channel: VEVO,
      },
    ],
    theme: {
      bg: "#F4E6CF",
      surface: "#EAD6B8",
      ink: "#483224",
      muted: "#6E5440",
      accent: "#78553F",
      onAccent: "#F4E6CF",
      deco: ["#CD6A62", "#DFC6AB", "#AA7C5D"],
    },
    typography: {
      display: "jost",
      accent: "jost",
      displayCase: "lower",
      displayWeight: 200,
      displayTracking: "-0.02em",
      titleScale: 0.72,
      note: "Hairline geometric lowercase, after the cover's logotype.",
    },
    coverSwatches: ["#F4E6CF", "#DFC6AB", "#AA7C5D", "#483224", "#CD6A62"],
  },
  {
    slug: "eyes-wide-open",
    title: "Eyes Wide Open",
    kind: "Studio album",
    year: 2015,
    releaseDate: "2015-04-14",
    label: "Hollywood Records",
    mood: "Window light",
    cover: {
      kind: "spotify",
      src: spotifyArt("5d9a77afd5c144581be1e74e"),
      alt: "Eyes Wide Open cover: Sabrina lies on a rug in a sunlit room beside a guitar amp and a shelf of records, under a pale blue hairline logo.",
    },
    spotify: { type: "album", id: "55huyEjfSVsk9nnmmKp5df" },
    billboard200Peak: 43,
    keyTracks: ["We'll Be the Stars", "Eyes Wide Open"],
    story: "A folk-pop debut album, soft as Sunday morning light.",
    details: [
      "Her first full album arrived in April 2015 and folded in every song from the debut EP.",
      "It opened at No. 43 on the Billboard 200 with about 12,000 copies in its first week.",
      "Acoustic guitars, diary-page lyrics and a lot of sunlight: the blueprint before the glitter.",
    ],
    videos: [
      {
        id: "R4VJyfCcOJc",
        title: "Eyes Wide Open (Official Video)",
        channel: VEVO,
      },
    ],
    theme: {
      bg: "#F7FAF9",
      surface: "#E6EEED",
      ink: "#523F34",
      muted: "#6B5A4F",
      accent: "#356A78",
      onAccent: "#F7FAF9",
      deco: ["#D9753E", "#488696", "#A58C79"],
    },
    typography: {
      display: "jost",
      accent: "jost",
      displayCase: "lower",
      displayWeight: 200,
      displayTracking: "-0.02em",
      titleScale: 0.95,
      note: "The cover's hairline lowercase logo in sky blue, with thin spaced capitals in orange.",
    },
    coverSwatches: ["#FCFDFD", "#E0E9E8", "#488696", "#D9753E", "#523F34"],
  },
  {
    slug: "evolution",
    title: "Evolution",
    stylized: "EVOLution",
    kind: "Studio album",
    year: 2016,
    releaseDate: "2016-10-14",
    label: "Hollywood Records",
    mood: "Rust",
    cover: {
      kind: "spotify",
      src: spotifyArt("d6641a0296d8d09e416e0acd"),
      alt: "EVOLution cover: Sabrina in a rust blouse against a rust backdrop, her signature running up the left edge and the word LOVE mirrored inside the title.",
    },
    spotify: { type: "album", id: "7iOAJaGBmk67o337zaqt0R" },
    billboard200Peak: 28,
    keyTracks: ["Thumbs", "On Purpose", "Smoke and Fire"],
    story: "The dance-pop pivot. Look closer at the title: LOVE is hiding in a mirror.",
    details: [
      "Released in October 2016, EVOLution swapped acoustic guitars for synths and peaked at No. 28 on the Billboard 200.",
      "\"Thumbs\" went Platinum and topped the Bubbling Under Hot 100.",
      "The stylised title mirrors its first four letters: EVOL is LOVE spelled backwards. We borrowed the trick for this page.",
    ],
    videos: [],
    theme: {
      bg: "#4D1611",
      surface: "#642211",
      ink: "#FBE6D6",
      muted: "#EDBFAD",
      accent: "#E98D79",
      onAccent: "#2A1010",
      deco: ["#E6632B", "#BD4D26", "#2A1010"],
    },
    typography: {
      display: "barlow",
      accent: "homemadeApple",
      displayCase: "upper",
      displayWeight: 300,
      displayTracking: "0.32em",
      titleScale: 0.62,
      note: "Light, wide-spaced DIN-style capitals plus a handwritten signature, as on the cover.",
    },
    coverSwatches: ["#82391C", "#4D1611", "#BD4D26", "#E6632B", "#E98D79"],
  },
  {
    slug: "singular-act-i",
    title: "Singular: Act I",
    kind: "Studio album",
    year: 2018,
    releaseDate: "2018-11-09",
    label: "Hollywood Records",
    mood: "After dark",
    cover: {
      kind: "spotify",
      src: spotifyArt("38b27a27cea311f34bb68eff"),
      alt: "Singular: Act I cover: Sabrina in a black dress leans on a staircase rail while the room blurs into motion, with SINGULAR hand-lettered in white.",
    },
    spotify: { type: "album", id: "29mlGxS6kxq1EHxlX1EAZK" },
    billboard200Peak: 103,
    keyTracks: ["Almost Love", "Paris", "Sue Me"],
    story: "Act one of a two-part album, and the first she co-wrote from top to bottom.",
    details: [
      "Released in November 2018 as the first half of a split album.",
      "It's the first record on which Sabrina co-wrote every song.",
      "\"Sue Me\" and \"Almost Love\" sharpened the confident, tongue-in-cheek voice that would later take over the charts.",
    ],
    videos: [],
    theme: {
      bg: "#0A0B0C",
      surface: "#1A1C17",
      ink: "#F9F8F2",
      muted: "#B7B9A5",
      accent: "#CAAF8F",
      onAccent: "#0A0B0C",
      deco: ["#5C5834", "#B7B9A5", "#8F7B52"],
    },
    typography: {
      display: "amatic",
      accent: "homemadeApple",
      displayCase: "upper",
      displayWeight: 700,
      displayTracking: "0.06em",
      titleScale: 1.25,
      note: "Thin hand-drawn capitals with a scripted \"Act I\", after the cover.",
    },
    coverSwatches: ["#090A0C", "#1A1A12", "#5C5834", "#B7B9A5", "#CAAF8F"],
  },
  {
    slug: "singular-act-ii",
    title: "Singular: Act II",
    kind: "Studio album",
    year: 2019,
    releaseDate: "2019-07-19",
    label: "Hollywood Records",
    mood: "Fire escape",
    cover: {
      kind: "spotify",
      src: spotifyArt("f22e1263704f24cb504700ea"),
      alt: "Singular: Act II cover: Sabrina on a wrought-iron fire escape in warm sepia tones, with SINGULAR hand-lettered in white.",
    },
    spotify: { type: "album", id: "19KilSbbeHRFFZM7ChwTdP" },
    billboard200Peak: 138,
    keyTracks: ["Pushing 20", "Exhale", "In My Bed"],
    story: "The second act, the last bow at Hollywood Records, and a feature from Saweetie.",
    details: [
      "Released in July 2019, Act II completed the Singular project.",
      "It was her final release on Hollywood Records and includes a feature from Saweetie.",
      "\"Exhale\" and \"In My Bed\" traded the gloss for something more honest. Curtain down on act one of her career.",
    ],
    videos: [],
    theme: {
      bg: "#453931",
      surface: "#5F4F43",
      ink: "#F1E8DA",
      muted: "#D9C9AE",
      accent: "#E3D3B6",
      onAccent: "#2A221D",
      deco: ["#742F20", "#988674", "#0F0E0D"],
    },
    typography: {
      display: "amatic",
      accent: "homemadeApple",
      displayCase: "upper",
      displayWeight: 700,
      displayTracking: "0.06em",
      titleScale: 1.25,
      note: "The same hand-drawn SINGULAR lettering as Act I, now in sepia.",
    },
    coverSwatches: ["#0F0E0D", "#453931", "#7C6859", "#BFB19B", "#742F20"],
  },
  {
    slug: "emails-i-cant-send",
    title: "Emails I Can't Send",
    stylized: "emails i can't send",
    kind: "Studio album",
    year: 2022,
    releaseDate: "2022-07-15",
    label: "Island Records",
    mood: "Apricot room",
    cover: {
      kind: "spotify",
      src: spotifyArt("700f7bf79c9f063ad0362bdf"),
      alt: "emails i can't send cover: Sabrina sits on a white bed beside an open laptop in an apricot-walled room with teal curtains.",
    },
    spotify: { type: "album", id: "5kDmlA2g9Y1YCbNo2Ufxlz" },
    billboard200Peak: 23,
    keyTracks: ["Nonsense", "Because I Liked a Boy", "Vicious", "Feather"],
    story: "An album built from emails she wrote and never sent. Then \"Nonsense\" went viral.",
    details: [
      "Her first album for Island Records, released in July 2022, is built around messages she wrote but never sent.",
      "The improvised \"Nonsense\" outros she made up fresh at every tour stop became a fan ritual of their own.",
      "The March 2023 deluxe, emails i can't send fwd:, added \"Feather\", her first top-40 Hot 100 hit.",
    ],
    videos: [
      { id: "YcSP1ZUf1eQ", title: "Nonsense (Official Video)", channel: VEVO },
      { id: "kLbn61Z4LDI", title: "Feather (Official Video)", channel: VEVO },
    ],
    theme: {
      bg: "#F6D6B8",
      surface: "#ECC7A3",
      ink: "#2A221C",
      muted: "#5A4636",
      accent: "#26575B",
      onAccent: "#F6D6B8",
      deco: ["#C9A472", "#539196", "#C8102E"],
    },
    typography: {
      display: "courier",
      accent: "courier",
      displayCase: "lower",
      displayWeight: 400,
      displayTracking: "-0.01em",
      titleScale: 0.78,
      note: "The cover has no lettering. Lowercase typewriter type nods to the unsent-email concept and the stylised title.",
    },
    coverSwatches: ["#F6D6B8", "#E6C19C", "#C9A472", "#26575B", "#2A221C"],
  },
  {
    slug: "fruitcake",
    title: "Fruitcake",
    stylized: "fruitcake",
    kind: "EP",
    year: 2023,
    releaseDate: "2023-11-17",
    label: "Island Records",
    mood: "Red pyjamas",
    cover: {
      kind: "spotify",
      src: spotifyArt("4114a7fb3bf4ed0bf4934b43"),
      alt: "fruitcake cover: Sabrina in red heart-print pyjamas and a white headband holds a fruitcake tin up to her face.",
    },
    spotify: { type: "album", id: "7EisdwWcodpmHxgpGVE5Pg" },
    billboard200Peak: 10,
    keyTracks: ["A Nonsense Christmas", "Santa Doesn't Know You Like I Do"],
    story: "A Christmas EP that kept coming back. It led to her own Netflix holiday special.",
    details: [
      "Released in November 2023, the six-song holiday EP mixes originals with a cover of \"White Christmas\".",
      "It kept returning every December and peaked at No. 10 on the Billboard 200 in December 2024.",
      "It also led to the 2024 Netflix special A Nonsense Christmas with Sabrina Carpenter, a full-on retro variety show.",
    ],
    videos: [],
    theme: {
      bg: "#F1DDD1",
      surface: "#E6C9B8",
      ink: "#221214",
      muted: "#5E3029",
      accent: "#A02229",
      onAccent: "#FFF3E4",
      deco: ["#BA886E", "#5E3029", "#FFFFFF"],
    },
    typography: {
      display: "yesteryear",
      accent: "courier",
      displayCase: "none",
      displayWeight: 400,
      displayTracking: "0",
      titleScale: 1.15,
      note: "The cover has no lettering. A 60s holiday-card script matches the retro red-pyjama styling.",
    },
    coverSwatches: ["#DCBFAF", "#BA886E", "#A02229", "#5E3029", "#221214"],
  },
  {
    slug: "short-n-sweet",
    title: "Short n' Sweet",
    kind: "Studio album",
    year: 2024,
    releaseDate: "2024-08-23",
    label: "Island Records",
    mood: "Cobalt sky",
    cover: {
      kind: "spotify",
      src: spotifyArt("fd8d7a8d96871e791cb1f626"),
      alt: "Short n' Sweet cover: Sabrina looks back over her bare shoulder, marked with a red lipstick kiss, against a bright cobalt sky.",
    },
    spotify: { type: "album", id: "3iPSVi54hsacKKl1xIR2eH" },
    billboard200Peak: 1,
    keyTracks: ["Espresso", "Please Please Please", "Taste", "Bed Chem"],
    story: "Four weeks at No. 1, two Grammys, and a summer that belonged to her.",
    details: [
      "Released in August 2024, it debuted at No. 1 on the Billboard 200 with 362,000 units and spent four weeks on top.",
      "Its first three singles were also her first three top-five hits, and all three sat in the top five at once. Only the Beatles had done that before; she's the first soloist.",
      "It won Best Pop Vocal Album at the 2025 Grammys, and \"Espresso\" won Best Pop Solo Performance. The February 2025 deluxe added a duet with Dolly Parton.",
    ],
    videos: [
      { id: "eVli-tstM5E", title: "Espresso (Official Video)", channel: VEVO },
      {
        id: "cF1Na4AIecM",
        title: "Please Please Please (Official Video)",
        channel: VEVO,
      },
      { id: "KEG7b851Ric", title: "Taste (Official Video)", channel: VEVO },
    ],
    theme: {
      bg: "#2953A0",
      surface: "#234999",
      ink: "#FFF6EA",
      muted: "#D9E4F2",
      accent: "#F5D9A8",
      onAccent: "#1C2F5E",
      deco: ["#AEC4D5", "#D7263D", "#D38D5E"],
    },
    typography: {
      display: "pinyon",
      accent: "fraunces",
      displayCase: "none",
      displayWeight: 400,
      displayTracking: "0",
      titleScale: 1.05,
      note: "The cover has no lettering. The roundhand script comes from the \"Espresso\" single artwork.",
    },
    coverSwatches: ["#2953A0", "#234999", "#AEC4D5", "#D38D5E", "#882C20"],
  },
  {
    slug: "mans-best-friend",
    title: "Man's Best Friend",
    kind: "Studio album",
    year: 2025,
    releaseDate: "2025-08-29",
    label: "Island Records",
    mood: "Black tie",
    cover: {
      kind: "spotify",
      src: spotifyArt("b1863bf95557ea7f357c4947"),
      alt: "Man's Best Friend cover: Sabrina in a black dress and heels kneels on the floor in front of white curtains while a suited man, cropped by the frame, holds her hair.",
    },
    spotify: { type: "album", id: "1aqg30bNvLSWgShZgX4oop" },
    billboard200Peak: 1,
    keyTracks: ["Manchild", "Tears", "When Did You Get Hot?", "House Tour"],
    story: "A No. 1 album, a No. 1 debut for \"Manchild\", and a cover everyone had an opinion on.",
    details: [
      "Released in August 2025, it opened at No. 1 on the Billboard 200 with 366,000 units, the biggest week of 2025 for a female artist.",
      "Lead single \"Manchild\" debuted at No. 1 on the Hot 100, her second chart-topper. Its video won Best Visual Effects at the 2025 VMAs.",
      "The cover split opinion, so she released an alternate one she called \"approved by God\". Very her.",
    ],
    videos: [
      { id: "aSugSGCC12I", title: "Manchild (Official Video)", channel: VEVO },
      { id: "V9vuCByb6js", title: "Tears (Official Video)", channel: VEVO },
      { id: "KWoTyfPsqbE", title: "House Tour (Official Video)", channel: VEVO },
    ],
    theme: {
      bg: "#F6F2F0",
      surface: "#E9E0E2",
      ink: "#351D1D",
      muted: "#6B4A47",
      accent: "#9C4A44",
      onAccent: "#F6F2F0",
      deco: ["#E9B93B", "#D2746D", "#351D1D"],
    },
    typography: {
      display: "imFell",
      accent: "pinyon",
      displayCase: "none",
      displayWeight: 400,
      displayTracking: "0",
      titleScale: 0.9,
      note: "IM Fell, the letterpress serif on her official site this era, with the gold script from the \"Manchild\" single.",
    },
    coverSwatches: ["#F6F2F0", "#E4DADE", "#D09C9C", "#AC5751", "#351D1D"],
  },
];

export const eraBySlug = (slug: string) => eras.find((e) => e.slug === slug);

export const eraNeighbours = (slug: EraSlug) => {
  const i = eras.findIndex((e) => e.slug === slug);
  return {
    prev: i > 0 ? eras[i - 1] : undefined,
    next: i < eras.length - 1 ? eras[i + 1] : undefined,
  };
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2024-08-23" -> "August 23, 2024". Plain string maths, no Date or time zones. */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
