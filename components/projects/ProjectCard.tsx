import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/src/data/profile";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col" polished>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          {project.category}
        </p>
        <p className="text-sm font-medium text-[var(--muted)]">{project.role}</p>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight">
        {project.title}
      </h3>
      <p className="mt-3 leading-7 text-[var(--muted)]">
        {project.description}
      </p>

      <ul
        className="mt-6 flex flex-wrap gap-2"
        aria-label={`${project.title} technologies`}
      >
        {project.stack.map((technology) => (
          <Tag as="li" key={technology}>
            {technology}
          </Tag>
        ))}
      </ul>

      {project.impact ? (
        <div className="mt-6 border-t border-[var(--border)] pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Outcome
          </p>
          <p className="mt-2 leading-6">{project.impact}</p>
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="mt-auto flex flex-wrap gap-4 pt-6">
          {project.links.map((link) => (
            <a
              className="font-semibold text-[var(--accent)] underline decoration-blue-200 underline-offset-4 transition-colors hover:text-[var(--accent-strong)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
