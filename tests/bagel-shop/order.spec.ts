import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";

let downloadedFilePath: string | null = null;

test.afterEach(async () => {
  if (downloadedFilePath && fs.existsSync(downloadedFilePath)) {
    fs.unlinkSync(downloadedFilePath);
    downloadedFilePath = null;
  }
});

test(
  "should generate a downloadable receipt with correct totals when an order is placed @smoke",
  async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Order" }).click();

    await page
      .locator("#designUpload")
      .setInputFiles("lib/uploads/hashtag-sticker.png");
    await page.locator("#instructions").fill("Make sure the bagel is toasted!");

    page.on("dialog", async (dialog) => {
      expect(
        dialog.message(),
        'Upload confirmation dialog should report the correct filename',
      ).toContain('File "hashtag-sticker.png" uploaded successfully!');
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Place Order" }).click();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download Receipt" }).click();

    const download = await downloadPromise;
    downloadedFilePath = path.join(
      process.cwd(),
      "test-results",
      download.suggestedFilename(),
    );
    await download.saveAs(downloadedFilePath);

    const fileContent = fs.readFileSync(downloadedFilePath, "utf-8");

    expect(fileContent, "Receipt should include the order header").toContain(
      "Order Receipt",
    );
    expect(fileContent, "Receipt should reflect a quantity of 1").toContain(
      "Quantity: 1",
    );
    expect(
      fileContent,
      "Receipt should reflect the correct order total",
    ).toContain("Total: $2.99");
  },
);
