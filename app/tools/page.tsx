import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Gauge, ScanSearch } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Interactive IA tools",
  description: "Three browser-based tools: an IA maturity assessment, a chunking lab and a Markdown structure checker. Deterministic, private, and clearly labeled as heuristics.",
  alternates: { canonical: "/tools" },
};

const tools = [
  { href: "/tools/maturity-assessment", icon: Gauge, name: "IA maturity assessment", body: "Seven dimensions, five levels. Self-assess honestly, see a radar chart, and get the three areas to focus on first, each linked to the relevant article.", tag: "Self-assessment" },
  { href: "/tools/chunk-lab", icon: Boxes, name: "Chunk Lab", body: "Compare fixed-size, paragraph-based and heading-anchored chunking on your own text. Watch sentences get cut and see what context each chunk carries.", tag: "Simulation" },
  { href: "/tools/structure-checker", icon: ScanSearch, name: "Structure checker", body: "Paste Markdown and get a structural score with line-numbered findings: skipped headings, vague labels, huge sections, missing alt text.", tag: "Linter" },
];

export default function ToolsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-amber-400">Interactive tools</Eyebrow>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">Practice the ideas on real content.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">Everything runs in your browser. Nothing you paste is uploaded. The logic is deterministic and documented on each page, so you can see exactly why a result came out the way it did.</p>
        </Container>
      </section>
      <Container className="py-14">
        <ul className="grid gap-5 md:grid-cols-3">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-amber-400/25 text-amber-700"><t.icon className="size-5" aria-hidden="true" /></span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{t.tag}</span>
                </div>
                <h2 className="font-display mt-5 text-2xl font-semibold">{t.name}</h2>
                <p className="mt-2 text-[15px] leading-7 text-muted">{t.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
