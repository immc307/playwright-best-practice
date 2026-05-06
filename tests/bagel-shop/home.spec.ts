import { test, expect } from "@playwright/test";

test("Validate promo code popup", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const popupPromise = page.waitForEvent("popup");
  await page.locator("#popup-button").click();
  const popupPage = await popupPromise;
  await expect(popupPage.getByText("The promo code is:")).toBeVisible();
});
