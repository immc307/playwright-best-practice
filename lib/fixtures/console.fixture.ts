import {
  expect as baseExpect,
  test as baseTest,
  type Page,
  type ConsoleMessage,
} from "@playwright/test";

class PageConsole {
  readonly messages: ConsoleMessage[] = [];
  constructor(page: Page) {
    page.on("console", (message) => {
      this.messages.push(message);
    });
  }
}

export const test = baseTest.extend<{
  pageConsole: PageConsole;
}>({
  pageConsole: async ({ page }, use) => {
    const pageConsole = new PageConsole(page);
    await use(pageConsole);
  },
});

export const expect = baseExpect.extend({
  async toHaveNoConsoleErrors(pageConsole: PageConsole) {
    const errors = pageConsole.messages.filter(
      (message) => message.type() === "error",
    );
    const pass = errors.length === 0;
    const message = () =>
      this.utils.matcherHint("toHaveNoConsoleErrors", undefined, "") +
      "\n\n" +
      `Errors: ${this.utils.stringify(errors.map((e) => e.text()))}\n`;
    return {
      pass,
      message,
      name: "toHaveNoConsoleErrors",
      actual: errors,
    };
  },
});
