import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggeredReveal } from "@/components/ui/StaggeredReveal";
import { accomplishments, coreValues, projects, research } from "@/src/data/profile";

const highlights = [
  {
    eyebrow: "Featured project",
    title: projects[0]?.title,
    description: projects[0]?.impact ?? projects[0]?.description,
    href: "/portfolio",
    cta: "Explore the portfolio",
  },
  {
    eyebrow: "Featured project",
    title: projects[1]?.title,
    description: projects[1]?.impact ?? projects[1]?.description,
    href: "/portfolio",
    cta: "View the project",
  },
  {
    eyebrow: "Research",
    title: research[0]?.title,
    description: research[0]?.significance,
    href: "/portfolio#research",
    cta: "View research",
  },
  {
    eyebrow: "Recognition",
    title: accomplishments[1]?.title,
    description: "Selected recognition across research and technology",
    href: "/accomplishments",
    cta: "See accomplishments",
  },
  {
    eyebrow: "Operating principle",
    title: coreValues[0]?.title,
    description: coreValues[0]?.description,
    href: "/values",
    cta: "Read the values",
  },
].filter((item): item is { eyebrow: string; title: string; description: string; href: string; cta: string } =>
  Boolean(item.title && item.description),
);

export function HomeHighlights() {
  return (
    <Section tone="surface">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          description=""
          eyebrow=""
          title="Some interesting things about me."
        />
        <ButtonLink className="shrink-0" href="/portfolio" variant="secondary">
          View portfolio
        </ButtonLink>
      </div>

      <StaggeredReveal className="mt-10 grid gap-5 md:grid-cols-2">
        {highlights.map((item) => (
          <div className="h-full" key={item.title}>
            <Card className="flex h-full flex-col" polished>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {item.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{item.description}</p>
              <a
                className="mt-6 inline-flex w-fit font-semibold text-[var(--accent)] underline decoration-blue-200 underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                href={item.href}
              >
                {item.cta}
              </a>
            </Card>
          </div>
        ))}
      </StaggeredReveal>
    </Section>
  );
}
