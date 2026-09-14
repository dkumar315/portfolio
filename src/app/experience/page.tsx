import { experiences, profile } from "@/content/portfolio";
import {
  ExperienceCard,
  PageIntro,
  SectionHeading,
} from "@/components/portfolio-ui";

const engineeringExperience = experiences.filter(
  (experience) => experience.category === "engineering",
);

const additionalExperience = experiences.filter(
  (experience) => experience.category !== "engineering",
);

export default function ExperiencePage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Experience"
          title="Engineering work across product, simulation and full-stack systems."
          description={`${profile.positioning} My professional work has covered production education software, an industry-client network resilience platform and paid follow-on engineering.`}
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Software engineering"
            title="Professional engineering experience"
            description="The roles most directly relevant to software engineering positions."
          />

          {engineeringExperience.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Leadership & teaching"
            title="Work beyond engineering"
            description="Roles that developed communication, judgement, mentoring and operational responsibility."
          />

          {additionalExperience.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </section>
      </div>
    </main>
  );
}
