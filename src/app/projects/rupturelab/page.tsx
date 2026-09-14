import Image from "next/image";

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

const project = projects.find(
  (candidate) => candidate.slug === "rupturelab",
) as Project;

export default function RuptureLabCaseStudyPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <CaseStudyHero
          project={project}
          eyebrow="Independent flagship · v1.0.0"
          title="Building a repeatable API resilience workbench from proxy to persistence."
          summary="RuptureLab turns failure testing into a controlled experiment: establish a healthy baseline, introduce one deliberate fault, measure the impact, clear it, verify recovery and persist the evidence."
          sourceLabel="Public source · GitHub"
        />

        <CaseStudySection
          eyebrow="Problem"
          title="Make failure behaviour measurable instead of anecdotal."
        >
          <p>
            A service can appear healthy during ordinary requests while behaving
            very differently under latency, HTTP failures, timeouts or malformed
            responses. The engineering problem was to make those behaviours
            repeatable enough to compare before, during and after a fault.
          </p>
          <p>
            The target application also needed to remain unaware of RuptureLab.
            That pushed failure injection into a dedicated reverse proxy while a
            separate control plane owned orchestration, measurement, contracts
            and persistence.
          </p>
        </CaseStudySection>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <CaseStudyProofGrid
            items={[
              {
                value: "v1.0.0",
                label: "Public release",
                detail:
                  "Independent project released with documentation, CI and a reproducible local stack.",
              },
              {
                value: "108",
                label: "Backend tests",
                detail:
                  "Project-owned backend code reached 100% line and branch coverage.",
              },
              {
                value: "53",
                label: "Frontend tests",
                detail:
                  "Unit and component tests reached 100% statement, branch, function and line coverage.",
              },
              {
                value: "5",
                label: "Browser flows",
                detail:
                  "Chromium flows complement production Compose and persistence validation.",
              },
            ]}
          />
        </section>

        <CaseStudySection
          eyebrow="System design"
          title="Keep orchestration, traffic manipulation and the target separate."
        >
          <CaseStudyFlow
            steps={[
              {
                label: "Configure",
                detail:
                  "Define the target request, fault profile and phase-specific resilience contract.",
              },
              {
                label: "Baseline",
                detail:
                  "Send the request profile through the proxy and measure healthy behaviour.",
              },
              {
                label: "Fault",
                detail:
                  "Enable one controlled fault and attribute the resulting measurements.",
              },
              {
                label: "Recovery",
                detail:
                  "Clear the fault and run the same profile again to measure recovery.",
              },
              {
                label: "Evaluate",
                detail:
                  "Check the declared contract, stream progress and persist the completed run.",
              },
            ]}
          />
          <p>
            The browser talks to a Next.js boundary, which calls a FastAPI
            control API. The control plane configures a fault proxy, the proxy
            forwards ordinary HTTP traffic to the target, and PostgreSQL stores
            the complete experiment. Live progress is published through
            Server-Sent Events.
          </p>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Engineering decisions"
          title="The interesting work is in the invariants, not just the dashboard."
        >
          <CaseStudyDecisionGrid
            items={[
              {
                title: "Separate control from proxying",
                detail:
                  "The experiment runner owns orchestration and metrics while the proxy owns traffic manipulation, keeping responsibilities explicit and the target application unchanged.",
              },
              {
                title: "Treat recovery as a first-class phase",
                detail:
                  "Baseline, fault and recovery reuse the same request profile so healthy behaviour before and after the failure can be compared directly.",
              },
              {
                title: "Make live state replayable",
                detail:
                  "Sequenced SSE events support Last-Event-ID replay, while persisted results provide a durable fallback after completion.",
              },
              {
                title: "Protect experiment correctness",
                detail:
                  "Only one experiment may own the active fault state at a time, and request-target validation prevents authority-like paths, fragments, dot segments and control-namespace access.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Product evidence"
          title="The interface exposes the same model the backend enforces."
        >
          <div className="space-y-5">
            <figure className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--foreground)] p-3">
              <Image
                src="/projects/rupturelab/overview.png"
                alt="RuptureLab overview showing recent experiments and system status"
                width={1600}
                height={1000}
                sizes="(max-width: 1280px) 100vw, 900px"
                className="h-auto w-full rounded-2xl"
              />
            </figure>

            <figure className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--foreground)] p-3">
              <Image
                src="/projects/rupturelab/live-experiment.png"
                alt="RuptureLab live experiment showing baseline fault and recovery phases"
                width={1600}
                height={1000}
                sizes="(max-width: 1280px) 100vw, 900px"
                className="h-auto w-full rounded-2xl"
              />
            </figure>

            <figure className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--foreground)] p-3">
              <Image
                src="/projects/rupturelab/result.png"
                alt="RuptureLab persisted experiment result and contract evaluation"
                width={1600}
                height={1000}
                sizes="(max-width: 1280px) 100vw, 900px"
                className="h-auto w-full rounded-2xl"
              />
            </figure>
          </div>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Quality"
          title="Release confidence came from layered checks."
        >
          <p>
            Backend quality combines Ruff, strict mypy, migration checks,
            dependency auditing and 100% line-and-branch coverage. Frontend
            quality combines strict TypeScript, ESLint, Prettier, production
            dependency auditing, full project-owned coverage and browser flows.
          </p>
          <p>
            The system gate then exercises the production-style Compose stack:
            five healthy services, restart and persistence checks, overlapping
            run protection, non-root containers and a real Chromium path through
            dashboard → API → proxy → target → PostgreSQL.
          </p>

          <CaseStudyNote title="Public evidence">
            <p>
              RuptureLab is the only deep case study here with public source.
              The repository contains the released code, architecture notes,
              security model, CI workflows and demo documentation.
            </p>
            <a
              href="https://github.com/dkumar315/rupture-lab"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex font-semibold text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4"
            >
              View the v1.0.0 project repository ↗
            </a>
          </CaseStudyNote>
        </CaseStudySection>

        <CaseStudyNext
          nextHref={routes.nat}
          nextLabel="Next: Network Analytic Tool"
        />
      </div>
    </main>
  );
}
