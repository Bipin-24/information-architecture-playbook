#!/usr/bin/env node
/**
 * Content quality gate. Fails (exit 1) on:
 *  - invalid or missing front matter
 *  - internal links that do not resolve to an article, tool or known page
 *  - source URLs that are not on the verified allowlist (content/sources-allowlist.txt)
 *  - banned strings (employer/product names), em dashes, or unlabelled examples
 * Usage: node scripts/check-content.mjs
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const dir = path.join(root, "content", "articles");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
const slugs = new Set(files.map((f) => f.replace(/\.md$/, "")));
const allow = new Set(fs.readFileSync(path.join(root, "content", "sources-allowlist.txt"), "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")));
const staticPages = new Set(["/tools", "/glossary", "/resources", "/evolution", "/about", "/articles"]);
const BANNED = [/actian/i, /zeenea/i, /\bHCL\b/, /telmai/i];
const errors = [];
const warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);

let totalWords = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  totalWords += words;

  for (const k of ["title", "description", "track", "updated"]) if (typeof data[k] !== "string" || !data[k].trim()) err(file, `missing ${k}`);
  if (!["foundations", "practice", "ai-era"].includes(data.track)) err(file, `bad track ${data.track}`);
  if (typeof data.order !== "number") err(file, "order must be a number");
  if (!Array.isArray(data.takeaways) || data.takeaways.length < 3) err(file, "need 3+ takeaways");
  else for (const t of data.takeaways) if (t.length > 150) err(file, `takeaway too long (${t.length}): ${t.slice(0, 40)}…`);
  if (data.description && (data.description.length < 100 || data.description.length > 180)) err(file, `description ${data.description.length} chars`);
  if (!Array.isArray(data.sources) || data.sources.length < 1) err(file, "need at least one source");
  else for (const s of data.sources) if (!allow.has(s.url)) err(file, `source URL not on verified allowlist: ${s.url}`);

  const prose = content.replace(/```[\s\S]*?```/g, ""); // ignore fenced code (e.g. llms.txt examples)
  if (/^# /m.test(prose)) err(file, "body contains an H1");
  if (/—/.test(raw)) err(file, `contains ${(raw.match(/—/g) || []).length} em dash(es)`);
  for (const re of BANNED) if (re.test(raw)) err(file, `banned term ${re}`);
  if (/\bExample:/.test(content) && !/Example \(fictional\)/.test(content)) warns.push(`${file}: "Example:" without (fictional) label`);
  if (words < 1200) warns.push(`${file}: short (${words} words)`);

  for (const m of content.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const href = m[1].split("#")[0];
    const ok = href.startsWith("/articles/") ? slugs.has(href.slice("/articles/".length)) : staticPages.has(href) || href.startsWith("/tools/") || href.startsWith("/tracks/");
    if (!ok) err(file, `broken internal link ${m[1]}`);
  }
}

const orders = {};
for (const file of files) {
  const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const k = `${data.track}:${data.order}`;
  if (orders[k]) err(file, `duplicate order ${k} with ${orders[k]}`);
  orders[k] = file;
}

console.log(`checked ${files.length} articles, ${totalWords.toLocaleString()} words`);
for (const w of warns) console.log(`warn  ${w}`);
if (errors.length) {
  console.log(errors.map((e) => `FAIL  ${e}`).join("\n"));
  process.exit(1);
}
console.log("OK");
