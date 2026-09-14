import {
  education,
  experiences,
  profile,
  projects,
  routes,
} from "@/content/portfolio";
import {
  ExperienceCard,
  PageIntro,
  ProjectCard,
  SectionHeading,
} from "@/components/portfolio-ui";

const engineeringExperience = experiences.filter(
  (experience) => experience.category === "engineering",
);

const resumeProjects = projects.filter(
  (project) => project.tier !== "selected",
);

export default function ResumePage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Resume"
          title="Software engineering experience, selected work and education."
          description="A web version of the most relevant engineering evidence. For the current PDF resume, contact me directly."
          actions={[
            {
              label: "Contact for PDF",
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

        <section className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Experience"
            title="Professional software engineering"
          />
          {engineeringExperience.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </section>

        <section className="border-t border-[var(--border)] py-16 sm:py-20">
          <SectionHeading
            eyebrow="Selected projects"
            title="Representative technical work"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {resumeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-16 sm:py-20">
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
