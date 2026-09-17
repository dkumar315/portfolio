import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { primaryNavigation } from "@/content/portfolio";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("shows the portfolio identity, Sydney and an explicit Home route", () => {
    render(<SiteHeader />);

    expect(screen.getByText("Devaansh Kumar")).toBeVisible();
    expect(screen.getByText("Software Engineer · Sydney")).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);
  });

  it("contains desktop and responsive copies of the primary navigation", () => {
    render(<SiteHeader />);

    for (const item of primaryNavigation) {
      const links = screen.getAllByRole("link", { name: item.label });

      expect(links).toHaveLength(2);

      for (const link of links) {
        expect(link).toHaveAttribute("href", item.href);
      }
    }
  });

  it("links external profiles and exposes the theme toggle", () => {
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

    expect(
      screen.getByRole("button", {
        name: "Toggle light and dark mode",
      }),
    ).toBeVisible();
  });
});
