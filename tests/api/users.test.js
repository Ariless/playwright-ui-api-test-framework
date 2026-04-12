const { test, expect } = require('@playwright/test');
const { UserClient } = require('../../api/UserClient');
const { generateUser } = require('../../utils/userUtils');

test.describe('Users API @api', () => {

    test('User registration', async ({ request }) => {
        const userClient = new UserClient(request);
        const user = generateUser();
        const response = await userClient.create(user);

        expect((await response.json()).responseCode).toBe(201);
        expect((await response.json()).message).toBe('User created!');

        await userClient.delete( user.email, user.password )
    });

    test('User registration - duplicate email', async ({ request }) => {
        const userClient = new UserClient(request);
        const user = generateUser();
        await userClient.create(user);
        const response = await userClient.create(user);

        expect((await response.json()).responseCode).toBe(400);

        await userClient.delete( user.email, user.password )

    });

    test('Delete user', async ({ request }) => {
        const userClient = new UserClient(request);
        const user = generateUser();
        await userClient.create(user);

        const response = await userClient.delete( user.email, user.password )

        const body = await response.json();

        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('Account deleted!');
    });

});