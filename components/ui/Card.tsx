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
      className={`glass-card overflow-hidden rounded-[1.6rem] p-6 sm:p-7 ${
        polished
          ? "transition-[border-color,box-shadow,transform] duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.01] hover:border-[var(--hover-border)] hover:shadow-[0_28px_70px_-38px_var(--shadow-color)] focus-within:border-[var(--accent)]"
          : ""
      } ${className}`}
    >
      {children}
    </article>
  );
}
