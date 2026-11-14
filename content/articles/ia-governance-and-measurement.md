---
title: "IA governance and measurement: planning for change"
description: "How to assign ownership, manage vocabulary and content lifecycle, and measure whether your structure still works, without launching and forgetting."
track: practice
order: 7
updated: "2026-11-14"
tags: ["governance", "measurement", "content lifecycle", "tree testing", "vocabulary management"]
takeaways:
  - "Information architecture decays by default; governance is the work of planning for that change."
  - "Name an owner for the structure, the vocabulary and each content area before launch."
  - "Measure at three levels: whether tasks succeed, what people search for, and the health of the content itself."
  - "Every metric is a proxy. Use trends and examples together, and treat targets with suspicion."
sources:
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Tree Testing (Nielsen Norman Group)"
    url: "https://www.nngroup.com/articles/tree-testing/"
  - title: "SKOS Simple Knowledge Organization System Reference (W3C)"
    url: "https://www.w3.org/TR/skos-reference/"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
---

Most information architecture work is judged at launch, when the new navigation and labels are fresh and the content matches them. A year later the picture is different. New content has arrived that fits no category, two teams have invented different names for the same thing, and half the redirects were never created. Nothing was done wrong at launch. Nobody was responsible afterward.

Jorge Arango describes IA as three activities: organize information, set the context, and plan for change. He also writes that "there are no static information structures." Governance is the practical form of the third activity. This article covers who owns what, how vocabulary and content change, how to retire content safely, and how to measure whether the structure is still doing its job.

## What governance covers

Governance is the set of decisions, roles and routines that keep an architecture coherent as people add, change and remove things. It is not a committee for its own sake. A useful test is whether, when someone wants to add a new top-level category, rename a label or retire a section, there is a known person to ask and a known way to decide.

The areas to govern:

- **Structure:** top-level categories, navigation, URL patterns and the content model.
- **Vocabulary:** the preferred terms, synonyms and any controlled lists used for tagging and filtering.
- **Content lifecycle:** how content is created, reviewed, updated and retired.
- **Measurement:** what is tracked, who looks at it and what happens as a result.

> **Key idea:** Governance exists because the people adding content are not the people who designed the structure. Without explicit rules and owners, each author optimizes locally, and the structure drifts toward whatever is easiest to publish.

## Ownership

Start with roles, because everything else depends on them. Small organizations will combine them in one or two people, and that is fine. What matters is that each is assigned by name, or at least by named team.

| Role | Responsibility |
|---|---|
| Structure owner | Maintains the overall architecture, approves new top-level categories and navigation changes, resolves conflicts between content areas |
| Vocabulary owner | Maintains preferred terms and synonyms, approves additions, merges and retirements |
| Content area owner | Accountable for accuracy and freshness of a defined slice of content; decides when to revise or retire |
| Content authors | Follow templates, apply required metadata, propose new terms rather than inventing them |
| Search or analytics lead | Reviews search and usage reports on a schedule, files findings against the right owner |
| Platform or engineering owner | Implements redirects, templates, validation and publishing rules |

A RACI-style view clarifies who decides and who is merely informed.

| Decision | Structure owner | Vocabulary owner | Content area owner | Authors | Platform |
|---|---|---|---|---|---|
| New top-level category | A | C | C | I | R |
| Rename a label in navigation | A | R | C | I | R |
| Add a term to a controlled list | C | A/R | C | R (proposes) | I |
| Retire a page or section | C | I | A/R | I | R |
| Change a content type or required field | A | C | C | I | R |
| Review search and analytics reports | C | C | I | I | R (data access) |

R is responsible, A is accountable, C is consulted, I is informed. Adjust the table to your organization; it illustrates the shape of the decisions, not a universal assignment. The one rule worth holding to is that each row has exactly one A.

## Managing vocabulary change

Vocabulary is where architecture drifts fastest, because anyone can type a new tag or product name. A lightweight change process keeps control without stalling work.

1. **Propose.** Anyone can request a new term, a rename or a merge, with an example of where it will be used and what users call the thing.
2. **Check.** The vocabulary owner searches existing terms, including synonyms, to see whether the need is already covered.
3. **Decide.** Accept, merge with an existing term (recording the new wording as a non-preferred variant), or decline with a reason.
4. **Apply.** Update the list, re-tag affected content, update templates, and fix labels in navigation and search synonyms.
5. **Record.** Log the change, the date and the rationale so later maintainers understand it.

Standards give you a vocabulary for this. In SKOS, the W3C Recommendation for sharing knowledge organization systems, each concept has at most one preferred label per language and can carry alternative labels. That maps neatly onto governance: the preferred label is what you show, and alternates capture what people also say. When you merge two terms, the retired wording becomes an alternate label rather than disappearing, so searches for it still resolve.

> **In practice:** Keep retired terms. A term that no longer appears in navigation is still a term people type into search. Mapping it to its replacement costs almost nothing and prevents zero-result searches.

The trade-off is speed. A strict approval step slows teams who just want to ship, and they will route around it with free-text tags. Reduce friction instead of adding gates: make proposals a short form, answer within a stated time, and give authors a place to see the current list. Not every list needs the same rigor. A controlled list that drives filters and reporting deserves tight control; a free-text field for internal notes does not.

For more on vocabularies and how formal they need to be, see [taxonomies, ontologies and controlled vocabularies](/articles/taxonomies-ontologies-and-controlled-vocabularies).

## Content lifecycle, deprecation and redirects

Content has a life. Brown's principle of objects asks us to treat content as having a lifecycle, behaviors and attributes, and the [eight principles](/articles/eight-principles-of-information-architecture) are a good reminder that lifecycle belongs in the model rather than in someone's memory.

A simple lifecycle is enough for most teams:

| State | Meaning | Visible to readers? |
|---|---|---|
| Draft | Being written or revised | No |
| Published | Current and expected to be accurate | Yes |
| Under review | Past its review date or flagged as possibly outdated | Yes, possibly with a notice |
| Deprecated | Superseded or no longer recommended; kept for people who still need it | Yes, clearly marked, with a link to the replacement |
| Archived or removed | No longer served, or served only as a historical record | Redirected or marked as retired |

Store the state and review date as metadata so reports and templates can use them (see [content modeling and metadata](/articles/content-modeling-and-metadata)).

### Retiring content safely

Deleting a page is a structural change, because other pages, bookmarks, search results and external sites point to it. A safe retirement routine:

1. Identify what links to the page (internal links, navigation, search synonyms, external references you know about).
2. Decide the destination: a replacement page, a parent category, or a retirement notice.
3. Create a redirect from the old address to the destination. Redirect to the closest relevant page, not reflexively to the home page, which tells a reader nothing about where their content went.
4. Update inbound links you control.
5. Record the retirement and date.

A caution: not everything should be removed. Older material still matters for readers on older versions or for compliance and history. The question is whether it is clearly marked, findable from the right places and kept out of the way of current content.

## Review cadence

Reviews work when they are scheduled, small and tied to owners. A pattern that many teams find workable, offered as a starting point rather than a researched standard:

- **Continuous:** authors apply metadata and follow templates; builds check links and required fields.
- **Monthly or quarterly:** search and analytics review (what people searched for, what failed), plus vocabulary proposals backlog.
- **Annually, or around major product changes:** structure review. Re-test the top-level hierarchy, check whether categories still match how the organization and its users think, and prune.
- **Per piece of content:** a review date based on how fast the subject changes. Fast-moving reference material needs shorter intervals than conceptual explanations.

The cadence should match your capacity. A review calendar nobody follows is worse than a smaller one that happens.

## Measuring whether the architecture works

Measurement answers a simple question: can people find and understand what they need? No single number answers it, so measure at three levels.

### 1. Task success: can people find things in the structure?

Tree testing evaluates a hierarchical category structure, stripped of visual design and content, using tasks that have defined correct answers. According to Nielsen Norman Group, it can be used at the start of a redesign to benchmark the current structure, after a card sort to test the hierarchy that emerged, and before creating content or layouts. Quantitative tree tests can measure how long people take to find an item and what proportion succeed, and can show directness, meaning whether people went straight to their selection or bounced between categories.

For governance, the value is repetition. Run a baseline test, keep the task wording and structure notation stable, and repeat after significant changes or on the annual review. NN/g's tree-testing page gives no numeric thresholds for what counts as good, so do not borrow a target from elsewhere. Compare against your own earlier results, and read the failed paths to see where people went wrong. See [card sorting and tree testing](/articles/card-sorting-and-tree-testing) for how to run them.

Limits: a tree test checks the hierarchy, not search, page content or visual design. A good score says people can find things when they browse a clean tree, not that they succeed in the live product.

### 2. Search behavior: what are people asking for?

On-site search logs record what people want in their own words. Useful reports, with no particular numeric benchmarks implied:

- Most frequent queries, and whether the top results for each are the right ones.
- Queries that return no results.
- Queries followed by an immediate reformulation or no click.
- Terms people use that do not appear in your vocabulary.
- Searches that start from a page which should have answered the question.

Each finding should end in an action: a synonym, a renamed page, a new page, a corrected redirect or a change to navigation. [Search and findability](/articles/search-and-findability) describes a quarterly routine.

### 3. Content health: is the material trustworthy and maintained?

Content health indicators are properties of the content, mostly available from metadata and publishing tools:

| Indicator | What it tells you | Common distortion |
|---|---|---|
| Share of pages with an owner | Whether anyone is accountable | Owner field filled with a placeholder or departed employee |
| Pages past their review date | Backlog of possibly stale content | Dates bumped without actual review |
| Broken internal links and missing redirects | Structural integrity after changes | Only measures links, not whether the destination is right |
| Required metadata completeness | Whether filtering and reporting can work | Fields filled with default values |
| Duplicate or near-duplicate pages | Overlapping content that confuses readers and retrieval | Hard to detect without sampling by hand |
| Terms used in tags but absent from the vocabulary | Vocabulary drift | Free-text fields hide it |

### Reading metrics honestly

Every one of these is a proxy for the thing you care about. Page views can rise because content is popular or because people cannot find the answer and keep looking. A falling count of zero-result searches can mean better coverage, or fewer people bothering to search. Once a metric becomes a target, people tend to improve the number rather than the experience, for example by bumping review dates.

Practical guidance:

- Look at trends against your own history, not against borrowed benchmarks.
- Pair each number with examples: read the actual queries, open the actual failed paths.
- Report a few indicators that the owners can act on, not a dashboard no one reads.
- State sample sizes and caveats when presenting tree-test or survey results, particularly if participants were few or recruited from a narrow group.

## AI-era additions

If your content feeds retrieval or assistants, add a fourth level: do retrieval-based answers cite the right, current, correctly versioned sources? That requires test questions with known source passages, run regularly, so that a vocabulary change or a content reorganization does not quietly degrade answers. The method is described in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era). Governance decisions that were already important become more so: stale content, ambiguous labels and missing version metadata can now be repeated confidently by a model, not just encountered by a person.

## Avoiding launch and forget

Signs your architecture is being launched and forgotten:

- Nobody can say who approves a new top-level category.
- The vocabulary list was last edited at launch.
- Redirects are created when someone remembers.
- The last tree test or search log review was before the redesign.
- Deprecated content sits beside current content with no marking.

A first-month plan for a team starting from nothing:

1. Name a structure owner and a vocabulary owner, even if they are the same person.
2. Add owner, state and last-reviewed fields to the content model.
3. Set up a recurring calendar slot for search log review and book the first one.
4. Write down the vocabulary change process on one page and share it with authors.
5. Run a baseline tree test on the current top-level structure, or if you cannot, record the top ten failing search queries as your baseline.

## When heavy governance is the wrong answer

Governance has a cost, and the amount should fit the stakes. A small team with a few hundred pages and low change velocity can often govern with a shared document, a monthly check and a clear owner. A heavy approval board in that setting will be bypassed. In contrast, a large, regulated or multi-team environment where wrong information has real consequences justifies formal roles, controlled lists and audit trails. If you are unsure, start light, record where uncontrolled change causes a visible failure, and add control exactly there.
