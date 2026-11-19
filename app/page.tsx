import Link from "next/link";
import { articles } from "./articles";

const sections = ["ראשי","מבזקים","פוליטיקה","ביטחון","כלכלה","טכנולוגיה","חברה","ירושלים","תל אביב","צפון","דרום"];

export default function Home() {
  return (
    <>
      <div className="topline"><div className="container"><span>יום חמישי, 19 בנובמבר 2026</span><span>חדשות ישראל • עברית</span></div></div>
      <header className="masthead"><div className="container">
        <div className="brandrow"><div><Link href="/" className="brand">Israel <span>Today</span></Link><div className="tagline">חדשות ישראל — תמונה ברורה, מידע מאומת</div></div><div className="search">חיפוש באתר　⌕</div></div>
        <nav className="nav" aria-label="ניווט ראשי">{sections.map(s=><a href="#latest" key={s}>{s}</a>)}</nav>
      </div></header>
      <div className="breaking"><div className="container"><strong>הבהרה</strong><span>מדריכי הסבר ותוכן רקע. דיווחים חדשותיים חיים יפורסמו רק לאחר אימות מול מקורות.</span></div></div>
      <main className="container">
        <section className="hero-grid">
          <article className="hero"><div className="hero-content"><span className="kicker">ישראל • מדריכי חדשות והסבר</span><h1>החדשות מישראל, בעברית ברורה ומדויקת</h1><p>כלכלה, פוליטיקה, תחבורה וטכנולוגיה — עם הקשר, הסברים וקישורים למקורות רשמיים.</p></div></article>
          <div className="side-stack">
            <article className="side-story"><span className="category">עקרונות המערכת</span><h2>קודם בודקים. אחר כך מפרסמים.</h2><span className="meta">הפרדה בין עובדות, פרשנות ומידע שטרם אומת</span></article>
            <article className="side-story"><span className="category">ישראל בלבד</span><h2>מדריכים בנושאים שמשפיעים על החיים בישראל</h2><span className="meta">כלכלה • חברה • ממשל • טכנולוגיה</span></article>
            <article className="side-story"><span className="category">תוכן חדש</span><h2>5 כתבות ומדריכים לקריאה</h2><span className="meta">כל כותרת מובילה לעמוד כתבה מלא</span></article>
          </div>
        </section>
        <div className="section-head" id="latest"><h2>כתבות ומדריכים בישראל</h2><span className="meta">תוכן הסבר עם קישורים למקורות רשמיים</span></div>
        <section className="news-grid">{articles.map((article)=><article className="news-card" key={article.slug}><div className="thumb" aria-hidden="true">{article.category}</div><div className="news-card-body"><span className="category">{article.category}</span><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><div className="meta">{article.date}　•　{article.readTime}</div><Link className="read-more" href={`/articles/${article.slug}`}>לקריאת הכתבה ←</Link></div></article>)}</section>
        <div className="notice">הערת מערכת: אלה מדריכי הסבר כלליים ולא עדכוני חדשות בזמן אמת. מידע משתנה יש לאמת מול המקורות הרשמיים המקושרים בכל כתבה.</div>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל. דיוק, שקיפות והפרדה בין עובדות, פרשנות ודיווחים ראשוניים.</p></div><div><strong>מידע</strong><p>אודות • צור קשר • מדיניות פרטיות • מדיניות תיקונים</p><small>© 2026 Israel Today</small></div></div></footer>
    </>
  );
}
