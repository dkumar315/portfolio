import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "./page";

describe("AboutPage", () => {
  it("shows professional narrative, skills and education", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /I like building software I can explain/,
      }),
    ).toBeVisible();

    expect(screen.getByText("Backend & APIs")).toBeVisible();
    expect(screen.getByRole("heading", { name: "UNSW Sydney" })).toBeVisible();
    expect(screen.getByText("UNSW Employability Award 2026")).toBeVisible();
  });
});
