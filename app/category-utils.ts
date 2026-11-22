export const categorySlugs: Record<string, string> = {
  "פוליטיקה": "politics",
  "חדשות מקומיות": "local-news",
  "ביטחון": "security",
  "ביטחון ודיפלומטיה": "security-diplomacy",
  "כלכלה": "economy",
  "חוץ ודיפלומטיה": "world-diplomacy",
  "חברה": "society",
  "בריאות הציבור": "public-health",
  "כלכלה וביטחון": "economy-security",
  "כלכלה ופוליטיקה": "economy-politics",
  "אזורי": "regional"
};

export function categoryPath(category: string): string {
  const slug = categorySlugs[category];
  return slug ? `/category/${slug}` : "/";
}

export function categoryFromSlug(slug: string): string | undefined {
  return Object.entries(categorySlugs).find(([, value]) => value === slug)?.[0];
}
