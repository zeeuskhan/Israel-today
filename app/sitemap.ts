import type { MetadataRoute } from "next";
import { articles } from "./articles";

const baseUrl = "https://israel-today-darvesh-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date("2026-11-19T08:00:00+02:00"),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
