import { articles } from "../articles";

const baseUrl = "https://todayisrael.vercel.app";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"","&quot;").replaceAll("'","&apos;");
}

export async function GET() {
  const items = articles.map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid>${baseUrl}/articles/${article.slug}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>Israel Today — חדשות ישראל</title>
    <link>${baseUrl}</link>
    <description>חדשות ועדכונים מישראל בעברית</description>
    <language>he</language>
    ${items}
  </channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
