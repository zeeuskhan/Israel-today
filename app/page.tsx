import Link from "next/link";
import { articles } from "./articles";

const sections = ["ראשי","חדשות","פוליטיקה","ביטחון","כלכלה","טכנולוגיה","חברה","ירושלים","תל אביב","צפון","דרום"];
const lead = articles[0];

export default function Home() {
  const categories = [...new Set(articles.map((article) => article.category))];
  return (
    <>
      <div className="topline"><div className="container"><span>יום חמישי, 20 בנובמבר 2026</span><span>חדשות ישראל • עברית</span></div></div>
      <header className="masthead"><div className="container">
        <div className="brandrow"><div><Link href="/" className="brand">Israel <span>Today</span></Link><div className="tagline">חדשות ישראל — דיווחים, הקשר ומקורות</div></div><div className="search">חדשות מישראל, כל היום</div></div>
        <nav className="nav" aria-label="ניווט ראשי">{sections.map(s=><a href={s==="ראשי"?"#top":`#category-${s}`} key={s}>{s}</a>)}</nav>
      </div></header>
      <div className="breaking"><div className="container"><strong>מבזקי היום</strong><span>עדכונים שוטפים מישראל — כל ידיעה כוללת ייחוס למקורות וקישור להמשך קריאה.</span></div></div>
      <main className="container" id="top">
        <section className="news-mast">
          <div className="lead-story">
            <span className="category">{lead.category} • כתבה מרכזית</span>
            <h1><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h1>
            <p>{lead.description}</p>
            <div className="meta">עודכן: {lead.displayDate} • {lead.readTime} • מערכת Israel Today</div>
            <Link className="read-more" href={`/articles/${lead.slug}`}>לכתבה המלאה ←</Link>
          </div>
          <aside className="latest-panel">
            <h2>הכתבות האחרונות</h2>
            {articles.slice(1,5).map((article)=><div className="latest-item" key={article.slug}><span className="category">{article.category}</span><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><span className="meta">{article.displayDate}</span></div>)}
          </aside>
        </section>
        <div className="section-head" id="latest"><h2>כל החדשות מישראל</h2><span className="meta">{articles.length} כתבות • עדכון 20.11.2026</span></div>
        <section className="news-grid">{articles.map((article)=><article className="news-card" key={article.slug}><div className="thumb"><span>{article.category}</span></div><div className="news-card-body"><span className="category">{article.category}</span><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><div className="meta">{article.displayDate}　•　{article.readTime}</div><Link className="read-more" href={`/articles/${article.slug}`}>לקריאת הכתבה ←</Link></div></article>)}</section>
        {categories.map((category)=><section className="category-section" id={`category-${category}`} key={category}><div className="section-head"><h2>{category}</h2></div><div className="category-links">{articles.filter(a=>a.category===category || (category==="ביטחון" && a.category==="ביטחון ודיפלומטיה")).map(article=><Link href={`/articles/${article.slug}`} key={article.slug}>{article.title} <span>←</span></Link>)}</div></section>)}
        <div className="notice"><strong>שקיפות מערכתית:</strong> הכתבות מבוססות על המקורות המקושרים בכל עמוד. דיווחים מיוחסים לכלי התקשורת או לרשויות שמסרו אותם; טענות שטרם אומתו מוצגות כטענות. אין מדובר בעדכון חי אוטומטי.</div>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל — דיוק, שקיפות וקישורים למקורות.</p></div><div><strong>מידע</strong><nav className="footer-links" aria-label="קישורי מידע"><Link href="/about">אודות</Link>　<Link href="/editorial-policy">מדיניות מערכת ותיקונים</Link>　<Link href="/privacy">מדיניות פרטיות</Link></nav><small>© 2026 Israel Today</small></div></div></footer>
    </>
  );
}
