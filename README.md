# Playwright UI + API Test Automation Framework

End-to-end test automation framework built with **Playwright (JavaScript)** for an e-commerce application — covering UI, API, and E2E testing with a hybrid data strategy.

---

## Tech Stack

- Playwright (`@playwright/test`) — UI + API tests via built-in `request`
- JavaScript (Node.js / CommonJS)
- Page Object Model, API Client Layer, Custom Fixtures
- AJV — JSON schema validation
- GitHub Actions CI/CD, Allure + HTML reporting, Docker

---

## Architecture

```
my-test-framework/
├── tests/
│   ├── ui/        # UI scenarios (auth, products, cart)
│   ├── api/       # API tests (auth, products, users)
│   └── e2e/       # End-to-end business flows
├── pages/         # Page Object Model
├── api/           # API Client Layer (UserClient, AuthClient, ProductClient)
├── fixtures/      # User lifecycle + authenticated session
├── utils/         # Test data generator
└── data/          # Endpoints and shared test data
```

---

## Key E2E Flow

```
Create user via API → Login via UI → Add to cart → Checkout → Payment → Validate invoice → Delete user via API
```

API handles setup and teardown. UI validates user-facing behavior only.

---

## Setup

```bash
git clone https://github.com/Ariless/playwright-ui-api-test-framework.git
cd playwright-ui-api-test-framework
npm install
npx playwright install
```

Create a `.env` file:
```
BASE_URL=https://automationexercise.com
```

---

## Running Tests

```bash
npx playwright test                        # all tests
npx playwright test --grep @smoke          # smoke only
npx playwright test --grep @api            # API only
npx playwright test --grep @e2e            # E2E only
```

---

## Docker

```bash
docker build -t playwright-tests .
docker run --rm -e BASE_URL=https://automationexercise.com playwright-tests
docker run --rm -e BASE_URL=https://automationexercise.com playwright-tests npx playwright test --grep @smoke
```

---

## CI/CD

GitHub Actions pipeline on every push and PR to `main`:

1. **smoke** — gates the pipeline; blocks api/ui/e2e if it fails
2. **api**, **ui**, **e2e** — run in parallel after smoke passes

Parallelization is safe — each test creates and deletes its own user via fixtures, so there are no shared data dependencies.

---

## Architecture Decisions

**API Client Layer** — `UserClient`, `AuthClient`, `ProductClient` encapsulate all API calls. If the API changes, only the client needs updating.

**No PageFactory** — PageFactory is a Selenium-era pattern. In Playwright, elements are lazy by default; a factory that wraps `new PageClass(page)` adds indirection with no benefit.

**Playwright `request` over axios** — native integration means API calls appear in traces and share the same timeout config without an extra dependency.

**Hybrid approach** — test data setup/teardown via API (fast, reliable); UI used only to validate user-facing behavior.

**Flaky test strategy** — retries handle transient infrastructure issues only, not real failures. All failures are investigated via trace artifacts captured on first retry. No `waitForTimeout` — all waits are condition-based.

**Locator strategy** — `data-qa` attributes preferred, falling back to semantic selectors. XPath avoided.
```js
this.continueButton = page.locator('[data-qa="continue-button"]');
```

**Test design** — edge cases and negative scenarios are validated at the API layer (faster, more stable). UI tests cover user journeys only.

**Debugging in CI** — check HTML report → open trace file on retry → reproduce locally with `--headed`.

**What is NOT tested** — visual regression, cross-browser, performance, mobile viewports.

---

## Author

QA Automation Engineer | Playwright | JavaScript | API Testing