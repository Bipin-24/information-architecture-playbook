---
title: "Why information architecture matters more in the AI era"
description: "Retrieval quality is bounded by structure. Why chunks, metadata and vocabularies are IA decisions, what AI does not do by itself, and what is still unproven."
track: ai-era
order: 1
updated: "2026-11-14"
tags: ["AI era", "RAG", "retrieval", "knowledge systems", "information architecture"]
takeaways:
  - "Retrieval-augmented systems turn structure, labels and metadata into inputs a model reads, so IA decisions become model-facing."
  - "The reader now includes machines; the job of organizing, setting context and planning for change stays the same."
  - "AI can assist IA work, but it does not by itself decide what to organize, for whom, or how things will change."
  - "Much AI-era practice is young. Test against your own content rather than trusting reported numbers."
sources:
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "Contextual Retrieval (Anthropic)"
    url: "https://www.anthropic.com/engineering/contextual-retrieval"
  - title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: "https://arxiv.org/abs/2307.03172"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
    url: "https://arxiv.org/abs/2309.15217"
---

When a company adds an AI assistant to its documentation, the first demo usually works. The first month in production is different. The assistant quotes a setting from the wrong product version, answers a question about pricing from a page that was retired, or gives a confident reply built from a fragment that lost its context. The team's first instinct is to change the model or the prompt. Frequently the cause is older and more ordinary: the content was never organized to be found, labeled consistently, or kept current.

That is the argument of this article. Information architecture does not become obsolete when machines can read and write. It becomes more consequential, because structure that used to affect how quickly a person found a page now affects what an automated system says on your behalf. The claim has limits, and I will mark where the evidence is strong and where it is thin. For the basics of the discipline, start with [what information architecture is](/articles/what-is-information-architecture).

## The job did not change; the audience did

Rosenfeld, Morville and Arango describe four systems found in most interactive information environments: organization, labeling, navigation and search. Arango has since framed IA's work as three activities: organize information, set the context, and plan for change. He also writes that information is "a means for skillful decision-making." Notice what is absent from these descriptions: any assumption that the reader is a human looking at a screen.

That assumption was always implicit, and it is now false. A modern information environment is read by:

- People browsing, searching and asking questions.
- Retrieval systems that split content into pieces, index them and return the best matches.
- Language models that read what the retrieval returns and write an answer.
- Agents that read tool descriptions and decide which tool to call.

Each reader has different strengths. People tolerate vague labels by scanning around. A retriever matches on wording and meaning, with no sense of the page it came from unless you tell it. A model will write fluent text from whatever it is given, including text that is out of date or out of scope. The architect's task is to make the environment legible to all of them.

> **Key idea:** The shift is not from "IA" to something else. It is from designing for one kind of reader to designing for several, including readers that cannot ask a clarifying question.

## Why retrieval quality is bounded by structure

Retrieval-augmented generation, introduced by Lewis and colleagues at NeurIPS 2020, combines a model's internal knowledge (parametric memory) with an external index (non-parametric memory), in their work a dense vector index of Wikipedia accessed by a neural retriever. The abstract presents provenance and updating knowledge as open problems that explicit external memory can address. That is a statement of motivation rather than a demonstrated guarantee, but it explains why the pattern spread: instead of retraining a model each time your product changes, you change the documents it reads.

That design moves a set of IA decisions into the model's path. Consider what a typical pipeline does, and who decided each part:

| Pipeline step | What happens | IA decision hiding inside |
|---|---|---|
| Ingestion | Which documents are included | Scope: what counts as authoritative content |
| Chunking | Documents are split into pieces | Units of content: where one idea ends |
| Enrichment | Context and metadata attached | Labeling: product, version, audience, date |
| Indexing | Text and vectors stored | Organization: what can be filtered or grouped |
| Retrieval | Best matches returned | Search: terminology, synonyms, ranking |
| Generation | Model writes an answer from the matches | Context: what the model is shown and in what order |

A model cannot answer from content that was never retrieved, and it cannot reliably disambiguate what the content never said. If a chunk does not name its product or version, nothing downstream can recover that. In this sense retrieval quality is bounded by structure: good ranking and a strong model help, but they work with what the architecture supplies.

### The context problem, concretely

Anthropic's engineering post on contextual retrieval gives a clean example. A chunk reading "The company's revenue grew by 3% over the previous quarter" does not identify the company or the period. Taken alone it is almost useless, and it can be dangerous if retrieved for the wrong question. Anthropic's technique prepends a short, chunk-specific context, usually 50 to 100 tokens generated by a model that sees the whole document, before the chunk is embedded and before the keyword index is built.

Anthropic reported results as a failure rate defined as one minus recall at 20, averaged across several domains (codebases, fiction, ArXiv papers and science papers), using the best embedding configuration. The baseline failure rate was 5.7 percent. Adding contextual embeddings brought it to 3.7 percent, adding contextual BM25 brought it to 2.9 percent, and adding reranking brought it to 1.9 percent. The authors also state caveats: chunk size, boundaries and overlap matter; generic document summaries added little; domain-tailored prompts may do better; reranking adds latency and cost; and you should run your own evaluations. Those numbers describe their datasets and setup. They are not a promise for your content.

What the post does support, as a point of IA, is the diagnosis: chunks lose context, and restoring context improves retrieval in their tests. An information architect would say the same thing in older language. Labels must carry enough meaning to stand alone. The detailed mechanics are in [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

### Order and position still matter

Liu and colleagues, in "Lost in the Middle," found that language models perform best when relevant information is at the beginning or end of a long input, and that performance drops significantly when it is in the middle, even for models built for long contexts. For architects the implication is a design constraint: it is not enough to retrieve the right content, because how much you pass in and where the key passage lands can affect the answer. Smaller, focused units and careful selection are IA moves as much as engineering ones.

## Concepts you already know, under new names

Many of the techniques in AI systems restate familiar IA ideas. The mapping below is my own framing for orientation. It is not a claim that the techniques are identical, and the AI-era versions carry costs and failure modes the originals did not.

| Classic IA concept | AI-era counterpart | What is different |
|---|---|---|
| Content inventory and audit | Corpus selection and cleanup before ingestion | Stale or duplicate content is not just clutter; it can be repeated as an answer |
| Page as the unit | Chunk, entity or tool as the unit | The reader may see a fragment without the page around it |
| Labels and headings | Headings, chunk context, titles in embeddings | Meaning must survive removal from the page |
| Controlled vocabulary and synonyms | Query expansion, metadata values, entity names | Embeddings help with similar wording but do not replace agreed terms |
| Facets and metadata | Metadata filters (product, version, audience) | A wrong or missing value silently excludes the right answer |
| Navigation and wayfinding | Retrieval strategy, tool catalog organization | Agents choose among tools by reading descriptions |
| Search | Hybrid retrieval and reranking | Evaluation needs test sets, not just clicks |
| Governance and review | Freshness, versioning, re-indexing | Changes must propagate to the index |
| Tree tests and task success | Retrieval evals with known sources | Two layers to evaluate: human findability and machine retrieval |

Three cases deserve a closer look.

**Vocabulary.** It is tempting to think embeddings make controlled vocabulary unnecessary, since a vector search can match "cancel my plan" to "terminate subscription." Semantic matching does help with variation. But it does not decide which term is canonical, which product a term refers to, or whether two similar phrases mean different things in your domain. A glossary and a maintained list of synonyms still carry authority that similarity scores do not. See [taxonomies, ontologies and controlled vocabularies](/articles/taxonomies-ontologies-and-controlled-vocabularies).

**Metadata.** A filter on product and version is an exact, inexpensive way to avoid the wrong-version answer. It only works if every chunk carries correct values, which is a governance problem more than a technical one.

**Structure beyond text.** When questions involve relationships among entities, or corpus-wide themes, a flat set of text chunks has limits. Graph-based approaches address some of these cases; [knowledge graphs and ontologies for AI](/articles/knowledge-graphs-and-ontologies-for-ai) covers when they earn their cost and when they do not.

## What AI does not do by itself

Arango's argument, published in February 2025 as "Jorge's Wager," is that current AI cannot independently perform IA's three activities. In his account, language models are effective at language but do not understand the real world, so organizations should use current tools with human architects guiding them. He frames his stance as a bet: "AGI may be imminent, but we may as well act as if it isn't." He also states that his views may be wrong. That caveat is worth preserving. This article takes the wager as a reasonable planning stance, not as a settled prediction.

Take the three activities in turn, with this article's own reading rather than a summary of his.

- **Organize.** A model can propose categories and tags quickly. Whether those categories fit your users, your organization and your constraints depends on knowledge the model does not have unless someone supplies and checks it. Arango describes using GPT-4 through a command-line tool to propose new tags for a site of roughly 1,200 pages, writing the proposals to a CSV so that he could review them against existing tags before changing anything. The workflow is instructive: the model generates, a person decides. See [using AI as an IA tool](/articles/using-ai-as-an-ia-tool).
- **Set the context.** A retrieval system needs to know the product, version, audience and relationship of each piece of content. Someone has to decide which attributes matter and make sure they are accurate. A model can help fill them in, but the schema and the review standard are human decisions.
- **Plan for change.** Content, products and vocabulary shift. A model is not responsible for noticing that a page was retired or that a term was renamed, and a vector index will happily keep serving what it was given until someone re-indexes. This is governance work; see [IA governance and measurement](/articles/ia-governance-and-measurement).

## A worked scenario

> **Example (fictional):** A software company deploys an assistant over its help center. Users report that answers about "exporting reports" are sometimes wrong. A trace of one bad answer shows the assistant retrieved a chunk that begins "Click Export and choose a format." The chunk came from the documentation for the legacy desktop app, retired two releases ago. Nothing in the chunk named the product or version. The page was never redirected or marked deprecated, and the index had no version field.
>
> The fix is not a better model. The team adds product and version metadata to every page, filters retrieval to supported versions, marks the legacy docs as deprecated, rewrites headings so each section names its subject, and adds a regression test: a set of questions with known correct source pages, run after every content or index change.

Every repair in that scenario is an IA decision: labeling, metadata, lifecycle, structure and evaluation. The model was the last link, not the weak one.

## Evaluation changes shape, not purpose

Classic IA evaluation relied on methods such as card sorting and tree testing to learn whether people could find things. Those methods still apply for human readers. Machine readers add a second layer: given a question, does the system retrieve the right passage, and does the answer stay faithful to it? Es and colleagues proposed RAGAS, a reference-free approach to evaluating RAG pipelines that covers the retriever's ability to find relevant, focused context, the model's faithful use of that context, and the quality of the answer. In practice teams also build test sets of questions with known source passages and track retrieval measures such as precision, recall and mean reciprocal rank.

Both layers are needed. A structure that scores well on tree tests may still produce poor retrieval if the chunks are context-free; a retrieval pipeline that scores well on a test set may still fail people who browse. The method is developed in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).

## Honest limits and open questions

The case for IA in the AI era is strong at the level of mechanism: retrieval depends on what was indexed, how it was split and labeled, and what the model was shown. It is weaker where it would be tempting to be confident.

- **Evidence is young and domain-specific.** Reported improvements, including Anthropic's, come from particular datasets and configurations, and the authors say to test on your own. Treat published figures as examples of what can happen.
- **Models change.** Longer context windows, better embeddings and improved rerankers may reduce the penalty for poor structure in some cases. How far that goes is an open question. Structure may matter less for some tasks and more for others, such as accuracy, provenance and control.
- **Structure has a cost.** Metadata schemas, vocabularies and review cycles require people. For a small, stable content set, simple retrieval over clean text may be enough, and a heavy architecture would be waste.
- **"Matters more" is a claim about consequences, not about every case.** It means errors travel further and faster, not that every organization needs a bigger IA team.
- **Role and tooling are unsettled.** Which of these tasks will be handled by architects, content designers, data teams or engineers varies by organization, and I do not know how that will settle. The point of the wager is to plan for the present capabilities and revise as they change.

## What to do next

A sensible sequence for a team with an existing assistant or an upcoming one:

1. **Audit the corpus.** Remove or mark stale, duplicate and superseded content before indexing it.
2. **Define the minimum metadata.** Product, version, audience, type, owner and last-reviewed date cover many cases; add more only when a failure demands it.
3. **Make sections self-contained.** Descriptive headings, explicit subjects, conditions stated beside the claims they qualify.
4. **Build a small test set.** Twenty or thirty real questions with known source pages will reveal structural defects faster than anecdote.
5. **Trace failures to causes.** For each bad answer, ask whether the wrong chunk was retrieved, the right content was missing, a label was ambiguous, or the model misused good context.
6. **Assign owners.** Without someone accountable for freshness and vocabulary, the system degrades quietly.

To place your organization on a longer path, see [an IA maturity model for the AI era](/articles/an-ia-maturity-model-for-the-ai-era).
