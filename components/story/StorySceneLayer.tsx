"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { sceneReveal } from "@/components/story/sceneTransforms";

interface StorySceneLayerProps {
  active: number;
  animated: boolean;
  children: ReactNode;
  description: string;
  eyebrow: string;
  headline: string;
  index: number;
  progress: MotionValue<number>;
  supporting?: ReactNode;
  total: number;
}

/**
 * A single story scene. On desktop its content spins in (scale + rise + tilt +
 * fade), holds, then spins out as scroll progresses — sequenced so only one
 * scene is ever visible over the shared opaque stage, so nothing shows through
 * from behind. On smaller screens (or with reduced motion) it renders as a
 * normal stacked section with no transforms.
 */
export function StorySceneLayer({
  active,
  animated,
  children,
  description,
  eyebrow,
  headline,
  index,
  progress,
  supporting,
  total,
}: StorySceneLayerProps) {
  // Reveal keyframes (spin in / hold / spin out) from a pure, unit-tested
  // module. Memoised so the arrays stay stable across the re-renders that the
  // `active` prop triggers on scroll.
  const reveal = useMemo(() => sceneReveal(index, total), [index, total]);
  const opacity = useTransform(progress, reveal.input, reveal.opacity);
  const scale = useTransform(progress, reveal.input, reveal.scale);
  const y = useTransform(progress, reveal.input, reveal.y);
  const rotateX = useTransform(progress, reveal.input, reveal.rotateX);

  const inner = (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-12">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
          0{index + 1} / {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-balance text-white sm:text-5xl lg:text-6xl">
          {headline}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {description}
        </p>
        {supporting ? <div className="mt-7">{supporting}</div> : null}
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-8 rounded-[2rem] bg-blue-500/10 blur-3xl"
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );

  if (!animated) {
    return (
      <section className="relative flex min-h-[100svh] items-center py-20 sm:py-24">
        {inner}
      </section>
    );
  }

  // Only the active scene is ever rendered visible. This is a hard guarantee on
  // top of the animated opacity: a non-active scene cannot show through the
  // current one even for a frame, whatever its in-flight opacity happens to be.
  const hidden = index !== active;

  return (
    <motion.div
      aria-hidden={hidden || undefined}
      className="absolute inset-0 flex items-center"
      inert={hidden}
      initial={false}
      style={{
        opacity,
        scale,
        y,
        rotateX,
        transformPerspective: 1200,
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      {inner}
    </motion.div>
  );
}
