// @ts-check
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    // Папка где лежат тесты
    testDir: './tests',

    // Максимальное время на один тест (в миллисекундах)
    timeout: 90_000,

    // Сколько раз повторить упавший тест
    retries: 1,

    // Репортер — используй 'html'
    reporter: [
        ['list'],
        ['html'],
        ['allure-playwright']
    ],

    use: {
        // Базовый URL берём из .env
        baseURL: process.env.BASE_URL,

        // Запускать браузер без UI (true) или с UI (false)
        headless: true,

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        // Один проект — chromium, используй devices['Desktop Chrome']
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});