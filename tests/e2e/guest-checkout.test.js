require('dotenv').config()
const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { PaymentPage } = require('../../pages/PaymentPage');
const { generateUser } = require('../../utils/userUtils');
const {LoginPage} = require("../../pages/LoginPage");
const {SignupPage} = require("../../pages/SignupPage");

test('Guest registers during checkout and places order', async ({  page, request  }) => {
    const productsPage = new ProductsPage(page);
    const productId = 1;
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
    const cardData = {
        nameOnCard: 'Test User',
        cardNumber: '4111111111111111',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2027'
    };
    await paymentPage.fillPaymentForm(cardData)
    await paymentPage.confirmPayment()

    await expect(page).toHaveURL('payment_done/500')
    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
    await expect(page.locator('[data-qa="continue-button"]')).toBeVisible();

    await request.delete(process.env.BASE_URL + '/api/deleteAccount', { form: { email: user.email, password: user.password } })
});