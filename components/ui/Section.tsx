import type { ReactNode } from "react";
import { MotionReveal } from "@/components/ui/MotionReveal";

type SectionTone = "default" | "surface" | "dark" | "accent";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-[var(--background)] text-[var(--foreground)]",
  surface: "bg-[var(--surface)] text-[var(--foreground)]",
  dark: "border-slate-800 bg-[var(--dark)] text-white",
  accent: "bg-[var(--accent-soft)] text-[var(--foreground)]",
};

export function Section({
  children,
  className = "",
  id,
  tone = "default",
}: SectionProps) {
  return (
    <section
      className={`scroll-mt-8 border-b border-[var(--border)] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 ${toneClasses[tone]} ${className}`}
      id={id}
    >
      <MotionReveal className="mx-auto max-w-6xl">{children}</MotionReveal>
    </section>
  );
}
