import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { contactLinks } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Contact | Mithun Arun",
  description: "Send Mithun Arun a message, or connect on GitHub and LinkedIn.",
};

export default function ContactPage() {
  const profileLinks = contactLinks.filter(
    (link) => link.href && link.verificationStatus === "verified",
  );

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation about research, engineering, or product work."
        description="Send a message below — it goes straight to my inbox, and my email address is never published on this site. You can also find me on the profiles listed."
      />
      <Section tone="accent">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <ContactForm />
          {profileLinks.length ? (
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Elsewhere
              </p>
              <ul className="mt-4 grid gap-3">
                {profileLinks.map((link) => (
                  <li key={link.label}>
                    <ButtonLink className="w-full" href={link.href!} variant="secondary">
                      {link.label}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>
    </PageShell>
  );
}
