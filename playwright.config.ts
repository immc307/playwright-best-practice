import { defineConfig, devices, expect } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30_000,
  globalTimeout: 10 * 60 * 1000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI 2 times and locally 1 time */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["list"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: "on",
    screenshot: "on",
    headless: true,
    testIdAttribute: "data-test",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        permissions: ["clipboard-read", "geolocation"],
      },
    },

    // {
    //   name: 'firefox',
    //   dependencies: ["setup"],
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   dependencies: ["setup"],
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    {
      name: "Mobile Safari",
      dependencies: ["setup"],
      use: { ...devices["iPhone 15 Pro Max"] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

// Custom assertions
expect.extend({
  toBeNumber(received: any) {
    const pass = typeof received === "number";
    return {
      pass,
      message: () =>
        pass
          ? `Expected '${received}' NOT to be a number\n`
          : `toBeNumber() assertion failed.\nYou expected '${received}' to be a number but it's a ${typeof received}\n`,
    };
  },

  toBeString(received: any) {
    const pass = typeof received === "string";
    return {
      pass,
      message: () =>
        pass
          ? `Expected '${received}' NOT to be a string\n`
          : `toBeString() assertion failed.\nYou expected '${received}' to be a string but it's a ${typeof received}\n`,
    };
  },

  toBeBoolean(received: any) {
    const pass = typeof received === "boolean";
    return {
      pass,
      message: () =>
        pass
          ? `Expected '${received}' NOT to be a boolean\n`
          : `toBeBoolean() assertion failed.\nYou expected '${received}' to be a boolean but it's a ${typeof received}\n`,
    };
  },

  toBeOneOfValues(received: any, array: any[]) {
    const pass = array.includes(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected '${received}' NOT to be one of [${array.join(", ")}]\n`
          : `toBeOneOfValues() assertion failed.\nYou expected [${array.join(", ")}] to include '${received}'\n`,
    };
  },
});
