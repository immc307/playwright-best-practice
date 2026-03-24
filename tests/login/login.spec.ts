import { test, expect } from "@fixtures/base.fixture";
import { registerUser } from "@datafactory/register";

test("Login with valid credentials", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("admin@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe",
  );
  await page.locator('[data-test="nav-menu"]').click();
});

test("Login with page object", async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login("admin@practicesoftwaretesting.com", "welcome01");
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe",
  );
});

test("Login with newly registered user", async ({ page, loginPage }) => {
  const email = `newUser${Date.now()}@test.com`;
  const password = `P@ssword_${Date.now()}`;

  await registerUser(email, password);
  await loginPage.goto();
  await loginPage.login(email, password);

  await page.waitForURL("**/account");
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Minh Cao",
  );
});

test("Login with fixture", async ({ loginPage, accountPage, pageConsole }) => {
  const email = `newUser${Date.now()}@test.com`;
  const password = `P@ssword_${Date.now()}`;

  await registerUser(email, password);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(accountPage.navMenu).toContainText("Minh Cao");
  await expect(accountPage.pageTitle).toContainText("Sales over the years");
});