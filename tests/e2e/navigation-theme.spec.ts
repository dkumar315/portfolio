import { expect, test } from "@playwright/test";

test("navigation makes Home explicit and highlights the current section", async ({
  page,
}) => {
  await page.goto("/projects/nat");

  const visibleNavigation = page.locator(
    'nav[aria-label="Primary navigation"]:visible',
  );

  await expect(
    visibleNavigation.getByRole("link", { name: "Home" }),
  ).toBeVisible();

  await expect(
    visibleNavigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "page");

  await expect(
    visibleNavigation.getByRole("link", { name: "Experience" }),
  ).not.toHaveAttribute("aria-current", "page");

  await page.goto("/");

  await expect(
    page
      .locator('nav[aria-label="Primary navigation"]:visible')
      .getByRole("link", { name: "Home" }),
  ).toHaveAttribute("aria-current", "page");
});

test("theme toggle overrides the device preference and persists", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });

  await page.addInitScript(() => {
    if (!window.sessionStorage.getItem("theme-test-initialized")) {
      window.localStorage.removeItem("portfolio-theme");
      window.sessionStorage.setItem("theme-test-initialized", "1");
    }
  });

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page
    .getByRole("button", {
      name: "Toggle light and dark mode",
    })
    .click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  expect(
    await page.evaluate(() => window.localStorage.getItem("portfolio-theme")),
  ).toBe("light");

  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});
