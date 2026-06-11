import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/src/data/profile";

const featuredProjects = projects.filter((project) => project.featured);

export function FeaturedProjects() {
  return (
    <Section id="projects" tone="surface">
      <SectionHeader
        eyebrow="Featured projects"
        title="Products and technical systems built for real-world problems."
      />
      <ProjectFilter projects={featuredProjects} />
    </Section>
  );
}
