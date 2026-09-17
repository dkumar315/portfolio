import { describe, expect, it } from "vitest";

import {
  education,
  experiences,
  homepageExperienceSlugs,
  homepageProjectSlugs,
  primaryNavigation,
  projects,
  routes,
} from "./portfolio";

function expectUnique(values: readonly string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("portfolio content model", () => {
  it("keeps primary navigation compact, internal and unique", () => {
    expect(primaryNavigation).toHaveLength(6);
    expectUnique(primaryNavigation.map((item) => item.href));
    expectUnique(primaryNavigation.map((item) => item.label));

    for (const item of primaryNavigation) {
      expect(item.href.startsWith("/")).toBe(true);
    }

    expect(primaryNavigation.map((item) => item.href)).toEqual([
      routes.home,
      routes.experience,
      routes.projects,
      routes.resume,
      routes.about,
      routes.contact,
    ]);
  });

  it("keeps project identities and ranking unique", () => {
    expectUnique(projects.map((project) => project.slug));
    expectUnique(projects.map((project) => String(project.featuredRank)));

    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.summary.length).toBeGreaterThan(40);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });

  it("allows repository links only for explicitly public projects", () => {
    for (const project of projects) {
      if (project.repoUrl) {
        expect(project.sourceAccess).toBe("public");
        expect(project.repoUrl.startsWith("https://")).toBe(true);
      }

      if (project.sourceAccess !== "public") {
        expect(project.repoUrl).toBeUndefined();
      }
    }
  });

  it("keeps the homepage selections backed by real content", () => {
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const experienceSlugs = new Set(
      experiences.map((experience) => experience.slug),
    );

    for (const slug of homepageProjectSlugs) {
      expect(projectSlugs.has(slug)).toBe(true);
    }

    for (const slug of homepageExperienceSlugs) {
      expect(experienceSlugs.has(slug)).toBe(true);
    }
  });

  it("keeps private identifiers and credential material out of public content", () => {
    const serialized = JSON.stringify({
      experiences,
      projects,
    });

    expect(serialized).not.toMatch(/\bz\d{7}\b/i);
    expect(serialized).not.toMatch(/student\s*id/i);
    expect(serialized).not.toMatch(/credential\s*id/i);
    expect(serialized).not.toMatch(/password/i);
    expect(serialized).not.toMatch(/secret[_ -]?key/i);
  });

  it("has one clear flagship and four planned deep case studies", () => {
    expect(
      projects.filter((project) => project.tier === "flagship"),
    ).toHaveLength(1);

    expect(
      projects
        .filter((project) => project.caseStudyHref)
        .map((project) => project.slug),
    ).toEqual(["rupturelab", "nat", "wheat-segmentation", "xrfm"]);
  });
  it("keeps the education timeline concise", () => {
    expect(education.period).toBe("Sep 2023 – Sep 2026");
    expect(education.highlights.join(" ")).not.toMatch(/conferral/i);
    expect(education.highlights.join(" ")).not.toContain("4 September 2026");
    expect(education.highlights.join(" ")).not.toContain("30 September 2026");
  });
});
