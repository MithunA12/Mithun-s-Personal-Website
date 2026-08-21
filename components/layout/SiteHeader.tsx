"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, profile } from "@/src/data/profile";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4 sm:px-6">
      <div className="glass-nav mx-auto grid min-h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-[1.4rem] px-4 sm:px-6">
        <Link
          className="font-mono text-sm font-bold tracking-[-0.02em] text-[var(--foreground)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const className = `rounded-full px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
              isActive
                ? "bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-[inset_0_1px_0_var(--glass-highlight)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]"
            }`;
            if (item.external) {
              return (
                <a
                  className={className}
                  href={item.href}
                  key={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={className}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="justify-self-end">
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="glass-button inline-flex min-h-10 items-center rounded-full px-4 text-xs font-bold uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="glass-nav mx-auto mt-2 max-w-6xl rounded-[1.4rem] px-4 py-4 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const className = `rounded-xl px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                isActive
                  ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]"
              }`;
              if (item.external) {
                return (
                  <a
                    className={className}
                    href={item.href}
                    key={item.href}
                    onClick={() => setMenuOpen(false)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={className}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
