import { getAllArticles, getArticle } from "@/lib/content";
import { glossary } from "@/lib/glossary";

export const dynamic = "force-static";

const id = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Build-time search index: articles (with body excerpt), glossary terms, tools and pages. */
export async function GET() {
  const articles = await Promise.all(getAllArticles().map((a) => getArticle(a.slug)));
  const entries = [
    ...articles.filter((a): a is NonNullable<typeof a> => !!a).map((a) => ({ t: a.title, d: a.description, u: `/articles/${a.slug}`, k: "article", g: a.tags, x: a.text.slice(0, 1800) })),
    ...glossary.map((g) => ({ t: g.term, d: g.definition, u: `/glossary#${id(g.term)}`, k: "glossary" })),
    { t: "IA maturity assessment", d: "Seven-dimension self-assessment of IA maturity.", u: "/tools/maturity-assessment", k: "tool" },
    { t: "Chunk Lab", d: "Compare chunking strategies on your own Markdown.", u: "/tools/chunk-lab", k: "tool" },
    { t: "Structure checker", d: "Lint Markdown for structural problems.", u: "/tools/structure-checker", k: "tool" },
    { t: "Templates and reading list", d: "Copy-ready IA templates and curated sources.", u: "/resources", k: "page" },
    { t: "How IA evolved", d: "Sourced timeline from web IA to machine readers.", u: "/evolution", k: "page" },
  ];
  return Response.json(entries);
}
