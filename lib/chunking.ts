/**
 * Deterministic chunking strategies for the Chunk Lab. Sizes are in WORDS (a rough stand-in for tokens).
 * This teaches how boundaries behave; it is not a production chunker.
 */
export type Strategy = "fixed" | "recursive" | "heading";

type Block = { kind: "heading" | "para"; level: number; text: string; path: string[] };
export type Chunk = { text: string; words: number; path: string[]; startsWithHeading: boolean; endsMidSentence: boolean };

const wc = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/** Split Markdown into heading and paragraph blocks, tracking the heading path each block sits under. */
export function parseBlocks(doc: string): Block[] {
  const blocks: Block[] = [];
  const stack: { level: number; text: string }[] = [];
  let buf: string[] = [];
  let fence = false;
  const flush = () => {
    if (buf.length) {
      blocks.push({ kind: "para", level: 0, text: buf.join("\n").trim(), path: stack.map((s) => s.text) });
      buf = [];
    }
  };
  for (const line of doc.replace(/\r\n/g, "\n").split("\n")) {
    if (/^```/.test(line)) { fence = !fence; buf.push(line); continue; }
    const h = !fence && /^(#{1,6})\s+(.*\S)\s*$/.exec(line);
    if (h) {
      flush();
      const level = h[1].length;
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      stack.push({ level, text: h[2] });
      blocks.push({ kind: "heading", level, text: h[2], path: stack.map((s) => s.text) });
    } else if (!fence && line.trim() === "") flush();
    else buf.push(line);
  }
  flush();
  return blocks.filter((b) => b.text);
}

const endsMid = (t: string) => !/[.!?:;)"'”`]\s*$/.test(t.trim()) && !/^```/.test(t.trim().split("\n").pop() ?? "");

function make(text: string, path: string[], startsWithHeading: boolean): Chunk {
  return { text, words: wc(text), path, startsWithHeading, endsMidSentence: endsMid(text) };
}

/** Merge blocks into chunks no larger than `size` words; oversize blocks split on sentences, then words. */
function mergeBlocks(blocks: Block[], size: number): Chunk[] {
  const out: Chunk[] = [];
  let cur: Block[] = [];
  let curWords = 0;
  const emit = () => {
    if (!cur.length) return;
    out.push(make(cur.map((b) => (b.kind === "heading" ? `${"#".repeat(b.level)} ${b.text}` : b.text)).join("\n\n"), cur[0].path, cur[0].kind === "heading"));
    cur = []; curWords = 0;
  };
  for (const b of blocks) {
    const w = wc(b.text);
    if (w > size) {
      emit();
      const sentences = b.text.split(/(?<=[.!?])\s+/);
      let acc: string[] = [], accW = 0;
      const flushAcc = () => { if (acc.length) { out.push(make(acc.join(" "), b.path, false)); acc = []; accW = 0; } };
      for (const s of sentences) {
        const sw = wc(s);
        if (sw > size) { flushAcc(); const ws = s.split(/\s+/); for (let i = 0; i < ws.length; i += size) out.push(make(ws.slice(i, i + size).join(" "), b.path, false)); continue; }
        if (accW + sw > size) flushAcc();
        acc.push(s); accW += sw;
      }
      flushAcc();
      continue;
    }
    if (curWords + w > size) emit();
    cur.push(b); curWords += w;
  }
  emit();
  return out;
}

export function chunk(doc: string, strategy: Strategy, size: number, overlap: number): Chunk[] {
  const blocks = parseBlocks(doc);
  if (strategy === "fixed") {
    // Blind to structure: a flat word stream cut every `size` words, with optional overlap.
    const stream: { w: string; path: string[]; head: boolean }[] = [];
    for (const b of blocks) for (const [i, w] of (b.kind === "heading" ? b.text : b.text).split(/\s+/).entries()) stream.push({ w, path: b.path, head: b.kind === "heading" && i === 0 });
    const step = Math.max(1, size - Math.min(overlap, size - 1));
    const out: Chunk[] = [];
    for (let i = 0; i < stream.length; i += step) {
      const slice = stream.slice(i, i + size);
      out.push(make(slice.map((s) => s.w).join(" "), slice[0].path, slice[0].head));
      if (i + size >= stream.length) break;
    }
    return out;
  }
  if (strategy === "recursive") return mergeBlocks(blocks, size);
  // heading-anchored: never merge across a section boundary (H1-H3); subdivide long sections on paragraphs.
  const sections: Block[][] = [];
  for (const b of blocks) {
    if (b.kind === "heading" && b.level <= 3) sections.push([b]);
    else if (sections.length) sections[sections.length - 1].push(b);
    else sections.push([b]);
  }
  return sections.flatMap((s) => mergeBlocks(s, size));
}

export function withContext(c: Chunk, docTitle: string): string {
  const trail = c.path.length ? c.path.join(" > ") : docTitle;
  return `[${trail}]\n${c.text}`;
}

export function stats(chunks: Chunk[], hasContext: boolean) {
  const n = chunks.length || 1;
  const mid = chunks.filter((c) => c.endsMidSentence).length;
  const noCtx = hasContext ? 0 : chunks.filter((c) => !c.startsWithHeading).length;
  return {
    count: chunks.length,
    avg: Math.round(chunks.reduce((a, c) => a + c.words, 0) / n),
    max: Math.max(0, ...chunks.map((c) => c.words)),
    midPct: Math.round((mid / n) * 100),
    noCtxPct: Math.round((noCtx / n) * 100),
  };
}

export const SAMPLE_DOC = `# Configuring single sign-on (SSO)

Single sign-on lets people use your company identity provider to sign in to Orbit, the fictional analytics product used in this example. This guide is for workspace administrators on version 4.2.

## Before you begin

You need the Administrator role and access to your identity provider's admin console. SSO applies to every member of the workspace once enabled, so schedule the change outside working hours and tell your team in advance. Keep one local administrator account that does not use SSO so you can recover access if the configuration fails.

## Configure the connection

1. Open Settings, then Security, then Single sign-on.
2. Choose your provider from the list, or choose Custom SAML if yours is not listed.
3. Copy the Orbit callback URL and paste it into your identity provider as the allowed redirect.
4. Paste the metadata URL from your identity provider into Orbit and select Save.

After you save, Orbit checks that it can read the metadata. If the check fails, the connection stays disabled and members keep signing in with passwords.

## Test with a pilot user

Before enabling SSO for everyone, add one pilot user to the application in your identity provider and ask them to sign in. Confirm that their email address and name arrive correctly. Mismatched email addresses are the most common cause of duplicate accounts, so check this carefully before you proceed.

## Enable for the workspace

Turn on the Require SSO option. Members who sign in next will be redirected to your identity provider. Existing sessions end after twenty-four hours, and members will be asked to sign in again through SSO.

## Troubleshooting

If members see an error that says the assertion was rejected, compare the clock settings on your identity provider and confirm the audience value matches the Orbit entity ID. If members reach a blank page after signing in, clear the browser session and confirm the callback URL has no trailing slash.
`;
