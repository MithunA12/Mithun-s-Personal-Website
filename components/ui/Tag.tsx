import type { ReactNode } from "react";

interface TagProps {
  as?: "li" | "span";
  children: ReactNode;
}

const classes =
  "glass-badge rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]";

export function Tag({ as = "span", children }: TagProps) {
  if (as === "li") {
    return <li className={classes}>{children}</li>;
  }

  return <span className={classes}>{children}</span>;
}
