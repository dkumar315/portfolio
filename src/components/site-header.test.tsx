import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { primaryNavigation } from "@/content/portfolio";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("shows the portfolio identity", () => {
    render(<SiteHeader />);

    expect(screen.getByText("Devaansh Kumar")).toBeVisible();
    expect(screen.getByText("Software Engineer")).toBeVisible();
  });

  it("contains the complete primary navigation", () => {
    render(<SiteHeader />);

    for (const item of primaryNavigation) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("links to external engineering profiles", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: /GitHub/ })[0]).toHaveAttribute(
      "href",
      "https://github.com/dkumar315",
    );

    expect(
      screen.getAllByRole("link", { name: /LinkedIn/ })[0],
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/devaansh-kumar-31510cse/",
    );
  });
});
