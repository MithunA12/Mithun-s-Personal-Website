import { hero, profile } from "@/src/data/profile";

export function Hero() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-12">
        <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {hero.eyebrow}
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
          {hero.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3" aria-label="Focus areas">
          {hero.focusAreas.map((area) => (
            <span
              className="rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium"
              key={area}
            >
              {area}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
    </section>
  );
}
