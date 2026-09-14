import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "./page";

describe("ContactPage", () => {
  it("provides direct professional contact channels without a phone number", () => {
    const { container } = render(<ContactPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Interested in working together?",
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("link", {
        name: /devaanshk1630@gmail.com/,
      }),
    ).toHaveAttribute("href", "mailto:devaanshk1630@gmail.com");

    expect(
      screen.getByRole("link", {
        name: /Professional profile/,
      }),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/devaansh-kumar-31510cse/",
    );

    expect(screen.getByRole("link", { name: /dkumar315/ })).toHaveAttribute(
      "href",
      "https://github.com/dkumar315",
    );

    expect(screen.getByText("Sydney, Australia")).toBeVisible();

    expect(container.querySelector('a[href^="tel:"]')).not.toBeInTheDocument();
  });
});
