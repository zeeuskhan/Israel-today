import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "./articles";
import { categoryPath } from "./category-utils";
import Pagination from "./components/pagination";

export const metadata: Metadata = {
  title: "חדשות ישראל היום: פוליטיקה, ביטחון, כלכלה וחברה",
  description: "חדשות ישראל בעברית: כתבות ועדכונים על פוליטיקה, ביטחון, כלכלה, חברה ויחסי חוץ, עם קישורים למקורות.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Israel Today",
    title: "חדשות ישראל היום | Israel Today",
    description: "חדשות ועדכונים מישראל בעברית — פוליטיקה, ביטחון, כלכלה וחברה."
  }
};

const sortedArticles = [...articles].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
const lead = sortedArticles[0];
const PAGE_SIZE = 12;

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageArticles = sortedArticles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const categories = [...new Set(sortedArticles.map((article) => article.category))];
  const categoryCounts = categories.map((category) => ({
    category,
    count: sortedArticles.filter((article) => article.category === category).length
  }));
  const today = new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "full" }).format(new Date());
  const formatDate = (value: string) => new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "long" }).format(new Date(value));

  return (
    <>
      <div className="topline"><div className="container"><span>{today}</span><span>חדשות ישראל • עברית</span></div></div>
      <header className="masthead"><div className="container">
        <div className="brandrow">
          <div><Link href="/" className="brand">Israel <span>Today</span></Link><div className="tagline">חדשות ישראל — דיווחים, הקשר ומקורות</div></div>
          <form action="/search" method="get" className="search-form">
            <label className="sr-only" htmlFor="home-search">חיפוש כתבות</label>
            <input id="home-search" name="q" type="search" placeholder="חיפוש חדשות וכתבות..." maxLength={100}/>
            <button type="submit">חיפוש</button>
          </form>
        </div>
        <nav className="nav" aria-label="ניווט ראשי"><Link href="/">ראשי</Link><Link href="/#latest">כל החדשות</Link><Link href="/search">חיפוש</Link>{categories.map(category=><Link href={categoryPath(category)} key={category}>{category}</Link>)}</nav>
      </div></header>
      <div className="breaking"><div className="container"><strong>העדכונים האחרונים</strong><span>הכתבות האחרונות מישראל — עם ייחוס למקורות וקישור לפרסום המקורי.</span></div></div>
      <main className="container" id="top">
        <section className="news-mast">
          <div className="lead-story">
            <span className="category">{lead.category} • כתבה מרכזית</span>
            <h1><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h1>
            <p>{lead.description}</p>
            <div className="meta">פורסם: {formatDate(lead.publishedAt)} • {lead.readTime} • <Link href="/authors/editorial-team">מערכת Israel Today</Link></div>
            <Link className="read-more" href={`/articles/${lead.slug}`}>לכתבה המלאה ←</Link>
          </div>
          <aside className="latest-panel" aria-labelledby="latest-headline">
            <h2 id="latest-headline">הכתבות האחרונות</h2>
            {sortedArticles.slice(1, 5).map((article)=><div className="latest-item" key={article.slug}>
              <span className="category">{article.category}</span>
              <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
              <span className="meta">{formatDate(article.publishedAt)}</span>
            </div>)}
          </aside>
        </section>

        <section className="category-directory" aria-labelledby="category-title">
          <div className="section-head"><h2 id="category-title">קטגוריות חדשות</h2></div>
          <div className="category-pills">{categoryCounts.map(({category,count})=><Link href={categoryPath(category)} key={category}>{category}<span>{count}</span></Link>)}</div>
        </section>

        <div className="section-head" id="latest"><h2>כל החדשות מישראל</h2><span className="meta">{sortedArticles.length} כתבות</span></div>
        <section className="news-grid" aria-label="רשימת כתבות">
          {pageArticles.map((article)=><article className="news-card" key={article.slug}>
            <div className="thumb" aria-hidden="true"><span>{article.category}</span></div>
            <div className="news-card-body">
              <span className="category"><Link href={categoryPath(article.category)}>{article.category}</Link></span>
              <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.description}</p>
              <div className="meta">{formatDate(article.publishedAt)}　•　{article.readTime}</div>
              <Link className="read-more" href={`/articles/${article.slug}`}>לקריאת הכתבה ←</Link>
            </div>
          </article>)}
        </section>
        <Pagination currentPage={currentPage} totalPages={totalPages} hrefForPage={(page) => `/?page=${page}#latest`}/>
        <div className="notice"><strong>שקיפות מערכתית:</strong> הכתבות מבוססות על המקורות המקושרים בכל עמוד. דיווחים מיוחסים לכלי התקשורת או לרשויות שמסרו אותם; טענות שטרם אומתו מוצגות כטענות. אין מדובר בעדכון חי אוטומטי.</div>
      </main>
      <footer className="footer"><div className="container footer-inner">
        <div><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p></div>
        <div><strong>מידע</strong><nav className="footer-links" aria-label="קישורי מידע"><Link href="/about">אודות</Link>　<Link href="/authors/editorial-team">המערכת</Link>　<Link href="/editorial-policy">מדיניות מערכת ותיקונים</Link>　<Link href="/privacy">מדיניות פרטיות</Link></nav><small>© 2026 Israel Today</small></div>
      </div></footer>
    </>
  );
}
