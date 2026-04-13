const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');

test('Search and view product details @ui', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    const count = await productsPage.productNames.count();
    expect(count).toBeGreaterThan(0);

    await productsPage.openFirstProduct();
    const productPage = new ProductPage(page);
    await expect(productPage.productInformation).toBeVisible();
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.price).toBeVisible();
})