import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Experience } from "@/components/sections/Experience";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Experience | Mithun Arun",
  description: "Research, product building, hackathon leadership, debate, and Model UN experience from Mithun Arun.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Experience"
        title="Building, researching, and leading across technical communities."
        description="A focused view of roles that demonstrate engineering execution, founder initiative, research communication, and student leadership."
      />
      <Experience />
    </PageShell>
  );
}
