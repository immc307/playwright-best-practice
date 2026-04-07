import { test, expect } from "@playwright/test";

test.describe("Home page with no authentication", () => {
  test.beforeEach(async ({ page }) => {
    const productsResponse = page.waitForResponse(
      (r) => r.url().includes("/products") && r.request().method() === "GET",
    );
    await page.goto("/");
    await productsResponse;
    // THE FIX: Wait for a card that actually contains a product name!
    // This forces Playwright to ignore the empty grey skeleton loaders.
    const realProductCard = page
      .locator(".col-md-9 a.card", {
        has: page.locator('[data-test="product-name"]'),
      })
      .first();
    await expect(realProductCard).toBeVisible();
  });

  test("Visual test without authentication", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.locator('[data-test="nav-sign-in"]')],
      maskColor: "rgb(255 0 153 / 20%)",
    });
  });

  test("Check sign-in", async ({ page }) => {
    await expect(page.locator('[data-test="nav-sign-in"]')).toBeVisible();
    await expect(page.locator('[data-test="nav-sign-in"]')).toHaveText(
      "Sign in",
    );
  });

  test("Check title of the page", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0",
    );
  });

  test("Check search functionality", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(
      productGrid.locator("a.card", {
        has: page.locator('[data-test="product-name"]'),
      }),
    ).toHaveCount(9);
  });

  test("Check search functionality and search result", async ({
    page,
    isMobile,
  }) => {
    // Search for Thor Hammer and check the result
    if (isMobile === true) {
      await page.getByRole("button", { name: "Filters" }).click();
    }
    await page.locator('[data-test="search-query"]').fill("Thor Hammer");
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.locator('[data-test="search-term"]')).toHaveText(
      "Thor Hammer",
    );

    const productCards = page.locator(".col-md-9 a.card");
    // THE MAGIC STEP: Force Playwright to wait until the FIRST card updates to say "Thor Hammer".
    // Because it's an "expect", Playwright will automatically pause and retry this line
    // until the old 9 cards disappear and the new data renders!
    await expect(
      productCards.first().locator('[data-test="product-name"]'),
    ).toContainText("Thor Hammer");

    // NOW the DOM has settled, and it's 100% safe to count and loop!
    const count = await productCards.count();

    // Run the dynamic loop to check all results
    const allCards = await productCards.all();
    for (const card of allCards) {
      const productName = card.locator('[data-test="product-name"]');
      await expect(productName).toContainText("Thor Hammer");
    }
  });

  test("Check for inputs without labels", async ({ page }) => {
    const inputsWithoutLabels = await page.evaluate(() => {
      // Find inputs that are missing labels on page
      return Array.from(document.querySelectorAll("input"))
        .filter((input) => !document.querySelector(`label[for="${input.id}"]`))
        .map((input) => input.outerHTML);
    });

    expect(
      inputsWithoutLabels.length,
      `Found ${inputsWithoutLabels.length} input(s) missing labels:\n` +
        inputsWithoutLabels.map((html, i) => `  ${i + 1}. ${html}`).join("\n"),
    ).toBe(0);
  });
});

test.describe("Home page with authentication", () => {
  test.use({ storageState: ".auth/admin.json" });
  test.beforeEach(async ({ page }) => {
    const productsResponse = page.waitForResponse(
      (r) => r.url().includes("/products") && r.request().method() === "GET",
    );
    // 1. Navigate to the page
    await page.goto("/");
    await productsResponse;

    // 2. THE AUTH BARRICADE: Wait for Angular to process the token and update the header
    await expect(page.locator('[data-test="nav-sign-in"]')).toBeHidden();
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(
      "John Doe",
    );

    // 3. THE UI BARRICADE: Wait for the skeleton loaders to disappear and real products to render
    const realProductCard = page
      .locator(".col-md-9 a.card", {
        has: page.locator('[data-test="product-name"]'),
      })
      .first();
    await expect(realProductCard).toBeVisible();
  });

  test("Visual test with authentication", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-with-auth.png", {
      mask: [page.locator('[data-test="nav-menu"]')],
      maskColor: "rgb(255 0 153 / 20%)",
    });
  });

  test("Check sign-in", async ({ page }) => {
    // Because of the beforeEach block, this test is practically instantaneous!
    // It's a great sanity check to keep in your suite.
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(
      "John Doe",
    );
  });

  test("Validate product data is visible in UI from API", async ({ page }) => {
    let products: any;
    let apiUrl = process.env.API_URL;
    await test.step("intercept /products", async () => {
      await page.route(apiUrl + "/products**", async (route) => {
        const response = await route.fetch();
        products = await response.json();
        route.continue();
      });
    });

    await page.goto("/");

    const productGrid = page.locator(".col-md-9");
    await expect(productGrid).toBeVisible();
    await expect(page.locator(".skeleton").first()).not.toBeVisible();

    for (const product of products.data) {
      await expect(productGrid).toContainText(product.name);
      await expect(productGrid).toContainText(product.price.toString());
    }
  });
});

test("Validate product data is visible from modified API", async ({ page }) => {
  let apiUrl = process.env.API_URL;
  await test.step("overwrite /products", async () => {
    await page.route(apiUrl + "/products**", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.data[0]["name"] = "Mocked Product";
      json.data[0]["price"] = 100000;
      json.data[0]["in_stock"] = false;

      await route.fulfill({ response, json });
    });
  });
  await page.goto("/");

  const productGrid = page.locator(".col-md-9");
  await expect(productGrid.getByRole("link").first()).toContainText(
    "Mocked Product",
  );
  await expect(productGrid.getByRole("link").first()).toContainText("100000");
  await expect(productGrid.getByRole("link").first()).toContainText(
    "Out of stock",
  );
});

test("Validate brands by intercepting network data", async ({ page }) => {
  let brands: any;
  const apiUrl = process.env.API_URL;
  await test.step("intercept /brands", async () => {
    await page.route(apiUrl + "/brands", async (route) => {
      const response = await route.fetch();
      brands = await response.json();
      route.continue();
    });
  });
  await page.goto("/");

  const productGrid = page.locator(".col-md-9");
  await expect(productGrid).toBeVisible();
  await expect(page.locator(".skeleton").first()).not.toBeVisible();

  const brandFilterSection = page
    .locator("fieldset")
    .filter({ has: page.locator("legend", { hasText: "Brands" }) });

  for (const brand of brands) {
    await expect(brandFilterSection).toContainText(brand.name);
  }
});

test("Validate categories render in UI by mocking", async ({ page }) => {
  let categories: any;
  const apiUrl = process.env.API_URL;

  await test.step("intercept /categories", async () => {
    await page.route(apiUrl + "/categories/tree", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      categories = json.data;

      json[0].name = "Mocked Category";
      if (json[0].sub_categories && json[0].sub_categories.length > 0) {
        json[0].sub_categories[0].name = "Mocked Subcategory";
      }
      await route.fulfill({ response, json });
    });
  });
  await page.goto("/");

  const productGrid = page.locator(".col-md-9");
  await expect(productGrid).toBeVisible();
  await expect(page.locator(".skeleton").first()).not.toBeVisible();

  const categoryFilterSection = page
    .locator("fieldset")
    .filter({ has: page.locator("legend", { hasText: "Categories" }) })
    .first();

  await expect(categoryFilterSection).toContainText("Mocked Category");
  await expect(categoryFilterSection).toContainText("Mocked Subcategory");
});