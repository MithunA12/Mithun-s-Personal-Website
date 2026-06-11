const projects = [
  {
    title: "Worldview",
    description:
      "A mobile social product built with React Native, Expo, and Firebase.",
    category: "Mobile product",
  },
  {
    title: "NeuroHero Web App",
    description:
      "A research-to-product interface for working with EEG and ECG model inputs.",
    category: "AI healthcare",
  },
  {
    title: "Security Assessment Agent",
    description:
      "An AI-assisted workflow for mapping vendor evidence to security requirements.",
    category: "AI systems",
  },
];

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
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
              key={project.title}
            >
              <p className="text-sm font-semibold text-[var(--accent)]">
                {project.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
