import Link from "next/link";

import { primaryNavigation, routes } from "@/content/portfolio";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--background)]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-5">
          <Link
            href={routes.home}
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <span className="block text-sm font-semibold tracking-[-0.02em]">
              {site.name}
            </span>
            <span className="mt-0.5 block text-xs text-[var(--muted)]">
              {site.role}
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-medium xl:hidden">
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

          <div className="hidden items-center gap-8 xl:flex">
            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-6 text-sm">
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

            <div className="flex gap-4 text-xs font-medium">
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

        <nav
          aria-label="Primary navigation"
          className="mt-4 overflow-x-auto border-t border-[var(--border)] pt-3 xl:hidden"
        >
          <ul className="flex min-w-max flex-nowrap items-center gap-4 pr-2 text-[13px]">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap font-medium text-[var(--muted)] transition hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
