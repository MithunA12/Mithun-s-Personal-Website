import { ProjectCard } from "@/components/projects/ProjectCard";
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
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
