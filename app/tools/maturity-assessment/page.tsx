import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/tool-shell";
import { MaturityAssessment } from "@/components/tools/maturity-assessment";

export const metadata: Metadata = {
  title: "IA maturity assessment",
  description: "A seven-dimension, five-level self-assessment of information architecture maturity in the AI era, with transparent scoring and prioritized next steps.",
  alternates: { canonical: "/tools/maturity-assessment" },
};

export default function Page() {
  return (
    <ToolShell eyebrow="Tool 01 · Self-assessment" title="IA maturity assessment" lede="Seven dimensions of IA, from content structure to evaluation. Pick the description that is mostly true today."
      note="The model is the author's synthesis, not an industry standard, and the result reflects your own judgment. It does not inspect your content."
      learn={[{ label: "The maturity model, explained", href: "/articles/an-ia-maturity-model-for-the-ai-era" }, { label: "The IA process", href: "/articles/information-architecture-process" }, { label: "Evaluating IA in the AI era", href: "/articles/evaluating-ia-in-the-ai-era" }]}>
      <MaturityAssessment />
    </ToolShell>
  );
}
