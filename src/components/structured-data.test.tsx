import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { StructuredData } from "./structured-data";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe("StructuredData", () => {
  it("publishes restrained Person and WebSite schema", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";

    const { container } = render(<StructuredData />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script).not.toBeNull();

    const data = JSON.parse(script?.textContent ?? "{}");

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"]).toHaveLength(2);

    expect(data["@graph"][0]).toMatchObject({
      "@type": "Person",
      "@id": "https://portfolio.example.com/#person",
      name: "Devaansh Kumar",
      jobTitle: "Software Engineer",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "UNSW Sydney",
      },
    });

    expect(data["@graph"][0].sameAs).toEqual([
      "https://github.com/dkumar315",
      "https://www.linkedin.com/in/devaansh-kumar-31510cse/",
    ]);

    expect(data["@graph"][1]).toMatchObject({
      "@type": "WebSite",
      "@id": "https://portfolio.example.com/#website",
      url: "https://portfolio.example.com",
      name: "Devaansh Kumar Portfolio",
    });
  });
});
