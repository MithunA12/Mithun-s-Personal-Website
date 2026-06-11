import { contactLinks } from "@/src/data/profile";

export function Contact() {
  const verifiedContactLinks = contactLinks.filter(
    (link) => link.verificationStatus === "verified" && link.href,
  );

  return (
    <section
      id="contact"
      className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Contact
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Interested in research, engineering, or product collaboration?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            {verifiedContactLinks.length > 0
              ? "Connect through the verified links below."
              : "Verified contact and professional profile links will be added in a future content task."}
          </p>
        </div>
        <a
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md border border-[var(--border)] px-6 py-3 font-semibold transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          href="#about"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}
