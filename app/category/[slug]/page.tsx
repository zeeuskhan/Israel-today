import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../../articles";
import { categoryFromSlug, categoryPath, categorySlugs } from "../../category-utils";
import Pagination from "../../components/pagination";

const baseUrl = "https://todayisrael.vercel.app";

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "long" }).format(new Date(value));
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(categorySlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return {};
  const articleCount = articles.filter((article) => article.category === category || (category === "ביטחון" && article.category === "ביטחון ודיפלומטיה")).length;
  return {
    robots: articleCount < 2 ? { index: false, follow: true } : { index: true, follow: true },
    title: `חדשות ${category} בישראל — עדכונים וכתבות`,
    description: `כל הכתבות והעדכונים בנושא ${category} בישראל. דיווחים בעברית, הקשר וקישורים למקורות.`,
    alternates: { canonical: categoryPath(category) },
    openGraph: {
      type: "website",
      locale: "he_IL",
      siteName: "Israel Today",
      title: `חדשות ${category} בישראל | Israel Today`,
      description: `כתבות ועדכונים בנושא ${category} בישראל.`
    }
  };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> }) {
  const { slug } = await params;
  const query = await searchParams;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const items = articles
    .filter((article) => article.category === category || (category === "ביטחון" && article.category === "ביטחון ודיפלומטיה"))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  const pageSize = 10;
  const requestedPage = Math.max(1, Number.parseInt(query.page || "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const visibleItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const collectionData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `חדשות ${category} בישראל`,
    description: `כתבות ועדכונים בנושא ${category} בישראל.`,
    inLanguage: "he-IL",
    url: baseUrl + categoryPath(category),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/articles/${article.slug}`,
        name: article.title
      }))
    }
  };

  return (
    <>
      <div className="topline"><div className="container"><span>חדשות ישראל • עברית</span><span>Israel Today</span></div></div>
      <header className="masthead"><div className="container">
        <Link href="/" className="brand">Israel <span>Today</span></Link>
        <div className="tagline">חדשות ישראל — דיווחים, הקשר ומקורות</div>
        <nav className="nav" aria-label="ניווט ראשי"><Link href="/">ראשי</Link><Link href="/#latest">כל הכתבות</Link><Link href="/search">חיפוש</Link></nav>
      </div></header>
      <main className="container">
        <nav className="breadcrumbs" aria-label="פירורי לחם"><Link href="/">ראשי</Link>　/　<span>{category}</span></nav>
        <section className="category-section">
          <div className="section-head"><h1>{category} בישראל</h1><span className="meta">{items.length} כתבות</span></div>
          <p className="article-lead">כל העדכונים והכתבות בנושא {category}. המידע מוצג עם ייחוס למקורות וקישורים לדיווחים המקוריים.</p>
          {items.length > 0 ? (
            <div className="category-links">
              {visibleItems.map((article) => (
                <article className="category-entry" key={article.slug}>
                  <span className="meta">{formatPublishedDate(article.publishedAt)}　•　{article.readTime}</span>
                  <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
                  <p>{article.description}</p>
                </article>
              ))}
            </div>
          ) : <p>טרם פורסמו כתבות בנושא זה.</p>}
          <Pagination currentPage={currentPage} totalPages={totalPages} hrefForPage={(page) => `${categoryPath(category)}?page=${page}`}/>
        </section>
        <p className="more-link"><Link href="/">← חזרה לכל חדשות ישראל</Link></p>
      </main>
      <footer className="footer"><div className="container"><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p><small>© 2026 Israel Today</small></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }} />
    </>
  );
}
