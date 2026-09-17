import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResumePage from "./page";

describe("ResumePage", () => {
  it("provides a concise engineering resume and direct recruiter actions", () => {
    render(<ResumePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Software engineering experience/,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("link", { name: /Download resume PDF/ }),
    ).toHaveAttribute("href", "/Devaansh-Kumar-Resume.pdf");

    expect(
      screen.getByRole("link", { name: /Call \+61 431 821 862/ }),
    ).toHaveAttribute("href", "tel:+61431821862");

    expect(screen.getByRole("link", { name: /Contact me/ })).toHaveAttribute(
      "href",
      "/contact",
    );

    expect(screen.getByText("Arms Operations Analysis Pty Ltd")).toBeVisible();
    expect(screen.getByText("RuptureLab")).toBeVisible();
    expect(screen.getByText("Network Analytic Tool")).toBeVisible();
    expect(screen.getByText("Wheat Crop Segmentation")).toBeVisible();
    expect(screen.queryByText("xRFM Benchmarking")).not.toBeInTheDocument();
  });
});
