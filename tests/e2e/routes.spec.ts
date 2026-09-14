import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  ["/", /Backend-minded\. Full-stack capable\./],
  ["/experience", /Engineering work across product/],
  ["/projects", /Selected work across full-stack/],
  ["/about", /Software engineering with breadth/],
  ["/resume", /Software engineering experience/],
  ["/contact", /Interested in working together/],
  ["/projects/rupturelab", /Building a repeatable API resilience workbench/],
  ["/projects/nat", /Integrating simulation, monitoring and recovery/],
  ["/projects/wheat-segmentation", /Comparing four segmentation paradigms/],
  ["/projects/xrfm", /Evaluating xRFM against strong tabular baselines/],
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

test("mobile contact email remains a clean single line", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.includes("mobile"),
    "mobile-layout regression check",
  );

  await page.goto("/contact");

  const email = page.getByRole("heading", {
    level: 2,
    name: "devaanshk1630@gmail.com",
  });

  await expect(email).toBeVisible();

  const metrics = await email.evaluate((element) => {
    const styles = window.getComputedStyle(element);
    const lineHeight = Number.parseFloat(styles.lineHeight);
    const height = element.getBoundingClientRect().height;

    return { height, lineHeight };
  });

  expect(metrics.height).toBeLessThan(metrics.lineHeight * 1.5);
});
