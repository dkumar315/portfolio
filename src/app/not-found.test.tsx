import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "./not-found";

describe("NotFound", () => {
  it("offers useful recovery paths without exposing irrelevant detail", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "This route does not exist." }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Back home →" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
  });
});
