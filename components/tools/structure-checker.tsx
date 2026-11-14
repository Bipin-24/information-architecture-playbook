"use client";

import { useMemo, useState } from "react";
import { checkStructure, SAMPLE_BAD, type Severity } from "@/lib/structure-check";
import { SAMPLE_DOC } from "@/lib/chunking";
import { cn } from "@/lib/utils";

const sev: Record<Severity, string> = {
  high: "bg-ember-500/12 text-ember-700 border-ember-500/40",
  medium: "bg-amber-400/25 text-amber-700 border-amber-500/40",
  low: "bg-sky-400/15 text-sky-700 border-sky-400/50",
};

export function StructureChecker() {
  const [text, setText] = useState(SAMPLE_BAD);
  const empty = text.trim() === "";
  const r = useMemo(() => checkStructure(text), [text]);
  const color = r.score >= 85 ? "text-emerald-700" : r.score >= 65 ? "text-amber-700" : "text-ember-700";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="md" className="font-mono text-xs uppercase tracking-[0.14em] text-amber-700">Markdown to check</label>
          <div className="flex gap-3 text-xs">
            <button type="button" onClick={() => setText(SAMPLE_BAD)} className="text-sky-700 underline underline-offset-4">Load flawed sample</button>
            <button type="button" onClick={() => setText(`---\ntitle: Configuring single sign-on\ndescription: How administrators set up SSO for a workspace.\ntopic_type: task\nproduct: Orbit\nversion: "4.2"\nowner: docs-team\n---\n${SAMPLE_DOC}`)} className="text-sky-700 underline underline-offset-4">Load cleaner sample</button>
          </div>
        </div>
        <textarea id="md" value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} className="mt-2 h-[480px] w-full resize-y rounded-xl border border-line bg-card p-4 font-mono text-[12.5px] leading-6 shadow-card focus:border-sky-400 focus:outline-none" />
        <p className="mt-2 text-xs leading-5 text-muted">Runs entirely in your browser. Nothing is uploaded.</p>
      </div>

      <div aria-live="polite">
        {empty ? (
          <div className="rounded-xl border border-dashed border-line bg-card p-10 text-center text-muted">Paste or type some Markdown to see its structure score and findings.</div>
        ) : (<>
        <div className="rounded-xl border border-line bg-card p-6 shadow-card">
          <div className="flex items-end gap-4">
            <p className={cn("font-display text-6xl font-semibold", color)}>{r.score}<span className="text-2xl text-muted">/100</span></p>
            <p className="pb-2 text-base font-semibold">{r.band}</p>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
            {[["Headings", r.headings.length], ["Sections", r.sections.length], ["Findings", r.findings.length]].map(([k, v]) => (
              <div key={String(k)} className="rounded-lg bg-paper-2 p-3"><dt className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</dt><dd className="mt-0.5 text-xl font-semibold">{v}</dd></div>
            ))}
          </dl>
        </div>

        {r.headings.length > 0 && (
          <details className="mt-4 rounded-xl border border-line bg-card p-4 text-sm" open>
            <summary className="cursor-pointer font-medium">Outline as a machine would see it</summary>
            <ul className="mt-3 space-y-1 font-mono text-[12px]">
              {r.headings.map((h, i) => (<li key={i} style={{ paddingLeft: `${(h.level - 1) * 14}px` }} className="text-fg/85"><span className="text-muted">H{h.level}</span> {h.text}</li>))}
            </ul>
          </details>
        )}

        <h2 className="mt-5 text-sm font-semibold">{r.findings.length ? "Findings" : "No findings. Nice work."}</h2>
        <ul className="mt-2 space-y-2.5">
          {r.findings.map((f, i) => (
            <li key={i} className={cn("rounded-lg border px-3.5 py-3 text-sm", sev[f.severity])}>
              <p className="flex flex-wrap items-center gap-2"><span className="font-mono text-[10px] font-semibold uppercase">{f.severity}</span><span className="font-mono text-[11px] opacity-80">line {f.line}</span><span className="font-medium text-fg">{f.message}</span></p>
              <p className="mt-1 text-fg/80"><span className="font-medium">Fix:</span> {f.fix}</p>
            </li>
          ))}
        </ul>

        <details className="mt-5 rounded-xl border border-line bg-card p-5 text-sm">
          <summary className="cursor-pointer font-medium">How the score works</summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-6 text-muted">
            <li>Start at 100. Each finding deducts points by severity (high 12, medium 6, low 3), capped per rule so one repeated issue cannot zero the page.</li>
            <li>The rules are rules of thumb chosen for this tool (for example, a section over 350 words with no subheading). They are not a standard and not a guarantee about any search or AI system.</li>
            <li>Passing does not make content good. It only removes common structural obstacles to scanning, navigation and chunking.</li>
          </ul>
        </details>
        </>)}
      </div>
    </div>
  );
}
