import { experiences } from "@/src/data/profile";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-8 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Experience
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Research, building, and leadership in practice.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Roles that show technical execution, founder initiative, and clear
            communication across different settings.
          </p>
        </div>

        <ol className="mt-10 border-t border-[var(--border)]">
          {experiences.map((experience) => (
            <li
              className="grid gap-3 border-b border-[var(--border)] py-6 sm:grid-cols-[0.8fr_1fr_1.6fr] sm:gap-6"
              key={`${experience.organization}-${experience.title}`}
            >
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  {experience.category}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--muted)]">
                  {experience.organization}
                </p>
              </div>
              <h3 className="text-lg font-semibold leading-7">
                {experience.title}
              </h3>
              <p className="leading-7 text-[var(--muted)]">
                {experience.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
