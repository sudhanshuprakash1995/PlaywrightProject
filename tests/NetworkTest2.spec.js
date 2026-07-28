import { test, expect } from '@playwright/test'

const email = "sp333@gmail.com"


test('Security test inspection with abort and continue', async ({page}) => {
    await page.route("**/*.{css,jpg,jpeg}", route => route.abort())
    await page.on('request', request => console.log(request.url()))
    await page.on('response', response => console.log(response.url(), response.status()))
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Sp@123456')
    // await page.locator('#password').fill('Learning')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    // await page.pause()
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders")
    await page.waitForLoadState('networkidle')
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async (route) => {
        await route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer?id=6a196dfe17ee3e78baa74c25"})
    })
    await page.locator("button:has-text('View')").nth(1).click()
    await expect(page.locator("button:has-text('View')")).toBeHidden()
    // await page.pause()
    console.log(await page.locator("p").nth(1).textContent())
    
})