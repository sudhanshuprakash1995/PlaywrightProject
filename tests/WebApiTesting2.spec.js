import { test, expect } from '@playwright/test'
// const {test, expect} = require('@playwright/test');
import { TIMEOUT } from 'node:dns'
let webContext

test.beforeAll('first login', async ({browser})=>{
    
    const email = 'sp333@gmail.com'
    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Sp@123456')
    // await page.locator('#password').fill('Learning')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    await b.storageState({path: 'state.json'})
    webContext = await browser.newContext({storageState: 'state.json'})
    // await page.sessionstorageState({path: 'state.json'})
    // await page.waitForSelector('[style*="text-transform: uppercase;"]')
    // const cardTitles = await page.locator('[style*="text-transform: uppercase;"]')
    // console.log(await cardTitles.allTextContents())
    // const targetItem = 'ZARA COAT 3'
});

test('no login direct access', async ()=>{
    const b = await browser.newContext({storageState: 'state.json'})
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard')
    console.log(await page.locator("div.card-body h5").allTextContents())
})