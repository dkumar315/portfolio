import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResumePage from "./page";

describe("ResumePage", () => {
  it("provides the resume summary and a safe PDF contact path", () => {
    render(<ResumePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Software engineering experience/,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("link", { name: /Contact for PDF/ }),
    ).toHaveAttribute("href", "/contact");

    expect(screen.getByText("Arms Operations Analysis Pty Ltd")).toBeVisible();
    expect(screen.getByText("RuptureLab")).toBeVisible();
  });
});
