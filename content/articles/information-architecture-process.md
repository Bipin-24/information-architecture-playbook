---
title: "The information architecture process: from discovery to governance"
description: "A working IA process in eight phases, with deliverables, decision points, a 12-point checklist, and the pitfalls that derail most projects."
track: practice
order: 1
updated: "2026-11-14"
tags: ["information architecture", "process", "content inventory", "taxonomy", "governance"]
takeaways:
  - "IA work runs in eight phases, from discovery to governance, and the last one is never optional."
  - "Inventory and audit come before structure; research comes before opinions."
  - "Test the structure with tasks before design and content depend on it."
  - "Each phase should end in a named deliverable that someone else can use."
sources:
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Card Sorting: Uncover Users' Mental Models for Better Information Architecture"
    url: "https://www.nngroup.com/articles/card-sorting-definition/"
  - title: "Tree Testing: Fast, Cheap UX Research"
    url: "https://www.nngroup.com/articles/tree-testing/"
  - title: "The 3-Click Rule for Navigation Is False"
    url: "https://www.nngroup.com/articles/3-click-rule/"
---

Most information architecture projects fail quietly. Nobody argues about the final sitemap because the real mistakes happened earlier: the goals were never written down, the content was never counted, or the structure was approved by the people who built it and nobody else. A repeatable process does not guarantee a good architecture, but it makes the common failures visible while they are still cheap to fix.

This article lays out an end-to-end process in eight phases, with the deliverable each phase should produce, the decisions that matter, and a checklist you can run against a live project. It is deliberately tool-agnostic. The same sequence applies to a marketing site, an intranet, a documentation set, or a knowledge base that a retrieval system will read. If you need the conceptual background first, start with [what information architecture is](/articles/what-is-information-architecture).

## How to think about the process

Jorge Arango describes IA as three activities: organize information, set the context, and plan for change. The phases below map onto those activities. Discovery and research set the context. Inventory, structure, navigation and labeling organize the information. Testing and governance plan for change. Treat the eight phases as a loop rather than a waterfall: what you learn in testing will send you back to structure, and what you learn in governance will send you back to discovery.

Rosenfeld, Morville and Arango organize the working parts of an information environment into four systems: organization, labeling, navigation, and search. The process below is how you design and check those four systems together. The authors point out that the same link can belong to several systems at once, which is the practical reason to design them in one process instead of handing each to a different team. The [four systems](/articles/the-four-systems-of-ia) article covers them in depth.

> **Key idea:** A process is a way to move decisions to the point where evidence exists. Every phase below exists to replace an opinion with an observation before something expensive depends on it.

## Phase 1: Discovery and goals

Start by writing down what the information environment is for, who it serves, and how you will know it works. This sounds obvious, and it is the step most often skipped, because everyone assumes the goals are shared.

Run short interviews with the people who sponsor and operate the system. Ask what decisions the content should support, what happens today when people cannot find something, and what is changing (new products, a merger, a new platform, a new audience). The last question matters most, because structures built for today's content tend to break on tomorrow's.

Produce a one-page brief with four parts:

- **Purpose:** what the environment must help people do.
- **Audiences:** two to five groups, described by what they are trying to accomplish rather than demographics.
- **Success measures:** observable outcomes, such as task success in a test or a drop in failed searches. Do not commit to numeric targets until you have a baseline.
- **Constraints:** platform, legacy URLs, legal and regulatory content, staffing for ongoing maintenance.

> **Caution:** If stakeholders cannot agree on the audiences, do not paper over it with a vague brief. Disagreement at this stage becomes disagreement about the sitemap later, when it is much more expensive.

## Phase 2: Research with stakeholders and users

Research answers two questions: what do people try to do, and in what words? Combine a few methods rather than relying on one.

| Method | What it tells you | Typical limit |
|---|---|---|
| Stakeholder interviews | Business priorities, political constraints, hidden content owners | Reflects what the organization wants, not what users do |
| User interviews and task observation | Real tasks, vocabulary, workarounds | Small samples; findings are qualitative |
| Search query logs (if available) | The exact words people type and what fails | Only covers people who chose to search |
| Support tickets and sales questions | Recurring confusion, missing content | Biased toward people who gave up and asked for help |
| Analytics on current navigation | What gets used, where people leave | Shows behavior, not intent; says nothing about content people never found |

The goal is not to collect everything. It is to build a list of top tasks and the vocabulary around them. That list drives labeling in phase 5 and the test tasks in phase 6. For a closer look at the language side, see [search and findability](/articles/search-and-findability), where query logs are covered in detail.

## Phase 3: Content inventory and audit

An inventory is a list of what exists. An audit is a judgment about whether it is any good. Do them in that order, and keep them separate.

**Inventory.** Export every page, document, or record you can reach into a spreadsheet. Useful columns: unique ID, title, URL or location, content type, owner, last updated date, and, if it is cheap to get, a traffic or usage indicator. For very large sets, sample by section instead of listing everything, and say clearly in the deliverable that you sampled.

**Audit.** Review a sample, or the whole set if it is small, against criteria drawn from your goals: is it accurate, current, duplicated, written in the audience's language, owned by a named person? Add a disposition for each item: keep, revise, merge, retire, or gap (content that should exist but does not).

Two things the inventory usually reveals. First, you may find content with no owner, which is a governance finding in its own right. Second, items that look like one thing (a "product page") are actually several different types with different attributes, which feeds directly into the content model in phase 4. Resist the urge to fix content during the audit; the job here is to see the terrain.

> **In practice:** Add one column called "what is this, really?" and fill it with a plain noun phrase such as "pricing table," "release note," or "troubleshooting steps." Sorting by that column is often the fastest route to a draft list of content types.

## Phase 4: Structure design

This phase produces three linked artifacts: an organization scheme, a taxonomy or controlled vocabulary where one is needed, and a content model.

**Organization scheme.** Decide how content will be grouped and which structures you will use. Exact schemes (alphabetical, chronological, geographical) are easy to apply and verify. Ambiguous schemes (by topic, task, audience) match how people think but require judgment about where each item belongs. Most real systems combine a primary hierarchy with a database-style layer of facets, and connect items with hypertext links.

**Taxonomy and vocabulary.** Build controlled vocabularies only where they will be used: as facet values, tags, or filters. A vocabulary without an owner and a change process decays. See [taxonomies, ontologies and controlled vocabularies](/articles/taxonomies-ontologies-and-controlled-vocabularies) for choosing the right level of formality.

**Content model.** Define content types, their attributes, and the relationships between them. This is the layer that lets one piece of content appear in several places without being copied. The details are in [content modeling and metadata](/articles/content-modeling-and-metadata).

A practical sequence is to draft the content model first from the audit, then sketch two or three candidate hierarchies from research on top tasks, then compare them. Do not commit to one hierarchy before you have something to compare it against.

## Phase 5: Navigation and labeling

Navigation is how the structure is exposed to people, and labels are the words on the controls. Both are easiest to get wrong when decided late and under visual design pressure.

- Choose the navigation components you need: global, local, contextual, and supplemental, plus breadcrumbs and utility links as appropriate. The [navigation design best practices](/articles/navigation-design-best-practices) article covers when each earns its place.
- Draft labels using the audience's words from phase 2, not internal or branded terms. Where audiences use different words for the same thing, record the preferred term and the alternates. Alternates become synonyms in search.
- Write a labeling guide: preferred terms, forbidden terms, capitalization, and how to name new things. A one-page guide prevents drift better than a long policy.

Nielsen Norman Group has reported that the long-repeated "3-click rule" has not been supported by data in published studies, and it also calls the "seven main categories" rule of thumb a myth. The practical lesson is to stop counting clicks and start asking whether each step gives clear signals about where it leads and whether people can tell where they are.

## Phase 6: Prototype and test

Test the structure before visual design and content production depend on it. Two methods do most of the work, and they are meant to be used in sequence.

1. **Card sorting** is generative. It shows how people group concepts, and it is most useful early. NN/g recommends open sorts as the most common choice, with qualitative studies of at least 15 participants and quantitative studies of at least 30 to 50 as guidelines, not statistical thresholds.
2. **Tree testing** is evaluative. Participants try to find answers in a text-only version of the hierarchy, so you see how the structure performs without visual design or search to rescue it. NN/g notes it can be used at the start of a redesign to benchmark, and after a card sort to test the resulting hierarchy.

[Card sorting and tree testing](/articles/card-sorting-and-tree-testing) covers study design and analysis. For this process, the key decision is to write test tasks from the top-task list in phase 2, each with a defined correct answer, and to run a few moderated pilots before any large quantitative run.

Beyond trees, build a clickable or paper prototype of the main navigation and test a handful of tasks with it. Then iterate: structure changes after testing are cheap, structure changes after launch are not.

> **Example (fictional):** A regional bike-share operator reorganizes its help center. The card sort suggests grouping "lost key," "damaged dock," and "billing dispute" together under a single "Problems" heading. The tree test shows participants hunting for "billing dispute" under "Account" instead. The team splits "Problems" by what the rider is trying to do, keeps "billing dispute" under "Account," and re-tests. Neither method alone would have shown this; the combination did.

## Phase 7: Implementation handoff

A structure that cannot be implemented as designed will be implemented differently. Handoff means giving designers, developers, and content teams artifacts they can build from without interpretation:

- Sitemap with page IDs that match the inventory.
- Navigation specification: which items appear where, in what order, under what conditions.
- Content model with field definitions, allowed values, and required versus optional status.
- Controlled vocabulary files in a format your platform can import.
- Redirect map from old locations to new, with a rule for anything that has no equivalent.
- Wireframe annotations where structure affects layout (facets, breadcrumbs, related-content blocks).

Plan the migration as part of handoff. Decide who moves which content, in what order, and how you will check that nothing important was lost. Where possible, launch one section first and watch what breaks.

**When not to do a full redesign.** If testing shows the existing structure mostly works and failures cluster in a few areas, fix those areas. Teams sometimes rebuild an entire hierarchy when the problem was three ambiguous labels and a missing synonym list.

## Phase 8: Governance

The last phase is the one that decides whether your work lasts. Structures degrade as new content arrives, owners leave, and new terms appear. Governance is the set of agreements that keep that from happening:

- A named owner for the architecture as a whole, and for each vocabulary.
- A process for proposing, reviewing, and approving new terms or content types.
- A content lifecycle: creation, review, update, retirement, with redirects for removed pages.
- A review cadence, with a simple health report: failed searches, tree-test results on key tasks, content past its review date.

Brown's principle of growth, "Assume the content you have today is a small fraction of the content you will have tomorrow," is the design test for this phase. If adding a hundred items would force a restructure, the architecture is not ready to launch. [IA governance and measurement](/articles/ia-governance-and-measurement) goes into ownership, change processes, and metrics.

## Deliverables at a glance

| Phase | Primary deliverable | Who uses it next |
|---|---|---|
| 1. Discovery | One-page brief: purpose, audiences, success measures, constraints | Everyone; the reference for scope arguments |
| 2. Research | Top-task list and vocabulary notes | Navigation, labeling, and testing |
| 3. Inventory and audit | Inventory spreadsheet with dispositions | Content model, migration plan |
| 4. Structure | Organization scheme, vocabulary, content model | Navigation design, development |
| 5. Navigation and labeling | Navigation spec and labeling guide | Designers, content authors |
| 6. Prototype and test | Test results and revised structure | Stakeholders, implementation team |
| 7. Handoff | Sitemap, specs, redirect map, migration plan | Developers, content teams |
| 8. Governance | Ownership, change process, review cadence, health report | Operations; future you |

## Common pitfalls

- **Designing from the org chart.** Departments make convenient categories and poor ones for users. If the top level mirrors your org chart, test it against real tasks.
- **Skipping the inventory.** You cannot design a structure for content you have not seen. Surprises show up at migration time.
- **Treating card sort results as final.** NN/g notes that card sorting yields one level of categorization and ignores page context, and that category names from an open sort are not necessarily final labels. Use results as input.
- **Testing only with insiders.** People who know the vocabulary will find things the audience cannot.
- **Letting search cover for weak structure.** Search helps, but it will not repair labels that mislead or categories that overlap.
- **Launching without an owner.** If nobody is accountable on day one, nobody will be on day 365.
- **Overfitting to a single audience.** Check structure against every audience in the brief, not only the loudest.

## A 12-point checklist

Run this against a project at any stage. Anything you cannot answer yes to is the next piece of work.

1. The purpose, audiences, and constraints are written in a one-page brief that stakeholders have seen.
2. Success measures are defined, and a baseline exists or is scheduled.
3. A list of top user tasks exists, based on observed behavior and not only opinion.
4. Search logs, support tickets, or equivalent language data have been reviewed.
5. A content inventory exists, and its scope or sampling method is stated.
6. An audit has assigned a disposition (keep, revise, merge, retire, gap) to inventoried content.
7. Content types, attributes, and relationships are documented in a content model.
8. Labels come from audience language, with preferred and alternate terms recorded.
9. The structure has been tested with tasks that have defined correct answers, and results led to at least one revision.
10. The implementation handoff includes a redirect map and a migration plan.
11. Every vocabulary and the architecture overall have named owners.
12. A review cadence and a change process for new terms and content types are in place.

## Limits of this process

This sequence is a general-purpose scaffold, not a proven formula, and I am not aware of controlled evidence that following it produces better outcomes than other approaches. It is the pattern most IA practitioners recognize, and it works by forcing evidence into decisions. Small projects can compress phases: a ten-page site does not need a formal audit, though it still benefits from a brief and a tree test. Large organizations will find that phases overlap and loop, and that governance work starts long before phase 8.

The process also assumes a human reader. When a retrieval system or agent is also a reader, the same phases apply, but the structures you produce (content model, metadata, vocabularies) become model-facing, and the testing phase gains a machine layer. Those extensions are covered in the AI-era articles of this site; the foundation is the same.
