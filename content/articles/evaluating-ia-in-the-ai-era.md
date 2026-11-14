---
title: "Evaluating IA in the AI era: human findability and machine retrieval"
description: "Evaluate IA on two layers, people finding things and models retrieving them, with golden sets, regression gates and a method for tracing bad answers to causes."
track: ai-era
order: 8
updated: "2026-11-14"
tags: ["evaluation", "retrieval metrics", "tree testing", "golden set", "RAG evaluation"]
takeaways:
  - "Evaluate two layers separately: can people find it, and can the retriever fetch the right source."
  - "A golden set of real questions with known source passages is the most useful single artifact."
  - "Most bad answers trace to an IA defect (wrong chunk, wrong version, missing content, ambiguous label), not the model."
  - "Metrics are proxies; report sample sizes, set-building method and known blind spots with every number."
sources:
  - title: "Tree Testing: Fast, Iterative Evaluation of Menu Labels and Categories"
    url: "https://www.nngroup.com/articles/tree-testing/"
  - title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
    url: "https://arxiv.org/abs/2309.15217"
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "Introducing Contextual Retrieval"
    url: "https://www.anthropic.com/engineering/contextual-retrieval"
  - title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: "https://arxiv.org/abs/2307.03172"
---

Classic IA evaluation asks whether people can find things. That question has not gone away, but it is no longer sufficient. If a retrieval system or an agent also reads your content, you have a second audience whose failures look different and are measured differently. A site can pass every tree test and still feed a model the wrong paragraph.

This article sets out a two-layer evaluation approach, shows how to build the test set that makes it work, and walks through error analysis that traces a bad answer back to a fixable structural cause. The goal is to make IA changes testable, so that "the new taxonomy is better" becomes a claim with evidence behind it.

## Two layers, two questions

| | Human findability | Machine retrieval |
|---|---|---|
| Question | Can a person locate the right place or answer? | Does the system fetch the passage that contains the answer? |
| Typical methods | Tree tests, first-click tests, task success, search log review | Test questions with known sources, retrieval metrics, answer-quality checks |
| Unit evaluated | Pages, categories, labels | Chunks, documents, tool descriptions |
| Failure looks like | Wrong path, backtracking, abandoned search | Missing, stale or wrong-version passage in context |
| Owner | IA, UX research | IA with search or ML engineering |

Keep the layers separate in reporting. A team that merges them into one score cannot tell whether a regression came from a navigation change or a chunking change.

### Layer one: human findability

Nielsen Norman Group describes tree testing as evaluating a hierarchical category structure, stripped of visual design and content, using tasks that have defined correct answers. It positions the method at the start of a redesign as a benchmark, after a card sort to test the hierarchy that emerged, and before creating content or layouts. Quantitative tree tests can measure how long people take and the proportion who succeed. NN/g also describes directness, meaning whether people went straight to their choice or bounced between categories. The article gives no numeric thresholds, so set your own by benchmarking the current structure first and treating that as the baseline to beat. For method details see [card sorting and tree testing](/articles/card-sorting-and-tree-testing).

Add the signals you already have:

- **Task success and time on task** from tree tests or moderated studies.
- **Search logs**: queries that return nothing, queries followed immediately by a reformulation, and queries that people run repeatedly. The [search and findability](/articles/search-and-findability) article covers a review routine.
- **Content health**: pages with no owner, stale review dates, duplicate topics. These are leading indicators, covered in [governance and measurement](/articles/ia-governance-and-measurement).

### Layer two: machine retrieval

Retrieval-augmented generation, as introduced by Lewis and colleagues, pairs a model's own parametric memory with a non-parametric memory, in their paper a dense vector index of Wikipedia, accessed by a neural retriever. The practical consequence for IA is that the retrieved passages decide what the model can say with grounding. Evaluating the retriever is therefore evaluating your structure.

The RAGAS paper (Es and colleagues, 2023) proposes reference-free evaluation of RAG pipelines across three dimensions: the retriever's ability to find relevant, focused context, the model's faithful use of that context, and the quality of the answer. That three-way split is useful even if you never use the tool, because it tells you where to look when something goes wrong.

| Dimension | Plain-language question | Example checks |
|---|---|---|
| Retrieval | Was the right source in the context? | Recall at k, precision at k, mean reciprocal rank (MRR) against known sources |
| Faithfulness | Did the answer stick to the retrieved text? | Claim-by-claim check against the context; groundedness review |
| Answer quality | Did it answer the question asked? | Answer relevance, human rating on a sample |

Plain definitions of the retrieval metrics, since the names are used loosely:

- **Recall at k**: of the passages that should be found, what share appear in the top k results.
- **Precision at k**: of the top k results, what share are relevant. Low precision means noisy context.
- **MRR**: the average of one divided by the rank of the first correct result. It rewards putting the right passage first.

Rank matters because of position effects. Liu and colleagues found that language models perform best when relevant information is at the beginning or end of a long input and drop significantly when it is in the middle, even for models built for long contexts. So a correct passage ranked fifth of ten may be retrieved but underused. Evaluate order, not just presence.

> **Key idea:** Retrieval metrics tell you whether your structure delivered the right material. Answer-quality metrics tell you what the model did with it. When both are bad, fix retrieval first.

## Build a golden set

A golden set is a list of questions, each paired with the source passage or passages that answer it and, ideally, a reference answer. It is the center of machine-layer evaluation. It is also the least glamorous artifact in the pipeline and the one most often skipped.

### How to build one

1. **Collect real questions.** Mine support tickets, search logs, community posts and sales or onboarding questions. Real phrasing beats invented phrasing, because users do not use your labels.
2. **Stratify.** Cover question types: lookup of a fact, how-to procedure, comparison, conditional ("if I am on plan X..."), and questions with no answer in the corpus. Cover products, versions and audiences in rough proportion to their importance.
3. **Map to sources.** For each question, a subject-matter expert marks the exact passage(s) that answer it, by stable identifier. Record the content version.
4. **Write reference answers** for a subset, short and checkable.
5. **Include negatives.** Questions the corpus cannot answer test whether the system admits it.
6. **Split.** Keep a held-out portion you do not tune against. Otherwise you will optimize to the test.
7. **Version it.** The set changes when the content changes. Record the date, the corpus version and who labeled it.

How large should it be? There is no universal number. Start with a few dozen questions you trust, enough to catch gross failures, and grow it as you find defects. A small, carefully labeled set beats a large noisy one. Report the size with every result, because a difference measured on 40 questions is a hint, not a finding.

> **Caution:** Questions written by the people who built the content tend to match its labels. If your golden set sounds like your headings, it will flatter your structure. Weight it toward user language.

### Where model-judged metrics fit

Some metrics, including those in the RAGAS family, use a language model as a judge. That makes them cheap to run at scale and reference-free, but a judge is itself a model with its own errors and biases. Calibrate it: have people rate a sample, compare their ratings to the judge's, and keep doing so after model updates. Treat judged scores as screening, and keep human review for decisions that matter.

## Regression gates

Once the golden set exists, wire it into change management. The principle is the same as tests in software: a change to structure should not ship if it makes known cases worse.

| Change | Run | Block if |
|---|---|---|
| New chunking rule or chunk size | Retrieval metrics on the full set | Recall or MRR drops on any content type beyond an agreed tolerance |
| Vocabulary or tag change | Metadata-filter queries; tree test if navigation is affected | Questions that relied on the old term now miss |
| New content type or template | Questions covering that type | Answers cite the wrong type or version |
| Content deprecation | Questions about the deprecated topic | System still cites the retired source |
| Embedding or retriever swap | Everything | Net regression, or any regression in high-priority categories |

Set tolerances before you see results. Agree who can override a gate and require a written reason. Expect noise: some metrics will move a little between identical runs, so run unchanged baselines to learn how much variation is normal.

## Error analysis: from bad answer to IA defect

Aggregate metrics tell you that something is wrong. Error analysis tells you what. Take failed questions and classify each one by the first point in the chain where it broke.

| Defect class | What you see | Typical IA cause | Typical fix |
|---|---|---|---|
| Wrong chunk | Right document, irrelevant passage retrieved | Chunk boundaries split a procedure; headings absent | Anchor chunks to headings; keep steps together |
| Context-free chunk | Passage lacks the subject or conditions | Pronouns and "this plan" with no antecedent | Add context to chunks; Anthropic's Contextual Retrieval work prepends short, chunk-specific context before embedding and indexing |
| Wrong version | Correct answer for a different release or product | No version or product metadata on chunks | Add metadata and filter on it |
| Missing content | Nothing relevant exists | Content gap | Write it, or confirm the system says it does not know |
| Ambiguous label | Retriever or user confuses two senses of a term | Overloaded term; synonyms unmanaged | Split the term; add synonyms and disambiguation |
| Stale source | Superseded passage still ranks | No deprecation process; duplicates | Retire, redirect, or mark superseded |
| Right passage, poor use | Correct context present but answer wrong | Position in context; too much noise | Reorder, reduce, or rerank; check faithfulness separately |
| Model error | Context is clean and the answer is still wrong | Not an IA problem | Escalate to the model or prompt owner |

The last row matters for honesty. Not every failure is yours. Classify first, then assign.

The Contextual Retrieval write-up reports that adding chunk-specific context reduced the retrieval failure rate in its tests, which it defined as 1 minus recall at 20, averaged across several datasets such as codebases and scientific papers. It also cautions that chunk size and boundaries matter and that readers should run their own evaluations. That is the right posture: borrow the technique, then measure on your content.

> **Example (fictional):** A support assistant tells a customer that an export limit is 10,000 rows. The correct limit for the customer's plan is different.
>
> Trace: the golden-set question "What is the export limit on the Team plan?" retrieves a chunk reading, "The limit is 10,000 rows." Recall at 5 is fine, since the right page is in the results, but the chunk does not name a plan. The page has a table with one row per plan, and the chunker split it so that each row lost its header. Two plans' limits now live in chunks that look alike.
>
> Classification: context-free chunk, compounded by missing plan metadata. Fix: keep table rows with their headers and prepend the plan name, add `plan` as a filterable field, and add five plan-comparison questions to the golden set. Re-run: retrieval for those five improves, and a spot check finds no regressions elsewhere. The model was never the problem.

## Reporting

A number without context misleads. Each report should include:

- **What was tested**: corpus version, date, system configuration, golden-set version and size.
- **How questions were chosen** and who labeled sources.
- **Results by layer**, split by content type, product and question type, not only the overall average. Averages hide the segment that is failing.
- **Confidence**: sample sizes, run-to-run variation, and whether any metric is model-judged.
- **Known blind spots**: question types you do not cover, languages, audiences.
- **Defect breakdown** from error analysis, with owners and next actions.
- **Changes since last report** tied to the gates above.

Avoid claims of causation you cannot support. If a structural change shipped the same week as a model update, say so and do not attribute the improvement to either.

## Limits

- **Golden sets age.** Content and user questions change. A set not refreshed is measuring last year's problems.
- **Labeling is subjective.** Two experts may disagree about which passage best answers a question. Allow multiple acceptable sources and record disagreement.
- **Proxy metrics can be gamed.** Optimizing recall at k on a small set can overfit. The held-out split and periodic fresh questions are your defense.
- **Human and machine layers can conflict.** A structure that helps a retriever, such as many short, self-contained topics, may be harder for a person to browse. Decide which audience a given surface serves and say so.
- **Judging answers is hard.** Faithfulness to retrieved text does not mean the text is correct. A system can faithfully repeat a wrong or outdated source.
- **Costs.** Expert labeling takes time. If you cannot afford a large set, a small, honest one still catches the worst defects.

## A starting checklist

- Baseline human findability with a tree test or equivalent before changing structure.
- Assemble 30 or more real questions with expert-labeled sources and some negatives, and record the count.
- Hold out part of the set.
- Report retrieval, faithfulness and answer quality separately.
- Gate structural changes on the golden set, with tolerances set in advance.
- Classify failures by defect class before assigning fixes.
- Refresh the set on a schedule and after major content changes.

For the structural levers you will be adjusting, see [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context). To place your current practice on a scale, see the [maturity model](/articles/an-ia-maturity-model-for-the-ai-era).
