import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { primaryNavigation } from "@/content/portfolio";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("keeps footer navigation consistent with the primary navigation", () => {
    render(<SiteFooter />);

    expect(screen.getByText("Devaansh Kumar")).toBeVisible();

    for (const item of primaryNavigation) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    expect(
      screen.queryByText("devaanshk1630@gmail.com"),
    ).not.toBeInTheDocument();
  });
});
