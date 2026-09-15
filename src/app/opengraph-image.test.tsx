import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/og", () => ({
  ImageResponse: class MockImageResponse {
    element: unknown;
    options: unknown;

    constructor(element: unknown, options: unknown) {
      this.element = element;
      this.options = options;
    }
  },
}));

import OpenGraphImage, { alt, contentType, size } from "./opengraph-image";

describe("OpenGraphImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defines a standard large social-card surface", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toContain("Devaansh Kumar");
    expect(alt).toContain("Software Engineer");
  });

  it("renders the branded social card at the declared dimensions", () => {
    const response = OpenGraphImage() as unknown as {
      element: unknown;
      options: unknown;
    };

    expect(response.element).toBeTruthy();
    expect(response.options).toEqual(size);
  });
});
