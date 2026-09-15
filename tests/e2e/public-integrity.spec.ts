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

const allowedExternalHosts = new Set(["github.com", "www.linkedin.com"]);

test("every public page has one coherent document structure", async ({
  page,
}) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route, {
      waitUntil: "networkidle",
    });

    expect(response?.ok(), `${route} should load successfully`).toBe(true);

    await expect(page.locator("html")).toHaveAttribute("lang", "en-AU");
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const duplicateIds = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")]
        .map((element) => element.id)
        .filter(Boolean);

      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });

    expect(duplicateIds, `${route} duplicate ids`).toEqual([]);

    const unsafeHrefs = await page
      .locator("a[href]")
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href") ?? "")
          .filter(
            (href) =>
              href === "" ||
              href === "#" ||
              href.toLowerCase().startsWith("javascript:"),
          ),
      );

    expect(unsafeHrefs, `${route} unsafe/empty links`).toEqual([]);

    const imagesWithoutAlt = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image) => !image.hasAttribute("alt"))
          .map((image) => image.getAttribute("src")),
      );

    expect(imagesWithoutAlt, `${route} images missing alt`).toEqual([]);

    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
      "content",
      /noindex/i,
    );

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");

    expect(canonical, `${route} canonical`).not.toBeNull();
    expect(new URL(canonical!).pathname).toBe(route);
  }
});

test("all internal links reachable from public pages resolve successfully", async ({
  page,
  request,
}) => {
  const internalPaths = new Set<string>();

  for (const route of publicRoutes) {
    await page.goto(route, {
      waitUntil: "networkidle",
    });

    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href") ?? ""),
      );

    for (const href of hrefs) {
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        continue;
      }

      const resolved = new URL(href, page.url());

      if (resolved.origin === new URL(page.url()).origin) {
        internalPaths.add(`${resolved.pathname}${resolved.search}`);
      } else {
        expect(
          allowedExternalHosts.has(resolved.hostname),
          `unexpected external host on ${route}: ${resolved.hostname}`,
        ).toBe(true);
      }
    }
  }

  expect(internalPaths.size).toBeGreaterThan(0);

  for (const path of [...internalPaths].sort()) {
    const response = await request.get(path);

    expect(
      response.ok(),
      `internal link ${path} should resolve successfully`,
    ).toBe(true);
  }
});

test("public pages do not expose obvious sensitive identifiers", async ({
  page,
}) => {
  const forbiddenPatterns = [
    /\bz\d{7}\b/i,
    /\+61[\s()-]*\d[\d\s()-]{7,}/,
    /subclass\s*(500|485)/i,
    /permanent\s+residen(cy|t)/i,
    /employer\s+sponsorship/i,
    /\/scenario\/(nodes|links)/i,
    /\/config\/(operational-intent|thresholds)/i,
  ];

  for (const route of publicRoutes) {
    await page.goto(route, {
      waitUntil: "networkidle",
    });

    const text = await page.locator("body").innerText();

    for (const pattern of forbiddenPatterns) {
      expect(text, `${route} should not match ${pattern}`).not.toMatch(pattern);
    }
  }
});
