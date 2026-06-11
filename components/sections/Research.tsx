import { research } from "@/src/data/profile";

export function Research() {
  const featuredResearch = research.find((item) => item.featured);

  if (!featuredResearch) {
    return null;
  }

  return (
    <section id="research" className="scroll-mt-8 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Research
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Applying machine learning to complex healthcare data.
          </h2>
        </div>
        <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8">
          <p className="text-sm font-semibold text-[var(--accent)]">
            Featured research area
          </p>
          <h3 className="mt-3 text-2xl font-semibold">
            {featuredResearch.title}
          </h3>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            {featuredResearch.summary}
          </p>
        </article>
      </div>
    </section>
  );
}
