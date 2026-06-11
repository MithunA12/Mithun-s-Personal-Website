import { coreValues } from "@/src/data/profile";

export function CoreValues() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          Core values
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Principles behind the work.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {coreValues.map((value, index) => (
            <article key={value.title}>
              <p className="font-mono text-sm text-[var(--accent)]">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{value.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
