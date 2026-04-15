const { test, expect } = require('../../fixtures/userFixture');
const { UserClient } = require('../../api/UserClient');
const { generateUser } = require('../../utils/userUtils');
const { updatedUserData } = require('../../data/testData')
const { validateUser } = require('../../data/schemas');

test.describe('Users API @api', () => {

    test('User registration', async ({ request }) => {
        const userClient = new UserClient(request);
        const user = generateUser();
        const { body } = await userClient.create(user);
        expect(body.responseCode).toBe(201);
        expect(body.message).toBe('User created!');

        await userClient.delete( user.email, user.password )
    });

    test('User registration - duplicate email', async ({ request, user }) => {
        const userClient = new UserClient(request);
        const { body } = await userClient.create(user);
        expect(body.responseCode).toBe(400);
    });

    test('Get user detail by email', async ({ request, user }) => {
        const userClient = new UserClient(request);
        const { body } = await userClient.getByEmail(user.email)
        expect(body.responseCode).toBe(200);
        expect(body.user.email).toBe(user.email);
        expect(body.user.name).toBe(user.name);

        const valid = validateUser(body.user);
        expect(valid).toBe(true);
        expect(user.email).toBeTruthy();
        expect(user.name).toBeTruthy();
        expect(user.address1).toBeTruthy();
        expect(user.city).toBeTruthy();
    });

    test('Update user account', async ({ request, user }) => {
        const userClient = new UserClient(request);
        const updatedUser = { ...user, ...updatedUserData };
        const { body } = await userClient.update(updatedUser)
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User updated!');
    });

    test('Delete user', async ({ request }) => {
        const userClient = new UserClient(request);
        const user = generateUser();
        await userClient.create(user);


        const { body } = await userClient.delete(user.email, user.password);

        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('Account deleted!');
    });

});