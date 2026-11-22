import type { MetadataRoute } from "next";
import { articles } from "./articles";
import { categoryPath } from "./category-utils";

const baseUrl = "https://todayisrael.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticleDate = articles.reduce(
    (latest, article) => Math.max(latest, new Date(article.publishedAt).getTime()),
    0
  );

  return [
    {
      url: baseUrl,
      lastModified: latestArticleDate ? new Date(latestArticleDate) : undefined,
      changeFrequency: "hourly",
      priority: 1
    },
    ...["about", "editorial-policy", "privacy"].map((path) => ({
      url: `${baseUrl}/${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.3
    })),
    ...Array.from(new Set(articles.map((article) => article.category))).map((category) => ({
      url: `${baseUrl}${categoryPath(category)}`,
      changeFrequency: "daily" as const,
      priority: 0.7
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.8
    }))
  ];
}
