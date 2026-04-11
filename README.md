# Playwright UI + API Test Automation Framework

A scalable end-to-end test automation framework built with **Playwright (JavaScript)** covering **UI, API, and E2E testing** for an e-commerce application.

The project demonstrates real-world automation practices including API-driven test data setup, UI validation, reusable architecture, and CI integration.

---

## Tech Stack

- Playwright (`@playwright/test`)
- JavaScript (Node.js / CommonJS)
- axios — REST API client
- Page Object Model (POM)
- Fixtures for reusable flows
- Environment-based configuration (.env)

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
├── fixtures/      # Reusable test setup
├── utils/         # API client, helpers
└── data/          # Endpoints and test data
```

---

## Test Strategy

### UI Tests
- Authentication flows (valid / invalid credentials)
- Product search and validation
- Cart operations

### API Tests
- User management (create, verify, delete)
- Product endpoints validation (schema, fields)

### E2E Tests
- User lifecycle (API: create → get → delete)
- Full purchase flow (API setup + UI interaction)
- Data consistency validation (API vs UI)

---

## UI + API Integration Approach

This framework follows a hybrid testing strategy:

- API used for **test data setup**
- UI used for **user behavior simulation**
- API used for **final validation**

Example flow:

1. Create user via API
2. Login via UI
3. Add product to cart via UI
4. Validate state via API

---

## Setup & Installation

```bash
git clone https://github.com/Ariless/playwright-ui-api-test-framework.git
cd playwright-ui-api-test-framework
npm install
npx playwright install
```

Create a `.env` file based on the example below.

---

## Environment Variables

```
BASE_URL=https://automationexercise.com
EMAIL=test@example.com
PASSWORD=securepassword
NAME=Test_User
FIRSTNAME=Test
LASTNAME=User
TITLE=Mr
BIRTH_DATE=1
BIRTH_MONTH=1
BIRTH_YEAR=2000
COUNTRY=United States
MOBILE_NUMBER=1234567890
ADDRESS=123 Main St
CITY=New York
STATE=NY
ZIPCODE=10001
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run UI tests
npx playwright test tests/ui

# Run API tests
npx playwright test tests/api

# Run E2E tests
npx playwright test tests/e2e
```

---

## Reporting

Playwright HTML Reporter:

```bash
npx playwright show-report
```

---

## Key Engineering Highlights

- Modular and scalable framework design
- Clean separation between UI, API, and E2E layers
- API-driven test data management
- Reusable fixtures and page objects
- Environment-based configuration
- Stable locator strategy using data-qa attributes

---

## Future Improvements

- GitHub Actions CI pipeline
- Allure reporting integration
- Test tagging (smoke / regression)
- Data-driven tests with multiple datasets
- Visual regression testing

---

## Author

QA Automation Engineer | Playwright | JavaScript | API Testing