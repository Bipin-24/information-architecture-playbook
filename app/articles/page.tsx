import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { ArticleBrowser } from "@/components/article/article-browser";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "All articles",
  description: "Every article in the Information Architecture Playbook: fundamentals, practice, and how IA is evolving in the AI era.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-14 pt-16 text-white sm:pt-20">
        <div className="bg-dots-ink absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Eyebrow className="text-amber-400">The library</Eyebrow>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">{articles.length} articles on structuring knowledge for people and machines.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">Start with Foundations if IA is new to you, pick up Practice for methods you can use on Monday, and read the AI era track for what changes when models are readers too.</p>
        </Container>
      </section>
      <Container className="py-12"><ArticleBrowser articles={articles} /></Container>
    </>
  );
}
