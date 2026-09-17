import { createPageMetadata } from "@/lib/metadata";
import { experiences, profile } from "@/content/portfolio";
import {
  ExperienceCard,
  PageIntro,
  SectionHeading,
} from "@/components/portfolio-ui";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Software engineering experience across product development, network-resilience simulation, backend systems and full-stack delivery.",
  path: "/experience",
});

const engineeringExperience = experiences.filter(
  (experience) => experience.category === "engineering",
);

const additionalExperience = experiences.filter(
  (experience) => experience.category !== "engineering",
);

export default function ExperiencePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Experience"
          title="Software engineering across product and network-resilience systems."
          description={`${profile.positioning} My professional work spans production education software, an industry-client network-resilience demonstrator and a paid follow-on engineering engagement.`}
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Software engineering"
            title="Professional engineering experience"
            description="The roles where I shipped, integrated and tested real software systems."
          />

          {engineeringExperience.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Leadership & teaching"
            title="Tutoring and student leadership"
            description="Roles that strengthened communication, mentoring, judgement and operational responsibility."
          />

          {additionalExperience.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </section>
      </div>
    </main>
  );
}
