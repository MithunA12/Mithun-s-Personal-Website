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
    "Mithun Arun's research and engineering work — AI healthcare research alongside shipped software and product projects.",
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Research and engineering, end to end."
        description="AI healthcare research paired with the software and product work that turns it into usable systems — spanning signal processing, model development, mobile apps, and full-stack interfaces."
        aside={<NeuralSignalVisual />}
      />
      <Research />
      <StickyStorySection
        id="projects"
        description="Mobile, full-stack, and research-to-product engineering. Filter by technical domain."
        eyebrow="Projects"
        title="Software built with research rigor and product intent."
      >
        <ProjectFilter projects={projects} />
      </StickyStorySection>
    </PageShell>
  );
}
