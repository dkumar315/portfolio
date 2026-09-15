import { describe, expect, it } from "vitest";

import { profile, projects } from "@/content/portfolio";
import { site } from "@/lib/site";

describe("public evidence boundaries", () => {
  it("uses conferral-precise degree wording before formal conferral", () => {
    const profileCopy = JSON.stringify(profile);

    expect(site.description).toContain(
      "completed a Bachelor of Science (Computer Science) at UNSW",
    );

    expect(profileCopy).toContain(
      "Completed a Bachelor of Science (Computer Science) at UNSW",
    );

    expect(site.description).not.toContain("UNSW Computer Science graduate");
    expect(profileCopy).not.toContain("UNSW Computer Science graduate");
  });

  it("keeps selected private-coursework claims within documented evidence", () => {
    const publicProjectCopy = JSON.stringify(projects);

    expect(publicProjectCopy).not.toContain("demand-loaded memory mappings");
    expect(publicProjectCopy).not.toContain("morality mechanic");
    expect(publicProjectCopy).not.toContain("boss behaviour");
    expect(publicProjectCopy).not.toContain("multiple game-over states");

    const os161 = projects.find((project) => project.slug === "os161-vm");
    const bankHeist = projects.find((project) => project.slug === "bank-heist");

    expect(os161).toBeDefined();
    expect(bankHeist).toBeDefined();

    expect(JSON.stringify(os161)).toContain("address-space management");
    expect(JSON.stringify(bankHeist)).toContain("complete gameplay loop");
  });
});
