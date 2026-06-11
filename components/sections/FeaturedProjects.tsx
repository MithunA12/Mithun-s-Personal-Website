import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/src/data/profile";

const featuredProjects = projects.filter((project) => project.featured);

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="scroll-mt-8 border-y border-[var(--border)] bg-[var(--surface)] px-6 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          Featured projects
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Products and technical systems built for real-world problems.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
