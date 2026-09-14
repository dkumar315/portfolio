import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./page";

describe("ProjectsPage", () => {
  it("shows the curated project library", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Selected work across full-stack/,
      }),
    ).toBeVisible();

    expect(screen.getByText("RuptureLab")).toBeVisible();
    expect(screen.getByText("Network Analytic Tool")).toBeVisible();
    expect(screen.getByText("OS/161 Virtual Memory")).toBeVisible();
    expect(screen.getByText("Bank Heist FPS")).toBeVisible();
  });
});
