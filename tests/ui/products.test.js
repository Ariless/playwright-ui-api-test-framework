const { test, expect } = require('@playwright/test');
const { ProductsPage } = require("../../pages/ProductsPage");

test('Search and view product details', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    const count = await productsPage.productNames.count();
    expect(count).toBeGreaterThan(0);

    await productsPage.openFirstProduct();
    await expect(productsPage.productInformation).toBeVisible();
    await expect(productsPage.productName).toBeVisible();
    await expect(productsPage.productPrice).toBeVisible();
})