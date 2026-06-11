import { research } from "@/src/data/profile";

export function Research() {
  return (
    <section id="research" className="scroll-mt-8 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Research
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Applying machine learning to complex healthcare data.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Work across signal processing, clinical data analysis, model
            evaluation, and scientific communication.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {research.map((item) => (
            <article
              className="flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
              key={item.slug}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {item.field}
                </p>
                <p className="text-sm font-medium text-[var(--muted)]">
                  {item.publicationStatus}
                </p>
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                {item.summary}
              </p>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Technical focus
                </p>
                <ul
                  className="mt-3 flex flex-wrap gap-2"
                  aria-label={`${item.title} methods`}
                >
                  {item.methods.map((method) => (
                    <li
                      className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium"
                      key={method}
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Why it matters
                </p>
                <p className="mt-2 leading-6">{item.significance}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
