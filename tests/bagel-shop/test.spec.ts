import { test, expect } from "@playwright/test";

test("Bagel Shop Smoke Test", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(
    page.getByText("The best bagels in town since 1995!")
  ).toBeVisible();
});
