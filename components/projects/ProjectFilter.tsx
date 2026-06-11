"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/src/data/profile";

interface ProjectFilterProps {
  projects: Project[];
}

const allProjectsLabel = "All";

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const categories = [
    allProjectsLabel,
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];
  const [activeCategory, setActiveCategory] = useState(allProjectsLabel);
  const visibleProjects =
    activeCategory === allProjectsLabel
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="mt-10">
      <div
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
        role="group"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              aria-pressed={isActive}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] ${
                isActive
                  ? "border-[var(--accent-fill)] bg-[var(--accent-fill)] text-white shadow-[0_8px_22px_-14px_var(--shadow-color)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--hover-border)] hover:bg-[var(--surface-subtle)]"
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visibleProjects.length} project
        {visibleProjects.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
