const { test, expect } = require('@playwright/test');
const { ProductClient } = require('../../api/ProductClient');
const { validateProduct } = require('../../data/schemas');

test('Get products list @api @smoke', async ({request}) => {
    const productClient = new ProductClient(request);
    const { body } = await productClient.getAll()
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    body.products.forEach(product => {
        const valid = validateProduct(product);
        expect(valid).toBe(true);
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const searchTerm = 'Blue Top';
    const { body } = await productClient.search(searchTerm)
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const matchingProduct = body.products.find(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(matchingProduct).toBeTruthy();

    body.products.forEach(product => {
        const valid = validateProduct(product);
        expect(valid).toBe(true);
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product - case insensitive @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const { body: bodyUpper } = await productClient.search('Blue Top');
    bodyUpper.products.forEach(product => {
        const valid = validateProduct( product );
        expect(valid).toBe(true);
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
    const { body: bodyLower } = await productClient.search('blue top');

    const upperIds = bodyUpper.products.map(p => p.id).sort();
    const lowerIds = bodyLower.products.map(p => p.id).sort();

    expect(upperIds).toEqual(lowerIds);
});

test('Search product - no results @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const { body } = await productClient.search( 'NonexistentProduct' );

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBe(0);
});