import { site } from "@/lib/site";

const snapshot = [
  {
    label: "Professional engineering",
    value: "ArmsOA + Tandem Learning",
  },
  {
    label: "Independent engineering",
    value: "RuptureLab v1.0.0",
  },
  {
    label: "Core stack",
    value: "Python · FastAPI · TypeScript · React",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-24 lg:px-8 lg:pt-40">
        <div className="max-w-4xl">
          <p className="text-accent font-mono text-xs font-semibold tracking-[0.22em] uppercase">
            Software Engineer · UNSW CS
          </p>

          <h1 className="mt-7 max-w-4xl text-4xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance sm:text-6xl sm:leading-[1.02] lg:text-7xl">
            Backend-minded. Full-stack capable. Focused on software that holds
            up.
          </h1>

          <p className="text-muted mt-8 max-w-2xl text-base leading-7 sm:text-xl sm:leading-9">
            I&apos;m Devaansh Kumar, a UNSW Computer Science graduate with
            professional engineering experience across Python/FastAPI,
            TypeScript/React, APIs, databases, testing, and production web
            systems.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="bg-foreground text-background hover:bg-accent-strong focus-visible:ring-accent inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              Get in touch
            </a>

            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="border-border bg-surface hover:border-foreground/30 focus-visible:ring-accent inline-flex min-h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              View GitHub
            </a>
          </div>
        </div>

        <dl
          aria-label="Engineering snapshot"
          className="border-border mt-20 grid border-y sm:grid-cols-3"
        >
          {snapshot.map((item) => (
            <div
              key={item.label}
              className="border-border py-6 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm font-medium sm:text-base">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <p className="text-accent font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            What you&apos;ll find here
          </p>

          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Engineering evidence over decoration.
            </h2>
            <p className="text-muted mt-5 text-base leading-7 sm:text-lg sm:leading-8">
              Case studies focus on what I built, the decisions behind it, and
              how I validated it—from independently owned work such as
              RuptureLab to professional and university engineering projects.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
