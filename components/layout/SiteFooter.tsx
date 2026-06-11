import Link from "next/link";
import { navigation, profile } from "@/src/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--dark)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{profile.shortBio}</p>
        </div>
        <nav aria-label="Footer navigation" className="flex max-w-2xl flex-wrap gap-x-5 gap-y-3">
          {navigation.map((item) => (
            <Link
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
