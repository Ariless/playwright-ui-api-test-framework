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
        this.productNames = page.locator('.features_items .col-sm-4');
        this.firstProductLink = page.locator('.choose a').first();
        this.womenCategory = page.locator('a[href="#Women"]');
        // this.categoryLinks = page.locator('.panel-body a[href*="category_products"]');
        this.womenDress = page.locator('a[href="/category_products/1"]');
        this.womenTops = page.locator('a[href="/category_products/2"]');
        this.womenSaree = page.locator('a[href="/category_products/3"]');
    }

    async search(query) {
        await this.navigate(this.url);
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async openFirstProduct() {
        await this.firstProductLink.click();
    }

    async getFirstProductId() {
        const href = await this.firstProductLink.getAttribute('href');
        return parseInt(href.split('/').pop());
    }

    async openProduct(productId) {
        await this.navigate(`/product_details/${productId}`);
    }

    async filterByCategory(parentCategory, subCategory) {
        await this.page.locator(`a[href="${parentCategory}"]`).click();
        await this.page.locator(`${parentCategory} .panel-body a`, { hasText: subCategory }).click();
    }
}

module.exports = { ProductsPage };