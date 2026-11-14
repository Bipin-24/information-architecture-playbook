import { tracks, type TrackId } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export function TrackPill({ track, className, dark }: { track: TrackId; className?: string; dark?: boolean }) {
  const t = tracks[track];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em]", dark ? "border-white/20 bg-white/5 " + t.onDark : cn(t.border, t.bg, t.text), className)}>
      <span className={cn("size-1.5 rounded-full", t.dot)} aria-hidden="true" />
      {t.label}
    </span>
  );
}
