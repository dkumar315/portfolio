import Link from "next/link";

import {
  experiences,
  profile,
  projects,
  routes,
  skillGroups,
} from "@/content/portfolio";
import type { Project } from "@/content/types";
import {
  ExperienceCard,
  PageIntro,
  ProjectCard,
  RuptureLabFeature,
  SectionHeading,
  SkillGroupCard,
} from "@/components/portfolio-ui";

const homeExperiences = experiences.filter(
  (experience) => experience.category === "engineering",
);

const ruptureLab = projects.find(
  (project) => project.shortTitle === "RuptureLab",
) as Project;

const supportingProjects = projects.filter((project) =>
  ["Network Analytic Tool", "Wheat Crop Segmentation", "BitTrickle"].includes(
    project.shortTitle,
  ),
);

const snapshotItems = [
  {
    label: "Professional engineering",
    value: "ArmsOA · Tandem Learning",
    href: routes.experience,
  },
  {
    label: "Independent release",
    value: "RuptureLab v1.0.0",
    href: routes.ruptureLab,
  },
  {
    label: "Industry capstone",
    value: "Network Analytic Tool · 94/100",
    href: routes.nat,
  },
  {
    label: "Core stack",
    value: "Python · FastAPI · TypeScript · React",
    href: "#skills",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Software Engineer · Sydney, Australia"
          title="Backend-focused software engineer who ships across the stack."
          description={profile.introduction}
          actions={[
            {
              label: "View projects",
              href: routes.projects,
              primary: true,
            },
            {
              label: "Download resume",
              href: profile.resumeHref,
              download: true,
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
          {snapshotItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex min-h-28 flex-col justify-center border-b border-[var(--border)] px-5 py-5 transition-colors hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:px-7 lg:last:border-r-0"
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                {item.label}
              </p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="max-w-[15rem] text-sm font-semibold leading-6">
                  {item.value}
                </p>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[var(--accent-strong)] transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Professional engineering"
            title="Production software experience"
            description="Paid engineering work across a network-resilience demonstrator and a live education platform."
            href={routes.experience}
            linkLabel="Full experience"
          />

          <div>
            {homeExperiences.map((experience) => (
              <ExperienceCard key={experience.slug} experience={experience} />
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Flagship project"
            title="RuptureLab: resilience testing from proxy to dashboard"
            description="My independent full-stack project for controlled API failure and recovery experiments, with live monitoring, persistence and production-style testing."
            href={routes.projects}
            linkLabel="All projects"
          />

          <RuptureLabFeature
            project={ruptureLab}
            imageSrc="/projects/rupturelab/overview.png"
            imageAlt="RuptureLab experiment overview dashboard"
          />
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems, ML and networking projects"
            description="A smaller set of projects that shows the range behind my full-stack work."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="scroll-mt-28 border-t border-[var(--border)] py-14 sm:py-16 lg:py-20"
        >
          <SectionHeading
            eyebrow="Technical range"
            title="Technical skills with project evidence"
            description="Each skill group points back to projects or professional work where I used it."
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

        <section className="card-elevated mb-16 rounded-3xl border border-[var(--border-strong)] bg-[var(--accent-soft)] p-7 sm:mb-20 sm:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Get in touch
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Looking for a graduate or junior software engineer?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
                I am based in Sydney and interested in backend and full-stack
                roles where implementation, testing and product judgement
                matter.
              </p>
            </div>

            <Link
              href={routes.contact}
              className="inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-[var(--button-background)] px-5 py-2.5 text-sm font-semibold text-[var(--button-foreground)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Get in touch →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
