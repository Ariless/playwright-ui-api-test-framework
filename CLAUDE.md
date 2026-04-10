# Project: my-test-framework

## Тестируемый сайт
https://automationexercise.com

## Что это

QA-проект Дарьи для написания UI и API автотестов на Playwright + axios.
Цель — учиться и практиковать профессиональные подходы к автоматизации тестирования.

## Стек

- **Playwright** (`@playwright/test`) — UI-тесты в браузере
- **axios** — HTTP-клиент для API-тестов
- **Node.js / JavaScript** (CommonJS)

## Принципы и паттерны, которые мы применяем

### Архитектурные паттерны
- **Page Object Model (POM)** — каждая страница описывается отдельным классом с локаторами и методами
- **Page Factory** — фабричный метод для инициализации Page Object-ов, чтобы не создавать их вручную в каждом тесте

### Принципы чистого кода
- **DRY** (Don't Repeat Yourself) — повторяющаяся логика выносится в хелперы / базовые классы
- **SRP** (Single Responsibility Principle) — каждый класс/файл отвечает только за одно
  - Page Object — только локаторы + действия на странице
  - тест-файл — только сценарии
  - хелпер — только утилитарная логика

### Организация тестов
- **Fixtures / Setup-Teardown** — через `test.beforeEach`, `test.afterEach`, кастомные Playwright fixtures
- **Atomic / Independent Tests** — каждый тест независим, не зависит от результата другого
- **Naming & Structure** — понятные имена тестов и файлов, логичная структура папок

### Качество тестов
- **Assertions & Error Handling** — используем `expect` с понятными сообщениями, обрабатываем ошибки явно
- **Best practices**: нет хардкода, нет `sleep`, используем `waitFor*` методы Playwright

### Инфраструктура
- **CI/CD** — настройка запуска тестов в CI (GitHub Actions или аналог)
- **Reporting** — Playwright HTML-репорт, возможно Allure

## Структура проекта

```
my-test-framework/
├── pages/                  # Page Object классы
│   ├── BasePage.js         # Базовый класс для всех Page Object-ов
│   ├── LoginPage.js        # Страница логина
│   └── PageFactory.js      # (планируется) фабрика для создания Page Object-ов
├── tests/
│   ├── ui/                 # UI тесты (Playwright)
│   │   └── login.test.js
│   └── api/                # API тесты (axios)
├── fixtures/
│   └── userFixture.js      # Кастомная фикстура: верификация пользователя через API
├── utils/
│   ├── apiClient.js        # Базовый axios-клиент
│   └── createUser.js       # Одноразовый скрипт для создания тестового пользователя
├── data/
│   └── testData.js         # API эндпоинты и тестовые данные
├── .env                    # Секреты: email, password, адрес, BASE_URL (не в git)
├── playwright.config.js
└── CLAUDE.md               # Этот файл
```

## Моя роль (Claude Code)

- Проверяю правильность, логичность и чистоту написания кода
- Указываю на нарушения DRY, SRP и других принципов
- Советую best practices и паттерны тест-автоматизации
- Даю рекомендации по структуре и именованию
- Помогаю с настройкой CI/CD и репортинга