import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { site } from "@/lib/site";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the playbook",
  description: "Who writes the Information Architecture Playbook, how the articles are researched and sourced, and what to expect from the tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const all = getAllArticles();
  const links = [["LinkedIn", site.author.linkedin], ["GitHub", site.author.github], ["Portfolio", site.author.portfolio], ["Source code for this site", site.repo]] as const;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-amber-400">About</Eyebrow>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">A practitioner&rsquo;s guide, sourced like a research note.</h1>
        </Container>
      </section>
      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="prose-ia">
          <p>The Information Architecture Playbook explains what information architecture is, how to practice it well, and how it is changing now that the people reading your content are joined by retrievers, models and agents.</p>
          <h2>Who writes it</h2>
          <p><strong>{site.author.name}</strong> is an information architect with 14+ years of experience in information architecture and knowledge management. The playbook comes from that practice, checked against the published sources cited in each article.</p>
          <h2>How the articles are made</h2>
          <ul>
            <li><strong>Primary sources first.</strong> Facts are traced to the book, paper, standard or documentation they come from, and each article lists its sources.</li>
            <li><strong>Attribution with conditions.</strong> A research result is reported with the conditions it was measured under, never as a general rule.</li>
            <li><strong>Uncertainty stays in.</strong> Where evidence is thin, such as llms.txt or AI-search optimization, the articles say so.</li>
            <li><strong>No invented evidence.</strong> There are no made-up statistics, client stories or testimonials. Examples are labeled fictional.</li>
            <li><strong>Synthesis is labeled.</strong> The maturity model, the classic-to-AI mapping and the role scenarios are the author&rsquo;s own framing, not industry standards.</li>
          </ul>
          <p>The site has {all.length} articles. A build-time check rejects any article with broken internal links, invalid metadata, or a source that was not verified.</p>
          <h2>The tools</h2>
          <p>The <Link href="/tools">interactive tools</Link> are deterministic teaching aids that run in your browser. Nothing you enter is uploaded. They are heuristics, not audits, and each page says what its rules are.</p>
          <h2>Corrections</h2>
          <p>If you spot an error or a claim that overreaches its source, please open an issue on the <a href={site.repo} target="_blank" rel="noopener noreferrer">repository</a>.</p>
        </div>
        <aside aria-label="Links" className="h-fit rounded-2xl border border-line bg-card p-6 shadow-card">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-700">Find the author</p>
          <ul className="mt-4 space-y-3">
            {links.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-4 hover:decoration-sky-700">{l}</a></li>)}
          </ul>
        </aside>
      </Container>
    </>
  );
}
