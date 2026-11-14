---
title: "Mental models and information scent: how people actually look for things"
description: "How mental models and information scent shape findability, why the three-click rule is a myth, and how the same ideas apply, loosely, to LLM retrieval."
track: foundations
order: 4
updated: "2026-11-14"
tags: ["mental models", "information scent", "information foraging", "wayfinding", "labeling"]
takeaways:
  - "People navigate by an internal picture of how a space is organized. Structure that clashes with it feels broken, even when it is logical."
  - "Information scent is the cue a label gives about what lies behind it. Weak scent makes people switch paths, often to search."
  - "The three-click rule has no supporting data. Clear labels and orientation matter more than click counts."
  - "Retrievers match text by similarity, so words and context in your content act like scent for machines. The analogy is loose."
sources:
  - title: "3-Click Rule (Nielsen Norman Group)"
    url: "https://www.nngroup.com/articles/3-click-rule/"
  - title: "Information foraging (Wikipedia)"
    url: "https://en.wikipedia.org/wiki/Information_foraging"
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "Introducing Contextual Retrieval (Anthropic)"
    url: "https://www.anthropic.com/engineering/contextual-retrieval"
---

An information architecture can be logical, consistent and well documented, and still fail, because the people using it do not think the way its designer does. Findability is a product of two things meeting: the structure that exists, and the picture of it that lives in the reader's head. When they match, people move through a space without noticing. When they do not, people hesitate, backtrack, and eventually open the search box.

This article covers three connected ideas: mental models, information scent and wayfinding. It then deals with a popular myth about clicks, turns to what it means to build structures in users' language, and closes with a cautious look at how these ideas extend to machines that retrieve by semantic similarity. For the systems this builds on, see [the four systems of IA](/articles/the-four-systems-of-ia).

## Mental models

A mental model is a person's internal explanation of how something is organized or works. You cannot observe it directly. You infer it from what people say, where they click, which words they search for, and how they group things.

Mental models matter for IA because they are the thing the structure has to match. They have a few properties that make them tricky:

- **They are personal and role-dependent.** A finance analyst, a new employee and a support agent each carry different pictures of the same intranet.
- **They come from previous experience.** People bring expectations from other sites, apps and physical analogies. A shopping site that hides the cart in an unexpected place is fighting habits built elsewhere.
- **They are often incomplete or wrong, and still drive behavior.** People act on what they believe, not on what the architect intended.
- **They are expressed in vocabulary.** The words people use for a concept are the clearest visible trace of how they carve up a domain.

> **Key idea:** The architect's model, the organization's model and the reader's model are three different things. IA work is largely about finding where they diverge and deciding which one the structure should follow. For most reader-facing structures, the answer is the reader's.

Typical gaps: organizations structure content by department or product line while readers think by problem or task, and experts use precise terms while novices use everyday words. Spotting these gaps is the purpose of the methods in [card sorting and tree testing](/articles/card-sorting-and-tree-testing).

## Information foraging and information scent

Information foraging theory, developed by Pirolli and Card at PARC in the 1990s, applies ideas from optimal foraging theory (how animals look for food) to how people look for information. The idea is secondary-sourced here, so the summary below is deliberately loose.

The central concept is **information scent**. People estimate how valuable a path is likely to be based on the cues in front of them: a link label, a heading, a snippet, a thumbnail. They follow what smells promising. When they arrive and the content matches expectations, they continue. If the scent weakens, because the label was vague or the destination did not match, they switch to another path, back up, or give up and search.

In practical IA terms:

| Scent element | Strong scent looks like | Weak scent looks like |
|---|---|---|
| Menu label | "Invoices and payments" | "Resources", "Solutions" |
| Link text | "Download the 2025 tax form" | "Click here", "Learn more" |
| Search result | Title and snippet that name the task and product | Generic title repeated for many pages |
| Category page | Specific subcategory names with examples | A long unsorted list |
| Page heading | Matches the link that led to it | Differs from the label the reader clicked |

Two consequences follow. First, **labels are the main carrier of scent**. NN/g's guidance on navigation points the same way: clear labels, and avoiding vague or branded terms. Second, **scent must be continuous**. A strong label that leads to a page with a different title breaks the trail, and the reader wonders whether they clicked the right thing.

> **In practice:** Check scent trails for your top five tasks. Write the starting point, each label a person would click, and the heading they land on. Wherever the wording changes between steps, you have a candidate scent break.

Information foraging is a useful lens, not a formula. It does not give you a number to optimize, and it does not tell you what any particular audience considers a strong cue. You still have to test.

## Wayfinding: knowing where you are

Scent helps people choose where to go. Wayfinding helps them know where they are and how to get back or onward. NN/g's navigation advice emphasizes that visitors should always know where they currently are and how to get to their destination, and lists the usual tools: breadcrumbs, local subnavigation, navigation hubs, and mega menus in preference to cascading dropdowns, which it describes as error-prone.

For IA, wayfinding comes down to a few design questions:

- Does every page say what it belongs to (product, section, version)?
- Is the current location visible in the navigation?
- Can a person get back to the parent or to a related set without using the browser's back button?
- Do page titles and headings match the labels that led there?

Wayfinding is also the practical form of the "front doors" idea in [eight principles of information architecture](/articles/eight-principles-of-information-architecture): many people arrive deep inside the structure, so orientation has to be on the page, not assumed from the journey.

## The three-click rule is a myth

A popular rule says that every piece of content should be reachable within three clicks. NN/g, in a 2019 article, examined its history. The earliest print reference it found was in a 2001 book by Jeffrey Zeldman, with no data behind it. NN/g states that the rule "has not been supported by data in any published studies to date."

What data does exist points the other way. Joshua Porter's 2003 study for UIE found that user drop-off did not increase beyond three clicks, and that satisfaction did not decrease either. NN/g also calls the "7 main categories" rule of thumb a myth.

This does not mean depth and breadth are irrelevant. It means click count is a poor proxy for what actually predicts success. NN/g steers attention toward:

- **Interaction cost and load time.** A click that is instantly clear is cheap, and one that is confusing or slow is expensive.
- **Information scent.** Clear labels, without vague or branded terms.
- **Wayfinding.** Breadcrumbs, local navigation and clear location cues.
- **Menu design.** Mega menus over cascading dropdowns.

The honest position is that no verified threshold exists. A five-click path with strong scent at every step can outperform a two-click path with a misleading label. You find out by testing, not by counting. Specific techniques are in [navigation design best practices](/articles/navigation-design-best-practices).

> **Caution:** The opposite error is just as common. "Clicks do not matter" would be a misreading. Unnecessary steps still cost time and attention. The finding is that a fixed limit is not supported by evidence, not that depth is free.

## Why structure must match users' language

If scent lives in words, then the words have to be the reader's. This is the practical core of mental-model work.

1. **Collect real language.** Search logs show exactly what people type. Support tickets, chat transcripts, sales calls and forum posts show how they describe their problems. These are better sources than workshops where stakeholders guess.
2. **Compare it with your labels.** List the terms that appear in your menus and titles next to the terms people use. Mismatches are your priority list.
3. **Let users group things.** An open card sort shows how participants cluster items and what they call the clusters. NN/g recommends open sorts as the most common and most useful form, while noting that category names from a sort are not necessarily final labels.
4. **Test the proposed structure.** A tree test then checks whether people can find things in the hierarchy, using tasks with defined correct answers.
5. **Keep both vocabularies.** Use the audience's term as the preferred label and keep the internal term as a recognized synonym, so both groups find the content.

> **Example (fictional):** A fictional HR portal labels a section "Total rewards". Search logs show employees typing "benefits", "pay stub" and "401k" (or the equivalent in their country). Nobody types "total rewards". The team renames the section "Pay and benefits", keeps "Total rewards" as a search synonym and as the page's formal subtitle, and re-tests with five common tasks. The section stays the same. Only the words changed.

There is a trade-off here. Audience language varies. Different user groups, regions and experience levels use different terms, and no single label serves all of them. Synonym handling and scoped navigation absorb some of that, but they do not eliminate it.

## Extending the idea to machine retrieval

Many AI assistants answer questions by retrieving passages from a knowledge base and passing them to a language model. The foundational paper on this pattern, Lewis et al. (2020), combined a model's built-in knowledge with a dense vector index of Wikipedia accessed by a neural retriever. In such systems, text is converted to numeric vectors, and passages whose vectors are close to the query's vector are retrieved.

There is a loose parallel to scent, and it is useful as long as it stays loose:

- **The retriever only sees what is in the passage.** A person can use the surrounding page, the breadcrumb and the menu path as cues. A retrieved chunk arrives alone. Anthropic's description of contextual retrieval gives an example: a chunk saying "The company's revenue grew by 3% over the previous quarter" does not name the company or the period, so it is hard to match to a specific question. Its remedy is to prepend short, chunk-specific context before indexing. In scent terms, a bare chunk is a link with no label.
- **Vocabulary gaps still exist.** If readers ask in everyday words and your documents use internal terms, matching can suffer. Semantic embeddings can bridge some of that gap but not reliably, and results depend on the model and the content. Keeping preferred and non-preferred terms in the text and metadata is a cheap safeguard.
- **Structure carries context.** Headings, titles, product names and version labels in the text give a retriever something to match on, in the same way clear labels give people something to follow.

Where the analogy breaks matters more than where it holds:

- A language model does not have a mental model in the sense used for people, and similarity in vector space is not a theory of cognition.
- People forage across a whole environment, over several steps. A retrieval step is usually a single query, though some systems iterate.
- Evidence for how structure choices change retrieval quality is young and condition-dependent. Anthropic's own reported gains came under specific datasets and settings, and the authors advise running your own evaluations.

So the defensible claim is narrow: content that is clear in isolation, carries its own context and uses readers' vocabulary is likely to serve both people and retrievers better. Treat that as a hypothesis to measure, as described in [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era), and see [IA for RAG: chunking, metadata and context](/articles/ia-for-rag-chunking-metadata-and-context) for practical detail.

## Limits

- Mental models are inferred, so every description of them is an interpretation.
- Information foraging is a theoretical framework summarized here from secondary material. It guides thinking but does not provide thresholds.
- Research with small samples shows patterns in your audience, not statistical proof, and results from one site may not transfer to another.
- The extension to LLM retrieval is an analogy. Use it to generate hypotheses, not to justify conclusions.
