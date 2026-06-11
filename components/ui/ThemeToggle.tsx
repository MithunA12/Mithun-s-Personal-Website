"use client";

type Theme = "light" | "dark";

const themeStorageKey = "portfolio-theme";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
  }

  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle inline-flex min-h-11 shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface-translucent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] shadow-[0_10px_30px_-18px_var(--shadow-color)] backdrop-blur-md transition-[background-color,border-color,color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-[var(--hover-border)] hover:bg-[var(--surface-subtle)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]"
      onClick={toggleTheme}
      type="button"
    />
  );
}
