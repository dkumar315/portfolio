import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigationState = vi.hoisted(() => ({
  pathname: "/",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

import { SiteNavigation } from "./site-navigation";

describe("SiteNavigation", () => {
  beforeEach(() => {
    navigationState.pathname = "/";
  });

  it("shows Home explicitly and marks it as the current page", () => {
    render(<SiteNavigation />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Experience" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("keeps Projects active on the index and project case-study routes", () => {
    navigationState.pathname = "/projects";
    const { rerender } = render(<SiteNavigation />);

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    navigationState.pathname = "/projects/nat";
    rerender(<SiteNavigation />);

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks a normal route and leaves unknown routes unselected", () => {
    navigationState.pathname = "/resume";
    const { rerender } = render(<SiteNavigation />);

    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    navigationState.pathname = "/not-a-public-route";
    rerender(<SiteNavigation />);

    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });
});
