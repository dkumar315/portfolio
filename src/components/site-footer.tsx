import Link from "next/link";

import { routes } from "@/content/portfolio";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 lg:px-10">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            Software engineer building reliable backend systems and polished
            full-stack products.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:justify-end">
          <Link href={routes.projects} className="hover:underline">
            Projects
          </Link>
          <Link href={routes.experience} className="hover:underline">
            Experience
          </Link>
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
        </div>

        <p className="text-xs text-[var(--muted)] md:col-span-2">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and
          TypeScript.
        </p>
      </div>
    </footer>
  );
}
