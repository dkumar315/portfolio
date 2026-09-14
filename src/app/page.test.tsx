import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { site } from "@/lib/site";

describe("Home", () => {
  it("introduces Devaansh and his engineering focus", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Backend-minded\. Full-stack capable\./i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/UNSW Computer Science graduate/i),
    ).toBeInTheDocument();
  });

  it("provides direct contact and GitHub actions", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );

    expect(screen.getByRole("link", { name: "View GitHub" })).toHaveAttribute(
      "href",
      site.github,
    );
  });

  it("shows the current engineering snapshot", () => {
    render(<Home />);

    expect(screen.getByText("ArmsOA + Tandem Learning")).toBeInTheDocument();
    expect(screen.getByText("RuptureLab v1.0.0")).toBeInTheDocument();
    expect(
      screen.getByText("Python · FastAPI · TypeScript · React"),
    ).toBeInTheDocument();
  });

  it("explains the purpose of the portfolio", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Engineering evidence over decoration.",
      }),
    ).toBeInTheDocument();
  });
});
