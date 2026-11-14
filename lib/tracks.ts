export type TrackId = "foundations" | "practice" | "ai-era";

export const tracks: Record<
  TrackId,
  { id: TrackId; label: string; kicker: string; blurb: string; text: string; bg: string; border: string; dot: string; onDark: string }
> = {
  foundations: {
    id: "foundations",
    label: "Foundations",
    kicker: "What IA is",
    blurb: "The vocabulary, principles and mental models every practitioner builds on.",
    text: "text-amber-700",
    bg: "bg-amber-400/15",
    border: "border-amber-500/40",
    dot: "bg-amber-500",
    onDark: "text-amber-400",
  },
  practice: {
    id: "practice",
    label: "Practice",
    kicker: "How to do it well",
    blurb: "Methods, deliverables and best practices for structuring real information environments.",
    text: "text-sky-700",
    bg: "bg-sky-400/15",
    border: "border-sky-400/50",
    dot: "bg-sky-400",
    onDark: "text-sky-400",
  },
  "ai-era": {
    id: "ai-era",
    label: "The AI era",
    kicker: "How IA is evolving",
    blurb: "Retrieval, RAG, graphs and agents: what changes when machines are readers too.",
    text: "text-ember-700",
    bg: "bg-ember-500/12",
    border: "border-ember-500/40",
    dot: "bg-ember-500",
    onDark: "text-ember-400",
  },
};

export const trackOrder: TrackId[] = ["foundations", "practice", "ai-era"];
export const isTrack = (v: string): v is TrackId => v in tracks;
