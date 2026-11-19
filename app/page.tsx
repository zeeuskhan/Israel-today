import Link from "next/link";

const sections = ["ראשי","מבזקים","פוליטיקה","ביטחון","כלכלה","טכנולוגיה","חברה","ירושלים","תל אביב","צפון","דרום"];
const stories = [
  {category:"כלכלה",title:"השווקים בישראל: מה חשוב לדעת על ההתפתחויות הכלכליות השבוע",time:"סקירת מערכת",desc:"ניתוח נתונים והודעות רשמיות — עם קישורים למקורות המקוריים."},
  {category:"ביטחון",title:"עדכוני ביטחון בישראל: מידע מאומת והודעות רשמיות",time:"עדכון מערכת",desc:"נפריד בין מידע שאושר לבין דיווחים שעדיין נבדקים."},
  {category:"טכנולוגיה",title:"חדשנות ישראלית: חברות, מחקר ופיתוח",time:"מגזין",desc:"חדשות הטכנולוגיה והחדשנות בישראל."},
  {category:"פוליטיקה",title:"הכנסת והממשלה: החלטות, דיונים ומה עומד על הפרק",time:"חדשות",desc:"סיקור ענייני של הפעילות הציבורית והפוליטית."},
  {category:"חברה",title:"חינוך, בריאות ותחבורה: מה משתנה בחיי היום־יום",time:"חדשות",desc:"עדכונים בנושאים שמשפיעים על תושבי ישראל."},
  {category:"ירושלים",title:"ירושלים: חדשות ועדכונים מהבירה",time:"מקומי",desc:"דיווחים מהעיר וממוסדות המדינה."}
];

export default function Home() {
  return (
    <>
      <div className="topline"><div className="container"><span>יום חמישי, 19 בנובמבר 2026</span><span>חדשות ישראל • עברית</span></div></div>
      <header className="masthead"><div className="container">
        <div className="brandrow"><div><Link href="/" className="brand">Israel <span>Today</span></Link><div className="tagline">חדשות ישראל — תמונה ברורה, מידע מאומת</div></div><div className="search">חיפוש באתר　⌕</div></div>
        <nav className="nav" aria-label="ניווט ראשי">{sections.map(s=><a href="#latest" key={s}>{s}</a>)}</nav>
      </div></header>
      <div className="breaking"><div className="container"><strong>מבזק</strong><span>כאן יופיעו עדכונים דחופים לאחר אימות מול מקורות אמינים.</span></div></div>
      <main className="container">
        <section className="hero-grid">
          <article className="hero"><div className="hero-content"><span className="kicker">ישראל • חדשות היום</span><h1>החדשות מישראל, בעברית ברורה ומדויקת</h1><p>סיקור ישראלי ממוקד: ביטחון, פוליטיקה, כלכלה, טכנולוגיה וחברה.</p></div></article>
          <div className="side-stack">
            <article className="side-story"><span className="category">עקרונות המערכת</span><h2>קודם בודקים. אחר כך מפרסמים.</h2><span className="meta">אימות מול הודעות רשמיות ומקורות ראשוניים</span></article>
            <article className="side-story"><span className="category">ישראל בלבד</span><h2>סיקור מקומי מכל רחבי הארץ</h2><span className="meta">ירושלים • תל אביב • חיפה • צפון • דרום</span></article>
            <article className="side-story"><span className="category">הבהרה</span><h2>האתר נמצא בהקמה</h2><span className="meta">תוכן חדשותי שוטף יתווסף לאחר חיבור מקורות ומערכת פרסום</span></article>
          </div>
        </section>
        <div className="section-head" id="latest"><h2>חדשות ועדכונים</h2><span className="meta">תוכן לדוגמה / טרם פורסמו דיווחים חיים</span></div>
        <section className="news-grid">{stories.map((s,i)=><article className="news-card" key={i}><div className="thumb" aria-label="מקום לתמונת כתבה">Israel Today</div><div className="news-card-body"><span className="category">{s.category}</span><h3>{s.title}</h3><p>{s.desc}</p><div className="meta">{s.time}</div></div></article>)}</section>
        <div className="notice">הערת מערכת: האתר עדיין בשלבי הקמה. הכותרות בעמוד זה הן תוכן הדגמה ואינן מתיימרות לדווח על אירוע חדשותי שהתרחש. אין לפרסם ידיעות ללא בדיקה, תאריך, ייחוס וקישור למקור.</div>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><div className="brand" style={{color:"white"}}>Israel <span>Today</span></div><p>חדשות מישראל. דיוק, שקיפות והפרדה בין עובדות, פרשנות ודיווחים ראשוניים.</p></div><div><strong>מידע</strong><p>אודות • צור קשר • מדיניות פרטיות • מדיניות תיקונים</p><small>© 2026 Israel Today</small></div></div></footer>
    </>
  );
}