import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experiences } from "@/src/data/profile";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        description="Roles that show technical execution, founder initiative, and clear communication across different settings."
        eyebrow="Experience"
        title="Research, building, and leadership in practice."
      />

      <ol className="mt-10 border-t border-[var(--border)]">
        {experiences.map((experience) => (
          <li
            className="grid gap-3 border-b border-[var(--border)] py-6 transition-colors duration-200 hover:bg-white/60 sm:grid-cols-[0.8fr_1fr_1.6fr] sm:gap-6 sm:px-4"
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
    </Section>
  );
}
