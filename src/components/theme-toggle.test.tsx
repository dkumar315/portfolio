import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = "light";
    window.localStorage.clear();
  });

  it("switches from light to dark and remembers the choice", () => {
    render(<ThemeToggle />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Toggle light and dark mode",
      }),
    );

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
  });

  it("switches from dark back to light", () => {
    document.documentElement.dataset.theme = "dark";
    render(<ThemeToggle />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Toggle light and dark mode",
      }),
    );

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("portfolio-theme")).toBe("light");
  });
});
