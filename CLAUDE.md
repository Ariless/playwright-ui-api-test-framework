# Project: playwright-ui-api-test-framework

## Тестируемый сайт
https://automationexercise.com

## Что это

QA-проект Дарьи для написания UI и API автотестов на Playwright.
Цель — учиться и практиковать профессиональные подходы к автоматизации тестирования.

## Стек

- **Playwright** (`@playwright/test`) — UI-тесты и API-тесты (встроенный `request`)
- **Node.js / JavaScript** (CommonJS)

## Принципы и паттерны, которые мы применяем

### Архитектурные паттерны
- **Page Object Model (POM)** — каждая страница описывается отдельным классом с локаторами и методами
- **Page Factory** — `pages/PageFactory.js` инициализирует все Page Object-ы, тесты не вызывают `new PageClass()` напрямую
- **Base Page** — общая логика навигации и dismissCookies вынесена в `BasePage`, все Page Object-ы наследуют от него
- **API Client Layer** — `api/UserClient.js`, `api/AuthClient.js`, `api/ProductClient.js` инкапсулируют все API вызовы, тесты не знают про эндпоинты и форматы запросов

### Принципы чистого кода
- **DRY** (Don't Repeat Yourself) — повторяющаяся логика выносится в хелперы / базовые классы
- **SRP** (Single Responsibility Principle) — каждый класс/файл отвечает только за одно
  - Page Object — только локаторы + действия на странице
  - тест-файл — только сценарии
  - хелпер — только утилитарная логика

### Организация тестов
- **Fixtures / Setup-Teardown** — кастомные Playwright fixtures: `user` (API create/delete) + `loggedInPage`
- **Atomic / Independent Tests** — каждый тест независим, не зависит от результата другого
- **Test Tagging** — `@smoke`, `@ui`, `@api`, `@e2e` для запуска нужного набора
- **Naming & Structure** — понятные имена тестов и файлов, логичная структура папок

### Качество тестов
- **Assertions & Error Handling** — используем `expect` с понятными сообщениями, обрабатываем ошибки явно
- **Best practices**: нет хардкода, нет `sleep`, используем `waitFor*` методы Playwright

### Инфраструктура
- **CI/CD** — GitHub Actions (`.github/workflows/playwright.yml`), запуск на push/PR в main
- **Reporting** — Playwright HTML-репорт + Allure (`allure-playwright`)

## Структура проекта

```
my-test-framework/
├── pages/                        # Page Object классы
│   ├── BasePage.js               # Базовый класс: navigate, open, dismissCookies
│   ├── PageFactory.js            # Фабрика: создаёт все Page Object-ы
│   ├── LoginPage.js              # Страница логина и регистрации
│   ├── SignupPage.js             # Форма создания аккаунта
│   ├── ProductsPage.js           # Страница списка продуктов (поиск)
│   ├── ProductPage.js            # Страница деталей продукта
│   ├── CartPage.js               # Корзина
│   ├── CheckoutPage.js           # Оформление заказа
│   ├── PaymentPage.js            # Страница оплаты
│   └── ConfirmationPage.js       # Страница подтверждения заказа
├── tests/
│   ├── ui/                       # UI тесты — поведение пользователя
│   │   ├── auth.test.js          # Логин: валидные/невалидные креды, logout
│   │   ├── products.test.js      # Поиск продуктов, просмотр деталей
│   │   └── cart.test.js          # Корзина: добавление, количество, persistence
│   ├── api/                      # API тесты — backend валидация
│   │   ├── auth.test.js          # verifyLogin: позитивные и негативные сценарии
│   │   ├── products.test.js      # productsList и searchProduct: схема и поля
│   │   └── users.test.js         # Создание, дубликат, удаление пользователя
│   └── e2e/                      # E2E тесты — бизнес сценарии
│       ├── purchase-flow.test.js        # Полный флоу покупки для залогиненного юзера
│       ├── guest-checkout.test.js       # Регистрация во время checkout (гость → покупка)
│       ├── product-consistency.test.js  # Цена на странице продукта = цена в корзине
│       └── negative-checkout.test.js    # Нельзя оплатить с пустой формой
├── api/                          # API Client Layer
│   ├── UserClient.js             # create(), delete()
│   ├── AuthClient.js             # verifyLogin()
│   └── ProductClient.js          # getAll(), search()
├── fixtures/
│   └── userFixture.js            # Фикстуры: user (создаёт/удаляет через UserClient) + loggedInPage
├── utils/
│   └── userUtils.js              # generateUser() — генерация тестовых данных пользователя
├── data/
│   └── testData.js               # API эндпоинты и общие тестовые данные (cardData)
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI: запуск тестов + загрузка Allure и HTML репортов
├── .env                          # Секреты: BASE_URL (не в git)
├── playwright.config.js
└── CLAUDE.md                     # Этот файл
```

## Моя роль (Claude Code)

- Проверяю правильность, логичность и чистоту написания кода
- Указываю на нарушения DRY, SRP и других принципов
- Советую best practices и паттерны тест-автоматизации
- Даю рекомендации по структуре и именованию
- Помогаю с настройкой CI/CD и репортинга