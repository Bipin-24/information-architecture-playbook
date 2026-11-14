---
title: "Information architecture for documentation and knowledge bases"
description: "How to structure docs by user need, version them, manage them as code, and keep them useful to both readers and AI retrieval systems."
track: practice
order: 6
updated: "2026-11-14"
tags: ["documentation", "knowledge base", "Diátaxis", "docs-as-code", "versioning"]
takeaways:
  - "Organize docs by what the reader is trying to do, not by how your product team is organized."
  - "Diátaxis separates tutorials, how-to guides, reference and explanation; mixing them is the most common docs defect."
  - "Version, ownership and audience belong in metadata, not just in prose, so people and retrieval systems can filter."
  - "Self-contained sections under descriptive headings serve readers skimming and retrievers chunking."
sources:
  - title: "Diátaxis: Start here"
    url: "https://diataxis.fr/start-here/"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "Contextual Retrieval (Anthropic)"
    url: "https://www.anthropic.com/engineering/contextual-retrieval"
  - title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: "https://arxiv.org/abs/2307.03172"
---

Documentation is an information environment with unusually demanding readers. They arrive from a search engine or an error message, they want one answer, and they leave as soon as they have it. Few of them start at the home page and read forward. That makes documentation a good test of whether your [four systems](/articles/the-four-systems-of-ia) of organization, labeling, navigation and search are working, because the reader has no patience for any of them failing.

This article covers the decisions that are specific to docs and knowledge bases: how to group content, how to handle versions, how to run the doc set like a codebase, and how to keep it useful when the reader is a retrieval system rather than a person. It ends with an audit table you can apply to an existing doc set.

## Start from what the reader is trying to do

The most common structural mistake in documentation is organizing it the way the product team is organized: one section per module, each containing a mixture of introductions, procedures, option lists and design rationale. The reader's need is different from the product's shape. Someone learning the product, someone completing a task, someone checking a parameter and someone trying to understand why it works that way need different kinds of page.

Diátaxis is a framework that makes this distinction explicit. Its pages describe four documentation types for four user needs, and say the framework addresses content, style and architecture. The definitions below use its wording.

| Type | Definition (Diátaxis) | Reader is | Mode |
|---|---|---|---|
| Tutorial | "a lesson, that takes a student by the hand through a learning experience" | Studying | Action |
| How-to guide | "addresses a real-world goal or problem" | Working | Action |
| Reference | "the technical description - facts - that a user needs" | Working | Cognition |
| Explanation | "provide context and background" | Studying | Cognition |

The two axes are useful on their own. One separates action from cognition (doing versus understanding). The other separates acquisition, or study, from application, or work. When a page tries to be a tutorial and a reference at once, it fails both readers: the learner wades through option tables, and the person looking up a flag wades through narrative.

> **Key idea:** Type is a property of the reader's need, not of the topic. The same feature normally needs a how-to guide, a reference entry and an explanation, each as its own page that links to the others.

### Applying the types without over-applying them

Treat the four types as a diagnostic first and a folder structure second. A quick way to use them: take twenty representative pages, label each with the type it is trying to be, and mark the pages that are trying to be two. Those pages are your first rewrite candidates.

Two honest caveats. First, a small doc set (a handful of pages for one narrow tool) may not need four top-level sections. Empty sections signal an unfinished product more than they signal rigor. Second, the types describe content, and real pages sometimes need a short orienting sentence from a neighboring type. The goal is a clear dominant purpose per page, not purity.

## Topic-based authoring and DITA

Topic-based authoring means writing small units that each cover one subject and stand alone, then assembling them into larger documents or navigation. DITA, an OASIS standard, is the best-known formalization. It defines concept, task and reference topic types, which line up loosely with Diátaxis's explanation, how-to and reference types.

The discipline is more portable than the tooling. A topic should answer one question, make sense when reached from a search result, and not depend on the reader having seen the page before it. Those properties matter whether you use DITA, a static site generator or a wiki.

The trade-off is cost. Full DITA brings a schema, specialized authoring and publishing tools, and a learning curve. That cost can pay off when you reuse content across many outputs and languages. For a team publishing one web doc set from Markdown, topic discipline plus a few conventions usually delivers most of the benefit.

## Design the top level around tasks and audiences

A docs home page should offer a small number of meaningful choices, each framed in the reader's terms. Brown's [principle of choices](/articles/eight-principles-of-information-architecture) applies directly: keep the range of choices focused on a particular task.

> **Example (fictional):** A data-export product has sections named after its internal modules: "Scheduler," "Connectors," "Transform Engine." A new user who wants to send a weekly CSV to a partner has to guess that the answer spans all three. The revised top level reads "Get started," "Export data," "Manage access," "API reference," and "Concepts." The module names survive as labels inside reference pages, where users who already know them will look.

Most doc sets end up with a hybrid: a task or journey structure for the front door, and a reference structure that mirrors the product or API for lookups. That is acceptable if each is clearly labeled and the two link to each other. What fails is mixing them within one menu level, which is the "apples and oranges" violation of focused navigation.

Because many readers land deep in the set from search, assume the front door is any page. Every page should say what product, version and audience it applies to, and offer a way up (breadcrumb or parent link) and a way across (related pages).

## Versioning

Versioned docs create a structural problem: the same concept now exists in several places with small differences. There are three common approaches, and none is free.

| Approach | How it works | Strength | Cost |
|---|---|---|---|
| Versioned URLs and a version selector | Each supported version has its own copy of the tree | Clear and exact for readers on older releases | Duplication; fixes must be applied to several branches; search engines see near-duplicates |
| Single "latest" doc set with inline version notes | One tree, with "Added in X" and "Removed in Y" callouts | Little duplication | Pages become cluttered; hard to tell which instructions apply to a given release |
| Latest only, with archived snapshots | Current docs are canonical; older versions kept as static archives | Simple to maintain | Readers on older versions get weaker support |

The right choice depends on how many versions customers actually run at once, and on how different they are. If you maintain one supported version, do not build version machinery you will not use.

Whatever you choose, record the version as metadata on each page, not only as text in the body. A version field lets your site render a banner on outdated pages, lets search filter by version, and lets a retrieval system exclude the wrong release. The consequence of getting this wrong is concrete: an answer that is accurate for version 2 and wrong for version 3, delivered confidently to a version 3 user. See [content modeling and metadata](/articles/content-modeling-and-metadata) for how to define such attributes.

## Docs-as-code as an IA practice

Docs-as-code means keeping documentation in a version-controlled repository, written in plain-text markup, reviewed through the same pull request process as code, and published by an automated build. Its main contribution to IA is that structure becomes inspectable and enforceable.

Concretely, a repository gives you:

- **Front matter that carries metadata.** Each page declares its type, product, version, audience, owner and last review date.
- **Automated checks.** A build can fail on broken internal links, missing titles, missing required metadata or headings that skip levels.
- **Redirect management.** When a page moves, the build holds a redirect from the old path, so the structure can change without breaking inbound links.
- **History.** You can see when and why the structure changed, which helps when a reorganization needs to be explained or reversed.

A minimal front matter block might look like this:

```yaml
title: "Schedule a recurring export"
doc_type: how-to        # tutorial | how-to | reference | explanation
product: "<PRODUCT_NAME>"
version: "3.2"
audience: ["admin"]
owner: "<TEAM_OR_ROLE>"
last_reviewed: "2026-10-01"
related:
  - "/reference/export-schedule-options"
```

The limitation is access. Docs-as-code can exclude subject matter experts who do not use Git. If your best sources of knowledge cannot contribute, the structure will be elegant and the content stale. Offer a lower-friction path, such as a web editor or an issue template, and have someone own turning contributions into well-formed pages.

## Navigation, linking and search inside docs

Docs navigation usually combines a sidebar tree, an in-page table of contents, breadcrumbs, previous and next links, and in-content links. [Navigation best practices](/articles/navigation-design-best-practices) apply, with a few docs-specific points:

- Keep sidebar labels short and in the reader's vocabulary. A label that a reader would never type into a search box is probably a poor label.
- Make the in-page table of contents reflect real headings, which means headings must be descriptive. "Overview" and "Details" tell the reader and the retriever nothing.
- Link terms at first meaningful use to a canonical definition or reference entry. Link text should say where the link goes.
- Link from reference and how-to pages to the explanation that justifies the behavior, and from explanations back to the procedures. Cross-type links are where Diátaxis structures pay off.

Search matters more in docs than on most sites, since many readers go straight to the search box. Review query logs for terms with no results and for queries where readers search, click, return and search again. Add synonyms, rename pages whose titles do not match how people talk, and create pages for questions you did not know people had. See [search and findability](/articles/search-and-findability) for a routine.

## Reuse without losing context

Single-sourcing, where one fragment is included in many pages, prevents drift. A prerequisites block or a warning about irreversible actions should be written once.

The cost is context. A reused fragment reads the same wherever it appears, but a sentence that was clear beside its original heading may be ambiguous elsewhere ("this setting" no longer points to anything). Write reusable fragments so they name their subject explicitly, and prefer reusing complete, self-explanatory units (a procedure, a warning) over reusing half-sentences.

## Documentation structure and AI retrieval

Retrieval systems split documents into chunks, index them, and hand the best matches to a language model. The doc practices above are what that process depends on, though the pipeline itself is covered in [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

Anthropic's engineering post on contextual retrieval illustrates the failure. A chunk reading "The company's revenue grew by 3% over the previous quarter" does not say which company or which period. Docs have the same problem in their own terms: a chunk that says "Set the timeout to 30 seconds" does not say for which product, which version or which operation. Anthropic's remedy was to prepend generated, chunk-specific context before indexing, and it reported lower retrieval failure rates under its test conditions, with caveats about chunk boundaries and the need to run your own evaluations. You can reduce the dependence on that remedy at the source by writing sections that carry their own context.

Practical consequences for authors:

- Put the subject in the heading and in the first sentence of each section.
- Keep sections self-contained: name the product, version and object rather than relying on "above" or "as before."
- Keep one concept per section so a chunk boundary does not split a condition from its consequence ("Do X unless Y" should not land in two chunks).
- State numbers with their conditions, in the same sentence.
- Expose metadata (type, product, version, audience) so retrievers can filter before ranking.

Research on long contexts adds a related point. Liu and colleagues found that language models perform best when relevant information sits at the beginning or end of a long input and degrade when it sits in the middle. For doc authors, the lesson is modest: concise, focused pages and sections are easier to retrieve and use than long pages that bury the key fact. It is not evidence that you should rewrite everything for machines.

> **Caution:** None of this requires writing for machines at the expense of people. These practices are ordinary good documentation. Where they conflict with a clear human reading, favor the human reader, and check results with a retrieval test rather than assumption.

## A docs IA audit

Use this table on a representative sample of pages (for example, twenty to thirty across sections) and on the top-level navigation. Record yes, partly or no, and note examples.

| Area | Question | Evidence to check |
|---|---|---|
| Purpose | Does each page have one dominant type (tutorial, how-to, reference, explanation)? | Page-by-page labeling |
| Front door | Does the home page offer a few choices in the reader's terms? | Task-based review against real top questions |
| Landing pages | Can a reader arriving from search tell product, version and audience in seconds? | Open ten pages from search results cold |
| Labels | Do titles and headings match words users search for? | Query log versus page titles |
| Navigation | Are task structures and product-mirroring structures kept separate? | Menu review |
| Versioning | Is version recorded in metadata, and are outdated pages flagged? | Front matter and rendered banners |
| Linking | Do how-to and reference pages link to explanation, and the reverse? | Link graph or manual sample |
| Reuse | Do reused fragments read correctly in every location? | Read fragments in context |
| Ownership | Does every page have an owner and a review date? | Metadata completeness |
| Search | Are zero-result and reformulated queries reviewed on a schedule? | Search log report |
| Retrieval readiness | Can a section be understood on its own, with subject and conditions stated? | Read sections in isolation |
| Redirects | Do moved or retired pages redirect or explain? | Broken-link and redirect report |

Pair the audit with [governance](/articles/ia-governance-and-measurement). A structure that is audited once and then left alone returns to disorder as the content grows, which is Brown's principle of growth in practice.

## When this approach is the wrong fit

A framework is a tool, not a mandate. If your doc set is small and short-lived, fully classifying it may cost more than it returns. If your product is a single workflow, tutorials and how-to guides may be the same page. If subject experts write in a wiki and will not move, improving the template and search may do more than a migration. Start from the failures your readers actually hit, as found in search logs, support tickets and task tests, and change the structure to address those.
