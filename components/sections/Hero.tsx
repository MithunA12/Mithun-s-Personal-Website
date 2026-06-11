import {
  accomplishments,
  experiences,
  hero,
  profile,
  projects,
  research,
} from "@/src/data/profile";

const featuredResearch = research.find((item) => item.featured);
const founderProject = projects.find((project) =>
  project.role.toLowerCase().includes("founder"),
);
const leadershipExperience = experiences.find(
  (experience) => experience.category === "Leadership",
);
const featuredAward = accomplishments.find(
  (accomplishment) => accomplishment.title === "Regeneron ISEF Finalist",
);

const credibilitySignals = [
  {
    label: "Research",
    value: featuredResearch?.publicationStatus,
  },
  {
    label: "Product",
    value: founderProject
      ? `${founderProject.title} · ${founderProject.role}`
      : undefined,
  },
  {
    label: "Leadership",
    value: leadershipExperience
      ? `${leadershipExperience.organization} · ${leadershipExperience.title}`
      : undefined,
  },
  {
    label: "Recognition",
    value: featuredAward?.title,
  },
].filter((signal): signal is { label: string; value: string } =>
  Boolean(signal.value),
);

export function Hero() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid min-h-[82vh] max-w-6xl items-center gap-10 px-6 py-16 sm:gap-14 sm:px-8 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:px-12 lg:py-28">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:text-sm">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-3xl lg:text-4xl">
            {hero.headline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            {hero.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5" aria-label="Focus areas">
            {hero.focusAreas.map((area) => (
              <span
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-sm font-medium"
                key={area}
              >
                {area}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              href={hero.primaryCta.href}
            >
              {hero.primaryCta.label}
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              href={hero.secondaryCta.href}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside
          aria-labelledby="credibility-heading"
          className="border-t border-[var(--border)] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
        >
          <p
            id="credibility-heading"
            className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
          >
            Selected proof
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-1">
            {credibilitySignals.map((signal) => (
              <div
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5"
                key={signal.label}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  {signal.label}
                </dt>
                <dd className="mt-2 font-medium leading-6">{signal.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
