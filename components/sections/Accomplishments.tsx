import { accomplishments } from "@/src/data/profile";

export function Accomplishments() {
  return (
    <section className="border-y border-[var(--border)] bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
          Accomplishments
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          A foundation across research, building, and leadership.
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accomplishments.map((accomplishment) => (
            <li
              className="rounded-lg border border-white/15 bg-white/5 p-5 leading-6"
              key={accomplishment.title}
            >
              {accomplishment.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
