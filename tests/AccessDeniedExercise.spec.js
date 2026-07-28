import { test, expect, request } from '@playwright/test'
import  APiUtils  from '../utils/APiUtils.js'

const dataPayload = {
    email: "student@example.com",
    password: "secret123"
}

const gmailUser = {
    email: "master@example.com",
    password: "secret123"
}
const orderPayload = {
    "orders": [
        {
            "country": "India",
            "productOrderedId": "6960ea76c941646b7a8b3dd5"
        }
    ]
}
const fakePayLoadOrders = { "data": [], "message": "No Orders" };

let orderId
let token
let bookingId

test.beforeAll(async () => {


    // Step 1 — Login as Yahoo user via API  -
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', { data: dataPayload });
    const responseBody = await response.json()
    await expect(response.ok()).toBeTruthy()

    token = responseBody.token;
    console.log('Token: ', token);

    //  Step 2 — Fetch events via API to get a valid event ID
    const eventResponse = await apiContext.get('https://api.eventhub.rahulshettyacademy.com/api/events', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    console.log('Event response status: ', eventResponse);
    await expect(eventResponse.ok()).toBeTruthy()
    const eventResponseBody = await eventResponse.json()
    console.log('Event response: ', eventResponseBody);
    orderId = eventResponseBody['data'][0]['id'];
    console.log('Order ID: ', orderId);


    //  Step 3 — Create a booking via API as Yahoo user
    const createBookingResponse = await apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
        data:{
            'eventId': orderId,
            'customerName': 'Person',
            'customerEmail': "random@yahoo.com",
            'customerPhone': "+91-1234567890",
            'quantity': 1
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    console.log('Create booking response status: ', createBookingResponse);
    await expect(createBookingResponse.ok()).toBeTruthy()
    const createBookingResponseBody = await createBookingResponse.json()
    bookingId = createBookingResponseBody['data']['id']
    console.log('Booking ID: ', bookingId);
    // await apiContext.dispose();
})

test('Gmail User Login', async ({ page }) => {

    // Step 4 — Login as Gmail user via browser UI
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    await page.getByPlaceholder('you@email.com').fill(gmailUser.email);

    await page.getByLabel('Password').fill(gmailUser.password);

    await page.locator('#login-btn').click();

    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    // Step 5 — Navigate to Yahoo's booking URL as Gmail user
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${bookingId}`)
    await page.waitForLoadState('networkidle')
    // Step 6 — Assert access denied message is shown
    const accessDeniedMessage = page.getByText('Access Denied')
    await expect(accessDeniedMessage).toBeVisible()
    // await page.pause()
    const notAuthorized = await page.locator("p").first()
    await expect(page.locator("p").first()).toHaveText('You are not authorized to view this booking.')


    
})
