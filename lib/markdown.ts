import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Root as MdastRoot, Heading } from "mdast";
import type { Root as HastRoot, Element, ElementContent } from "hast";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

const CALLOUTS: Record<string, string> = {
  "key idea": "callout-key",
  "in practice": "callout-practice",
  caution: "callout-caution",
  "example (fictional)": "callout-example",
  example: "callout-example",
};

/** Promote `> **Key idea:** ...` blockquotes to styled callouts. */
function rehypeCallouts() {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "blockquote") return;
      const p = node.children.find((c): c is Element => c.type === "element" && c.tagName === "p");
      const strong = p?.children.find((c): c is Element => c.type === "element" && c.tagName === "strong");
      if (!strong) return;
      const label = toString(strong as never).trim().replace(/:$/, "").toLowerCase();
      const cls = CALLOUTS[label];
      if (!cls) return;
      node.properties = { ...node.properties, className: ["callout", cls] };
    });
  };
}

/** Wrap tables so wide ones scroll inside their own box instead of breaking the page. */
function rehypeTableWrap() {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;
      const wrap: Element = { type: "element", tagName: "div", properties: { className: ["table-wrap"], tabIndex: 0, role: "region", "aria-label": "Table" }, children: [node as ElementContent] };
      (parent.children as ElementContent[])[index] = wrap;
      return "skip";
    });
  };
}

/** External links open safely in a new tab. */
function rehypeExternalLinks() {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = String(node.properties?.href ?? "");
      if (/^https?:\/\//.test(href)) {
        node.properties = { ...node.properties, target: "_blank", rel: ["noopener", "noreferrer"] };
      }
    });
  };
}

function extractToc(md: string): TocItem[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(md) as MdastRoot;
  const slugger = new Map<string, number>();
  const items: TocItem[] = [];
  visit(tree, "heading", (h: Heading) => {
    if (h.depth !== 2 && h.depth !== 3) return;
    const text = toString(h);
    // Mirror github-slugger, which rehype-slug uses, so TOC anchors match heading ids.
    let id = text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s/g, "-");
    const n = slugger.get(id) ?? 0;
    slugger.set(id, n + 1);
    if (n > 0) id = `${id}-${n}`;
    items.push({ id, text, depth: h.depth as 2 | 3 });
  });
  return items;
}

export async function renderMarkdown(md: string): Promise<{ html: string; toc: TocItem[] }> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
      content: { type: "text", value: "#" },
    })
    .use(rehypeCallouts)
    .use(rehypeTableWrap)
    .use(rehypeExternalLinks)
    .use(rehypeStringify)
    .process(md);
  return { html: String(file), toc: extractToc(md) };
}

export function plainText(md: string): string {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(md);
  return toString(tree as never).replace(/\s+/g, " ").trim();
}

export function wordCount(md: string): number {
  const t = plainText(md);
  return t ? t.split(" ").length : 0;
}
