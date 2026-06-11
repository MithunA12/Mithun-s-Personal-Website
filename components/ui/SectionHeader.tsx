interface SectionHeaderProps {
  description?: string;
  eyebrow: string;
  inverse?: boolean;
  title: string;
}

export function SectionHeader({
  description,
  eyebrow,
  inverse = false,
  title,
}: SectionHeaderProps) {
  return (
    <header className="max-w-3xl">
      <p
        className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] ${inverse ? "text-blue-300" : "text-[var(--accent)]"}`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 sm:text-lg ${inverse ? "text-slate-300" : "text-[var(--muted)]"}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
