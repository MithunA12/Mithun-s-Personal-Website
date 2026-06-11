"use client";

import { motion, type MotionValue } from "framer-motion";

interface StoryProgressProps {
  progress: MotionValue<number>;
  sceneCount: number;
}

export function StoryProgress({ progress, sceneCount }: StoryProgressProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-5 z-20 hidden lg:block xl:right-8"
    >
      <div className="sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-slate-500">
          STORY
        </span>
        <div className="relative h-28 w-px overflow-hidden bg-white/15">
          <motion.div
            className="absolute inset-0 origin-top bg-blue-300"
            style={{ scaleY: progress }}
          />
        </div>
        <span className="font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-slate-500">
          0{sceneCount}
        </span>
      </div>
    </div>
  );
}
