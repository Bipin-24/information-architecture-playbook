import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { formatDate, getAdjacent, getAllArticles, getArticle, getRelated } from "@/lib/content";
import { tracks } from "@/lib/tracks";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { TrackPill } from "@/components/article/track-pill";
import { Toc } from "@/components/article/toc";
import { ArticleCard } from "@/components/article/article-card";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}` },
    keywords: a.tags,
    openGraph: { type: "article", title: a.title, description: a.description, url: `/articles/${a.slug}`, modifiedTime: a.updated, authors: [site.author.name], tags: a.tags },
    twitter: { card: "summary_large_image", title: a.title, description: a.description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  const { prev, next } = getAdjacent(slug);
  const related = getRelated(slug);
  const t = tracks[a.track];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.description,
        dateModified: a.updated,
        author: { "@type": "Person", name: site.author.name, url: site.author.linkedin },
        publisher: { "@type": "Person", name: site.author.name },
        mainEntityOfPage: `${site.url}/articles/${a.slug}`,
        keywords: a.tags.join(", "),
        wordCount: a.words,
        citation: a.sources.map((s) => s.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: t.label, item: `${site.url}/tracks/${a.track}` },
          { "@type": "ListItem", position: 3, name: a.title, item: `${site.url}/articles/${a.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-12 text-white sm:pt-16">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-mist-dim">
            <Link href="/articles" className="hover:text-white">Articles</Link><span aria-hidden="true">/</span>
            <Link href={`/tracks/${a.track}`} className="hover:text-white">{t.label}</Link>
          </nav>
          <div className="mt-6"><TrackPill track={a.track} dark /></div>
          <h1 className="font-display mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl">{a.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">{a.description}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-mist-dim">
            <span>{a.minutes} min read</span><span aria-hidden="true">·</span>
            <span>{a.words.toLocaleString()} words</span><span aria-hidden="true">·</span>
            <span>Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time></span>
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:py-16">
        <div className="min-w-0">
          <aside aria-label="Key takeaways" className="max-w-[68ch] rounded-xl border border-line bg-card p-6 shadow-card">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber-700">Key takeaways</h2>
            <ul className="mt-3 space-y-2.5">
              {a.takeaways.map((k) => (
                <li key={k} className="flex gap-3 text-[15px] leading-7"><span className={`mt-2.5 size-1.5 shrink-0 rotate-45 ${t.dot}`} aria-hidden="true" />{k}</li>
              ))}
            </ul>
          </aside>

          <article id="article-body" className="prose-ia mt-10" dangerouslySetInnerHTML={{ __html: a.html }} />

          <section aria-labelledby="sources-h" className="mt-14 max-w-[68ch] border-t border-line pt-8">
            <h2 id="sources-h" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Sources and further reading</h2>
            <ul className="mt-4 space-y-2.5">
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1.5 text-[15px] text-sky-700 underline decoration-sky-700/30 underline-offset-4 hover:decoration-sky-700">
                    {s.title}<ArrowUpRight className="mt-1 size-3.5 shrink-0 opacity-60" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-muted">Facts are attributed to these sources in the text. Where a source is a research paper or vendor report, its figures describe its own test conditions and may not generalize. Interpretation and synthesis are the author&rsquo;s own.</p>
          </section>

          <nav aria-label="Previous and next article" className="mt-12 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link href={`/articles/${prev.slug}`} className="group rounded-xl border border-line bg-card p-5 transition-colors hover:border-amber-500">
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted"><ArrowLeft className="size-3.5" aria-hidden="true" /> Previous</span>
                <span className="font-display mt-2 block text-lg font-semibold leading-snug">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/articles/${next.slug}`} className="group rounded-xl border border-line bg-card p-5 text-right transition-colors hover:border-amber-500">
                <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">Next <ArrowRight className="size-3.5" aria-hidden="true" /></span>
                <span className="font-display mt-2 block text-lg font-semibold leading-snug">{next.title}</span>
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden lg:block"><div className="sticky top-28"><Toc items={a.toc} /></div></div>
      </Container>

      <section className="border-t border-line bg-paper-2 py-14" aria-labelledby="related-h">
        <Container>
          <h2 id="related-h" className="font-display text-2xl font-semibold">Keep reading</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
        </Container>
      </section>
    </>
  );
}
