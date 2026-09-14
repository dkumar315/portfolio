import Link from "next/link";
import type { ReactNode } from "react";

import type { Project } from "@/content/types";

interface CaseStudyHeroProps {
  project: Project;
  eyebrow: string;
  title: string;
  summary: string;
  sourceLabel: string;
}

export function CaseStudyHero({
  project,
  eyebrow,
  title,
  summary,
  sourceLabel,
}: CaseStudyHeroProps) {
  const facts = [
    ["Period", project.period],
    ["Setting", project.team],
    ["Source", sourceLabel],
  ] as const;

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Link
        href="/projects"
        className="inline-flex text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        ← All projects
      </Link>

      <p className="mt-10 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
        {eyebrow}
      </p>

      <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
        {summary}
      </p>

      <div className="mt-9 grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:grid-cols-3">
        {facts.map(([label, value]) => (
          <div
            key={label}
            className="border-b border-[var(--border)] px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0"
          >
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
          >
            {technology}
          </span>
        ))}
      </div>
    </section>
  );
}

interface CaseStudySectionProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function CaseStudySection({
  eyebrow,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="border-t border-[var(--border)] py-14 sm:py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-md text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="max-w-3xl space-y-5 text-base leading-7 text-[var(--muted)]">
          {children}
        </div>
      </div>
    </section>
  );
}

interface ProofItem {
  value: string;
  label: string;
  detail: string;
}

export function CaseStudyProofGrid({ items }: { items: readonly ProofItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <p className="text-3xl font-semibold tracking-[-0.035em]">
            {item.value}
          </p>
          <h3 className="mt-3 text-sm font-semibold">{item.label}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {item.detail}
          </p>
        </article>
      ))}
    </div>
  );
}

interface FlowStep {
  label: string;
  detail: string;
}

export function CaseStudyFlow({ steps }: { steps: readonly FlowStep[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {steps.map((step, index) => (
        <li
          key={step.label}
          className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ${
            index < 3 ? "xl:col-span-2" : "xl:col-span-3"
          }`}
        >
          <p className="font-mono text-xs font-semibold text-[var(--accent-strong)]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-sm font-semibold">{step.label}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

interface DecisionItem {
  title: string;
  detail: string;
}

export function CaseStudyDecisionGrid({
  items,
}: {
  items: readonly DecisionItem[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <h3 className="text-lg font-semibold tracking-[-0.02em]">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {item.detail}
          </p>
        </article>
      ))}
    </div>
  );
}

export function CaseStudyNote({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-2xl border border-[var(--border)] border-l-4 border-l-[var(--accent)] bg-[var(--surface)] p-6">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-[var(--muted)]">
        {children}
      </div>
    </aside>
  );
}

export function CaseStudyNext({
  nextHref,
  nextLabel,
}: {
  nextHref: string;
  nextLabel: string;
}) {
  return (
    <nav
      aria-label="Case study navigation"
      className="flex flex-col gap-4 border-t border-[var(--border)] py-10 sm:flex-row sm:items-center sm:justify-between"
    >
      <Link
        href="/projects"
        className="text-sm font-semibold underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)]"
      >
        ← All projects
      </Link>

      <Link
        href={nextHref}
        className="text-sm font-semibold underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)]"
      >
        {nextLabel} →
      </Link>
    </nav>
  );
}
