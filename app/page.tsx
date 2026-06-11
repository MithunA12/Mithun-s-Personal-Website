import { About } from "@/components/sections/About";
import { Accomplishments } from "@/components/sections/Accomplishments";
import { Contact } from "@/components/sections/Contact";
import { CoreValues } from "@/components/sections/CoreValues";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Research } from "@/components/sections/Research";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProjects />
      <Research />
      <Accomplishments />
      <CoreValues />
      <Contact />
    </main>
  );
}
