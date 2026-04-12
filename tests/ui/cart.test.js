const { test, expect } = require('../../fixtures/userFixture');
const { PageFactory } = require('../../pages/PageFactory');

test.describe('Cart UI @ui', () => {

    test('Add product to cart @smoke', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new PageFactory(page).productsPage();
        const productId = 5;
        await productsPage.openProduct(productId);
        const productPage = new PageFactory(page).productPage(productId);
        await productPage.addToCart();
        const cartPage = new PageFactory(page).cartPage();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await cartPage.clearCart();
    });

    test('Cart persistence', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new PageFactory(page).productsPage();
        const productId = 2;
        await productsPage.openProduct(productId);
        const productPage = new PageFactory(page).productPage(productId);
        await productPage.addToCart();
        const cartPage = new PageFactory(page).cartPage();
        await page.reload();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await cartPage.clearCart();
    });


    test('Add product with quantity', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage =new PageFactory(page).productsPage();
        const productId = 6;
        await productsPage.openProduct(productId);
        const productPage = new PageFactory(page).productPage(productId);
        const quantity = 2;
        await productPage.setQuantity(quantity);
        await productPage.addToCart();
        const cartPage = new PageFactory(page).cartPage();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await expect(cartPage.getProductQuantity(productId)).toHaveText(String(quantity));
        await cartPage.clearCart();
    });

});