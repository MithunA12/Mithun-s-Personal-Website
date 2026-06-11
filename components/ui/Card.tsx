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
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_10px_35px_-28px_rgba(15,23,42,0.35)] sm:p-7 ${
        polished
          ? "transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_55px_-32px_rgba(15,23,42,0.5)] focus-within:border-[var(--accent)] focus-within:shadow-[0_22px_55px_-32px_rgba(15,23,42,0.5)]"
          : ""
      } ${className}`}
    >
      {children}
    </article>
  );
}
