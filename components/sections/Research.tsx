import { Card } from "@/components/ui/Card";
import { StaggeredReveal } from "@/components/ui/StaggeredReveal";
import { StickyStorySection } from "@/components/ui/StickyStorySection";
import { Tag } from "@/components/ui/Tag";
import { research } from "@/src/data/profile";

export function Research() {
  return (
    <StickyStorySection
      id="research"
      description="Work across signal processing, clinical data analysis, model evaluation, and scientific communication."
      eyebrow="Research"
      title="Applying machine learning to complex healthcare data."
    >
      <StaggeredReveal className="grid gap-5">
        {research.map((item) => (
          <Card className="flex h-full flex-col" key={item.slug} polished>
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
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${item.title} methods`}>
                {item.methods.map((method) => (
                  <Tag as="li" key={method}>{method}</Tag>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Why it matters</p>
              <p className="mt-2 leading-6">{item.significance}</p>
            </div>
          </Card>
        ))}
      </StaggeredReveal>
    </StickyStorySection>
  );
}
