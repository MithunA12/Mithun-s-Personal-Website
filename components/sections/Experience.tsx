import { StaggeredReveal } from "@/components/ui/StaggeredReveal";
import { StickyStorySection } from "@/components/ui/StickyStorySection";
import { experiences } from "@/src/data/profile";

export function Experience() {
  return (
    <StickyStorySection
      id="experience"
      description="Roles that show technical execution, founder initiative, and clear communication across different settings."
      eyebrow="Experience"
      title="Research, building, and leadership in practice."
    >
      <StaggeredReveal as="ol" className="border-t border-[var(--border)]">
        {experiences.map((experience) => (
          <div className="grid gap-3 border-b border-[var(--border)] py-7 transition-colors duration-200 hover:bg-[var(--row-hover)] sm:gap-5 sm:px-4" key={`${experience.organization}-${experience.title}`}>
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
          </div>
        ))}
      </StaggeredReveal>
    </StickyStorySection>
  );
}
