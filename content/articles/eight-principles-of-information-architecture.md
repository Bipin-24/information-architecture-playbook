---
title: "Eight principles of information architecture, and how they hold up today"
description: "Dan Brown's eight IA principles, each with a practical reading, a fictional modern example and a common violation, plus how they apply to machine readers."
track: foundations
order: 3
updated: "2026-11-14"
tags: ["IA principles", "Dan Brown", "design heuristics", "multiple classification", "content lifecycle"]
takeaways:
  - "Brown's eight principles work as review heuristics for structure, from objects and choices to front doors and growth."
  - "Several principles (front doors, growth, focused navigation) are about assumptions you must plan for, not rules to apply mechanically."
  - "Objects, multiple classification and growth carry over almost unchanged to machine readers such as retrievers and agents."
  - "Principles are a checklist for critique. They do not replace research with your own users."
sources:
  - title: "Eight Principles of Information Architecture"
    url: "https://www.designprinciplesftw.com/collections/eight-principles-of-information-architecture"
---

Dan Brown published eight principles of information architecture in 2010. They are short, memorable, and still useful because they describe tensions that recur in every structure: how much to show, how many ways in, how to stay coherent as content grows. They are not laws, and they are not derived from experiments. They are a distillation of practitioner experience, which makes them good for design review and poor as a substitute for testing.

This article states each principle in Brown's wording, then gives a practical reading, a fictional modern example, and a common way teams violate it. If you need the broader context first, see [what is information architecture](/articles/what-is-information-architecture) and [the four systems of IA](/articles/the-four-systems-of-ia).

> **Key idea:** Use the principles as questions to ask of a draft structure, not as rules to satisfy. A structure can follow all eight and still fail the people it serves, so pair them with testing.

## 1. Principle of objects

> "Treat content as a living, breathing thing with a lifecycle, behaviors and attributes."

**Practical reading.** Content is not a pile of pages. It consists of things (an article, a product, a policy, a release note) that have attributes (owner, version, audience), behaviors (how they display, relate and are reused) and a lifecycle (drafted, published, revised, retired). Once you think this way, you can define a content type once and let structure, templates, search and filters all draw on it. This is the foundation of [content modeling and metadata](/articles/content-modeling-and-metadata).

**Example (fictional).** A fictional software company models "release note" as an object with product, version, release date, affected components and a deprecation flag. The same object renders on the product page, in a changelog, in search with a version filter, and in an email digest. Nothing is retyped.

**Common violation.** Treating every page as a unique document with free-form text. Without attributes, there is nothing to filter, reuse or retire. The symptom is a site where the only way to find "the latest version" is to open every page and check the date by eye.

## 2. Principle of choices

> "Create pages that offer meaningful choices to users, keeping the range of choices available focused on a particular task."

**Practical reading.** Every page presents a set of next steps. The principle says the set should be relevant to what the person is doing, and limited enough to scan. It does not specify a number. NN/g calls the common "seven main categories" guideline a myth, so resist any fixed limit. Ask instead: given the task this page serves, which options would a person plausibly want next, and which are noise?

**Example (fictional).** On a fictional invoice-detail page, the next choices are "Download PDF", "Dispute a charge" and "Contact billing about this invoice". The global footer's 40 links do not compete with them for attention because they are quiet and separate.

**Common violation.** Offering everything everywhere, often because stakeholders each want their item on every page. Another violation is the reverse, offering a single choice when the task clearly has branches, which forces people into search.

## 3. Principle of disclosure

> "Show only enough information to help people understand what kinds of information they'll find as they dig deeper."

**Practical reading.** Give readers enough to decide whether to go further, and no more. A category page, a search result, a menu with a summary line, or a card with a title and one sentence are all disclosure devices. The words used matter as much as the layout, because they carry information scent, covered in [mental models and information scent](/articles/mental-models-and-information-scent).

**Example (fictional).** A fictional documentation hub shows each guide as a title, a one-line outcome ("Set up single sign-on for a team of any size") and a content-type badge. A reader can decide in a glance whether to open it.

**Common violation.** Two opposite extremes. One is showing a bare link with an ambiguous name, giving no clue what is behind it. The other is dumping the whole article body into a listing, so the reader cannot scan. The trade-off is real: more disclosure helps decisions but costs space, and on small screens there is little room.

## 4. Principle of exemplars

> "Describe the contents of categories by showing examples of the contents."

**Practical reading.** Category names are abstract. Examples make them concrete. A category called "Governance" means different things to different people, but showing three titles beneath it tells the reader what lives there. Exemplars are particularly useful for new, ambiguous or jargon-heavy categories.

**Example (fictional).** A fictional internal portal lists "People Operations" with example items underneath: "Request time off", "Update your address", "Find the expense policy". Employees who did not know the department's name can still recognize their task.

**Common violation.** Using clever or branded category names with no examples, such as "Solutions" or "Insights". Teams also pick exemplars that are the newest or most promoted items rather than representative ones, which misleads people about what the category contains.

## 5. Principle of front doors

> "Assume at least half of the website's visitors will come through some page other than the home page."

**Practical reading.** Brown frames this as an assumption to design for, not a measured statistic, and this playbook treats it the same way. In practice, search engines, links, bookmarks and shared messages land people deep in the structure. Every page therefore has to orient a newcomer: where am I, what is this part of the site, where can I go from here. This also applies to chat answers and search snippets that link to a single page.

**Example (fictional).** A fictional API reference page includes a breadcrumb trail, the product and version it belongs to, a link to the section overview, and a clear route to the getting-started guide. A developer arriving from a search result is not stranded.

**Common violation.** Designing pages that only make sense after the home page and section index have been read. Typical symptoms are pages without titles that name the product, no breadcrumbs, and references such as "as described above" to context that is not on the page.

## 6. Principle of multiple classification

> "Offer users several different classification schemes to browse the site's content."

**Practical reading.** People think about the same content in different ways. One person looks for "invoices" by topic, another by task ("pay a bill"), another by their role. Offering more than one path, such as a topic hierarchy plus filters for audience and format, serves them without forcing one view. Technically, this requires content to carry multiple attributes. It is the practical case for facets, described in [the four systems of IA](/articles/the-four-systems-of-ia).

**Example (fictional).** A fictional training library can be browsed by topic, by job role, and by skill level. A single course carries all three attributes, so it appears in each view without being duplicated.

**Common violation.** Duplicating content to fit several categories, which creates conflicting copies. A second violation is offering multiple schemes that are poorly maintained, so one view is complete and the others are patchy. Extra schemes also add interface weight, so each one should earn its place by serving a real group of users.

## 7. Principle of focused navigation

> "Don't mix apples and oranges in your navigation scheme."

**Practical reading.** Within one navigation list, items should follow one logic. A menu that mixes topics ("Billing"), audiences ("Partners"), formats ("Videos") and campaigns ("Spring sale") asks readers to decode multiple schemes at once. The fix is to separate the logics into different navigation elements or different places, not necessarily to remove any item.

**Example (fictional).** A fictional support site keeps its main menu to topics only. Audience-specific entry points live in a separate "Start here" panel, and promotions sit in a banner, not in the menu.

**Common violation.** Menus that grow by accretion, with each request adding a new kind of item. The resulting list becomes unpredictable, and readers cannot guess what any item contains.

## 8. Principle of growth

> "Assume the content you have today is a small fraction of the content you will have tomorrow."

**Practical reading.** Structures designed for today's content break on tomorrow's. The principle asks you to build in room: category schemes that can absorb new items, naming that does not depend on the current product list, templates that scale, and a process for adding, splitting, merging and retiring categories. It echoes Jorge Arango's observation that "There are no static information structures." Growth is the reason [IA governance and measurement](/articles/ia-governance-and-measurement) exists.

**Example (fictional).** A fictional product team avoids naming a top-level category after a single feature. Instead, it uses the broader job ("Reporting"), so ten new reporting features fit without a restructure. It also keeps a documented rule for when a category with too many children should be split.

**Common violation.** A structure that is perfect for 60 pages and unusable at 600. The classic signs are a giant "Miscellaneous" bucket, category names that were fine at launch but now overlap, and a menu that has been reshuffled every quarter because the original scheme could not absorb change.

## Using the principles in a review

> **In practice:** Run the review as a short workshop with three or four colleagues who are not on the project. Give each a different principle, ask them to find the worst violation in the current environment, and rank the findings by how many top tasks they affect.

## Do the principles hold for machine readers?

Brown wrote for people browsing websites. The AI era widens the readership to retrievers, models and agents, and some principles transfer almost directly while others need translation. This section is an interpretation by this playbook, not part of Brown's formulation.

- **Objects.** Strongest carry-over. A retrieval system benefits when content has explicit attributes such as product, version and audience, because they can be used as filters. Content with a lifecycle (current, superseded, retired) can be excluded from answers when it is out of date. See [IA for RAG: chunking, metadata and context](/articles/ia-for-rag-chunking-metadata-and-context).
- **Multiple classification.** Also strong. Multiple attributes per item are what make metadata filtering and faceted retrieval possible, and they let the same material serve different questions without copies.
- **Growth.** Directly relevant. Indexes, vocabularies and tool catalogs grow, and a scheme that cannot absorb new items degrades retrieval quality over time.
- **Front doors.** Applies in a modified form. A retrieved passage arrives without the page around it, so each chunk, like each page, has to carry enough context to be understood alone.
- **Disclosure, choices and exemplars.** These translate into how descriptions, titles and summaries are written, for example the descriptions a model reads when picking among tools. The analogy is looser, and it is a hypothesis to test rather than a settled result.
- **Focused navigation.** Reasonable as a metaphor for keeping vocabularies and catalogs coherent, but there is no navigation menu to mix up, so the principle has less direct force.

> **Caution:** Do not treat this mapping as established. The principles were not designed or validated for machine readers, and the evidence for how well they transfer is thin. Treat them as plausible starting heuristics and measure retrieval results, as described in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).

## Limits of the principles

- **They are heuristics from practice, not research findings.** None of the eight is a tested threshold, and where a principle sounds numeric, such as front doors, it is an assumption to plan for.
- **They can conflict.** Disclosure favors showing less, multiple classification adds more routes, and growth asks for flexible schemes that can look vaguer at first. Resolving conflicts takes judgment and testing.
- **They are silent on your users.** The principles say nothing about whose words to use or what the top tasks are. That comes from research, as covered in [mental models and information scent](/articles/mental-models-and-information-scent).
