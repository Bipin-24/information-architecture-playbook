---
title: "IA for agents and MCP: designing tool catalogs machines can read"
description: "Names, descriptions, schemas, and access boundaries are labeling and organization for AI agents. A practical guide to MCP tools, resources, and errors."
track: ai-era
order: 5
updated: "2026-11-14"
tags: ["agents", "MCP", "tool design", "labeling", "least privilege"]
takeaways:
  - "An agent reads your tool names, descriptions, and schemas the way a visitor reads navigation labels."
  - "MCP servers expose tools, resources, and prompts; choose the primitive by who controls the interaction and what it does."
  - "Treat tool descriptions from servers you do not trust as untrusted input, per the MCP spec guidance."
  - "Scope tools narrowly: access control is part of the architecture, not an afterthought."
sources:
  - title: "Model Context Protocol: Architecture"
    url: "https://modelcontextprotocol.io/docs/learn/architecture"
  - title: "Information Architecture: For the Web and Beyond, 4th ed., Part II"
    url: "https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/part02.html"
  - title: "Jorge's Wager: Why AI Needs Information Architecture"
    url: "https://jarango.com/2025/02/21/jorges-wager-why-ai-needs-information-architecture/"
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
---

When an AI agent decides what to do, it often chooses among tools: search the knowledge base, look up an order, create a ticket, run a query. The agent cannot see your interface. It sees a list of names, descriptions, and parameter definitions, and it picks from them. That list is an information environment, with its own organization, labels, navigation, and search problems. The reader is a language model, and the cost of a poor label is a wrong action rather than a bounce.

This article treats a tool catalog as an IA artifact. It uses the Model Context Protocol (MCP) as the main example because its architecture is documented and widely discussed, but the principles apply to any function-calling setup. For the retrieval side of the same story, see [IA for RAG](/articles/ia-for-rag-chunking-metadata-and-context).

> **Caution:** MCP is versioned by date and changes between versions. The details below follow the architecture overview in the protocol's documentation and stay at the level of concepts. Before you build, read the current specification and check what your specific clients and servers support. This article makes no claims about which clients implement which features.

## How MCP is organized

According to the MCP documentation, the architecture is client-server. An MCP **host** (the AI application) creates one MCP **client** for each MCP **server** it connects to. There are two layers:

- **Data layer.** Built on JSON-RPC 2.0. It handles capability and version discovery, the primitives, and notifications.
- **Transport layer.** Stdio for local servers, Streamable HTTP for remote ones. For remote servers, the documentation recommends OAuth for obtaining tokens.

A server exposes three primitives:

| Primitive | What it is | Typical IA analogy |
|---|---|---|
| Tools | Executable functions the AI application can invoke | Actions and transactions: the "do" part of a site |
| Resources | Data sources that provide context | Content: the documents, records, and files to read |
| Prompts | Reusable interaction templates | Guided paths, templates, canned queries |

Clients discover each primitive through list methods (for tools, `tools/list`) and execute tools through `tools/call`. A tool definition has a `name`, a `title`, a `description`, and an `inputSchema` written in JSON Schema. The documentation also notes that MCP does not dictate how AI applications use language models or manage the context they are given. That choice, which is where much of the design power lives, belongs to the host.

## Agents are readers of your catalog

Rosenfeld, Morville, and Arango describe four systems in an information environment: organization, labeling, navigation, and search. Map them onto a tool catalog and the design questions become familiar.

| IA system | In a tool catalog | Design question |
|---|---|---|
| Organization | Grouping tools into servers and namespaces; deciding the granularity of each tool | Does the grouping match tasks the agent will actually be asked to do? |
| Labeling | Tool names, titles, descriptions, parameter names, enum values | Would a reader with no context know when to use this and when not to? |
| Navigation | Progressive discovery, tool search, related-tool hints in descriptions | Can the agent find the right tool without seeing every tool? |
| Search | How a client or model selects among tools by matching intent to descriptions | Is the intent-to-tool match unambiguous? |

Jorge Arango's argument that current AI cannot independently organize information, set context, and plan for change applies here too: the model will use whatever structure you provide, and it will not fix a muddled one for you. Tool descriptions are where you set the context. Versioning and deprecation of tools are where you plan for change.

## Labeling: names, titles, and descriptions

The MCP docs advise a clear naming pattern, for example `calculator_arithmetic` rather than `calculate`. The point is that a name should say both the domain and the action, because the agent may see dozens of tools from different servers at once, and "search" or "get" or "run" alone means nothing.

Practical rules from general labeling practice:

1. **Lead with the domain, then the verb and object.** `orders_lookup_by_id`, `kb_search_articles`. Use one separator style and one verb vocabulary across the catalog (`get`, `list`, `search`, `create`, not a mix of `fetch`, `find`, and `retrieve`).
2. **Write the description for a stranger.** State what the tool does, what it returns, when to use it, and when not to, including the neighboring tool to prefer in that case.
3. **Use the audience's terms.** The model has seen your public documentation. If users say "invoice" and your internal system says "billing document", put both in the description.
4. **Describe parameters as well as the tool.** Each parameter needs a plain description, its format, and an example. Constrain it with `enum`, `pattern`, or bounds where you can.
5. **Say what is not covered**, such as "does not return archived orders".
6. **Keep descriptions factual and short.** Marketing prose wastes context and blurs the line between tools.

> **Example (fictional):** An invented support platform exposes one tool called `search`. Below is a before and after. In the first version, an agent cannot tell this tool from another server's `search`, does not know what the date format is, and may send a free-text customer name where an ID is required.

Before:

```json
{
  "name": "search",
  "description": "Searches for things.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "q": { "type": "string" },
      "date": { "type": "string" }
    }
  }
}
```

After:

```json
{
  "name": "orders_search",
  "title": "Search customer orders",
  "description": "Finds orders for ONE customer by customer ID and an optional date range. Returns up to 'limit' orders, newest first, with order ID, status, and total. Does not search archived orders (use orders_archive_search) and does not accept customer names; use customers_lookup to resolve a name to an ID first.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "customer_id": {
        "type": "string",
        "description": "Customer identifier, e.g. 'cus_1234' (placeholder format)."
      },
      "from_date": {
        "type": "string",
        "format": "date",
        "description": "Earliest order date, ISO 8601 (YYYY-MM-DD). Optional."
      },
      "to_date": {
        "type": "string",
        "format": "date",
        "description": "Latest order date, ISO 8601 (YYYY-MM-DD). Optional."
      },
      "limit": {
        "type": "integer",
        "minimum": 1,
        "maximum": 50,
        "default": 10,
        "description": "Maximum number of orders to return."
      }
    },
    "required": ["customer_id"],
    "additionalProperties": false
  }
}
```

The second version names the domain, states scope and exclusions, points to neighbors, and constrains inputs so malformed calls fail early. The field names match the MCP tool definition in the docs; the tool, limits, and ID format are invented.

## Resources or tools?

A recurring design question is whether something should be a resource or a tool. The primitives differ in intent: resources provide data as context; tools execute functions. A practical decision aid:

| Question | If yes | If no |
|---|---|---|
| Is it reading stable content that has an address (a document, a schema, a policy)? | Resource | Consider a tool |
| Does it take parameters and compute or look something up on demand? | Tool | Resource |
| Does it change state anywhere (write, send, delete)? | Tool, with explicit safeguards | Either |
| Is it a repeatable workflow the user kicks off by choice? | Prompt | Tool or resource |

In IA terms: resources are your content objects, tools are your transactions, and prompts are your guided paths. If your knowledge base is mostly documents, exposing them as addressable resources (with good titles and descriptions) and offering one well-designed search tool is usually cleaner than twenty narrow tools. Be aware that how a host surfaces resources and prompts to the model varies by application, so test with the clients you care about rather than assuming.

## Navigation: progressive discovery

Every tool definition occupies context. Clients that federate many servers can use progressive tool discovery instead of loading every tool upfront, as the MCP documentation notes. This is an old IA principle in a new setting: show only enough to help the reader decide where to look next (Dan Brown's principle of disclosure), and let them dig deeper.

What you can do as a catalog designer, independent of the client:

- **Group by task, not by system.** An agent asked to "handle a refund" benefits from `refunds_*` tools together, even if they hit three backend systems.
- **Keep the catalog small.** Every extra tool is another candidate that may be confused with a neighbor. Merge tools that differ only by a parameter; split tools whose behavior differs materially.
- **Make descriptions discriminating.** If a search layer sits in front of your catalog, it will match on description text, so distinct, specific wording is what makes the right tool findable.

## Errors are part of the interface

When a call fails, the agent has to decide what to do next. An unhelpful error ("Error 500") leads to blind retries or invented explanations. A good error is a label too.

General practice, not a protocol requirement:

- Return a **stable error code** and a human-readable message, for example `CUSTOMER_NOT_FOUND`, `INVALID_DATE_RANGE`, `PERMISSION_DENIED`, `RATE_LIMITED`.
- Say **what to do next** in plain words: "Call customers_lookup to find the ID", "Retry after 30 seconds".
- Distinguish **caller mistakes** (fix the input) from **temporary failures** (retry) from **permission failures** (stop and ask a person).
- Never put secrets or internal stack traces in error text. Errors flow into a model's context and possibly into logs.

Check how the current MCP specification represents tool errors and follow it, instead of inventing a parallel scheme.

## Treat descriptions as untrusted input

This part has no clean equivalent in web IA. The MCP specification guidance says that descriptions and annotations describing tool behavior should be considered untrusted unless they come from a trusted server. The reason is straightforward: tool text is placed in front of a model, so a malicious or compromised server can write text intended to steer the model.

Consequences for architecture:

1. **Approve servers deliberately.** A catalog assembled from many third-party servers is a supply chain.
2. **Do not let a description grant authority.** "This tool is safe and needs no confirmation" is the server's assertion, not a verified property.
3. **Enforce confirmation for consequential actions** in the host or server, not in prose a model might be talked out of.
4. **Review descriptions on update.** A changed description is a changed interface.

Someone must own the approved-server list.

## Access control and least privilege as architecture

Who can call what is as structural as what the tools are called. Some principles that follow from standard security practice:

- **Scope tools narrowly.** `orders_refund_create` with a maximum amount beats a general `run_sql` tool. Narrow tools are easier to describe, audit, and secure.
- **Separate read from write.** Expose read-only tools by default. Put state-changing tools in a separate server or namespace so they can be approved, logged, and revoked independently.
- **Authenticate callers and authorize per request.** For remote servers, the MCP documentation recommends OAuth for tokens. Authorization should reflect the end user's rights, not only the agent's.
- **Log calls for audit**, never secrets.
- **Rate limit and cap results**, with pagination, so one call cannot dump a database into a prompt.

If you expose retrieval, filter by the caller's permissions before content reaches the model.

## A catalog review checklist

1. Every tool name begins with a domain and uses a consistent verb vocabulary.
2. Each description states purpose, output, scope, exclusions, and neighboring tools.
3. Every parameter has a description, a format, and constraints where possible.
4. No two tools could be plausibly chosen for the same request without a stated tie-breaker.
5. Read-only and state-changing tools are separated.
6. Consequential actions require confirmation enforced outside the model.
7. Errors have stable codes, plain messages, and next steps.
8. Tools from third-party servers are on an approved list, and description changes are reviewed.
9. Results are bounded and paginated.
10. The catalog is tested with real tasks, and failures are traced back to the label or schema, not only to the model. See [evaluating IA in the AI era](/articles/evaluating-ia-in-the-ai-era).
11. Someone owns the catalog and its deprecations. See [IA governance and measurement](/articles/ia-governance-and-measurement).

## Limits and open questions

- Good descriptions improve the odds of correct tool use but do not guarantee it; behavior differs across models and hosts.
- This article cites no public evidence quantifying how much description quality changes agent outcomes, so test on your own tasks.
- Over-specified descriptions crowd context. Prefer the shortest text that disambiguates.
- Agent tooling standards are young; keep tool design separable from any one protocol version.
