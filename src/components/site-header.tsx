import Link from "next/link";

import { primaryNavigation, routes } from "@/content/portfolio";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--background)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:px-10 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link
            href={routes.home}
            className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <span className="block text-sm font-semibold tracking-[-0.02em]">
              {site.name}
            </span>
            <span className="mt-0.5 block text-xs text-[var(--muted)]">
              {site.role}
            </span>
          </Link>

          <div className="flex gap-4 text-xs font-medium xl:hidden">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-[var(--muted)] transition hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden gap-4 text-xs font-medium xl:flex">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
