import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { glossary, glossaryGroups } from "@/lib/glossary";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossary of IA and AI-retrieval terms",
  description: `${glossary.length} plain-language definitions of information architecture, taxonomy, semantics and AI retrieval terms, each linked to the article that explains it.`,
  alternates: { canonical: "/glossary" },
};

const id = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function GlossaryPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Information architecture and AI retrieval glossary",
    url: `${site.url}/glossary`,
    hasDefinedTerm: glossary.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.definition, url: `${site.url}/glossary#${id(g.term)}` })),
  };
  const letters = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-amber-400">Glossary</Eyebrow>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">{glossary.length} terms, defined plainly.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">The shared vocabulary of IA, plus the AI-retrieval terms that now sit alongside it. Each term links to the article that explains it in depth.</p>
        </Container>
      </section>
      <Container className="grid gap-12 py-14 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav aria-label="Glossary groups" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Jump to</p>
            <ul className="mt-4 space-y-2 border-l border-line text-sm">
              {glossaryGroups.map((g) => <li key={g}><a href={`#${id(g)}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-amber-500 hover:text-fg">{g}</a></li>)}
            </ul>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Letters</p>
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-muted">{letters.join(" ")}</p>
          </div>
        </nav>
        <div className="space-y-14">
          {glossaryGroups.map((g) => (
            <section key={g} id={id(g)} aria-labelledby={`${id(g)}-h`} className="scroll-mt-24">
              <h2 id={`${id(g)}-h`} className="font-display text-3xl font-semibold">{g}</h2>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {glossary.filter((t) => t.group === g).map((t) => (
                  <div key={t.term} id={id(t.term)} className="grid gap-2 py-6 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-8 scroll-mt-24">
                    <dt className="font-display text-xl font-semibold leading-snug">{t.term}</dt>
                    <dd>
                      <p className="text-[15px] leading-7 text-fg/90">{t.definition}</p>
                      {t.see && <p className="mt-2 text-sm">{t.see.map((s) => <Link key={s.href} href={s.href} className="mr-4 text-sky-700 underline decoration-sky-700/30 underline-offset-4 hover:decoration-sky-700">{s.label}</Link>)}</p>}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
