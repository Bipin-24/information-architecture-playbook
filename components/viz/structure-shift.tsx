"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Signature visual: the SAME sixteen pieces of content, arranged three ways.
 * pile (no structure) -> hierarchy (organization + labeling) -> graph (typed relationships).
 * Positions are percentages of a 16:10 stage, so everything scales without recalculation.
 */
type Mode = "pile" | "hierarchy" | "graph";

type Item = { id: string; label: string; group: "product" | "support" | "company" | "header"; tree: [number, number]; graph: [number, number] };

const items: Item[] = [
  { id: "h-product", label: "Product", group: "header", tree: [17, 13], graph: [17, 13] },
  { id: "h-support", label: "Support", group: "header", tree: [50, 13], graph: [50, 13] },
  { id: "h-company", label: "Company", group: "header", tree: [83, 13], graph: [83, 13] },
  { id: "pricing", label: "Pricing", group: "product", tree: [17, 30], graph: [16, 24] },
  { id: "features", label: "Features", group: "product", tree: [17, 44], graph: [30, 38] },
  { id: "integrations", label: "Integrations", group: "product", tree: [17, 58], graph: [14, 54] },
  { id: "roadmap", label: "Roadmap", group: "product", tree: [17, 72], graph: [36, 14] },
  { id: "start", label: "Getting started", group: "support", tree: [50, 28], graph: [50, 32] },
  { id: "api", label: "API reference", group: "support", tree: [50, 41], graph: [66, 50] },
  { id: "trouble", label: "Troubleshooting", group: "support", tree: [50, 54], graph: [50, 70] },
  { id: "faq", label: "FAQ", group: "support", tree: [50, 67], graph: [30, 76] },
  { id: "release", label: "Release notes", group: "support", tree: [50, 80], graph: [82, 28] },
  { id: "about", label: "About", group: "company", tree: [83, 30], graph: [14, 86] },
  { id: "careers", label: "Careers", group: "company", tree: [83, 44], graph: [32, 92] },
  { id: "security", label: "Security", group: "company", tree: [83, 58], graph: [84, 70] },
  { id: "contact", label: "Contact", group: "company", tree: [83, 72], graph: [58, 90] },
];

const edges: [string, string, string][] = [
  ["pricing", "features", "describes"],
  ["features", "integrations", "includes"],
  ["features", "roadmap", "evolves in"],
  ["features", "start", "leads to"],
  ["start", "api", "requires"],
  ["api", "integrations", "powers"],
  ["api", "security", "governed by"],
  ["api", "release", "versioned in"],
  ["trouble", "api", "explains"],
  ["trouble", "faq", "links to"],
  ["faq", "start", "answers"],
  ["about", "careers", "includes"],
  ["about", "contact", "includes"],
  ["contact", "security", "reports to"],
];

// Deterministic "pile": scattered with slight rotation.
const pile = (i: number): { pos: [number, number]; rot: number } => ({
  pos: [12 + ((i * 37) % 76), 14 + ((i * 53) % 72)],
  rot: ((i * 29) % 26) - 13,
});

const groupStyle: Record<Item["group"], string> = {
  product: "border-amber-400/70 text-amber-300",
  support: "border-sky-400/70 text-sky-300",
  company: "border-ember-400/70 text-ember-300",
  header: "border-white/40 bg-white/10 text-white",
};

const copy: Record<Mode, { name: string; line: string }> = {
  pile: { name: "No structure", line: "Everything exists. Nothing tells you what belongs together, so every visit is a search through the pile." },
  hierarchy: { name: "Organization and labeling", line: "Grouping by a clear scheme and naming each group makes the content browsable. This is the classic IA move." },
  graph: { name: "Relationships made explicit", line: "Typed links (requires, governed by, explains) let people, retrieval and agents follow connections instead of guessing them." },
};

const order: Mode[] = ["pile", "hierarchy", "graph"];

export function StructureShift({ className }: { className?: string }) {
  const [picked, setMode] = useState<Mode>("pile");
  const [auto, setAuto] = useState(true);
  const reduce = !!useReducedMotion();
  // Reduced-motion users get the static, most informative arrangement and no autoplay.
  const autoOn = auto && !reduce;
  const mode: Mode = reduce && auto ? "hierarchy" : picked;
  const shown = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  // Start the cycle only when the visual is on screen; stop for good once the user chooses a mode.
  useEffect(() => {
    if (!autoOn) return;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { shown.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const id = setInterval(() => {
      if (!shown.current) return;
      setMode((m) => order[(order.indexOf(m) + 1) % order.length]);
    }, 4800);
    return () => { io.disconnect(); clearInterval(id); };
  }, [autoOn]);

  const pos = (it: Item, i: number): { x: number; y: number; r: number; o: number; s: number } => {
    if (mode === "pile") { const p = pile(i); return { x: p.pos[0], y: p.pos[1], r: it.group === "header" ? 0 : p.rot, o: it.group === "header" ? 0 : 1, s: it.group === "header" ? 0.6 : 1 }; }
    if (mode === "hierarchy") return { x: it.tree[0], y: it.tree[1], r: 0, o: 1, s: 1 };
    return { x: it.graph[0], y: it.graph[1], r: 0, o: it.group === "header" ? 0 : 1, s: it.group === "header" ? 0.6 : 1 };
  };

  const byId = Object.fromEntries(items.map((it) => [it.id, it]));

  return (
    <div className={className}>
      <div role="tablist" aria-label="Arrangement of the same content" className="mb-4 flex flex-wrap items-center gap-2">
        {order.map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => { setMode(m); setAuto(false); }}
            className={cn("rounded-md border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors", mode === m ? "border-amber-400 bg-amber-400 text-ink-950" : "border-ink-600 text-mist hover:border-mist-dim hover:text-white")}
          >
            {m === "pile" ? "1 · Pile" : m === "hierarchy" ? "2 · Hierarchy" : "3 · Graph"}
          </button>
        ))}
        {autoOn && <span className="ml-1 text-xs text-mist-dim">auto-playing</span>}
      </div>

      <div ref={box} className="relative w-full overflow-hidden rounded-xl border border-ink-600 bg-ink-900/80" style={{ aspectRatio: "16 / 10" }} role="img" aria-label={`Sixteen website content items shown as a ${copy[mode].name.toLowerCase()} arrangement`}>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(([a, b]) => {
            const A = byId[a].graph, B = byId[b].graph;
            return (
              <motion.line
                key={a + b}
                x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]}
                stroke="#f6b93b" strokeWidth="1.1" vectorEffect="non-scaling-stroke" strokeDasharray="4 3"
                initial={false}
                animate={{ opacity: mode === "graph" ? 0.55 : 0 }}
                transition={{ duration: 0.8, delay: mode === "graph" ? 0.5 : 0 }}
              />
            );
          })}
        </svg>

        {edges.map(([a, b, rel]) => {
          const A = byId[a].graph, B = byId[b].graph;
          return (
            <motion.span
              key={`l-${a}${b}`}
              className="pointer-events-none absolute hidden rounded bg-ink-900/90 px-1 font-mono text-[8.5px] leading-tight text-amber-300/90 sm:block sm:text-[9.5px]"
              style={{ left: `${(A[0] + B[0]) / 2}%`, top: `${(A[1] + B[1]) / 2}%`, translateX: "-50%", translateY: "-50%", whiteSpace: "nowrap" }}
              initial={false}
              animate={{ opacity: mode === "graph" ? 1 : 0 }}
              transition={{ duration: 0.6, delay: mode === "graph" ? 0.9 : 0 }}
            >
              {rel}
            </motion.span>
          );
        })}

        {items.map((it, i) => {
          const p = pos(it, i);
          return (
            <motion.div
              key={it.id}
              className={cn("absolute rounded-md border bg-ink-800 px-2 py-1 font-mono text-[9px] leading-none shadow-md sm:px-2.5 sm:py-1.5 sm:text-[11px]", groupStyle[it.group])}
              style={{ left: 0, top: 0, translateX: "-50%", translateY: "-50%", whiteSpace: "nowrap" }}
              initial={false}
              animate={{ left: `${p.x}%`, top: `${p.y}%`, rotate: p.r, opacity: p.o, scale: p.s }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 15, mass: 0.9, delay: i * 0.012 }}
            >
              {it.label}
            </motion.div>
          );
        })}

      </div>

      <div className="mt-4 min-h-[3.5rem]" aria-live="polite">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-400">{copy[mode].name}</p>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-mist">{copy[mode].line}</p>
      </div>
    </div>
  );
}
