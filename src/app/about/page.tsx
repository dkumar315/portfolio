import { createPageMetadata } from "@/lib/metadata";
import {
  credentials,
  education,
  profile,
  skillGroups,
} from "@/content/portfolio";
import {
  PageIntro,
  SectionHeading,
  SkillGroupCard,
} from "@/components/portfolio-ui";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Devaansh Kumar: software engineer who completed a Bachelor of Science (Computer Science) at UNSW, focused on reliable backend systems and polished full-stack software.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="About"
          title="Software engineering with breadth, evidence and attention to reliability."
          description={profile.positioning}
        />

        <section className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              How I work
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Build the system, understand the trade-offs.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-[var(--muted)]">
            <p>
              I completed Computer Science at UNSW after working across
              production web development, backend systems, machine learning,
              networking and operating systems.
            </p>
            <p>
              My strongest work tends to sit where implementation quality
              matters: APIs, application state, failure handling, integration,
              testing and the details that make software dependable rather than
              merely demonstrable.
            </p>
            <p>
              I am comfortable moving across the stack, but I am particularly
              interested in backend and full-stack engineering where system
              behaviour, data flow and reliability are part of the problem.
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Skills"
            title="Evidence-backed technical range"
            description="Each group is connected to projects or professional work rather than presented as a self-rated proficiency score."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {skillGroups.map((group, index) => (
              <div
                key={group.title}
                className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
              >
                <SkillGroupCard group={group} />
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading eyebrow="Education" title={education.institution} />

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xl font-semibold">
                {education.degree} ({education.field})
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {education.period} · {education.location}
              </p>
            </div>

            <ul className="space-y-3 text-sm leading-6">
              {education.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span aria-hidden="true" className="text-[var(--accent)]">
                    /
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading eyebrow="Credentials" title="Selected credentials" />

          <div className="grid gap-4 md:grid-cols-3">
            {credentials.map((credential) => (
              <article
                key={credential.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                  {credential.issued}
                </p>
                <h3 className="mt-3 font-semibold">{credential.title}</h3>
                <p className="mt-1 text-sm">{credential.issuer}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {credential.summary}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
