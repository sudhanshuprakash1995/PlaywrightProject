const {test, expect} = require('@playwright/test');

test('Incorrect login', async ({browser}) => {

    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('input#username').fill('rahulshettyacademy')
    // await page.locator('#password').fill('Learning@830$3mK2')
    await page.locator('#password').fill('Learning')
    await page.locator('#signInBtn').click()
    console.log(await page.locator("[style*='block']").textContent())
    //  expect(await page.locator("[style*='block']")).toContainText('Incorrect');
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    // const firstMobile = await page.locator("h4.card-title a").first().textContent()
    // await console.log(firstMobile)

});

test('UI test', async ({browser}) => {

    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('input#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('Learning@830$3mK2')
    // await page.locator('#password').fill('Learning')
    await page.locator('#signInBtn').click()
    const firstMobile = await page.locator("h4.card-title a").nth(0).textContent()
    await console.log(firstMobile)

});

test('Get All Card Titles', async ({browser}) => {

    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('input#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('Learning@830$3mK2')
    // await page.locator('#password').fill('Learning')
    await page.locator('#signInBtn').click()
    // expect(await page.locator("h4.card-title a")).toBeVisible()
    // const firstMobile = await page.locator("h4.card-title a").nth(0).textContent()
    // await console.log(firstMobile)
    // const cards = await page.locator("h4.card-title a")
    // const cardNames = await cards.allTextContents()
    await page.waitForSelector("h4.card-title a")
    const cardNames = await page.locator("h4.card-title a").allTextContents()
    console.log(cardNames)

});



test('New Assignment Testing', async ({browser}) => {

    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('#userEmail').fill('sp333@gmail.com')
    await page.locator('#userPassword').fill('Sp@123456')
    // await page.locator('#password').fill('Learning')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    const firstMobile = await page.locator("[style*='text-transform: uppercase;']").allTextContents()
    console.log(firstMobile)
    // await console.log(firstMobile)

});


test('Drop down pratice', async ({browser}) => {

    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('input#username').fill('rahulshettyacademy')
    // await page.locator('#password').fill('Learning@830$3mK2')
    await page.locator('#password').fill('Learning')
    await page.selectOption('select.form-control', 'teach')
    await page.locator("span.radiotextsty").nth(1).click();
    await expect(page.locator("span.radiotextsty").nth(0).isChecked()).toBeFalsy()
    await page.locator("#okayBtn").click();
    
    await page.pause()

    });

test('get blinking test', async ({browser})=>{
    
     const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const infotext = await page.locator("[href*='documents-request']")
    await expect(infotext).toHaveAttribute('class', 'blinkingText')
})


test('Get new page', async ({browser})=>{
    
    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const [newPage] = await Promise.all([
     b.waitForEvent('page'),
    page.locator('[href*="documents-request"]').click()
    ])
    const text = await newPage.locator('p.red').textContent();
    // await console.log(text.split(' ')[4]);
    // page.
    await page.bringToFront()
    await page.locator('input#username').fill(text.split(' ')[4])
    await page.locator('input#username').inputValue()
    await page.pause()
    
})