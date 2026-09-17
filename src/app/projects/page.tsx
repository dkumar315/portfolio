import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";

import { projects } from "@/content/portfolio";
import type { Project } from "@/content/types";
import {
  PageIntro,
  ProjectCard,
  RuptureLabFeature,
  SectionHeading,
} from "@/components/portfolio-ui";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected software engineering projects across full-stack development, backend systems, machine learning, networking and reliability.",
  path: "/projects",
});

const ruptureLab = projects.find(
  (project) => project.shortTitle === "RuptureLab",
) as Project;

const nat = projects.find(
  (project) => project.shortTitle === "Network Analytic Tool",
) as Project;

const caseStudyProjects = projects.filter((project) =>
  ["Wheat Crop Segmentation", "xRFM Benchmarking"].includes(project.shortTitle),
);

const supportingProjects = projects.filter(
  (project) =>
    ![
      "RuptureLab",
      "Network Analytic Tool",
      "Wheat Crop Segmentation",
      "xRFM Benchmarking",
    ].includes(project.shortTitle),
);

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Projects"
          title="Selected software engineering projects."
          description="Independent, industry and university work across backend and full-stack development, systems, networking, computer vision and machine learning."
        />

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Flagship"
            title="RuptureLab — API resilience from proxy to dashboard"
            description="An independently owned full-stack project for running controlled API failure and recovery experiments, with live monitoring, persistence, testing and deployment."
          />

          <RuptureLabFeature
            project={ruptureLab}
            imageSrc="/projects/rupturelab/overview.png"
            imageAlt="RuptureLab experiment overview dashboard"
          />

          <figure className="mt-5 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--media-frame)] p-3">
            <Image
              src="/projects/rupturelab/live-experiment.png"
              alt="RuptureLab live experiment monitoring dashboard"
              width={1600}
              height={1000}
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="h-auto w-full rounded-2xl object-contain"
            />
          </figure>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Industry client capstone"
            title="Network resilience for an industry client"
            description="A five-person engineering project that brought simulation, backend services, frontend workflows and network-resilience tooling into one demonstrator."
          />

          <div className="max-w-4xl">
            <ProjectCard project={nat} />
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Case-study work"
            title="Machine learning and computer vision"
          />

          <div className="grid gap-5 md:grid-cols-2">
            {caseStudyProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Additional work"
            title="Systems, networking and application engineering"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {supportingProjects.map((project, index) => (
              <div
                key={project.slug}
                className={index < 3 ? "xl:col-span-2" : "xl:col-span-3"}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
