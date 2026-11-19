import type { Metadata } from "next";
import Link from "next/link";
import { articles, getArticle } from "../../articles";
import { notFound } from "next/navigation";

const baseUrl = "https://israel-today-darvesh-projects.vercel.app";

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
    author: { "@type": "Organization", name: "מערכת Israel Today" },
    publisher: { "@type": "Organization", name: "Israel Today", url: baseUrl },
    mainEntityOfPage: `${baseUrl}/articles/${article.slug}`
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
          <div className="breadcrumbs"><Link href="/">ראשי</Link>　/　{article.category}</div>
          <div className="article-category">{article.category}</div>
          <h1 itemProp="headline">{article.title}</h1>
          <p className="article-lead" itemProp="description">{article.intro}</p>
          <div className="article-meta">פורסם: {article.displayDate}　•　{article.readTime}　•　מערכת Israel Today</div>
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
          <div className="more-link"><Link href="/">← חזרה לעמוד הראשי ולכתבות נוספות</Link></div>
        </article>
      </main>
      <footer className="footer"><div className="container"><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p><small>© 2026 Israel Today</small></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
