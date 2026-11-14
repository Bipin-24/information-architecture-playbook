---
title: "IA for RAG: chunking, metadata, and context"
description: "How chunking, context enrichment, metadata filters, and ordering decide what a RAG system retrieves, with a bad-versus-good chunk example and a checklist."
track: ai-era
order: 3
updated: "2026-11-14"
tags: ["RAG", "chunking", "metadata", "contextual retrieval", "retrieval"]
takeaways:
  - "A chunk is the new page: it must make sense when read alone, without its neighbors."
  - "Anchor chunks to headings and content types before trying semantic splitting."
  - "Metadata filters (product, version, audience) prevent wrong-version answers that similarity search cannot."
  - "Published retrieval gains are conditional; measure on your own questions."
sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "Introducing Contextual Retrieval"
    url: "https://www.anthropic.com/engineering/contextual-retrieval"
  - title: "Late Chunking: Contextual Chunk Embeddings Using Long-Context Embedding Models"
    url: "https://arxiv.org/abs/2409.04701"
  - title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: "https://arxiv.org/abs/2307.03172"
  - title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
    url: "https://arxiv.org/abs/2309.15217"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
---

A retrieval-augmented generation (RAG) system answers a question in two steps. A retriever finds passages, then a language model writes an answer from them. Lewis et al., in the 2020 paper that named the approach, combined a model's built-in (parametric) memory with an external, searchable (non-parametric) memory: a dense vector index of Wikipedia, accessed by a neural retriever. Their abstract names provenance and updating knowledge as open problems that an explicit external memory can address. That is motivation, not a guarantee, and it is a useful way to see the stakes: the model can only be as good as what the retriever hands it.

What the retriever hands it is decided by structure. How content is split, what each piece says about itself, which pieces are eligible for a given question, and in what order they reach the model are all information architecture decisions. They are organization, labeling, and search, the systems described in [the four systems of IA](/articles/the-four-systems-of-ia), applied to a reader that has no eyes and no patience for ambiguity. This article walks the pipeline from that angle. For the broader argument, see [why IA matters more in the AI era](/articles/why-ia-matters-more-in-the-ai-era).

## The pipeline, read as an IA problem

A typical pipeline has six stages. Each one has an IA counterpart.

| Stage | What happens | IA counterpart |
|---|---|---|
| Ingest | Source documents are parsed into text and structure | Content inventory and content model |
| Chunk | Documents are split into retrievable units | Deciding the unit of organization |
| Enrich | Context and metadata are attached to each chunk | Labeling |
| Index | Chunks are embedded and/or indexed for keyword search | Search system design |
| Retrieve and rerank | Candidates are fetched, filtered, and reordered | Search relevance and scoped search |
| Assemble | Selected chunks are placed in the prompt | Presentation and sequencing |

Many disappointing RAG answers trace back to the first three rows rather than the model: if the unit is wrong or the labels are missing, prompt tuning cannot recover what was never retrievable. [Evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era) covers how to confirm that diagnosis with data.

> **Key idea:** In a page-based world, a reader arrives at a page and brings context from the site around it. A retrieved chunk arrives alone. Every chunk has to carry enough of its own context to be understood and correctly attributed.

## Chunking: choosing the unit

Chunking is the decision about what the smallest retrievable unit is. The common strategies differ in how much they respect the structure authors already created.

| Strategy | How it splits | Strengths | Weaknesses | Best fit |
|---|---|---|---|---|
| Fixed-size | Every N tokens or characters, often with overlap | Simple, predictable, works on any text | Cuts mid-sentence and mid-table; ignores structure | Unstructured text, quick baselines |
| Recursive | Tries large separators first (sections, paragraphs), then smaller ones until pieces fit | Respects some natural boundaries; easy to adopt | Boundaries are guessed from characters, not meaning | General prose with light structure |
| Heading-anchored | Splits at headings, keeps the heading path with the chunk | Uses the author's own organization; chunks are labeled by default | Depends on good headings; sections can be too long or too short | Documentation, policies, knowledge bases |
| Semantic | Splits where the topic shifts, detected by embedding similarity | Can find boundaries authors never marked | Adds cost and tuning; boundaries can be unstable between runs | Transcripts, long unstructured documents |
| Structure-aware by type | Different rules per content type (one chunk per FAQ pair, per API parameter table, per procedure) | Matches the unit to how the content is used | Needs a content model and per-type rules | Mixed corpora with a clear model |

There is no universally best chunk size, and this article will not invent one. Smaller chunks make matching more precise but strip context; larger chunks keep context but dilute the match and consume prompt space. Anthropic's write-up on Contextual Retrieval notes that chunk size, boundaries, and overlap affect results. Treat size as a parameter you tune against your own questions.

### Why heading-anchored chunking is the default to try first

If you already have well-structured content, the cheapest strong move is to chunk along the structure you have. A section under a clear heading is usually a coherent unit, and the heading path (for example, "Billing > Refunds > Partial refunds") is a free label. Prepend that path to the chunk text and store it as metadata. This is the same instinct as [documentation IA](/articles/documentation-information-architecture): one topic, one purpose, a descriptive heading.

Two rules keep this from failing. Split inside long sections at paragraph or list boundaries, repeating the heading path on every piece. And never separate a table, code block, or procedure from its lead-in sentence, because a step list without its goal statement is unlabeled.

> **Caution:** Heading-anchored chunking inherits your headings. If your headings read "Overview", "Details", and "More information", the chunks will carry those labels too. Fix the headings first. This is a labeling problem that [content modeling](/articles/content-modeling-and-metadata) and editing solve better than any splitter.

## Context enrichment: making chunks stand alone

The classic failure is the orphaned chunk. Anthropic's Contextual Retrieval post gives a clean example: a chunk reading "The company's revenue grew by 3% over the previous quarter" does not say which company or which period, so it is nearly useless on its own.

The technique Anthropic describes is to generate a short, chunk-specific piece of context (usually 50 to 100 tokens), using an LLM that sees both the whole document and the chunk, and to prepend it to the chunk before embedding (Contextual Embeddings) and before building the BM25 keyword index (Contextual BM25).

Anthropic reports the following, and the conditions matter. The metric is the retrieval failure rate, defined as 1 minus recall@20, averaged across the domains they tested (codebases, fiction, ArXiv papers, and science papers), using the best embedding configuration.

| Configuration (Anthropic's test) | Failure rate | Reported reduction vs. baseline |
|---|---|---|
| Baseline | 5.7% | n/a |
| Contextual Embeddings | 3.7% | 35% |
| Contextual Embeddings + Contextual BM25 | 2.9% | 49% |
| Above + reranking | 1.9% | 67% |

These are one team's results on their datasets, with their pipeline. They are not a general guarantee, and your corpus may behave differently. The authors also caution that generic document summaries added little, that domain-tailored prompts may do better, that you should run your own evaluations, and that reranking adds latency and cost.

The IA reading is that the added sentence is a label, doing what a page title and breadcrumb do for a human arriving from search. If authors write that context at source (a first sentence naming product, version, and subject), you get some of the benefit without a generation step.

> **In practice:** Whenever a sentence contains a number, a limit, a condition, or a pronoun that points outside the sentence ("this", "it", "the previous quarter"), check whether the chunk names what it refers to. Numbers and conditions are where orphaned chunks do the most damage, because the answer sounds right and is attributed to the wrong thing.

## Late chunking: keeping context in the embedding

Late chunking, described by Günther et al. (authors from Jina AI) in 2024, attacks the same problem inside the embedding model. Instead of splitting first and embedding each piece separately, you embed the whole long text with a long-context embedding model, then split into chunks after the transformer step and before mean pooling. Each chunk embedding is therefore computed with awareness of the surrounding text. The authors state that it works without extra training.

It requires a long-context embedding model, and it changes the embedding, not the stored text: a keyword index and a human reading the chunk still see no added context. It complements, rather than replaces, writing chunks that stand alone.

## Metadata: filtering before similarity

Similarity search finds passages that sound like the question. It cannot tell that a passage describes version 2 when the user runs version 4, or that it applies to administrators and the user is a guest. Metadata can, if you attach it and filter on it.

A minimum useful set, in the spirit of [content modeling and metadata](/articles/content-modeling-and-metadata):

| Field | Purpose | Failure it prevents |
|---|---|---|
| `product` | Scope to the right product or module | Answers about the wrong product that uses similar words |
| `version` (or `valid_from` / `valid_to`) | Scope to what applies now | Wrong-version answers |
| `audience` | Admin, developer, end user | Instructions the user cannot perform |
| `content_type` | Tutorial, how-to, reference, explanation | Reference tables returned for "how do I" questions |
| `source_url` and `section_path` | Citation and traceability | Unverifiable answers |
| `last_reviewed` | Freshness signals and review queues | Silently stale content |
| `status` | Draft, published, deprecated | Retrieving content that should be gone |

Use controlled values for these fields, as described in [taxonomies, ontologies, and controlled vocabularies](/articles/taxonomies-ontologies-and-controlled-vocabularies). A filter on `version = "4"` silently misses chunks tagged `v4` and `4.0`. The filter is only as reliable as the vocabulary behind it.

Filters can take their values from application context (the user is in product X, version 4) or from a model that infers them from the question. Context is more reliable when you have it; inferred filters can drop the right chunk when the guess is wrong, so log them and review misses.

## Hybrid retrieval and reranking

Embedding search is good at paraphrase and weak at exact strings: error codes, part numbers, function names, and rare product terms. Keyword search (BM25 is the usual method) is the reverse. Combining both, often called hybrid retrieval, is common practice for this reason, and Anthropic's reported results above include a BM25 component. A reranker then takes the merged candidate list and reorders it using a model that reads the question and each candidate together. It is more accurate than first-pass retrieval and slower and costlier, which is why it runs on a short list.

From the IA side, this is the old lesson that [search](/articles/search-and-findability) needs both the controlled vocabulary and the words people type. Index synonyms and alternate labels alongside the content so a user's word finds your term.

## Ordering and budgets: what the model actually reads

Retrieval returns more than you can usefully show. Two constraints shape what to include.

**Position matters.** Liu et al. found in "Lost in the Middle" that language models tend to perform best when relevant information sits at the beginning or end of a long input, and that performance drops significantly when it sits in the middle, even for models built for long contexts. Practical implications: do not pad the prompt with marginal chunks, and consider placing the strongest passages at the edges. The effect was measured on specific tasks and models, so test your own setup.

**Tokens are a budget.** Every chunk costs money, latency, and attention, so set a budget, rank by usefulness, and drop duplicates. Near-duplicates are an IA smell: the same fact in three places is three chances to be out of date, and it crowds out other evidence. [Documentation IA](/articles/documentation-information-architecture) treats this as single-sourcing.

## A worked example (fictional)

> **Example (fictional):** A help center for an invented product, "Tessera Billing", has an article titled "Limits". Fixed-size chunking cuts it into pieces. One piece reads:

**Bad chunk**

```text
...requests above this threshold are rejected with an error. The limit
resets every 60 seconds. Enterprise accounts can request an increase.
For partial refunds, see below.
```

This chunk has four problems. "This threshold" points at a number in the previous chunk. It does not name the product, the API, or the plan. It ends with a dangling "see below". No version is stated. A user asking "What is the rate limit for the Tessera Billing API v2 on the Standard plan?" may retrieve it, but the model cannot tell what the limit is, what it applies to, or which plan it describes.

**Good chunk** (heading-anchored, enriched, with metadata)

```text
Tessera Billing > API reference > Rate limits (API v2, Standard plan)

Standard-plan accounts can send up to 100 requests per minute to the
Billing API v2. Requests above 100 per minute are rejected with HTTP 429.
The counter resets every 60 seconds. Enterprise accounts can request a
higher limit through their account manager.
```

```yaml
product: tessera-billing
version: "2"
audience: developer
content_type: reference
plan: standard
section_path: ["API reference", "Rate limits"]
source_url: "https://docs.example.com/billing/api/rate-limits"
last_reviewed: "2026-09-02"
status: published
```

What changed was editing, not engineering. The heading path names product, section, version, and plan; the number sits beside its condition; the pronoun is gone; the metadata allows a version filter and a citation. A content team can own all of it. (The numbers are invented.)

## A checklist for AI-ready content structure

Use this to review a content set before indexing it, and again whenever the model changes.

1. Every section has a descriptive heading that makes sense out of context.
2. Each chunk names its product, subject, and version, either in text or in metadata.
3. Numbers, limits, and conditions appear in the same chunk as the thing they describe.
4. No chunk depends on "above", "below", "this", or "the previous section" to be understood.
5. Tables, code blocks, and procedures stay whole, with their lead-in sentence.
6. Chunking rules are documented per content type, not only globally.
7. Metadata uses controlled values, with an owner for the vocabulary.
8. Version and audience are filterable fields, not just words in the body.
9. Deprecated content is marked or removed from the index, with redirects handled on the human side.
10. Duplicate passages are consolidated or linked.
11. Keyword and embedding retrieval both run, and synonyms are indexed.
12. Retrieved context has a token budget and a deliberate order.
13. A test set of real questions with known source passages exists, and changes to chunking or metadata are checked against it.

## Limits and open questions

This is a fast-moving area, and some of this advice will age. A few things to hold loosely.

- **Published gains are conditional.** The Contextual Retrieval figures come from Anthropic's chosen datasets and metric. Late chunking is a method paper. Neither tells you what happens on your corpus.
- **Enrichment has costs.** Generated context must be regenerated when documents change, and it can be wrong, so sample it.
- **More structure is not always better.** Per-type chunking rules are costly to maintain. For small, well-written content, a heading-anchored baseline plus a test set may be enough.
- **Evaluation is the real answer.** RAGAS proposes reference-free metrics for the retriever's ability to find relevant focused context, the model's faithful use of it, and answer quality. Scores are approximations; read failures by hand too.

Build a small question set and change one variable at a time. If the numbers move, you have found an IA lever.
