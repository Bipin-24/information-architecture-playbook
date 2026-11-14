# The Information Architecture Playbook

A field guide to information architecture: the fundamentals, proven practice, and how IA is evolving in the AI era (retrieval, RAG, knowledge graphs, agents and MCP).

- **22 researched articles** in three tracks (Foundations, Practice, The AI era), each with takeaways and cited sources
- **Three interactive tools** that run entirely in the browser: IA maturity assessment, Chunk Lab, Structure checker
- **Glossary** (45 terms), **templates and reading list**, and a **sourced timeline** of how IA evolved
- Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion. Fully static; deploys on Vercel.

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run check:content` | Validates every article: front matter, internal links, verified-source allowlist, banned terms, em dashes |
| `npm run test:lib` | Unit tests for the tool logic (chunking, structure checker, maturity scoring) |
| `npm run lint` / `npx tsc --noEmit` | Lint and type-check |
| `npm run build` | Runs the content check, then builds all pages |
| `node scripts/crawl.mjs http://localhost:3000` | Crawls a running site: every internal link returns 200 and every `#anchor` exists |

## Structure

```
content/articles/        Markdown articles (front matter is validated at build time)
content/sources-allowlist.txt   URLs that were opened and verified; articles may only cite these
app/                     Routes, metadata, sitemap, robots, llms.txt, llms-full.txt, feed.xml, OG images
components/              layout, article reading UI, tools, hero visual
lib/                     content pipeline, tracks, glossary, timeline, resources, tool logic
scripts/                 check-content, crawl, test-lib
```

## Writing or editing an article

Add `content/articles/<slug>.md` with this front matter, then run `npm run check:content`:

```yaml
---
title: "Sentence-case title"
description: "100-180 characters."
track: foundations | practice | ai-era
order: 1            # unique within its track
updated: "YYYY-MM-DD"
tags: ["tag", "tag"]
takeaways: ["3 to 4 short points"]
sources:
  - title: "Source title"
    url: "https://..."   # must be listed in content/sources-allowlist.txt
---
```

Rules the checker enforces: no H1 in the body, no em dashes, no unverified source URLs, valid internal links (`/articles/<slug>`, `/tools`, ...). Callouts are blockquotes that start with a bold label: `> **Key idea:** ...`, `**In practice:**`, `**Caution:**`, `**Example (fictional):**`.

Editorial standards: attribute every research figure with its conditions, label fictional examples, state uncertainty plainly, and never invent statistics, quotes or client stories.

## Deploy (Vercel)

`vercel.json` pins the framework and commands. Set `NEXT_PUBLIC_SITE_URL` to the production origin (it drives canonical URLs, the sitemap and structured data). No other environment variables or secrets are required.

## License

See [LICENSE](LICENSE).
