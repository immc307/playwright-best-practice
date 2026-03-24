import { type Locator, type Page } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly navMenu: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.getByTestId("nav-menu");
    this.pageTitle = page.getByTestId("page-title");
  }

  async goto() {
    await this.page.goto("/account");
    await this.page.waitForURL("**/account");
  }
}