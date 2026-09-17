import { createPageMetadata } from "@/lib/metadata";
import {
  CaseStudyDecisionGrid,
  CaseStudyFlow,
  CaseStudyHero,
  CaseStudyNext,
  CaseStudyNote,
  CaseStudyProofGrid,
  CaseStudySection,
} from "@/components/case-study-ui";
import { projects, routes } from "@/content/portfolio";
import type { Project } from "@/content/types";

export const metadata = createPageMetadata({
  title: "Network Analytic Tool Case Study",
  description:
    "Public-safe case study of a five-person network-resilience engineering project spanning simulation, monitoring, RF degradation and recovery workflows.",
  path: "/projects/nat",
});

const project = projects.find(
  (candidate) => candidate.slug === "nat",
) as Project;

export default function NatCaseStudyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <CaseStudyHero
          project={project}
          eyebrow="Industry-client capstone"
          title="Integrating simulation, monitoring and recovery for a network-resilience demonstrator."
          summary="A five-person UNSW engineering project combining network simulation, operational monitoring, resilient communications planning, terrain-aware RF analysis and recovery workflows in one Dockerised demonstrator."
          sourceLabel="Private project source · public-safe case study"
        />

        <CaseStudySection
          eyebrow="Context"
          title="Bring several technical systems into one operator workflow."
        >
          <p>
            The challenge was integration, not one isolated algorithm. Scenario
            configuration, simulated network behaviour, degradation, monitoring
            and recovery all needed to share consistent data and make sense as
            one demonstrator.
          </p>
          <p>
            I held the Scrum Master, Systems Architect and DevOps roles and also
            contributed to full-stack integration. I integrated backend
            services, shared API contracts and frontend workflows, and
            coordinated demonstrations, QA and handover.
          </p>
        </CaseStudySection>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <CaseStudyProofGrid
            items={[
              {
                value: "94/100",
                label: "High Distinction",
                detail:
                  "The five-person industry-client capstone received a High Distinction.",
              },
              {
                value: "5",
                label: "Engineering team",
                detail:
                  "Delivery required shared architecture, integration and coordinated client-facing work.",
              },
              {
                value: "Paid",
                label: "Follow-on engineering",
                detail:
                  "The capstone led directly to paid software engineering work with Arms Operations Analysis.",
              },
              {
                value: "Full-stack",
                label: "Technical scope",
                detail:
                  "Python/FastAPI, React/TypeScript, Docker, REST/OpenAPI and map-based interfaces.",
              },
            ]}
          />
        </section>

        <CaseStudySection
          eyebrow="System shape"
          title="Keep the flow clear from configuration to recovery."
        >
          <CaseStudyFlow
            steps={[
              {
                label: "Configure",
                detail:
                  "Define the scenario, network elements and operational inputs required for a run.",
              },
              {
                label: "Simulate",
                detail:
                  "Run network behaviour through backend simulation services and shared models.",
              },
              {
                label: "Degrade",
                detail:
                  "Apply controlled stressors and terrain-aware RF/network degradation.",
              },
              {
                label: "Observe",
                detail:
                  "Surface network health, alerts and tactical state through interactive frontend views.",
              },
              {
                label: "Recover",
                detail:
                  "Support deterministic recovery and communications workflows without hiding the operator decision path.",
              },
            ]}
          />

          <p>
            Backend services and the React interface needed shared contracts and
            predictable state, while the simulator stayed separate from
            operator-facing decision support.
          </p>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Contribution"
          title="I focused on architecture, integration and delivery."
        >
          <CaseStudyDecisionGrid
            items={[
              {
                title: "Architecture and API contracts",
                detail:
                  "Designed shared API and configuration boundaries so backend services and frontend workflows behaved as one demonstrator.",
              },
              {
                title: "Full-stack implementation",
                detail:
                  "Integrated Python/FastAPI services with React/TypeScript interfaces for monitoring, RF/network degradation and recovery workflows.",
              },
              {
                title: "Delivery and DevOps",
                detail:
                  "Coordinated Git/Jira delivery, Docker-based integration, automated testing, end-to-end validation and client demonstrations.",
              },
              {
                title: "Handover quality",
                detail:
                  "Consolidated the final demonstrator while keeping simulation and deterministic operator tooling separate from any external decision layer.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Trade-offs"
          title="Keep the system inspectable."
        >
          <p>
            We avoided hiding network behaviour behind opaque automation.
            Configuration, degradation and recovery stayed visible, while
            deterministic operator tooling remained separate from simulation.
          </p>
          <p>
            That made the demonstrator easier to test and explain: users could
            follow how configuration changed the simulated network, how
            stressors affected state and what recovery workflow followed.
          </p>

          <CaseStudyNote title="Client confidentiality">
            <p>
              Source code and post-capstone client material remain private. This
              case study intentionally uses only public-safe engineering scope,
              role information and outcomes; it does not expose private
              repositories, internal endpoints, client documents, operational
              parameters or confidential screenshots.
            </p>
          </CaseStudyNote>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Outcome"
          title="The project led directly to paid engineering work."
        >
          <p>
            The capstone received 94/100 (High Distinction) and led to a paid
            Software Engineer engagement. The follow-on work continued the
            demonstrator beyond the university assessment.
          </p>
        </CaseStudySection>

        <CaseStudyNext
          nextHref={routes.wheatSegmentation}
          nextLabel="Next: Wheat Crop Segmentation"
        />
      </div>
    </main>
  );
}
