import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("skip link moves keyboard focus directly to main content", async ({
  page,
}) => {
  await page.goto("/");

  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("reduced-motion preference disables decorative transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const action = page.getByRole("link", { name: "Get in touch →" });

  expect(
    await action.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    ),
  ).toBe("0s");

  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
});

test("external new-tab links explicitly protect the opener", async ({
  page,
}) => {
  await page.goto("/");

  const externalLinks = page.locator('a[target="_blank"]');
  const count = await externalLinks.count();

  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const rel = (await externalLinks.nth(index).getAttribute("rel")) ?? "";

    expect(rel.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );
  }
});

test("site publishes working favicon, large social image and theme metadata", async ({
  page,
  request,
}) => {
  await page.goto("/");

  const iconHref = await page
    .locator('link[rel="icon"][href*="/icon.svg"]')
    .getAttribute("href");

  expect(iconHref).not.toBeNull();

  const iconResponse = await request.get(iconHref!);
  expect(iconResponse.ok()).toBe(true);
  expect(iconResponse.headers()["content-type"]).toContain("image/svg+xml");

  const socialImage = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");

  expect(socialImage).not.toBeNull();

  const socialImageUrl = new URL(socialImage!);
  const socialResponse = await request.get(
    `${socialImageUrl.pathname}${socialImageUrl.search}`,
  );

  expect(socialResponse.ok()).toBe(true);
  expect(socialResponse.headers()["content-type"]).toContain("image/png");
  expect((await socialResponse.body()).byteLength).toBeGreaterThan(5_000);

  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#f5f4ef",
  );
});

test("unknown routes return a useful accessible 404", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);

  await expect(
    page.getByRole("heading", { name: "This route does not exist." }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "Back home →" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View projects" })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
