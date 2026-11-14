import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Companion to llms.txt: the complete Markdown of every article in one file. */
export function GET() {
  const parts = getAllArticles().map((a) => {
    const { content } = matter(fs.readFileSync(path.join(process.cwd(), "content", "articles", `${a.slug}.md`), "utf8"));
    return `# ${a.title}\n\nURL: ${site.url}/articles/${a.slug}\nTrack: ${a.track}\nUpdated: ${a.updated}\nSources: ${a.sources.map((s) => s.url).join(", ")}\n\n${content.trim()}`;
  });
  return new Response(`# ${site.name}: full text\n\n${parts.join("\n\n---\n\n")}\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
