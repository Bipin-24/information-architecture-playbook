// Unit tests for the pure logic behind the interactive tools. Run: npm run test:lib
import assert from "node:assert/strict";
import { chunk, stats, SAMPLE_DOC, parseBlocks } from "../lib/chunking.ts";
import { checkStructure, SAMPLE_BAD } from "../lib/structure-check.ts";
import { summarize, dimensions } from "../lib/maturity.ts";

let n = 0;
const t = (name: string, fn: () => void) => { fn(); n++; console.log("ok  " + name); };

// --- chunking
t("parseBlocks tracks heading paths", () => {
  const b = parseBlocks("# A\n\nintro\n\n## B\n\ntext\n\n### C\n\ndeep\n\n## D\n\nother");
  assert.deepEqual(b.find((x) => x.text === "deep")!.path, ["A", "B", "C"]);
  assert.deepEqual(b.find((x) => x.text === "other")!.path, ["A", "D"]);
});
t("fixed chunks never exceed size and cover all words", () => {
  const cs = chunk(SAMPLE_DOC, "fixed", 60, 0);
  assert.ok(cs.every((c) => c.words <= 60));
  const total = parseBlocks(SAMPLE_DOC).reduce((a, b) => a + b.text.split(/\s+/).length, 0);
  assert.equal(cs.reduce((a, c) => a + c.words, 0), total);
});
t("fixed overlap duplicates words between neighbours", () => {
  const a = chunk(SAMPLE_DOC, "fixed", 60, 0), b = chunk(SAMPLE_DOC, "fixed", 60, 20);
  assert.ok(b.length > a.length);
  const w1 = b[0].text.split(" ").slice(-20).join(" "), w2 = b[1].text.split(" ").slice(0, 20).join(" ");
  assert.equal(w1, w2);
});
t("heading-anchored never merges across sections and keeps heading context", () => {
  const cs = chunk(SAMPLE_DOC, "heading", 400, 0);
  assert.ok(cs.length >= 6);
  assert.ok(cs.every((c) => c.path.length > 0));
  assert.ok(cs.every((c) => c.startsWithHeading));
});
t("heading-anchored beats fixed on mid-sentence cuts for this document", () => {
  const f = stats(chunk(SAMPLE_DOC, "fixed", 70, 0), false), h = stats(chunk(SAMPLE_DOC, "heading", 70, 0), false);
  assert.ok(h.midPct <= f.midPct, `heading ${h.midPct} vs fixed ${f.midPct}`);
  assert.ok(f.midPct > 0, "fixed should cut some sentences");
});
t("oversize paragraph splits without losing text", () => {
  const long = "# T\n\n" + Array.from({ length: 30 }, (_, i) => `Sentence number ${i} is here.`).join(" ");
  const cs = chunk(long, "recursive", 25, 0);
  assert.ok(cs.every((c) => c.words <= 25));
});
t("empty input yields no chunks and safe stats", () => {
  const cs = chunk("", "heading", 100, 0);
  assert.equal(cs.length, 0);
  assert.equal(stats(cs, false).avg, 0);
});

// --- structure checker
t("clean doc scores high", () => {
  const r = checkStructure(`---\ntitle: X\ndescription: Y\n---\n# Configure SSO\n\nThis page explains how administrators configure single sign-on for a workspace.\n\n## Prerequisites\n\nYou need admin rights.\n`);
  assert.ok(r.score >= 90, String(r.score));
});
t("bad sample is flagged for each seeded defect", () => {
  const r = checkStructure(SAMPLE_BAD);
  const rules = new Set(r.findings.map((f) => f.rule));
  for (const need of ["front-matter", "h1", "heading-skip", "weak-heading", "vague-link", "missing-alt", "code-language", "long-paragraph"]) assert.ok(rules.has(need), `missing rule ${need}; got ${[...rules]}`);
  assert.ok(r.score < 65, String(r.score));
});
t("line numbers account for front matter", () => {
  const r = checkStructure(`---\ntitle: X\ndescription: Y\n---\n# T\n\nA decent opening paragraph about the topic at hand today.\n\n#### Deep\n`);
  const skip = r.findings.find((f) => f.rule === "heading-skip")!;
  assert.equal(skip.line, 9);
});
t("headings and links inside code fences are ignored", () => {
  const r = checkStructure("# T\n\nOpening paragraph that states the scope of this page clearly.\n\n```md\n# Not a heading\n[here](x)\n```\n");
  assert.ok(!r.findings.some((f) => f.rule === "h1" || f.rule === "vague-link"));
});
t("score never leaves 0..100", () => {
  const r = checkStructure(SAMPLE_BAD.repeat(10));
  assert.ok(r.score >= 0 && r.score <= 100);
});

// --- maturity scoring
const all = (v: number) => Object.fromEntries(dimensions.map((d) => [d.id, v]));
t("all 1s => 1.0 Ad hoc", () => { const s = summarize(all(1)); assert.equal(s.mean, 1); assert.equal(s.level.name, "Ad hoc"); });
t("all 5s => 5.0 Optimizing", () => { const s = summarize(all(5)); assert.equal(s.level.name, "Optimizing"); assert.equal(s.toward, null); });
t("mixed scores: mean, level, weakest order (hand-computed)", () => {
  const s = summarize({ structure: 4, metadata: 3, navsearch: 4, semantic: 2, retrieval: 3, governance: 2, evaluation: 5 });
  assert.equal(s.mean, 3.3);                  // 23/7 = 3.2857
  assert.equal(s.level.name, "Defined");
  assert.deepEqual(s.weakest.map((w) => w.d.id), ["semantic", "governance", "metadata"]); // ties by dimension order
  assert.equal(s.spread, 3);
});
console.log(`\n${n} tests passed`);
