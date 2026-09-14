import Link from "next/link";

import {
  experiences,
  homepageExperienceSlugs,
  homepageProjectSlugs,
  profile,
  projects,
  routes,
  skillGroups,
} from "@/content/portfolio";
import type { Experience, Project } from "@/content/types";
import {
  ExperienceCard,
  PageIntro,
  ProjectCard,
  SectionHeading,
  SkillGroupCard,
} from "@/components/portfolio-ui";

const homeProjects = homepageProjectSlugs.map(
  (slug) => projects.find((project) => project.slug === slug) as Project,
);

const homeExperiences = homepageExperienceSlugs.map(
  (slug) =>
    experiences.find((experience) => experience.slug === slug) as Experience,
);

export default function Home() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Software Engineer · UNSW Computer Science"
          title="Backend-minded. Full-stack capable. Focused on software that holds up."
          description={profile.introduction}
          actions={[
            {
              label: "View projects",
              href: routes.projects,
              primary: true,
            },
            {
              label: "Contact me",
              href: routes.contact,
            },
          ]}
        />

        <section
          aria-label="Engineering snapshot"
          className="grid border-b border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            ["Professional engineering", "ArmsOA + Tandem Learning"],
            ["Independent release", "RuptureLab v1.0.0"],
            ["Industry capstone", "94 HD · COMP3900"],
            ["Core stack", "Python · FastAPI · TypeScript · React"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border-b border-[var(--border)] py-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                {label}
              </p>
              <p className="mt-2 max-w-[15rem] text-sm font-semibold leading-6">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Experience"
            title="Production work, not just coursework."
            description="Professional software engineering experience across a small product team, an industry-client system, and paid follow-on engineering."
            href={routes.experience}
            linkLabel="Full experience"
          />

          <div>
            {homeExperiences.map((experience) => (
              <ExperienceCard key={experience.slug} experience={experience} />
            ))}
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <SectionHeading
            eyebrow="Selected work"
            title="Engineering evidence over decoration."
            description="A released independent product, industry work, machine learning, networking, systems and frontend engineering."
            href={routes.projects}
            linkLabel="All projects"
          />

          <div className="grid gap-5 md:grid-cols-2">
            {homeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-16 sm:py-20">
          <SectionHeading
            eyebrow="Technical range"
            title="Skills tied to work I can explain."
            description="The portfolio prioritises evidence-backed engineering capability instead of a keyword wall."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <SkillGroupCard key={group.title} group={group} />
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:mb-20 sm:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Next conversation
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Looking for a graduate or junior engineer who can move across
                backend and full-stack work?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
                I am interested in software engineering roles where strong
                implementation, testing and product judgement matter.
              </p>
            </div>

            <Link
              href={routes.contact}
              className="inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:opacity-85"
            >
              Get in touch →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
