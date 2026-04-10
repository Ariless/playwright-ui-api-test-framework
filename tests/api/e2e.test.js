const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/apiClient');
const { endpoints } = require('../../data/testData');

const testUser = {
    name: 'Test User',
    email: 'e2e_test@email.com',
    password: 'Password123!',
    firstname: 'Test',
    lastname: 'User',
    title: 'Mr',
    birth_date: '1',
    birth_month: '1',
    birth_year: '2000',
    country: 'United States',
    mobile_number: '1234567890',
    address1: '123 Test St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
};


test('Full user lifecycle', async () => {

    const response = await api.post(endpoints.account, testUser)
    expect(response.data.responseCode).toBe(201);

    const user = await api.get(endpoints.getUser, { params: { email: testUser.email } })
    expect(user.data.user.email).toBe(testUser.email);

    const clear = await api.delete(endpoints.deleteUser, { data: { email: testUser.email, password: testUser.password } });
    expect(clear.data.responseCode).toBe(200);
})