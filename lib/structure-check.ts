/**
 * Heuristic structure checker for Markdown content. It looks for patterns that tend to hurt findability
 * and retrieval (skipped headings, vague headings, oversized sections, vague link text, missing alt text).
 * These are rules of thumb chosen for this tool, not a standard or a guarantee.
 */
export type Severity = "high" | "medium" | "low";
export type Finding = { rule: string; severity: Severity; line: number; message: string; fix: string };
export type Report = { score: number; band: string; findings: Finding[]; headings: { level: number; text: string; line: number }[]; sections: { title: string; words: number; line: number }[]; frontMatter: Record<string, string> | null };

const WEAK = new Set(["overview", "introduction", "intro", "misc", "miscellaneous", "more", "other", "notes", "details", "information", "info", "general", "stuff", "resources", "summary", "background", "faq"]);
const VAGUE_LINK = /^(here|click here|this|link|read more|more|learn more|this link|this page)$/i;
const WEIGHT: Record<Severity, number> = { high: 12, medium: 6, low: 3 };
const CAP: Record<string, number> = { "heading-skip": 18, "weak-heading": 15, "long-section": 24, "long-paragraph": 10, "vague-link": 12, "missing-alt": 15, "code-language": 6 };
const wc = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function checkStructure(input: string): Report {
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);
  let text = input.replace(/\r\n/g, "\n");
  let offset = 0;
  let frontMatter: Record<string, string> | null = null;

  const fm = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (fm) {
    frontMatter = {};
    for (const l of fm[1].split("\n")) { const m = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(l); if (m) frontMatter[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
    offset = fm[0].split("\n").length - 1;
    text = text.slice(fm[0].length);
  }
  if (!frontMatter) add({ rule: "front-matter", severity: "medium", line: 1, message: "No front matter found.", fix: "Add front matter with at least a title and description so systems can show and filter the content." });
  else {
    for (const k of ["title", "description"]) if (!frontMatter[k]) add({ rule: "front-matter", severity: "medium", line: 1, message: `Front matter is missing "${k}".`, fix: `Add a ${k}.` });
    const missing = ["topic_type", "product", "version", "owner"].filter((k) => !frontMatter![k]);
    if (missing.length === 4) add({ rule: "front-matter-rich", severity: "low", line: 1, message: "No descriptive metadata beyond title/description (for example topic_type, product, version, owner).", fix: "Add the fields your retrieval or search will need to filter by, such as product and version." });
  }

  const lines = text.split("\n");
  const headings: Report["headings"] = [];
  const sections: Report["sections"] = [];
  let fence = false, fenceStart = 0, fenceLang = "";
  let secTitle = "(before first heading)", secLine = 1 + offset, secWords = 0;
  let para: string[] = [], paraStart = 0;
  let firstPara: { text: string; line: number } | null = null;
  let afterH1 = false;

  const endPara = () => {
    if (!para.length) return;
    const t = para.join(" ");
    const n = wc(t);
    const isList = /^\s*([-*+]|\d+\.)\s/.test(para[0]) || para[0].trim().startsWith("|");
    if (!isList && n > 120) add({ rule: "long-paragraph", severity: "low", line: paraStart + offset, message: `A paragraph runs ${n} words.`, fix: "Split it so each paragraph makes one point; shorter units retrieve and scan better." });
    if (afterH1 && !firstPara && !isList) firstPara = { text: t, line: paraStart + offset };
    para = [];
  };
  const endSection = () => { if (secWords > 0 || headings.length) sections.push({ title: secTitle, words: secWords, line: secLine }); };

  lines.forEach((raw, idx) => {
    const ln = idx + 1;
    const f = /^```(.*)$/.exec(raw);
    if (f) {
      if (!fence) { fence = true; fenceStart = ln; fenceLang = f[1].trim(); if (!fenceLang) add({ rule: "code-language", severity: "low", line: ln + offset, message: "Code block has no language label.", fix: "Add a language after the opening fence (for example ```json) so tools can treat it correctly." }); }
      else fence = false;
      secWords += 0; return;
    }
    if (fence) return;

    const h = /^(#{1,6})\s+(.*\S)\s*$/.exec(raw);
    if (h) {
      endPara();
      const level = h[1].length, title = h[2].replace(/[#*_`]/g, "").trim();
      const prev = headings[headings.length - 1];
      if (prev && level > prev.level + 1) add({ rule: "heading-skip", severity: "high", line: ln + offset, message: `Heading jumps from H${prev.level} to H${level}: "${title}".`, fix: `Use H${prev.level + 1} here so the outline stays continuous.` });
      if (WEAK.has(title.toLowerCase())) add({ rule: "weak-heading", severity: "medium", line: ln + offset, message: `Vague heading: "${title}".`, fix: "Name the specific thing the section covers; a heading should make sense when seen alone in search results or a chunk." });
      endSection();
      headings.push({ level, text: title, line: ln + offset });
      secTitle = title; secLine = ln + offset; secWords = 0;
      afterH1 = level === 1;
      return;
    }
    if (raw.trim() === "") { endPara(); return; }
    if (!para.length) paraStart = ln;
    para.push(raw);
    secWords += wc(raw);

    for (const m of raw.matchAll(/!\[([^\]]*)\]\(([^)]*)\)/g)) if (!m[1].trim()) add({ rule: "missing-alt", severity: "high", line: ln + offset, message: `Image has no alt text: ${m[2].slice(0, 40)}`, fix: "Describe what the image conveys. If information lives only in the image, also state it in text." });
    for (const m of raw.matchAll(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g)) if (VAGUE_LINK.test(m[1].trim())) add({ rule: "vague-link", severity: "medium", line: ln + offset, message: `Vague link text: "${m[1]}".`, fix: "Make the link text describe the destination so it works out of context." });
  });
  endPara(); endSection();
  void fenceStart;

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) add({ rule: "h1", severity: "high", line: 1 + offset, message: "No H1 (page title) found.", fix: "Start with one H1 that states the topic." });
  if (h1s.length > 1) add({ rule: "h1", severity: "high", line: h1s[1].line, message: `Found ${h1s.length} H1 headings.`, fix: "Use a single H1 for the page title and H2/H3 for sections." });
  if (h1s.length >= 1 && headings.length === 1 && wc(text) > 200) add({ rule: "no-sections", severity: "high", line: 1 + offset, message: "A long page with no subheadings.", fix: "Break it into titled sections; headings are the main handles for scanning, navigation and heading-anchored chunking." });

  for (const s of sections) if (s.words > 350 && s.title !== "(before first heading)") add({ rule: "long-section", severity: "medium", line: s.line, message: `Section "${s.title}" is ${s.words} words with no subheading.`, fix: "Split it with subheadings or move parts to their own topics; very long sections produce unfocused chunks." });

  if (firstPara) {
    const n = wc((firstPara as { text: string }).text);
    if (n < 12) add({ rule: "opening", severity: "low", line: (firstPara as { line: number }).line, message: `The opening paragraph is only ${n} words.`, fix: "Use the opening to state what the page covers and who it is for." });
  } else if (h1s.length) add({ rule: "opening", severity: "low", line: h1s[0].line, message: "No opening paragraph after the H1.", fix: "State what the page covers and who it is for before the first subheading." });

  // Score: deduct per finding, capped per rule so one repeated issue cannot zero the page.
  const byRule: Record<string, number> = {};
  for (const f of findings) byRule[f.rule] = (byRule[f.rule] ?? 0) + WEIGHT[f.severity];
  const deduction = Object.entries(byRule).reduce((a, [r, v]) => a + Math.min(v, CAP[r] ?? 15), 0);
  const score = Math.max(0, 100 - deduction);
  const band = score >= 85 ? "Structurally strong" : score >= 65 ? "Solid, with fixes worth making" : score >= 40 ? "Needs structural work" : "Hard to scan or retrieve from";
  findings.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity]) || a.line - b.line);
  return { score, band, findings, headings, sections, frontMatter };
}

export const SAMPLE_BAD = `# Product guide

# Overview

Our product has a lot of features and this page tells you about them. You can set up everything in many ways and there are many options that you will want to look at when you are first getting started with the product and also later when you come back to it because things change over time and settings matter. Some teams prefer to configure the basics first and then move on to the advanced options, while other teams like to review every setting in one sitting before they invite anyone else, and both approaches work well as long as somebody is responsible for keeping the configuration documented, reviewed and consistent as the product continues to grow and as new people join the team and ask the same questions again and again.

### Settings

Click [here](/settings) to change things. See the diagram below.

![](/img/diagram.png)

\`\`\`
set timeout=30
\`\`\`

## More

Read more about it [read more](/docs).
`;
