import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function LandingContact() {
  return (
    <Section tone="accent">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          description="Explore the evidence behind the work or open the contact page for verified ways to connect."
          eyebrow="Next step"
          title="Looking for an AI researcher who also ships products?"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/projects">View projects</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
