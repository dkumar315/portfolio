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
    "About Devaansh Kumar: Sydney-based software engineer who completed a Bachelor of Science (Computer Science) at UNSW, with backend and full-stack experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="About"
          title="I like building software I can explain, test and maintain."
          description={profile.positioning}
        />

        <section className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              How I work
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Understand the system, then make it dependable.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-[var(--muted)]">
            <p>
              I completed Computer Science at UNSW while building experience in
              production web development, backend systems, machine learning,
              networking and operating systems.
            </p>
            <p>
              I enjoy the parts of engineering where details matter: API
              behaviour, application state, failure handling, integration,
              testing and getting a system to behave predictably outside the
              happy path.
            </p>
            <p>
              I can work across the stack, but I am most interested in backend
              and full-stack roles where I can understand the data flow, own
              implementation details and ship software people actually use.
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Skills"
            title="Technical skills with real project context"
            description="Each skill group points to projects or professional work where I used it."
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
                className="card-elevated rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--muted)]">
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
