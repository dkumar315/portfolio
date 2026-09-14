import Link from "next/link";

import { site } from "@/lib/site";

const externalLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border/80 bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href="/"
          className="focus-visible:ring-accent rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <span className="block text-sm font-semibold tracking-tight">
            {site.name}
          </span>
          <span className="text-muted block text-xs">{site.role}</span>
        </Link>

        <nav aria-label="External profiles">
          <ul className="text-muted flex items-center gap-5 text-sm">
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground focus-visible:ring-accent rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
