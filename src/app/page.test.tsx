import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("introduces the engineering focus and flagship", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Backend-focused software engineer/,
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
  });

  it("surfaces only professional engineering experience on the homepage", () => {
    render(<Home />);

    expect(screen.getByText("Arms Operations Analysis Pty Ltd")).toBeVisible();
    expect(screen.getByText("Tandem Learning")).toBeVisible();
    expect(screen.queryByText("Academic Tutor")).not.toBeInTheDocument();
  });

  it("links to the main recruiter journeys and snapshot destinations", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /View projects/ })).toHaveAttribute(
      "href",
      "/projects",
    );

    expect(
      screen.getByRole("link", { name: /Download resume/ }),
    ).toHaveAttribute("href", "/Devaansh-Kumar-Resume.pdf");

    expect(screen.getByRole("link", { name: /Contact me/ })).toHaveAttribute(
      "href",
      "/contact",
    );

    expect(
      screen.getByRole("link", { name: /ArmsOA · Tandem Learning/ }),
    ).toHaveAttribute("href", "/experience");

    expect(
      screen.getByRole("link", { name: /RuptureLab v1.0.0/ }),
    ).toHaveAttribute("href", "/projects/rupturelab");

    expect(
      screen.getByRole("link", { name: /Network Analytic Tool · 94\/100/ }),
    ).toHaveAttribute("href", "/projects/nat");

    expect(
      screen.getByRole("link", {
        name: /Python · FastAPI · TypeScript · React/,
      }),
    ).toHaveAttribute("href", "#skills");
  });
});
