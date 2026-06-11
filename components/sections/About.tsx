import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/src/data/profile";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12">
        <SectionHeader
          eyebrow="About"
          title="Research depth, product execution, and clear communication."
        />
        <div className="space-y-5 text-lg leading-8 text-[var(--muted)]">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
