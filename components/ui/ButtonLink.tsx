import type { ReactNode } from "react";

interface ButtonLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary";
}

const variantClasses = {
  primary:
    "border-transparent bg-[var(--accent-fill)] text-white shadow-[0_8px_24px_-12px_var(--shadow-color)] hover:bg-[var(--accent-fill-hover)]",
  secondary:
    "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_1px_2px_var(--shadow-color)] hover:border-[var(--hover-border)] hover:bg-[var(--surface-subtle)]",
};

export function ButtonLink({
  children,
  className = "",
  href,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold transition-[background-color,border-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] ${variantClasses[variant]} ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
