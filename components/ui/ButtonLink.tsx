import type { ReactNode } from "react";

interface ButtonLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary";
}

const variantClasses = {
  primary:
    "glass-button glass-button-primary hover:saturate-125",
  secondary:
    "glass-button text-[var(--foreground)]",
};

export function ButtonLink({
  children,
  className = "",
  href,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border px-6 py-3 text-sm font-semibold transition-[background-color,border-color,box-shadow,filter,transform] duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] ${variantClasses[variant]} ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
