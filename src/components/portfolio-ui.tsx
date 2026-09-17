import Image from "next/image";
import Link from "next/link";

import type { Experience, Project, SkillGroup } from "@/content/types";

const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--button-background)] px-5 py-2.5 text-sm font-semibold text-[var(--button-foreground)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

const secondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-strong)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

interface IntroAction {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  primary?: boolean;
}

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: readonly IntroAction[];
}

export function PageIntro({
  eyebrow,
  title,
  description,
  actions = [],
}: PageIntroProps) {
  return (
    <section className="border-b border-[var(--border)] py-14 sm:py-16 lg:py-20">
      <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
        {eyebrow}
      </p>

      <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
        {description}
      </p>

      {actions.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {actions.map((action) => {
            const className = action.primary ? primaryButton : secondaryButton;

            if (action.download) {
              return (
                <a
                  key={action.href}
                  href={action.href}
                  download
                  className={className}
                >
                  {action.label}
                  <span aria-hidden="true" className="ml-2">
                    ↓
                  </span>
                </a>
              );
            }

            return action.external ? (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {action.label}
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
            ) : (
              <Link key={action.href} href={action.href} className={className}>
                {action.label}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
          {eyebrow}
        </p>

        <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            {description}
          </p>
        ) : null}
      </div>

      {href && linkLabel ? (
        <Link
          href={href}
          className="w-fit text-[15px] font-semibold underline decoration-[var(--border-strong)] underline-offset-4 transition hover:decoration-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

const projectKindLabels: Record<Project["kind"], string> = {
  independent: "Independent",
  industry: "Industry",
  coursework: "Coursework",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-elevated flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)]">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--muted)]">
        <span>{projectKindLabels[project.kind]}</span>
        <span aria-hidden="true">·</span>
        <span>{project.period}</span>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em]">
        {project.shortTitle}
      </h3>

      <p className="mt-3 leading-7 text-[var(--muted)]">{project.summary}</p>

      <ul className="mt-5 space-y-2 text-sm leading-6">
        {project.highlights.slice(0, 2).map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--accent)]">
              /
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <p className="text-xs font-medium uppercase leading-5 tracking-[0.12em] text-[var(--muted)]">
          {project.team}
        </p>

        {project.caseStudyHref ? (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href={project.caseStudyHref}
              className="text-sm font-semibold underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Read case study →
            </Link>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                View public repository ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

interface RuptureLabFeatureProps {
  project: Project;
  imageSrc: string;
  imageAlt: string;
}

export function RuptureLabFeature({
  project,
  imageSrc,
  imageAlt,
}: RuptureLabFeatureProps) {
  return (
    <article className="card-elevated overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col p-7 sm:p-8 lg:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Independent flagship · {project.period}
          </p>

          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            {project.shortTitle}
          </h3>

          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
            {project.summary}
          </p>

          <ul className="mt-6 space-y-3 text-sm leading-6">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span aria-hidden="true" className="text-[var(--accent)]">
                  /
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={project.caseStudyHref!}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--button-background)] px-5 py-2.5 text-sm font-semibold text-[var(--button-foreground)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Read case study
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>

            <a
              href={project.repoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-strong)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              View repository
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </a>
          </div>
        </div>

        <figure className="flex items-center border-t border-[var(--border)] bg-[var(--media-frame)] p-3 lg:border-l lg:border-t-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="h-auto w-full rounded-2xl object-contain"
          />
        </figure>
      </div>
    </article>
  );
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="grid gap-6 border-b border-[var(--border)] py-8 first:pt-0 last:border-b-0 md:grid-cols-[12rem_1fr]">
      <div>
        <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--muted)]">
          {experience.period}
        </p>
        <p className="mt-2 text-[15px] text-[var(--muted)]">
          {experience.location}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-[-0.025em]">
          {experience.role}
        </h3>

        <p className="mt-1 font-medium">{experience.organisation}</p>

        {experience.organisationSummary ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            {experience.organisationSummary}
          </p>
        ) : null}

        <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">
          {experience.summary}
        </p>

        <ul className="mt-5 max-w-3xl space-y-2 text-sm leading-6">
          {experience.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="text-[var(--accent)]">
                /
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {experience.stack && experience.stack.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
              >
                {technology}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <article className="card-elevated h-full rounded-2xl border border-[var(--border)] border-t-2 border-t-[var(--accent)] bg-[var(--surface)] p-5">
      <h3 className="text-base font-semibold">{group.title}</h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        Evidence: {group.evidence.join(" · ")}
      </p>
    </article>
  );
}
