import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggeredReveal } from "@/components/ui/StaggeredReveal";
import { coreValues } from "@/src/data/profile";

export function CoreValues() {
  return (
    <Section tone="surface">
      <SectionHeader eyebrow="Core values" title="Principles behind the work." />
      <StaggeredReveal className="mt-10 grid gap-4 md:grid-cols-3">
        {coreValues.map((value, index) => (
          <article
            className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
            key={value.title}
          >
            <p className="font-mono text-xs font-semibold text-[var(--accent)]">
              0{index + 1}
            </p>
            <h3 className="mt-3 text-xl font-semibold">{value.title}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              {value.description}
            </p>
          </article>
        ))}
      </StaggeredReveal>
    </Section>
  );
}
