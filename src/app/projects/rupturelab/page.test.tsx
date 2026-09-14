import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RuptureLabCaseStudyPage from "./page";

describe("RuptureLabCaseStudyPage", () => {
  it("presents architecture, evidence and public source", () => {
    render(<RuptureLabCaseStudyPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Building a repeatable API resilience workbench/,
      }),
    ).toBeVisible();

    expect(screen.getByText("108")).toBeVisible();
    expect(screen.getByText("53")).toBeVisible();

    expect(
      screen.getByRole("img", {
        name: /persisted experiment result/,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /View the v1\.0\.0 project repository/,
      }),
    ).toHaveAttribute("href", "https://github.com/dkumar315/rupture-lab");

    expect(
      screen.getByRole("link", {
        name: /Next: Network Analytic Tool/,
      }),
    ).toHaveAttribute("href", "/projects/nat");
  });
});
