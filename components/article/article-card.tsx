import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/content";
import { tracks } from "@/lib/tracks";
import { cn } from "@/lib/utils";
import { TrackPill } from "./track-pill";

export function ArticleCard({ a, showTrack = true, className }: { a: ArticleMeta; showTrack?: boolean; className?: string }) {
  const t = tracks[a.track];
  return (
    <Link href={`/articles/${a.slug}`} className={cn("group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <span className={cn("absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100", t.dot)} aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        {showTrack ? <TrackPill track={a.track} /> : <span className="font-mono text-[11px] text-muted">{String(a.order).padStart(2, "0")}</span>}
        <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-fg" aria-hidden="true" />
      </div>
      <h3 className="font-display mt-4 text-[1.3rem] font-semibold leading-snug tracking-tight">{a.title}</h3>
      <p className="mt-2.5 line-clamp-3 text-[15px] leading-7 text-muted">{a.description}</p>
      <p className="mt-auto pt-5 font-mono text-[11px] text-muted">{a.minutes} min read</p>
    </Link>
  );
}
