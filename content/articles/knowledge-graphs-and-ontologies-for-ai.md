---
title: "Knowledge graphs and ontologies for AI: when they earn their cost"
description: "What a knowledge graph adds beyond vector search, how GraphRAG works and where its evidence stops, and how to start small and test against a flat baseline."
track: ai-era
order: 4
updated: "2026-11-14"
tags: ["knowledge graph", "ontology", "GraphRAG", "SKOS", "SHACL"]
takeaways:
  - "A graph stores explicit relationships; vector search stores similarity. They answer different kinds of questions."
  - "GraphRAG's reported gains are for corpus-wide summary questions on two datasets, not for lookups in general."
  - "Use SKOS for vocabularies and SHACL to validate the graph; keep the model small and owned."
  - "Always compare a graph pipeline against a flat retrieval baseline on the same questions."
sources:
  - title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization"
    url: "https://arxiv.org/abs/2404.16130"
  - title: "SKOS Simple Knowledge Organization System Reference"
    url: "https://www.w3.org/TR/skos-reference/"
  - title: "Shapes Constraint Language (SHACL)"
    url: "https://www.w3.org/TR/shacl/"
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
    url: "https://arxiv.org/abs/2309.15217"
  - title: "Scale Smart: AI-Powered Content Organization Strategies"
    url: "https://jarango.com/2024/10/15/scale-smart-ai-powered-content-organization-strategies/"
---

Information architects have long worked along a spectrum of structure: a flat list, a taxonomy, a thesaurus, an ontology. A knowledge graph is where the far end of that spectrum becomes data a machine can traverse. Instead of documents with labels, you have things (products, people, policies, versions) and the explicitly named relationships between them.

That is attractive for AI systems, because retrieval by similarity alone has blind spots. But graphs are expensive to build and easy to over-build. This article explains what a graph adds, what GraphRAG actually showed, which standards help, and how to decide, with evidence, whether your content needs one. It assumes you know the basics from [taxonomies, ontologies, and controlled vocabularies](/articles/taxonomies-ontologies-and-controlled-vocabularies) and the chunk-and-embed pipeline in [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

## From taxonomy to graph

The steps along the spectrum add different things.

| Structure | What it captures | Typical use |
|---|---|---|
| Taxonomy | Hierarchy: this is a kind of that | Navigation, tagging, filtering |
| Thesaurus | Hierarchy plus preferred and non-preferred terms and associative links | Search, indexing, consistent labeling |
| Ontology | Classes, properties, constraints, and instances, with rules about what may relate to what | Shared meaning, validation, inference |
| Knowledge graph | Instances and their relationships, as data (often using an ontology as its schema) | Traversal, joins across sources, grounded answers |

The terms overlap in practice, and people use "knowledge graph" loosely. A working distinction: a taxonomy helps people and systems find things; an ontology says what kinds of things and relationships exist; a graph is the populated data. Taxonomy for findability, ontology for relationships and reasoning, as the usual shorthand goes.

> **Key idea:** A vector index answers "which passages look like this question?" A graph answers "what is connected to this thing, and how?" Neither replaces the other, and many questions need both.

## What a graph adds over vector retrieval

Similarity search is strong for open-ended natural language questions against prose. It is weak in several situations where explicit structure is strong.

- **Multi-hop questions.** "Which products use a component affected by this advisory?" requires following links from advisory to component to product. No single passage may contain all three.
- **Exact relationships and constraints.** "Which version replaced this one?" or "Who owns this policy?" are facts about relationships, and similarity can retrieve a near-miss that sounds right.
- **Disambiguation.** Two entities with the same name (a product and a feature, two people) get separate identifiers in a graph. In embeddings they blur together.
- **Aggregation.** Counting, listing everything of a type, or finding what is missing is natural in a graph and awkward in retrieval over chunks.
- **Provenance.** Each statement can point to its source, which supports the traceability that RAG was motivated by from the start.

What a graph does not add: it does not make text understandable by itself, it does not correct wrong source content, and it does not remove the need for chunks. For descriptive or procedural questions ("how do I configure X?"), well-chunked prose retrieval is usually the better tool and far cheaper.

## GraphRAG: what was shown and what was not

"GraphRAG" is used loosely for any retrieval that involves a graph. The specific method most people mean comes from Edge et al. at Microsoft Research, in "From Local to Global: A Graph RAG Approach to Query-Focused Summarization."

**The problem they targeted.** Standard RAG struggles with global questions about a whole corpus, such as "what are the main themes in the dataset?" These are query-focused summarization tasks, not lookups. Retrieving the top few chunks cannot summarize a million tokens.

**The method.** An LLM extracts an entity knowledge graph from the source text. The graph is partitioned into communities of related entities, using community detection algorithms such as Leiden. The system pregenerates a summary for each community. At question time, it answers by a map-reduce process over the community summaries: partial answers from each, then a combined answer.

**What they reported.** For global sensemaking questions over datasets in the range of about one million tokens, they report substantial improvements over a conventional RAG baseline in the comprehensiveness and diversity of answers. Two scope notes matter. The comparisons were judged by an LLM, and the datasets were specific (podcast transcripts and news articles). Neither tells you how it performs on your documentation or on factual lookups, which were not the target.

> **Caution:** Do not read GraphRAG results as "graphs beat vectors." The paper's claim is narrower: for corpus-wide summary questions on those datasets, a graph-derived hierarchy of summaries produced more comprehensive and diverse answers than conventional RAG. The approach also front-loads cost, because an LLM processes the corpus to extract entities and write community summaries, and that work must be refreshed when the corpus changes.

Jorge Arango, in his 2024 "Scale Smart" talk, makes a related practical point: content sets larger than a model's context window may be handled with graph-based retrieval. That is a pointer to where graphs help in IA work, not a measured result.

## Standards that do the unglamorous work

Two W3C Recommendations cover most of what an information team needs, and both are worth knowing before you invent your own formats.

**SKOS** (Simple Knowledge Organization System, 2009) is a data model for sharing and linking knowledge organization systems on the Web, built on RDF. Its core pieces are `skos:Concept`, `skos:ConceptScheme`, `skos:prefLabel` (at most one per language), `skos:altLabel`, `skos:broader` and `skos:narrower` for hierarchy, and `skos:related` for associative links, which are symmetric and not transitive. Use it for the vocabulary layer: the controlled terms and their synonyms that tag content and normalize queries.

**SHACL** (Shapes Constraint Language, 2017) is a language for validating RDF graphs against a set of conditions. Use it to enforce your rules mechanically: every Product has exactly one owner, every Policy has an effective date, no Version supersedes itself. Without validation, graphs drift into inconsistency, and inconsistent graphs produce confidently wrong answers.

| Concern | Tool | Example |
|---|---|---|
| Controlled terms, synonyms, hierarchy | SKOS | "Invoice" with alt label "bill", narrower "credit memo" |
| Entity types and relationship vocabulary | Ontology (often RDFS/OWL, kept small) | Class `Product`, property `supersedes` |
| Data quality rules | SHACL shapes | Each `Product` has one `owner` |
| Stored facts | RDF triples or a property graph | Specific products, versions, owners |

You do not have to use RDF. Property graph databases are common and fine for many projects. The point is to separate three things: the vocabulary, the schema, and the facts, and to keep each under an owner.

## Modeling entities and relationships

Good graph modeling is mostly content modeling with a stricter discipline. Start where [content modeling](/articles/content-modeling-and-metadata) starts: the objects your readers and systems care about, their attributes, and how they relate.

1. **List the questions first.** Write the questions the system must answer that retrieval alone fails on. Entities and relationships you cannot justify with a question stay out.
2. **Pick a small set of entity types.** Keep the first scope deliberately small. Each type needs a definition and an identifier scheme.
3. **Name relationships as verbs from the domain.** `supersedes`, `appliesTo`, `requires`, `ownedBy`. Avoid a generic `relatedTo` except as a fallback, because it carries no meaning a query can use.
4. **Model time and version explicitly.** A fact true for version 3 and false for version 4 is the norm in product content. Put validity on the relationship or entity, not in prose.
5. **Link entities to content.** Each node should point to the passages and pages that describe it, so graph traversal can hand off to chunk retrieval and citations.
6. **Assign owners.** A relationship type with no owner decays. This is the "no owner" mistake that sinks vocabularies too.

> **Example (fictional):** A documentation team for an invented product suite, "Tessera", wants to answer: "Which of our connectors stop working if a customer upgrades the core engine to version 5?" The facts are scattered across release notes and connector pages. A small graph holds them as triples (a fictional vocabulary, written in Turtle):

```turtle
@prefix ex:   <https://example.org/tessera/> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

ex:engine-5        a ex:Release ;
                   skos:prefLabel "Tessera Engine 5"@en ;
                   ex:supersedes ex:engine-4 .

ex:connector-orders a ex:Connector ;
                    skos:prefLabel "Orders connector"@en ;
                    skos:altLabel  "order sync"@en ;
                    ex:requiresEngineBelow ex:engine-5 ;
                    ex:describedBy <https://docs.example.org/connectors/orders> .
```

A query that finds connectors whose `requiresEngineBelow` points at `engine-5` returns a list, with a link to the page that explains each. A text-only retriever might find release-note paragraphs but could easily miss a connector whose page never mentions version 5. The graph earns its keep here because the question is relational and the answer must be complete, not merely plausible.

## When a graph earns its cost, and when it does not

| Signal | Points toward a graph | Points toward flat retrieval |
|---|---|---|
| Question type | Multi-hop, relational, "list all", "what depends on" | Descriptive, procedural, "how do I" |
| Corpus-wide synthesis | Frequent "themes" or "overview" questions across a large corpus | Rare |
| Entity stability | Entities with stable identities and clear types | Mostly narrative prose |
| Need for completeness | Missing an item has real consequences | Approximate answers are fine |
| Maintenance capacity | A named owner and a change process | No one to own the model |
| Content size | Large, many sources, many systems of record | Small or single-source |

Costs to count honestly: extraction or manual curation, schema design, validation, entity resolution (deciding that two records are the same thing), refresh when sources change, and the query layer. Extraction by an LLM is fast and imperfect; you must sample its output, because a wrong edge in a graph is harder to spot than a wrong sentence.

When not to build one: the corpus is small enough that good chunking and metadata already answer your test questions; there is no owner; the questions are mostly "how do I" procedures; or the real problem is that the source content is out of date or contradictory. A graph built on contradictory content faithfully organizes the contradictions.

## Start small, test against a flat baseline

A defensible plan fits in a few steps.

1. **Establish the baseline.** Build the best flat pipeline you can: heading-anchored chunks, metadata filters, hybrid retrieval. Measure it on a question set. See [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era) for how to build one.
2. **Find the failures that structure could fix.** Classify misses. Are they multi-hop, completeness, or disambiguation errors? If not, a graph is the wrong tool.
3. **Model the minimum.** Two or three entity types and a few relationship types that cover those failures. Use SKOS for terms and SHACL for rules.
4. **Populate semi-manually.** Extract with an LLM if you like, but review a sample, and record the source passage for each edge.
5. **Wire it into retrieval narrowly.** Route only the question types the graph is for, and let everything else use the baseline.
6. **Re-run the same questions.** Compare accuracy, faithfulness (frameworks such as RAGAS define reference-free metrics for faithful use of retrieved context), latency, and cost. Keep the graph only if it wins on the questions that matter.
7. **Plan the upkeep.** Decide who updates the graph when a release ships, and what happens when the source and graph disagree.

A graph also forces agreement on what "product", "version", and "customer" mean. That can pay off even if the retrieval gain is modest, as long as you do not credit it to the algorithm.

## Honest limits

- The strongest public evidence for GraphRAG, as described above, covers global summarization questions on two dataset types and uses LLM-judged comparisons.
- Evidence for graphs improving factual question answering on typical enterprise documentation is something to establish in your own environment, not assume.
- Extraction quality depends on the model and text, and errors compound in multi-hop queries.
- Schemas are opinions. A small, well-owned model that people use beats a comprehensive one that nobody maintains. The same lesson appears across [IA governance](/articles/ia-governance-and-measurement).
