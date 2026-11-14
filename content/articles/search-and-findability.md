---
title: "Search and findability: improving search as part of your information architecture"
description: "How to use query logs, synonyms, facets, result design and no-results handling to improve search, plus a quarterly routine and honest evaluation tips."
track: practice
order: 5
updated: "2026-11-14"
tags: ["search", "findability", "query log analysis", "synonyms", "faceted search"]
takeaways:
  - "Search is one of the four IA systems, and it depends on the labels, metadata and structure around it."
  - "Query logs are your best source of real user language; read failed and zero-result queries first."
  - "Evaluate search with a fixed set of test queries and known good results, not anecdotes."
  - "Findability is about people locating what they seek; discoverability is about learning what exists."
sources:
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "Information foraging"
    url: "https://en.wikipedia.org/wiki/Information_foraging"
  - title: "Tree Testing: Fast, Cheap UX Research"
    url: "https://www.nngroup.com/articles/tree-testing/"
  - title: "Eight Principles of Information Architecture"
    url: "https://www.designprinciplesftw.com/collections/eight-principles-of-information-architecture"
  - title: "How AI Is Changing Search Behaviors"
    url: "https://www.nngroup.com/articles/ai-changing-search-behaviors/"
---

Search is the system people turn to when navigation has not worked, or when they already know what they want. Rosenfeld, Morville and Arango list it as the fourth of the four systems in an information environment, next to organization, labeling, and navigation. It is also the system most often treated as a purchased feature rather than a designed one. Teams install a search engine, accept the defaults, and then wonder why results feel poor.

Search quality depends on things an IA practice already controls: the labels in your content, the metadata on each item, the vocabulary people use, and the structure that groups content. This article covers how to analyze what people search for, how to tune the pieces you can control, how to design the results page, how to evaluate search, and a routine to keep it improving. It pairs with [navigation design best practices](/articles/navigation-design-best-practices) and [content modeling and metadata](/articles/content-modeling-and-metadata).

## Findability and discoverability

The two terms are related and not identical.

- **Findability** is the degree to which someone who is looking for a specific thing can locate it. They have a goal and some words for it.
- **Discoverability** is the degree to which people learn that something exists when they were not looking for it: a feature, a document, a related topic.

Search mostly serves findability. Navigation, contextual links, and recommendations carry most of discoverability. NN/g's 2025 qualitative study of AI and search behavior makes a related point about AI tools: it identifies discoverability of genAI tools and their functions as a major challenge. The study had nine participants, so it is a set of observations rather than a population estimate. The general lesson holds for any search box: people cannot use capabilities they do not know exist.

> **Key idea:** Search failures come in two kinds. Either the content is there and the system cannot match it to the query, or the content is not there. Different fixes apply, and you cannot tell which you have without reading the queries.

## Start with query logs

A query log is a record of what people typed. It is the closest thing you have to people telling you their vocabulary unprompted. Three analyses are worth doing, in this order.

**1. Zero-result and failed queries.** List queries that returned nothing, and queries after which the person immediately searched again or left. Sort by frequency. For each frequent failure, decide which of these applies:

| Diagnosis | Example (fictional) | Fix |
|---|---|---|
| Vocabulary mismatch: the content exists under another name | People search "refund"; content says "reimbursement" | Add a synonym; consider adopting the user's term in the content |
| Misspelling or variant form | "recieve," "e-mail" vs "email" | Spelling tolerance, normalization rules |
| Content gap | Frequent query for a topic nobody has written about | Create content, or confirm it is out of scope and say so |
| Out-of-scope request | "Where is my order?" on a documentation site | A scoped message pointing to the right place |
| Query too vague | A single common word | Better result design: facets, suggestions, examples |

**2. Top queries.** Review the most frequent queries and check the top results for each manually. Do the best-known pages show up first? How concentrated searches are across a few items is something to measure in your own system, not assume. Treat those items as priorities for good titles, summaries, and metadata.

**3. Long-tail patterns.** Individual rare queries are noisy, but groups of them reveal themes: a product line, a type of task, an audience whose words you do not use. Cluster them by hand or with tooling, and check that clusters map onto your taxonomy. A cluster with no matching category is a candidate gap in the structure.

Handle logs with care. Queries can contain personal or confidential information, because people paste error messages, names, and identifiers. Apply your organization's privacy practices before analysis, strip identifiers, restrict access, and do not share raw logs outside approved tools.

## Synonyms and language

Most relevance problems that IA can fix are language problems. Maintain a synonym list as an actual artifact with an owner, not a setting buried in an admin console.

- Start from the controlled vocabulary: each preferred term has alternates (non-preferred terms) that map to it. The thesaurus relationships BT, NT, and RT (broader, narrower, related) are a natural source.
- Add terms from query logs: the words users type that your content does not contain.
- Decide the direction. Some synonyms are equivalent in both directions ("e-mail" and "email"); others are one-way ("laptop" should match "notebook computer," but a search for "computer" should not necessarily elevate laptop pages above all others).
- Include acronyms and their expansions, product names and former names, and common misspellings.
- Review for conflicts. A synonym that helps one audience can add noise for another. Test changes against a fixed set of queries before and after (see evaluation below).

When the same synonyms keep appearing in logs, change the content too. If most people say "refund" and your headings say "reimbursement," search can bridge the gap, but the headings are still creating a scent problem for people browsing. Information foraging theory, associated with Pirolli and Card at PARC, says people judge paths by the cues available and abandon them when the scent weakens. A mismatch between a user's word and your label is exactly that kind of weakened cue.

## Facets and filters

Facets let people narrow results by independent attributes, such as content type, product, audience, or date. They depend on metadata, which is why metadata quality is a search issue.

Guidelines:

- Build facets from fields with controlled values. A facet over free text shows duplicates and variants.
- Choose facets that match how people narrow their needs, which you can learn from tasks and logs. Do not expose every field you happen to have.
- Show counts when the engine can compute them reliably, so people see which choices will yield results.
- Keep the facet list stable, and order values meaningfully (most selected, logical order, or alphabetical for long lists).
- Make selected filters visible, easy to remove, and clearly distinguished from the query itself.

Brown's principle of multiple classification, "Offer users several different classification schemes to browse the site's content," is the design logic here. Facets implement it inside search results.

**Limit.** Facets multiply the combinations a person can reach, including combinations with zero results. Handle that explicitly: disable or hide values that would yield nothing, or explain why results are empty.

## Designing the results page

The results page is where scent either holds up or collapses. Each result should let people judge, without opening it, whether it is worth a click.

- **Title.** The most important element. Descriptive, unique titles are a content discipline, not a search feature.
- **Snippet.** A summary or matching text with query terms in context. Where you control metadata, a purpose-written summary is often better than an automatic excerpt.
- **Context.** Show type, product, or location so that two items with similar titles can be told apart.
- **Freshness and status.** Dates or version labels where they matter, and clear marking of deprecated content.
- **Ordering.** Relevance by default; offer sort options only when they fit a task (newest first for release notes, say).
- **Best bets.** For a short list of high-priority queries, curated top results that you maintain by hand. This is a manual intervention, and it needs an owner and periodic review, or it will go stale.

## No-results handling

A zero-results page is a moment of failure, and also a moment where you can recover.

1. Say plainly that nothing matched, and show what was searched.
2. Check for likely misspellings or variants and offer a corrected search.
3. Suggest broader terms or remove a filter that may be the cause.
4. Offer alternate routes: browse categories, popular topics, or contact options.
5. Log the query. These are your most valuable content-gap and vocabulary signals.

Avoid a blank page, a dead-end message, or unrelated "popular" results that imply a match when there is none.

## Scoped search

When an environment contains very different kinds of content (product documentation, support articles, marketing pages, internal policies), a single global search often blends them confusingly.

| Approach | Benefit | Risk |
|---|---|---|
| One search over everything | Simple; nothing missed | Results mix types; high-volume sections drown small ones |
| Search scoped to a section | More relevant within context | People may not realize the scope; a miss may look like absence of content |
| Global search with filters by type or area | Flexible | Needs good metadata; filters add interface complexity |
| Default scope by context, with an obvious "search everything" option | Matches likely intent while allowing escape | Needs clear labeling of scope |

Whatever you choose, show the scope visibly ("Searching: Developer docs") and make it easy to widen. Brown's front-door principle (assume that many visitors enter somewhere other than the home page) implies that someone on a deep page may not know what the search box covers.

## Relevance tuning basics

Without claiming to cover any specific engine, these levers are common across search systems:

- **Field weighting.** Matches in title and summary usually matter more than matches in body text. Verify this on your content with test queries before relying on it.
- **Boosting.** Raise authoritative or current content; lower deprecated or duplicate content. Boosts based on type or freshness should be explicit and documented.
- **Stemming and normalization.** Treat plurals and variant forms as matches. Check for over-stemming that produces false matches.
- **Phrase and proximity handling.** Matches of the whole phrase generally deserve more weight than scattered words.
- **Exclusion.** Keep drafts, duplicates, and test content out of the index.
- **Metadata filters.** Apply filters such as product or version before ranking when the user's context makes them clear.

Change one lever at a time, and test against the same query set before and after. Otherwise you cannot tell which change helped or what it broke. Much of what looks like a relevance problem is actually a content problem: duplicate pages competing, thin pages with generic titles, or outdated content ranking next to current content. Fixing the content is often more durable than tuning the engine.

> **In practice:** Keep a spreadsheet with three columns: the query, the page(s) that should appear in the top results, and the date you last checked. Fifty to a hundred real queries from your logs is a workable start. You will use it for tuning, regression checks, and communicating progress.

## Evaluating search

You need a way to say whether search got better, and "it feels better" is not one.

**Precision and recall, intuitively.** Precision asks, of the results shown, how many are relevant? Recall asks, of all the relevant items that exist, how many were shown? They trade off: showing more results tends to raise recall and lower precision. On a results page, people mostly see the top few items, so precision at the top matters most for navigational queries (looking for one known thing). For research queries (looking for everything on a topic), recall matters more.

**A simple evaluation set.**

1. Select queries from the logs, covering top queries, mid-frequency queries, and known problem queries.
2. For each, record one or more items that a knowledgeable person agrees are right answers.
3. Run each query and note the position of the first correct result, or that it is missing.
4. Summarize: how many queries have a correct result in the top three, top ten, or not at all.
5. Repeat after every change, and keep the set stable so the comparison is fair.

**Limits.** A test set built by the team reflects the team's assumptions. Refresh it from logs regularly, and include queries from different audiences. Small sets can be dominated by a few queries, so report the sample size, and do not claim precision the numbers do not have. The set also does not measure whether people succeeded at their underlying task, which requires observing users. Combine it with task-based testing: tree tests evaluate navigation, and moderated search sessions evaluate whether people can use search to complete tasks. NN/g notes tree testing evaluates a hierarchy without visual design, which is useful for isolating structure, but it will not tell you how search behaves.

The same ideas, test questions with known right answers and measures such as precision and recall, carry over to machine retrieval. That is covered in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).

## A quarterly search-improvement routine

Search degrades quietly as content, products, and vocabulary change. A recurring routine keeps it healthy. Adjust the timing to your volume.

| Week | Activity | Output |
|---|---|---|
| 1 | Pull logs for the quarter; remove sensitive data; summarize top queries, zero-result queries, and exit-after-search queries | Query summary and list of failures |
| 2 | Diagnose the top failures (vocabulary, spelling, gap, scope, vague) | Diagnosis for each, with a recommended fix |
| 3 | Update synonyms, best bets, and metadata; request or write missing content; retire or de-prioritize outdated items | Change log |
| 4 | Re-run the evaluation set; compare with the prior quarter; refresh the set from the new logs | Before-and-after results and a short report to the content owners |

Fold the routine into [IA governance and measurement](/articles/ia-governance-and-measurement) so someone owns it and the report reaches the people who can change content.

## Search in the AI era

Many organizations now put a conversational or answer-generating layer on top of search. The NN/g study mentioned above found that its participants used traditional search and AI tools together, often to check each other, and that none relied entirely on AI. With only nine participants, treat that as a pointer rather than a rule. Whatever the interface, the same IA questions apply: is the content well titled, current, and clearly structured, and does the vocabulary match what people ask? A generated answer is only as good as the material it draws on, which is one reason the fundamentals in this article matter more, not less, as interfaces change.

## When not to invest further in search

Search improvement has diminishing returns. If your logs show that the majority of failed queries are for content you do not publish and do not intend to, further tuning will not help; handle those queries with clear scope messaging. If your content set is small and tightly structured, strong navigation may serve people better than elaborate search. And if the engine cannot support the features you need (synonym control, metadata filters, field weighting), fix the platform constraint before spending months on configuration. Find out what the engine can do, and plan around it.
