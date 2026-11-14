import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container className="max-w-2xl">
        <Eyebrow className="text-amber-700">404 · Not found</Eyebrow>
        <h1 className="font-display mt-4 text-4xl font-semibold sm:text-5xl">That page is not in the architecture.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">The link may be old or mistyped. Good IA gives you somewhere to go next, so try one of these.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[["Browse all articles", "/articles"], ["Start with the fundamentals", "/articles/what-is-information-architecture"], ["Try the tools", "/tools"], ["Read the glossary", "/glossary"]].map(([l, h]) => (
            <li key={h}><Link href={h} className="block rounded-xl border border-line bg-card px-5 py-4 font-medium shadow-card transition-colors hover:border-amber-500">{l}</Link></li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Press <kbd className="rounded border border-line px-1.5 font-mono text-xs">/</kbd> to search.</p>
      </Container>
    </section>
  );
}
