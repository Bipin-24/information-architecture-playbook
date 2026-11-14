/** Mirrors the model in /articles/an-ia-maturity-model-for-the-ai-era. Author's synthesis, not an industry standard. */
export const levels = [
  { n: 1, name: "Ad hoc", line: "Structure emerges from whoever publishes. Little is written down. Fixes are reactive." },
  { n: 2, name: "Managed", line: "Someone owns structure for key areas. Basic standards exist. Practice varies between teams." },
  { n: 3, name: "Defined", line: "Structure, vocabulary and process are documented and shared across teams." },
  { n: 4, name: "Measured", line: "Decisions are tested and tracked. There are baselines, gates and regular reporting." },
  { n: 5, name: "Optimizing", line: "Measurement feeds a routine improvement loop, including machine readers, with deliberate trade-offs." },
] as const;

export type Dimension = { id: string; name: string; question: string; descriptors: [string, string, string, string, string]; read: { label: string; href: string } };

export const dimensions: Dimension[] = [
  { id: "structure", name: "Content structure", question: "How is your content structured?", read: { label: "Content modeling and metadata", href: "/articles/content-modeling-and-metadata" },
    descriptors: ["Pages written freely; formats vary by author", "Templates for common content types; some reuse", "Documented content model; consistent headings and self-contained topics", "Structure changes tested against findability and retrieval results", "Structure tuned using error analysis across both audiences, with deliberate trade-offs recorded"] },
  { id: "metadata", name: "Metadata and vocabulary", question: "How are metadata and vocabularies managed?", read: { label: "Taxonomies, ontologies and controlled vocabularies", href: "/articles/taxonomies-ontologies-and-controlled-vocabularies" },
    descriptors: ["Tags added ad hoc; duplicates and synonyms unmanaged", "Core fields and a tag list exist; one owner for key areas", "Controlled vocabulary with preferred and alternative labels; required fields by content type", "Metadata completeness and consistency tracked; vocabulary changes tested", "Vocabulary evolves through query and failure data; validation automated where useful"] },
  { id: "navsearch", name: "Navigation and search", question: "How do people move through and search your content?", read: { label: "Navigation design best practices", href: "/articles/navigation-design-best-practices" },
    descriptors: ["Structure follows the org chart; search untuned", "Menus reviewed occasionally; basic synonyms", "Navigation documented by type; query logs reviewed periodically", "Tree tests and search metrics benchmarked; regressions caught", "Regular cycle of log review, testing and tuning with measured results"] },
  { id: "semantic", name: "Semantic modeling", question: "How explicit are the relationships in your knowledge?", read: { label: "Knowledge graphs and ontologies for AI", href: "/articles/knowledge-graphs-and-ontologies-for-ai" },
    descriptors: ["Relationships implicit in prose", "Facets or related-links for main topics", "Entity and relationship model documented for priority domains", "Model quality checked against a flat baseline", "Graph or ontology used only where measured gains justify the cost"] },
  { id: "retrieval", name: "Retrieval and agent interfaces", question: "How do retrieval systems and agents consume your content?", read: { label: "IA for RAG", href: "/articles/ia-for-rag-chunking-metadata-and-context" },
    descriptors: ["Content fed to systems as found; tool descriptions written by developers alone", "Awareness of chunking and metadata filtering; pilots", "Written chunking and metadata guidelines; tool names and descriptions follow a style guide", "Retrieval tested on a golden set; tool descriptions reviewed against agent failures", "Continuous tuning; context, ranking and tool discovery adjusted from error analysis"] },
  { id: "governance", name: "Governance", question: "How is structure governed over time?", read: { label: "IA governance and measurement", href: "/articles/ia-governance-and-measurement" },
    descriptors: ["No owner; stale content stays", "Owners for key areas; ad hoc cleanup", "Documented lifecycle, change process and deprecation rules", "Content health indicators reported; review cadence met", "Governance adapts to evidence; retired content is reliably removed from retrieval"] },
  { id: "evaluation", name: "Evaluation", question: "How do you know whether the structure works?", read: { label: "Evaluating IA in the AI era", href: "/articles/evaluating-ia-in-the-ai-era" },
    descriptors: ["Opinion and anecdote", "Occasional user feedback or study", "Standard methods documented; some research per project", "Baselines, task success and retrieval metrics tracked; golden set exists", "Gates in release process; sets refreshed; judged metrics calibrated against human review"] },
];

export const nextByLevel: Record<number, string> = {
  1: "Name an owner for one corpus and write down the core content types and required metadata.",
  2: "Document the model and a small controlled vocabulary, and set a change process.",
  3: "Add measurement: a baseline for findability and a first set of real test questions.",
  4: "Add gates to the release process and run error analysis, feeding results back into structure.",
  5: "Revisit trade-offs deliberately and prune practices that do not earn their cost.",
};

export function summarize(scores: Record<string, number>) {
  const vals = dimensions.map((d) => scores[d.id]).filter((v): v is number => typeof v === "number");
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const overall = Math.floor(mean + 1e-9);
  const sorted = [...dimensions].map((d) => ({ d, s: scores[d.id] })).sort((a, b) => a.s - b.s || dimensions.indexOf(a.d) - dimensions.indexOf(b.d));
  const spread = Math.max(...vals) - Math.min(...vals);
  return { mean: Math.round(mean * 10) / 10, level: levels[Math.min(overall, 5) - 1], toward: overall < 5 ? levels[overall] : null, weakest: sorted.slice(0, 3), spread };
}
