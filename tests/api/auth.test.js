require('dotenv').config();
const { test, expect } = require('../../fixtures/userFixture');
const { api } = require('../../utils/apiClient');
const { endpoints } = require('../../data/testData');

const password = process.env.PASSWORD;

test.describe('Verify Login API', () => {

    test('Verify valid credentials', async ({ user }) => {
        const { email, password } = user;
        const response = await api.post(endpoints.verifyLogin, { email, password });
        expect(response.data.responseCode).toBe(200);
        expect(response.data.message).toBe('User exists!');
    });

    test('Verify invalid password', async ({ user }) => {
        const { email } = user;
        const response = await api.post(endpoints.verifyLogin, { email, password: 'invalidPassword' });
        expect(response.data.responseCode).toBe(404);
        expect(response.data.message).toBe('User not found!');
    });

    test('Verify invalid email', async () => {
        const response = await api.post(endpoints.verifyLogin, { email: 'invalid email', password });
        expect(response.data.responseCode).toBe(404);
        expect(response.data.message).toBe('User not found!');
    });

    test('Verify missing password', async ({ user }) => {
        const { email } = user;
        const response = await api.post(endpoints.verifyLogin, { email, password: '' });
        expect(response.data.responseCode).toBe(404);
        expect(response.data.message).toBe('User not found!');
    });

    test('Verify missing email', async () => {
        const response = await api.post(endpoints.verifyLogin, { email: '', password });
        expect(response.data.responseCode).toBe(404);
        expect(response.data.message).toBe('User not found!');
    });
});