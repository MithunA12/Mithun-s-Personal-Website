import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactLinks } from "@/src/data/profile";

export function Contact() {
  const verifiedContactLinks = contactLinks.filter(
    (link) => link.verificationStatus === "verified" && link.href,
  );

  return (
    <Section id="contact" tone="accent">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          description={
            verifiedContactLinks.length > 0
              ? "Connect through the verified links below."
              : "Verified contact and professional profile links will be added in a future content task."
          }
          eyebrow="Contact"
          title="Interested in research, engineering, or product collaboration?"
        />
        <ButtonLink className="shrink-0" href="#about" variant="secondary">
          Learn more
        </ButtonLink>
      </div>
    </Section>
  );
}
