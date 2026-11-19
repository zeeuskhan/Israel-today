import type { MetadataRoute } from "next";
import { articles } from "./articles";

const baseUrl = "https://israel-today-darvesh-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date("2026-11-19T16:00:00+02:00"), changeFrequency: "hourly", priority: 1 },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.9
    }))
  ];
}
