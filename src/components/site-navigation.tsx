"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation, routes } from "@/content/portfolio";

type SiteNavigationProps = {
  className?: string;
  listClassName?: string;
};

function isActiveRoute(pathname: string, href: string) {
  if (href === routes.home) {
    return pathname === routes.home;
  }

  if (href === routes.projects) {
    return pathname === routes.projects || pathname.startsWith("/projects/");
  }

  return pathname === href;
}

export function SiteNavigation({
  className,
  listClassName,
}: SiteNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className={className}>
      <ul className={listClassName}>
        {primaryNavigation.map((item) => {
          const active = isActiveRoute(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative whitespace-nowrap py-1 font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
                  active
                    ? "text-[var(--foreground)] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
