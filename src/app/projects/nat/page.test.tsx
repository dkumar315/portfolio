import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NatCaseStudyPage from "./page";

describe("NatCaseStudyPage", () => {
  it("keeps the client case study public-safe while showing engineering evidence", () => {
    render(<NatCaseStudyPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Integrating simulation, monitoring and recovery/,
      }),
    ).toBeVisible();

    expect(screen.getByText("94/100")).toBeVisible();
    expect(screen.getByText("Paid")).toBeVisible();
    expect(screen.getByText("Client confidentiality")).toBeVisible();

    expect(
      screen.queryByRole("link", { name: /repository/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Next: Wheat Crop Segmentation/,
      }),
    ).toHaveAttribute("href", "/projects/wheat-segmentation");
  });
});
