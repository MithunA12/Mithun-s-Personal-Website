import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { HomeHighlights } from "@/components/sections/HomeHighlights";
import { LandingContact } from "@/components/sections/LandingContact";
import { PageShell } from "@/components/layout/PageShell";
import { PortfolioStory } from "@/components/story/PortfolioStory";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <PortfolioStory />
      <About />
      <HomeHighlights />
      <LandingContact />
    </PageShell>
  );
}
