import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Accomplishments } from "@/components/sections/Accomplishments";
import { PageHero } from "@/components/ui/PageHero";
import { accomplishments } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Accomplishments | Mithun Arun",
  description: "Selected research, technology, award, and leadership recognition earned by Mithun Arun.",
};

export default function AccomplishmentsPage() {
  const categories = new Set(accomplishments.map((item) => item.category)).size;

  return (
    <PageShell>
      <PageHero
        eyebrow="Accomplishments"
        title="Credible recognition across research, technology, and leadership."
        description="A concise record of publications, honors, project recognition, and community leadership."
        aside={<p className="font-mono text-sm leading-7 text-[var(--muted)]">{accomplishments.length} selected milestones<br />{categories} areas of recognition</p>}
      />
      <Accomplishments />
    </PageShell>
  );
}
