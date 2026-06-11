import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { HomeHighlights } from "@/components/sections/HomeHighlights";
import { LandingContact } from "@/components/sections/LandingContact";
import { PageShell } from "@/components/layout/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <About />
      <HomeHighlights />
      <LandingContact />
    </PageShell>
  );
}
