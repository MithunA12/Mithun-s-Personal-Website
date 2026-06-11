"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StaggeredRevealProps {
  as?: "div" | "dl" | "ol" | "ul";
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

export function StaggeredReveal({
  as = "div",
  children,
  className = "",
  itemClassName = "",
}: StaggeredRevealProps) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);
  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.06,
        staggerChildren: reduceMotion ? 0 : 0.09,
      },
    },
  };
  const item = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, scale: 0.98, y: 28 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
          y: 0,
        },
      };

  const sharedProps = {
    className,
    initial: reduceMotion ? false : "hidden",
    variants: container,
    viewport: { amount: 0.12, once: true },
    whileInView: "visible",
  };

  if (as === "ol") {
    return (
      <motion.ol {...sharedProps}>
        {items.map((child, index) => (
          <motion.li className={itemClassName} key={index} variants={item}>
            {child}
          </motion.li>
        ))}
      </motion.ol>
    );
  }

  if (as === "dl") {
    return (
      <motion.dl {...sharedProps}>
        {items.map((child, index) => (
          <motion.div className={itemClassName} key={index} variants={item}>
            {child}
          </motion.div>
        ))}
      </motion.dl>
    );
  }

  if (as === "ul") {
    return (
      <motion.ul {...sharedProps}>
        {items.map((child, index) => (
          <motion.li className={itemClassName} key={index} variants={item}>
            {child}
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <motion.div {...sharedProps}>
      {items.map((child, index) => (
        <motion.div className={itemClassName} key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
