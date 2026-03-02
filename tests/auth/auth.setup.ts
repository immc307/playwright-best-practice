import { test as setup, expect } from "@playwright/test";

setup("Create admin auth", async ({ page, context }) => {
  const email = "admin@practicesoftwaretesting.com";
  const password = "welcome01";
  const adminAuthFile = ".auth/admin.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();
  await page.waitForLoadState("networkidle");
  await expect(page.locator('[data-test="nav-menu"]')).toContainText("John Doe");
  await context.storageState({ path: adminAuthFile });
});
