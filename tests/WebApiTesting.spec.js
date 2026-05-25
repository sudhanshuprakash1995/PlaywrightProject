const {test, expect, request} = require('@playwright/test')
const dataPayload = {
    userEmail: "sp333@gmail.com",
    userPassword: "Sp@123456"
}
let token

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: dataPayload });
    const responseBody = await response.json()
    // console.log('Json response: ', responseBody);
    await expect(response.ok()).toBeTruthy();
     token = responseBody.token;
    await apiContext.dispose();
})

test.only('Bypassing Login', async ({page}) => {
    // await page.goto('https://google.com')
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
}, token)

await page.goto('https://rahulshettyacademy.com/client/#/dashboard')
await page.waitForTimeout(5000)
})
