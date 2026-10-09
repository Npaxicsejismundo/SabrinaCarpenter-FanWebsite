import type { SocialLink, Theme } from "./types";

export const site = {
  name: "The Sabrina Show",
  /** Used in <title> and share cards. */
  longName: "The Sabrina Show: an unofficial Sabrina Carpenter fan site",
  description:
    "An unofficial fan tribute to Sabrina Carpenter: every era from Can't Blame a Girl for Trying to Man's Best Friend, the hits, the trophies and the road to headlining Coachella.",
  /** Change this to your production domain before deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: ["Short n' sweet.", "Never small."],
  scrollPrompt: "Scroll, darling",
  disclaimer:
    "Unofficial fan site. Not affiliated with Sabrina Carpenter or Island Records.",
};

/** The site's default colours, used outside the album eras. */
export const showtimeTheme: Theme = {
  bg: "#FFF3E4",
  surface: "#FBE1CC",
  ink: "#2A1712",
  muted: "#6B4A3E",
  accent: "#C8102E",
  onAccent: "#FFF3E4",
  deco: ["#F6C9D4", "#E8B04B", "#2953A0"],
};

export const nav = [
  { href: "/#meet", label: "About" },
  { href: "/#eras", label: "Eras" },
  { href: "/#hits", label: "Music" },
  { href: "/#trophies", label: "Awards" },
  { href: "/#coachella", label: "Coachella" },
  { href: "/#offstage", label: "Beyond" },
];

/** Section headings. Eyebrows follow the variety-show running order. */
export const sections = {
  meet: {
    eyebrow: "Act one · Meet the star",
    title: "Get to know her",
  },
  eras: {
    eyebrow: "Wardrobe changes",
    title: "The eras",
    intro:
      "Seven albums, two EPs, nine looks. Scroll through and watch the whole site change outfits.",
  },
  hits: {
    eyebrow: "By popular request",
    title: "Greatest hits",
    intro:
      "Ten songs, zero lyrics printed here. Press play and let her do the talking.",
  },
  trophies: {
    eyebrow: "The trophy cabinet",
    title: "Needed a bigger shelf",
  },
  coachella: {
    eyebrow: "A two-act show",
    title: "Coachella",
    intro: "In 2024 she made a promise from the main stage. In 2026 she kept it.",
  },
  offstage: {
    eyebrow: "Off-stage",
    title: "Beyond the music",
  },
  curtain: {
    eyebrow: "Curtain call",
    title: "Follow the real thing",
  },
};

export const socials: SocialLink[] = [
  { label: "Official site", href: "https://www.sabrinacarpenter.com/" },
  { label: "Instagram", href: "https://www.instagram.com/sabrinacarpenter/" },
  { label: "TikTok", href: "https://www.tiktok.com/@sabrinacarpenter" },
  { label: "X", href: "https://x.com/SabrinaAnnLynn" },
  { label: "Facebook", href: "https://www.facebook.com/sabrinacarpenter" },
  { label: "YouTube", href: "https://www.youtube.com/@sabrinacarpenter" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/sabrina-carpenter/390647681",
  },
];
