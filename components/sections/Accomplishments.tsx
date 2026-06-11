import { StaggeredReveal } from "@/components/ui/StaggeredReveal";
import { StickyStorySection } from "@/components/ui/StickyStorySection";
import { accomplishments } from "@/src/data/profile";

export function Accomplishments() {
  return (
    <StickyStorySection
      id="accomplishments"
      description="Selected awards, research milestones, and leadership distinctions."
      eyebrow="Accomplishments"
      title="Recognition across research, technology, and leadership."
      tone="dark"
    >
      <StaggeredReveal as="ul" className="grid gap-3 sm:grid-cols-2">
        {accomplishments.map((accomplishment) => (
          <div className="h-full rounded-xl border border-white/15 bg-white/[0.06] p-5 transition-[background-color,border-color,transform] duration-200 motion-safe:hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]" key={accomplishment.title}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
              {accomplishment.category}
            </p>
            <p className="mt-3 font-medium leading-6">
              {accomplishment.title}
            </p>
          </div>
        ))}
      </StaggeredReveal>
    </StickyStorySection>
  );
}
