import { expect, test } from "@playwright/test";

const routeMetadata = [
  [
    "/",
    /Devaansh Kumar \| Software Engineer/,
    /Sydney-based software engineer who completed a Bachelor of Science/,
  ],
  [
    "/experience",
    /Experience \| Devaansh Kumar/,
    /Software engineering experience/,
  ],
  [
    "/projects",
    /Projects \| Devaansh Kumar/,
    /Selected software engineering projects/,
  ],
  ["/about", /About \| Devaansh Kumar/, /About Devaansh Kumar/],
  ["/resume", /Resume \| Devaansh Kumar/, /Resume for Devaansh Kumar/],
  ["/contact", /Contact \| Devaansh Kumar/, /Contact Devaansh Kumar/],
  [
    "/projects/rupturelab",
    /RuptureLab Case Study \| Devaansh Kumar/,
    /independent full-stack API resilience workbench/,
  ],
  [
    "/projects/nat",
    /Network Analytic Tool Case Study \| Devaansh Kumar/,
    /Public-safe case study/,
  ],
  [
    "/projects/wheat-segmentation",
    /Wheat Crop Segmentation Case Study \| Devaansh Kumar/,
    /classical, clustering, graph-based and deep-learning/,
  ],
  [
    "/projects/xrfm",
    /xRFM Benchmarking Case Study \| Devaansh Kumar/,
    /benchmarking xRFM against Random Forest and XGBoost/,
  ],
] as const;

test("all public routes publish unique recruiter-facing metadata", async ({
  page,
}) => {
  const titles = new Set<string>();

  for (const [route, titlePattern, descriptionPattern] of routeMetadata) {
    await page.goto(route);

    await expect(page).toHaveTitle(titlePattern);

    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      descriptionPattern,
    );

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");

    expect(canonical).not.toBeNull();
    expect(new URL(canonical!).pathname).toBe(route);

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      titlePattern,
    );

    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", descriptionPattern);

    const image = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");

    expect(image).not.toBeNull();
    expect(new URL(image!).pathname).toContain("/opengraph-image");

    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  }
});

test("home publishes structured Person and WebSite data", async ({ page }) => {
  await page.goto("/");

  const text = await page
    .locator('script[type="application/ld+json"]')
    .textContent();

  expect(text).not.toBeNull();

  const data = JSON.parse(text!);

  expect(data["@context"]).toBe("https://schema.org");
  expect(
    data["@graph"].map((entry: { "@type": string }) => entry["@type"]),
  ).toEqual(["Person", "WebSite"]);
});

test("robots and sitemap expose the public portfolio surface", async ({
  request,
}) => {
  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);

  const robotsText = await robotsResponse.text();
  expect(robotsText).toContain("User-Agent: *");
  expect(robotsText).toContain("Allow: /");
  expect(robotsText).toContain("Sitemap:");

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);

  const sitemapText = await sitemapResponse.text();

  for (const [route] of routeMetadata) {
    const suffix = route === "/" ? "/" : route;
    expect(sitemapText).toContain(suffix);
  }
});
