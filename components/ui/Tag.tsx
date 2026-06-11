import type { ReactNode } from "react";

interface TagProps {
  as?: "li" | "span";
  children: ReactNode;
}

const classes =
  "rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] shadow-[0_1px_2px_var(--shadow-color)]";

export function Tag({ as = "span", children }: TagProps) {
  if (as === "li") {
    return <li className={classes}>{children}</li>;
  }

  return <span className={classes}>{children}</span>;
}
