const { test, expect } = require('../../fixtures/userFixture');
const { AuthClient } = require('../../api/AuthClient');

const password = process.env.PASSWORD || 'Test1234!';

test.describe('Verify Login API @api', () => {

    test('Verify valid credentials', async ({ user, request }) => {
        const authClient = new AuthClient(request);
        const { email, password } = user;
        const { body } = await authClient.verifyLogin(email, password);
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User exists!');
    });

    test('Verify invalid password', async ({ user, request }) => {
        const authClient = new AuthClient(request);
        const { email } = user;
        const { body } = await authClient.verifyLogin(email, 'invalidPassword');
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

    test('Verify invalid email', async ( {request}) => {
        const authClient = new AuthClient(request);
        const { body } = await authClient.verifyLogin('invalid email', password);
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

    test('Verify missing password', async ({ user, request }) => {
        const authClient = new AuthClient(request);
        const { email } = user;
        const { body } = await authClient.verifyLogin(email, '');
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

    test('Verify missing email', async ({request}) => {
        const authClient = new AuthClient(request);
        const { body } = await authClient.verifyLogin('', password);
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });
});
