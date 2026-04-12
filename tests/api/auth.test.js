const { test, expect } = require('../../fixtures/userFixture');
const { AuthClient } = require('../../api/AuthClient');

const password = process.env.PASSWORD || 'Test1234!';

test.describe('Verify Login API @api', () => {

    test('Verify valid credentials', async ({ user, request }) => {
        const authClient = new AuthClient(request);
        const { email, password } = user;
        const response = await authClient.verifyLogin(email, password);
        expect((await response.json()).responseCode).toBe(200);
        expect((await response.json()).message).toBe('User exists!');
    });

    test('Verify invalid password', async ({ user, request }) => {
        const authClient = new AuthClient(request);
        const { email } = user;
        const response = await authClient.verifyLogin(email, 'invalidPassword');
        expect((await response.json()).responseCode).toBe(404);
        expect((await response.json()).message).toBe('User not found!');
    });

    test('Verify invalid email', async ( {request}) => {
        const authClient = new AuthClient(request);
        const response = await authClient.verifyLogin('invalid email', password);
        expect((await response.json()).responseCode).toBe(404);
        expect((await response.json()).message).toBe('User not found!');
    });

    test('Verify missing password', async ({ user, request }) => {
        const authClient = new AuthClient(request);
        const { email } = user;
        const response = await authClient.verifyLogin(email, '');
        expect((await response.json()).responseCode).toBe(404);
        expect((await response.json()).message).toBe('User not found!');
    });

    test('Verify missing email', async ({request}) => {
        const authClient = new AuthClient(request);
        const response = await authClient.verifyLogin('', password);
        expect((await response.json()).responseCode).toBe(404);
        expect((await response.json()).message).toBe('User not found!');
    });
});
