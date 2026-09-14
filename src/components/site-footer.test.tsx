import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("keeps footer navigation concise", () => {
    render(<SiteFooter />);

    expect(screen.getByText("Devaansh Kumar")).toBeVisible();

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects",
    );

    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/experience",
    );

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );

    expect(
      screen.queryByText("devaanshk1630@gmail.com"),
    ).not.toBeInTheDocument();
  });
});
