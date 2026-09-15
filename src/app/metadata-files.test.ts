import { afterEach, describe, expect, it } from "vitest";

import robots from "./robots";
import sitemap from "./sitemap";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe("metadata files", () => {
  it("allows public crawling and advertises the sitemap", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";

    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://portfolio.example.com/sitemap.xml",
    });
  });

  it("lists every public portfolio route exactly once", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";

    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toHaveLength(10);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toEqual([
      "https://portfolio.example.com/",
      "https://portfolio.example.com/experience",
      "https://portfolio.example.com/projects",
      "https://portfolio.example.com/about",
      "https://portfolio.example.com/resume",
      "https://portfolio.example.com/contact",
      "https://portfolio.example.com/projects/rupturelab",
      "https://portfolio.example.com/projects/nat",
      "https://portfolio.example.com/projects/wheat-segmentation",
      "https://portfolio.example.com/projects/xrfm",
    ]);
  });
});
