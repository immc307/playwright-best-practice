import { LoginPage } from "@pages/login/login.page";
import { registerUser } from "@datafactory/register";
import { test, expect } from "@fixtures/base.fixture";
import { createMessage } from "@datafactory/messages";
import { MessagesPage } from "@pages/account/messages.page";

test("Customer reply to a message", async ({ 
  context, 
  loginPage, 
  messagesPage,
  contactPage,
  accountPage
}) => {
  const timestamp = Date.now();
  const customerEmail = `new_user_${timestamp}@test.com`;
  const customerPassword = `P@ssword_${Date.now()}`;
  const dropdownOption = "payments";
  const message =
    "This is long message for testing purpose. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
  const messageUserAuthFile = ".auth/messageUserAuthFile.json";

  await test.step("Create new user", async () => {
    await loginPage.goto();
    await registerUser(customerEmail, customerPassword);
    await loginPage.login(customerEmail, customerPassword);
    await expect(accountPage.navMenu).toContainText("Minh Cao");

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
    await messagesPage.goto();
    await expect(messagesPage.table).toContainText(message.substring(0, 25));
    await expect(messagesPage.table).toContainText(dropdownOption);
    await messagesPage.firstDetailLink.click();
    await expect(messagesPage.messageList).toContainText(message);

    const replyMessage = "This is reply message";
    await messagesPage.replyInput.fill(replyMessage);
    await messagesPage.replyButton.click();
    await expect(messagesPage.replyList).toContainText(replyMessage);
  });
});
