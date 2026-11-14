import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";
import { timeline } from "@/lib/timeline";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How information architecture evolved",
  description: "A sourced timeline from the first web IA books to SKOS, SHACL, RAG, GraphRAG and the Model Context Protocol, showing how IA grew from sitemaps to machine readers.",
  alternates: { canonical: "/evolution" },
};

const era = { "Web IA": "border-amber-500/50 text-amber-700", "Standards & research": "border-sky-400/60 text-sky-700", "AI era": "border-ember-500/50 text-ember-700" } as const;

export default function EvolutionPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-amber-400">How IA evolved</Eyebrow>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">From sitemaps to machine readers, in dated milestones.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">Every entry was checked against the source it links to. The earliest dates are approximate where the sources are secondary, and the story of who coined what is deliberately hedged.</p>
        </Container>
      </section>
      <Container className="py-14">
        <ol className="relative max-w-3xl border-l border-line pl-8 sm:pl-10">
          {timeline.map((m, i) => (
            <li key={m.title + i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[41px] top-1.5 size-3 rounded-full border-2 border-paper bg-amber-500 sm:-left-[49px]" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-3xl font-semibold">{m.year}</p>
                <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider", era[m.era])}>{m.era}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold leading-snug">{m.title}</h2>
              <p className="mt-1.5 text-[15px] leading-7 text-muted">{m.body}</p>
              <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-sky-700 underline decoration-sky-700/30 underline-offset-4 hover:decoration-sky-700">
                Source: {m.source}<ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
