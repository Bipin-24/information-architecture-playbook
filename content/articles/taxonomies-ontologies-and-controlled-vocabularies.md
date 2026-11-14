---
title: "Taxonomies, ontologies and controlled vocabularies: choosing the right level"
description: "The spectrum from simple lists to ontologies, with definitions, a decision table, SKOS and SHACL basics, a small example and the mistakes that sink vocabulary projects."
track: foundations
order: 5
updated: "2026-11-14"
tags: ["taxonomy", "ontology", "controlled vocabulary", "SKOS", "SHACL", "thesaurus"]
takeaways:
  - "Vocabularies run from flat lists to ontologies. Pick the lightest form that solves the problem, because each step adds modeling and upkeep cost."
  - "A taxonomy mainly supports findability by hierarchy. An ontology models classes, properties and constraints for reasoning."
  - "SKOS (W3C, 2009) shares vocabularies on the web. SHACL (W3C, 2017) validates RDF data against conditions."
  - "Most vocabulary failures are organizational: no owner, no change process, or over-modeling before anyone uses it."
sources:
  - title: "SKOS Simple Knowledge Organization System Reference"
    url: "https://www.w3.org/TR/skos-reference/"
  - title: "Shapes Constraint Language (SHACL)"
    url: "https://www.w3.org/TR/shacl/"
---

"Taxonomy" is one of the most overused words in knowledge work. It gets applied to a dropdown list, a site's menu structure, a tagging scheme, a thesaurus, and sometimes a full knowledge graph model. These are different things with different costs. Choosing the wrong level is a common source of wasted effort: a team builds an ontology when a controlled list would do, or builds a flat tag list when users clearly need hierarchy and synonyms.

This article lays out the spectrum, defines each step, explains the standards you are likely to meet (SKOS and SHACL), and gives a decision table for choosing. It builds on the labeling and organization systems in [the four systems of IA](/articles/the-four-systems-of-ia). For how vocabularies feed graph-based AI retrieval, see [knowledge graphs and ontologies for AI](/articles/knowledge-graphs-and-ontologies-for-ai).

## The spectrum

Controlled vocabularies run from very simple to very expressive. Each step to the right adds capability and adds cost.

| Form | What it is | Relationships | Typical use |
|---|---|---|---|
| Flat list (pick list) | A set of approved values | None | Status, region, document type fields |
| Synonym ring | Terms treated as equivalent for search | Equivalence only | Making search tolerant of variant wording |
| Authority file | One approved form per entity, with variants | Preferred versus variant | Names of people, organizations, products |
| Taxonomy | Terms arranged in a hierarchy | Parent and child | Browsing, filtering, consistent tagging |
| Thesaurus | Taxonomy plus richer term relationships | Broader, narrower, related, preferred and non-preferred | Indexing, search expansion, cross-referencing |
| Ontology | Classes, properties, constraints and instances | Typed relationships defined by the model | Reasoning, integration, knowledge graphs |

The term "controlled vocabulary" is the umbrella. It means a managed set of terms, where each concept has an approved label and changes go through a defined process. It contrasts with free tagging, where anyone can enter any word.

Thesaurus relationships are conventionally written BT (broader term), NT (narrower term) and RT (related term). The step from thesaurus to ontology is the biggest: you stop describing only how terms relate and start defining what kinds of things exist, what properties they can have, and which relationships are allowed.

## Taxonomy versus ontology

The two words are often used as if they were interchangeable. They are not, though real projects blur the line.

| | Taxonomy | Ontology |
|---|---|---|
| Primary purpose | Findability and consistent classification | Representing and reasoning over knowledge |
| Core structure | Hierarchy of terms | Classes, properties, constraints, instances |
| Typical relationship | "Is a kind of" or "belongs under" | Many named relationships (for example, "is billed by", "applies to") |
| Main users | Readers browsing, editors tagging, search engines | Software, data teams, graph databases, reasoning tools |
| Cost to build and maintain | Moderate | Higher: modeling expertise, validation, governance |
| Failure mode | Hierarchy that does not match how people think | Model so elaborate nobody can use or update it |

A useful rule of thumb: if the question is "where should people look for this?", you probably need a taxonomy. If the question is "what is connected to what, and what follows from that?", you may need an ontology. Often the best approach is to build the taxonomy first and extend it only where relationships become necessary.

> **Key idea:** Taxonomies organize terms so people find things. Ontologies describe a domain so software can connect things. Many problems need only the first, and the second does not replace it.

## Facets

A facet is an independent dimension along which content can be classified, such as product, audience, document type, region or lifecycle stage. Instead of forcing everything into one hierarchy, a faceted scheme uses several small vocabularies, one per dimension, and lets readers combine them. This is the technical basis of multiple classification, described in [eight principles of information architecture](/articles/eight-principles-of-information-architecture).

Keep facets independent of each other, use controlled values within each, make sure editors can tell which value applies, and start with fewer facets than you think you need, because each is a field somebody must maintain.

## Thesaurus relations in practice

A thesaurus-style vocabulary is valuable when readers and authors use different words. Its relations work as follows.

- **Preferred and non-preferred terms.** For each concept, one label is preferred and variants point to it. "Refund" is preferred. "Credit reversal" and "money back" are non-preferred and lead to it.
- **Broader and narrower terms.** "Payment methods" is broader than "Credit card".
- **Related terms.** "Refund" is related to "Dispute". They are connected but neither is a kind of the other.

Search can use these relations to expand queries, to suggest related terms, and to show readers where to go next. Navigation can use them to group content. The practical limit is upkeep: relationships rot as language and products change, so they need an owner.

## SKOS and SHACL

Two W3C standards turn up often in vocabulary work. They solve different problems.

### SKOS

SKOS, the Simple Knowledge Organization System, is a W3C Recommendation published on 18 August 2009. The specification describes it as a common data model for sharing and linking knowledge organization systems via the Web. It is built on RDF, so each concept is a resource that can be identified, published and linked.

The core pieces are:

| Element | Purpose |
|---|---|
| `skos:Concept` | A unit of thought: one concept in the vocabulary |
| `skos:ConceptScheme` | The vocabulary as a whole, grouping its concepts |
| `skos:prefLabel` | The preferred label, with at most one per language per concept |
| `skos:altLabel` | An alternative label, such as a synonym or variant |
| `skos:broader`, `skos:narrower` | Direct hierarchical links |
| `skos:related` | An associative link. It is symmetric and not transitive |

SKOS is deliberately lightweight. It represents thesauri, taxonomies and classification schemes. It is not an ontology language and does not define classes, constraints or reasoning rules. If you need those, you move to ontology languages and modeling approaches beyond SKOS, and SKOS can still serve as the vocabulary layer for the terms.

**Example (fictional).** A small vocabulary for a fictional help center, written in Turtle, one common RDF syntax. The namespace is invented for illustration.

```turtle
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix ex:   <https://example.org/vocab/helpcenter/> .

ex:scheme a skos:ConceptScheme ;
    skos:prefLabel "Help center topics"@en .

ex:payments a skos:Concept ;
    skos:inScheme ex:scheme ;
    skos:prefLabel "Payments"@en ;
    skos:narrower ex:refunds, ex:invoices .

ex:refunds a skos:Concept ;
    skos:inScheme ex:scheme ;
    skos:prefLabel "Refunds"@en ;
    skos:altLabel "Credit reversals"@en, "Money back"@en ;
    skos:broader ex:payments ;
    skos:related ex:disputes .

ex:invoices a skos:Concept ;
    skos:inScheme ex:scheme ;
    skos:prefLabel "Invoices"@en ;
    skos:broader ex:payments .

ex:disputes a skos:Concept ;
    skos:inScheme ex:scheme ;
    skos:prefLabel "Billing disputes"@en ;
    skos:related ex:refunds .
```

Notice what the snippet does. "Refunds" is the preferred label, and the two alternative labels capture the words readers and staff actually use. The hierarchy places refunds and invoices under payments, and the related link connects refunds to disputes without claiming one is a kind of the other. `ex:disputes` has no broader concept here, which is a deliberate gap: a real vocabulary would decide where it belongs.

### SHACL

SHACL, the Shapes Constraint Language, is a W3C Recommendation published on 20 July 2017. It is a language for validating RDF graphs against a set of conditions, called shapes. In vocabulary work, it helps you enforce your own rules: every concept must have a preferred label, every concept must belong to a scheme, and so on.

A minimal shape that requires each SKOS concept to have a preferred label:

```turtle
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix ex:   <https://example.org/vocab/helpcenter/> .

ex:ConceptShape a sh:NodeShape ;
    sh:targetClass skos:Concept ;
    sh:property [
        sh:path skos:prefLabel ;
        sh:minCount 1 ;
        sh:message "Every concept needs at least one preferred label."
    ] .
```

SKOS defines what a vocabulary can say. SHACL checks whether your particular vocabulary follows your own conventions. They complement each other, and neither tells you what terms to choose. That remains an IA and editorial task.

> **Caution:** Adopting SKOS or SHACL does not make a vocabulary good. A well-formed SKOS file can still contain labels nobody uses and a hierarchy nobody understands. Standards give you interoperability and validation, not judgment.

## Choosing the right level

Use the lightest form that solves the stated problem. This table maps common needs to a starting point.

| Situation | Likely starting point | Why |
|---|---|---|
| A field needs consistent values (status, region) | Flat controlled list | No relationships needed |
| Search fails because people use variant words | Synonym ring, then authority file | Fixes the actual failure cheaply |
| Readers need to browse and filter content | Taxonomy, often as facets | Hierarchy and filtering are the need |
| Indexers and search need rich cross-references | Thesaurus | Preferred terms and relationships help recall and expansion |
| Several systems must share one vocabulary | SKOS representation | Common data model, publishable and linkable |
| You must integrate data and reason over relationships | Ontology (with SHACL for validation) | Typed relationships and constraints are the requirement |
| You want to feed AI retrieval with entities and relationships | Start with taxonomy and metadata, add graph modeling where justified | Graph modeling costs more and needs a flat baseline to compare against |

> **In practice:** Write the problem as a testable statement before choosing a form. "Support agents and customers use different words for refunds, and many refund searches return nothing" is something you can check with a query log. "We need an ontology" is not a problem statement.

## A minimal process

1. **Define scope and users.** Who will use the vocabulary, for what, in which system?
2. **Gather terms.** Pull from query logs, existing content, support tickets, stakeholders and existing standards. Reuse an existing published vocabulary where one fits, rather than inventing one.
3. **Group and structure.** Use card sorting with representative users where hierarchy is contested, and test the resulting hierarchy with a structure test. See [card sorting and tree testing](/articles/card-sorting-and-tree-testing).
4. **Decide preferred labels and variants.** Record definitions and scope notes, because definitions prevent drift.
5. **Choose the format.** A spreadsheet is fine at small scale. Move to SKOS or a vocabulary management tool when several systems depend on it.
6. **Apply and validate.** Tag content, check consistency, and run validation rules.
7. **Assign ownership and a change process.** Decide who can add, merge, rename and retire terms, and how those changes reach every system that uses them. See [IA governance and measurement](/articles/ia-governance-and-measurement).

## Common mistakes

- **Over-modeling.** Building an ontology of every relationship in the business before one team has used a single term. Start with a thin slice tied to a real use case, and expand when needed.
- **No owner.** A vocabulary without an accountable person decays within months, as products change and new terms appear informally.
- **No change process.** Terms get renamed in one system and not another, and the vocabulary splits into incompatible copies.
- **Designing from the organization's point of view.** A taxonomy that mirrors the org chart or the product catalog may not match how readers think. Check against user language, as discussed in [mental models and information scent](/articles/mental-models-and-information-scent).
- **Treating hierarchy as truth.** Many concepts belong in several places. If the format allows only one parent, use facets or related links rather than forcing a false choice.
- **Too few definitions.** Without scope notes, taggers apply terms inconsistently.
- **Skipping validation.** Missing labels, orphan concepts and duplicate terms accumulate quietly unless checked automatically.

## Limits and open questions

- **Evidence is mostly practitioner knowledge.** The structure of the spectrum is standard in knowledge organization practice, but the guidance on when to move up a level comes from experience, not controlled studies.
- **Standards do not decide quality.** SKOS and SHACL are specifications of format and validation. Their publication dates (2009 and 2017) tell you the technology is mature, not that any given vocabulary is sound.
- **Ontology benefits depend on the use case.** Where the need is browsing and search, an ontology can be an expensive detour. Where the need is integration and inference, a taxonomy alone will fall short.
- **AI-era claims are young.** Vocabularies are widely used as inputs to retrieval and graph systems, but how much they improve answer quality varies by content and method, so measure against a baseline, as set out in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).
