import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllArticles()
    .map((a) => `<item><title>${esc(a.title)}</title><link>${site.url}/articles/${a.slug}</link><guid>${site.url}/articles/${a.slug}</guid><pubDate>${new Date(a.updated).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${site.url}</link><description>${esc(site.description)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
