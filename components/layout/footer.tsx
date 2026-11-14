import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LogoMark } from "./logo";
import { site } from "@/lib/site";

const cols = [
  { title: "Learn", links: [["Foundations", "/tracks/foundations"], ["Practice", "/tracks/practice"], ["The AI era", "/tracks/ai-era"], ["All articles", "/articles"]] },
  { title: "Use", links: [["Interactive tools", "/tools"], ["Glossary", "/glossary"], ["Templates and reading list", "/resources"], ["How IA evolved", "/evolution"]] },
  { title: "Site", links: [["About", "/about"], ["RSS feed", "/feed.xml"], ["llms.txt", "/llms.txt"], ["Sitemap", "/sitemap.xml"]] },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-ink-950 text-mist">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <LogoMark />
            <span className="font-display text-[19px] font-semibold">IA <span className="text-amber-400">Playbook</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-mist-dim">{site.tagline}</p>
          <p className="mt-4 text-sm text-mist-dim">
            By <a href={site.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-mist underline-offset-4 hover:text-white hover:underline">{site.author.name}</a>
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-mist-dim">{c.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  {href.endsWith(".xml") || href.endsWith(".txt") ? (
                    <a href={href} className="transition-colors hover:text-white">{label}</a>
                  ) : (
                    <Link href={href} className="transition-colors hover:text-white">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-white/[0.07]">
        <Container className="flex flex-col gap-2 py-6 text-xs text-mist-dim sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.author.name}. Content reflects public sources cited on each page; interpretation and synthesis are the author&rsquo;s own.</p>
          <p>
            <a href={site.repo} target="_blank" rel="noopener noreferrer" className="hover:text-white">Source on GitHub</a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
