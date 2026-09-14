import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { experiences, projects, skillGroups } from "@/content/portfolio";

import {
  ExperienceCard,
  PageIntro,
  ProjectCard,
  SectionHeading,
  SkillGroupCard,
} from "./portfolio-ui";

describe("portfolio UI", () => {
  it("renders internal and external intro actions", () => {
    render(
      <PageIntro
        eyebrow="Test"
        title="Intro title"
        description="Intro description"
        actions={[
          {
            label: "Internal",
            href: "/projects",
            primary: true,
          },
          {
            label: "External",
            href: "https://example.com",
            external: true,
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Intro title" })).toBeVisible();
    expect(screen.getByRole("link", { name: /Internal/ })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: /External/ })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("renders an intro without actions", () => {
    render(
      <PageIntro eyebrow="Test" title="No actions" description="Description" />,
    );

    expect(screen.getByRole("heading", { name: "No actions" })).toBeVisible();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders section headings with and without links", () => {
    const { rerender } = render(
      <SectionHeading
        eyebrow="Work"
        title="Selected work"
        description="Description"
        href="/projects"
        linkLabel="All projects"
      />,
    );

    expect(screen.getByRole("link", { name: /All projects/ })).toHaveAttribute(
      "href",
      "/projects",
    );

    rerender(<SectionHeading eyebrow="Skills" title="Technical range" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows a repository link only for a public project", () => {
    const publicProject = projects.find(
      (project) => project.slug === "rupturelab",
    );
    const privateProject = projects.find(
      (project) => project.slug === "bittrickle",
    );

    expect(publicProject).toBeDefined();
    expect(privateProject).toBeDefined();

    const { rerender } = render(<ProjectCard project={publicProject!} />);

    expect(
      screen.getByRole("link", { name: /View public repository/ }),
    ).toHaveAttribute("href", "https://github.com/dkumar315/rupture-lab");

    rerender(<ProjectCard project={privateProject!} />);

    expect(
      screen.queryByRole("link", { name: /View public repository/ }),
    ).not.toBeInTheDocument();
  });

  it("renders experiences with and without a technology stack", () => {
    const engineering = experiences.find(
      (experience) => experience.slug === "armsoa",
    );
    const leadership = experiences.find(
      (experience) => experience.slug === "shalom-treasurer",
    );

    expect(engineering).toBeDefined();
    expect(leadership).toBeDefined();

    const { rerender } = render(<ExperienceCard experience={engineering!} />);

    expect(screen.getByText("FastAPI")).toBeVisible();

    rerender(<ExperienceCard experience={leadership!} />);

    expect(screen.queryByText("FastAPI")).not.toBeInTheDocument();
  });

  it("renders skill groups with supporting evidence", () => {
    render(<SkillGroupCard group={skillGroups[0]} />);

    expect(
      screen.getByRole("heading", { name: "Backend & APIs" }),
    ).toBeVisible();
    expect(screen.getByText(/Evidence:/)).toBeVisible();
  });
});
