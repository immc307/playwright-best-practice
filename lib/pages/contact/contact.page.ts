import { type Locator, type Page } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly subject: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subject = page.locator('[data-test="subject"]');
    this.message = page.locator('[data-test="message"]');
    this.submitButton = page.locator('[data-test="contact-submit"]');
    this.successMessage = page.locator(".alert-success");
  }

  async goto() {
    await this.page.goto("/contact");
  }
}
