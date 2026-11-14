"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { chunk, SAMPLE_DOC, stats, withContext, type Strategy } from "@/lib/chunking";
import { cn } from "@/lib/utils";

const STRATS: { id: Strategy; name: string; blurb: string }[] = [
  { id: "fixed", name: "Fixed-size", blurb: "Cuts every N words, blind to structure. Fast and simple." },
  { id: "recursive", name: "Paragraph-based", blurb: "Respects paragraph and sentence breaks, merging up to N words." },
  { id: "heading", name: "Heading-anchored", blurb: "Splits on headings first, so each chunk stays inside one section." },
];

export function ChunkLab() {
  const [doc, setDoc] = useState(SAMPLE_DOC);
  const [strategy, setStrategy] = useState<Strategy>("fixed");
  const [size, setSize] = useState(70);
  const [overlap, setOverlap] = useState(0);
  const [ctx, setCtx] = useState(false);

  const chunks = useMemo(() => chunk(doc, strategy, size, overlap), [doc, strategy, size, overlap]);
  const s = useMemo(() => stats(chunks, ctx), [chunks, ctx]);
  const title = /^#\s+(.+)$/m.exec(doc)?.[1] ?? "Document";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
      <div className="space-y-5">
        <div>
          <label htmlFor="doc" className="font-mono text-xs uppercase tracking-[0.14em] text-amber-700">Document (Markdown)</label>
          <textarea id="doc" value={doc} onChange={(e) => setDoc(e.target.value)} spellCheck={false} className="mt-2 h-72 w-full resize-y rounded-xl border border-line bg-card p-4 font-mono text-[12.5px] leading-6 shadow-card focus:border-sky-400 focus:outline-none" />
          <button type="button" onClick={() => setDoc(SAMPLE_DOC)} className="mt-2 text-xs text-sky-700 underline underline-offset-4">Reset to sample</button>
        </div>

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-[0.14em] text-amber-700">Strategy</legend>
          <div className="mt-2 grid gap-2">
            {STRATS.map((st) => (
              <label key={st.id} className={cn("flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus-within:outline-2 focus-within:outline-sky-400", strategy === st.id ? "border-amber-500 bg-amber-400/15" : "border-line hover:bg-paper-2")}>
                <input type="radio" name="strategy" checked={strategy === st.id} onChange={() => setStrategy(st.id)} className="mt-1 accent-amber-600" />
                <span><span className="font-medium">{st.name}</span><span className="block text-muted">{st.blurb}</span></span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="flex justify-between"><span className="font-medium">Max chunk size</span><span className="font-mono text-muted">{size} words</span></span>
            <input type="range" min={30} max={300} step={5} value={size} onChange={(e) => setSize(+e.target.value)} className="mt-2 w-full accent-amber-600" />
          </label>
          <label className={cn("block text-sm", strategy !== "fixed" && "opacity-50")}>
            <span className="flex justify-between"><span className="font-medium">Overlap (fixed only)</span><span className="font-mono text-muted">{overlap} words</span></span>
            <input type="range" min={0} max={40} step={5} value={overlap} disabled={strategy !== "fixed"} onChange={(e) => setOverlap(+e.target.value)} className="mt-2 w-full accent-amber-600" />
          </label>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-card px-3.5 py-3 text-sm">
          <input type="checkbox" checked={ctx} onChange={(e) => setCtx(e.target.checked)} className="mt-1 accent-amber-600" />
          <span><span className="font-medium">Prepend heading context to each chunk</span><span className="block text-muted">A simple, rule-based version of the idea behind contextual retrieval. (Anthropic&rsquo;s method generates the context with a language model; this just uses the heading trail.)</span></span>
        </label>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
          {[
            ["Chunks", String(s.count)],
            ["Average size", `${s.avg} w`],
            ["Cut mid-sentence", `${s.midPct}%`],
            ["No heading context", `${s.noCtxPct}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line bg-card p-3.5 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</p>
              <p className="mt-1 font-display text-2xl font-semibold">{v}</p>
            </div>
          ))}
        </div>

        <ol className="mt-4 max-h-[640px] space-y-3 overflow-y-auto pr-1" aria-label="Resulting chunks">
          {chunks.map((c, i) => (
            <li key={i} className="rounded-xl border border-line bg-card p-4 shadow-card">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-semibold">Chunk {i + 1}</span>
                <span className="font-mono text-muted">{c.words} words</span>
                {c.endsMidSentence ? (
                  <span className="inline-flex items-center gap-1 rounded bg-ember-500/12 px-1.5 py-0.5 font-mono text-ember-700"><AlertTriangle className="size-3" aria-hidden="true" /> cut mid-sentence</span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-600/12 px-1.5 py-0.5 font-mono text-emerald-800"><Check className="size-3" aria-hidden="true" /> clean end</span>
                )}
                {!ctx && !c.startsWithHeading && <span className="inline-flex items-center gap-1 rounded bg-amber-400/25 px-1.5 py-0.5 font-mono text-amber-700">no heading context</span>}
              </div>
              <pre className="mt-2.5 whitespace-pre-wrap break-words font-mono text-[12px] leading-5 text-fg/90">{ctx ? withContext(c, title) : c.text}</pre>
            </li>
          ))}
          {chunks.length === 0 && <li className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">Paste some Markdown to see how it is chunked.</li>}
        </ol>
      </div>
    </div>
  );
}
