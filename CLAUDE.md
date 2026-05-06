# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install && npx playwright install

# Run tests
npm test                                              # All tests (all configured browsers/projects)
npm run test:chromium                                 # Chromium only
npm run test:local                                    # Against local bagel-shop (BASE_URL=http://localhost:4200)
npm run test:ui                                       # Interactive UI mode
npm run test:report                                   # Run all tests and open HTML report
npm run test:update-screenshots                       # Update visual snapshots

# Run a single file or specific test
npx playwright test tests/login/login.spec.ts
npx playwright test tests/login/login.spec.ts --grep "specific test name"
npx playwright test --grep "pattern" --project chromium

# Demo app (required for bagel-shop tests)
npm run start:bagel                                   # Starts Vite app on port 5173

# Record new tests
npm run test:codegen
```

## Architecture

The project tests [practicesoftwaretesting.com](https://practicesoftwaretesting.com) and a local bagel-shop demo app. It follows the **Page Object Model (POM)** pattern with custom fixtures and an API data factory.

### Key layers

| Layer | Location | Purpose |
|---|---|---|
| Tests | `tests/**/*.spec.ts` | Test specs grouped by feature |
| Page Objects | `lib/pages/**/*.page.ts` | Locators + action methods per page |
| Fixtures | `lib/fixtures/*.fixture.ts` | Inject page objects & console collector into tests |
| Data Factory | `lib/datafactory/*.ts` | API helpers to set up test data (register users, create messages) |
| Helpers | `lib/helpers/*.ts` | Pure utility functions (random values, state names) |
| Auth State | `.auth/*.json` | Saved browser storage states for session reuse |

### Fixtures

All tests import `test` and `expect` from `@fixtures/base.fixture`, not from `@playwright/test`. The base fixture merges:
- **`pages.fixture`** — provides `loginPage`, `accountPage`, `messagesPage`, `contactPage` as typed page object instances.
- **`console.fixture`** — provides `pageConsole` for capturing browser console messages; extends `expect` with `toHaveNoConsoleErrors()`.

### Authentication

Auth setup runs once as a Playwright `setup` project dependency (`tests/auth/auth.setup.ts`). It logs in via UI and writes storage state to `.auth/admin.json`. Tests that need an authenticated session declare:
```ts
test.use({ storageState: ".auth/admin.json" });
```

The data factory (`lib/datafactory/messages.ts`) reads the token directly from the saved auth JSON file to make authenticated API calls.

### Path aliases (tsconfig.json)

```
@pages/*      → lib/pages/*
@fixtures/*   → lib/fixtures/*
@datafactory/* → lib/datafactory/*
@helpers/*    → lib/helpers/*
```

### Custom matchers

Defined in `playwright.config.ts` and typed in `global.d.ts`:
- `toBeNumber()`, `toBeString()`, `toBeBoolean()`, `toBeOneOfValues(array)` — for API response validation
- `toHaveNoConsoleErrors()` — from the console fixture

### Environment variables

`.env` at project root:
```
BASE_URL=https://practicesoftwaretesting.com
API_URL=https://api.practicesoftwaretesting.com
```

### Playwright config highlights

- `testIdAttribute: "data-test"` — all `getByTestId()` calls resolve against `data-test` attributes
- Auth `setup` project runs before `chromium` and `Mobile Safari` projects
- Web server auto-starts the bagel-shop app on port 5173 before tests run
- Trace, video, and screenshot capture are enabled on failure
