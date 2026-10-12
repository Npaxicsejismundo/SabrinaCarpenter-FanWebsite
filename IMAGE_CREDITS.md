# Image credits

Every image on The Sabrina Show, where it comes from and the terms it's used under. The same
information is shown on the site at `/credits`, and each photo also carries a credit line where it
appears.

The data lives in `content/photos.ts` (photos) and `content/eras.ts` (album artwork). If you swap
an image there, update this file too.

Only the hosts below are allowed through the Next.js image optimiser (`images.remotePatterns` in
`next.config.ts`).

## Photos (Wikimedia Commons)

All freely licensed. Thank you to every photographer.

| Key in `content/photos.ts` | Photo | Photographer | Licence | Source |
| --- | --- | --- | --- | --- |
| `hydePark2025` | Headlining BST Hyde Park, London (2025) | Raph_PH | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_at_BST_Hyde_Park_-_20250706_-_020_(cropped).jpg) |
| `o2Portrait2025` | Short n' Sweet Tour, O2 Arena, London (2025) | Raph_PH | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_-_O2_Arena_2025_-_086_(cropped_2).jpg) |
| `o2Wide2025` | Short n' Sweet Tour, O2 Arena, London (2025) | Raph_PH | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_-_O2_Arena_2025_-_015.jpg) |
| `primavera2025` | Headlining Primavera Sound, Barcelona (2025) | Raph_PH | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Primavera2025_(139_of_182)_(54574520207)_(cropped).jpg) |
| `disney2014` | Performing at a Disney event, Anaheim (2014) | Sam Howzit | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter.jpg) |
| `redCarpet2015` | At a Disney Channel premiere (2015) | Red Carpet Report | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_Feb_10_2015.jpg) |
| `jingleBall2016` | Jingle Ball, Los Angeles (2016) | Justin Higuchi | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_@_Staples_Center_12_02_2016_(54996914934).jpg) |
| `wiltern2022` | Emails I Can't Send Tour, the Wiltern, Los Angeles (2022) | Justin Higuchi | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_@_Wiltern_10_15_2022_(52526443913).jpg) |
| `erasTour2024` | Opening for The Eras Tour, Singapore (2024) | TenthAvenueFreezeOut | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter,_The_Eras_Tour,_Singapore_National_Stadium,_9_March_2024.jpeg) |
| `coachella2024` | Coachella Stage, 2024 (fan video still) | ANITA CON SWING | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_en_Coachella_01.jpg) |
| `coachella2026` | Headlining Coachella, 2026 (fan video still) | Danielle Marie Carolan | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Sabrina_Carpenter_at_Coachella_2026.png) |

Photos are loaded from `upload.wikimedia.org` (or Commons' standard 1920px thumbnails on
`thumb.wikimedia.org` for very large originals), then resized and re-encoded by Next.js. Some are
cropped to fit their frames; none are otherwise edited. Effects such as the TV scanlines in the
hero are separate layers drawn on top.

## Album artwork

Cover art belongs to the releasing labels. It's shown for identification and commentary on an
unofficial, non-commercial fan site, loaded from Spotify's official image CDN (`i.scdn.co`), the
same 640×640 images the Spotify players display, except for the one release that isn't on
Spotify (below). The track list artwork uses the same covers.

| Release | Year | Label | Artwork |
| --- | --- | --- | --- |
| Can't Blame a Girl for Trying (EP) | 2014 | Hollywood Records | Copy in `public/covers` (not on Spotify) |
| Eyes Wide Open | 2015 | Hollywood Records | Spotify CDN |
| EVOLution | 2016 | Hollywood Records | Spotify CDN |
| Singular: Act I | 2018 | Hollywood Records | Spotify CDN |
| Singular: Act II | 2019 | Hollywood Records | Spotify CDN |
| emails i can't send | 2022 | Island Records | Spotify CDN |
| fruitcake (EP) | 2023 | Island Records | Spotify CDN |
| Short n' Sweet | 2024 | Island Records | Spotify CDN |
| Man's Best Friend | 2025 | Island Records | Spotify CDN |

Can't Blame a Girl for Trying isn't on Spotify, so a copy of its official cover is stored in the
project (`public/covers/cant-blame-a-girl-for-trying.jpg`, 491×491) and served from the site
itself. The same rules apply: © Hollywood Records, shown for identification on a non-commercial fan
site.

## Video thumbnails

The YouTube players show the video's official thumbnail from `i.ytimg.com` until you press play.
The player itself only loads then, from the privacy-enhanced `youtube-nocookie.com` domain.

The first channel of the career timeline ("Covers on YouTube") shows the thumbnail of her first
upload, a 2009 cover of Taylor Swift's "Picture to Burn", which is still on her official channel
([video](https://www.youtube.com/watch?v=bWYXB0MGRNo)). No freely licensed photo of her from before
2014 exists on Wikimedia Commons.

## Original artwork

Everything else is original to this site and can be reused freely:

- The sticker set (bows, kisses, hearts, sparkles, tickets, starbursts and the rest) in
  `components/ui/Stickers.tsx`
- The arrow and ornament icons in `components/ui/Glyph.tsx`
- The favicon (`app/icon.svg`), the film grain, the vinyl records and the TV set, all drawn in
  SVG or CSS
- The share images, generated at build time (`app/opengraph-image.tsx` and
  `app/eras/[slug]/opengraph-image.tsx`)

## Not affiliated

This is an unofficial fan site. It isn't affiliated with or endorsed by Sabrina Carpenter, her
management, Island Records, Hollywood Records or any of the photographers above. If you're a
rights holder and want an image removed, contact the site owner and it will be taken down.
