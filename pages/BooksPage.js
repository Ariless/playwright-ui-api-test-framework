// pages/booksPage.js
const { expect } = require('@playwright/test');

class BooksPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.tableRows = page.locator('.rt-tr-group');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/books');
    }

    async expectBookExists(bookTitle) {
        await expect(this.tableRows).toContainText(bookTitle, { timeout: 60000 });
    }
}

module.exports = { BooksPage };