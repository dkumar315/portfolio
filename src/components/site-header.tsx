import Link from "next/link";

import { SiteNavigation } from "@/components/site-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { routes } from "@/content/portfolio";
import { site } from "@/lib/site";

const externalLink =
  "whitespace-nowrap py-1 font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--background)]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-5">
          <Link
            href={routes.home}
            aria-label={`${site.name} home`}
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <span className="block text-[15px] font-semibold tracking-[-0.02em] sm:text-base">
              {site.name}
            </span>
            <span className="mt-0.5 block text-[13px] text-[var(--muted)]">
              {site.role} · Sydney
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 text-sm xl:flex">
              <SiteNavigation listClassName="flex items-center gap-6" />

              <span
                aria-hidden="true"
                className="h-4 w-px bg-[var(--border-strong)]"
              />

              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className={externalLink}
              >
                GitHub ↗
              </a>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={externalLink}
              >
                LinkedIn ↗
              </a>
            </div>

            <ThemeToggle />
          </div>
        </div>

        <div className="mt-4 overflow-x-auto border-t border-[var(--border)] pt-3 xl:hidden">
          <div className="flex min-w-max items-center gap-4 pr-2 text-sm">
            <SiteNavigation listClassName="flex items-center gap-4" />

            <span
              aria-hidden="true"
              className="h-4 w-px shrink-0 bg-[var(--border-strong)]"
            />

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              GitHub ↗
            </a>

            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
