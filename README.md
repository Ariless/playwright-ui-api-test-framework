# Playwright UI + API Test Automation Framework

A scalable end-to-end test automation framework built with **Playwright (JavaScript)** covering **UI, API, and E2E testing** for an e-commerce application.

---

## What This Framework Demonstrates

- **API-driven test data management** — users are created and deleted via API calls, not UI flows, keeping tests fast and isolated
- **Layered architecture** — clear separation between test scenarios, page interactions, and API communication
- **Real E2E business flows** — full purchase flow including checkout, payment, and invoice validation
- **Schema-level API validation** — JSON schema validation with AJV ensures API contract stability
- **CI/CD integration** — automated test runs on every push with Allure and HTML reports as artifacts
- **Hybrid testing strategy** — UI tests for user behavior, API tests for backend validation, E2E for business flows

---

## Tech Stack

- Playwright (`@playwright/test`) — UI tests + API tests via built-in `request`
- JavaScript (Node.js / CommonJS)
- Page Object Model (POM)
- API Client Layer (`UserClient`, `AuthClient`, `ProductClient`)
- Custom Playwright Fixtures for reusable flows
- Test tagging (`@smoke`, `@ui`, `@api`, `@e2e`)
- Environment-based configuration (.env)
- GitHub Actions CI/CD
- Allure + Playwright HTML reporting

---

## Project Purpose

This framework simulates a real QA automation environment where:

- UI tests validate user journeys
- API tests handle data setup and backend validation
- E2E tests simulate real business flows
- Test data is isolated and reusable

---

## Architecture

```
my-test-framework/
├── tests/
│   ├── ui/        # UI test scenarios (auth, products, cart)
│   ├── api/       # API tests (auth, products, users)
│   └── e2e/       # End-to-end business flows
├── pages/         # Page Object Model
├── api/           # API Client Layer (UserClient, AuthClient, ProductClient)
├── fixtures/      # Reusable test setup (user lifecycle, logged-in session)
├── utils/         # User data generator
└── data/          # Endpoints and shared test data
```

---

## Test Strategy

### UI Tests
- Authentication flows (valid / invalid credentials, logout)
- Product search and detail page validation
- Cart operations (add, quantity, persistence)

### API Tests
- User management (create, duplicate, delete)
- Product endpoints (schema, fields, search)
- Auth endpoint (valid / invalid / missing credentials)

### E2E Tests
- Full purchase flow — registered user (login → cart → checkout → payment)
- Guest checkout — register during checkout, then complete purchase
- Price consistency — product page price matches cart price
- Negative checkout — empty payment form blocks order placement

---

## UI + API Integration Approach

This framework follows a hybrid testing strategy:

- API used for **test data setup** (user creation via fixture)
- UI used for **user behavior simulation**
- API used for **teardown** (user deletion after test)

Example flow:

1. Create user via API (fixture setup)
2. Login via UI
3. Add product to cart via UI
4. Complete checkout via UI
5. Delete user via API (fixture teardown)

---

## Setup & Installation

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
# Run all tests (regression)
npx playwright test

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @ui
npx playwright test --grep @api
npx playwright test --grep @e2e

# Run by folder
npx playwright test tests/ui
npx playwright test tests/api
npx playwright test tests/e2e
```

---

## Reporting

```bash
# Playwright HTML report
npx playwright show-report

# Allure report
npx allure serve allure-results
```

---

## Running with Docker

```bash
# Build image
docker build -t playwright-tests .

# Run all tests
docker run --rm -e BASE_URL=https://automationexercise.com playwright-tests

# Run smoke tests only
docker run --rm -e BASE_URL=https://automationexercise.com playwright-tests npx playwright test --grep @smoke
```

---

## CI/CD

Tests run automatically on every push and pull request to `main` via GitHub Actions.

Pipeline runs in stages:

1. **smoke** — runs first; blocks other jobs if it fails
2. **api**, **ui**, **e2e** — run in parallel after smoke passes

Artifacts uploaded on each run:
- Playwright HTML report per job (smoke, api, ui, e2e)
- Screenshots / videos / traces (on failure)

---

## Architecture Decisions & Trade-offs

### Why API Client Layer?
All API calls are encapsulated in `UserClient`, `AuthClient`, and `ProductClient` — tests never reference endpoints or request formats directly. This means if the API changes, only the client class needs updating, not every test that uses it.

### Why no PageFactory?
PageFactory is a pattern from Java/Selenium that provided real value there (lazy element initialization). In Playwright, elements are already lazy by default — so a factory that just wraps `new PageClass(page)` adds indirection with no benefit. Direct instantiation is clearer and easier to explain.

### Why Playwright's built-in `request` instead of axios?
Playwright's `request` context integrates natively with the test runner: API calls appear in traces, share the same timeout config, and don't require an extra dependency. For a framework that already depends on Playwright, this is the obvious choice.

### Why hybrid UI + API approach?
Test data setup and teardown (user creation/deletion) is done via API — it's faster and more reliable than UI flows. The UI is only used where it matters: validating actual user-facing behavior. This keeps tests fast and focused.

### What is NOT tested
- Visual regression (out of scope — would require a dedicated visual testing tool)
- Cross-browser coverage (Chromium only — sufficient for demonstrating framework architecture)
- Performance and load testing (separate concern, separate tooling)
- Mobile viewports (not in scope for this project)

---

## Key Engineering Highlights

- **API Client Layer** — `UserClient`, `AuthClient`, `ProductClient` encapsulate all API calls; tests contain only scenarios
- **Page Object Model** — each page is a dedicated class with locators and actions; tests contain only scenarios
- **Playwright-native API testing** — no external HTTP libraries; uses built-in `request` fixture for full trace integration
- **API-driven test data** — users created and deleted via API in fixtures; tests are fully isolated
- **SRP enforced** — Page Objects contain only locators and actions, assertions stay in tests
- **Test tagging** — `@smoke` suite runs in under 2 minutes; `@api`, `@ui`, `@e2e` for targeted runs
- **Stable locators** — `data-qa` attributes preferred over CSS/XPath
- **No hardcoded credentials** — fallback constants with `.env` override

---

## Author

QA Automation Engineer | Playwright | JavaScript | API Testing