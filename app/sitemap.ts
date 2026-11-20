import type { MetadataRoute } from "next";
import { articles } from "./articles";

const baseUrl = "https://todayisrael.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    ...["about", "editorial-policy", "privacy"].map((path) => ({ url: `${baseUrl}/${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 })),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.9
    }))
  ];
}
