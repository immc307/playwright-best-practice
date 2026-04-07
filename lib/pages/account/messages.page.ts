import { type Locator, type Page } from "@playwright/test";

export class MessagesPage {
  readonly page: Page;
  readonly table: Locator;
  readonly firstDetailLink: Locator;
  readonly messageList: Locator;
  readonly replyInput: Locator;
  readonly replyButton: Locator;
  readonly replyList: Locator;
  readonly contactForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator("div", { has: page.locator('text="Messages"') });
    this.contactForm = page.getByRole("link", { name: "contact form" });
    this.firstDetailLink = page.getByRole("link", { name: "Details" }).first();
    this.messageList = page.locator("div.card").filter({ hasText: "Subject" });
    this.replyList = page
      .getByRole("heading", { name: "Replies" })
      .locator("+ div.card");
    this.replyButton = page.getByTestId("reply-submit");
    this.replyInput = page.getByTestId("message");
  }

  async goto() {
    await this.page.goto("/account/messages");
  }
}
