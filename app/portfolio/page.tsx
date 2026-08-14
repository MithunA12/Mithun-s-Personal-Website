import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Research } from "@/components/sections/Research";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { PageHero } from "@/components/ui/PageHero";
import { StickyStorySection } from "@/components/ui/StickyStorySection";
import { NeuralSignalVisual } from "@/components/visuals/NeuralSignalVisual";
import { projects } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Portfolio | Mithun Arun",
  description:
    "Mithun Arun's research and engineering work.",
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Research and engineering, end to end."
        description="AI healthcare and systems research designed to improve healthcare equity."
        aside={<NeuralSignalVisual />}
      />
      <Research />
      <StickyStorySection
        id="projects"
        description="Mobile, full-stack, and research-to-tool engineering. Filter by technical domain."
        eyebrow="Projects"
        title="Software built with research rigor and accessible intent."
      >
        <ProjectFilter projects={projects} />
      </StickyStorySection>
    </PageShell>
  );
}
