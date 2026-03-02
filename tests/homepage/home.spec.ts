import { test, expect } from "@playwright/test";

test.describe("Home page with no authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    // THE FIX: Wait for a card that actually contains a product name!
    // This forces Playwright to ignore the empty grey skeleton loaders.
    const realProductCard = page.locator(".col-md-9 a.card", {has: page.locator('[data-test="product-name"]')}).first();
    await expect(realProductCard).toBeVisible();
  });

  test("Visual test without authentication", async ({page}) => {
    //await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.locator('[data-test="nav-sign-in"]')], 
      maskColor: "rgb(255 0 153 / 20%)"
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
    //await expect(productGrid.getByRole("link")).toHaveCount(9);
    await expect(productGrid.locator("a.card")).toHaveCount(9);
  });

  test("Check search functionality and search result", async ({ page }) => {
    // Search for Thor Hammer and check the result
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
});

test.describe("Home page with authentication", () => {
  test.use({ storageState: ".auth/admin.json" });
  test.beforeEach(async ({ page }) => {
    // 1. Navigate to the page
    await page.goto("https://practicesoftwaretesting.com/");

    // 2. THE AUTH BARRICADE: Wait for Angular to process the token and update the header
    await expect(page.locator('[data-test="nav-sign-in"]')).toBeHidden();
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(
      "John Doe",
    );

    // 3. THE UI BARRICADE: Wait for the skeleton loaders to disappear and real products to render
    const realProductCard = page.locator(".col-md-9 a.card", {has: page.locator('[data-test="product-name"]')}).first();
    await expect(realProductCard).toBeVisible();
  });

  test("Visual test with authentication", async ({ page }) => {
    // Playwright will now take the photo safely AFTER the user is logged in
    // and the products are fully visible on the screen.
    //await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-with-auth.png", {
      mask: [page.locator('[data-test="nav-menu-minh"]')],
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
});
