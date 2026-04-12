const { test, expect } = require('@playwright/test');
const { PageFactory } = require("../../pages/PageFactory");

test('Search and view product details @ui', async ({ page }) => {
    const productsPage = new PageFactory(page).productsPage();
    await productsPage.search('Blue Top');
    const count = await productsPage.productNames.count();
    expect(count).toBeGreaterThan(0);

    await productsPage.openFirstProduct();
    const productPage = new PageFactory(page).productPage();
    await expect(productPage.productInformation).toBeVisible();
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.price).toBeVisible();
})