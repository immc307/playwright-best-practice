import { test, expect } from "@playwright/test";

test.describe("Checkout tests", () => {
  test.use({ storageState: ".auth/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.waitForLoadState("networkidle");
    await page.locator("[data-test='nav-home']").click();
    const realProductCard = page
      .locator(".col-md-9 a.card", {
        has: page.locator('[data-test="product-name"]'),
      })
      .first();
    await expect(realProductCard).toBeVisible();
  });

  test("By now pay later", async ({ page, headless }) => {
    // Add a specific product to the cart
    await page.getByText("Claw Hammer with Shock Reduction Grip").click();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText("1");

    // Proceed to checkout
    await page.locator('[data-test="nav-cart"]').click();
    await page.locator('[data-test="proceed-1"]').click(); // Go to step 2 (Login/Auth handled by storageState)
    await page.locator('[data-test="proceed-2"]').click(); // Go to step 3 (Address)

    // Verify we are on the Address step
    await expect(
      page.locator(".step-indicator").filter({ hasText: "2" }),
    ).toHaveCSS("background-color", "rgb(51, 153, 51)");

    // Fill in billing/shipping address
    await page.getByTestId("street").fill("123 Testing Address");
    await page.getByTestId("city").fill("Saigon");
    await page.getByTestId("state").fill("HoChiMinh");
    await page.getByTestId("country").fill("Vietnam");
    await page.getByTestId("postal_code").fill("70000");
    await page.getByTestId("proceed-3").click(); // Go to step 4 (Payment)

    // Select payment method and confirm
    await expect(page.getByTestId("finish")).toBeDisabled(); // Finish button disabled until payment selected
    await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
    await page
      .getByTestId("monthly_installments")
      .selectOption("6 Monthly Installments");
    await page.getByTestId("finish").click();

    // Verify successful payment message
    await expect(page.locator(".help-block")).toHaveText(
      "Payment was successful",
    );
    // Keep the browser open to see the result
    headless
      ? await test.step("", async () => {
          await expect(page).toHaveScreenshot("checkout.png", {
            mask: [page.getByTitle("Practice Software Testing - Toolshop - v5.0")],
            maskColor: "rgb(255 0 153 / 20%)",
          });
        })
      : console.log("Running in Headed mode, no screenshot taken")
  });
});
