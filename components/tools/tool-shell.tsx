import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";

export function ToolShell({ eyebrow, title, lede, note, learn, children }: { eyebrow: string; title: string; lede: string; note: string; learn: { label: string; href: string }[]; children: React.ReactNode }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-12 pt-12 text-white sm:pt-16">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-mist-dim hover:text-white"><ArrowLeft className="size-3.5" aria-hidden="true" /> All tools</Link>
          <Eyebrow className="mt-7 text-amber-400">{eyebrow}</Eyebrow>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-mist">{lede}</p>
          <p className="mt-7 flex max-w-2xl items-start gap-3 rounded-lg border border-amber-400/35 bg-amber-400/[0.07] px-4 py-3 text-sm leading-6 text-amber-200">
            <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span><strong className="font-medium text-white">Teaching aid, not an audit.</strong> {note}</span>
          </p>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">{children}</Container>
      <section className="border-t border-line bg-paper-2 py-10">
        <Container>
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber-700">Go deeper</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {learn.map((l) => <li key={l.href}><Link href={l.href} className="text-[15px] text-sky-700 underline decoration-sky-700/30 underline-offset-4 hover:decoration-sky-700">{l.label}</Link></li>)}
          </ul>
        </Container>
      </section>
    </>
  );
}
