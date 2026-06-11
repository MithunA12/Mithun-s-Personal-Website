import { profile } from "@/src/data/profile";

export function About() {
  return (
    <section id="about" className="scroll-mt-8 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Research depth, product execution, and clear communication.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-[var(--muted)]">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
