import type { Project } from "@/src/data/profile";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] focus-within:border-[var(--accent)] focus-within:shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] sm:p-7">
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

      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.stack.map((technology) => (
          <li
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium"
            key={technology}
          >
            {technology}
          </li>
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
    </article>
  );
}
