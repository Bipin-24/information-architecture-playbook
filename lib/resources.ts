/** Curated reading list. Only items verified during research are given publisher/edition details. */
export type Resource = { title: string; by: string; note: string; href?: string; kind: "Book" | "Article" | "Paper" | "Standard" | "Guide" };

export const resources: { group: string; items: Resource[] }[] = [
  {
    group: "Books",
    items: [
      { kind: "Book", title: "Information Architecture: For the Web and Beyond (4th ed.)", by: "Louis Rosenfeld, Peter Morville, Jorge Arango (O'Reilly, 2015)", note: "The standard reference. Organization, labeling, navigation and search, plus research and practice.", href: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/" },
      { kind: "Book", title: "Information Architects", by: "Richard Saul Wurman (1997)", note: "A foundational, design-led view of organizing information for understanding." },
      { kind: "Book", title: "Ambient Findability", by: "Peter Morville (2005)", note: "Findability as a wider design problem, well beyond a single website." },
      { kind: "Book", title: "Pervasive Information Architecture", by: "Andrea Resmini and Luca Rosati (2011)", note: "IA across channels and devices, relevant to today's multi-surface, multi-reader systems." },
    ],
  },
  {
    group: "Practice and research methods",
    items: [
      { kind: "Article", title: "Card Sorting: Uncover Users' Mental Models", by: "Nielsen Norman Group", note: "Open, closed and hybrid sorts, sample size guidelines and pitfalls.", href: "https://www.nngroup.com/articles/card-sorting-definition/" },
      { kind: "Article", title: "Tree Testing", by: "Nielsen Norman Group", note: "How to evaluate a proposed hierarchy before design, and how it complements card sorting.", href: "https://www.nngroup.com/articles/tree-testing/" },
      { kind: "Article", title: "The 3-Click Rule for Navigation Is False", by: "Nielsen Norman Group", note: "Why click counting misleads, and what to optimize instead.", href: "https://www.nngroup.com/articles/3-click-rule/" },
      { kind: "Guide", title: "Diátaxis", by: "diataxis.fr", note: "A framework for documentation structure: tutorials, how-to guides, reference, explanation.", href: "https://diataxis.fr/" },
      { kind: "Article", title: "Eight Principles of Information Architecture", by: "Dan Brown (2010)", note: "A compact, memorable set of design principles that still hold.", href: "https://www.designprinciplesftw.com/collections/eight-principles-of-information-architecture" },
    ],
  },
  {
    group: "Standards",
    items: [
      { kind: "Standard", title: "SKOS Simple Knowledge Organization System Reference", by: "W3C Recommendation, 2009", note: "The web data model for taxonomies and thesauri.", href: "https://www.w3.org/TR/skos-reference/" },
      { kind: "Standard", title: "Shapes Constraint Language (SHACL)", by: "W3C Recommendation, 2017", note: "Validating RDF graphs against shapes.", href: "https://www.w3.org/TR/shacl/" },
      { kind: "Guide", title: "Introduction to structured data markup in Google Search", by: "Google Search Central", note: "What structured data is for and what it does not guarantee.", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
    ],
  },
  {
    group: "IA in the AI era",
    items: [
      { kind: "Article", title: "Jorge's Wager: Why AI Needs Information Architecture", by: "Jorge Arango (2025)", note: "IA as organize, set context, plan for change, and why human architects still matter.", href: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/" },
      { kind: "Article", title: "Empowering Information Architecture with AI: Making It Real", by: "Jorge Arango (2024)", note: "A practical, review-gated example of LLM-assisted tagging at scale.", href: "https://jarango.com/2024/05/12/empowering-information-architecture-with-ai-making-it-real/" },
      { kind: "Article", title: "How AI Is Changing Search Behaviors", by: "Nielsen Norman Group (2025)", note: "A small qualitative study of how people combine chatbots and search.", href: "https://www.nngroup.com/articles/ai-changing-search-behaviors/" },
      { kind: "Guide", title: "AI features and your website", by: "Google Search Central", note: "What Google says (and does not say) site owners need to do for AI Overviews and AI Mode.", href: "https://developers.google.com/search/docs/appearance/ai-features" },
      { kind: "Paper", title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", by: "Lewis et al. (2020)", note: "The paper that named RAG.", href: "https://arxiv.org/abs/2005.11401" },
      { kind: "Paper", title: "Lost in the Middle: How Language Models Use Long Contexts", by: "Liu et al. (2023)", note: "Why where you place information in a prompt matters.", href: "https://arxiv.org/abs/2307.03172" },
      { kind: "Article", title: "Introducing Contextual Retrieval", by: "Anthropic (2024)", note: "Prepending chunk-specific context before embedding and indexing.", href: "https://www.anthropic.com/engineering/contextual-retrieval" },
      { kind: "Paper", title: "Late Chunking: Contextual Chunk Embeddings Using Long-Context Embedding Models", by: "Günther et al. (2024)", note: "Embed first, chunk later, to keep surrounding context.", href: "https://arxiv.org/abs/2409.04701" },
      { kind: "Paper", title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization", by: "Edge et al. (Microsoft Research, 2024)", note: "Entity graphs and community summaries for corpus-wide questions.", href: "https://arxiv.org/abs/2404.16130" },
      { kind: "Paper", title: "Ragas: Automated Evaluation of Retrieval Augmented Generation", by: "Es et al. (2023)", note: "Reference-free metrics for the retriever, the model's use of context, and answer quality.", href: "https://arxiv.org/abs/2309.15217" },
      { kind: "Paper", title: "GEO: Generative Engine Optimization", by: "Aggarwal et al. (KDD 2024)", note: "A research framing for visibility in generative answers; read the caveats.", href: "https://arxiv.org/abs/2311.09735" },
      { kind: "Guide", title: "Model Context Protocol: architecture overview", by: "modelcontextprotocol.io", note: "Hosts, clients, servers, and the tools, resources and prompts primitives.", href: "https://modelcontextprotocol.io/docs/learn/architecture" },
      { kind: "Guide", title: "The /llms.txt file", by: "Jeremy Howard (proposal, 2024)", note: "The proposal itself, which describes its own status as a proposal.", href: "https://llmstxt.org/" },
    ],
  },
];

export const templates = [
  {
    id: "ia-audit",
    title: "IA audit checklist",
    use: "Run this against an existing site, intranet or documentation set.",
    body: `# IA audit checklist

## Structure
- [ ] Every top-level category is mutually distinguishable from its siblings.
- [ ] Categories are one kind of thing (topic OR audience OR task), not a mix.
- [ ] The hierarchy is broad and shallow enough that no branch hides important content.
- [ ] Important content is reachable from more than one path.

## Labels
- [ ] Labels use the audience's words (checked against search queries and research).
- [ ] The same thing has the same name everywhere it appears.
- [ ] No jargon, internal product names or vague catch-alls ("Resources", "Misc").

## Navigation
- [ ] Global navigation is consistent on every page.
- [ ] People can tell where they are (headings, breadcrumbs, highlighted items).
- [ ] Deep pages can be understood without the home page (people arrive anywhere).
- [ ] Related content is linked in context, not only in menus.

## Search
- [ ] Top queries return a sensible first result.
- [ ] Zero-result queries are reviewed on a schedule and fixed.
- [ ] Synonyms and common misspellings are handled.

## Metadata and governance
- [ ] Every content type has required metadata fields.
- [ ] Vocabulary values come from a controlled list with an owner.
- [ ] Content has an owner and a review date.
- [ ] There is a documented way to add, rename and retire categories.
`,
  },
  {
    id: "content-model",
    title: "Content model template",
    use: "Define each content type before designing templates or tagging.",
    body: `# Content model: <type name>

**Purpose:** What job does this content do for the reader?
**Example:** A real instance, linked.

| Field | Required | Type | Controlled values | Notes |
|---|---|---|---|---|
| title | yes | text (max 70) | no | Descriptive; unique within the type |
| summary | yes | text (max 160) | no | Standalone; used in search and previews |
| topic_type | yes | single choice | task, concept, reference | |
| audience | yes | multi choice | (vocabulary) | |
| product | yes | single choice | (vocabulary) | |
| version | when versioned | text | (release list) | |
| owner | yes | person/team | no | Accountable for accuracy |
| review_by | yes | date | no | Triggers review |
| related | no | links to other items | no | Typed relationships preferred |

**Relationships:** (e.g. a task requires a concept; a reference documents an API)
**Reuse:** Where else does this content appear, and how is it kept in sync?
**Retirement:** What happens when this is out of date?
`,
  },
  {
    id: "taxonomy-governance",
    title: "Taxonomy governance template",
    use: "Keep a vocabulary healthy after launch.",
    body: `# Taxonomy governance

**Vocabulary:** <name>   **Owner:** <person/team>   **Review cadence:** <e.g. quarterly>

## Rules for terms
- Use the audience's most common term as the preferred label; record other names as non-preferred labels.
- One concept per term. No compound "and"/"or" terms.
- Prefer singular nouns for topics; keep casing consistent.

## Requests for change
1. Anyone may propose a term (what, why, evidence such as search queries).
2. Owner checks for duplicates, scope and neighbors.
3. Decision recorded with date and rationale.
4. Content re-tagged where needed; deprecated terms redirect to their replacement.

## Health checks (each review)
- [ ] Terms with no content, or content with no terms
- [ ] Near-duplicate terms
- [ ] Terms attracting failed searches
- [ ] Terms that need a definition or an example
`,
  },
  {
    id: "ai-ready-page",
    title: "AI-ready page checklist",
    use: "Check a single page or topic before it is indexed for search or RAG.",
    body: `# AI-ready page checklist

- [ ] One H1 that states the topic; headings form a clean hierarchy (no skipped levels).
- [ ] The first paragraph says what the page covers and who it is for.
- [ ] Each section is self-contained enough to make sense if retrieved alone.
- [ ] Product names, versions and audiences are stated in the text, not only in the navigation.
- [ ] Metadata is complete: title, description, type, product, version, owner, review date.
- [ ] Tables are real tables with header rows; code is in code blocks with a language.
- [ ] Link text describes the destination ("tree testing guide", not "click here").
- [ ] Images have alt text; important information is not only in an image.
- [ ] Outdated or superseded content is clearly marked or removed.
- [ ] The page can be found and read without scripts (important content is in the HTML).
`,
  },
  {
    id: "tree-test-tasks",
    title: "Tree test task template",
    use: "Write tasks that test the structure, not people's reading skills.",
    body: `# Tree test task

**Task wording:** Scenario in the user's words, without using the labels you are testing.
  Example (fictional): "You need to change the email address that receives invoices."

**Correct location(s):** Account > Billing > Invoice contacts
**Acceptable alternative(s):** (list any)

## Rules
- One goal per task; 8-12 tasks per study is a common range.
- Never reuse the exact words from a menu label in the task.
- Include a mix of high-value and hard tasks.
- Pilot with a few people, then fix confusing wording before launch.

## Record
| Participant | Found it? | Direct? | Path taken |
|---|---|---|---|
`,
  },
] as const;
