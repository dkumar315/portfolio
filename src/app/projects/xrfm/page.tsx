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
  title: "xRFM Benchmarking Case Study",
  description:
    "Case study benchmarking xRFM against Random Forest and XGBoost across classification, regression, scaling and feature-importance experiments.",
  path: "/projects/xrfm",
});

const project = projects.find(
  (candidate) => candidate.slug === "xrfm",
) as Project;

export default function XrfmCaseStudyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <CaseStudyHero
          project={project}
          eyebrow="Machine learning coursework"
          title="Evaluating xRFM against strong tabular baselines across classification and regression."
          summary="A five-person replication and benchmarking project that tested xRFM against Random Forest and XGBoost across six OpenML datasets, then extended the comparison into scaling and feature-importance analysis."
          sourceLabel="Private coursework · public-safe case study"
        />

        <CaseStudySection
          eyebrow="Question"
          title="Does a research-inspired tabular model stay competitive against mature baselines?"
        >
          <p>
            The project was framed as an evaluation rather than a showcase. xRFM
            was compared with Random Forest and XGBoost across both
            classification and regression tasks using a reproducible
            preprocessing, validation, training and evaluation workflow.
          </p>
          <p>
            Beyond prediction quality, the study also considered computational
            efficiency, scaling behaviour and interpretability.
          </p>
        </CaseStudySection>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <CaseStudyProofGrid
            items={[
              {
                value: "6",
                label: "OpenML datasets",
                detail:
                  "The benchmark covered multiple classification and regression tasks.",
              },
              {
                value: "3",
                label: "Model families",
                detail:
                  "xRFM was evaluated directly against Random Forest and XGBoost.",
              },
              {
                value: "21k+",
                label: "Scaling samples",
                detail:
                  "A dedicated experiment used the Superconduct dataset with more than 21,000 samples.",
              },
              {
                value: "2",
                label: "Task types",
                detail:
                  "The same evaluation discipline covered classification and regression.",
              },
            ]}
          />
        </section>

        <CaseStudySection
          eyebrow="Experimental design"
          title="Keep preprocessing and evaluation consistent enough for the model comparison to mean something."
        >
          <CaseStudyFlow
            steps={[
              {
                label: "Select",
                detail:
                  "Use six OpenML datasets spanning classification and regression.",
              },
              {
                label: "Prepare",
                detail:
                  "Apply reproducible preprocessing and validation appropriate to each dataset.",
              },
              {
                label: "Train",
                detail:
                  "Fit xRFM, Random Forest and XGBoost under a shared evaluation workflow.",
              },
              {
                label: "Measure",
                detail:
                  "Compare predictive performance and computational behaviour across datasets.",
              },
              {
                label: "Interpret",
                detail:
                  "Study AGOP-based importance alongside PCA, mutual information and permutation importance.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Extensions"
          title="A useful benchmark asks more than which score is largest."
        >
          <CaseStudyDecisionGrid
            items={[
              {
                title: "Classification and regression",
                detail:
                  "Using both task families reduced the chance of drawing a conclusion from one narrow problem type.",
              },
              {
                title: "Scaling behaviour",
                detail:
                  "The Superconduct experiment examined how the methods behaved as sample count increased beyond the smaller benchmark datasets.",
              },
              {
                title: "Feature importance",
                detail:
                  "AGOP-based importance was compared with PCA, mutual information and permutation importance to examine interpretability from multiple angles.",
              },
              {
                title: "Strong baselines",
                detail:
                  "Random Forest and XGBoost gave the replication meaningful reference points rather than evaluating xRFM in isolation.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Findings"
          title="xRFM was competitive in places; XGBoost was the most consistent overall."
        >
          <p>
            The results did not support a simplistic claim that one model wins
            everywhere. xRFM was competitive in several settings, while XGBoost
            delivered the most consistent overall predictive performance across
            the benchmark.
          </p>
          <p>
            That conclusion is useful precisely because it is restrained: the
            replication tested the method across multiple datasets, tasks and
            evaluation dimensions instead of selecting only favourable cases.
          </p>

          <CaseStudyNote title="Coursework boundary">
            <p>
              The original coursework repository remains private. This case
              study publishes the experimental framing, public-safe results and
              engineering lessons without exposing assignment source,
              specifications, supplied tests or teammate code.
            </p>
          </CaseStudyNote>
        </CaseStudySection>

        <CaseStudyNext
          nextHref={routes.ruptureLab}
          nextLabel="Back to flagship: RuptureLab"
        />
      </div>
    </main>
  );
}
