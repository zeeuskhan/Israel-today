import type { Metadata } from "next";
import Link from "next/link";
import { articles, getArticle } from "../../articles";
import { notFound } from "next/navigation";

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
      publishedTime: "2026-11-19T08:00:00+02:00"
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: "2026-11-19T08:00:00+02:00",
    dateModified: "2026-11-19T08:00:00+02:00",
    inLanguage: "he",
    author: { "@type": "Organization", name: "Israel Today" },
    publisher: { "@type": "Organization", name: "Israel Today" },
    mainEntityOfPage: `https://israel-today-darvesh-projects.vercel.app/articles/${article.slug}`
  };

  return (
    <>
      <div className="topline"><div className="container"><span>יום חמישי, 19 בנובמבר 2026</span><span>חדשות ישראל • עברית</span></div></div>
      <header className="masthead"><div className="container">
        <Link href="/" className="brand">Israel <span>Today</span></Link>
        <div className="tagline">חדשות ישראל — תמונה ברורה, מידע מאומת</div>
        <nav className="nav" aria-label="ניווט ראשי"><Link href="/">ראשי</Link><a href="/#latest">כתבות נוספות</a></nav>
      </div></header>
      <main className="container">
        <article className="article" itemScope itemType="https://schema.org/Article">
          <div className="breadcrumbs"><Link href="/">ראשי</Link>　/　{article.category}</div>
          <div className="article-category">{article.category}</div>
          <h1 itemProp="headline">{article.title}</h1>
          <p className="article-lead" itemProp="description">{article.intro}</p>
          <div className="article-meta">עודכן: {article.date}　•　{article.readTime}　•　Israel Today</div>
          <div className="article-body">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </section>
            ))}
          </div>
          <aside className="sources">
            <h2>מקורות רשמיים להעמקה</h2>
            <ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul>
          </aside>
          <p className="editorial-note">הכתבה היא מדריך הסבר כללי ואינה דיווח חדשותי בזמן אמת. נתונים, תעריפים והחלטות עשויים להשתנות; יש לבדוק את הפרסומים הרשמיים העדכניים.</p>
          <div className="more-link"><Link href="/">← חזרה לעמוד הראשי ולכתבות נוספות</Link></div>
        </article>
      </main>
      <footer className="footer"><div className="container"><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל. דיוק, שקיפות והפרדה בין עובדות, פרשנות ודיווחים ראשוניים.</p><small>© 2026 Israel Today</small></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
