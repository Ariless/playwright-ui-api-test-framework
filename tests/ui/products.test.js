const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { categories } = require('../../data/testData');

test.describe('Products UI @ui', () => {

    test('Search and view product details @smoke', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.search('Blue Top');
        const count = await productsPage.productNames.count();
        expect(count).toBeGreaterThan(0);

        await productsPage.openFirstProduct();
        const productPage = new ProductPage(page);
        await expect(productPage.productInformation).toBeVisible();
        await expect(productPage.productName).toBeVisible();
        await expect(productPage.price).toBeVisible();
    });

    test('Search with no results shows empty state', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.search('zzz_no_such_item_xyz');
        const count = await productsPage.productNames.count();
        expect(count).toBe(0);
    })

    test('Products list loads on page open', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.navigate(productsPage.url);
        const count = await productsPage.productNames.count();
        expect(count).toBeGreaterThan(0);
    });

    for (const { parent, sub, urlId } of categories) {
        test(`Filter by ${parent} > ${sub}`, async ({ page }) => {
            const productsPage = new ProductsPage(page);
            await productsPage.navigate(productsPage.url);
            await productsPage.filterByCategory(parent, sub);
            await expect(page).toHaveURL(new RegExp(`category_products/${urlId}`));
            const count = await productsPage.productNames.count();
            expect(count).toBeGreaterThan(0);
        });
    }

});