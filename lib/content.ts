import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown, plainText, wordCount, type TocItem } from "./markdown";
import { isTrack, trackOrder, type TrackId } from "./tracks";

const DIR = path.join(process.cwd(), "content", "articles");

export type Source = { title: string; url: string };

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  track: TrackId;
  order: number;
  updated: string;
  tags: string[];
  takeaways: string[];
  sources: Source[];
  words: number;
  minutes: number;
};

export type Article = ArticleMeta & { html: string; toc: TocItem[]; text: string };

function fail(file: string, msg: string): never {
  throw new Error(`content/articles/${file}: ${msg}`);
}

/** Parse and strictly validate one article file. A bad article fails the build instead of shipping. */
function load(file: string): { meta: ArticleMeta; body: string } {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const str = (k: string) => (typeof data[k] === "string" && data[k].trim() ? (data[k] as string).trim() : fail(file, `missing string front matter "${k}"`));
  const track = str("track");
  if (!isTrack(track)) fail(file, `unknown track "${track}"`);
  if (typeof data.order !== "number") fail(file, `"order" must be a number`);
  const arr = (k: string): unknown[] => (Array.isArray(data[k]) ? data[k] : fail(file, `"${k}" must be a list`));
  const takeaways = arr("takeaways").map(String);
  const tags = arr("tags").map(String);
  const sources = arr("sources").map((s) => {
    const o = s as Record<string, unknown>;
    if (typeof o?.title !== "string" || typeof o?.url !== "string" || !/^https:\/\//.test(o.url)) fail(file, `invalid source entry ${JSON.stringify(s)}`);
    return { title: o.title as string, url: o.url as string };
  });
  const description = str("description");
  if (description.length < 80 || description.length > 200) fail(file, `description is ${description.length} chars (want 80-200)`);
  const words = wordCount(content);
  return {
    body: content,
    meta: {
      slug, title: str("title"), description, track, order: data.order as number,
      updated: typeof data.updated === "string" ? data.updated : str("updated"),
      tags, takeaways, sources, words, minutes: Math.max(1, Math.round(words / 220)),
    },
  };
}

let cache: { meta: ArticleMeta; body: string }[] | null = null;
function all() {
  if (!cache) {
    const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
    cache = files.map(load).sort((a, b) => trackOrder.indexOf(a.meta.track) - trackOrder.indexOf(b.meta.track) || a.meta.order - b.meta.order);
  }
  return cache;
}

export function getAllArticles(): ArticleMeta[] {
  return all().map((a) => a.meta);
}

export function getTrackArticles(track: TrackId): ArticleMeta[] {
  return getAllArticles().filter((a) => a.track === track);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const found = all().find((a) => a.meta.slug === slug);
  if (!found) return null;
  const { html, toc } = await renderMarkdown(found.body);
  return { ...found.meta, html, toc, text: plainText(found.body) };
}

export function getAdjacent(slug: string): { prev: ArticleMeta | null; next: ArticleMeta | null } {
  const list = getAllArticles();
  const i = list.findIndex((a) => a.slug === slug);
  return { prev: i > 0 ? list[i - 1] : null, next: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
}

/** Related = shares the most tags, then same track; never the article itself. */
export function getRelated(slug: string, limit = 3): ArticleMeta[] {
  const list = getAllArticles();
  const me = list.find((a) => a.slug === slug);
  if (!me) return [];
  return list
    .filter((a) => a.slug !== slug)
    .map((a) => ({ a, score: a.tags.filter((t) => me.tags.includes(t)).length * 2 + (a.track === me.track ? 1 : 0) }))
    .sort((x, y) => y.score - x.score || x.a.order - y.a.order)
    .slice(0, limit)
    .map((x) => x.a);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
