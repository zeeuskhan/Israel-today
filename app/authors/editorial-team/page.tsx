import Link from "next/link";

export const metadata = {
  title: "מערכת Israel Today",
  description: "מידע על הייחוס המערכתי, תחומי הסיקור ועקרונות הפרסום של Israel Today."
};

const profile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "name": "מערכת Israel Today",
  "mainEntity": {
    "@type": "Organization",
    "name": "מערכת Israel Today",
    "url": "https://todayisrael.vercel.app",
    "description": "הגוף המפרסם של אתר חדשות ישראל Today בעברית."
  }
};

export default function EditorialTeam() {
  return (
    <main dir="rtl" style={{ maxWidth: 820, margin: "48px auto", padding: "0 20px", fontFamily: "Arial,sans-serif", lineHeight: 1.9 }}>
      <Link href="/">← Israel Today</Link>
      <h1>מערכת Israel Today</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
      <p>זהו עמוד הייחוס של הגוף המפרסם באתר. כאשר כתבה אינה כוללת קרדיט אישי מאומת, היא מיוחסת למערכת Israel Today.</p>
      <h2>תחומי סיקור</h2>
      <p>ישראל, פוליטיקה, ביטחון, כלכלה, חברה, יחסי חוץ וחדשות מקומיות.</p>
      <h2>אחריות מערכתית</h2>
      <p>הייחוס למערכת אינו טענה לכך שכל כתבה נכתבה בידי כתב שטח מסוים. יש לבדוק בכל כתבה את המקורות המקושרים ואת ההבחנה בין מידע מאומת, דיווח חיצוני וטענה.</p>
      <p>קראו גם את <Link href="/editorial-policy">מדיניות המערכת והמקורות</Link> ואת <Link href="/about">עמוד האודות</Link>.</p>
    </main>
  );
}
