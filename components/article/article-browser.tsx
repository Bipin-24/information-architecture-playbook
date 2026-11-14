"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ArticleMeta } from "@/lib/content";
import { tracks, trackOrder, type TrackId } from "@/lib/tracks";
import { cn } from "@/lib/utils";
import { ArticleCard } from "./article-card";

/** Client-side filter over a server-rendered list: the full list is in the HTML for crawlers. */
export function ArticleBrowser({ articles }: { articles: ArticleMeta[] }) {
  const [track, setTrack] = useState<TrackId | "all">("all");
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    return articles.filter((a) => (track === "all" || a.track === track) && tokens.every((t) => (a.title + " " + a.description + " " + a.tags.join(" ")).toLowerCase().includes(t)));
  }, [articles, track, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by track" className="flex flex-wrap gap-2">
          {(["all", ...trackOrder] as const).map((t) => (
            <button key={t} type="button" aria-pressed={track === t} onClick={() => setTrack(t)}
              className={cn("rounded-full border px-4 py-1.5 text-sm transition-colors", track === t ? "border-ink-950 bg-ink-950 text-white" : "border-line bg-card text-muted hover:border-ink-600 hover:text-fg")}>
              {t === "all" ? `All (${articles.length})` : `${tracks[t].label} (${articles.filter((a) => a.track === t).length})`}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Filter articles</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by keyword…" className="h-11 w-full rounded-lg border border-line bg-card pl-9 pr-3 text-sm focus:border-sky-400 focus:outline-none" />
        </label>
      </div>
      <p className="mt-3 text-sm text-muted" role="status">{shown.length} article{shown.length === 1 ? "" : "s"}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => <ArticleCard key={a.slug} a={a} />)}
      </div>
      {shown.length === 0 && <p className="mt-10 rounded-xl border border-dashed border-line p-10 text-center text-muted">No articles match. Try a different keyword or track.</p>}
    </div>
  );
}
