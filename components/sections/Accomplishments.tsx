import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { accomplishments } from "@/src/data/profile";

export function Accomplishments() {
  return (
    <Section id="accomplishments" tone="dark">
      <SectionHeader
        description="Selected awards, research milestones, and leadership distinctions."
        eyebrow="Accomplishments"
        inverse
        title="Recognition across research, technology, and leadership."
      />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {accomplishments.map((accomplishment) => (
          <li
            className="rounded-xl border border-white/15 bg-white/[0.06] p-5 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.09]"
            key={accomplishment.title}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
              {accomplishment.category}
            </p>
            <p className="mt-3 font-medium leading-6">
              {accomplishment.title}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
