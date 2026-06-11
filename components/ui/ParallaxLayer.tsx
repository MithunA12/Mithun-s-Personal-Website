"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

export function ParallaxLayer({
  children,
  className = "",
  distance = 32,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);

  return (
    <motion.div
      className={className}
      ref={ref}
      style={reduceMotion ? undefined : { scale, y }}
    >
      {children}
    </motion.div>
  );
}
