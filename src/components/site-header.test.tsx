import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

describe("SiteHeader", () => {
  it("shows the portfolio identity", () => {
    render(<SiteHeader />);

    expect(screen.getByText(site.name)).toBeInTheDocument();
    expect(screen.getByText(site.role)).toBeInTheDocument();
  });

  it("links to the external engineering profiles", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      site.github,
    );

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      site.linkedin,
    );
  });

  it("links the portfolio identity back to the home page", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: /Devaansh Kumar/i }),
    ).toHaveAttribute("href", "/");
  });
});
