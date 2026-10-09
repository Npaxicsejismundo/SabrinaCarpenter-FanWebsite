import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Measured both ways: inlining put the stylesheet in the HTML three times
    // (a <style> tag plus two copies in the RSC payload), doubling the page to
    // 85 KB gzipped. A cached external stylesheet is lighter overall.
    inlineCss: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Only these hosts can be optimised by next/image. See IMAGE_CREDITS.md.
    remotePatterns: [
      // Official album artwork (Spotify's image CDN)
      new URL("https://i.scdn.co/image/**"),
      // Freely licensed photos (Wikimedia Commons)
      new URL("https://upload.wikimedia.org/wikipedia/commons/**"),
      new URL("https://thumb.wikimedia.org/wikipedia/commons/**"),
      // Official YouTube video thumbnails (shown before a video loads)
      new URL("https://i.ytimg.com/vi/**"),
    ],
    formats: ["image/avif", "image/webp"],
    // Default widths plus 540, a close fit for the hero photo on phones
    // (about 300 CSS px at 1.75x).
    deviceSizes: [540, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 60 is used where a photo sits under an overlay (the hero's scanlines).
    qualities: [60, 75],
  },
};

export default nextConfig;
