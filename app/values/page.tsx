import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CoreValues } from "@/components/sections/CoreValues";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experiences } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Values | Mithun Arun",
  description: "The principles that guide Mithun Arun's research, product building, and leadership.",
};

export default function ValuesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Values"
        title="Build with purpose. Work with rigor. Communicate clearly."
        description="Principles that connect technical decisions to useful outcomes, careful evidence, and understandable communication."
      />
      <CoreValues />
      <Section>
        <SectionHeader eyebrow="Values in practice" title="Principles reflected in the work." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {experiences.slice(0, 3).map((experience) => (
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6" key={experience.title}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{experience.category}</p>
              <h3 className="mt-3 text-xl font-semibold">{experience.organization}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{experience.summary}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
