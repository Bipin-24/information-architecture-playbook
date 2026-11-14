---
title: "An IA maturity model for the AI era: five levels, seven dimensions"
description: "A five-level maturity model for IA practice across structure, vocabulary, search, retrieval and governance, with honest self-assessment and next steps."
track: ai-era
order: 10
updated: "2026-11-14"
tags: ["maturity model", "self-assessment", "IA governance", "retrieval readiness", "evaluation"]
takeaways:
  - "This model is the author's synthesis, not an industry standard; use it to start conversations, not to certify anything."
  - "Seven dimensions are scored separately, because teams are rarely at one level across the board."
  - "Evidence beats opinion: each level asks for an artifact you can show, such as a test result or an owner."
  - "Higher is not always better; the right target depends on risk, scale and how much machines read your content."
sources:
  - title: "Information Architecture: For the Web and Beyond, 4th Edition (Part II)"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Tree Testing: Fast, Iterative Evaluation of Menu Labels and Categories"
    url: "https://www.nngroup.com/articles/tree-testing/"
  - title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
    url: "https://arxiv.org/abs/2309.15217"
  - title: "MCP architecture overview"
    url: "https://modelcontextprotocol.io/docs/learn/architecture"
  - title: "SKOS Simple Knowledge Organization System Reference"
    url: "https://www.w3.org/TR/skos-reference/"
---

Teams ask the same question in different words: how good is our information architecture, and what should we fix first? A maturity model is one way to answer. It describes a ladder of practice from improvised to systematic, so you can place yourself on it and see the next rung.

**Status of this model.** This is the author's synthesis, built from the IA literature cited at the end and from general practice. It is not an industry standard, it has not been validated against a population of organizations, and the level descriptors are judgments, not measured thresholds. Treat it as a structured set of questions. The companion interactive assessment on the [tools page](/tools) uses the same dimensions and levels.

## The five levels

The level names are generic on purpose. Any five-step scale would do, and the labels matter less than the evidence required to claim a level.

| Level | Name | One-line description |
|---|---|---|
| 1 | Ad hoc | Structure emerges from whoever publishes. Little is written down. Fixes are reactive. |
| 2 | Managed | Someone owns structure for key areas. Basic standards exist. Practice varies between teams. |
| 3 | Defined | Structure, vocabulary and process are documented and shared across teams. Changes follow a known route. |
| 4 | Measured | Decisions are tested and tracked. There are baselines, gates and regular reporting. |
| 5 | Optimizing | Measurement feeds a routine improvement loop, including machine readers, with deliberate trade-offs. |

Two properties of the scale are worth stating. First, levels are cumulative in intent: Level 4 assumes the documentation of Level 3. Second, levels describe practice, not tooling. A team can buy sophisticated software and still sit at Level 1 if nobody owns the vocabulary.

## The seven dimensions

Score each dimension separately. Real organizations are uneven: strong navigation, weak governance, no evaluation. A single overall score hides exactly the gaps you most need to see.

1. **Content structure.** How content is organized into types, templates and units, and whether a unit is usable on its own.
2. **Metadata and vocabulary.** Whether attributes and terms are defined, controlled and consistently applied.
3. **Navigation and search.** How people move through and query the environment, and how that is tuned.
4. **Semantic modeling.** Whether entities and relationships are explicit, from simple facets up to ontologies and graphs.
5. **Retrieval and agent interfaces.** How content is prepared for retrievers and models, and how tools are described to agents.
6. **Governance.** Ownership, lifecycle, change process and deprecation. This is Arango's third activity, planning for change.
7. **Evaluation.** How you know it works, for people and for machines.

The dimensions follow the four classic systems from *Information Architecture: For the Web and Beyond* (organization, labeling, navigation, search) and add the layers that retrieval systems introduced. See [the four systems of IA](/articles/the-four-systems-of-ia) for the foundation.

## Level descriptors by dimension

Each cell describes the typical state at that level. If your practice straddles two cells, score the lower one.

| Dimension | 1 Ad hoc | 2 Managed | 3 Defined | 4 Measured | 5 Optimizing |
|---|---|---|---|---|---|
| Content structure | Pages written freely; formats vary by author | Templates for common content types; some reuse | Documented content model; consistent headings and self-contained topics | Structure changes tested against findability and retrieval results | Structure tuned using error analysis across both audiences, with deliberate trade-offs recorded |
| Metadata and vocabulary | Tags added ad hoc; duplicates and synonyms unmanaged | Core fields and a tag list exist; one owner for key areas | Controlled vocabulary with preferred and alternative labels; required fields by content type | Metadata completeness and consistency tracked; vocabulary changes tested | Vocabulary evolves through query and failure data; validation automated where useful |
| Navigation and search | Structure follows the org chart; search untuned | Menus reviewed occasionally; basic synonyms | Navigation documented by type; query logs reviewed periodically | Tree tests and search metrics benchmarked; regressions caught | Regular cycle of log review, testing and tuning with measured results |
| Semantic modeling | Relationships implicit in prose | Facets or related-links for main topics | Entity and relationship model documented for priority domains | Model quality checked against a flat baseline | Graph or ontology used only where measured gains justify the cost |
| Retrieval and agent interfaces | Content fed to systems as found; tool descriptions written by developers alone | Awareness of chunking and metadata filtering; pilots | Written chunking and metadata guidelines; tool names and descriptions follow a style guide | Retrieval tested on a golden set; tool descriptions reviewed against agent failures | Continuous tuning; context, ranking and tool discovery adjusted from error analysis |
| Governance | No owner; stale content stays | Owners for key areas; ad hoc cleanup | Documented lifecycle, change process and deprecation rules | Content health indicators reported; review cadence met | Governance adapts to evidence; retired content is reliably removed from retrieval |
| Evaluation | Opinion and anecdote | Occasional user feedback or study | Standard methods documented; some research per project | Baselines, task success and retrieval metrics tracked; golden set exists | Gates in release process; sets refreshed; judged metrics calibrated against human review |

> **Key idea:** Each step up in the table adds an artifact: an owner, a document, a baseline, a gate. If you cannot produce the artifact, you are not at that level for that dimension.

## How to self-assess honestly

Self-assessment fails in predictable ways. People score aspiration, or the best team in the company, or last year's plan. A few habits help.

1. **Score from evidence.** For every score of 3 or above, name the document, dashboard or test result that proves it, and who could show it to a new colleague.
2. **Assess a bounded scope.** Pick a product, site or corpus. "The whole company" produces a meaningless average.
3. **Use several raters.** Ask an author, an engineer, a support lead and someone outside the team. Differences between raters are data. Record them.
4. **Score the lower cell when torn.** A practice that works in one team and not another is Level 2, however good the best team is.
5. **Look for decay.** A vocabulary documented three years ago and never updated is not Level 3 today.
6. **Separate people-facing from machine-facing evidence.** Strong tree-test results say nothing about retrieval quality. Score the dimensions accordingly.
7. **Write down what you could not verify** and mark it provisional.

> **Example (fictional):** A documentation group scores itself on a product knowledge base. Content structure is a 3: a written content model exists and topics are written to stand alone. Metadata is a 2: there are version and product fields, but a quarter of articles lack them and nobody audits it. Navigation and search is a 3 on paper but only 2 on evidence, since query logs have not been reviewed in a year. Retrieval is a 1: an assistant was launched on the raw corpus with no golden set. Evaluation is a 1. The overall picture, strong writing practice and no measurement, points to evaluation as the first investment, because without a baseline the team cannot tell whether anything else it changes helps.

## Next steps by level

Recommendations are for the dimension you scored, not the whole organization. They are starting points, and an experienced practitioner may reorder them.

| If you are at | Do next | Avoid |
|---|---|---|
| Level 1 | Name an owner for one corpus. Inventory what exists. Write a short list of core content types and required metadata. Review the top failed searches. | Buying tooling before there is an owner and a vocabulary |
| Level 2 | Document the content model and a small controlled vocabulary. Set a change process. Run a first tree test on the main hierarchy to get a baseline. See [IA process](/articles/information-architecture-process). | Letting each team keep its own incompatible labels |
| Level 3 | Add measurement: benchmark findability, assemble a first golden set of real questions with known sources, track metadata completeness. Use [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era). | Treating documentation as proof the structure works |
| Level 4 | Add gates to the release process. Calibrate any model-judged metrics against human ratings. Run error analysis and feed results back into structure and governance. | Optimizing a metric on a small set until it no longer reflects reality |
| Level 5 | Revisit trade-offs deliberately: where people and machine needs conflict, record the decision. Prune practices that do not earn their cost. | Assuming you are finished; content, users and tools keep changing |

### Where to be careful about moving up

- **Retrieval and agent interfaces before basics.** Preparing content for machines on top of unowned, duplicated, stale content amplifies the mess. Governance and vocabulary usually need to come first. This is a judgment, not a measured rule.
- **Semantic modeling is optional.** SKOS-style vocabularies are inexpensive and broadly useful. A full ontology or graph is costly to build and maintain, and may not beat a well-structured flat baseline for your questions. See [knowledge graphs and ontologies for AI](/articles/knowledge-graphs-and-ontologies-for-ai).
- **Level 5 everywhere is rarely sensible.** A small internal wiki does not need release gates on a golden set. A public support assistant answering questions about pricing or safety might.

## Choosing a target level

A target should come from risk and scale, not from the model's top row.

| Factor | Pushes target higher |
|---|---|
| Cost of a wrong answer | Legal, safety, financial or compliance consequences |
| Volume of machine readers | Many retrieval pipelines or agents consuming the same content |
| Rate of content change | Frequent releases and multiple versions in circulation |
| Number of contributing teams | Many authors with separate habits |
| Size of corpus | Too large for informal checking |

If most of those factors are low, Level 2 or 3 in most dimensions may be entirely adequate, and spending to go further would be waste.

## Limits and honest caveats

- **Not validated.** No dataset supports these level boundaries. Another practitioner could reasonably draw them elsewhere or add dimensions.
- **Not a standard or certification.** Nothing here is endorsed by any standards body, and an organization claiming a "Level 4 IA" externally would be saying something this model cannot support.
- **Ladders imply linearity.** Real improvement is uneven, and organizations sometimes skip or regress. Treat the levels as a vocabulary for discussion.
- **Self-assessment is biased.** Even with the habits above, expect optimism. An external reviewer helps.
- **The AI-era dimensions are young.** Practice for retrieval, graphs and agent interfaces is still forming. The sources behind those rows, such as the RAGAS paper on RAG evaluation and the Model Context Protocol documentation, describe techniques and concepts, not accepted maturity benchmarks, and details change between versions. Check current documentation.
- **Maturity is not outcomes.** A high score does not guarantee that people find things or that answers are correct. Only evaluation, repeated over time, tells you that.

Arango argues that current AI cannot independently organize information, set context or plan for change, and he allows that he may be wrong. Whatever you think of that wager, a maturity model gives you a practical way to act on it: make the human-owned activities explicit, assign them, and measure whether they are working. For how the architect's work is shifting alongside this, see [the evolving role of the information architect](/articles/the-evolving-role-of-the-information-architect).

## A one-page self-assessment

Copy this and fill it in for one corpus.

| Dimension | Score (1-5) | Evidence (artifact and owner) | Confidence (low, medium, high) | Next action |
|---|---|---|---|---|
| Content structure | | | | |
| Metadata and vocabulary | | | | |
| Navigation and search | | | | |
| Semantic modeling | | | | |
| Retrieval and agent interfaces | | | | |
| Governance | | | | |
| Evaluation | | | | |

Pick the one or two dimensions where a low score carries the highest risk, set a target for each based on the factors above, and review again in a quarter. Then try the interactive version on the [tools page](/tools) and compare the two results, noting where they disagree.
