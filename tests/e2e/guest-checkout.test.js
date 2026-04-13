const { test, expect } = require('@playwright/test');
const { generateUser } = require('../../utils/userUtils');
const { cardData } = require('../../data/testData');
const { UserClient } = require('../../api/UserClient');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { LoginPage } = require('../../pages/LoginPage');
const { SignupPage } = require('../../pages/SignupPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { PaymentPage } = require('../../pages/PaymentPage');
const { ConfirmationPage } = require('../../pages/ConfirmationPage');

test('Guest registers during checkout and places order @e2e', async ({  page, request  }) => {
    const productsPage = new ProductsPage(page);
    const userClient = new UserClient(request);
    await productsPage.search('Blue Top');
    const productId = await productsPage.getFirstProductId();
    await productsPage.openProduct(productId);
    const productPage = new ProductPage(page, productId);
    await productPage.addToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.getProduct(productId)).toBeVisible();

    await cartPage.checkout();
    await cartPage.proceedToLogin();

    const loginPage = new LoginPage(page);
    const user = generateUser();
    await loginPage.signUp(user.name, user.email);

    const signupPage = new SignupPage(page);
    await signupPage.createAccount(user);
    await expect(signupPage.accountCreatedMessage).toBeVisible();
    await signupPage.continueAfterCreation()
    await expect(page.locator('a[href="/logout"]')).toBeVisible()

    await cartPage.open();
    await cartPage.checkout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.placeOrder();

    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentForm(cardData)
    await paymentPage.confirmPayment()

    const confirmationPage = new ConfirmationPage(page);
    await expect(page).toHaveURL(/payment_done/);
    await expect(confirmationPage.confirmationMessage).toBeVisible();
    await expect(confirmationPage.continueButton).toBeVisible();

    await userClient.delete(user.email, user.password)
});