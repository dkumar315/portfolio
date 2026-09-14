import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import XrfmCaseStudyPage from "./page";

describe("XrfmCaseStudyPage", () => {
  it("shows the benchmark design, findings and coursework boundary", () => {
    render(<XrfmCaseStudyPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Evaluating xRFM against strong tabular baselines/,
      }),
    ).toBeVisible();

    expect(screen.getByText("21k+")).toBeVisible();
    expect(screen.getByText("6")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: /xRFM was competitive in places/,
      }),
    ).toBeVisible();

    expect(
      screen.queryByRole("link", { name: /repository/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Back to flagship: RuptureLab/,
      }),
    ).toHaveAttribute("href", "/projects/rupturelab");
  });
});
