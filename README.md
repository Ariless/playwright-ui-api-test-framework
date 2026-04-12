# Playwright UI + API Test Automation Framework

A scalable end-to-end test automation framework built with **Playwright (JavaScript)** covering **UI, API, and E2E testing** for an e-commerce application.

The project demonstrates real-world automation practices including API-driven test data setup, UI validation, reusable architecture, and CI integration.

---

## Tech Stack

- Playwright (`@playwright/test`) — UI tests + API tests via built-in `request`
- JavaScript (Node.js / CommonJS)
- Page Object Model (POM) + Page Factory
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
├── pages/         # Page Object Model + PageFactory
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

## CI/CD

Tests run automatically on every push and pull request to `main` via GitHub Actions.

Artifacts uploaded on each run:
- Allure results
- Playwright HTML report
- Screenshots / videos / traces (on failure)

---

## Key Engineering Highlights

- **API Client Layer** — `UserClient`, `AuthClient`, `ProductClient` encapsulate all API calls; tests contain only scenarios
- **Page Factory pattern** — all Page Objects created through `PageFactory`, no `new PageClass()` in tests
- **Playwright-native API testing** — no external HTTP libraries; uses built-in `request` fixture for full trace integration
- **API-driven test data** — users created and deleted via API in fixtures; tests are fully isolated
- **SRP enforced** — Page Objects contain only locators and actions, assertions stay in tests
- **Test tagging** — `@smoke` suite runs in under 2 minutes; `@api`, `@ui`, `@e2e` for targeted runs
- **Stable locators** — `data-qa` attributes preferred over CSS/XPath
- **No hardcoded credentials** — fallback constants with `.env` override

---

## Author

QA Automation Engineer | Playwright | JavaScript | API Testing