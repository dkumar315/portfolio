import { profile } from "@/content/portfolio";
import { PageIntro } from "@/components/portfolio-ui";

export default function ContactPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Contact"
          title="Interested in working together?"
          description="I am interested in graduate and junior software engineering opportunities across backend, full-stack and related engineering work."
        />

        <section className="grid gap-4 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              Email
            </p>
            <p className="mt-3 break-all font-semibold">{profile.email}</p>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              LinkedIn
            </p>
            <p className="mt-3 font-semibold">Professional profile ↗</p>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              GitHub
            </p>
            <p className="mt-3 font-semibold">dkumar315 ↗</p>
          </a>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              Location
            </p>
            <p className="mt-3 font-semibold">{profile.location}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
