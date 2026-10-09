import type { MetadataRoute } from "next";
import { eras } from "@/content/eras";
import { site } from "@/content/site";

/** Bump when content changes. Fixed date keeps the build deterministic. */
const LAST_UPDATED = "2026-10-08";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: LAST_UPDATED, priority: 1 },
    { url: `${site.url}/eras`, lastModified: LAST_UPDATED, priority: 0.8 },
    ...eras.map((e) => ({
      url: `${site.url}/eras/${e.slug}`,
      lastModified: LAST_UPDATED,
      priority: 0.7,
    })),
    { url: `${site.url}/credits`, lastModified: LAST_UPDATED, priority: 0.3 },
  ];
}
