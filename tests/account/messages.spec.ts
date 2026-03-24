import { LoginPage } from "@pages/login/login.page";
import { registerUser } from "@datafactory/register";
import { test, expect } from "@playwright/test";
import { createMessage } from "@datafactory/messages";
import { MessagePage } from "@pages/account/messages.page";

test("Customer reply to a message", async ({ context, page }) => {
  const timestamp = Date.now();
  const customerEmail = `new_user_${timestamp}@test.com`;
  const customerPassword = `P@ssword_${Date.now()}`;
  const dropdownOption = "payments";
  const message =
    "This is long message for testing purpose. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
  const messageUserAuthFile = ".auth/messageUserAuthFile.json";

  await test.step("Create new user", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await registerUser(customerEmail, customerPassword);
    await loginPage.login(customerEmail, customerPassword);
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(
      "Minh Cao",
    );

    await context.storageState({ path: messageUserAuthFile });
  });

  await test.step("Create a new message with datafactory", async () => {
    await createMessage(
      "Minh Cao",
      message,
      dropdownOption,
      messageUserAuthFile,
    );
  });

  await test.step("Reply and validate message", async () => {
    const messagePage = new MessagePage(page);
    await messagePage.goto();
    await expect(messagePage.table).toContainText(message.substring(0, 25));
    await expect(messagePage.table).toContainText(dropdownOption);
    await messagePage.firstDetailLink.click();
    await expect(messagePage.messageList).toContainText(message);

    const replyMessage = "This is reply message";
    await messagePage.replyInput.fill(replyMessage);
    await messagePage.replyButton.click();
    await expect(messagePage.replyList).toContainText(replyMessage);
  });
});
