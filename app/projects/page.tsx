import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { PageHero } from "@/components/ui/PageHero";
import { StickyStorySection } from "@/components/ui/StickyStorySection";
import { projects } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Projects | Mithun Arun",
  description: "Software, mobile product, and AI healthcare projects built by Mithun Arun.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Projects"
        title="Technical systems built with research rigor and product intent."
        description="Explore software and AI healthcare work across mobile development, full-stack interfaces, and research-to-product translation."
        aside={<p className="font-mono text-sm leading-7 text-[var(--muted)]">{projects.length} selected projects<br />Filter by project category</p>}
      />
      <StickyStorySection
        description="Browse product engineering and AI healthcare work without leaving the page."
        eyebrow="Project explorer"
        title="Filter the work by technical domain."
      >
        <ProjectFilter projects={projects} />
      </StickyStorySection>
    </PageShell>
  );
}
