# AGENTS.md

Guidance for AI agents (Claude Code, Copilot, etc.) working in this repository.
Read this before writing or editing any test or library file.

---

## Available sub-agents

Invoke these via `@agent-<name>` in Claude Code, or spawn them with the `Agent` tool.

### `playwright-ecommerce-qa`

**Use for:** writing, reviewing, or optimizing Playwright tests and Page Objects in this repo.

| Task | Example prompt |
|---|---|
| Scaffold a new spec + POM | `@agent-playwright-ecommerce-qa scaffold a checkout spec and CheckoutPage POM` |
| Audit an existing spec | `@agent-playwright-ecommerce-qa review tests/checkout/checkout.spec.ts` |
| Optimize a flaky test | `@agent-playwright-ecommerce-qa optimize order.spec.ts` |
| Add edge-case coverage | `@agent-playwright-ecommerce-qa add negative login tests to login.spec.ts` |

This agent knows Playwright best practices, POM patterns, and e-commerce user journeys.
Always give it the file path(s) and a clear goal; it reads project files before writing.

---

### `Explore`

**Use for:** fast codebase searches — finding files by pattern, locating a selector or method,
answering "where is X defined?" without touching test files.

| Task | Example prompt |
|---|---|
| Find all uses of a locator | `@agent-Explore find all uses of data-test="proceed-1"` |
| Locate a page object method | `@agent-Explore where is the login() method defined?` |
| Survey test coverage | `@agent-Explore list all spec files and their test names` |

Use `quick` thoroughness for simple searches; `very thorough` for cross-cutting surveys.

---

### `Plan`

**Use for:** designing implementation strategy before writing code — new feature test suites,
fixture refactors, or any change that touches multiple files.

| Task | Example prompt |
|---|---|
| Design a new test suite | `@agent-Plan design the test suite for the new cart API endpoints` |
| Refactor fixture architecture | `@agent-Plan plan how to add a CartPage fixture to the base fixture` |

Run `Plan` before `playwright-ecommerce-qa` for non-trivial scaffolding tasks to agree on
approach first.

---

---

## Available skills (slash commands)

Invoke via `/skill-name [arguments]` in the Claude Code prompt.
Skill files live in `.claude/commands/`.

### `/edge-cases <feature>`

**Purpose:** Structured edge case ideation — produces a prioritised table of test scenarios
across 8 dimensions (boundary values, negative paths, state transitions, permission boundaries,
network/timing, data variations, mobile, concurrency).

**When to use:** Before writing tests for any new feature. Run it first, then hand the output
to `playwright-ecommerce-qa` to scaffold the actual spec.

**Example:**
```
/edge-cases checkout flow — address entry and payment selection
/edge-cases login form validation
/edge-cases bagel shop order placement with file upload
```

**Output:** Markdown table of BDD-named cases with type, priority (`P1`/`P2`/`P3`), and suite
tag (`@smoke`/`@regression`), plus a risk summary and data factory requirements.

---

### `/test-strategy <user story>`

**Purpose:** Full test plan from a user story or feature description — smoke tests, regression
tests, API tests, visual checkpoints, mobile coverage, files to create, data factory needs,
and a risk assessment.

**When to use:** At the start of a sprint or feature, before any code is written. Use it to
agree on scope and implementation order before invoking `playwright-ecommerce-qa`.

**Example:**
```
/test-strategy As a customer I want to apply a promo code at checkout
/test-strategy User registration with email verification
/test-strategy Product search with filters and sorting
```

**Output:** 10-section strategy document: decomposition → smoke → regression → API → visual →
mobile → files to create → data factory → risk → implementation order.

---

### `/webapp-testing [area]`

**Purpose:** Checklist-driven audit of the existing test suite against 9 web app testing
categories: auth, form validation, navigation, API contracts, visual regression, responsive,
error handling, test quality, and coverage gaps.

**When to use:** Periodically to find gaps in coverage, or before a release to verify the
suite is comprehensive. Pass an area to focus (`/webapp-testing checkout`) or omit for a
full suite audit.

**Example:**
```
/webapp-testing
/webapp-testing login and authentication
/webapp-testing bagel-shop
```

**Output:** Filled checklist (✅/⚠️/❌ per item), top 5 gaps ranked by risk, quick wins,
and a recommended next spec to write.

---

### `/doc-coauthoring <task>`

**Purpose:** Co-author project documentation — AGENTS.md sections, spec file header comments,
Page Object JSDoc, data factory comments, or CLAUDE.md updates — following the project's
writing style (concise, table-heavy, example-driven, imperative).

**When to use:** When adding a new pattern to AGENTS.md, documenting a non-obvious POM class,
or updating CLAUDE.md after a structural change to the project.

**Example:**
```
/doc-coauthoring add a section to AGENTS.md about visual snapshot testing conventions
/doc-coauthoring write JSDoc for the new CartPage class
/doc-coauthoring update CLAUDE.md with the new test:bagel script
```

**Output:** Ready-to-paste documentation content + insertion point (which section, before/after
which heading) + before/after diff for updates to existing sections.

---

### When to use which tool

```
Brainstorm what to test?                  → /edge-cases
Plan a full feature test suite?           → /test-strategy
Audit existing coverage?                  → /webapp-testing
Write or update documentation?            → /doc-coauthoring
Write / review / fix test code?           → @agent-playwright-ecommerce-qa
Find a file, symbol, or pattern?          → @agent-Explore
Design multi-file architecture?           → @agent-Plan → then playwright-ecommerce-qa
```

---

## Project at a glance

| Target | URL | Notes |
|---|---|---|
| Toolshop (main) | `https://practicesoftwaretesting.com` | `BASE_URL` in `.env` |
| Toolshop API | `https://api.practicesoftwaretesting.com` | `API_URL` in `.env` |
| Bagel Shop (local) | `http://localhost:5173` | Auto-started by `webServer` in config |

Tests live in `tests/` grouped by feature. Libraries live in `lib/`. All test code is TypeScript.

---

## Architecture layers

```
tests/**/*.spec.ts          ← specs only; no locators or raw URLs
lib/pages/**/*.page.ts      ← locators + action methods (POM)
lib/fixtures/*.fixture.ts   ← inject page objects & utilities into test args
lib/datafactory/*.ts        ← API helpers to create/clean up test data
lib/helpers/*.ts            ← pure utility functions (no Playwright imports)
.auth/admin.json            ← saved browser storage state for auth reuse
```

---

## Mandatory import rule

**Always** import `test` and `expect` from `@fixtures/base.fixture`, not from `@playwright/test`.
The base fixture merges page objects and the console collector — importing from `@playwright/test`
directly loses both.

```ts
// CORRECT
import { test, expect } from "@fixtures/base.fixture";

// WRONG — loses fixtures and custom matchers
import { test, expect } from "@playwright/test";
```

Exception: bagel-shop specs and API specs that need no fixtures may import from `@playwright/test` directly.

---

## Path aliases (tsconfig.json)

```
@pages/*        → lib/pages/*
@fixtures/*     → lib/fixtures/*
@datafactory/*  → lib/datafactory/*
@helpers/*      → lib/helpers/*
```

Never use relative `../../lib/...` paths.

---

## Test naming

Use the BDD pattern: `"should <outcome> when <condition>"`.

```ts
// CORRECT
test("should display error when login credentials are invalid");
test("should complete checkout with Buy Now Pay Later payment @smoke");

// WRONG — describes action, not outcome
test("Login test");
test("Create an Order");
```

---

## Tags

| Tag | Meaning | When to apply |
|---|---|---|
| `@smoke` | Fast deploy-gate check | Happy-path tests that must pass before a deploy |
| `@regression` | Full coverage | Edge cases, negative paths, detailed assertions |
| `@first` | Prioritised in `test:first` script | Critical path tests run via `npm run test:first` |

Append tags at the end of the test name string, not as a separate annotation.

---

## Test file template (UI, POM-based)

```ts
import { test, expect } from "@fixtures/base.fixture";
import { registerUser } from "@datafactory/register";

test.describe("<Feature>", () => {
  test.use({ storageState: ".auth/admin.json" }); // omit if auth not needed

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should <outcome> when <condition> @smoke", async ({ page, loginPage }) => {
    // Arrange — set up state via data factory or API, not UI where possible
    // Act
    // Assert
  });
});
```

---

## Test file template (API)

```ts
import { test, expect } from "@playwright/test";

test.describe("API — <resource>", () => {
  const apiUrl = process.env.API_URL;

  test("GET /<resource> returns 200 with correct shape", async ({ request }) => {
    const response = await request.get(`${apiUrl}/<resource>`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeInstanceOf(Array);
  });

  test("POST /<resource> creates a new record", async ({ request }) => {
    const response = await request.post(`${apiUrl}/<resource>`, {
      data: { /* payload */ },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeTruthy();
  });
});
```

---

## Page Object template

```ts
import { type Page, type Locator } from "@playwright/test";

export class ExamplePage {
  readonly page: Page;

  // Locators — declare all as readonly properties
  readonly heading: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading      = page.getByRole("heading", { level: 1 });
    this.submitButton = page.getByTestId("submit");
  }

  async goto() {
    await this.page.goto("/example");
  }

  async submit(value: string) {
    await this.submitButton.click();
  }
}
```

Rules:
- Locators are `readonly` properties on the class, never inline in methods.
- Action methods navigate, fill, click — they do not assert.
- Assertions stay in the spec file.
- Use `getByTestId()` for stable `data-test` attributes (configured globally).
- Use `getByRole()` for semantic elements (buttons, headings, links).
- Avoid CSS selectors, XPath, and `locator("text=...")`.

---

## Adding a page object to the fixture

1. Create `lib/pages/<feature>/<name>.page.ts`.
2. Import and instantiate in `lib/fixtures/pages.fixture.ts`:

```ts
import { ExamplePage } from "@pages/example/example.page";

type MyPages = {
  // ...existing pages
  examplePage: ExamplePage;
};

export const test = baseTest.extend<MyPages>({
  // ...existing fixtures
  examplePage: async ({ page }, use) => {
    await use(new ExamplePage(page));
  },
});
```

---

## Data factory template

```ts
import { request, expect } from "@playwright/test";

export async function createResource(payload: Record<string, unknown>) {
  const context = await request.newContext();
  const response = await context.post(
    `${process.env.API_URL}/resource`,
    { data: payload },
  );

  expect(response.status()).toBe(201);
  return (await response.json()) as { id: string };
}
```

Rules:
- Data factories call the API directly — never via UI.
- They assert the response status so failures are immediate and clear.
- Return typed data the spec can use (e.g., `{ id }`) rather than the raw response.

---

## Authentication

The `setup` project runs `tests/auth/auth.setup.ts` before all other projects and writes
`.auth/admin.json`. Reuse it in specs that need an authenticated session:

```ts
test.describe("Authenticated feature", () => {
  test.use({ storageState: ".auth/admin.json" });
  // tests here start already logged in
});
```

Never log in via UI inside a test body unless the test *is* a login test.

---

## Dialog handling

Register dialog handlers **before** the action that triggers them.

```ts
// CORRECT — handler registered first, persistent across multiple dialogs
page.on("dialog", async (dialog) => {
  expect(dialog.message(), "Dialog message").toContain("expected text");
  await dialog.accept();
});
await page.getByRole("button", { name: "Trigger" }).click();

// WRONG — nested once() is a registration race
page.once("dialog", async (d1) => {
  await d1.accept();
  page.once("dialog", async (d2) => { /* may never fire */ });
});
```

---

## File downloads

Save downloaded files to `test-results/` and clean up in `test.afterEach` so cleanup
always runs even when an assertion fails.

```ts
import * as fs from "fs";
import path from "path";

let downloadedFilePath: string | null = null;

test.afterEach(async () => {
  if (downloadedFilePath && fs.existsSync(downloadedFilePath)) {
    fs.unlinkSync(downloadedFilePath);
    downloadedFilePath = null;
  }
});

test("should download receipt @smoke", async ({ page }) => {
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();

  const download = await downloadPromise;
  downloadedFilePath = path.join(
    process.cwd(),
    "test-results",
    download.suggestedFilename(),
  );
  await download.saveAs(downloadedFilePath);

  const content = fs.readFileSync(downloadedFilePath, "utf-8");
  expect(content).toContain("expected text");
});
```

---

## Bagel Shop tests

Bagel-shop tests use the local dev server, not `BASE_URL`. Always hardcode the origin:

```ts
await page.goto("http://localhost:5173/");
```

The webServer config starts the app automatically before the test run.

---

## test.step() — grouping multi-phase tests

Use `test.step()` whenever a test has distinct logical phases (arrange / act / assert across
multiple API + UI actions). Steps appear as collapsible nodes in the HTML report and make
failures immediately locatable.

```ts
test("should reply to a customer message @regression", async ({
  context, loginPage, messagesPage, accountPage,
}) => {
  await test.step("Create and authenticate new user", async () => {
    await registerUser(email, password);
    await loginPage.login(email, password);
    await context.storageState({ path: ".auth/dynamic-user.json" });
  });

  await test.step("Seed message via API", async () => {
    await createMessage(name, body, subject, ".auth/dynamic-user.json");
  });

  await test.step("Verify reply in UI", async () => {
    await messagesPage.goto();
    await messagesPage.firstDetailLink.click();
    await expect(messagesPage.replyList).toContainText(replyText);
  });
});
```

Rules:
- Each step name should be a short noun phrase describing the phase, not a sentence.
- Never nest `test.step()` more than one level deep.
- Keep assertions inside the step they belong to, not at the end of the test body.

---

## Dynamic auth state (mid-test)

When a test needs a freshly-registered user's session (not the static admin), create the
user, log in, then snapshot the context into a temporary file:

```ts
const userAuthFile = ".auth/dynamic-user.json";

await registerUser(email, password);
await loginPage.login(email, password);
await context.storageState({ path: userAuthFile });

// Now pass userAuthFile to data-factory calls that need a Bearer token
await createMessage(name, body, subject, userAuthFile);
```

The temporary `.auth/*.json` files are git-ignored. Do not commit them.

---

## Network waiting

Prefer `waitForResponse` over `waitForLoadState("networkidle")` — it targets a specific
request, making the test deterministic rather than time-dependent.

```ts
// CORRECT — wait for the exact response before interacting
const productsLoaded = page.waitForResponse(
  r => r.url().includes("/products") && r.request().method() === "GET"
);
await page.goto(process.env.BASE_URL);
await productsLoaded;

// ACCEPTABLE — only for full-page transitions with no identifiable response
await page.waitForLoadState("networkidle");

// WRONG — arbitrary time; will be either too slow or too fast
await page.waitForTimeout(2000);
```

---

## Visual snapshot testing

Use `toHaveScreenshot()` inside a `test.step()` for visual assertions. Skip in headed
mode using the `headless` fixture to avoid noise during local development.

```ts
test("should render checkout confirmation @smoke", async ({ page, headless }) => {
  // ... complete the flow ...

  if (headless) {
    await test.step("Visual snapshot", async () => {
      await expect(page).toHaveScreenshot("checkout-confirmation.png", {
        mask: [page.locator(".dynamic-timestamp")],
        maskColor: "rgb(255 0 153 / 20%)",
      });
    });
  }
});
```

To update stored baselines after an intentional UI change:

```bash
npm run test:update-screenshots
```

Commit updated `.png` snapshot files alongside the code change that caused the visual diff.

---

## Mobile / responsive handling

The `Mobile Safari` project is active. Use the `isMobile` fixture to branch behaviour
that differs between desktop and mobile (e.g., collapsed navigation):

```ts
test("should navigate to cart @smoke", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByLabel("Toggle navigation").click();
  }
  await page.locator('[data-test="nav-cart"]').click();
});
```

Do not duplicate tests for mobile — parameterise within the same test body.

---

## Where to put new files

```
tests/<feature>/<name>.spec.ts          new spec
lib/pages/<feature>/<name>.page.ts      new Page Object
lib/datafactory/<name>.ts               new data-factory function
lib/helpers/<name>.ts                   new pure utility
```

Use the existing feature folder if one exists (`login`, `checkout`, `account`, `api`,
`bagel-shop`). Create a new folder only for a genuinely new feature area.

---

## Running a subset of tests by tag

```bash
npx playwright test --grep @smoke                  # smoke suite only
npx playwright test --grep @regression             # regression suite only
npm run test:first                                 # @first tag (uses --grep internally)
npx playwright test --grep "@smoke|@regression"    # union of tags
npx playwright test --grep-invert @smoke           # everything except smoke
```

Tags are plain strings appended to the test name — the `--grep` flag treats them as
regex patterns matched against the full test title.

---

## Assertion best practices

- Always pass a descriptive failure message as the second argument:
  ```ts
  expect(value, "Nav menu should show logged-in user's name").toContain("John Doe");
  ```
- Prefer `toHaveText` / `toContainText` over `textContent()` + string equality — they auto-retry.
- Use custom matchers for API response shapes:
  ```ts
  expect(body.price).toBeNumber();
  expect(body.status).toBeOneOfValues(["active", "inactive"]);
  ```

---

## Anti-patterns — never do these

| Anti-pattern | Why | Instead |
|---|---|---|
| `import { test } from "@playwright/test"` in a POM-based spec | Loses fixtures & custom matchers | Import from `@fixtures/base.fixture` |
| Assertions inside Page Objects | Couples POM to test logic | Assert in the spec |
| `page.waitForTimeout(ms)` (hard sleep) | Flaky; masks real timing issues | Use `waitForResponse`, `waitForURL`, or auto-retrying assertions |
| `require()` inside async functions | CommonJS mismatch | Top-level ESM `import` |
| Cleanup at the end of a test body | Skipped on failure | Use `test.afterEach` |
| `console.log` left in committed tests | CI log noise | Remove before committing |
| Hardcoding `http://localhost:5173/` in non-bagel-shop tests | Bypasses `BASE_URL` config | Use `page.goto("/")` (relative) |
| CSS selectors or XPath for stable elements | Brittle to style changes | `getByTestId`, `getByRole`, `getByLabel` |

---

## Custom matchers (available globally)

| Matcher | Assertion |
|---|---|
| `toBeNumber()` | `typeof value === "number"` |
| `toBeString()` | `typeof value === "string"` |
| `toBeBoolean()` | `typeof value === "boolean"` |
| `toBeOneOfValues(array)` | `array.includes(value)` |
| `toHaveNoConsoleErrors()` | No `console.error` calls on the page |

`toHaveNoConsoleErrors` requires the `pageConsole` fixture injected by `@fixtures/base.fixture`.
