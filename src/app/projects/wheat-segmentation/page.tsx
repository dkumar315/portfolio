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
  title: "Wheat Crop Segmentation Case Study",
  description:
    "Case study comparing classical, clustering, graph-based and deep-learning approaches to wheat crop semantic segmentation.",
  path: "/projects/wheat-segmentation",
});

const project = projects.find(
  (candidate) => candidate.slug === "wheat-segmentation",
) as Project;

export default function WheatSegmentationCaseStudyPage() {
  return (
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <CaseStudyHero
          project={project}
          eyebrow="Computer vision coursework"
          title="Comparing four segmentation paradigms under clean and distorted imagery."
          summary="A group semantic-segmentation study that compared classical computer vision, clustering, graph-based learning and deep learning rather than treating one model score as the whole result."
          sourceLabel="Private coursework · public-safe case study"
        />

        <CaseStudySection
          eyebrow="Question"
          title="Which segmentation approach holds up when the images stop being clean?"
        >
          <p>
            The study compared four different ways to segment wheat imagery:
            classical vision, clustering, graph-based learning and a deep
            learning pipeline. The evaluation considered predictive quality and
            robustness across clean and distorted image conditions.
          </p>
          <p>
            That framing mattered because a model that leads on clean images can
            still be less useful if performance collapses under realistic
            perturbations.
          </p>
        </CaseStudySection>

        <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
          <CaseStudyProofGrid
            items={[
              {
                value: "≈0.910",
                label: "U-Net test IoU",
                detail:
                  "The deep-learning workflow achieved the strongest reported test-set IoU.",
              },
              {
                value: "≈0.953",
                label: "U-Net test F1",
                detail:
                  "The same workflow achieved approximately 0.953 F1 on the test set.",
              },
              {
                value: "≈0.843",
                label: "Graph + CRF clean IoU",
                detail:
                  "The graph-based superpixel approach remained competitive on clean images.",
              },
              {
                value: "4",
                label: "Segmentation paradigms",
                detail:
                  "Classical, clustering, graph-based and deep-learning approaches were compared.",
              },
            ]}
          />
        </section>

        <CaseStudySection
          eyebrow="Method"
          title="Use one evaluation frame across very different model families."
        >
          <CaseStudyFlow
            steps={[
              {
                label: "Prepare",
                detail:
                  "Create consistent dataset splits and preprocessing for comparable experiments.",
              },
              {
                label: "Implement",
                detail:
                  "Develop representative pipelines across four segmentation paradigms.",
              },
              {
                label: "Train",
                detail:
                  "Train the learned methods, including a U-Net with an ImageNet-pretrained ResNet50 encoder.",
              },
              {
                label: "Distort",
                detail:
                  "Evaluate clean images alongside controlled image distortions.",
              },
              {
                label: "Compare",
                detail:
                  "Use segmentation quality and robustness to interpret the trade-offs.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Approaches"
          title="The comparison was intentionally broader than deep learning."
        >
          <CaseStudyDecisionGrid
            items={[
              {
                title: "Classical computer vision",
                detail:
                  "A non-neural baseline provided a useful reference point for what hand-designed image processing could achieve.",
              },
              {
                title: "Clustering",
                detail:
                  "An unsupervised image-partitioning approach tested how far pixel or feature grouping could go without a learned segmentation network.",
              },
              {
                title: "Graph-based superpixels + CRF",
                detail:
                  "A structured graph formulation captured local region relationships and produced strong clean-image performance.",
              },
              {
                title: "U-Net + ResNet50",
                detail:
                  "The deep pipeline used an ImageNet-pretrained ResNet50 encoder, augmentation and structured evaluation across the test conditions.",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="Interpretation"
          title="The useful result was the trade-off, not only the winner."
        >
          <p>
            The U-Net workflow produced the strongest headline test metrics, but
            the graph-based method remained competitive on clean images. Looking
            across distortions made the comparison more informative than a
            single clean-set score.
          </p>
          <p>
            The project therefore demonstrates both model implementation and
            evaluation discipline: compare approaches consistently, inspect
            robustness and explain where each method is strong or limited.
          </p>

          <CaseStudyNote title="Coursework boundary">
            <p>
              The original repository and supplied course material remain
              private for academic-integrity reasons. This page describes the
              project at a portfolio level and does not publish assignment
              source, specifications, supplied tests or teammate code.
            </p>
          </CaseStudyNote>
        </CaseStudySection>

        <CaseStudyNext
          nextHref={routes.xrfm}
          nextLabel="Next: xRFM Benchmarking"
        />
      </div>
    </main>
  );
}
