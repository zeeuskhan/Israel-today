import type { Metadata } from "next";
import Link from "next/link";
import { articles, getArticle } from "../../articles";
import { categoryPath } from "../../category-utils";
import { notFound } from "next/navigation";

const baseUrl = "https://todayisrael.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      locale: "he_IL",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      siteName: "Israel Today"
    },
    twitter: { card: "summary", title: article.title, description: article.description }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "he-IL",
    articleSection: article.category,
    keywords: article.keywords.join(", "),
    author: { "@type": "Organization", name: "מערכת Israel Today", url: baseUrl + "/about" },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Israel Today",
      url: baseUrl,
      areaServed: { "@type": "Country", name: "Israel" },
      inLanguage: "he-IL"
    },
    articleBody: article.sections.map(section => section.paragraphs.join(" ")).join(" "),
    wordCount: article.sections.reduce((total, section) => total + section.paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length, 0),
    isAccessibleForFree: true,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/articles/${article.slug}` }
  };
  const relatedArticles = articles
    .filter((candidate) => candidate.slug !== article.slug && candidate.category === article.category)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 3);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: baseUrl },
      { "@type": "ListItem", position: 2, name: article.category, item: `${baseUrl}/#category-${article.category}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${baseUrl}/articles/${article.slug}` }
    ]
  };

  return (
    <>
      <div className="topline"><div className="container"><span>חדשות ישראל • עברית</span><span>Israel Today</span></div></div>
      <header className="masthead"><div className="container">
        <Link href="/" className="brand">Israel <span>Today</span></Link>
        <div className="tagline">חדשות ישראל — דיווחים, הקשר ומקורות</div>
        <nav className="nav" aria-label="ניווט ראשי"><Link href="/">ראשי</Link><Link href="/#latest">כל הכתבות</Link></nav>
      </div></header>
      <main className="container">
        <article className="article" itemScope itemType="https://schema.org/NewsArticle">
          <nav className="breadcrumbs" aria-label="פירורי לחם"><Link href="/">ראשי</Link>　/　<Link href={categoryPath(article.category)}>{article.category}</Link></nav>
          <div className="article-category">{article.category}</div>
          <h1 itemProp="headline">{article.title}</h1>
          <p className="article-lead" itemProp="description">{article.intro}</p>
          <div className="article-meta"><time dateTime={article.publishedAt} itemProp="datePublished">פורסם: {article.displayDate}</time>　•　{article.readTime}　•　מערכת Israel Today</div>
          <div className="article-body">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </section>
            ))}
          </div>
          <aside className="sources">
            <h2>מקורות וקישורים</h2>
            <p>הכתבה מבוססת על המקורות הבאים. מומלץ לעיין בדיווח המקורי לפרטים המלאים ולעדכונים:</p>
            <ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul>
          </aside>
          <p className="editorial-note">{article.sourceNote}</p>
          {relatedArticles.length > 0 && (
            <section className="sources" aria-labelledby="related-articles-title">
              <h2 id="related-articles-title">כתבות נוספות בנושא {article.category}</h2>
              <ul>{relatedArticles.map((related) => (
                <li key={related.slug}><Link href={`/articles/${related.slug}`}>{related.title}</Link></li>
              ))}</ul>
            </section>
          )}
          <div className="more-link"><Link href="/">← חזרה לעמוד הראשי ולכתבות נוספות</Link></div>
        </article>
      </main>
      <footer className="footer"><div className="container"><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p><small>© 2026 Israel Today</small></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}
