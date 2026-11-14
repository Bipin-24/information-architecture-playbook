import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/tool-shell";
import { StructureChecker } from "@/components/tools/structure-checker";

export const metadata: Metadata = {
  title: "Structure checker",
  description: "Lint Markdown for structural problems that hurt scanning, navigation and retrieval: skipped headings, vague labels, oversized sections and missing alt text.",
  alternates: { canonical: "/tools/structure-checker" },
};

export default function Page() {
  return (
    <ToolShell eyebrow="Tool 03 · Linter" title="Structure checker" lede="Headings are the handles that people, navigation and chunkers grab. Check yours for common structural problems, with line-level fixes."
      note="The rules are rules of thumb chosen for this tool, not a standard or a guarantee about any search or AI system. Passing does not make content good."
      learn={[{ label: "Making content AI-ready and discoverable", href: "/articles/making-content-ai-ready-and-discoverable" }, { label: "Documentation information architecture", href: "/articles/documentation-information-architecture" }, { label: "Content modeling and metadata", href: "/articles/content-modeling-and-metadata" }]}>
      <StructureChecker />
    </ToolShell>
  );
}
