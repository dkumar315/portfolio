import { createPageMetadata } from "@/lib/metadata";
import {
  education,
  experiences,
  profile,
  projects,
  routes,
} from "@/content/portfolio";
import type { Project } from "@/content/types";
import {
  ExperienceCard,
  PageIntro,
  ProjectCard,
  SectionHeading,
} from "@/components/portfolio-ui";

export const metadata = createPageMetadata({
  title: "Resume",
  description:
    "Resume for Devaansh Kumar covering software engineering experience, selected technical projects and UNSW Computer Science education.",
  path: "/resume",
});

const engineeringExperience = experiences.filter(
  (experience) => experience.category === "engineering",
);

const resumeProjectTitles = [
  "RuptureLab",
  "Network Analytic Tool",
  "Wheat Crop Segmentation",
] as const;

const resumeProjects = resumeProjectTitles.map(
  (title) =>
    projects.find((project) => project.shortTitle === title) as Project,
);

export default function ResumePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Resume"
          title="Software engineering experience, selected work and education."
          description="A concise web resume, plus a downloadable PDF for applications and recruiter review."
          actions={[
            {
              label: "Download resume PDF",
              href: profile.resumeHref,
              download: true,
              primary: true,
            },
            {
              label: `Call ${profile.phoneDisplay}`,
              href: profile.phoneHref,
            },
            {
              label: "Contact me",
              href: routes.contact,
            },
          ]}
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Experience"
            title="Professional software engineering"
          />

          {engineeringExperience.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Selected projects"
            title="Representative technical work"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resumeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading eyebrow="Education" title={education.institution} />

          <p className="text-xl font-semibold">
            {education.degree} ({education.field})
          </p>

          <p className="mt-2 text-[15px] text-[var(--muted)]">
            {education.period} · {education.location}
          </p>
        </section>
      </div>
    </main>
  );
}
