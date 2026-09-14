import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("shows the owner and professional contact path", () => {
    render(<SiteFooter />);

    expect(screen.getByText("Devaansh Kumar")).toBeVisible();

    expect(
      screen.getByRole("link", { name: "devaanshk1630@gmail.com" }),
    ).toHaveAttribute("href", "mailto:devaanshk1630@gmail.com");
  });
});
