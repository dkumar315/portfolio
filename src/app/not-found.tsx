import type { Metadata } from "next";
import Link from "next/link";

import { routes } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <section className="flex min-h-[62vh] items-center border-b border-[var(--border)] py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              404 · Page not found
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              This route does not exist.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              The page may have moved, or the address may be incorrect. The
              portfolio and project case studies are still available from the
              main navigation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={routes.home}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:opacity-85"
              >
                Back home →
              </Link>
              <Link
                href={routes.projects}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--foreground)]"
              >
                View projects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
