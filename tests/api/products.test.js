const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/apiClient');
const { endpoints } = require('../../data/testData');


test('Get products list', async () => {
    const response = await api.get(endpoints.productsList);
    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(200);
    expect(Array.isArray(response.data.products)).toBe(true);
    expect(response.data.products.length).toBeGreaterThan(0);
    response.data.products.forEach (product => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product', async () => {
    const searchTerm = 'Blue Top';

    const response = await api.post(endpoints.searchProduct, {
        search_product: searchTerm
    });

    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(200);

    expect(Array.isArray(response.data.products)).toBe(true);
    expect(response.data.products.length).toBeGreaterThan(0);

    const matchingProduct = response.data.products.find(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(matchingProduct).toBeTruthy();

    response.data.products.forEach(product => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});


test('Search product - no results', async () => {
    const response = await api.post(endpoints.searchProduct, { search_product: 'NonexistentProduct' });

    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(200);
    expect(response.data.products.length).toBe(0);
});