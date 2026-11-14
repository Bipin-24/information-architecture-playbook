---
title: "Card sorting and tree testing: how to design and test a structure"
description: "How to run open card sorts and tree tests in sequence, with sample guidelines, analysis tips, a worked example, and the limits of each method."
track: practice
order: 2
updated: "2026-11-14"
tags: ["card sorting", "tree testing", "UX research", "information architecture", "findability"]
takeaways:
  - "Card sorting generates groupings; tree testing evaluates a hierarchy. Use them in that order."
  - "Open sorts are the default; NN/g recommends against hybrid sorts because preset categories can bias people."
  - "Sample sizes are guidelines, not statistical thresholds. Pilot before you scale."
  - "Neither method tests labels in context, search, or visual design."
sources:
  - title: "Card Sorting: Uncover Users' Mental Models for Better Information Architecture"
    url: "https://www.nngroup.com/articles/card-sorting-definition/"
  - title: "Tree Testing: Fast, Cheap UX Research"
    url: "https://www.nngroup.com/articles/tree-testing/"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
---

Card sorting and tree testing are the two workhorse methods for structure. They answer different questions. A card sort asks, "How do people group these things?" A tree test asks, "Given this hierarchy, can people find what they came for?" Used together, they take you from raw material to a tested structure without drawing a single screen.

This article is about using them well: choosing the right variant, planning the study, reading the results without over-reading them, and knowing what neither method can tell you. It assumes you already have a content inventory and a list of top tasks. If not, start with the [information architecture process](/articles/information-architecture-process). The method descriptions and numeric guidelines below follow Nielsen Norman Group (NN/g) unless stated otherwise.

## What each method is for

In a card sort, participants "place individually labeled cards into groups," according to NN/g. The output is evidence about mental models: which items people consider alike and what they call the groups. In a tree test, participants are given tasks and a text-only version of a hierarchy (a menu structure with no visual design or content) and asked where they would look. Each task has a defined correct answer, so the result is a measure of how well the structure supports finding.

| | Card sorting | Tree testing |
|---|---|---|
| Purpose | Generate groupings and vocabulary | Evaluate a proposed hierarchy |
| Input | Content items on cards | A tree of labels and tasks with correct answers |
| Output | Clusters, candidate category names, similarity patterns | Success, directness, time, and where people went wrong |
| Best moment | Early, before a structure exists | After a draft structure exists, before design and content depend on it |
| Nature | Generative | Evaluative |

> **Key idea:** A card sort cannot tell you whether a structure works, and a tree test cannot tell you what structure to try. Skipping either leaves a gap: you either test an arbitrary guess or generate options you never verify.

## Card sorting in practice

### Choose the variant

NN/g describes three variants.

- **Open sort.** Participants create their own groups and name them. This is the most common variant and the one NN/g recommends for generating a structure.
- **Closed sort.** Participants place cards into predefined categories. NN/g treats this as a validation approach and typically recommends tree testing for that purpose instead.
- **Hybrid sort.** Participants may use predefined categories or make their own. NN/g generally recommends against it, because the predefined categories can bias what people do.

If you are uncertain, run an open sort. A closed sort is reasonable only when you have a fixed top level imposed by something outside your control (a regulatory taxonomy, say) and want to see how people distribute content beneath it, and even then a tree test is usually the stronger check.

### Plan the study

**Cards.** NN/g recommends 30 to 50 cards. Beyond about 50, participants tire and tend to build a large "Miscellaneous" pile, which is evidence of fatigue as much as of structure. Choose items that represent what users look for, not every page you own. Write card labels in neutral, plain terms. Avoid words that appear in your intended category names, because they hand participants the answer.

**Participants.** As guidelines, NN/g suggests at least 15 participants for a qualitative study and at least 30 to 50 for a quantitative one. These are not statistical thresholds; they reflect a balance between pattern stability and budget. Recruit from the audiences in your brief, not colleagues, and run a pilot with two or three people to catch confusing cards and instructions.

**Mode.** Moderated sessions let you hear the reasoning ("these two are the same thing but for different people"), which is often the most valuable output. Unmoderated sessions scale better and fit quantitative goals. Many teams do a small moderated round first to refine cards, then an unmoderated round for pattern strength.

### Analyze without over-reading

Look for three things: items that most participants group together, items that split people into two or more clusters, and items that land in "Miscellaneous" or alone. The first group is your most stable categories. The second is where your structure needs a decision (or multiple classification). The third is either a missing concept in your set or a label participants did not understand.

NN/g makes two cautions worth repeating. A card sort yields a single level of categorization and ignores page context, so it will not give you a full multi-level hierarchy on its own. And category names from an open sort are not necessarily final labels. Treat participant names as vocabulary data: record the words, count which recur, and then choose labels deliberately.

> **Caution:** Similarity matrices and dendrograms from sorting tools look precise. They are summaries of what a modest sample did with a specific set of cards, and the cut line you choose in a dendrogram is a judgment call. Read the groupings qualitatively and check them against what you know about tasks.

## Tree testing in practice

### Write good tasks

Tasks are the core of the method. Each should describe a goal in the user's words without using the label you expect them to find. "You were charged twice for last month's ride and want your money back" works better than "Find the billing disputes page." Every task needs one or more correct answers defined in advance, because success is the main outcome.

Cover your top tasks first, then add a few for lower-frequency but high-consequence needs. Keep sessions short enough that participants stay attentive; a handful of well-chosen tasks beats a long list.

### Pick a setup

According to NN/g, tree testing evaluates a hierarchical category structure and can be used at the start of a redesign to benchmark the current structure, after a card sort to test the hierarchy that emerged, and before content and layouts are created. Qualitative tree tests, run with a few participants and discussion, help you find causes. Quantitative tests measure the proportion of participants who succeed and the time they take to find an answer, and are where you need larger samples. NN/g advises doing a few moderated pilots before a quantitative test, and notes that qualitative tree testing is not meant for statistics.

### Read directness, not just success

Success tells you whether people ended at a correct node. **Directness** tells you whether they went straight there or bounced between categories first. A task with high success and low directness is a warning: people got there, but the structure made them hesitate, and in a real interface with distractions some of them would not.

NN/g's page on tree testing gives no numeric thresholds for "good" success or directness, so avoid importing a number from a blog post and treating it as a standard. A better practice is to benchmark your current structure first, then compare the proposed structure against that baseline on the same tasks. Relative improvement on your own tasks is more meaningful than a score against a universal bar.

When a task fails, look at the first click. If many people choose the same wrong node, the label of that node or the label of the correct one is probably misleading. If first clicks are scattered, the structure may be too deep, the categories may overlap, or the task wording may be unclear. Check task wording before blaming the tree.

## The sequence: card sort, then tree test

The combination is stronger than either method alone.

1. **Inventory and top tasks.** Select 30 to 50 items that represent what people seek.
2. **Pilot the card sort.** Fix confusing cards and instructions.
3. **Run an open card sort.** Collect groupings and vocabulary.
4. **Synthesize one or two candidate hierarchies.** Combine sort patterns with your knowledge of tasks and constraints. This step is design work, not arithmetic.
5. **Run a moderated tree test pilot** on the candidate or candidates.
6. **Run a quantitative tree test** if you need comparison data or have a large audience.
7. **Revise and re-test** the weakest tasks.

If you have an existing structure, tree test it first (step 0) to find out which parts fail. This benchmark often shows the problem is in a small number of areas, which narrows the card sort.

## Worked example

> **Example (fictional):** An internal IT help portal serves 4,000 employees. The team has 120 articles and a top level of six categories inherited from the org chart: "Infrastructure," "Applications," "End-User Services," "Security," "Telecom," and "Other."
>
> **Step 0.** A baseline tree test with eight tasks shows that "Reset my password" succeeds with low directness (people try "Applications" and "Security" before "End-User Services"), and "Request a second monitor" mostly fails, with first clicks scattered across three categories.
>
> **Card sort.** The team selects 40 representative articles and runs a moderated open sort with 15 employees from several departments, followed by an unmoderated open sort with a larger group. Participants consistently group password, account lockout, and multi-factor setup together, and they call that group things like "My account" and "Sign-in." Equipment requests cluster separately, named "Hardware" or "Things I need."
>
> **Candidate structure.** The team drafts a hierarchy built around employee goals: "Sign in and accounts," "Equipment and workspace," "Software and apps," "Report a problem," "Security and safety." "Other" is dropped.
>
> **Tree test.** The same eight tasks on the new tree show improved directness for password reset, and the monitor request now lands consistently in "Equipment and workspace." But "Report a phishing email" splits between "Security and safety" and "Report a problem." The team keeps the item in "Security and safety" and adds a link to it from "Report a problem" (contextual navigation), then re-tests that task.
>
> The numbers in a real study would be specific to the tasks and sample. The point of the example is the loop: benchmark, generate, evaluate, and adjust where tasks still fail.

## Common mistakes

- **Using a closed sort to validate a structure.** It tells you how people distribute items into your categories, but it is not a task-based test. Use a tree test.
- **Too many cards, or the wrong cards.** Sets over about 50 produce fatigue and Miscellaneous piles; sets that are all internal jargon produce results about jargon.
- **Leading labels.** If cards contain your category names, sorts will confirm your categories.
- **Skipping the pilot.** Unclear instructions and ambiguous cards ruin large studies more often than small samples do.
- **Treating sample guidelines as statistical power.** The numbers are practical guidance. They do not create confidence intervals you can quote in a report without further analysis.
- **Tree testing a tree with no context.** A tree test strips out labels' surrounding text on purpose. That is the strength of the method and also a limit: results show how the hierarchy performs alone, not in the finished interface.
- **Fixing only the failing task.** When one task fails, look for the pattern behind it (an ambiguous label, an overlapping pair of categories) before patching one node.

## Limits of these methods

Neither method is a full evaluation of findability.

- **Single-level grouping.** Card sorts, as NN/g notes, capture one level of categorization and ignore page context. Deeper hierarchy is design work informed by the sort.
- **Artificial setting.** People sort cards and navigate trees without the surrounding page, without search, and without the distractions of a real interface. Success in a tree test is necessary but not sufficient.
- **Language and culture.** Groupings and labels reflect the participants you recruited. A structure tested only on one audience may fail for another.
- **Attention to the task list.** A tree test measures only the tasks you wrote. It will not reveal needs you did not think to include; pair it with query log and support-ticket review.
- **Multiple classification.** Both methods push toward a single place for each item. Many items reasonably belong in several places. Facets, cross-links, and metadata handle this and are outside what these two methods evaluate. See [content modeling and metadata](/articles/content-modeling-and-metadata) and [navigation design best practices](/articles/navigation-design-best-practices).
- **No evidence about search.** If search will carry a large share of finding, evaluate it separately, as covered in [search and findability](/articles/search-and-findability).

For small projects, a tree test alone, with ten or so tasks and a few moderated participants, can be enough. For a large restructuring, the full sequence is worth the time, because mistakes in a top-level hierarchy ripple through every page, template, and URL beneath it.
