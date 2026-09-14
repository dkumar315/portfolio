import { expect, test } from "@playwright/test";

test("projects page exposes the four deep case studies", async ({ page }) => {
  await page.goto("/projects");

  const links = page.getByRole("link", { name: /Read case study/ });

  await expect(links).toHaveCount(4);

  await expect(links.nth(0)).toHaveAttribute("href", "/projects/rupturelab");
  await expect(links.nth(1)).toHaveAttribute("href", "/projects/nat");
  await expect(links.nth(2)).toHaveAttribute(
    "href",
    "/projects/wheat-segmentation",
  );
  await expect(links.nth(3)).toHaveAttribute("href", "/projects/xrfm");
});

test("private case studies do not expose repository links", async ({
  page,
}) => {
  for (const route of [
    "/projects/nat",
    "/projects/wheat-segmentation",
    "/projects/xrfm",
  ]) {
    await page.goto(route);

    await expect(
      page.locator("main").getByRole("link", { name: /repository/i }),
    ).toHaveCount(0);
  }
});

test("RuptureLab case study serves all released screenshots", async ({
  page,
}) => {
  await page.goto("/projects/rupturelab");

  for (const asset of [
    "/projects/rupturelab/overview.png",
    "/projects/rupturelab/live-experiment.png",
    "/projects/rupturelab/result.png",
  ]) {
    const response = await page.request.get(asset);

    expect(response.ok()).toBe(true);
    expect((await response.body()).length).toBeGreaterThan(0);
  }
});

test("RuptureLab released screenshots decode in the rendered page", async ({
  page,
}) => {
  await page.goto("/projects/rupturelab");

  const images = [
    page.getByRole("img", {
      name: "RuptureLab overview showing recent experiments and system status",
    }),
    page.getByRole("img", {
      name: "RuptureLab live experiment showing baseline fault and recovery phases",
    }),
    page.getByRole("img", {
      name: "RuptureLab persisted experiment result and contract evaluation",
    }),
  ];

  for (const image of images) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();

    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            element instanceof HTMLImageElement &&
            element.complete &&
            element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});
