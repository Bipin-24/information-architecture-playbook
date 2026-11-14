"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/markdown";
import { cn } from "@/lib/utils";

/** Scroll-spy table of contents plus a thin reading-progress bar. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const heads = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      // Active = the last heading whose top has passed the sticky-header line, so a spot between
      // two headings (deep link, fast scroll) still highlights the section you are inside.
      let current: string | null = null;
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= 120) current = h.id;
        else break;
      }
      setActive(current);
      const el = document.getElementById("article-body");
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        setProgress(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [items]);

  return (
    <>
      <div className="fixed inset-x-0 top-16 z-40 h-0.5 bg-transparent" aria-hidden="true">
        <div className="h-full origin-left bg-amber-500" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav aria-label="On this page" className="text-sm">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">On this page</p>
        <ul className="mt-4 space-y-0.5 border-l border-line">
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined}
                className={cn("-ml-px block border-l py-1.5 pr-2 leading-snug transition-colors", i.depth === 3 ? "pl-7 text-[13px]" : "pl-4", active === i.id ? "border-amber-500 font-medium text-fg" : "border-transparent text-muted hover:text-fg")}>
                {i.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
