import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "./page";

describe("ContactPage", () => {
  it("provides direct professional contact channels", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Interested in working together?",
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("link", { name: /devaanshk1630@gmail.com/ }),
    ).toHaveAttribute("href", "mailto:devaanshk1630@gmail.com");

    expect(screen.getByText("Sydney, Australia")).toBeVisible();
  });
});
