// event-booking.spec.js
// @ts-check

// event-booking.spec.js
// @ts-check
const { test, expect } = require('@playwright/test');
 

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// Helper: generate a future date string suitable for the Event Date & Time field
function futureDateValue(daysFromNow = 7) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  
  // Adjust this format if the input expects a different pattern
  // Example: "2026-06-01 18:00"
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  // simple fixed time
  const hh = '18';
  const min = '00';
  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
  
//  return date;
}


// Reusable login helper
 /**
  * @param {import('@playwright/test').Page} page
  * @returns {Promise<void>}
  */
async function login(page) {
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

test('Create event, book it, and verify seat count reduces by 1', async ({ page }) => {
  // ----------------------------
  // Step 1 — Login
  // ----------------------------
  await login(page);

  // ----------------------------
  // Step 2 — Create a new event
  // ----------------------------
  await page.goto(`${BASE_URL}/admin/events`);

  const eventTitle = `Test Event ${Date.now()}`;
  const eventDescription = 'Automated test event description';
  const city = 'Chennai';
  const venue = 'Test Venue';
  const eventDateTime = futureDateValue(3); // 3 days from now
  const price = '100';
  const totalSeats = '50';

  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea').fill(eventDescription);
  await page.getByLabel('City').fill(city);
  await page.getByLabel('Venue').fill(venue);
  await page.getByLabel('Event Date & Time').pressSequentially(eventDateTime.split(' ')[0]);
  await page.keyboard.press('Tab');
  await page.getByLabel('Event Date & Time').pressSequentially(eventDateTime.split(' ')[1]);
  await page.getByLabel('Price ($)').fill(price);
  await page.getByLabel('Total Seats').fill(totalSeats);

  await page.locator('#add-event-btn').click();

  // Assert toast "Event created!" is visible
  await expect(page.getByText('Event created!')).toBeVisible();

  // ----------------------------
  // Step 3 — Find event card & capture seats
  // ----------------------------
  await page.goto(`${BASE_URL}/events`);

  const eventCards = page.getByTestId('event-card');

  // Assert page loaded: first card visible
  await expect(eventCards.first()).toBeVisible();

  // Filter for card with our event title
  const matchedCard = eventCards.filter({ hasText: eventTitle });

  await expect(matchedCard).toBeVisible({ timeout: 5000 });

  // Locate element containing "seat" text inside the card and parse integer
  const seatTextLocator = matchedCard.locator(':text("seat")');
  const seatText = (await seatTextLocator.innerText()).trim();
  // Example seat text might be: "48 seats left"
  const seatsBeforeBooking = Number(seatText.split(' ')[0]);

  // ----------------------------
  // Step 4 — Start booking
  // ----------------------------
  await matchedCard.getByTestId('book-now-btn').click();

  // ----------------------------
  // Step 5 — Fill booking form
  // ----------------------------
  // Assert default ticket count is 1
  await expect(page.locator('#ticket-count')).toHaveText('1');

  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill('customer@example.com');
  await page.getByPlaceholder('+91 98765 43210').fill('+91 99999 99999');

  await page.locator('.confirm-booking-btn').click();

  // ----------------------------
  // Step 6 — Verify booking confirmation
  // ----------------------------
  const bookingRefLocator = page.locator('.booking-ref').first();
  await expect(bookingRefLocator).toBeVisible();

  const bookingRef = (await bookingRefLocator.innerText()).trim();

  // ----------------------------
  // Step 7 — Verify in My Bookings
  // ----------------------------
  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();

  // Find booking card where .booking-ref matches bookingRef
  const matchedBookingCard = bookingCards.filter({
    has: page.locator('.booking-ref', { hasText: bookingRef }),
  });

  await expect(matchedBookingCard).toBeVisible();
  await expect(matchedBookingCard).toContainText(eventTitle);

  // ----------------------------
  // Step 8 — Verify seat reduction
  // ----------------------------
  await page.goto(`${BASE_URL}/events`);

  await expect(eventCards.first()).toBeVisible();

  const matchedCardAgain = eventCards.filter({ hasText: eventTitle });
  await expect(matchedCardAgain).toBeVisible();

  const seatTextAfter = (await matchedCardAgain.locator(':text("seat")').innerText()).trim();
  const seatsAfterBooking = Number(seatTextAfter.split(' ')[0]);

  Assert: seatsAfterBooking === seatsBeforeBooking - 1
  expect(seatsAfterBooking, 'Seat count should drop by exactly 1').toBe(seatsBeforeBooking - 1),'Seats are not matching';
});


// const { test, expect } = require('@playwright/test');
// /**
//  * @typedef {Object} EventDetails
//  * @property {string} title
//  * @property {string} description
//  * @property {string} city
//  * @property {string} venue
//  * @property {string} dateTime
//  * @property {string} price
//  * @property {string} totalSeats
//  */

// /**
//  * @typedef {Object} BookingInfo
//  * @property {string} fullName
//  * @property {string} email
//  * @property {string} phone
//  */
// // import { Page } from '@playwright/test';

// const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// // Helper: generate a future date string suitable for the Event Date & Time field
// /**
//  * @param {number} [daysFromNow]
//  * @returns {string}
//  */
// function futureDateValue(daysFromNow = 7) {
//   const date = new Date();
//   date.setDate(date.getDate() + daysFromNow);
//   // Adjust this format if the input expects a different pattern
//   // Example: "2026-06-01 18:00"
//   const yyyy = date.getFullYear();
//   const mm = String(date.getMonth() + 1).padStart(2, '0');
//   const dd = String(date.getDate()).padStart(2, '0');
//   // simple fixed time
//   const hh = '18';
//   const min = '00';
//   return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
// }

// // Reusable login helper
// /**
//  * @param {import('@playwright/test').Page} page
//  * @returns {Promise<void>}
//  */
// async function login(page) {
//   await page.goto(`${BASE_URL}/login`);

//   // Fill email (by placeholder)
//   await page.getByPlaceholder('you@email.com').fill('your-email@example.com');

//   // Fill password (by label)
//   await page.getByLabel('Password').fill('yourStrongPassword123');

//   // Click login button (by id)
//   await page.locator('#login-btn').click();

//   // Assert login success by checking "Browse Events →" link
//   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
// }

// test.only('Create event, book it, and verify seat count reduces by 1', async ({ page }) => {

//     // const b = await browser.newContext()
//     // const page = await b.newPage()
//   // ----------------------------
//   // Step 1 — Login
//   // ----------------------------
//   await login(page);

//   // ----------------------------
//   // Step 2 — Create a new event
//   // ----------------------------
//   await page.goto(`${BASE_URL}/admin/events`);

//   /** @type {EventDetails} */
//   const event = {
//     title: `Test Event ${Date.now()}`,
//     description: 'Automated test event description',
//     city: 'Chennai',
//     venue: 'Test Venue',
//     dateTime: futureDateValue(3), // 3 days from now
//     price: '100',
//     totalSeats: '50',
//   };

//   await page.locator('#event-title-input').fill(event.title);
//   await page.locator('#admin-event-form textarea').fill(event.description);
//   await page.getByLabel('City').fill(event.city);
//   await page.getByLabel('Venue').fill(event.venue);
//   await page.getByLabel('Event Date & Time').fill(event.dateTime);
//   await page.getByLabel('Price ($)').fill(event.price);
//   await page.getByLabel('Total Seats').fill(event.totalSeats);

//   await page.locator('#add-event-btn').click();

//   // Assert toast "Event created!" is visible
//   await expect(page.getByText('Event created!')).toBeVisible();

//   // ----------------------------
//   // Step 3 — Find event card & capture seats
//   // ----------------------------
//   await page.goto(`${BASE_URL}/events`);

//   const eventCards = page.getByTestId('event-card');

//   // Assert page loaded: first card visible
//   await expect(eventCards.first()).toBeVisible();

//   // Filter for card with our event title
//   const matchedCard = eventCards.filter({ hasText: "eventTitle" });

//   await expect(matchedCard).toBeVisible({ timeout: 5000 });

//   // Locate element containing "seat" text inside the card and parse integer
//   const seatTextLocator = matchedCard.locator(':text("seat")');
//   const seatText = (await seatTextLocator.innerText()).trim();
//   // Example seat text might be: "48 seats left"
// //   const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0], 10);

//   // ----------------------------
//   // Step 4 — Start booking
//   // ----------------------------
//   await matchedCard.getByTestId('book-now-btn').click();

//   // ----------------------------
//   // Step 5 — Fill booking form
//   // ----------------------------
//   // Assert default ticket count is 1
//   await expect(page.locator('#ticket-count')).toHaveText('1');

//   /** @type {BookingInfo} */
//   const booking = {
//     fullName: 'Test User',
//     email: 'customer@example.com',
//     phone: '+91 99999 99999',
//   };

//   await page.getByLabel('Full Name').fill(booking.fullName);
//   await page.locator('#customer-email').fill(booking.email);
//   await page.getByPlaceholder('+91 98765 43210').fill(booking.phone);

//   await page.locator('.confirm-booking-btn').click();

//   // ----------------------------
//   // Step 6 — Verify booking confirmation
//   // ----------------------------
//   const bookingRefLocator = page.locator('.booking-ref').first();
//   await expect(bookingRefLocator).toBeVisible();

//   const bookingRef = (await bookingRefLocator.innerText()).trim();

//   // ----------------------------
//   // Step 7 — Verify in My Bookings
//   // ----------------------------
//   await page.getByRole('link', { name: 'View My Bookings' }).click();

//   await expect(page).toHaveURL(`${BASE_URL}/bookings`);

//   const bookingCards = page.locator('#booking-card');

//   await expect(bookingCards.first()).toBeVisible();

//   // Find booking card where .booking-ref matches bookingRef
//   const matchedBookingCard = bookingCards.filter({
//     has: page.locator('.booking-ref', { hasText: bookingRef }),
//   });

//   await expect(matchedBookingCard).toBeVisible();
//   await expect(matchedBookingCard).toContainText("eventTitle");

//   // ----------------------------
//   // Step 8 — Verify seat reduction
//   // ----------------------------
//   await page.goto(`${BASE_URL}/events`);

//   await expect(eventCards.first()).toBeVisible();

//   const matchedCardAgain = eventCards.filter({ hasText: "eventTitle" });
//   await expect(matchedCardAgain).toBeVisible();

//   const seatTextAfter = (await matchedCardAgain.locator(':text("seat")').innerText()).trim();
// //   const seatsAfterBooking = parseInt(seatTextAfter.match(/\d+/)[0], 10);

//   // Assert: seatsAfterBooking === seatsBeforeBooking - 1
// //   expect(seatsAfterBooking, 'Seat count should drop by exactly 1').toBe(seatsBeforeBooking - 1);
// });

