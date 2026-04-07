# Playwright Practice

A personal Playwright test automation project by **MC307**, built to practice and showcase E2E testing skills using real-world patterns.

## About

This project contains end-to-end tests written in TypeScript with [Playwright](https://playwright.dev/), targeting the [Practice Software Testing](https://practicesoftwaretesting.com/) demo app. It demonstrates key automation concepts including:

- Page Object Model (POM)
- Custom fixtures
- Data factory pattern (API-driven test data setup)
- Auth state management
- Visual snapshot testing
- API testing
- Network interception & mocking

## Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- [TypeScript](https://www.typescriptlang.org/) — strongly typed test code
- [Node.js](https://nodejs.org/) — runtime

## Getting Started

1. Make sure you have the following installed:
   - [Node.js](https://nodejs.org/en/download/prebuilt-installer) (current, active, or maintenance LTS)
   - [Git](https://github.com/git-guides/install-git)
   - [VS Code](https://code.visualstudio.com/) with the [Playwright Test extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

2. Clone this repo:
   ```bash
   git clone https://github.com/immc307/Playwright-Practice.git
   cd Playwright-Practice
   ```

3. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

4. Copy `.env` and set your environment variables.

## Running Tests

```bash
# Run all tests
npm test

# Run only Chromium
npm run test:chromium

# Run with UI mode
npm run test:ui

# Run and open report
npm run test:report

# Update visual snapshots
npm run test:update-screenshots
```

## Project Structure

```
tests/          # Test specs (login, checkout, homepage, API, account)
lib/
  pages/        # Page Object Models
  fixtures/     # Custom Playwright fixtures
  datafactory/  # API helpers for test data setup
.auth/          # Saved auth state files
```

## Author

**MC307** — [github.com/immc307](https://github.com/immc307)
