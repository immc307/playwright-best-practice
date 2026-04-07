import { LoginPage } from "@pages/login/login.page";
import { AccountPage } from "@pages/account/account.page";
import { MessagesPage } from "@pages/account/messages.page";
import { ContactPage } from "@pages/contact/contact.page";
import { test as baseTest } from "@playwright/test";

type MyPages = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  messagesPage: MessagesPage;
  contactPage: ContactPage;
};

export const test = baseTest.extend<MyPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  messagesPage: async ({ page }, use) => {
    await use(new MessagesPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect } from "@playwright/test";
