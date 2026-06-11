import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { contactLinks } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Contact | Mithun Arun",
  description: "Contact and professional profile links for Mithun Arun.",
};

export default function ContactPage() {
  const verifiedLinks = contactLinks.filter((link) => link.href && link.verificationStatus === "verified");

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation about research, engineering, or product work."
        description="Professional contact and profile links are shown only when they are verified in the portfolio data."
      />
      <Section tone="accent">
        {verifiedLinks.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {verifiedLinks.map((link) => (
              <li key={link.label}>
                <ButtonLink className="w-full" href={link.href!} variant="secondary">{link.label}</ButtonLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Contact details pending verification</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Explore the work while verified links are being added.</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">No email address, social profile, or resume URL is published until it has been confirmed.</p>
            </div>
            <div className="flex gap-3">
              <ButtonLink href="/projects">Projects</ButtonLink>
              <ButtonLink href="/research" variant="secondary">Research</ButtonLink>
            </div>
          </div>
        )}
      </Section>
    </PageShell>
  );
}
