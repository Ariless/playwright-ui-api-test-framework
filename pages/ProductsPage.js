const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url = '/products';
        this.searchInput = page.locator('input[name="search"]');
        this.searchButton = page.locator('#submit_search');
        this.results = page.locator('.features_items');
        this.productNames = page.locator('.features_items p');
        this.firstProductLink = page.locator('.choose a').first();
        this.productInformation = page.locator('.product-information');
        this.productName = page.locator('.product-information h2')
        this.productPrice = page.locator('.product-information span span')
    }

    async search(query) {
        await this.navigate(this.url);
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async openFirstProduct() {
        await this.firstProductLink.click();
    }

    async openProduct(productId) {
        await this.navigate(`/product_details/${productId}`);
    }
}

module.exports = { ProductsPage };