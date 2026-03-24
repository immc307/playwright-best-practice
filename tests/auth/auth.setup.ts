import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../../lib/pages/login/login.page";

setup("Create admin auth", async ({ page, context }) => {
  const email = "admin@practicesoftwaretesting.com";
  const password = "welcome01";
  const adminAuthFile = ".auth/admin.json";

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await page.waitForLoadState("networkidle");
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe",
  );
  await context.storageState({ path: adminAuthFile });
});
