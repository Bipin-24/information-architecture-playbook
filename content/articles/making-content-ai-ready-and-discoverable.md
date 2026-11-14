---
title: "Making content AI-ready and discoverable: a practical checklist"
description: "A checklist of structure, markup, crawler controls, and freshness practices, with an honest account of what llms.txt and Google guidance do and do not say."
track: ai-era
order: 6
updated: "2026-11-14"
tags: ["AI readiness", "semantic HTML", "structured data", "llms.txt", "crawler controls"]
takeaways:
  - "Most AI-readiness work is classic good practice: clear headings, descriptive titles, text-first content, working links."
  - "Google says no special files, markup, or AI-specific optimization are required to appear in its AI features."
  - "llms.txt is a community proposal; evidence that AI platforms consume it is unconfirmed."
  - "Structured data must match visible content and does not guarantee any result."
sources:
  - title: "AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - title: "Introduction to structured data markup in Google Search"
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
  - title: "The /llms.txt file"
    url: "https://llmstxt.org/"
  - title: "How AI Is Changing Search Behaviors"
    url: "https://www.nngroup.com/articles/ai-changing-search-behaviors/"
  - title: "GEO: Generative Engine Optimization"
    url: "https://arxiv.org/abs/2311.09735"
  - title: "Diátaxis: Start here"
    url: "https://diataxis.fr/start-here/"
---

People ask whether there is a special way to prepare content for AI systems. The honest answer has two parts. For public search, Google's own guidance says that the existing best practices still apply and that no extra files or markup are needed. For your own retrieval systems and agents, structure matters a great deal, but what matters is mostly what good information architects already do: clear organization, descriptive labels, and text a reader can understand without its surroundings.

This article is a practical checklist, ordered roughly by value for effort, with a candid note on evidence for each item. It covers public discoverability. For what to do inside your own retrieval pipeline, see [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context), and for the wider shift in behavior, see [how AI changes how people find information](/articles/how-ai-changes-how-people-find-information).

## What Google says, and why it frames everything

Google Search Central's page on AI features and your website states that AI Overviews and AI Mode are part of Search, and that the best practices for SEO remain relevant for them. Quoting the page: "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." It adds that you do not need to create new machine readable files, AI text files, or markup to appear in these features, and that there is no special schema.org structured data to add.

What it does recommend is ordinary: a page must be indexed and eligible to be shown in Search with a snippet; allow crawling; use internal links; provide good page experience; keep important content in text; and keep structured data consistent with visible text. It also notes there is no guarantee of crawling, indexing, or serving.

Two cautions follow. This is one search provider describing its own features, so it does not speak for every AI product. And "no special optimization" does not mean "no work": the fundamentals are the work.

> **Key idea:** If a practice makes a page clearer to a person arriving from a search result, it very likely makes it clearer to a machine too. Start there before adding anything machine-specific.

## The checklist, grouped

### 1. Semantic HTML and headings

Use real headings in a logical order, lists for lists, tables for tabular data, and landmarks (`main`, `nav`, `article`) for page regions. Parsers that extract text for retrieval often rely on these elements to find section boundaries, and heading paths become the labels for chunks. This is the same advice as for assistive technology and [documentation IA](/articles/documentation-information-architecture).

Test: strip the CSS and read the page top to bottom. If the outline still makes sense, the structure is in the markup.

### 2. Descriptive titles and headings

A title should say what the page is about, with the product and version name where relevant. "Overview" and "Getting started" mean little in a search result, in a browser tab, or in a retrieved chunk. Write headings so each section is understandable out of context. See [mental models and information scent](/articles/mental-models-and-information-scent) for why labels carry so much weight.

### 3. Text-first content

Put important facts in text, not only in images, PDFs of scanned pages, video, or script-rendered widgets. Provide transcripts for audio and video and meaningful alt text for images that carry information. Google's guidance also lists keeping important content in text. For tables and diagrams, include a prose summary of the point, since extraction tools handle tables and images inconsistently.

### 4. Structured data that matches the page

Structured data (schema.org vocabulary, with JSON-LD generally recommended as the easiest to implement, according to Google's introduction) gives explicit clues about what a page means and can make pages eligible for rich results. Google states it does not guarantee rich results, and the markup must match the visible content. Adding markup for facts that are not on the page is wrong and risks being ignored or penalized.

Use it where it describes real, visible things. Do not treat it as an AI visibility switch; Google says no special schema.org data is needed for its AI features.

### 5. Clean URLs and internal links

Stable, readable URLs and meaningful link text help people and crawlers. Link related pages to each other with descriptive anchors, not "click here". Internal links are how both people and crawlers discover pages, and they express relationships the same way a hypertext structure always has (see [the four systems of IA](/articles/the-four-systems-of-ia)). When you move or retire content, redirect it, so old links and indexed copies do not dead-end. Governance for this is covered in [IA governance and measurement](/articles/ia-governance-and-measurement).

### 6. Markdown alternates

The llms.txt proposal suggests serving a Markdown version of pages at the same URL with `.md` appended. Whether or not you adopt llms.txt, clean Markdown versions can be useful for your own pipelines and agents. They strip navigation chrome and make structure explicit. They carry a maintenance cost: out of sync with the canonical page, they become a second, stale source.

### 7. llms.txt, with the status stated plainly

llms.txt is a proposal by Jeremy Howard, published on September 3, 2024. The site describing it is versioned (it now shows a version 2). The file is Markdown, placed at `/llms.txt` at the root or at any subpath. It has one required element, an H1 with the name of the site or project. After that come, optionally, a blockquote summary, more detail sections, and H2 sections containing lists of links with optional notes. A section titled "Optional" holds secondary links that can be skipped when context is short. The stated intent is inference-time use: agents are expected to view or search the file to find the information they need and then follow the relevant links.

A minimal illustration (fictional site):

```markdown
# Tessera Docs

> Documentation for the fictional Tessera product suite: guides, API reference, and release notes.

## Guides

- [Quickstart](https://docs.example.com/quickstart.md): install and run a first job
- [Rate limits](https://docs.example.com/api/rate-limits.md): per-plan request limits

## Optional

- [Changelog](https://docs.example.com/changelog.md)
```

Now the limits, which matter more than the format:

- It is a community proposal, not a ratified standard.
- The proposal itself gives no recommendation on how a consumer should process the file.
- Evidence that AI platforms read it at all is unconfirmed, and secondary sources conflict. This article does not claim that any AI vendor honors it, or that it improves citations or visibility in AI answers.
- Google's page says you do not need to create new machine readable files or AI text files to appear in its AI features.

A reasonable position: if you maintain developer documentation, it is cheap to try, and agents you control can use it as a curated entry point. Do not expect traffic or citation effects, and give it an owner.

### 8. Crawler controls

You decide what automated systems may access and show. Google's page lists several controls: `robots.txt` for crawling, `nosnippet` and `data-nosnippet` and `max-snippet` for what appears in snippets, and `noindex` to keep pages out of the index. It also describes the `Google-Extended` control as relating to use of content for AI training and grounding in some other Google systems. Because exactly what each control affects can change, read Google's current documentation for the specifics before relying on one, and look at each AI vendor's own published documentation for its crawlers.

Two points apply regardless of vendor. Robots directives are requests honored by well-behaved crawlers, not access control; confidential content belongs behind authentication. And restricting crawling or snippets has a visibility trade-off: what cannot be crawled or shown cannot be found through those channels.

### 9. Freshness and versioning

Machines and people both fail on stale content, and machines cannot tell it is stale unless you say so. Show a visible last-updated date where it matters. Put product and version in titles and headings for versioned docs. Mark or redirect deprecated pages instead of leaving them as live competitors to the current answer. Keep one canonical home for each fact and link to it rather than copying it. This overlaps heavily with [documentation versioning](/articles/documentation-information-architecture) and with the metadata fields (`version`, `status`, `last_reviewed`) described in [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

### 10. Accessibility overlap

Semantic structure, text alternatives, captions, descriptive links, and logical heading order are accessibility requirements and also exactly what extraction tools reward. That makes the work easy to justify. The machine benefit is an inference from the overlap, not a measured guarantee, so verify with your own tests.

## Practice, audience, and evidence at a glance

| Practice | Helps people | Helps machines | Evidence status |
|---|---|---|---|
| Semantic HTML and logical headings | Yes: scanning, assistive technology | Yes: boundary and label extraction | Established web practice; Google recommends text and structure for Search |
| Descriptive titles and headings | Yes: scent, orientation | Yes: labels for results and chunks | Established IA practice; no specific AI figures cited here |
| Text-first content, transcripts | Yes: accessibility, skimming | Yes: extractable text | Google lists important content in text as recommended |
| Structured data matching visible content | Indirect (rich results) | Explicit clues about meaning | Documented by Google; no guarantee of results; no special markup needed for AI features |
| Clean URLs, internal links, redirects | Yes: orientation, trust | Yes: discovery and canonical copies | Established practice; Google recommends internal links |
| Markdown or plain-text alternates | Marginal | Easier parsing for pipelines you control | Proposed in llms.txt; consumption by AI platforms unconfirmed |
| llms.txt | Marginal | Intended as an entry point for agents | Community proposal; adoption and effect unconfirmed; Google says no special AI files needed |
| Crawler controls (robots.txt, snippet controls, noindex, Google-Extended) | Not a user benefit | Controls access and display | Documented by Google; behavior varies by vendor, check current docs |
| Freshness dates, version labels | Yes: trust, correctness | Yes: filtering, recency | Established practice; machine effect depends on your pipeline |
| Accessibility practices | Yes | Yes: structure and text alternatives | Overlap is by reasoning; test it |

## A note on "optimizing for generative engines"

Research on this does exist. Aggarwal et al. propose "generative engine optimization" (GEO) as a black-box optimization framework, and a benchmark called GEO-bench. Their abstract reports visibility boosts of up to 40 percent, and states that effectiveness varies by domain. Read that figure carefully: it is an "up to" result from the authors' own framework and benchmark, not a typical outcome, and it does not transfer automatically to a particular engine or site. Treat the paper as a research direction. It is not an instruction manual, and it does not contradict Google's guidance for Google's features.

The Nielsen Norman Group study of search behavior adds useful perspective for strategy. It was a qualitative study of nine participants, so it describes behavior and does not estimate populations. Participants used traditional search and AI tools together, often to check each other, and AI overviews could satisfy a need without a click. NN/g calls that a serious challenge for content producers. The implication for IA is not a new trick but a reminder: be the clear, accurate, attributable source, and make it easy to verify.

> **In practice:** Pick five high-value pages and run this audit. Strip the CSS and read the outline. Read each title and each heading out of context. Check that every important number and condition is in text and near what it describes. Confirm there is a visible date and version. Check that old versions redirect or are labeled. Fix what you find, in that order, before touching any file named after an AI product.

## Limits

- Public AI products differ in what they crawl, store, and cite, and most do not publish full details. Anything stated about them beyond their own documentation is speculation.
- The checklist improves the inputs. It does not control what an answer engine decides to show, and nothing here guarantees inclusion or citation.
- For internal assistants, you control the pipeline, so measure. A small test set of questions with known sources tells you more than any checklist; see [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).
