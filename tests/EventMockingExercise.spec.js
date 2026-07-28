import { test, expect } from '@playwright/test'

// constants value for the tests
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const SIX_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
        { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
        { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};



const FOUR_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};


// Reusable login helper
/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<void>}
 */
async function loginAndGoToEvents(page) {
    await page.goto(`${BASE_URL}/login`);

    // Fill email (by placeholder)
    await page.getByPlaceholder('you@email.com').fill('sp@s.com');

    // Fill password (by label)
    await page.getByLabel('Password').fill('Sp@123456');

    // Click login button (by id)
    await page.locator('#login-btn').click();

    // Assert login success by checking "Browse Events →" link
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Mock API response with 6 events', async ({ page }) => {


    await page.route("**/api/events**", route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(SIX_EVENTS_RESPONSE)
        })

    })

    await loginAndGoToEvents(page);
    const cards = await page.locator("[data-testid='event-card']")
    await expect(cards.first()).toBeVisible()
    await expect(cards).toHaveCount(6)
    const sandboxText = await page.getByText(/sandbox holds up to/i)
    await page.goto("https://eventhub.rahulshettyacademy.com/events")
    await expect(page.getByText(/sandbox holds up to/i)).toBeVisible()
    await console.log(await sandboxText.allInnerTexts())
    await expect(await sandboxText).toContainText("9 bookings")
})


test('Mock API response with 4 events', async ({ page }) => {


    await page.route("**/api/events**", route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(FOUR_EVENTS_RESPONSE)
        })

    })

    await loginAndGoToEvents(page);
    await page.goto("https://eventhub.rahulshettyacademy.com/events")
    const cards = await page.locator("[data-testid='event-card']")
    await expect(cards.first()).toBeVisible()
    await expect(cards).toHaveCount(4)
    const sandboxText = await page.getByText(/sandbox holds up to/i)
    await expect(page.getByText(/sandbox holds up to/i)).toBeHidden()
    // await expect(sandboxText).toHaveText("9 bookings")
})

