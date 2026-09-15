import { createPageMetadata } from "@/lib/metadata";
import { profile } from "@/content/portfolio";
import { PageIntro } from "@/components/portfolio-ui";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Devaansh Kumar for graduate and junior software engineering opportunities across backend, full-stack and related engineering work.",
  path: "/contact",
});

const contactCard =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Contact"
          title="Interested in working together?"
          description="I am interested in graduate and junior software engineering opportunities across backend, full-stack and related engineering work."
        />

        <section className="grid gap-5 py-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-14">
          <a
            href={`mailto:${profile.email}`}
            className="flex min-h-56 flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--foreground)] p-7 text-[var(--background)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:p-8"
          >
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">
                Email
              </p>

              <h2 className="mt-5 break-words text-xl font-semibold leading-tight tracking-[-0.03em] [overflow-wrap:anywhere] sm:text-3xl">
                {profile.email}
              </h2>
            </div>

            <p className="mt-8 max-w-lg text-sm leading-6 opacity-80">
              Direct contact for software engineering roles, project
              conversations and professional enquiries.
            </p>
          </a>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={contactCard}
            >
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                LinkedIn
              </p>
              <p className="mt-3 font-semibold">Professional profile ↗</p>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={contactCard}
            >
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                GitHub
              </p>
              <p className="mt-3 font-semibold">dkumar315 ↗</p>
            </a>
          </div>
        </section>

        <div className="border-t border-[var(--border)] pb-14 pt-6 text-sm text-[var(--muted)]">
          Based in{" "}
          <span className="font-medium text-[var(--foreground)]">
            {profile.location}
          </span>
          .
        </div>
      </div>
    </main>
  );
}
