import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Gauge, ScanSearch } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";
import { StructureShift } from "@/components/viz/structure-shift";
import { ArticleCard } from "@/components/article/article-card";
import { getAllArticles, getTrackArticles } from "@/lib/content";
import { tracks, trackOrder } from "@/lib/tracks";
import { timeline } from "@/lib/timeline";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const systems = [
  ["Organization", "How content is grouped and ordered."],
  ["Labeling", "The words that name things."],
  ["Navigation", "How people move through it."],
  ["Search", "How people ask for it directly."],
] as const;

const thenNow = [
  ["The page", "The chunk, the entity and the tool", "The unit of content is no longer only a page a person opens."],
  ["Navigation menus", "Retrieval, filters and tool catalogs", "Machines find content by query and metadata, not by clicking through a menu."],
  ["Sitemap", "Knowledge graph or content model", "Relationships move from layout into data that systems can traverse."],
  ["Labels and tags", "Controlled vocabularies and metadata fields", "The same discipline, but now a retriever depends on it to filter."],
  ["Findability testing", "Tree tests plus retrieval evaluation", "You still test with people, and now also with question sets and metrics."],
  ["Content governance", "Freshness, versioning and deprecation", "A stale page misleads one reader; stale context can mislead every answer."],
] as const;

const paths = [
  { title: "New to IA", blurb: "A first read, in order.", links: ["what-is-information-architecture", "the-four-systems-of-ia", "eight-principles-of-information-architecture", "information-architecture-process"] },
  { title: "Documentation and knowledge teams", blurb: "Structure that serves readers and retrieval.", links: ["documentation-information-architecture", "content-modeling-and-metadata", "search-and-findability", "ia-governance-and-measurement"] },
  { title: "AI and RAG builders", blurb: "IA decisions hiding in your pipeline.", links: ["why-ia-matters-more-in-the-ai-era", "ia-for-rag-chunking-metadata-and-context", "knowledge-graphs-and-ontologies-for-ai", "evaluating-ia-in-the-ai-era"] },
] as const;

export default function Home() {
  const all = getAllArticles();
  const bySlug = Object.fromEntries(all.map((a) => [a.slug, a]));
  const pillars = ["what-is-information-architecture", "information-architecture-process", "why-ia-matters-more-in-the-ai-era", "ia-for-rag-chunking-metadata-and-context"].map((s) => bySlug[s]).filter(Boolean);
  const words = all.reduce((a, x) => a + x.words, 0);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, description: site.description, inLanguage: "en", publisher: { "@id": `${site.url}/#author` } },
      { "@type": "Person", "@id": `${site.url}/#author`, name: site.author.name, jobTitle: site.author.role, url: site.author.portfolio, sameAs: [site.author.linkedin, site.author.github, site.author.portfolio], knowsAbout: ["Information architecture", "Taxonomy", "Content modeling", "Knowledge graphs", "Retrieval-augmented generation"] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink-950 pb-20 pt-16 text-white sm:pt-24">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute left-1/2 top-[-10%] -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-amber-400/[0.09] blur-[130px]" aria-hidden="true" />
        <Container>
          <Eyebrow className="animate-rise text-amber-400">A field guide for people who structure knowledge</Eyebrow>
          <h1 className="font-display animate-rise mt-5 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.04] [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]">
            Information architecture, from sitemaps to <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-ember-400 bg-clip-text italic text-transparent">the AI era.</span>
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-pretty text-lg leading-8 text-mist [animation-delay:160ms]">
            What IA is, how to practice it well, and how it is changing now that the reader is also a retriever, a model or an agent. {all.length} researched articles, three interactive tools, and no hype.
          </p>
          <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Link href="/articles/what-is-information-architecture" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-amber-300">
              Start with the fundamentals <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/tracks/ai-era" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-ink-500 px-6 text-[15px] font-medium text-white transition-colors hover:border-amber-400/70 hover:bg-white/5">
              Explore IA in the AI era
            </Link>
          </div>

          <div className="animate-rise mt-14 [animation-delay:340ms]">
            <StructureShift />
          </div>
        </Container>
      </section>

      {/* WHAT IS IA */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="what-h">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow className="text-amber-700">What it is</Eyebrow>
            <h2 id="what-h" className="font-display mt-4 text-balance text-3xl font-semibold sm:text-5xl">The structural design of shared information environments.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              IA decides how information is organized, labeled, connected and searched so people can find it, understand it and act on it. It is invisible when it works and obvious when it does not. Jorge Arango describes the work as three activities: organize information, set the context, and plan for change.
            </p>
            <Link href="/articles/what-is-information-architecture" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-4 hover:decoration-sky-700">
              Read the full definition <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card sm:grid-cols-2" aria-label="The four systems of IA">
            {systems.map(([n, d], i) => (
              <li key={n} className="bg-card p-6">
                <span className="font-mono text-xs text-amber-700">0{i + 1}</span>
                <h3 className="font-display mt-2 text-xl font-semibold">{n}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* TRACKS */}
      <section className="bg-paper-2 py-20 sm:py-28" aria-labelledby="tracks-h">
        <Container>
          <Eyebrow className="text-amber-700">Three tracks</Eyebrow>
          <h2 id="tracks-h" className="font-display mt-4 max-w-2xl text-balance text-3xl font-semibold sm:text-5xl">Read it in the order that suits you.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {trackOrder.map((id) => {
              const t = tracks[id];
              const list = getTrackArticles(id);
              return (
                <div key={id} className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card p-7 shadow-card">
                  <span className={cn("absolute inset-x-0 top-0 h-1.5", t.dot)} aria-hidden="true" />
                  <p className={cn("font-mono text-xs uppercase tracking-[0.14em]", t.text)}>{t.kicker}</p>
                  <h3 className="font-display mt-2 text-3xl font-semibold">{t.label}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">{t.blurb}</p>
                  <ol className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {list.slice(0, 4).map((a) => (
                      <li key={a.slug}><Link href={`/articles/${a.slug}`} className="text-[15px] leading-snug text-fg/90 underline decoration-line underline-offset-4 hover:decoration-fg">{a.title}</Link></li>
                    ))}
                  </ol>
                  <Link href={`/tracks/${id}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-semibold text-fg">
                    All {list.length} articles <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* THE AI-ERA SHIFT */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="shift-h">
        <div className="bg-dots-ink absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-ember-400">What changes in the AI era</Eyebrow>
          <h2 id="shift-h" className="font-display mt-4 max-w-3xl text-balance text-3xl font-semibold sm:text-5xl">The job stays. The reader, the unit and the failure modes change.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">
            Retrieval, chunking, metadata, vocabularies, graphs and tool descriptions are information architecture decisions under new names. Here is how the classic concerns map across (the author&rsquo;s synthesis, developed in <Link href="/articles/why-ia-matters-more-in-the-ai-era" className="text-amber-300 underline underline-offset-4">this article</Link>).
          </p>
          <div className="mt-12 overflow-hidden rounded-2xl border border-ink-600">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Classic IA concerns and their AI-era counterparts</caption>
              <thead>
                <tr className="bg-ink-800 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                  <th scope="col" className="px-5 py-3 font-medium">Classic IA</th>
                  <th scope="col" className="px-5 py-3 font-medium text-amber-400">AI-era counterpart</th>
                  <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Why it matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700 bg-ink-900/60">
                {thenNow.map(([a, b, c]) => (
                  <tr key={a}>
                    <th scope="row" className="px-5 py-4 text-left font-medium text-white">{a}</th>
                    <td className="px-5 py-4 text-amber-300">{b}<span className="mt-1 block text-mist md:hidden">{c}</span></td>
                    <td className="hidden px-5 py-4 text-mist md:table-cell">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* PILLARS */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="pillars-h">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-amber-700">Start here</Eyebrow>
              <h2 id="pillars-h" className="font-display mt-4 text-3xl font-semibold sm:text-5xl">The four pillar articles.</h2>
            </div>
            <Link href="/articles" className="inline-flex items-center gap-1.5 text-[15px] font-semibold">Browse all {all.length} <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">{pillars.map((a) => <ArticleCard key={a.slug} a={a} className="p-7" />)}</div>
        </Container>
      </section>

      {/* TOOLS */}
      <section className="bg-paper-2 py-20 sm:py-28" aria-labelledby="tools-h">
        <Container>
          <Eyebrow className="text-amber-700">Interactive tools</Eyebrow>
          <h2 id="tools-h" className="font-display mt-4 max-w-3xl text-balance text-3xl font-semibold sm:text-5xl">Try the ideas on your own content.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">Three deterministic tools that run in your browser. They are teaching aids and heuristics, not audits, and nothing you paste leaves your device.</p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { href: "/tools/maturity-assessment", icon: Gauge, title: "IA maturity assessment", body: "Score seven dimensions of IA maturity, from content structure to evaluation, and see where to focus first." },
              { href: "/tools/chunk-lab", icon: Boxes, title: "Chunk Lab", body: "Paste a document and watch how fixed-size, paragraph and heading-anchored chunking behave, with and without context." },
              { href: "/tools/structure-checker", icon: ScanSearch, title: "Structure checker", body: "Lint Markdown for skipped headings, vague labels, oversized sections and missing alt text, with line-level fixes." },
            ].map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid size-11 place-items-center rounded-lg bg-amber-400/25 text-amber-700"><t.icon className="size-5" aria-hidden="true" /></span>
                  <h3 className="font-display mt-5 text-2xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">{t.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">Open tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* READING PATHS */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="paths-h">
        <Container>
          <Eyebrow className="text-amber-700">Reading paths</Eyebrow>
          <h2 id="paths-h" className="font-display mt-4 text-3xl font-semibold sm:text-5xl">Not sure where to begin?</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {paths.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-card p-7 shadow-card">
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{p.blurb}</p>
                <ol className="mt-5 space-y-3">
                  {p.links.map((s, i) => bySlug[s] && (
                    <li key={s} className="flex gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink-950 font-mono text-[11px] text-white" aria-hidden="true">{i + 1}</span>
                      <Link href={`/articles/${s}`} className="text-[15px] leading-snug underline decoration-line underline-offset-4 hover:decoration-fg">{bySlug[s].title}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TIMELINE */}
      <section className="bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="time-h">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-amber-400">How IA evolved</Eyebrow>
              <h2 id="time-h" className="font-display mt-4 max-w-2xl text-balance text-3xl font-semibold sm:text-5xl">From web sites to machine readers.</h2>
            </div>
            <Link href="/evolution" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-amber-300">Full timeline <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-600 bg-ink-600 sm:grid-cols-2 lg:grid-cols-3">
            {[timeline[0], timeline[3], timeline[4], timeline[8], timeline[9], timeline[11]].map((m) => (
              <li key={m.title} className="bg-ink-900 p-6">
                <p className="font-display text-3xl font-semibold text-amber-400">{m.year}</p>
                <h3 className="mt-2 text-[15px] font-semibold leading-snug">{m.title}</h3>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-mist">{m.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CLOSING */}
      <section className="bg-paper py-20 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-balance text-3xl font-semibold sm:text-4xl">Built from primary sources, with the uncertainty left in.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
              {words.toLocaleString()} words across {all.length} articles, each attributed to the papers, standards and practitioners it draws on. Where evidence is thin (llms.txt, AI-search optimization, much of what is called &ldquo;GEO&rdquo;), the articles say so plainly.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-7 shadow-card">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-700">About the author</p>
            <p className="font-display mt-2 text-2xl font-semibold">{site.author.name}</p>
            <p className="mt-1 text-[15px] text-muted">Information architect with 14+ years of experience in information architecture and knowledge management.</p>
            <Link href="/about" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">About the playbook <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
