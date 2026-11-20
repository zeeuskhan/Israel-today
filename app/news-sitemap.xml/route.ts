import { articles } from "../articles";
const baseUrl = "https://todayisrael.vercel.app";
const xml = (s:string) => s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;");
export const revalidate = 300;
export async function GET(){
 const cutoff=Date.now()-2*24*60*60*1000;
 const recent=articles.filter(a=>new Date(a.publishedAt).getTime()>=cutoff);
 const urls=recent.map(a=>`<url><loc>${baseUrl}/articles/${a.slug}</loc><news:news><news:publication><news:name>Israel Today</news:name><news:language>he</news:language></news:publication><news:publication_date>${new Date(a.publishedAt).toISOString()}</news:publication_date><news:title>${xml(a.title)}</news:title></news:news></url>`).join("");
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, s-maxage=300, stale-while-revalidate=600"}});
}