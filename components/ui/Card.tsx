import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  polished?: boolean;
}

export function Card({
  children,
  className = "",
  polished = false,
}: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_10px_35px_-28px_var(--shadow-color)] sm:p-7 ${
        polished
          ? "transition-[border-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-1 hover:border-[var(--hover-border)] hover:shadow-[0_22px_55px_-32px_var(--shadow-color)] focus-within:border-[var(--accent)] focus-within:shadow-[0_22px_55px_-32px_var(--shadow-color)]"
          : ""
      } ${className}`}
    >
      {children}
    </article>
  );
}
