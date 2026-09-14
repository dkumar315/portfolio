import { afterEach, describe, expect, it } from "vitest";

import { createPageMetadata, getSiteUrl } from "./metadata";

const originalPublicUrl = process.env.NEXT_PUBLIC_SITE_URL;
const originalVercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

afterEach(() => {
  if (originalPublicUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalPublicUrl;
  }

  if (originalVercelUrl === undefined) {
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  } else {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = originalVercelUrl;
  }
});

describe("getSiteUrl", () => {
  it("uses localhost when no deployment URL is available", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;

    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
  });

  it("prefers the explicitly configured public URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "portfolio.vercel.app";

    expect(getSiteUrl().toString()).toBe("https://portfolio.example.com/");
  });

  it("normalises a Vercel production hostname", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "portfolio.vercel.app";

    expect(getSiteUrl().toString()).toBe("https://portfolio.vercel.app/");
  });
});

describe("createPageMetadata", () => {
  it("creates canonical, Open Graph and Twitter metadata", () => {
    const metadata = createPageMetadata({
      title: "Projects",
      description: "Selected software engineering projects.",
      path: "/projects",
    });

    expect(metadata).toMatchObject({
      title: "Projects",
      description: "Selected software engineering projects.",
      alternates: {
        canonical: "/projects",
      },
      openGraph: {
        type: "website",
        locale: "en_AU",
        siteName: "Devaansh Kumar",
        title: "Projects | Devaansh Kumar",
        description: "Selected software engineering projects.",
        url: "/projects",
      },
      twitter: {
        card: "summary",
        title: "Projects | Devaansh Kumar",
        description: "Selected software engineering projects.",
      },
    });
  });
});
