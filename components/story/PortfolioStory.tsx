"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NeuralSignalVisual } from "@/components/visuals/NeuralSignalVisual";
import { StoryProgress } from "@/components/story/StoryProgress";
import { StorySceneLayer } from "@/components/story/StorySceneLayer";
import { coverageIndex } from "@/components/story/sceneTransforms";
import {
  coreValues,
  experiences,
  profile,
  projects,
  research,
} from "@/src/data/profile";

const featuredResearch = research.find((item) => item.featured) ?? research[0];
const leadership = experiences.filter(
  (item) => item.category === "Leadership" || item.category === "Communication",
);

const sceneNames = ["Research", "Projects", "Leadership", "Values"];
const total = sceneNames.length;

const storyTagClasses =
  "rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur";

export function PortfolioStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [wideEnough, setWideEnough] = useState(false);
  const [active, setActive] = useState(0);

  // The pinned cross-fade canvas only runs on wide screens where a scene fits a
  // viewport. Everything else gets a clean stacked layout. Start static so SSR
  // and first paint match, then upgrade after measuring the viewport.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () => setWideEnough(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const animated = wideEnough && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(coverageIndex(value, total));
  });

  // The research scene's signal pipeline draws itself as it comes into focus.
  const eegDraw = useTransform(scrollYProgress, [0, 0.16], [0.06, 1]);

  const layers = (
    <>
      <StorySceneLayer
        active={active}
        animated={animated}
        description={featuredResearch?.summary ?? profile.bio[1]}
        eyebrow={sceneNames[0]}
        headline={
          featuredResearch?.title ??
          "AI healthcare research grounded in complex signals."
        }
        index={0}
        progress={scrollYProgress}
        supporting={
          featuredResearch ? (
            <div className="flex flex-wrap gap-2">
              {featuredResearch.methods.map((method) => (
                <span className={storyTagClasses} key={method}>
                  {method}
                </span>
              ))}
            </div>
          ) : null
        }
        total={total}
      >
        <NeuralSignalVisual drawProgress={animated ? eegDraw : undefined} />
        {featuredResearch ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
              Why it matters
            </p>
            <p className="mt-2 leading-7 text-slate-300">
              {featuredResearch.significance}
            </p>
          </div>
        ) : null}
      </StorySceneLayer>

      <StorySceneLayer
        active={active}
        animated={animated}
        description="Products and technical systems that translate ideas and research workflows into usable software."
        eyebrow={sceneNames[1]}
        headline="Research thinking meets product execution."
        index={1}
        progress={scrollYProgress}
        supporting={<ButtonLink href="/projects">Explore all projects</ButtonLink>}
        total={total}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-xl shadow-black/15 backdrop-blur transition-transform duration-300 motion-safe:hover:-translate-y-1"
              key={project.slug}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue-300">
                {project.category}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
              <ul
                aria-label={`${project.title} technologies`}
                className="mt-5 flex flex-wrap gap-2"
              >
                {project.stack.map((technology) => (
                  <li className={storyTagClasses} key={technology}>
                    {technology}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </StorySceneLayer>

      <StorySceneLayer
        active={active}
        animated={animated}
        description="Technical work is paired with community building, structured communication, and student-led initiatives."
        eyebrow={sceneNames[2]}
        headline="Leadership that turns individual work into shared momentum."
        index={2}
        progress={scrollYProgress}
        supporting={
          <ButtonLink href="/experience" variant="secondary">
            View experience
          </ButtonLink>
        }
        total={total}
      >
        <div className="space-y-4">
          {leadership.map((item, index) => (
            <article
              className="grid gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:grid-cols-[auto_1fr] sm:items-start"
              key={`${item.organization}-${item.title}`}
            >
              <span className="font-mono text-sm font-semibold text-blue-300">
                0{index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {item.organization}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </StorySceneLayer>

      <StorySceneLayer
        active={active}
        animated={animated}
        description="Purpose, rigor, and clear communication connect the research, products, and leadership throughout the portfolio."
        eyebrow={sceneNames[3]}
        headline="Build useful systems. Evaluate them carefully. Explain them clearly."
        index={3}
        progress={scrollYProgress}
        supporting={
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/values">Explore values</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        }
        total={total}
      >
        <div className="space-y-3">
          {coreValues.map((value, index) => (
            <article
              className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur"
              key={value.title}
            >
              <p className="font-mono text-xs font-semibold text-blue-300">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 leading-7 text-slate-300">{value.description}</p>
            </article>
          ))}
        </div>
      </StorySceneLayer>
    </>
  );

  return (
    <section
      aria-label="Portfolio story"
      className="relative overflow-clip bg-[#070c16] text-white"
    >
      {animated ? (
        <div
          className="relative"
          ref={trackRef}
          style={{ height: `${total * 100}vh` }}
        >
          <div className="sticky top-0 h-screen overflow-hidden bg-[#070c16]">
            <div
              aria-hidden="true"
              className="story-grid pointer-events-none absolute inset-0"
            />
            {layers}
            <StoryProgress progress={scrollYProgress} sceneCount={total} />
          </div>
        </div>
      ) : (
        <div className="relative" ref={trackRef}>
          <div
            aria-hidden="true"
            className="story-grid pointer-events-none absolute inset-0"
          />
          {layers}
        </div>
      )}
    </section>
  );
}
