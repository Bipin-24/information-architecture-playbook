"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Entry = { t: string; d: string; u: string; k: string; g?: string[]; x?: string };

const KIND_LABEL: Record<string, string> = { article: "Article", glossary: "Glossary", tool: "Tool", page: "Page" };

function score(e: Entry, tokens: string[]) {
  const title = e.t.toLowerCase(), desc = e.d.toLowerCase(), tags = (e.g ?? []).join(" ").toLowerCase(), body = (e.x ?? "").toLowerCase();
  let s = 0;
  for (const t of tokens) {
    let hit = false;
    if (title.includes(t)) { s += title.startsWith(t) ? 12 : 8; hit = true; }
    if (tags.includes(t)) { s += 4; hit = true; }
    if (desc.includes(t)) { s += 3; hit = true; }
    if (body.includes(t)) { s += 1; hit = true; }
    if (!hit) return 0; // every word must match somewhere
  }
  return s;
}

/** Command-palette search over a build-time JSON index. Opens with / or Ctrl/Cmd+K. */
export function SearchButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "") || (e.target as HTMLElement)?.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    document.body.style.overflow = "hidden";
    if (!index && !error) {
      fetch("/search-index.json").then((r) => (r.ok ? r.json() : Promise.reject())).then(setIndex).catch(() => setError(true));
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, index, error]);

  const results = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!index || tokens.length === 0) return [];
    return index.map((e) => ({ e, s: score(e, tokens) })).filter((r) => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 8).map((r) => r.e);
  }, [q, index]);

  const go = (u: string) => { close(); router.push(u); };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the playbook"
        className={cn("inline-flex h-9 items-center gap-2 rounded-md border border-ink-600 bg-white/[0.04] px-3 text-sm text-mist transition-colors hover:border-amber-400/60 hover:text-white", className)}
      >
        <SearchIcon className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="ml-1 hidden rounded border border-ink-600 px-1.5 font-mono text-[10px] text-mist-dim sm:inline">/</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink-950/70 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div role="dialog" aria-modal="true" aria-label="Search" className="w-full max-w-xl overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-ink-600 px-4">
              <SearchIcon className="size-4 text-mist-dim" aria-hidden="true" />
              <input
                ref={input}
                value={q}
                onChange={(e) => { setQ(e.target.value); setActive(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
                  else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                  else if (e.key === "Enter" && results[active]) go(results[active].u);
                }}
                placeholder="Search articles, terms and tools…"
                aria-label="Search query"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `sr-${active}` : undefined}
                className="h-14 w-full bg-transparent text-[15px] text-white placeholder:text-mist-dim focus:outline-none"
              />
              <kbd className="rounded border border-ink-600 px-1.5 py-0.5 font-mono text-[10px] text-mist-dim">esc</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2" id="search-results" role="listbox" aria-label="Results">
              {error && <p className="px-3 py-6 text-center text-sm text-mist-dim">Search is unavailable right now. Try the Articles page.</p>}
              {!error && !index && <p className="px-3 py-6 text-center text-sm text-mist-dim" role="status">Loading…</p>}
              {index && !q.trim() && <p className="px-3 py-6 text-center text-sm text-mist-dim">Type to search {index.length} entries.</p>}
              {index && q.trim() && results.length === 0 && <p className="px-3 py-6 text-center text-sm text-mist-dim" role="status">No results for “{q}”.</p>}
              {results.map((r, i) => (
                <button
                  key={r.u}
                  id={`sr-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.u)}
                  className={cn("flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left", i === active ? "bg-ink-700" : "")}
                >
                  <span className="mt-0.5 w-16 shrink-0 font-mono text-[10px] uppercase tracking-wider text-amber-400">{KIND_LABEL[r.k] ?? r.k}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">{r.t}</span>
                    <span className="mt-0.5 line-clamp-1 block text-xs text-mist-dim">{r.d}</span>
                  </span>
                  {i === active && <CornerDownLeft className="mt-1 size-3.5 shrink-0 text-mist-dim" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
