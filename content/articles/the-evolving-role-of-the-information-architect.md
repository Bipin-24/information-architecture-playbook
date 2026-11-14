---
title: "The evolving role of the information architect"
description: "How IA work is widening from pages and navigation to structure for people and machines: new deliverables, skills to keep and add, and honest uncertainty."
track: ai-era
order: 9
updated: "2026-11-14"
tags: ["information architect role", "skills", "knowledge engineering", "career", "AI-era IA"]
takeaways:
  - "The core job, organize, set context and plan for change, persists; the readers now include models and agents."
  - "New deliverables are familiar IA artifacts under new names: chunking guidelines, metadata schemas, tool catalogs, eval sets."
  - "The future of the role is uncertain; the scenarios here are the author's synthesis, not forecasts or industry data."
  - "A 12-month learning path should add measurement and data fluency before specialist tooling."
sources:
  - title: "Information Architecture: For the Web and Beyond, 4th Edition (Part II)"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Empowering Information Architecture with AI: Making It Real"
    url: "https://jarango.com/2024/05/12/empowering-information-architecture-with-ai-making-it-real/"
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "SKOS Simple Knowledge Organization System Reference"
    url: "https://www.w3.org/TR/skos-reference/"
  - title: "Shapes Constraint Language (SHACL)"
    url: "https://www.w3.org/TR/shacl/"
  - title: "MCP architecture overview"
    url: "https://modelcontextprotocol.io/docs/learn/architecture"
  - title: "Diátaxis: Start here"
    url: "https://diataxis.fr/start-here/"
---

Nobody can say with confidence what the information architect's job will look like in five years. This article does not try. It does something narrower: it describes what is changing in the work now, which parts are stable, and which new artifacts and skills are showing up under other job titles. Where it looks forward, it says so, and the forward-looking material is the author's synthesis, not industry data or prediction.

The short version is that the job has kept its shape and widened its audience. The people who practice IA have always arranged shared information so that others could find, understand and act. What is new is that the "others" now include retrievers, language models and agents, and that some of the decisions architects used to make implicitly are being made, often by default, inside pipelines no architect has looked at.

## What stays constant

Rosenfeld, Morville and Arango's *Information Architecture: For the Web and Beyond* (4th edition, 2015) organizes the field around four systems found in most interactive information environments: organization, labeling, navigation and search. The authors acknowledge that a single short definition of IA is hard, and that the same link can belong to several systems at once. That caution holds up well. The role has never been defined by a single deliverable.

Arango's later framing reduces the work to three activities: organize information, set the context, and plan for change. He also writes that information is a means for skillful decision-making, and that there are no static information structures. Both are useful for thinking about the role now, because they describe the job without naming a medium.

> **Key idea:** The medium changed several times: print-like sites, apps, intranets, documentation, now machine-read corpora. The activities did not. When someone says the role is obsolete or entirely new, ask which activity they think disappeared.

## What is changing

Four shifts matter most for day-to-day work.

### The unit of information changes

Architects once reasoned mostly about pages and screens. Retrieval systems reason about chunks, entities, records and tool definitions. A page is still a unit for people, but a model may only see a fragment of it, stripped of the navigation and layout that supplied context. Deciding where context lives, in headings, in metadata, in the text of the passage itself, is an IA decision that now has a machine consumer. See [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

### The reader changes

The original RAG paper by Lewis and colleagues combined a model's parametric memory with a non-parametric memory, a dense vector index accessed by a neural retriever. Its authors framed provenance and updating knowledge as open problems that explicit memory could help with. For an architect the relevant observation is structural: a system now exists whose output depends on how well a corpus was organized, and the person who organized it may never see how it is read.

### The failure modes change

A poor navigation label sent a user down the wrong path. A poor chunk, missing version tag or ambiguous term can now produce a confident wrong answer with no path to inspect. Failures are harder to see and happen at volume. That moves evaluation from an occasional research activity toward a routine one, covered in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).

### The tools change

Models can draft tags, summaries and candidate taxonomies. Arango has described using GPT-4 through a command-line tool to propose tags for a site of roughly 1,200 pages, with proposals written to a CSV for review against existing tags. The architect's role in that workflow is not typing less. It is specifying constraints, reviewing proposals and owning the result. See [using AI as an IA tool](/articles/using-ai-as-an-ia-tool).

## Neighboring disciplines and where they overlap

IA does not have exclusive claim to any of the work below, and in many organizations someone else holds it. The table is a map of overlap, not a statement of who should own what.

| Discipline | Shared ground with IA | Typical difference in emphasis |
|---|---|---|
| Knowledge engineering | Ontologies, entity and relationship modeling, reasoning over structured knowledge | More formal logic and tooling; often less attention to how people browse and search |
| Content design and strategy | Labels, structure of content, lifecycle, voice | Stronger on the words and the editorial process; less on cross-site structure |
| Taxonomy and ontology work | Controlled vocabularies, thesauri, SKOS-style models | Deep on vocabulary management; sometimes separate from navigation and search design |
| Search and relevance engineering | Query analysis, synonyms, ranking | More on algorithms and infrastructure |
| Data and ML teams | Metadata, schemas, evaluation, pipelines | More on models and data quality; less on user mental models |
| Technical writing and docs | Topic structure, reuse, versioning | Strong on authoring practice; see [documentation IA](/articles/documentation-information-architecture) |
| UX research and design | Mental models, testing, navigation | Broader than structure; owns interaction and visual design |

A fair reading is that IA sits at the junction. Its distinctive contribution is the habit of designing one coherent structure that people and systems both rely on, and testing it against how people actually look for things. Whether that habit is a standalone role or a skill spread across teams will depend on the organization.

## New deliverables

Many of the artifacts below already exist in a classic IA toolkit. They have been reframed for machine readers or extended to cover new objects.

| Deliverable | What it is | Classic IA ancestor |
|---|---|---|
| Chunking guidelines | Rules for how content should be split, which headings anchor boundaries, what must stay together | Content modeling and template rules |
| Metadata schema for retrieval | Fields such as product, version, audience, content type, status, with controlled values | Metadata schema; see [content modeling and metadata](/articles/content-modeling-and-metadata) |
| Controlled vocabulary or SKOS file | Preferred and alternative labels and relationships in a machine-readable form | Thesaurus, taxonomy; see [taxonomies and ontologies](/articles/taxonomies-ontologies-and-controlled-vocabularies) |
| Validation shapes | Constraints that data must satisfy, for example with SHACL | Style guide and metadata requirements, made executable |
| Tool catalog and descriptions | Names, descriptions and input schemas for agent-callable tools | Labeling and navigation systems for a non-human reader |
| Evaluation set | Questions with known sources and expected answers | Tree-test task list and search-log review |
| Context and deprecation rules | What gets retired, redirected or marked superseded, and how fast | Governance and lifecycle policy |
| Machine-readable content views | Markdown alternates, structured data consistent with visible text | Sitemaps and content templates |

A few standards give the work shared vocabulary. SKOS, a W3C Recommendation from August 2009, is a data model for sharing and linking knowledge organization systems on the web, built on RDF, with constructs such as concepts, concept schemes, preferred and alternative labels, and broader, narrower and related links. SHACL, a W3C Recommendation from July 2017, is a language for validating RDF graphs against a set of conditions. The Model Context Protocol documents tools, resources and prompts as the primitives an MCP server exposes, with tools carrying a name, title, description and JSON Schema input definition. Diátaxis distinguishes tutorials, how-to guides, reference and explanation by the user need each serves. None of these is mandatory, and none replaces judgment. They are useful because they give teams a common way to describe structure.

> **In practice:** If you are asked to "do something with AI" and are not sure where IA fits, start by listing the corpus, who owns it, what metadata exists, and how anyone would know the system answered correctly. Those four questions expose most of the IA work.

## Skills: keep, add, de-emphasize

This table is a synthesis. It reflects the author's judgment about where emphasis is shifting, based on the sources above and general practice, not survey data on what employers want.

| Skill | Direction | Why |
|---|---|---|
| Mental models, user research, card sorting and tree testing | Keep | Machine readers do not replace people; evaluating human findability remains central |
| Labeling and audience language | Keep | Users' words are still what queries are made of |
| Taxonomy, facets, controlled vocabularies | Keep and deepen | They become metadata, filters and ontology seeds |
| Content modeling | Keep and extend | Models must now consider chunk boundaries and machine consumption |
| Governance and change planning | Keep, raise priority | Stale or conflicting content has an outsized effect when systems retrieve it automatically |
| Writing clear structure and headings | Keep | Headings and titles carry meaning for retrieval as well as for people |
| Evaluation design: golden sets, retrieval metrics, error analysis | Add | The method for knowing whether structure works for machines |
| Basic data fluency: JSON, schemas, querying a table or index | Add | Needed to inspect pipelines and to specify structure precisely |
| Ontology and knowledge graph basics | Add as needed | Valuable where relationships drive answers; see [knowledge graphs for AI](/articles/knowledge-graphs-and-ontologies-for-ai) |
| Working with models: reviewing outputs, constraints, drift | Add | Assistance requires oversight skills |
| Tool and API description design | Add | Agents read tool catalogs; see [IA for agents and MCP](/articles/ia-for-agents-and-mcp) |
| Privacy and data-handling judgment | Add | Content and research data are inputs to external systems |
| Producing large static sitemaps and wireframes as the main deliverable | De-emphasize | Still useful, but rarely sufficient |
| Hand-tagging at scale | De-emphasize | Proposal-and-review workflows are changing the economics, with caveats |
| Defending a structure by authority or taste | De-emphasize | Test results and retrieval evidence carry more weight |

"De-emphasize" does not mean "abandon." Hand-tagging a small, high-stakes corpus may remain the right call.

## Scenarios, framed as uncertainty

The following three scenarios are illustrations to help you think, not forecasts. The author has no data that assigns them probabilities, and any of them could be wrong, partly right, or overtaken by developments nobody has predicted.

**Scenario A: The wager holds.** Jorge Arango's wager, stated in his February 2025 post, is that IA stays relevant because current AI cannot independently organize information, set context or plan for change; models are effective at language but not real-world understanding, and organizations should act as if general AI is not imminent. He adds that general AI may be imminent, and that he may be wrong. If the wager holds, architects spend more of their time specifying, reviewing and evaluating, and less time producing first drafts of structure. The role persists, the craft shifts toward supervision.

**Scenario B: The work diffuses.** Models and platforms absorb more default structure. Many teams get "good enough" organization without an architect, and IA becomes a skill held by writers, product managers and engineers. The dedicated role survives in places where errors are expensive or the information environment is complex. Nothing in this article's sources supports or refutes this.

**Scenario C: Machine readers outgrow our assumptions.** Retrieval techniques change enough that today's concerns, such as chunk boundaries and token budgets, shrink or vanish, while other concerns, such as authority, provenance and conflict between sources, grow. Chunking guidance written today would then date quickly. This scenario is a reminder to hold specific techniques loosely and principles more firmly.

What the scenarios share is a modest claim: in each, someone must decide what the information means, who is responsible for it, and how it changes. That is the part of IA that is least dependent on the current generation of tools. It is also an argument, not a proof.

> **Caution:** Beware confident claims about the role's future in either direction, including from people with something to sell. The evidence base is mostly practitioner accounts and early research, and much AI-era practice is only a couple of years old.

## A 12-month learning path

This path assumes a working IA or content practitioner. Adjust to your starting point. Each phase ends with something you produce, so learning accumulates into portfolio evidence.

| Months | Focus | Output |
|---|---|---|
| 1-2 | Retrieval basics: how a RAG pipeline works, what chunks, embeddings and metadata filters do. Read the RAG paper's abstract and a practical overview. | One-page diagram of a pipeline over a corpus you know, with IA decisions marked |
| 3-4 | Evaluation: build a small golden set of 30-50 questions with labeled sources; compute simple retrieval metrics by hand or in a spreadsheet | Baseline results and a defect classification of failures |
| 5-6 | Metadata and vocabularies: design a minimum viable metadata schema and a small controlled vocabulary; learn what SKOS expresses | Schema, vocabulary file and a validation checklist |
| 7-8 | Assisted IA: run a proposal-and-review workflow on a sample of content; measure consistency and review time | Workflow write-up with measured time and error findings |
| 9-10 | Structure for machines: chunking guidelines and a content-template change for one content type; re-run your golden set | Before-and-after evaluation with caveats |
| 11 | Agent-facing IA: rewrite a handful of tool descriptions; read the current MCP specification, since details change between versions | Before-and-after tool catalog excerpt |
| 12 | Governance and communication: draft ownership, review cadence and deprecation rules; present findings to a stakeholder | A short proposal with evidence and limits stated |

Two notes on the path. First, it deliberately puts evaluation before specialist tools: a practitioner who can show whether a change helped is more useful than one who knows a fashionable library. Second, the numbers in the golden-set row are a practical starting range, not a validated threshold; see [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era) for why set size alone is not the point.

To locate your team's current practice before choosing where to start, use the [maturity model](/articles/an-ia-maturity-model-for-the-ai-era).

## Limits of this article

- The skills table and scenarios are the author's synthesis. They are not drawn from hiring data, surveys or longitudinal studies, and the sources cited here do not address job markets.
- The Arango material is one practitioner's published position, accompanied by his own statement that he may be wrong. It is a reasoned argument, not an empirical result.
- Overlap with other disciplines varies widely by organization. A knowledge engineer in one company may do what an information architect does in another.
- Specific techniques, protocols and specification versions change. Check current documentation before relying on any detail mentioned here.

## Closing perspective

The most durable thing an information architect brings is not a method or a tool. It is a stance: structure is a decision made on behalf of someone else, and decisions should be tested against how that someone actually behaves. That stance applied to people produced navigation, labeling and search. Applied to machines, it produces schemas, evaluation sets and tool descriptions. The audience widened; the responsibility did not change.

If you take one action from this article, take the smallest one: pick a corpus you know, write down ten real questions someone might ask of it, and find out where the answers live. Whatever the role becomes, you will have practiced the part that is likely to last.
