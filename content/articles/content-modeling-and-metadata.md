---
title: "Content modeling and metadata: designing structure that people and machines can use"
description: "How to define content types, attributes and relationships, choose minimum viable metadata, control values, and avoid page-shaped models and field sprawl."
track: practice
order: 4
updated: "2026-11-14"
tags: ["content modeling", "metadata", "structured content", "controlled vocabulary", "front matter"]
takeaways:
  - "A content model defines types, attributes and relationships; it is what lets content be reused, filtered and searched."
  - "Start with minimum viable metadata: fields that a real feature, filter or workflow will use."
  - "Controlled values keep metadata consistent; free text invites drift."
  - "Page-shaped models and field sprawl are the two most common failures."
sources:
  - title: "Eight Principles of Information Architecture"
    url: "https://www.designprinciplesftw.com/collections/eight-principles-of-information-architecture"
  - title: "SKOS Simple Knowledge Organization System Reference"
    url: "https://www.w3.org/TR/skos-reference/"
  - title: "Introduction to structured data markup in Google Search"
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
---

Every information environment already has a content model, whether or not anyone wrote it down. It lives in templates, spreadsheet columns, form fields, and the unspoken habits of authors. The question is whether the model is deliberate. A deliberate model lets you reuse content, filter it, show it in several places without copying it, and hand it to a search engine or a retrieval system with its meaning intact.

This article covers how to build a content model from the ground up, how metadata fits into it, and how to keep both from growing out of control. It sits in the structure-design phase of the [information architecture process](/articles/information-architecture-process) and feeds directly into navigation, search, and the controlled vocabularies described in [taxonomies, ontologies and controlled vocabularies](/articles/taxonomies-ontologies-and-controlled-vocabularies).

## What a content model is

A content model describes three things:

- **Content types.** The kinds of things you publish, such as an article, a product, a release note, a procedure, a person, an event.
- **Attributes.** The properties each type has: title, summary, author, review date, audience, status.
- **Relationships.** How types connect: a procedure belongs to a product, a release note refers to a feature, an article has an author who is a person.

Dan Brown's principle of objects states the underlying idea: "Treat content as a living, breathing thing with a lifecycle, behaviors and attributes." Lifecycle means content is created, reviewed, changed, and retired. Behaviors mean it is displayed, filtered, combined and linked in particular ways. Attributes are the data that make those behaviors possible.

> **Key idea:** A content type is not a template and not a page. It is a description of a kind of thing, with enough structure that a system can do useful work with it. Templates, pages, and search results are different presentations of that structure.

## Structured and unstructured content

A long Word document and a record with discrete fields sit at two ends of a spectrum.

| | Unstructured | Structured |
|---|---|---|
| Form | A body of prose; meaning is implicit | Discrete fields with defined meaning |
| Reuse | Copy and paste; copies drift | Reference one source; display in many places |
| Filtering and sorting | Limited to text search | By any attribute |
| Authoring cost | Low per item | Higher up front; pays off with volume and reuse |
| Fits | One-off narrative, opinion, long-form writing | Repeating patterns: products, procedures, FAQs, events, release notes |

Most content is a mixture. A procedure might have structured fields (product, version, audience, estimated time) around a body of free text. The design question is how much structure each type earns. A good test is to ask, for each candidate field, what will use it. If nothing displays, filters, routes, or validates on the field, it is a candidate for removal.

**When not to structure.** Do not force structure onto content that has no repeating shape. A thought-leadership essay does not need ten fields; it needs a title, an author, a date, a summary, and maybe two tags. Over-structuring raises authoring effort and invites empty or meaningless values.

## Building a model, step by step

1. **List the types from the audit.** The content audit is the best source. The "what is this, really?" column from the audit (a plain noun for each item) often gives you a first draft. Merge near-duplicates and split types that behave differently.
2. **Name each type from the audience's point of view.** "Troubleshooting guide" is more useful than "Support content item."
3. **Define the attributes for each type.** For each, record the name, purpose, data type, whether it is required, and who fills it in. Add what uses it.
4. **Mark shared attributes.** Attributes that appear in many types (audience, product, status, review date) are candidates for shared definitions with shared value lists.
5. **Draw the relationships.** Sketch types as boxes and relationships as labeled lines: "belongs to," "replaces," "relates to," "authored by." Note whether each relationship is one-to-one, one-to-many, or many-to-many.
6. **Decide what is reusable.** Identify chunks that appear in more than one place (a warning, a legal notice, a definition) and model them as their own types or components.
7. **Test with real content.** Take ten items of each type and try to fill in the model. Gaps and awkward fits are information.

> **Example (fictional):** A company that publishes setup guides for a family of devices starts with a single "Page" type containing title and body. The audit shows three distinct kinds of content: "Setup procedure" (steps, estimated time, required parts), "Troubleshooting entry" (symptom, cause, fix), and "Specification table" (device, attribute, value). The team models these as three types, with a "Device" type that each refers to. Now a device page can list its procedures, a procedure can warn about a related troubleshooting entry, and a specification can be updated in one place and reflected everywhere it appears.

## Metadata: what it is and what kinds exist

Metadata is data about content. It is the mechanism by which a model's attributes become useful to people and systems. The usual three-way classification is:

- **Descriptive metadata** says what the content is about and who it is for: title, summary, subject, audience, product, language.
- **Structural metadata** says how content fits together: part of a series, order within a sequence, parent and child relationships, version.
- **Administrative metadata** supports management: owner, creation and review dates, status, rights and permissions.

Dublin Core is a long-standing, general-purpose set of metadata elements that many teams use as a starting reference, particularly for descriptive fields. Treat it as a source of well-understood field names, not a mandate to use every element. Structured data on the web (the schema.org vocabulary, which Google generally recommends expressing in JSON-LD) is a different layer: Google describes it as giving explicit clues about what a page means and making pages eligible for some rich results. It does not guarantee those results, and markup must match what is visible on the page.

### Minimum viable metadata

Metadata costs authors time, and incomplete or inconsistent metadata is often worse than none, because it creates false confidence in filters. Start with the smallest set that supports real use:

| Field | Why it earns its place | Typical value type |
|---|---|---|
| Title | Identification, navigation, search ranking, page title | Free text, with style rules |
| Summary | Search results, previews, link scent | Free text, short |
| Content type | Template selection, filtering, display rules | Controlled list |
| Audience | Filtering, routing, access decisions | Controlled list, multi-value |
| Subject or topic | Browsing, related content | Controlled list or taxonomy |
| Owner | Accountability, review routing | Reference to a person or team |
| Last reviewed date | Freshness checks, retirement decisions | Date |
| Status | Draft, published, deprecated | Controlled list |

Then add a field only when you can name the feature, filter, or workflow that will use it. A product-based environment will likely add product and version. A regulated one may add jurisdiction. A multilingual one needs language. Each addition should come with an owner who fills it and a rule for what happens when it is empty.

## Controlled values

A free-text field for "audience" will fill up with "Admins," "administrators," "Admin users," and "sys admins." Filters built on those values then show four options for one group. The remedy is a **controlled vocabulary**: a defined list of allowed values, with a preferred term for each concept and alternates that map to it.

- Use controlled lists for any field you will filter, facet, or route on.
- Keep free-text fields for things people read but do not filter on, such as summaries.
- Record synonyms alongside the preferred term, so search can match "sys admin" to "Administrator."
- For hierarchical topics, use a taxonomy. SKOS, a W3C Recommendation from 18 August 2009, is a common data model for sharing and linking such vocabularies. It distinguishes `skos:prefLabel` (at most one preferred label per language) from `skos:altLabel`, and expresses hierarchy with `skos:broader` and `skos:narrower`, and associations with `skos:related`.
- Give every list an owner and a change process. A vocabulary nobody maintains drifts, and metadata built on it drifts with it.

Value lists have a cost, too. A strict list blocks authors who need a new value, so provide a request path with a quick turnaround. If the path is slow, authors will either misuse an existing value or work around the system.

## A front matter example

Plain-text and docs-as-code workflows often store metadata as front matter at the top of a file. Here is a minimal example for a fictional troubleshooting entry. Field names are illustrative.

```yaml
---
title: "Device does not power on after firmware update"
content_type: troubleshooting-entry
summary: "Steps to recover a device that stays dark after a failed firmware update."
product: "example-device"
applies_to_versions: ["2.1", "2.2"]
audience: ["end-user", "support-agent"]
topic: "firmware"
owner: "team-support-content"
status: published
last_reviewed: "2026-10-01"
related:
  - "recover-device-in-safe-mode"
  - "firmware-update-overview"
---
```

Several design decisions are visible here. `content_type` drives template and validation. `audience` and `applies_to_versions` are multi-valued because the entry is relevant to more than one group and version. `related` stores relationships by identifier rather than by pasted text. `last_reviewed` and `owner` support governance. And every value that appears in a filter (`product`, `audience`, `topic`, `status`) should come from a controlled list, which a validation step can enforce at build time.

## How the model connects to the rest of the system

- **Templates.** Each content type maps to one or more templates. If a type has no distinct template or behavior, question whether it is a real type.
- **Navigation.** Attributes drive faceted navigation and automated "related content" lists, which supports Brown's principle of multiple classification: "Offer users several different classification schemes to browse the site's content." See [navigation design best practices](/articles/navigation-design-best-practices).
- **Search.** Metadata fields can be indexed separately, boosted in ranking, shown in result snippets, and offered as filters. A missing or inconsistent field becomes a failed filter. See [search and findability](/articles/search-and-findability).
- **Governance.** Owner, status, and review date give you the raw material for content health reports, retirement, and redirects.
- **AI systems, briefly.** Retrieval systems that split content into chunks benefit from the same structure: a type, a product, a version, and an audience attached to a chunk let a system filter before it ranks. The details of chunking and retrieval belong to the AI-era articles on this site, and the evidence for specific techniques is still developing. The IA point is simple: metadata you define for people tends to be useful to machines for the same reasons.

## Common mistakes

**Page-shaped models.** The model mirrors the current site: a "Home page" type, a "Landing page" type, a "Text page" type. These describe layouts, not things. When the layout changes, the model breaks. Model the kinds of content (procedure, product, person) and let pages be assembled from them.

**Field sprawl.** Every stakeholder asks for one more field, and no field is ever removed. Authors respond by leaving fields blank or filling them with filler. Fix: require a named use for every field, review fields annually, and delete those that nothing consumes.

**Metadata nobody owns.** Fields that need judgment (topic, audience) go stale without a person responsible for their values. Assign owners, and report on completeness.

**Free text where a list belongs.** Covered above. If you want to filter on it, control it.

**One type to rule them all.** A single "Content" type with fifty optional fields is a sign that distinct types have been merged. Split by behavior.

**Over-modeling relationships.** Not every association needs a typed link. Start with the relationships that people will see (related, belongs to, replaces) and add more only when a feature requires them.

**Ignoring migration.** A new model applied to old content requires someone to fill fields for thousands of items. Plan how: automation, sampling, defaults, or phased adoption. Do not launch a model that old content cannot satisfy.

## A short checklist

1. Each content type is a kind of thing (a procedure, a product), not a layout.
2. Each type has a named audience-facing label and a clear boundary from similar types.
3. Every attribute has a defined purpose, data type, required status, and owner.
4. Every field used for filtering, routing, or display logic has controlled values.
5. Shared attributes use shared value lists.
6. Relationships between types are drawn and named.
7. Reusable components are modeled once.
8. Owner, status, and review date exist on content that can go stale.
9. The model has been tested by filling it with real content from the audit.
10. A review cycle exists for fields and value lists.

## Limits and trade-offs

A content model is a hypothesis about how content will be used, and hypotheses are wrong in places. More structure gives more flexibility later and more cost now. Highly structured content requires authoring tools or workflows that can enforce it, and not every platform or team can. Metadata is only as good as the discipline that maintains it, and automated tagging, which can propose values at scale, still needs human review for consistency, as discussed in [using AI as an IA tool](/articles/using-ai-as-an-ia-tool). Finally, a model that works for one audience may not serve another: confirm that the types and labels make sense to the people who will read and filter the content, and not only to the people who author it.
