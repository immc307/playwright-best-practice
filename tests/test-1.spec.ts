import { test } from '@playwright/test';

test('Register new account', async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");
  await page.locator("div").nth(3).click();
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("register-link").click();
  await page.getByTestId("first-name").fill("Minh");
  await page.getByTestId("last-name").fill("Cao");
  await page.getByTestId("dob").fill("1990-07-30");
  await page.getByTestId("street").fill("Ton That Thuyet");
  await page.getByTestId("postal_code").fill("70000");
  await page.getByTestId("city").fill("HoChiMinh");
  await page.getByTestId("state").fill("Saigon");
  await page.getByTestId("country").selectOption("VN");
  await page.getByTestId("phone").fill("0909975200");
  await page.getByTestId("email").fill("immc307@gmail.com");
  await page.getByTestId("password").fill("Playwright@123");
  await page.getByTestId("register-submit").click();
});
