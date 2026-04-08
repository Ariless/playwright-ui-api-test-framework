/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
    testDir: './tests',
    timeout: 30000,
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    reporter: [['html', { outputFolder: 'playwright-report' }]],
};