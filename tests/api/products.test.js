const { test, expect } = require('@playwright/test');
const { ProductClient } = require('../../api/ProductClient');

test('Get products list @api @smoke', async ({request}) => {
    const productClient = new ProductClient(request);
    const response = await productClient.getAll()
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    body.products.forEach(product => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const searchTerm = 'Blue Top';

    const response = await productClient.search(searchTerm)
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);

    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const matchingProduct = body.products.find(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(matchingProduct).toBeTruthy();

    body.products.forEach(product => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product - no results @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const response = await productClient.search( 'NonexistentProduct' );
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBe(0);
});