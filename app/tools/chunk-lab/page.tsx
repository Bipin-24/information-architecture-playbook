import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/tool-shell";
import { ChunkLab } from "@/components/tools/chunk-lab";

export const metadata: Metadata = {
  title: "Chunk Lab",
  description: "See how fixed-size, paragraph-based and heading-anchored chunking behave on your own Markdown, and what difference heading context makes.",
  alternates: { canonical: "/tools/chunk-lab" },
};

export default function Page() {
  return (
    <ToolShell eyebrow="Tool 02 · Simulation" title="Chunk Lab" lede="Chunk boundaries decide what travels together into a retrieval index. Change the strategy and watch what happens to sentences and context."
      note="Sizes are in words, not tokens, and the strategies are simplified so you can see their behavior. This is not a production chunker, and the context option is a rule-based stand-in for model-generated context."
      learn={[{ label: "IA for RAG: chunking, metadata and context", href: "/articles/ia-for-rag-chunking-metadata-and-context" }, { label: "Content modeling and metadata", href: "/articles/content-modeling-and-metadata" }, { label: "Evaluating IA in the AI era", href: "/articles/evaluating-ia-in-the-ai-era" }]}>
      <ChunkLab />
    </ToolShell>
  );
}
