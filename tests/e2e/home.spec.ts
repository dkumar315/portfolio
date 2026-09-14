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
  test("keeps engineering snapshot content padded away from cell edges", async ({
    page,
  }) => {
    const snapshot = page.getByRole("region", {
      name: "Engineering snapshot",
    });

    const cells = snapshot.locator(":scope > div");
    await expect(cells).toHaveCount(4);

    const gaps = await cells.evaluateAll((elements) =>
      elements.map((element) => {
        const cell = element.getBoundingClientRect();
        const firstText = element.querySelector("p")?.getBoundingClientRect();

        if (!firstText) {
          return { left: 0, right: 0 };
        }

        return {
          left: firstText.left - cell.left,
          right: cell.right - firstText.right,
        };
      }),
    );

    for (const gap of gaps) {
      expect(gap.left).toBeGreaterThanOrEqual(16);
      expect(gap.right).toBeGreaterThanOrEqual(16);
    }
  });

  test("uses one clean divider between experience and the next section", async ({
    page,
  }) => {
    const heading = page.getByRole("heading", {
      level: 2,
      name: "Production software experience",
    });

    const section = heading.locator("xpath=ancestor::section[1]");
    const lastExperience = section.locator("article").last();

    const borderBottomWidth = await lastExperience.evaluate(
      (element) => getComputedStyle(element).borderBottomWidth,
    );

    expect(borderBottomWidth).toBe("0px");
  });

  test("loads the production design system", async ({ page }) => {
    const styles = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const header = document.querySelector("header");

      return {
        background: body.backgroundColor,
        color: body.color,
        margin: body.margin,
        fontFamily: body.fontFamily,
        headerPosition: header ? getComputedStyle(header).position : "",
        stylesheetCount: document.styleSheets.length,
      };
    });

    expect(styles.background).toBe("rgb(245, 244, 239)");
    expect(styles.color).toBe("rgb(21, 24, 22)");
    expect(styles.margin).toBe("0px");
    expect(styles.fontFamily).toContain("Geist");
    expect(styles.headerPosition).toBe("sticky");
    expect(styles.stylesheetCount).toBeGreaterThan(0);
  });
});
