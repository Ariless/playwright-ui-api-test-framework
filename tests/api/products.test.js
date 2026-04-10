const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/apiClient');
const { endpoints } = require('../../data/testData');


test('Get products list', async () => {
    const response = await api.get(endpoints.productsList);
    // проверки
    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(200);
    expect(Array.isArray(response.data.products)).toBe(true);
    response.data.products.forEach (product => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.price).toBeDefined();
    });
});