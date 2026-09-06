import { MetadataRoute } from "next";
import { experiments } from "@/data/experiments";

export const dynamic = "force-static";

const SITE_URL = "https://easi.pivotventures.tech/museum/physics";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL + "/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
  const experimentRoutes: MetadataRoute.Sitemap = experiments
    .filter((exp) => exp.category === "physics")
    .flatMap((exp) => [
      {
        url: `${SITE_URL}/experiments/${exp.id}/`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/experiments/${exp.id}/details/`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ]);
  return [...staticRoutes, ...experimentRoutes];
}
