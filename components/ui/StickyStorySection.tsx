import type { ReactNode } from "react";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type StoryTone = "default" | "surface" | "dark" | "accent";

interface StickyStorySectionProps {
  children: ReactNode;
  description?: string;
  eyebrow: string;
  id?: string;
  title: string;
  tone?: StoryTone;
}

const toneClasses: Record<StoryTone, string> = {
  default: "bg-[var(--background)] text-[var(--foreground)]",
  surface: "bg-[var(--surface)] text-[var(--foreground)]",
  dark: "border-slate-800 bg-[var(--dark)] text-white",
  accent: "bg-[var(--accent-soft)] text-[var(--foreground)]",
};

export function StickyStorySection({
  children,
  description,
  eyebrow,
  id,
  title,
  tone = "default",
}: StickyStorySectionProps) {
  const inverse = tone === "dark";

  return (
    <section
      className={`scroll-mt-20 border-b border-[var(--border)] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28 ${toneClasses[tone]}`}
      id={id}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <MotionReveal className="self-start lg:sticky lg:top-28">
          <SectionHeader
            description={description}
            eyebrow={eyebrow}
            inverse={inverse}
            title={title}
          />
          <div
            aria-hidden="true"
            className={`mt-8 hidden h-px w-24 lg:block ${inverse ? "bg-blue-300/70" : "bg-[var(--accent)]"}`}
          />
        </MotionReveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
