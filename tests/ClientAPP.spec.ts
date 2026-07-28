import { POManager } from '../pageObjects_ts/POManager';
import { test, expect } from '@playwright/test'
import data from '../utils/placeOrderTestData.json' with { type: 'json' }
// import { LoginPage } from '../pageObjects/loginPage';
// import { DashBoardPage } from '../pageObjects/dashBoardPage';
// import { Checkout } from '../pageObjects/Checkout';
// Avoid importing the external DashboardPage module (it contains top-level code that
// causes syntax errors in this environment). Provide a small local helper class
// with the methods used by this test.

// const { TIMEOUT } = require('node:dns');

test('Client app login', async ({browser})=>{
    
    const email = 'sp333@gmail.com'
    const targetItem = 'ZARA COAT 3'
    const b = await browser.newContext()
    const page = await b.newPage()

    const poManager = new POManager(page);
    const login = poManager.getLoginPage()
    await login.goTo()
    await login.validLogin(data.email,data.password)
    // await page.pause()
    const dashboard = poManager.getDashboardPage()
        
    
    await dashboard.searchProduct(data.targetItem)
    await dashboard.navigateToCart()
    // await page.pause()
    const checkout =  poManager.getCheckout()
    await checkout.validateCheckoutItems(data.targetItem)
    // await page.pause()
    const orderId = await checkout.checkoutProcess(email)
    
    // await console.log(orderId)
    await page.locator("button[routerlink='/dashboard/myorders']").click()
    await page.waitForSelector("th[scope='row']")
    const orderList = await page.locator("th[scope='row']")
    for(let i=0; i< await orderList.count(); i++){
        const selectedOrder = await orderList.nth(i).textContent();
        if(selectedOrder?.trim() === orderId){
            console.log("Order found")
            await page.locator("button:has-text('View')").nth(i).click()
            break;
        }
    }
    expect(await page.locator("p.text").first().textContent()).toContain(email)

})