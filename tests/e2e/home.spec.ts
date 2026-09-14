import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("portfolio home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("presents the primary engineering identity and actions", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Devaansh Kumar \| Software Engineer/);

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Backend-minded\. Full-stack capable\./i,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Get in touch" }),
    ).toHaveAttribute("href", "mailto:devaanshk1630@gmail.com");

    await expect(
      page.getByRole("link", { name: "View GitHub" }),
    ).toHaveAttribute("href", "https://github.com/dkumar315");
  });

  test("publishes useful metadata", async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Software engineer and UNSW Computer Science graduate/,
    );

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Devaansh Kumar | Software Engineer",
    );
  });

  test("does not overflow horizontally", async ({ page }) => {
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  });

  test("has no automatically detectable accessibility violations", async ({
    page,
  }) => {
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
