const {test, expect} = require('@playwright/test');

test('UI test', async ({browser}) => {

    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://www.google.com/')
    console.log(await page.title())
    expect(await page.title()).toBe('Google')
    await page.locator("a").filter({ hasText: 'हिन्दी' }).hover()
    await page.pause()
    await page.locator("a").filter({ hasText: 'मराठी' }).hover()
    
    // await page.getByText('हिन्दी').hover()

});