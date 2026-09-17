import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ExperiencePage from "./page";

describe("ExperiencePage", () => {
  it("shows engineering and leadership experience", () => {
    render(<ExperiencePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Software engineering across product/,
      }),
    ).toBeVisible();

    expect(screen.getByText("Arms Operations Analysis Pty Ltd")).toBeVisible();
    expect(screen.getByText("Tandem Learning")).toBeVisible();
    expect(screen.getAllByText("Shalom College UNSW").length).toBeGreaterThan(
      0,
    );
  });
});
