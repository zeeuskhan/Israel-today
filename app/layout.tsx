import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Israel Today | חדשות ישראל",
    template: "%s | Israel Today"
  },
  description: "חדשות מישראל: עדכונים, ביטחון, פוליטיקה, כלכלה, טכנולוגיה וחברה.",
  metadataBase: new URL("https://todayisrael.vercel.app"),
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Israel Today",
    title: "Israel Today | חדשות ישראל",
    description: "כל החדשות מישראל במקום אחד"
  },
  verification: { google: "ItLByOSQAwzJ0a_YDS2lb1-6swGae5hQRnJUr4TuShg" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const organization = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Israel Today",
  url: "https://todayisrael.vercel.app",
  inLanguage: "he-IL",
  areaServed: { "@type": "Country", name: "Israel" },
  publishingPrinciples: "https://todayisrael.vercel.app/editorial-policy",
  ethicsPolicy: "https://todayisrael.vercel.app/editorial-policy",
  correctionsPolicy: "https://todayisrael.vercel.app/editorial-policy"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he-IL" dir="rtl">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
      </body>
    </html>
  );
}