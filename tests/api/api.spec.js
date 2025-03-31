import { test, expect } from '@playwright/test';

test('Verify successful product search returns at least one product with existent category', async ({ request }) => {
    const response = await request.get('https://www.peppos.com.uy/vestimenta');

    // Verify API response is successful
    expect(response.status()).toBe(200);

    // Obtain HTML response from the response
    const body = await response.text();

    // Verify HTML code returns at least once data-codProd property, hence there's at least one product listed
    expect(body).toMatch(/data-codProd=["'][^"']+["']/);

    // Verify the quantity of products found does not equal zero in the HTML DOM
    expect(body).not.toContain('data-total="0"');
});

test('Verify unsuccessful product search with non-existent category', async ({ request }) => {
    const response = await request.get('https://www.peppos.com.uy/bota');

    // Verify API response is not successful
    expect(response.status()).toBe(404);
});

test('Verify unsuccessful product search does not return any product based on keyword', async ({ request }) => {
    const response = await request.get('https://www.peppos.com.uy/catalogo?q=thanksnotexist');

    // Verify API response is successful
    expect(response.status()).toBe(200);

    // Obtain HTML response from the response
    const body = await response.text();

    // Verify HTML code returns at least once data-codProd property, hence there's at least one product listed
    expect(body).not.toMatch(/data-codProd=["'][^"']+["']/);

    // Verify the quantity of products found equals zero in the HTML DOM
    expect(body).toContain('data-total="0"');
});


test('Extract and sort prices from Peppos catalogo via API', async ({ request }) => {
    // Make GET request via URL
    const response = await request.get('https://www.peppos.com.uy/catalogo?ord=pra');

    // Verify response is successful
    expect(response.status()).toBe(200);

    // Obtain HTML DOM from response
    const body = await response.text();

    // Extract all price amounts with regular expression
    const priceRegex = /<span class="monto">([^<]+)<\/span>/g;
    let match;
    const originalPrices = [];

    // Extract prices matching pattern
    while ((match = priceRegex.exec(body)) !== null) {
        const priceText = match[1].trim();
        const price = parseFloat(priceText.replace('$', '').replace(',', '').trim()); // Limpiar el precio y convertir a número
        if (!isNaN(price)) {
            originalPrices.push(price);
        }
    }

    // Ensure at least one price was extracted
    expect(originalPrices.length).toBeGreaterThan(0);

    // Sort prices from small to large
    const sortedPrices = originalPrices.sort((a, b) => a - b);

    expect(sortedPrices).toEqual(originalPrices.sort((a, b) => a - b));
});

test('Extract and verify prices are sorted from highest to lowest from Peppos catalogo via API', async ({ request }) => {
    // Make GET request via URL
    const response = await request.get('https://www.peppos.com.uy/catalogo?ord=prd');

    // Verify response is successful
    expect(response.status()).toBe(200);

    // Obtain HTML DOM from response
    const body = await response.text();

    // Extract all price amounts with regular expression
    const priceRegex = /<span class="monto">([^<]+)<\/span>/g;
    let match;
    const originalPrices = [];

    // Extract prices matching pattern
    while ((match = priceRegex.exec(body)) !== null) {
        const priceText = match[1].trim();
        const price = parseFloat(priceText.replace('$', '').replace(',', '').trim()); // Limpiar el precio y convertir a número
        if (!isNaN(price)) {
            originalPrices.push(price);
        }
    }

    // Ensure at least one price was extracted
    expect(originalPrices.length).toBeGreaterThan(0);

    // Create a sorted version of the prices (descending order)
    const sortedPrices = [...originalPrices].sort((a, b) => b - a);

    // Verify the extracted prices are in descending order
    expect(originalPrices).toEqual(sortedPrices);
});

test.describe('Newsletter registration API validation', () => {
    const url = 'https://www.peppos.com.uy/ajax?service=registro-newsletter';
    const invalidEmails = ['esteban', 'esteban@esteban', 'esteban.com'];
    const invalidBodyTemplate = (email) => `email=${email}&nombre=&apellido=&bots=no`;

    for (const email of invalidEmails) {
        test(`Verify invalid email response for: ${email}`, async ({ request }) => {
            // Send POST request with invalid email
            const response = await request.post(url, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: invalidBodyTemplate(email),
            });

            // Verify response status is 200
            expect(response.status()).toBe(200);

            // Obtain response body text
            const responseBody = await response.text();

            // Ensure the response contains the expected error message
            expect(responseBody).toContain('No es posible realizar el registro en este momento.');
        });
    }
});


