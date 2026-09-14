import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© 2026 {site.name}</p>
        <a
          href={`mailto:${site.email}`}
          className="hover:text-foreground focus-visible:ring-accent w-fit rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
