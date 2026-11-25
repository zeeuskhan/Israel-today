import type { MetadataRoute } from "next";

const sitemap = "https://todayisrael.vercel.app/sitemap.xml";
const newsSitemap = "https://todayisrael.vercel.app/news-sitemap.xml";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" }
    ],
    sitemap: [sitemap, newsSitemap],
    host: "https://todayisrael.vercel.app"
  };
}
