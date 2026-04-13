// @ts-check
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    // Directory where tests are located
    testDir: './tests',

    // Timeout per test in milliseconds
    timeout: 90_000,

    // Retry once on failure to handle transient issues
    retries: 1,

    // Reporters
    reporter: [
        ['list'],
        ['html'],
        ['allure-playwright']
    ],

    use: {
        // Base URL loaded from .env
        baseURL: process.env.BASE_URL,

        // Run in headless mode
        headless: true,

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        // Single project — Chromium
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});