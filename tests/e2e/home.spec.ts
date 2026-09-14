import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("portfolio home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("presents the primary engineering identity and recruiter actions", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Backend-minded\. Full-stack capable\./,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /View projects/ }),
    ).toHaveAttribute("href", "/projects");

    await expect(
      page.getByRole("link", { name: /Contact me/ }),
    ).toHaveAttribute("href", "/contact");
  });

  test("shows released RuptureLab visual evidence", async ({ page }) => {
    const image = page.getByRole("img", {
      name: "RuptureLab experiment overview dashboard",
    });

    await expect(image).toBeVisible();

    const assetResponse = await page.request.get(
      "/projects/rupturelab/overview.png",
    );

    expect(assetResponse.ok()).toBe(true);
    expect((await assetResponse.body()).length).toBeGreaterThan(0);
  });

  test("keeps primary navigation on one visual row", async ({ page }) => {
    const navigation = page
      .getByRole("navigation", {
        name: "Primary navigation",
      })
      .last();

    const tops = await navigation
      .getByRole("link")
      .evaluateAll((links) =>
        links.map((link) => Math.round(link.getBoundingClientRect().top)),
      );

    expect(new Set(tops).size).toBe(1);
  });

  test("publishes useful metadata", async ({ page }) => {
    await expect(page).toHaveTitle(/Devaansh Kumar/);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /software engineer/i,
    );
  });

  test("does not overflow horizontally", async ({ page }) => {
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasOverflow).toBe(false);
  });

  test("has no automatically detectable accessibility violations", async ({
    page,
  }) => {
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
