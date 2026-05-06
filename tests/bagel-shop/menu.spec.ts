import { test, expect } from "@playwright/test";

test.describe("Menu Page", () => {
  const bagelType = "Sesame";
  test(`Add ${bagelType} to Cart`, async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Menu" }).click();

    let dialogCount = 0;
    page.on("dialog", async (dialog) => {
      dialogCount++;
      console.log(`Dialog ${dialogCount}: ${dialog.message()}`);

      if (dialog.type() === "confirm") {
        expect(dialog.message()).toContain(`Add ${bagelType} bagel to cart?`);
        await dialog.accept();
      } else {
        expect(dialog.message()).toContain(`${bagelType} bagel added to cart!`);
        await dialog.dismiss();
      }
    });

    const table = page.locator("#menuTable");
    const bagelRow = table.getByRole("row", { name: bagelType });
    const addToCartButton = bagelRow.getByRole("button");
    await addToCartButton.click();
  });
});
