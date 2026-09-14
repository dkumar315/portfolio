import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("introduces the engineering focus", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Backend-minded\. Full-stack capable\./,
      }),
    ).toBeVisible();

    expect(screen.getByText("RuptureLab v1.0.0")).toBeVisible();
  });

  it("surfaces professional engineering experience", () => {
    render(<Home />);

    expect(screen.getByText("Arms Operations Analysis Pty Ltd")).toBeVisible();
    expect(screen.getByText("Tandem Learning")).toBeVisible();
  });

  it("links to the main recruiter journeys", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /View projects/ })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: /Contact me/ })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
