import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeRoutes = ["/", "/contact", "/projects/nat"] as const;

test("representative public routes support the system dark theme", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem("portfolio-theme");
  });

  await page.emulateMedia({ colorScheme: "dark" });

  for (const route of representativeRoutes) {
    await page.goto(route, { waitUntil: "networkidle" });

    const colours = await page.evaluate(() => {
      const body = getComputedStyle(document.body);

      return {
        background: body.backgroundColor,
        foreground: body.color,
      };
    });

    expect(colours.background, `${route} dark background`).toBe(
      "rgb(15, 19, 17)",
    );
    expect(colours.foreground, `${route} dark foreground`).toBe(
      "rgb(240, 243, 240)",
    );

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `${route} dark overflow`).toBe(false);

    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations, `${route} dark accessibility`).toEqual([]);
  }
});
