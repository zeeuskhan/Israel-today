import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "../articles";
import { categoryPath } from "../category-utils";
import Pagination from "../components/pagination";

export const metadata: Metadata = {
  title: "חיפוש חדשות וכתבות",
  description: "חיפוש כתבות ועדכונים באתר Israel Today.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" }
};

const PAGE_SIZE = 10;

function normalize(value: string) {
  return value.toLocaleLowerCase("he").trim();
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams;
  const query = (params.q || "").trim().slice(0, 100);
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const term = normalize(query);
  const results = term ? articles.filter((article) => {
    const haystack = normalize([
      article.title, article.description, article.intro, article.category,
      ...article.keywords, ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs])
    ].join(" "));
    return haystack.includes(term);
  }).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)) : [];
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <div className="topline"><div className="container"><span>חיפוש באתר</span><span>Israel Today</span></div></div>
      <header className="masthead"><div className="container">
        <Link href="/" className="brand">Israel <span>Today</span></Link>
        <form action="/search" method="get" className="search-form">
          <label className="sr-only" htmlFor="site-search">חיפוש כתבות</label>
          <input id="site-search" name="q" type="search" defaultValue={query} placeholder="חיפוש לפי נושא, כותרת או מילת מפתח" maxLength={100}/>
          <button type="submit">חיפוש</button>
        </form>
        <nav className="nav" aria-label="ניווט ראשי"><Link href="/">ראשי</Link><Link href="/#latest">כל החדשות</Link></nav>
      </div></header>
      <main className="container search-page">
        <nav className="breadcrumbs"><Link href="/">ראשי</Link>　/　חיפוש</nav>
        <h1>חיפוש חדשות וכתבות</h1>
        {query ? <p className="meta">נמצאו {results.length} תוצאות עבור ״{query}״</p> : <p>הקלידו מונח לחיפוש בכותרות, בתוכן, בקטגוריות ובמילות המפתח.</p>}
        {query && visible.length === 0 && <section className="empty-state"><h2>לא נמצאו כתבות</h2><p>נסו מילת חיפוש אחרת או עברו לעמוד הראשי.</p><Link className="read-more" href="/">לכל החדשות ←</Link></section>}
        <section className="search-results">
          {visible.map((article) => <article className="search-result" key={article.slug}>
            <div className="meta"><Link href={categoryPath(article.category)}>{article.category}</Link>　•　{new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "long" }).format(new Date(article.publishedAt))}</div>
            <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
            <p>{article.description}</p>
          </article>)}
        </section>
        <Pagination currentPage={currentPage} totalPages={totalPages} hrefForPage={(n) => `/search?q=${encodeURIComponent(query)}&page=${n}`}/>
      </main>
      <footer className="footer"><div className="container"><Link href="/" className="brand" style={{color:"white"}}>Israel <span>Today</span></Link><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p></div></footer>
    </>
  );
}
