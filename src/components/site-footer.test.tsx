import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

describe("SiteFooter", () => {
  it("shows the portfolio owner and contact address", () => {
    render(<SiteFooter />);

    expect(screen.getByText(`© 2026 ${site.name}`)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});
