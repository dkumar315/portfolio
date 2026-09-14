import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  ["/", /Backend-minded\. Full-stack capable\./],
  ["/experience", /Engineering work across product/],
  ["/projects", /Selected work across full-stack/],
  ["/about", /Software engineering with breadth/],
  ["/resume", /Software engineering experience/],
  ["/contact", /Interested in working together/],
] as const;

for (const [route, heading] of routes) {
  test(`${route} renders accessibly without horizontal overflow`, async ({
    page,
  }) => {
    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: heading,
      }),
    ).toBeVisible();

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasOverflow).toBe(false);

    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations).toEqual([]);
  });
}
