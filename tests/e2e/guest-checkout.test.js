const { test, expect } = require('@playwright/test');
const { generateUser } = require('../../utils/userUtils');
const { PageFactory } = require('../../pages/PageFactory');
const { cardData } = require('../../data/testData');
const { UserClient } = require('../../api/UserClient');

test('Guest registers during checkout and places order @e2e', async ({  page, request  }) => {
    const productsPage = new PageFactory(page).productsPage();
    const userClient = new UserClient(request);
    const productId = 1;
    await productsPage.openProduct(productId);
    const productPage = new PageFactory(page).productPage(productId);
    await productPage.addToCart();
    const cartPage = new PageFactory(page).cartPage();
    await expect(cartPage.getProduct(productId)).toBeVisible();

    await cartPage.checkout();
    await cartPage.proceedToLogin();

    const loginPage = new PageFactory(page).loginPage();
    const user = generateUser();
    await loginPage.signUp(user.name, user.email);

    const signupPage = new PageFactory(page).signupPage();
    await signupPage.createAccount(user);
    await expect(signupPage.accountCreatedMessage).toBeVisible();
    await signupPage.continueAfterCreation()
    await expect(page.locator('a[href="/logout"]')).toBeVisible()

    await cartPage.open();
    await cartPage.checkout();
    const checkoutPage = new PageFactory(page).checkoutPage();
    await checkoutPage.placeOrder();

    const paymentPage = new PageFactory(page).paymentPage();
    await paymentPage.fillPaymentForm(cardData)
    await paymentPage.confirmPayment()

    const confirmationPage = new PageFactory(page).confirmationPage();
    await expect(page).toHaveURL(/payment_done/);
    await expect(confirmationPage.confirmationMessage).toBeVisible();
    await expect(confirmationPage.continueButton).toBeVisible();

    await userClient.delete(user.email, user.password)
});