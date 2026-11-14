/** Site-wide facts. Author details come from the founder's own brief; nothing is invented. */
export const site = {
  name: "The Information Architecture Playbook",
  short: "IA Playbook",
  tagline: "How information architecture works, and how it is changing in the AI era.",
  description:
    "A field guide to information architecture: the fundamentals, proven practice, and how IA is evolving for retrieval, RAG, knowledge graphs and AI agents.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once the production domain is final.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://information-architecture-playbook.vercel.app").replace(/\/$/, ""),
  repo: "https://github.com/Bipin-24/information-architecture-playbook",
  author: {
    name: "Bipin Pandey",
    role: "Information Architect",
    linkedin: "https://www.linkedin.com/in/bipinpandey24/",
    github: "https://github.com/Bipin-24",
    portfolio: "https://bipin-24.github.io/",
  },
} as const;

export const nav = [
  { label: "Articles", href: "/articles" },
  { label: "Foundations", href: "/tracks/foundations" },
  { label: "Practice", href: "/tracks/practice" },
  { label: "AI era", href: "/tracks/ai-era" },
  { label: "Tools", href: "/tools" },
  { label: "Glossary", href: "/glossary" },
] as const;
