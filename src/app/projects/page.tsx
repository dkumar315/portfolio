import { projects } from "@/content/portfolio";
import {
  PageIntro,
  ProjectCard,
  SectionHeading,
} from "@/components/portfolio-ui";

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageIntro
          eyebrow="Projects"
          title="Selected work across full-stack, ML, systems and networking."
          description="The strongest projects are prioritised by engineering depth and evidence, not by how many assignments can fit on a page."
        />

        <section className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Project library"
            title="Nine projects worth discussing."
            description="RuptureLab is the flagship independent project. Industry and university work is presented with clear ownership boundaries and coursework source remains private."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
