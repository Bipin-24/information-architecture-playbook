---
title: "Using AI as an information architecture tool: where it helps and where it fails"
description: "A tool-agnostic workflow for using language models in IA work: what to delegate, what to keep, where review gates belong, and how to protect data."
track: ai-era
order: 7
updated: "2026-11-14"
tags: ["AI-assisted IA", "taxonomy", "content audit", "human in the loop", "card sorting"]
takeaways:
  - "Use AI to propose and summarize at scale; keep decisions, naming authority and organizational context with people."
  - "Write every AI proposal to a reviewable file before anything touches a live taxonomy or content store."
  - "Models are inconsistent and tend to favor established frameworks, so test for drift and for categories you never asked for."
  - "Treat research data, customer content and unreleased plans as confidential before choosing where a model runs."
sources:
  - title: "Empowering Information Architecture with AI: Making It Real"
    url: "https://jarango.com/2024/05/12/empowering-information-architecture-with-ai-making-it-real/"
  - title: "Scale Smart: AI-Powered Content Organization Strategies"
    url: "https://jarango.com/2024/10/15/scale-smart-ai-powered-content-organization-strategies/"
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Card Sorting: Uncover Users' Mental Models for Better Information Architecture"
    url: "https://www.nngroup.com/articles/card-sorting-definition/"
  - title: "Tree Testing: Fast, Iterative Evaluation of Menu Labels and Categories"
    url: "https://www.nngroup.com/articles/tree-testing/"
---

Language models are good at language: summarizing, rewriting, sorting text into buckets, and proposing names. Much of IA work is exactly that kind of work done at a scale no one enjoys. That makes models a reasonable assistant for the tedious parts of the job, and a poor substitute for the parts that depend on knowing the organization, its users and its history.

This article is about the first kind of use. It covers where AI earns its place in an IA workflow, where it fails in ways that are easy to miss, and a review process that keeps a person accountable for the structure. It is deliberately tool-agnostic. Models, interfaces and pricing change faster than methods do, and a workflow that depends on one product will age badly. For the reverse question, how to structure content so models can read it, see [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

## A framing: assist the activities, do not hand them over

Jorge Arango describes IA as three activities: organize information, set the context, and plan for change. In his February 2025 post "Jorge's Wager," he argues that current AI cannot independently perform those activities, and that organizations should act as if general AI is not imminent and use today's tools with human architects guiding them. He also states that his views may be wrong. That is a sensible stance for a practitioner: use the tools for what they demonstrably do, and keep accountability where context lives.

A practical translation is a split between **proposing** and **deciding**. A model can propose a hundred candidate tags in the time it takes you to read ten pages. It cannot know that "Accounts" means two different things to your billing and identity teams, or that a term was retired last year after a legal dispute. Proposing is cheap and can be wrong. Deciding is where the cost of being wrong lands.

> **Key idea:** Delegate the generation of options, not the choice among them. Every AI output in an IA workflow should be a candidate that a named person accepts, edits or rejects.

## Where AI helps

The uses below are ordered roughly from lowest to highest risk. The pattern is consistent: the less the task depends on organizational knowledge, the better it suits a model.

| Task | What the model does | Main risk | Review gate |
|---|---|---|---|
| Summarizing research | Condenses interview notes, support tickets or survey comments into themes | Dropped minority views; invented quotes | Spot-check themes against raw notes; require verbatim quotes you can find in the source |
| Content audit support | Drafts a one-line description, topic and audience guess per page | Confident but wrong labels on thin pages | Sample a fixed percentage per content type |
| Tag and category proposals | Suggests tags for each item from a vocabulary or from scratch | Inconsistent application; invented tags | Write to a spreadsheet; compare against existing tags |
| Draft taxonomies | Proposes a first-pass hierarchy from a content sample | Generic, textbook structure that ignores your domain | Treat as a strawman for a working session |
| Concept maps and relationships | Lists entities and candidate relationships | Plausible but false relationships | Domain expert validates each relationship type |
| Card-sort synthesis | Summarizes groupings and proposes category names | Smooths over disagreement; names become final by default | Analyze raw groupings yourself first |
| Label suggestions | Offers alternatives for unclear labels | Labels in the model's voice, not your users' | Test candidates with users |

### A documented example: tag proposals reviewed in a spreadsheet

Arango's May 2024 post describes using GPT-4 through the `llm` command-line tool to propose new tags for a site of roughly 1,200 pages. The detail worth copying is the control, not the model. The proposals were written to a CSV so he could review them against the existing tags before changing anything. The post is a first-person account of one site, so read it as a worked pattern rather than evidence of how well the approach generalizes.

The review-file pattern is the transferable part. A CSV (or any table) forces each proposal into a row that can be sorted, filtered, diffed and signed off. Compare that with a chat window where suggestions scroll away and nobody can say what was accepted.

### Scale and context limits

In his October 2024 "Scale Smart" talk write-up, Arango discusses using models to organize content at scale and define taxonomies, and notes that content sets larger than a model's context window may be handled with graph-based retrieval. The practical point: a model cannot reason over a corpus it cannot see. Once your inventory exceeds what fits in one request, you are choosing a sampling or retrieval strategy, and that strategy becomes a source of bias. Document it.

## Where AI fails

These failures are predictable enough to test for.

**Inconsistency.** Ask a model to tag the same page twice and you may get different tags. Ask it to tag ten similar pages and the vocabulary may drift: "setup," "installation," "getting started," each used where one controlled term should be. Controlled vocabularies exist precisely to prevent this, so give the model the vocabulary as input and require it to choose from it, with a separate "propose new term" column for exceptions.

**Invented categories.** Models fill gaps with plausible-sounding structure. If your instruction implies a taxonomy should have five top-level groups, you may get five whether or not your content supports them. Look for categories with one or two members, and for categories that no page in your inventory fits.

**A pull toward established frameworks.** Arango has written about AI's conservatism, and the one-line takeaway is that models favor established frameworks. In IA terms, expect textbook structures: by audience, by product, by lifecycle stage. Those may be right, or they may hide the odd, local distinctions that make your domain yours. A taxonomy that looks tidy and generic is a warning sign, not a success.

**No organizational context.** Models do not know your politics, your legal constraints, your release calendar, or which team owns which term. They cannot tell whether a stakeholder objection is a preference or a hard constraint. This is the "set the context" activity from Arango's framing, and it stays with you.

**Unexamined confidence.** Output reads fluently whether it is right or not. Fluency is not evidence. Plan for review sampling rather than trusting tone.

> **Caution:** A model summarizing card-sort results can make a messy, contested outcome sound like a clean consensus. Open sorts produce disagreement by design. If the summary has no disagreement in it, it has probably removed some.

## A human-in-the-loop workflow

This is a recipe, not a prompt. Adapt the steps to whatever tool you use.

1. **Define the decision.** Write down what will change if the work succeeds: a tag set, a hierarchy, a label. If no decision follows, skip the AI step.
2. **Fix the vocabulary and constraints first.** List existing tags, forbidden terms, required top-level groups and audience language. Models do better when constrained, and reviewers need something to measure against.
3. **Run on a sample.** Take a stratified sample across content types and ages. Inspect every output. Adjust constraints. Only then scale.
4. **Write proposals to a file.** One row per item: item ID, proposed value, existing value, the model's stated reason, and empty columns for reviewer, decision and note. Never let the model write to a live system.
5. **Review with gates.** Use the table below to set how much human checking each kind of change needs.
6. **Measure consistency.** Re-run a small subset a second time and compare. Disagreement between runs tells you how much of the output is signal.
7. **Record provenance.** Keep the tool, model identifier, date, input sample and instructions with the decision log. Without this you cannot explain a structure later.
8. **Validate with users.** Anything that changes labels or hierarchy goes through the same tests as human-made proposals, such as a [card sort and tree test](/articles/card-sorting-and-tree-testing). NN/g describes tree testing as evaluating a proposed hierarchy with tasks that have defined correct answers; it does not matter who drafted the hierarchy.

| Change type | Reversibility | Suggested review |
|---|---|---|
| Internal notes, summaries, draft descriptions | High | Spot-check a sample |
| Tags on a staging copy | High | Review every proposed new term; sample applied tags |
| New or renamed vocabulary terms | Medium | Taxonomy owner approves each term |
| Top-level navigation, URL changes | Low | Full review, user testing, redirect plan |
| Anything affecting access or compliance labels | Low | Do not automate; human decision with audit trail |

> **Example (fictional):** A documentation team has 900 articles and a tag set that grew without an owner. They export titles, first paragraphs and current tags to a table. A model proposes tags drawn only from an approved list of 40 terms, plus a column for suggested new terms. The reviewer finds that "migration" was applied to both data migration and account migration pages. Rather than patch rows, the team splits the term, updates the vocabulary, and reruns the sample. The model saved reading time; the diagnosis of the real problem, an ambiguous term, came from a person who knew the product.

## Privacy and data handling

Before any content goes to a model, decide what it is. IA inputs often include material that is more sensitive than it looks.

- **Research data** can contain personal information and candid statements participants made under an agreed consent scope. Check that scope before processing transcripts with any external service.
- **Customer-facing content** drafts may include unreleased products or contract-specific language.
- **Internal structure documents**, such as org-specific taxonomies and stakeholder notes, are confidential by default.

Prefer approved tools and deployments, minimize and redact personal data before processing, and keep prompts free of secrets and credentials. If you cannot say where the data goes and how long it is retained, do not send it. Your security and legal owners decide what is approved; this article cannot.

## Limits of this approach

- The evidence base is thin. Most public accounts, including the one cited above, are single-practitioner descriptions rather than controlled comparisons. Savings reported by one team on one site may not transfer.
- Review is not free. If reviewing proposals takes nearly as long as producing them, the model has added a step, not removed one. Measure the actual time on a pilot.
- Some work should stay manual. Small sites, highly specialized domains with few documents, and politically sensitive naming decisions often do not benefit.
- Model behavior changes between versions. A workflow that was consistent last quarter may drift after an update. Pin versions where you can and re-run your consistency check when they change.

## A short checklist

- Is a person named as the decision owner for each output type?
- Do proposals land in a reviewable file, not a live system?
- Is the controlled vocabulary an input, not an afterthought?
- Have you sampled outputs for invented categories and generic structure?
- Did you re-run a subset to measure consistency?
- Are tool, model version, date and instructions logged?
- Have you confirmed that the data may be sent where you are sending it?
- Will users test any label or hierarchy change before release?

Once structure is in place, [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era) covers how to check the result, whether a person or a model proposed it.
