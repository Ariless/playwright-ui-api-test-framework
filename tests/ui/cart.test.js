const { test, expect } = require('../../fixtures/userFixture');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('Cart UI @ui', () => {

    test('Add product to cart @smoke', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new ProductsPage(page);
        await productsPage.search('dress');
        const productId = await productsPage.getFirstProductId();
        await productsPage.openProduct(productId);
        const productPage = new ProductPage(page, productId);
        await productPage.addToCart();
        const cartPage = new CartPage(page);

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await cartPage.clearCart();
    });

    test('Cart persistence', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new ProductsPage(page);
        await productsPage.search('tshirt');
        const productId = await productsPage.getFirstProductId();
        await productsPage.openProduct(productId);
        const productPage = new ProductPage(page, productId);
        await productPage.addToCart();
        const cartPage = new CartPage(page);
        await page.reload();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await cartPage.clearCart();
    });


    test('Add product with quantity', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new ProductsPage(page);
        await productsPage.search('top');
        const productId = await productsPage.getFirstProductId();
        await productsPage.openProduct(productId);
        const productPage = new ProductPage(page, productId);
        const quantity = 2;
        await productPage.setQuantity(quantity);
        await productPage.addToCart();
        const cartPage = new CartPage(page);

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await expect(cartPage.getProductQuantity(productId)).toHaveText(String(quantity));
        await cartPage.clearCart();
    });

});