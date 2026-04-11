require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/apiClient');
const { endpoints } = require('../../data/testData');

function createUserData(email, name) {
    return {
        name, email,
        password: process.env.PASSWORD,
        firstname: process.env.FIRSTNAME,
        lastname: process.env.LASTNAME,
        title: process.env.TITLE,
        birth_date: process.env.BIRTH_DATE,
        birth_month: process.env.BIRTH_MONTH,
        birth_year: process.env.BIRTH_YEAR,
        country: process.env.COUNTRY,
        mobile_number: process.env.MOBILE_NUMBER,
        address1: process.env.ADDRESS,
        city: process.env.CITY,
        state: process.env.STATE,
        zipcode: process.env.ZIPCODE
    };
}

test.describe('Users API', () => {

    test('User registration', async ({ request }) => {
        const id = Date.now();
        const user = createUserData(`test_${id}@test.com`, `user_${id}`);
        const response = await api.post(endpoints.account, user);

        expect(response.data.responseCode).toBe(201);
        expect(response.data.message).toBe('User created!');

        await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: user.email, password: user.password }
        });
    });

    test('User registration - duplicate email', async ({ request }) => {
        const id = Date.now();
        const user = createUserData(`test_${id}@test.com`, `user_${id}`);
        await api.post(endpoints.account, user);
        const response = await api.post(endpoints.account, user);

        expect(response.data.responseCode).toBe(400);

        await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: user.email, password: user.password }
        });
    });

    test('Delete user', async ({ request }) => {
        const id = Date.now();
        const user = createUserData(`test_${id}@test.com`, `user_${id}`);
        await api.post(endpoints.account, user);

        const response = await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: user.email, password: user.password }
        });
        const body = await response.json();

        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('Account deleted!');
    });

});