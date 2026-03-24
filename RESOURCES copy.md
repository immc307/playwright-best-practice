# Resources File

This file will be used for the exercises in this course. I'll include links that are discussed in each video.

This course is an extension of Butch Mayhew's course [Learning Playwright](https://www.linkedin.com/learning/learning-playwright). This course will build on the existing code from that course.

## 00_01 Introduction: Playwright Abstractions, Fixtures, and Complex Scenarios

## 00_02 What You Need to Know

- [Learning Playwright](https://www.linkedin.com/learning/learning-playwright/)
- [Node Prebuilt Installer](https://nodejs.org/en/download/prebuilt-installer)
- [VS Code](https://code.visualstudio.com/)
- [VS Code Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Playwright Docs: Getting Started](https://playwright.dev/docs/intro)

## 00_03 Using the Github Exercise Files

## 00_04 Cloning the Repository and Installation

- [GitHub: Using Repositories](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)
- [GitHub: Desktop App](https://github.com/apps/desktop)
- [Node Prebuilt Installer](https://nodejs.org/en/download/prebuilt-installer/)
- [Configuring SSH and Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [VS Code](https://code.visualstudio.com/)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## 00_05 Overview of the Website Under Test

- [Practice Software Testing](https://practicesoftwaretesting.com/)
- [GitHub: Practice Software Testing Repository](https://github.com/testsmith-io/practice-software-testing)

## 01_01 Abstractions Pros and Cons

## 01_02 Creating a Page Object in Playwright

- [Playwright Essential Branch 01_02b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_02b)
- [Playwright Docs: Page Object Model](https://playwright.dev/docs/pom)
- [Playwright Essential Branch 01_02e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_02e)

## 01_03 Using a Page Object in Playwright

- [Playwright Essential Branch 01_03b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_03b)
- [Playwright Essential Branch 01_03e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_03e)

## 01_04 Overview of Test Data Management in Playwright

## 01_05 Creating a Data Factory for Playwright Tests

- [Playwright Essential Branch 01_05b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_05b)
- [Playwright Docs: API Requests](https://playwright.dev/docs/api/class-apirequest)
- [Playwright Essential Branch 01_05e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_05e)

## 01_06 Creating Helpers for Playwright Tests

- [Playwright Essential Branch 01_06b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_06b)
- [Playwright Essential Branch 01_06e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_06e)

## 01_07 Creating Custom Assertions for Playwright Tests

- [Playwright Essential Branch 01_07b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_07b)
- [Playwright Docs: Generic Assertions](https://playwright.dev/docs/api/class-genericassertions)
- [Playwright Blog: Custom Expects in Playwright](https://playwrightsolutions.com/creating-custom-expects-in-playwright-how-to-write-your-own-assertions/)
- [Playwright Essential Branch 01_07e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_07e)

## 01_08 Managing Typescript Config

- [Playwright Essential Branch 01_08b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_08b)
- [Typescript Docs: tsconfig](https://www.typescriptlang.org/tsconfig/)
- [Playwright Essential Branch 01_08e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_08e)

## 01_09 Challenge: Create a Test Using Data Factory and Helper Functions

- [Playwright Essential Branch 01_09b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_09b)

- Create a Test Using Data Factory and Helper Functions
- Create an initial message through Contact Functionality
- Test Steps:
  - Login with user.
  - Create a message through [/contact](https://practicesoftwaretesting.com/contact) page.
  - View the [/account/messages](https://practicesoftwaretesting.com/account/messages) page form a logged in user.
  - Click to see the details of the message.
  - Validate the text in the original message.
  - Add a text reply.
  - Make an assertion to validate the reply shows up in the replies section.
- Hints:
  - When using the API datafactory, you will need a token for authentication.

## 01_10 Solution: Create a Test Using Data Factory and Helper Functions

- [Playwright Essential Branch 01_10e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/01_10e)

## 02_01 Overview of Playwright Fixtures

- [Playwright Docs: Fixtures](https://playwright.dev/docs/test-fixtures)

## 02_02 Creating a Fixture in Playwright

- [Playwright Essential Branch 02_02b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_02b)
- [Playwright Docs: Creating a Fixture](https://playwright.dev/docs/test-fixtures#creating-a-fixture)
- [Playwright Essential Branch 02_02e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_02e)

## 02_03 Using a Fixture in Playwright Tests

- [Playwright Essential Branch 02_03b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_03b)
- [Playwright Docs: Using a Fixture](https://playwright.dev/docs/test-fixtures#using-a-fixture)
- [Playwright Essential Branch 02_03e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_03e)

## 02_04 Overview of Advanced Fixtures in Playwright

- [Playwright Docs: Overriding Fixtures](https://playwright.dev/docs/test-fixtures#overriding-fixtures)
- [Playwright Docs: Worker Scoped Fixtures](https://playwright.dev/docs/test-fixtures#overrhttps://playwright.dev/docs/test-fixtures#worker-scoped-fixtures)
- [Playwright Docs: Automatic Fixtures](https://playwright.dev/docs/test-fixtures#automatic-fixtures)
- [Playwright Docs: Execution Order](https://playwright.dev/docs/test-fixtures#execution-order)
- [Playwright Docs: Combine Fixtures](https://playwright.dev/docs/test-fixtures#combine-custom-fixtures-from-multiple-modules)

## 02_05 Implementing an Advanced Fixture in Playwright

- [Playwright Essential Branch 02_05b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_05b)
- [Playwright Docs: Test Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Docs: Extending Expects](https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend)
- [Playwright Docs: Combine Custom Matchers](https://playwright.dev/docs/test-assertions#combine-custom-matchers-from-multiple-modules)
- [Playwright Docs: Combine Fixtures](https://playwright.dev/docs/test-fixtures#combine-custom-fixtures-from-multiple-modules)
- [Playwright Essential Branch 02_05e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_05e)

## 02_06 Challenge: Update Message Test To Use Fixtures

- [Playwright Essential Branch 02_06b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_06b)
- Update the test/account/messages.spec.ts file to use the base fixture we created in the last video.
- Bonus points if you refactor the test enough to be able to remove the `page` fixture from the list of fixtures being imported.

## 02_07 Solution: Update Message Test To Use Fixtures

- [Playwright Essential Branch 02_07e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/02_07e)

## 03_01 Overview of Network Routing in Playwright

- [Playwright Docs: Network](https://playwright.dev/docs/network)
- [Playwright Docs: Route](https://playwright.dev/docs/api/class-route)
- [Playwright Docs: Page Route](https://playwright.dev/docs/api/class-page#page-route)

## 03_02 Intercepting HTTP Requests with Playwright

- [Playwright Essential Branch 03_02b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_02b)
- [Playwright Docs: Network](https://playwright.dev/docs/network)
- [Playwright Docs: Route](https://playwright.dev/docs/api/class-route)
- [Playwright Docs: Page Route](https://playwright.dev/docs/api/class-page#page-route)
- [Playwright Essential Branch 03_02e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_02e)

## 03_03 Mocking HTTP Responses with Playwright

- [Playwright Essential Branch 03_03b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_03b)
- [Playwright Docs: Network](https://playwright.dev/docs/network)
- [Playwright Docs: Route](https://playwright.dev/docs/api/class-route)
- [Playwright Docs: Page Route](https://playwright.dev/docs/api/class-page#page-route)
- [Playwright Essential Branch 03_03e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_03e)

## 03_04 Browser Emulation in Playwright

- [Playwright Essential Branch 03_04b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_04b)
- [Playwright Docs: Browser Emulation](https://playwright.dev/docs/emulation#devices)
- [Playwright Device Registry](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json)
- [Playwright Essential Branch 03_04e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_04e)

## 03_05 Localization and Geolocation in Playwright

- [Playwright Essential Branch 03_05b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_05b)
- [Playwright Docs: Browser Timezones](https://playwright.dev/docs/emulation#locale--timezone)
- [Playwright Docs: Browser Geolocation](https://playwright.dev/docs/emulation#geolocation)
- [Playwright Docs: Browser Permissions](https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions)
- [Playwright Essential Branch 03_05e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_05e)

## 03_06 Injecting Javascript in Playwright

- [Playwright Essential Branch 03_06b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_06b)

```javascript
// Find inputs that are missing labels on page
Array.from(document.querySelectorAll("input"))
  .filter((input) => !document.querySelector(`label[for="${input.id}"]`))
  .map((input) => input.outerHTML);
```

```javascript
// Find broken images on page
Array.from(document.querySelectorAll("img"))
  .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
  .map((img) => img.src);
```

- [Playwright Docs: Evaluating Javascript](https://playwright.dev/docs/evaluating)
- [Playwright Essential Branch 03_06e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_06e)

## 03_07 Challenge: Mocking and Emulation in Playwright

- [Playwright Essential Branch 03_07b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_07b)
- Challenge 1: Create 1 test intercepting a network request using the data for assertions.
- Challenge 2: Create 1 test mocking a network request with assertions.
- Challenge 3: Run all tests and make updates to ensure all tests are passing.
- Hints: use isMobile options for sites that render differently on mobile
- Ensure that data is loaded in the UI before making assertions against intercepted data. There are a few ways to do this but if you get stuck you can use page.waitForTimeout(5000) temporarily.

## 03_08 Solution: Mocking and Emulation in Playwright

- [Playwright Essential Branch 03_08e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/03_08e)

## 04_01 Running a Webserver during a Playwright Test

- [Playwright Essential Branch 04_01b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_01b)
- [Playwright Docs: Test Configuration](https://playwright.dev/docs/test-configuration)
- [Playwright Docs: Configuring a Web Server](https://playwright.dev/docs/test-webserver#configuring-a-web-server)
- [Learning Playwright: Updating the Playwright Config](https://www.linkedin.com/learning/learning-playwright/updating-the-playwright-config?resume=false)
- [Playwright Essential Branch 04_01e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_01e)

## 04_02 Optimizing Playwright: Workers and Sharding

- [Playwright Essential Branch 04_02b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_02b)
- [Playwright Docs: Worker Processes](https://playwright.dev/docs/test-parallel#worker-processes)
- [Playwright Docs: Parallelization](https://playwright.dev/docs/test-parallel)
- [Playwright Docs: Sharding Guide](https://playwright.dev/docs/test-sharding)
- [Playwright Essential Branch 04_02e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_02e)

## 04_03 Retrying Tests in Playwright

- [Playwright Essential Branch 04_03b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_03b)
- [Playwright Docs: Retries](https://playwright.dev/docs/test-retries#retries)
- [Playwright Docs: Repeat Each](<https://playwright.dev/docs/test-cli#reference:~:text=%2D%2Drepeat%2Deach%20%3CN,times%20(default%3A%201).>)
- [Playwright Essential Branch 04_03e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_03e)

## 04_04 Overview of Timeouts in Playwright

- [Playwright Essential Branch 04_04b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_04b)
- [Playwright Docs: Test Timeouts](https://playwright.dev/docs/test-timeouts#advanced-low-level-timeouts)
- [Playwright Docs: Fixture Timeouts](https://playwright.dev/docs/test-timeouts#fixture-timeout)
- [Playwright Essential Branch 04_04e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/04_04e)

## 05_01 Working with Multiple Windows and Popups in Playwright

- [Playwright Essential Branch 05_01b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_01b)
- [Playwright Docs: Multiple Pages](https://playwright.dev/docs/pages#multiple-pages)
- [Playwright Docs: iFrames](https://playwright.dev/docs/frames#frame-objects)
- [Playwright Essential Branch 05_01e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_01e)

## 05_02 Working with Alerts and Dialogs in Playwright

- [Playwright Essential Branch 05_02b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_02b)
- [Playwright Docs: Alerts and Dialogs](https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs)
- [Playwright Essential Branch 05_02e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_02e)

## 05_03 Working with Uploads and Downloads in Playwright

- [Playwright Essential Branch 05_03b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_03b)
- [Playwright Docs: Downloads](https://playwright.dev/docs/downloads#introduction)
- [Playwright Docs: Uploads](https://playwright.dev/docs/input#upload-files)
- [Playwright Essential Branch 05_03e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_03e)

## 05_04 Working with Challenging Elements in Playwright

- [Playwright Essential Branch 05_04b](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_04b)
- [Playwright Docs: Locators](https://playwright.dev/docs/other-locators)
- [Playwright Essential Branch 05_04e](https://github.com/LinkedInLearning/playwright-essential-training-abstractions-fixtures-and-complex-scenarios-4278224/tree/05_04e)

## 06_01 Next Steps

- [Playwright Docs](https://playwright.dev/)
- [Playwright Docs: Release Notes](https://playwright.dev/docs/release-notes)
- [Playwright Youtube Channel](https://www.youtube.com/@Playwrightdev/featured)
- [Playwright Discord](https://discord.com/servers/playwright-807756831384403968)
- [Playwright GitHub](https://github.com/microsoft/playwright)

### Connect with Butch Mayhew

- [Subscribe to PlaywrightSolutions Newsletter](https://playwrightsolutions.com)
- [Butch Mayhew's LinkedIn](https://www.linkedin.com/in/butchmayhew/)
