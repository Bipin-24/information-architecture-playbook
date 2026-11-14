---
title: "How AI is changing the way people find information"
description: "What a small Nielsen Norman Group study found about AI and search, what Google says about AI features, and what content owners can sensibly do."
track: ai-era
order: 2
updated: "2026-11-14"
tags: ["search behavior", "AI search", "findability", "generative engine optimization", "content strategy"]
takeaways:
  - "In NN/g's small study, people used AI and traditional search together and checked one against the other."
  - "Answers delivered without a click change what success looks like for content owners; measure carefully."
  - "Google says no special optimization or files are required for its AI features; fundamentals still apply."
  - "GEO research is early and domain-dependent; treat its reported gains as hypotheses to test."
sources:
  - title: "How AI Is Changing Search Behaviors (Nielsen Norman Group)"
    url: "https://www.nngroup.com/articles/ai-changing-search-behaviors/"
  - title: "AI features and your website (Google Search Central)"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - title: "GEO: Generative Engine Optimization"
    url: "https://arxiv.org/abs/2311.09735"
  - title: "Introduction to structured data markup in Google Search"
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
  - title: "llms.txt proposal"
    url: "https://llmstxt.org/"
---

It is easy to write about AI and search as if one behavior had replaced another. The evidence we have is more modest and more interesting. People are adding tools to their repertoire, switching between them, and checking one against the other. For anyone who owns content or an information environment, the useful questions are what this changes about being found, and what is worth doing about it.

This article is deliberately cautious. Much of the public commentary on AI search relies on traffic statistics and adoption figures of uneven quality, and I do not cite them. What follows rests on one qualitative study, one search provider's published guidance, and one academic proposal, each described with its limits.

## What the Nielsen Norman Group study found

In August 2025, Kate Moran, Maria Rosala and Josh Brown published "How AI Is Changing Search Behaviors" at the Nielsen Norman Group. It was a qualitative study with nine participants, drawn from North America and the UK. That sample size matters. It supports observations about how some people behave and why, and it cannot support estimates of how many people behave that way.

With that caveat, the reported findings are these:

- **AI had not replaced traditional search.** Participants used both, often in tandem, and used each to fact-check the other.
- **Every participant used traditional search multiple times.** None relied entirely on AI.
- **Chatbots helped with particular jobs:** defining needs, sifting through options, comparing perspectives and synthesizing.
- **AI overviews suited quick definitions and fast facts** better than complex synthesis.
- **Habits were sticky.** People tended to continue with what they already did.
- **An AI overview can satisfy a need without a click.** The authors describe this as a serious challenge for all content producers.
- **Discoverability is a major challenge for generative AI tools and their functions.** People do not always know what a tool can do or how to ask it.

The researchers cite a Pew finding on clicks second-hand; I do not repeat any number from it here.

> **Key idea:** The unit of behavior is a mix, not a switch. A person may ask a chatbot to frame a problem, run a traditional search to verify a detail, and open a page to read the primary source.

### What the study does not tell us

A nine-person qualitative study cannot tell us how common any pattern is, whether it holds outside the tasks used, or how behavior changes over time as tools improve. Habits observed in 2025 may shift. Treat the study as a well-observed snapshot of how some people combine tools, useful for forming hypotheses and for noticing what to look for in your own research.

## Hybrid behavior and what it means for information environments

The finding that people verify across tools is a useful design input. It implies several things.

**Trust is built in the checking.** If readers check an AI answer against a traditional result, the second source needs to confirm it clearly. Pages with a precise, visible answer, an obvious owner and a recent date make that confirmation quick. Pages that bury the answer, contradict each other, or carry no indication of currency make it slow.

**Different tasks reach different channels.** The study suggests quick facts and definitions flow toward overviews, while more complex or high-stakes tasks involve reading. If that holds more generally, an information environment may find that its short factual pages are consumed in summarized form while its deeper material is reached by people who want detail or verification. Whether that is true for your content is an empirical question for your own analytics and user research.

**The path to your content is less predictable.** People may meet your content as a quoted passage, a citation in an answer, a search result, or a direct visit. Pages must make sense when arrived at from any of those, which is what Brown's [principle of front doors](/articles/eight-principles-of-information-architecture) already argued for the web: assume many visitors come through some page other than the home page.

## What changes for content and IA

### Answers without clicks

When an overview or chatbot satisfies a need without a visit, a page view no longer measures whether the content helped. Fewer visits may reflect content working well elsewhere, or content being bypassed in a way that does not benefit the owner. The data to distinguish these cases is often not available to you, so be careful about what you conclude from a decline.

Practical responses, none of which depend on statistics:

- Track the outcomes you care about (task completion, sign-ups, support requests avoided), not only traffic.
- Make the content that benefits from a visit, such as tools, interactive material, detailed procedures and primary data, clearly worth visiting.
- Decide deliberately which content you want summarized freely and which you want protected, and use the controls described below.

### Trust and verification

If people check AI answers, accuracy and provenance become part of findability. A page that states what it applies to, when it was last reviewed and who is responsible is easier to verify. This overlaps with [governance](/articles/ia-governance-and-measurement): owners, review dates and visible versions are architecture, and they affect whether a reader trusts a passage that was lifted out of context.

### Discoverability of functions

The NN/g finding that discoverability is a challenge for generative AI tools applies to your own products too. If you build an assistant or add AI features, people have to learn what it can do. Old IA lessons apply: clear labels, examples that show scope (Brown's principle of exemplars), and entry points where the need arises.

### The classic problems remain

Search behavior is still driven by information scent, the user's estimate of whether a path will lead to what they need, which is covered in [mental models and information scent](/articles/mental-models-and-information-scent). A chatbot reply and a results page are both scent: a signal about whether to continue. Vague labels, inconsistent terminology and buried answers harm people in either channel.

## What Google says about its AI features

Google Search Central's page on AI features and your website addresses AI Overviews and AI Mode directly. Its key statements:

- AI Overviews and AI Mode are part of Search.
- "The best practices for SEO remain relevant for AI features in Google Search."
- "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."
- To be eligible, a page must be indexed and eligible to be shown in Search with a snippet.
- "You don't need to create new machine readable files, AI text files, or markup to appear in these features," and there is no special schema.org structured data to add.

Its recommendations are conventional: allow crawling, provide internal links, offer a good page experience, keep important content in text, and use structured data that is consistent with the visible text. It also notes that there is no guarantee of crawling, indexing or serving.

Two points of interpretation, flagged as mine. First, this is guidance about Google's features, not about every AI product, and other systems may behave differently. Second, "no special optimization needed" does not mean content quality is irrelevant. Google's page says its search best practices remain relevant and that no separate requirements apply, so the safest reading is that fundamentals still count.

For controls, Google describes robots.txt, `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex`, plus the Google-Extended control for use of content for AI training and grounding in other Google systems. These let you decide what is shown, which is a different question from what helps you be found. A practical checklist is in [making content AI-ready and discoverable](/articles/making-content-ai-ready-and-discoverable).

### On special files

The llms.txt proposal, published by Jeremy Howard in September 2024, suggests a Markdown file at `/llms.txt` that gives AI agents a curated guide to a site, with links to pages and optional Markdown versions. It is a community proposal, not a ratified standard. Evidence that AI platforms consume it is unconfirmed, and secondary sources conflict. Google's guidance says no such files are needed for its features. Creating one costs little and may be useful as a curated index for your own tools, but do not expect a visibility effect.

## What the GEO research says

Aggarwal and colleagues proposed "generative engine optimization" (GEO) in a paper presented at KDD 2024. They define it as a black-box optimization framework for improving the visibility of content in generative engine responses, and introduce a benchmark called GEO-bench. Their abstract reports visibility boosts of "up to 40%" and says that effectiveness varies by domain.

Read this carefully:

- It is an "up to" figure from the abstract, tied to their methods, benchmark and the engines they tested.
- Variation by domain means a technique that helps in one area may not help in another.
- The work was submitted in November 2023, and the engines it measured may have changed since.
- It describes a measurement approach and candidate strategies; it is not a guarantee, and it does not show that any given tactic works for your content today.

The sensible stance is to treat GEO as an active research area that gives you hypotheses to test, and to run your own checks before changing content for it. If a tactic would make the content worse for people (stuffing, awkward phrasing, claims you cannot support), it fails the more important test.

## What to do

The evidence points more strongly to durable fundamentals than to special tactics. These are consistent with Google's guidance and with the NN/g observations about verification.

| Practice | Why it helps | How to check |
|---|---|---|
| Descriptive page titles and headings | People and machines both judge relevance from them | Read titles in a list; do they distinguish pages? |
| Answer first, in text | Quotable and checkable; keeps key content in crawlable text | Does the first paragraph answer the page's main question? |
| Precise, accurate statements | Verification against another source succeeds | Spot-check claims against the source of truth |
| Visible ownership and dates | Lets readers judge currency | Is a review date shown and real? |
| Clear structure and internal links | Supports crawling and wayfinding | Can every page be reached through links? |
| Structured data that matches visible content | Gives explicit clues about a page's meaning; may enable rich results, with no guarantee | Compare markup to what a reader sees |
| Consistent terminology | Reduces ambiguity for search and retrieval | Compare terms in content to terms in search logs |
| Deliberate access controls | Lets you choose what is crawled, shown or used | Review robots.txt and snippet settings |

Google's introduction to structured data describes schema.org vocabulary, generally in JSON-LD, as giving explicit clues about what a page means and making pages eligible for rich results, without guaranteeing them, and requires markup to match visible content. That is the right way to think of it: a clarification of meaning, not a lever on AI answers.

### A short research routine

If you want evidence about your own audience rather than other people's, a small routine goes further than any statistic in this article:

1. List ten real questions your audience asks, taken from support tickets and search logs.
2. Run each in a traditional search engine and in the AI tools your audience likely uses.
3. Record whether your content appears, whether it is represented accurately, and whether the answer is correct.
4. For each error, trace it: was the source page ambiguous, outdated, hard to find or missing?
5. Fix those causes and repeat on a schedule.

The sample is small and the results are anecdotal, so label them that way when you report them. This gives you leads, not measurements.

## Limits of this account

- The behavioral evidence cited here is nine participants. It does not describe the population.
- Google's guidance describes Google's features; other systems may use different signals, and their behavior can change without notice.
- The GEO result is an academic proposal measured on specific engines at a specific time.
- I have excluded traffic and adoption statistics because I could not verify them. Their absence is a choice, not a claim that the effects are small.
- Everything in this field is moving. Check current documentation and run your own tests before acting on any summary, including this one.

For the structural side of the problem, how documents get split and retrieved once an AI system reads them, see [why IA matters more in the AI era](/articles/why-ia-matters-more-in-the-ai-era). For the traditional side, which remains in use, see [search and findability](/articles/search-and-findability).
