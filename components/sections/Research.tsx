import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { research } from "@/src/data/profile";

export function Research() {
  return (
    <Section id="research">
      <SectionHeader
        description="Work across signal processing, clinical data analysis, model evaluation, and scientific communication."
        eyebrow="Research"
        title="Applying machine learning to complex healthcare data."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {research.map((item) => (
          <Card className="flex h-full flex-col" key={item.slug}>
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
                  <Tag as="li" key={method}>
                    {method}
                  </Tag>
                ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Why it matters
                </p>
                <p className="mt-2 leading-6">{item.significance}</p>
              </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
