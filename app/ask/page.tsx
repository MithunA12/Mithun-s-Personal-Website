import type { Metadata } from "next";

import { AskMithunChat } from "@/components/chat/AskMithunChat";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Ask Mithun",
  description:
    "Ask a portfolio-grounded AI assistant about Mithun Arun's research, projects, experience, and leadership.",
};

export default function AskPage() {
  return (
    <PageShell>
      <PageHero
        description="A portfolio-grounded guide to Mithun's AI research, software projects, product work, and leadership experience."
        eyebrow="Portfolio assistant"
        title="Ask Mithun"
      />
      <AskMithunChat />
    </PageShell>
  );
}
