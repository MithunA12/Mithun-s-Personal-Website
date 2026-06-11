import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Research } from "@/components/sections/Research";
import { PageHero } from "@/components/ui/PageHero";
import { NeuralSignalVisual } from "@/components/visuals/NeuralSignalVisual";

export const metadata: Metadata = {
  title: "Research | Mithun Arun",
  description: "Mithun Arun's AI healthcare, EEG, ECG, signal processing, and sleep phenomics research.",
};

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research"
        title="Computational research for complex healthcare signals."
        description="Published and presented work spanning EEG and ECG signal processing, feature extraction, model evaluation, clinical data analysis, and scientific communication."
        aside={<NeuralSignalVisual />}
      />
      <Research />
    </PageShell>
  );
}
