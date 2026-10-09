# The Sabrina Show

An unofficial fan site for Sabrina Carpenter, staged as a variety show: every era from *Can't
Blame a Girl for Trying* to *Man's Best Friend*, the hits, the trophies, the road to headlining
Coachella and the work she does off stage.

> Unofficial fan site. Not affiliated with Sabrina Carpenter or Island Records.

## What's on the site

**Home (`/`)**, in running order:

1. **Hero**: her name, a TV set showing a live photo, and a marquee of hits
2. **Meet the star**: a short bio and a channel-guide timeline of her career
3. **The eras**: every album and EP. On wide screens it's a pinned, sideways rail; as each album
   reaches centre stage the whole page takes on that era's colours and type. Phones get a vertical
   stack.
4. **Greatest hits**: a jukebox list with Spotify players and official videos
5. **Trophies**: Grammys, chart records and other milestones, with counters
6. **Coachella**: the 2024 promise and the 2026 headline set
7. **Beyond the music**: acting, the Sabrina Carpenter Fund and other work

**Other pages**

- `/eras`: every era side by side
- `/eras/[slug]`: one page per era, themed with colours sampled from the cover and fonts matched
  to its lettering (nine pages, all prerendered)
- `/credits`: image credits, licences and fact sources
- A themed 404 page, a sitemap, `robots.txt` and generated share images for every page

## Tech

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Cache Components) and React 19
- [Tailwind CSS 4](https://tailwindcss.com/)
- [GSAP 3](https://gsap.com/) with ScrollTrigger and SplitText for motion
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling (mouse and trackpad only)
- Fonts from Google Fonts via `next/font`, self-hosted at build time
- TypeScript throughout

## Getting started

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (every page is prerendered) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

### Before you deploy

Set `NEXT_PUBLIC_SITE_URL` to your real domain, e.g. `https://thesabrinashow.example`. It's used
for canonical links, the sitemap and share images. Without it the site assumes
`http://localhost:3000`.

The site works on any host that runs Next.js (Vercel, Netlify, a Node server). Images are
optimised by Next.js from the remote hosts listed in `next.config.ts`.

## Project layout

```
app/                 Routes, metadata, sitemap, robots, share images, global CSS
  eras/              The /eras index and the /eras/[slug] pages
  credits/           Credits and sources
components/
  chrome/            Header, footer, preloader, cursor, smooth scroll, theme scope
  sections/          The home page sections, top to bottom
  era/               Era page view, cover art, title lockups, 3D tilt
  ui/                Building blocks: reveals, stickers, embeds, icons, font gate
content/             Every word, fact, colour and image on the site (typed)
lib/                 Fonts, motion setup, theming helpers
```

## Editing content

Everything you'd want to change lives in `content/`, typed by `content/types.ts`, so you can
update the site without touching components:

| File | What's in it |
| --- | --- |
| `site.ts` | Site name, tagline, disclaimer, navigation, section headings, social links, default theme |
| `bio.ts` | The "Meet the star" bio and career timeline |
| `eras.ts` | Every album and EP: story, key tracks, Spotify ID, cover, colours and fonts |
| `tracks.ts` | The greatest hits list |
| `achievements.ts` | Trophies, records and counters |
| `coachella.ts` | Both Coachella acts, quotes, videos and photos |
| `beyond.ts` | Acting roles and the Sabrina Carpenter Fund |
| `photos.ts` | Every photo, with alt text and its credit |

**Adding an era.** Add an entry to `eras` in `content/eras.ts`, in release order (the rail and the
previous/next links follow that order). Its page, sitemap entry and share image are generated
from it. Colours must keep every text pair at WCAG AA (4.5:1); the comments in `eras.ts` explain
how the existing ones were sampled. Fonts are picked by key from `lib/fonts.ts`; to add a new
one, load it there and add its key to `FontKey` and `lib/font-family.ts`.

**Swapping a photo.** Use a freely licensed image (Wikimedia Commons is a good source), fill in
its `credit`, and update [IMAGE_CREDITS.md](IMAGE_CREDITS.md). If it comes from a new host, add the
host to `images.remotePatterns` in `next.config.ts`.

## Motion

GSAP drives the animation; a few shared pieces do most of the work:

- **`components/chrome/Choreo.tsx`**, on every page, reads data attributes so server components
  can opt in without becoming client components: `data-depth` (scroll parallax),
  `data-img-reveal` (photos wipe into view), `data-drop-group` / `data-drop` / `data-tape`
  (things dropped onto the page, then taped down) and `data-draw` (rules that draw themselves).
  It also makes the marquees react to scrolling: faster, backwards when you scroll up, leaning
  into the motion.
- **`components/ui/Reveal.tsx`** brings a block's children in on scroll, with variants:
  `rise` (default), `pop`, `flip` and `curtain`.
- **`components/ui/SplitReveal.tsx`** raises big headings line by line or letter by letter.
- Set pieces live with their sections: the preloader (CSS), the hero entrance and mouse
  parallax, the album rail, the TV static in the career timeline, and the stage spotlight in
  the awards (`components/ui/Spotlight.tsx`).

Everything is built lazily (as it's about to enter the screen, or once the page is idle) and
only when motion is allowed. Hidden starting states are set in CSS so nothing flashes, with a
5-second failsafe that shows content if the scripts are very slow.

## Accessibility

- All colour pairs, including every era theme, meet WCAG AA contrast
- Fully keyboard operable, with a skip link, visible focus styles and an accessible tab list for
  the career timeline
- `prefers-reduced-motion` turns off the preloader, reveals, the pinned rail, parallax and the
  custom cursor, and gives a plain vertical layout
- A "Pause animations" button in the footer stops the looping decoration (marquees, grain,
  floating stickers, spinning records); the choice is remembered
- Without JavaScript, all content is visible and the preloader never shows
- Spotify and YouTube players only load when you press play; YouTube uses the privacy-enhanced
  `youtube-nocookie.com` domain

## Performance

Lighthouse 12, run locally against the production build (median of 2 or 3 runs, default
throttling: "mobile" simulates a mid-range phone on slow 4G):

| Page | Mobile | Desktop | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | 73–77 | 99 | 100 | 100 | 100 |
| `/eras/short-n-sweet` | 74–78 | 96 | 100 | 100 | 100 |
| `/eras` | 80 | 95 | 100 | 100 | 100 |

Scores on this machine move by several points between runs (Lighthouse reports a CPU benchmark
anywhere from 600 to 2,900 here), so measure a few times. To measure:

```bash
npm run build
npm run start -- -p 3005
npx lighthouse@12 http://localhost:3005/ --chrome-flags="--headless=new"
npx lighthouse@12 http://localhost:3005/ --preset=desktop --chrome-flags="--headless=new"
```

What made the difference, and why (each was measured before it went in):

- **No metric-adjusted fallback fonts.** `next/font` adds an `"X Fallback"` face using
  `src: local(...)` to each font. Resolving those roughly doubled the first layout. The CSS
  variables are set inline on `<html>` without them (`lib/fonts.ts`); layout shift stays near 0.
- **Font gates** (`components/ui/FontGate.tsx`). Far-off text in an era's font borrows the
  surrounding font until it's about a screen away, so the home page doesn't download nine era fonts
  (about 275 KB) before anything appears.
- **Icons instead of symbol characters.** Arrows, the LIVE dot and the marquee sparkle are inline
  SVGs (`components/ui/Glyph.tsx`). As text, none of them are in the fonts' Latin subsets, and
  looking up a system fallback font for each one stalled the first layout.
- **Lazy reveals.** Scroll reveals build their GSAP tweens when they're about to enter the
  viewport, not at load, which avoids a burst of style recalculations at startup.
- **Cheaper hero effects.** The TV's scanlines and vignette are plain gradients; a blend mode and
  an 80px inset shadow over the hero photo slowed its first paint.
- **External stylesheet.** Inlining the CSS (`experimental.inlineCss`) put it in each page three
  times; a cached stylesheet halves the HTML.
- **Smaller downloads on phones.** Lenis only loads for mouse and trackpad users, the hero photo
  requests a closer-fitting size, the film grain doesn't animate on touch screens, and each page
  fetches only its main image (the hero photo, or the era's cover) eagerly.

Still on the table for mobile: Fraunces is the biggest download left (two variable files, about
265 KB, because of its SOFT and optical-size axes). Self-hosting it with those axes pinned to the
values the site uses would cut it to a fraction without changing how it looks.

## Credits

- Photos: freely licensed from Wikimedia Commons; every photographer and licence is listed in
  [IMAGE_CREDITS.md](IMAGE_CREDITS.md) and on `/credits`
- Album artwork: © the releasing labels, shown via Spotify's official image CDN
- Fonts: Fraunces, Instrument Sans, Courier Prime, Jost, Barlow, Amatic SC, Yesteryear, Pinyon
  Script and IM Fell English (SIL Open Font License), and Homemade Apple (Apache License 2.0),
  all from Google Fonts
- Stickers, icons, the favicon and the share images are original to this site

Facts were checked in October 2026. Main sources:

- [Billboard chart history](https://www.billboard.com/artist/sabrina-carpenter/)
- [Grammy.com](https://www.grammy.com/artists/sabrina-carpenter/)
- [Wikipedia: list of awards and nominations](https://en.wikipedia.org/wiki/List_of_awards_and_nominations_received_by_Sabrina_Carpenter)
- [Billboard: first Emmy](https://www.billboard.com/music/awards/sabrina-carpenter-first-primetime-emmy-the-muppet-show-1236335170/)
- [Rolling Stone: the Coachella promise](https://www.rollingstone.com/music/music-news/sabrina-carpenter-predicts-coachella-set-1235428667)
- [Wikipedia: Coachella 2026](https://en.wikipedia.org/wiki/Coachella_2026)
- [The Hollywood Reporter: Alice in Wonderland musical](https://www.hollywoodreporter.com/movies/movie-news/sabrina-carpenter-alice-in-wonderland-movie-musical-1236424035/)
- [Billboard: the Sabrina Carpenter Fund](https://www.billboard.com/music/music-news/sabrina-carpenter-raises-one-million-charity-1236011015)
