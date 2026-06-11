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
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [48, 0, 0, -40]);
  const visualY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.97]);

  return (
    <section
      className="relative min-h-[90vh] scroll-mt-20 border-b border-white/10 lg:min-h-[120vh]"
      id={id}
      ref={ref}
    >
      <motion.div
        className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 lg:sticky lg:top-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:py-12"
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
