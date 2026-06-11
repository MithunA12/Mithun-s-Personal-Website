"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NeuralSignalVisual } from "@/components/visuals/NeuralSignalVisual";
import { StoryProgress } from "@/components/story/StoryProgress";
import { StoryScene } from "@/components/story/StoryScene";
import {
  accomplishments,
  coreValues,
  experiences,
  hero,
  profile,
  projects,
  research,
} from "@/src/data/profile";

const featuredResearch = research.find((item) => item.featured) ?? research[0];
const leadership = experiences.filter(
  (item) => item.category === "Leadership" || item.category === "Communication",
);

const storyScenes = ["Identity", "Research", "Projects", "Leadership", "Values"];

const storyTagClasses =
  "rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur";

export function PortfolioStory() {
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      aria-label="Portfolio story"
      className="relative overflow-clip bg-[#070c16] text-white"
      ref={storyRef}
    >
      <div aria-hidden="true" className="story-grid pointer-events-none absolute inset-0" />
      <StoryProgress progress={scrollYProgress} sceneCount={storyScenes.length} />

      <StoryScene
        description={hero.description}
        eyebrow={storyScenes[0]}
        headline={hero.headline}
        id="story-identity"
        index={0}
        supportingContent={
          <div className="flex flex-wrap gap-2">
            {hero.focusAreas.map((area) => <span className={storyTagClasses} key={area}>{area}</span>)}
          </div>
        }
      >
        <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-6 shadow-2xl shadow-black/25 backdrop-blur sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-300">Profile signal</p>
          <p className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">{profile.name}</p>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">{profile.role}</p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["Research", featuredResearch?.publicationStatus],
              ["Product", projects[0]?.role],
              ["Leadership", leadership[0]?.organization],
              ["Recognition", accomplishments[1]?.title],
            ].map(([label, value]) => value ? (
              <div className="rounded-xl border border-white/10 bg-black/15 p-4" key={label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-200">{value}</dd>
              </div>
            ) : null)}
          </dl>
        </div>
      </StoryScene>

      <StoryScene
        description={featuredResearch?.summary ?? profile.bio[1]}
        eyebrow={storyScenes[1]}
        headline={featuredResearch?.title ?? "AI healthcare research grounded in complex signals."}
        id="story-research"
        index={1}
        supportingContent={featuredResearch ? (
          <div className="flex flex-wrap gap-2">
            {featuredResearch.methods.map((method) => <span className={storyTagClasses} key={method}>{method}</span>)}
          </div>
        ) : null}
      >
        <NeuralSignalVisual />
        {featuredResearch ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">Why it matters</p>
            <p className="mt-2 leading-7 text-slate-300">{featuredResearch.significance}</p>
          </div>
        ) : null}
      </StoryScene>

      <StoryScene
        description="Products and technical systems that translate ideas and research workflows into usable software."
        eyebrow={storyScenes[2]}
        headline="Research thinking meets product execution."
        id="story-projects"
        index={2}
        supportingContent={<ButtonLink href="/projects">Explore all projects</ButtonLink>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {projects.map((project, index) => (
            <article
              className={`rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-xl shadow-black/15 backdrop-blur transition-transform duration-300 motion-safe:hover:-translate-y-1 ${index % 2 ? "lg:translate-x-6" : ""}`}
              key={project.slug}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue-300">{project.category}</p>
              <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                {project.stack.map((technology) => <li className={storyTagClasses} key={technology}>{technology}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </StoryScene>

      <StoryScene
        description="Technical work is paired with community building, structured communication, and student-led initiatives."
        eyebrow={storyScenes[3]}
        headline="Leadership that turns individual work into shared momentum."
        id="story-leadership"
        index={3}
        supportingContent={<ButtonLink href="/experience" variant="secondary">View experience</ButtonLink>}
      >
        <div className="space-y-4">
          {leadership.map((item, index) => (
            <article
              className="grid gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:grid-cols-[auto_1fr] sm:items-start"
              key={`${item.organization}-${item.title}`}
            >
              <span className="font-mono text-sm font-semibold text-blue-300">0{index + 1}</span>
              <div>
                <p className="text-sm font-medium text-slate-400">{item.organization}</p>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </StoryScene>

      <StoryScene
        description="Purpose, rigor, and clear communication connect the research, products, and leadership throughout the portfolio."
        eyebrow={storyScenes[4]}
        headline="Build useful systems. Evaluate them carefully. Explain them clearly."
        id="story-values"
        index={4}
        supportingContent={
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/values">Explore values</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
          </div>
        }
      >
        <div className="space-y-3">
          {coreValues.map((value, index) => (
            <article className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur" key={value.title}>
              <p className="font-mono text-xs font-semibold text-blue-300">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 leading-7 text-slate-300">{value.description}</p>
            </article>
          ))}
        </div>
      </StoryScene>
    </section>
  );
}
