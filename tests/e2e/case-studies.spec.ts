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

test("RuptureLab gallery does not stretch shorter screenshots into empty dark cards", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name.includes("mobile"),
    "desktop two-column gallery regression check",
  );

  await page.goto("/projects/rupturelab");

  const image = page.getByRole("img", {
    name: "RuptureLab live experiment showing baseline fault and recovery phases",
  });

  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();

  const excessHeight = await image.evaluate((element) => {
    const imageBox = element.getBoundingClientRect();
    const figureBox = element.closest("figure")?.getBoundingClientRect();

    if (!figureBox) {
      throw new Error("Expected the screenshot to be inside a figure.");
    }

    return figureBox.height - imageBox.height;
  });

  expect(excessHeight).toBeLessThan(40);
});

test("RuptureLab lower evidence panels stay visually balanced on desktop", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name.includes("mobile"),
    "desktop two-column evidence layout check",
  );

  await page.goto("/projects/rupturelab");

  const liveImage = page.getByRole("img", {
    name: "RuptureLab live experiment showing baseline fault and recovery phases",
  });
  const resultImage = page.getByRole("img", {
    name: "RuptureLab persisted experiment result and contract evaluation",
  });

  await liveImage.scrollIntoViewIfNeeded();
  await resultImage.scrollIntoViewIfNeeded();

  const heights = await Promise.all(
    [liveImage, resultImage].map((image) =>
      image.evaluate((element) => {
        const figure = element.closest("figure");

        if (!figure) {
          throw new Error("Expected screenshot inside a figure.");
        }

        return figure.getBoundingClientRect().height;
      }),
    ),
  );

  expect(Math.abs(heights[0] - heights[1])).toBeLessThan(40);
});
