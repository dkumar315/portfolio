import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WheatSegmentationCaseStudyPage from "./page";

describe("WheatSegmentationCaseStudyPage", () => {
  it("shows comparative results without exposing coursework source", () => {
    render(<WheatSegmentationCaseStudyPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Comparing four segmentation paradigms/,
      }),
    ).toBeVisible();

    expect(screen.getByText("≈0.910")).toBeVisible();
    expect(screen.getByText("≈0.953")).toBeVisible();
    expect(screen.getByText("≈0.843")).toBeVisible();
    expect(screen.getByText("Coursework boundary")).toBeVisible();

    expect(
      screen.queryByRole("link", { name: /repository/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Next: xRFM Benchmarking/ }),
    ).toHaveAttribute("href", "/projects/xrfm");
  });
});
