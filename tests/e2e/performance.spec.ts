import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/experience",
  "/projects",
  "/about",
  "/resume",
  "/contact",
  "/projects/rupturelab",
  "/projects/nat",
  "/projects/wheat-segmentation",
  "/projects/xrfm",
] as const;

const MAX_ENCODED_KIB = 400;
const MAX_SCRIPT_KIB = 200;
const MAX_CLS = 0.1;

test("public routes stay within conservative production budgets", async ({
  browser,
}) => {
  // This test traverses every public route. The timeout below is
  // wall-clock headroom only; the per-route performance budgets
  // asserted by this test remain unchanged.
  test.setTimeout(60_000);
  for (const route of publicRoutes) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    page.on("requestfailed", (request) => {
      failedRequests.push(
        `${request.method()} ${request.url()} :: ${
          request.failure()?.errorText ?? "unknown"
        }`,
      );
    });

    await page.addInitScript(() => {
      window.__portfolioCls = 0;

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (
            "hadRecentInput" in entry &&
            !entry.hadRecentInput &&
            "value" in entry
          ) {
            window.__portfolioCls += Number(entry.value);
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    const response = await page.goto(route, {
      waitUntil: "networkidle",
    });

    expect(response?.ok(), `${route} should return a successful response`).toBe(
      true,
    );

    await page.waitForTimeout(250);

    const metrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");

      let encodedBytes = 0;
      let scriptBytes = 0;

      for (const entry of resources) {
        const resource = entry as PerformanceResourceTiming;
        const size = resource.encodedBodySize || resource.transferSize || 0;

        encodedBytes += size;

        if (resource.initiatorType === "script") {
          scriptBytes += size;
        }
      }

      const invalidImages = [...document.images]
        .filter(
          (image) =>
            image.naturalWidth === 0 ||
            image.naturalHeight === 0 ||
            image.width === 0 ||
            image.height === 0,
        )
        .map((image) => image.currentSrc || image.src);

      return {
        cls: window.__portfolioCls,
        encodedKiB: encodedBytes / 1024,
        scriptKiB: scriptBytes / 1024,
        invalidImages,
      };
    });

    expect(metrics.cls, `${route} CLS`).toBeLessThanOrEqual(MAX_CLS);

    expect(
      metrics.encodedKiB,
      `${route} encoded transfer budget`,
    ).toBeLessThanOrEqual(MAX_ENCODED_KIB);

    expect(
      metrics.scriptKiB,
      `${route} script transfer budget`,
    ).toBeLessThanOrEqual(MAX_SCRIPT_KIB);

    expect(metrics.invalidImages, `${route} image decode/size`).toEqual([]);
    expect(consoleErrors, `${route} console errors`).toEqual([]);
    expect(pageErrors, `${route} page errors`).toEqual([]);
    expect(failedRequests, `${route} failed requests`).toEqual([]);

    await context.close();
  }
});

test("production responses do not disclose the Next.js powered-by header", async ({
  request,
}) => {
  const response = await request.get("/");

  expect(response.ok()).toBe(true);
  expect(response.headers()["x-powered-by"]).toBeUndefined();
});
