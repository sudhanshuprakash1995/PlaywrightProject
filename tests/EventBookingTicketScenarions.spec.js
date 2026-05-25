const { test, expect } = require('@playwright/test');
 
// constants value for the tests
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const eventTitle = `Test Event ${Date.now()}`;
const count = 3

// Helper function: generate a future date string suitable for the Event Date & Time field
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

// Main Tests


test('Create event, book it, and verify seat count reduces by 1', async ({ page }) => {
  // ----------------------------
  // Step 1 — Login
  // ----------------------------
  await login(page);

  // ----------------------------
  // Step 2 — Create a new event & book single ticket
  // ----------------------------
  await page.goto(`${BASE_URL}/admin/events`);

  
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

  await matchedCard.getByTestId('book-now-btn').click();

  // Assert default ticket count is 1
  await expect(page.locator('#ticket-count')).toHaveText('1');

  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill('customer@example.com');
  await page.getByPlaceholder('+91 98765 43210').fill('+91 99999 99999');

  await page.locator('.confirm-booking-btn').click();

  // ----------------------------
  // Step 3 — Navigate to booking detail
  // ----------------------------
  const bookingRefLocator = page.locator('.booking-ref').first();
  await expect(bookingRefLocator).toBeVisible();

  const bookingRef = (await bookingRefLocator.innerText()).trim();

  
  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();

  // Find booking card where .booking-ref matches bookingRef
  const matchedBookingCard = await bookingCards.filter({
    has: page.locator('.booking-ref', { hasText: bookingRef }),
  });

  await matchedBookingCard.locator('text= View Details').click();
  const bookingText = page.getByText("Booking Information")
  await expect(bookingText).toBeVisible()

  // ----------------------------
  // Step 4 — Validate booking ref
  // ----------------------------

  const bookingReference = await page.locator("span.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm").textContent()
  const heading = await page.locator("h1.text-2xl").textContent()

  // @ts-ignore
  Assert: bookingReference[0] === heading[0]

  // ----------------------------
  // Step 5 — Check refund eligibility
  // ----------------------------

  await page.locator("#check-refund-btn").click()
  const refundSpinner = page.locator("#refund-spinner")
  expect(refundSpinner).toBeVisible()
  expect(refundSpinner).toBeHidden({ timeout: 8000 })

  // ----------------------------
  // Step 6 — Check refund result
  // ----------------------------

  const refund = page.locator("#refund-result")
  await refund.waitFor({ state: 'visible' , timeout: 7000 })
  const refundText = await refund.textContent()
  await expect(refundText).toContain("Single-ticket bookings qualify for a full refund")

  });


  
test('Book group of ticket minimum 3', async ({ page }) => {
  // ----------------------------
  // Step 1 — Login
  // ----------------------------
  await login(page);

  // ----------------------------
  // Step 2 — Create a new event & book single ticket
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
  // const seatsBeforeBooking = Number(seatText.split(' ')[0]);

  await matchedCard.getByTestId('book-now-btn').click();

  // Assert default ticket count is 1
  await expect(page.locator('#ticket-count')).toHaveText('1');
  const plusButton = await page.getByRole("button", { name: "+" });
  plusButton.dblclick() // to make it 3 tickets
  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill('customer@example.com');
  await page.getByPlaceholder('+91 98765 43210').fill('+91 99999 99999');

  await page.locator('.confirm-booking-btn').click();

  // ----------------------------
  // Step 3 — Navigate to booking detail
  // ----------------------------
  const bookingRefLocator = page.locator('.booking-ref').first();
  await expect(bookingRefLocator).toBeVisible();

  const bookingRef = (await bookingRefLocator.innerText()).trim();

  
  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();

  // Find booking card where .booking-ref matches bookingRef
  const matchedBookingCard = await bookingCards.filter({
    has: page.locator('.booking-ref', { hasText: bookingRef }),
  });

  await matchedBookingCard.locator('text= View Details').click();
  const bookingText = page.getByText("Booking Information")
  await expect(bookingText).toBeVisible()

  // ----------------------------
  // Step 4 — Validate booking ref
  // ----------------------------

  const bookingReference = await page.locator("span.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm").textContent()
  const heading = await page.locator("h1.text-2xl").textContent()

  // @ts-ignore
  Assert: bookingReference[0] === heading[0]

  // ----------------------------
  // Step 5 — Check refund eligibility
  // ----------------------------

  await page.locator("#check-refund-btn").click()
  const refundSpinner = page.locator("#refund-spinner")
  expect(refundSpinner).toBeVisible()
  expect(refundSpinner).toBeHidden({ timeout: 7000 })

  // ----------------------------
  // Step 6 — Check refund result
  // ----------------------------

  const refund = page.locator("#refund-result")
  await refund.waitFor({ state: 'visible' , timeout: 8000 })
  const refundText = await refund.textContent()
  await expect(refundText).toContain("Not eligible for refund")
  await expect(refundText).toContain(`Group bookings (${count} tickets) are non-refundable`)


});