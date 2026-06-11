export function About() {
  return (
    <section id="about" className="scroll-mt-8 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Research depth, product execution, and clear communication.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-[var(--muted)]">
          <p>
            I am an AI/CS researcher, software builder, and student leader
            focused on applying intelligent systems to healthcare, education,
            and decision-making.
          </p>
          <p>
            My work spans AI healthcare research using EEG and ECG data,
            mobile application development, hackathon leadership, and
            product-focused technical projects.
          </p>
        </div>
      </div>
    </section>
  );
}
