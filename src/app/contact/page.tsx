import { createPageMetadata } from "@/lib/metadata";
import { profile } from "@/content/portfolio";
import { PageIntro } from "@/components/portfolio-ui";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Devaansh Kumar, a Sydney-based software engineer, for graduate and junior backend, full-stack and related engineering opportunities.",
  path: "/contact",
});

const primaryContactCard =
  "card-elevated flex min-h-44 flex-col justify-between rounded-3xl border p-7 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:p-8";

const secondaryContactCard =
  "card-elevated rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Contact"
          title="Interested in working together?"
          description="I am based in Sydney and interested in graduate and junior software engineering opportunities across backend, full-stack and related engineering work."
        />

        <section className="grid gap-5 py-10 sm:py-12 lg:grid-cols-2 lg:py-14">
          <a
            href={`mailto:${profile.email}`}
            className={`${primaryContactCard} border-[var(--border)] bg-[var(--contact-panel)] text-[var(--contact-panel-text)] hover:bg-[var(--contact-panel-hover)]`}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">
              Email
            </p>

            <h2 className="mt-5 break-words text-xl font-semibold leading-tight tracking-[-0.03em] [overflow-wrap:anywhere] sm:text-3xl">
              {profile.email}
            </h2>
          </a>

          <a
            href={profile.phoneHref}
            className={`${primaryContactCard} border-[var(--border-strong)] bg-[var(--accent-soft)] hover:bg-[var(--accent-soft-strong)]`}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              Phone
            </p>

            <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
              {profile.phoneDisplay}
            </h2>
          </a>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryContactCard}
            >
              <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--muted)]">
                LinkedIn
              </p>
              <p className="mt-3 font-semibold">Professional profile ↗</p>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryContactCard}
            >
              <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--muted)]">
                GitHub
              </p>
              <p className="mt-3 font-semibold">dkumar315 ↗</p>
            </a>
          </div>
        </section>

        <div className="border-t border-[var(--border)] pb-14 pt-6 text-[15px] text-[var(--muted)]">
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
