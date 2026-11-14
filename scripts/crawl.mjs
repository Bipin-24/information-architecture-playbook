#!/usr/bin/env node
/**
 * Crawl a running site: visit every URL in /sitemap.xml, then verify that every internal link
 * returns 200 and every #fragment points at an element that exists on the target page.
 * Usage: node scripts/crawl.mjs http://localhost:3200
 */
const base = (process.argv[2] ?? "http://localhost:3200").replace(/\/$/, "");
const errors = [];
const html = new Map();

const get = async (u) => {
  const r = await fetch(u, { redirect: "follow" });
  return { status: r.status, type: r.headers.get("content-type") ?? "", text: r.status === 200 ? await r.text() : "" };
};

const sm = await get(`${base}/sitemap.xml`);
// The sitemap carries the production origin; rewrite to the host being crawled.
const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (urls.length === 0) { console.error("empty sitemap"); process.exit(1); }

const ids = (t) => new Set([...t.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const pageUrls = new Set(urls);

for (const p of pageUrls) {
  const r = await get(base + p);
  if (r.status !== 200) { errors.push(`${p}: status ${r.status}`); continue; }
  html.set(p, r.text);
}

const checked = new Map();
let links = 0;
for (const [p, t] of html) {
  for (const m of t.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^(mailto:|tel:|javascript:|https?:\/\/)/.test(href) && !href.startsWith(base)) continue;
    const u = new URL(href, base + p);
    if (u.origin !== new URL(base).origin) continue;
    links++;
    const key = u.pathname;
    if (!checked.has(key)) checked.set(key, html.has(key) ? { status: 200, text: html.get(key) } : await get(base + key));
    const target = checked.get(key);
    if (target.status !== 200) { errors.push(`${p}: broken link ${href} (${target.status})`); continue; }
    if (u.hash && target.text && !ids(target.text).has(decodeURIComponent(u.hash.slice(1)))) errors.push(`${p}: missing anchor ${href}`);
  }
}
console.log(`crawled ${html.size} pages, ${links} internal links, ${checked.size} unique targets`);
if (errors.length) { console.log([...new Set(errors)].map((e) => "FAIL  " + e).join("\n")); process.exit(1); }
console.log("OK");
