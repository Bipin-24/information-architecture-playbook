import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";
import { getTrackArticles } from "@/lib/content";
import { isTrack, tracks, trackOrder } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ track: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => trackOrder.map((track) => ({ track }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track } = await params;
  if (!isTrack(track)) return {};
  const t = tracks[track];
  return { title: `${t.label}: ${t.kicker}`, description: t.blurb, alternates: { canonical: `/tracks/${track}` } };
}

export default async function TrackPage({ params }: Props) {
  const { track } = await params;
  if (!isTrack(track)) notFound();
  const t = tracks[track];
  const list = getTrackArticles(track);
  const minutes = list.reduce((a, x) => a + x.minutes, 0);
  const others = trackOrder.filter((x) => x !== track);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className={t.onDark}>Track · {t.kicker}</Eyebrow>
          <h1 className="font-display mt-4 text-4xl font-semibold sm:text-6xl">{t.label}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">{t.blurb}</p>
          <p className="mt-6 font-mono text-xs text-mist-dim">{list.length} articles · about {minutes} minutes of reading</p>
        </Container>
      </section>

      <Container className="py-14">
        <ol className="relative space-y-0 border-l border-line pl-8 sm:pl-10">
          {list.map((a, i) => (
            <li key={a.slug} className="relative pb-10 last:pb-0">
              <span className={cn("absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border-2 border-paper font-mono text-[9px] font-bold text-ink-950 sm:-left-[49px]", t.dot)} aria-hidden="true">{i + 1}</span>
              <Link href={`/articles/${a.slug}`} className="group block rounded-xl border border-line bg-card p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight">{a.title}</h2>
                  <ArrowRight className="mt-1.5 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">{a.description}</p>
                <ul className="mt-4 flex flex-wrap items-center gap-2">
                  <li className="font-mono text-[11px] text-muted">{a.minutes} min read</li>
                  {a.tags.slice(0, 3).map((g) => <li key={g} className="rounded-md bg-paper-2 px-2 py-0.5 text-xs text-muted">{g}</li>)}
                </ul>
              </Link>
            </li>
          ))}
        </ol>
      </Container>

      <section className="border-t border-line bg-paper-2 py-14">
        <Container>
          <h2 className="font-display text-2xl font-semibold">Continue to another track</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((o) => (
              <Link key={o} href={`/tracks/${o}`} className="group rounded-xl border border-line bg-card p-6 shadow-card transition-colors hover:border-amber-500">
                <p className={cn("font-mono text-xs uppercase tracking-[0.14em]", tracks[o].text)}>{tracks[o].kicker}</p>
                <p className="font-display mt-2 text-2xl font-semibold">{tracks[o].label}</p>
                <p className="mt-2 text-[15px] leading-7 text-muted">{tracks[o].blurb}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
