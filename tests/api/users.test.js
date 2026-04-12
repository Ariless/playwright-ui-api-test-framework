require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/apiClient');
const { endpoints } = require('../../data/testData');
const { generateUser } = require('../../utils/userUtils');

test.describe('Users API', () => {

    test('User registration', async ({ request }) => {
        const id = Date.now();
        const user = generateUser();
        const response = await api.post(endpoints.account, user);

        expect(response.data.responseCode).toBe(201);
        expect(response.data.message).toBe('User created!');

        await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: user.email, password: user.password }
        });
    });

    test('User registration - duplicate email', async ({ request }) => {
        const id = Date.now();
        const user = generateUser();
        await api.post(endpoints.account, user);
        const response = await api.post(endpoints.account, user);

        expect(response.data.responseCode).toBe(400);

        await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: user.email, password: user.password }
        });
    });

    test('Delete user', async ({ request }) => {
        const id = Date.now();
        const user = generateUser();
        await api.post(endpoints.account, user);

        const response = await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: user.email, password: user.password }
        });
        const body = await response.json();

        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('Account deleted!');
    });

});