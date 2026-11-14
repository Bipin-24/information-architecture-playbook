import { getAllArticles } from "@/lib/content";
import { tracks, trackOrder } from "@/lib/tracks";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt per the llmstxt.org proposal: H1, blockquote summary, H2 link lists. A proposal, not a standard. */
export function GET() {
  const all = getAllArticles();
  const body = `# ${site.name}

> ${site.description} ${all.length} sourced articles, a glossary, templates and three browser-based tools. Examples are fictional and labeled; research figures are attributed with their conditions.

Author: ${site.author.name}. Full text of every article: ${site.url}/llms-full.txt

${trackOrder.map((t) => `## ${tracks[t].label}\n${all.filter((a) => a.track === t).map((a) => `- [${a.title}](${site.url}/articles/${a.slug}): ${a.description}`).join("\n")}`).join("\n\n")}

## Reference
- [Glossary](${site.url}/glossary): definitions of IA and AI-retrieval terms
- [Templates and reading list](${site.url}/resources): audit checklist, content model, taxonomy governance and more
- [How IA evolved](${site.url}/evolution): sourced timeline
- [Tools](${site.url}/tools): maturity assessment, chunk lab, structure checker

## Optional
- [About](${site.url}/about)
- [Source repository](${site.repo})
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
