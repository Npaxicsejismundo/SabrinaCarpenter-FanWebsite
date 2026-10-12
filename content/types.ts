/**
 * Shared content types. Every piece of copy, every fact and every image on the
 * site lives in `/content` and is typed here, so you can update the site
 * without touching components.
 */

/** Keys for every font loaded in `lib/fonts.ts`. */
export type FontKey =
  | "fraunces"
  | "instrument"
  | "courier"
  | "jost"
  | "barlow"
  | "homemadeApple"
  | "amatic"
  | "yesteryear"
  | "pinyon"
  | "imFell";

/** One colour theme. All text pairs are checked for WCAG AA (4.5:1). */
export interface Theme {
  /** Page background. */
  bg: string;
  /** Cards and raised panels. */
  surface: string;
  /** Body text. */
  ink: string;
  /** Secondary text. */
  muted: string;
  /** Links, buttons, highlights. Safe for text on `bg` and `surface`. */
  accent: string;
  /** Text placed on an `accent` fill. */
  onAccent: string;
  /** Decorative only (stickers, shapes). Never used for text. */
  deco: [string, string, string];
}

/** How an era's typography is set. */
export interface EraTypography {
  /** Big title lockups and era-page headings. */
  display: FontKey;
  /** Small flourishes: eyebrows, signatures, captions. */
  accent: FontKey;
  displayCase?: "lower" | "upper" | "none";
  /** CSS font-weight for the display face. */
  displayWeight?: number;
  /** CSS letter-spacing for the display face, e.g. "0.3em". */
  displayTracking?: string;
  /** Size multiplier for big title lockups (wide or long titles < 1). */
  titleScale?: number;
  /** Where the choice comes from (shown on the era page). */
  note: string;
}

/** Image credit, mirrored in IMAGE_CREDITS.md. */
export interface Credit {
  author: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  year?: number;
  /** Where to keep in frame when the photo is cropped (CSS object-position,
   * e.g. "50% 20%"). Crops default to the upper middle, where faces are. */
  focus?: string;
  credit: Credit;
}

export type CoverArt =
  | {
      kind: "spotify";
      /** 640×640 artwork from Spotify's image CDN. */
      src: string;
      alt: string;
    }
  | {
      kind: "file";
      /** Square official artwork saved in /public, e.g. "/covers/x.jpg"
       * (for releases that aren't on Spotify). */
      src: string;
      /** Width and height in pixels. */
      size: number;
      alt: string;
    }
  | {
      kind: "placeholder";
      /** Why there's no official artwork. Shown on the placeholder. */
      reason: string;
      alt: string;
    };

export interface SpotifyRef {
  type: "album" | "track";
  id: string;
}

export interface VideoRef {
  /** YouTube video ID. */
  id: string;
  title: string;
  /** Channel that uploaded it (official channels only). */
  channel: string;
  /** Vertical YouTube Shorts need a portrait frame. */
  vertical?: boolean;
}

export type EraSlug =
  | "cant-blame-a-girl-for-trying"
  | "eyes-wide-open"
  | "evolution"
  | "singular-act-i"
  | "singular-act-ii"
  | "emails-i-cant-send"
  | "fruitcake"
  | "short-n-sweet"
  | "mans-best-friend";

export interface Era {
  slug: EraSlug;
  /** Plain title, used for SEO and screen readers. */
  title: string;
  /** How the title is styled on the artwork, if different. */
  stylized?: string;
  kind: "Studio album" | "EP";
  year: number;
  /** ISO date, e.g. "2024-08-23". */
  releaseDate: string;
  label: "Hollywood Records" | "Island Records";
  /** A short nickname for the era's look, e.g. "Cobalt sky". */
  mood: string;
  cover: CoverArt;
  spotify: SpotifyRef;
  /** Peak on the Billboard 200. `null` = did not chart. */
  billboard200Peak: number | null;
  keyTracks: string[];
  /** One line for the album rail. */
  story: string;
  /** A few short paragraphs for the era page. */
  details: string[];
  videos: VideoRef[];
  theme: Theme;
  typography: EraTypography;
  /** Hex colours sampled from the cover, shown as swatches on the era page. */
  coverSwatches: string[];
}

export interface Track {
  id: string;
  title: string;
  /** Credit line, e.g. "Madonna & Sabrina Carpenter". */
  artists: string;
  release: string;
  year: number;
  hot100Peak: number;
  note?: string;
  artwork: { src: string; alt: string };
  spotifyId: string;
  video: VideoRef;
}

export interface TimelineEntry {
  id: string;
  when: string;
  title: string;
  body: string;
  photo?: Photo;
  /** Shown on the TV instead of a photo (official thumbnail, plays on click). */
  video?: VideoRef;
  sticker: "camera" | "star" | "record" | "heart" | "trophy" | "sparkle";
}

export interface FunFact {
  id: string;
  title: string;
  body: string;
  sticker: "bow" | "kiss" | "sparkle" | "heart";
}

export interface Award {
  id: string;
  year: number;
  show: string;
  category: string;
  work?: string;
  note?: string;
}

export interface Counter {
  id: string;
  value: number;
  label: string;
  detail: string;
}

export interface Role {
  id: string;
  title: string;
  year: string;
  kind: string;
  body: string;
  status?: "upcoming";
}

export interface SocialLink {
  label: string;
  href: string;
}
