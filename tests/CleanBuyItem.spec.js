const {test, expect} = require('@playwright/test');
const { TIMEOUT } = require('node:dns');

test('Buy Item', async ({browser})=>{
    
    const email = 'sp333@gmail.com'
    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Sp@123456')
    // await page.locator('#password').fill('Learning')
    await page.locator('#login').click()
    // await page.waitForLoadState('networkidle')
    await page.waitForSelector('[style*="text-transform: uppercase;"]')
    const cardTitles = await page.locator('[style*="text-transform: uppercase;"]')
    console.log(await cardTitles.allTextContents())
    const targetItem = 'ZARA COAT 3'
    // for(let i=0; i< await cardTitles.count(); i++){
    //     const productName = await cardTitles.nth(i).textContent();
    //     if(productName?.trim() === targetItem){
    //         await page.locator("[style*='float: right;']").nth(i).click()
    //         break;
    //     }
    // }
    // page.pause()
    await page.locator("div.card").filter({ hasText: targetItem }).locator("[style*='float: right;']").click()
    await page.locator("button[routerlink*='/dashboard/cart']").click()
    await page.getByText("Checkout").waitFor()
    const cartValues = await page.locator('div.cartSection h3').allTextContents()
    await console.log(cartValues)
    expect(cartValues).toContain(targetItem)
    // await page.pause()
    // await page.getByText("Checkout").click()
    await page.locator("text=Checkout").click()
    await page.getByPlaceholder('Select Country').pressSequentially('Ind',{ delay: 150 })
    // await page.pause()
    /* regular expression
    These slashes just mark the start and end of the regex pattern. 
    ^ matches the start of the string, ensuring that "India" is at the beginning.
    \s* matches zero or more whitespace characters, allowing for any amount of space before and after "India".
    $ means emd of string
    \w means word
    [\s\w]* means any combination of whitespace and word characters, allowing for variations like "Ocean" or "Ocean Blue"]
    */
    // await page.getByText(/^\s*India\s*$/).click()
    // await page.getByText(/^[\w\s]*Ocean[\w\s]*$/).click()
    await page.locator("span.ng-star-inserted").getByText(/^\s*India\s*$/).click()
    await expect(page.locator('div.user__name label')).toHaveText(email)
    await page.locator('a.action__submit').click()
    await expect(page.locator('h1.hero-primary')).toHaveText(' Thankyou for the order. ')
    const orderText = await page.locator('label.ng-star-inserted').textContent()
    const orderId = orderText?.split(' ')[2]
    await console.log(orderId)
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
    // await page.pause()
})