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
  profile,
  projects,
  research,
} from "@/src/data/profile";

const featuredResearch = research.find((item) => item.featured) ?? research[0];

const sceneNames = ["Research", "Projects", "Values"];
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
          "AI healthcare research to improve healthcare equity."
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
        description="Products and technical systems that translate novel ideas and research workflows into usable software."
        eyebrow={sceneNames[1]}
        headline="Research thinking meets accessible healthcare."
        index={1}
        progress={scrollYProgress}
        supporting={<ButtonLink href="/portfolio">Explore the portfolio</ButtonLink>}
        total={total}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-xl shadow-black/15 backdrop-blur transition-transform duration-300 motion-safe:hover:-translate-y-1 sm:odd:last:col-span-2 sm:odd:last:mx-auto sm:odd:last:w-full sm:odd:last:max-w-[calc(50%-0.375rem)]"
              key={project.slug}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue-300">
                {project.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {project.description}
              </p>
              <ul
                aria-label={`${project.title} technologies`}
                className="mt-4 flex flex-wrap gap-1.5"
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
        description="Purpose, technical rigor, and innovation connect the research and products throughout the portfolio."
        eyebrow={sceneNames[2]}
        headline="Build useful systems. Evaluate them carefully. Explain them clearly."
        index={2}
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
