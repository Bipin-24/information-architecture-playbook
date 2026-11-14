import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";
import { CopyButton } from "@/components/layout/copy-button";
import { resources, templates } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Templates and reading list",
  description: "Copy-ready IA templates (audit checklist, content model, taxonomy governance, AI-ready page, tree-test tasks) and a curated reading list of books, standards and research.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-amber-400">Resources</Eyebrow>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">Templates to copy, sources to read.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">Five working templates in Markdown, and a reading list limited to things that were checked: the standard books, the methods articles, the standards, and the AI-era papers the articles cite.</p>
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="font-display text-3xl font-semibold">Templates</h2>
        <div className="mt-8 space-y-6">
          {templates.map((t) => (
            <details key={t.id} className="group rounded-2xl border border-line bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6">
                <span>
                  <span className="font-display block text-xl font-semibold">{t.title}</span>
                  <span className="mt-1 block text-[15px] text-muted">{t.use}</span>
                </span>
                <span className="font-mono text-xs text-sky-700 group-open:hidden">View</span>
                <span className="hidden font-mono text-xs text-sky-700 group-open:inline">Hide</span>
              </summary>
              <div className="border-t border-line p-6">
                <div className="mb-3 flex justify-end"><CopyButton text={t.body} label={t.title} /></div>
                <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg bg-ink-900 p-5 font-mono text-[12.5px] leading-6 text-mist" tabIndex={0}>{t.body}</pre>
              </div>
            </details>
          ))}
        </div>

        <h2 className="font-display mt-20 text-3xl font-semibold">Reading list</h2>
        <div className="mt-8 space-y-12">
          {resources.map((g) => (
            <section key={g.group} aria-labelledby={`r-${g.group.replace(/\W+/g, "-")}`}>
              <h3 id={`r-${g.group.replace(/\W+/g, "-")}`} className="font-mono text-xs uppercase tracking-[0.16em] text-amber-700">{g.group}</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {g.items.map((r) => (
                  <li key={r.title} className="grid gap-1 py-5 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted sm:pt-1">{r.kind}</span>
                    <div>
                      {r.href ? (
                        <a href={r.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1.5 text-[17px] font-semibold leading-snug text-fg underline decoration-line underline-offset-4 hover:decoration-fg">
                          {r.title}<ArrowUpRight className="mt-1 size-4 shrink-0 text-muted" aria-hidden="true" />
                        </a>
                      ) : <span className="text-[17px] font-semibold leading-snug">{r.title}</span>}
                      <p className="mt-0.5 text-sm text-muted">{r.by}</p>
                      <p className="mt-1.5 text-[15px] leading-7 text-fg/85">{r.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
