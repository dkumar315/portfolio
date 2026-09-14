import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./page";

describe("ProjectsPage", () => {
  it("gives the flagship and industry work clear hierarchy", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Selected work across full-stack/,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("heading", { level: 3, name: "RuptureLab" }),
    ).toBeVisible();

    expect(
      screen.getByRole("img", {
        name: "RuptureLab experiment overview dashboard",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "RuptureLab live experiment monitoring dashboard",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Network Analytic Tool",
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("heading", {
        name: "Systems, networking and application engineering",
      }),
    ).toBeVisible();

    expect(
      screen.getAllByRole("link", { name: /Read case study/ }),
    ).toHaveLength(4);
  });
});
