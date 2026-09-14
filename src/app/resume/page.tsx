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
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Resume"
          title="Software engineering experience, selected work and education."
          description="A concise web resume focused on the engineering experience and technical work most relevant to graduate and junior software roles."
          actions={[
            {
              label: "Contact me",
              href: routes.contact,
              primary: true,
            },
            {
              label: "LinkedIn",
              href: profile.linkedin,
              external: true,
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

          <p className="mt-2 text-sm text-[var(--muted)]">
            {education.period} · {education.location}
          </p>
        </section>
      </div>
    </main>
  );
}
