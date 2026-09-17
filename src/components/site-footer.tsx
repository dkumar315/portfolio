import Link from "next/link";

import { primaryNavigation } from "@/content/portfolio";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 lg:px-10">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            Backend-focused software engineer with full-stack experience across
            Python/FastAPI and TypeScript/React.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-3 text-sm md:justify-end"
        >
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[var(--muted)] md:col-span-2">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and
          TypeScript.
        </p>
      </div>
    </footer>
  );
}
