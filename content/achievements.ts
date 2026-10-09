import type { Award, Counter } from "./types";

/** Totals as of October 2026. Sources are listed in the README. */
export const counters: Counter[] = [
  {
    id: "grammys",
    value: 2,
    label: "Grammys",
    detail: "Both in 2025, for Short n' Sweet and \"Espresso\"",
  },
  {
    id: "emmy",
    value: 1,
    label: "Emmy",
    detail: "2026, as an executive producer of The Muppet Show",
  },
  {
    id: "vmas",
    value: 6,
    label: "VMAs",
    detail: "Across 2024, 2025 and 2026",
  },
  {
    id: "hot100",
    value: 2,
    label: "Hot 100 No. 1s",
    detail: "\"Please Please Please\" and \"Manchild\"",
  },
  {
    id: "bb200",
    value: 2,
    label: "Billboard 200 No. 1s",
    detail: "Short n' Sweet and Man's Best Friend",
  },
];

export const awards: Award[] = [
  {
    id: "grammy-pop-vocal-album",
    year: 2025,
    show: "Grammy Awards",
    category: "Best Pop Vocal Album",
    work: "Short n' Sweet",
  },
  {
    id: "grammy-pop-solo",
    year: 2025,
    show: "Grammy Awards",
    category: "Best Pop Solo Performance",
    work: "Espresso",
  },
  {
    id: "emmy-variety-special",
    year: 2026,
    show: "Emmy Awards",
    category: "Outstanding Variety Special (Pre-Recorded)",
    work: "The Muppet Show",
    note: "As executive producer. Her first Emmy.",
  },
  {
    id: "vma-song-2024",
    year: 2024,
    show: "MTV VMAs",
    category: "Song of the Year",
    work: "Espresso",
  },
  {
    id: "vma-pop-artist-2025",
    year: 2025,
    show: "MTV VMAs",
    category: "Best Pop Artist",
  },
  {
    id: "vma-album-2025",
    year: 2025,
    show: "MTV VMAs",
    category: "Best Album",
    work: "Short n' Sweet",
  },
  {
    id: "vma-vfx-2025",
    year: 2025,
    show: "MTV VMAs",
    category: "Best Visual Effects",
    work: "Manchild",
  },
  {
    id: "vma-collab-2026",
    year: 2026,
    show: "MTV VMAs",
    category: "Best Collaboration",
    work: "Bring Your Love (with Madonna)",
  },
  {
    id: "vma-editing-2026",
    year: 2026,
    show: "MTV VMAs",
    category: "Best Editing",
    work: "House Tour",
  },
];

export const chartRecords = [
  {
    id: "beatles",
    headline: "Only the second act ever",
    body: "In September 2024, \"Taste\", \"Please Please Please\" and \"Espresso\" sat at Nos. 2, 3 and 4 on the Hot 100. Her first three top-five hits, all in the top five at once. Only the Beatles had done that before, and she's the first soloist.",
  },
  {
    id: "hot100",
    headline: "Two Hot 100 No. 1s",
    body: "\"Please Please Please\" reached No. 1 in June 2024. \"Manchild\" debuted there in June 2025.",
  },
  {
    id: "bb200",
    headline: "Two Billboard 200 No. 1s",
    body: "Short n' Sweet spent four weeks at No. 1. Man's Best Friend opened there with the biggest week of 2025 for a female artist.",
  },
];
