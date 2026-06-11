import type { ReactNode } from "react";
import { MotionReveal } from "@/components/ui/MotionReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

export function PageHero({ aside, description, eyebrow, title }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div aria-hidden="true" className="page-grid absolute inset-0 opacity-50" />
      <MotionReveal className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.45fr] lg:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{description}</p>
        </div>
        {aside ? <div>{aside}</div> : null}
      </MotionReveal>
    </section>
  );
}
