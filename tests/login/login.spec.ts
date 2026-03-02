import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page/login/loginPage";

test("Login with valid credentials", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("admin@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await page.locator('[data-test="nav-menu"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe",
  );
});

test("Login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  // await loginPage.email.fill("admin@practicesoftwaretesting.com");
  // await loginPage.password.fill("welcome01");
  // await loginPage.loginSubmit.click();
  await loginPage.login("admin@practicesoftwaretesting.com", "welcome01");
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe",
  );
});
