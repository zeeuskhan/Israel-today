import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "./articles";
import { categoryPath } from "./category-utils";

export const metadata: Metadata = {
  title: "חדשות ישראל היום: פוליטיקה, ביטחון, כלכלה וטכנולוגיה",
  description: "חדשות ישראל בעברית: דיווחים ועדכונים על פוליטיקה, ביטחון, כלכלה, טכנולוגיה וחברה. כתבות עם הקשר, שקיפות וקישורים למקורות.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Israel Today",
    title: "חדשות ישראל היום | Israel Today",
    description: "חדשות ועדכונים מישראל בעברית — פוליטיקה, ביטחון, כלכלה, טכנולוגיה וחברה."
  }
};

const sortedArticles = [...articles].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
const lead = sortedArticles[0];

export default function Home() {
  const categories = [...new Set(sortedArticles.map((article) => article.category))];
  const today = new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "full" }).format(new Date());
  return (
    <>
      <div className="topline"><div className="container"><span>{today}</span><span>חדשות ישראל • עברית</span></div></div>
      <header className="masthead"><div className="container">
        <div className="brandrow"><div><Link href="/" className="brand">Israel <span>Today</span></Link><div className="tagline">חדשות ישראל — דיווחים, הקשר ומקורות</div></div><div className="search">חדשות מישראל, כל היום</div></div>
        <nav className="nav" aria-label="ניווט ראשי"><a href="#top">ראשי</a><a href="#latest">כל החדשות</a>{categories.map(category=><Link href={categoryPath(category)} key={category}>{category}</Link>)}</nav>
      </div></header>
      <div className="breaking"><div className="container"><strong>מבזקי היום</strong><span>עדכונים שוטפים מישראל — כל ידיעה כוללת ייחוס למקורות וקישור להמשך קריאה.</span></div></div>
      <main className="container" id="top">
        <section className="news-mast">
          <div className="lead-story">
            <span className="category">{lead.category} • כתבה מרכזית</span>
            <h1><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h1>
            <p>{lead.description}</p>
            <div className="meta">עודכן: {new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "long" }).format(new Date(lead.publishedAt))} • {lead.readTime} • מערכת Israel Today</div>
            <Link className="read-more" href={`/articles/${lead.slug}`}>לכתבה המלאה ←</Link>
          </div>
          <aside className="latest-panel">
            <h2>הכתבות האחרונות</h2>
            {sortedArticles.slice(1,5).map((article)=><div className="latest-item" key={article.slug}><span className="category">{article.category}</span><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><span className="meta">{new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "long" }).format(new Date(article.publishedAt))}</span></div>)}
          </aside>
        </section>
        <div className="section-head" id="latest"><h2>חדשות ישראל היום</h2><span className="meta">{sortedArticles.length} כתבות • עדכון שוטף</span></div>
        <section className="news-grid">{sortedArticles.map((article)=><article className="news-card" key={article.slug}><div className="thumb"><span>{article.category}</span></div><div className="news-card-body"><span className="category">{article.category}</span><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><div className="meta">{article.displayDate}　•　{article.readTime}</div><Link className="read-more" href={`/articles/${article.slug}`}>לקריאת הכתבה ←</Link></div></article>)}</section>
        {categories.map((category)=><section className="category-section" id={`category-${category}`} key={category}><div className="section-head"><h2><Link href={categoryPath(category)}>{category}</Link></h2><Link className="read-more" href={categoryPath(category)}>לכל הכתבות ←</Link></div><div className="category-links">{sortedArticles.filter(a=>a.category===category || (category==="ביטחון" && a.category==="ביטחון ודיפלומטיה")).map(article=><Link href={`/articles/${article.slug}`} key={article.slug}>{article.title} <span>←</span></Link>)}</div></section>)}
        <div className="notice"><strong>שקיפות מערכתית:</strong> הכתבות מבוססות על המקורות המקושרים בכל עמוד. דיווחים מיוחסים לכלי התקשורת או לרשויות שמסרו אותם; טענות שטרם אומתו מוצגות כטענות. אין מדובר בעדכון חי אוטומטי.</div>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p></div><div><strong>מידע</strong><nav className="footer-links" aria-label="קישורי מידע"><Link href="/about">אודות</Link>　<Link href="/authors/editorial-team">המערכת</Link>　<Link href="/editorial-policy">מדיניות מערכת ותיקונים</Link>　<Link href="/privacy">מדיניות פרטיות</Link></nav><small>© 2026 Israel Today</small></div></div></footer>
    </>
  );
}
