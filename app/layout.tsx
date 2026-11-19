import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Israel Today | חדשות ישראל",
    template: "%s | Israel Today"
  },
  description: "חדשות מישראל: עדכונים, ביטחון, פוליטיקה, כלכלה, טכנולוגיה וחברה.",
  metadataBase: new URL("https://israel-today.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Israel Today",
    title: "Israel Today | חדשות ישראל",
    description: "כל החדשות מישראל במקום אחד"
  },
  robots: { index: true, follow: true }
};

const organization = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Israel Today",
  url: "https://israel-today.vercel.app",
  inLanguage: "he"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
      </body>
    </html>
  );
}