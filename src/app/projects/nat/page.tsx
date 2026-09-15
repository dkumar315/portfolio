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
          summary="A five-person UNSW engineering project that combined network simulation, operational monitoring, resilient communications planning, terrain-aware RF analysis and recovery workflows into one Dockerised demonstrator."
          sourceLabel="Private client source · public-safe case study"
        />

        <CaseStudySection
          eyebrow="Context"
          title="Turn several technical capabilities into one coherent operator workflow."
        >
          <p>
            The challenge was broader than implementing an isolated algorithm.
            The team needed a demonstrator where scenario configuration,
            simulated network behaviour, degradation, monitoring and recovery
            workflows shared consistent data and could be explained clearly to
            an industry client.
          </p>
          <p>
            My formal team responsibilities were Scrum Master, Systems Architect
            and DevOps, alongside full-stack integration work. I worked across
            backend services, shared API contracts, frontend workflows,
            demonstrations, QA and handover.
          </p>
        </CaseStudySection>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <CaseStudyProofGrid
            items={[
              {
                value: "94 HD",
                label: "COMP3900 result",
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
          title="Keep the operator flow understandable from configuration to recovery."
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
            The architectural focus was integration: backend services and the
            React interface needed shared contracts, predictable state and
            boundaries that kept simulation separate from operator-facing
            decision support.
          </p>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Contribution"
          title="My work sat at the integration boundaries."
        >
          <CaseStudyDecisionGrid
            items={[
              {
                title: "Architecture and API contracts",
                detail:
                  "Helped shape how backend capabilities, configuration and frontend workflows fit together so the demonstrator behaved as one system rather than disconnected prototypes.",
              },
              {
                title: "Full-stack implementation",
                detail:
                  "Worked across Python/FastAPI services and React/TypeScript interfaces covering monitoring, RF/network degradation and recovery-oriented workflows.",
              },
              {
                title: "Delivery and DevOps",
                detail:
                  "Coordinated Git/Jira delivery, Docker-based integration, automated testing, end-to-end validation and client demonstrations.",
              },
              {
                title: "Handover quality",
                detail:
                  "Helped consolidate the final demonstrator and preserve clear boundaries between simulation, deterministic tooling and any external decision layer.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Trade-offs"
          title="A demonstrator still needs disciplined boundaries."
        >
          <p>
            The useful engineering trade-off was not to hide complexity behind
            opaque automation. Network state, degradation and recovery behaviour
            remained inspectable, while deterministic operator tooling stayed
            separate from simulation.
          </p>
          <p>
            That made the product easier to test and explain: a user could see
            how configuration affected the simulated network, how stressors
            changed operational state and what recovery workflow followed.
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
          title="The project became professional engineering experience."
        >
          <p>
            The capstone finished with a 94 HD and led to a paid follow-on
            Software Engineer engagement. That continuation is useful evidence
            that the work held up beyond assessment: the demonstrator still had
            engineering value after the university project ended.
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
