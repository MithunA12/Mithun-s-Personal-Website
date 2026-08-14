import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { StaggeredReveal } from "@/components/ui/StaggeredReveal";
import { coreValues } from "@/src/data/profile";

export const metadata: Metadata = {
  title: "Values | Mithun Arun",
  description: "The principles that guide Mithun Arun's research and product building.",
};

export default function ValuesPage() {
  return (
    <PageShell>
      <section className="liquid-backdrop relative overflow-hidden border-b border-[var(--border)] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <ParallaxLayer
          className="pointer-events-none absolute inset-x-0 -top-12 h-[120%]"
          distance={24}
        >
          <div aria-hidden="true" className="page-grid h-full opacity-50" />
        </ParallaxLayer>
        <MotionReveal className="glass-panel relative mx-auto max-w-6xl rounded-[2rem] p-7 sm:p-10 lg:p-12">
          <h1 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Values
          </h1>
          <StaggeredReveal className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <div key={value.title}>
                <p className="font-mono text-xs font-semibold text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {value.title}
                </h2>
                <p className="mt-3 leading-8 text-[var(--muted)]">
                  {value.description}
                </p>
              </div>
            ))}
          </StaggeredReveal>
        </MotionReveal>
      </section>
    </PageShell>
  );
}
