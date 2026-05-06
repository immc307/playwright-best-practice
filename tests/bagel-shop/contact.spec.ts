import { test, expect } from "@playwright/test";

test("Send message through contact page", async ({ page, context }) => {
  await page.goto("http://localhost:5173/");
  const contactPagePromise = context.waitForEvent("page");
  await page.getByRole("link", { name: "Contact" }).click();
  const contactPage = await contactPagePromise;
  await contactPage.locator("#name").fill("Minh Cao");
  await contactPage.locator("#email").fill("minh.cao@gbagel.com");
  await contactPage.locator("#message").fill("Hello, this is a test message from Minh Cao.");

  await contactPage.getByRole("button", { name: "Send Message" }).click();
  
  contactPage.once("dialog", async (dialog1) => {
    expect(dialog1.message()).toContain("Send this message?");
    await dialog1.accept();

    contactPage.once("dialog", async (dialog2) => {
      expect(dialog2.message()).toContain("Message sent successfully!");
      await dialog2.dismiss();
    });
  });

  await expect(contactPage.locator("#name")).toHaveText("");
  
});
