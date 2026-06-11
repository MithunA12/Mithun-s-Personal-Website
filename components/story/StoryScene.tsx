"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface StorySceneProps {
  children: ReactNode;
  description: string;
  eyebrow: string;
  headline: string;
  id: string;
  index: number;
  supportingContent?: ReactNode;
}

export function StoryScene({
  children,
  description,
  eyebrow,
  headline,
  id,
  index,
  supportingContent,
}: StorySceneProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.16, 1], [36, 0, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const visualScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.98, 1, 1]);

  return (
    <section
      className="relative min-h-[100svh] scroll-mt-20 lg:min-h-screen"
      id={id}
      ref={ref}
    >
      <motion.div
        className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-6 py-12 sm:px-8 sm:py-14 lg:sticky lg:top-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-12 lg:py-10"
        style={reduceMotion ? undefined : { opacity }}
      >
        <motion.div style={reduceMotion ? undefined : { y: textY }}>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            0{index + 1} / {eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-balance text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {description}
          </p>
          {supportingContent ? <div className="mt-7">{supportingContent}</div> : null}
        </motion.div>

        <motion.div
          className="relative"
          style={reduceMotion ? undefined : { scale: visualScale, y: visualY }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[2rem] bg-blue-500/10 blur-3xl"
          />
          <div className="relative">{children}</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
