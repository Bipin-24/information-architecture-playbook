"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { dimensions, levels, nextByLevel, summarize } from "@/lib/maturity";
import { cn } from "@/lib/utils";

function Radar({ scores }: { scores: Record<string, number> }) {
  const n = dimensions.length, cx = 150, cy = 150, R = 105;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(a) * R * (v / 5), cy + Math.sin(a) * R * (v / 5)] as const;
  };
  const poly = dimensions.map((d, i) => pt(i, scores[d.id]).join(",")).join(" ");
  return (
    <svg viewBox="0 0 300 300" className="mx-auto h-auto w-full max-w-[340px]" role="img" aria-label={`Radar chart of ${n} dimension scores, each from 1 to 5`}>
      {[1, 2, 3, 4, 5].map((r) => (
        <polygon key={r} points={dimensions.map((_, i) => pt(i, r).join(",")).join(" ")} fill="none" stroke="#dcd6c6" strokeWidth="1" />
      ))}
      {dimensions.map((d, i) => {
        const [x, y] = pt(i, 5.9);
        return <text key={d.id} x={x} y={y} fontSize="8.5" textAnchor={x < cx - 5 ? "end" : x > cx + 5 ? "start" : "middle"} dominantBaseline="middle" fill="#111623">{d.name.split(" and ")[0].replace("Retrieval", "Retrieval")}</text>;
      })}
      <polygon points={poly} fill="#e8a317" fillOpacity="0.28" stroke="#b9770e" strokeWidth="2" strokeLinejoin="round" />
      {dimensions.map((d, i) => { const [x, y] = pt(i, scores[d.id]); return <circle key={d.id} cx={x} cy={y} r="3.5" fill="#8a5a06" />; })}
    </svg>
  );
}

export function MaturityAssessment() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const done = Object.keys(scores).length === dimensions.length;
  const result = useMemo(() => (done ? summarize(scores) : null), [scores, done]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5" aria-label="Maturity self-assessment">
        {dimensions.map((d, i) => (
          <fieldset key={d.id} className="rounded-xl border border-line bg-card p-5 shadow-card">
            <legend className="float-left mb-3 w-full">
              <span className="font-mono text-xs text-amber-700">{String(i + 1).padStart(2, "0")} · {d.name}</span>
              <span className="block pt-1 text-[15px] font-semibold">{d.question}</span>
            </legend>
            <div className="clear-both grid gap-2">
              {d.descriptors.map((txt, li) => {
                const lvl = li + 1, on = scores[d.id] === lvl;
                return (
                  <label key={lvl} className={cn("flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus-within:outline-2 focus-within:outline-sky-400", on ? "border-amber-500 bg-amber-400/15" : "border-line hover:bg-paper-2")}>
                    <input type="radio" name={d.id} value={lvl} checked={on} onChange={() => setScores((s) => ({ ...s, [d.id]: lvl }))} className="mt-1 accent-amber-600" />
                    <span><span className="mr-1.5 font-mono text-[11px] text-muted">{lvl} {levels[li].name}</span> {txt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-line bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-700">{done ? "Your result" : `Progress ${Object.keys(scores).length} / ${dimensions.length}`}</p>
            {Object.keys(scores).length > 0 && <button type="button" onClick={() => setScores({})} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-fg"><RotateCcw className="size-3" aria-hidden="true" /> Reset</button>}
          </div>
          {!result ? (
            <>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-3" role="progressbar" aria-valuemin={0} aria-valuemax={dimensions.length} aria-valuenow={Object.keys(scores).length} aria-label="Dimensions answered">
                <div className="h-full bg-amber-500 transition-[width] duration-300" style={{ width: `${(Object.keys(scores).length / dimensions.length) * 100}%` }} />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">Choose the description that is <em>mostly true today</em> for each dimension, not the one you aspire to. Nothing leaves your browser.</p>
            </>
          ) : (
            <>
              <div className="mt-4 flex items-end gap-3">
                <p className="font-display text-6xl font-semibold">{result.mean.toFixed(1)}</p>
                <p className="pb-2 text-lg font-semibold text-amber-700">Level {result.level.n}: {result.level.name}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{result.level.line}{result.toward && result.mean - result.level.n >= 0.5 ? ` You are partway toward ${result.toward.name}.` : ""}</p>
              {result.spread >= 2 && <p className="mt-3 rounded-md border border-ember-500/40 bg-ember-500/10 px-3 py-2 text-sm text-ember-700">Your maturity is uneven (a spread of {result.spread} levels). The weakest dimension usually limits the whole system.</p>}
              <div className="my-4"><Radar scores={scores} /></div>
              <h2 className="text-sm font-semibold">Where to focus first</h2>
              <ol className="mt-2 space-y-3">
                {result.weakest.map(({ d, s }, i) => (
                  <li key={d.id} className="rounded-lg border border-line bg-paper p-3 text-sm">
                    <p className="font-medium">{i + 1}. {d.name} <span className="font-mono text-xs text-muted">level {s}</span></p>
                    <p className="mt-1 leading-6 text-fg/85">{s < 5 ? nextByLevel[s] : "Keep revisiting trade-offs; do not assume you are finished."}</p>
                    <Link href={d.read.href} className="mt-1 inline-block text-sky-700 underline underline-offset-4">Read: {d.read.label}</Link>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
        <details className="mt-4 rounded-xl border border-line bg-card p-5 text-sm">
          <summary className="cursor-pointer font-medium">How scoring works</summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-6 text-muted">
            <li>Each of seven dimensions is scored 1 to 5 using the descriptors from the <Link href="/articles/an-ia-maturity-model-for-the-ai-era" className="text-sky-700 underline underline-offset-4">maturity model article</Link>.</li>
            <li>The overall score is the plain average. The level shown is its whole-number part, so 3.8 reads as Level 3 (Defined) heading toward Level 4.</li>
            <li>Focus areas are the three lowest dimensions; ties are broken by the order shown.</li>
            <li>This is the author&rsquo;s synthesis, not an industry standard, and it is a self-assessment: it does not inspect your content. Use it to start a conversation, and back each score with evidence.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}
