import {test, expect, request} from '@playwright/test'
import ApiUtils from '../utils/APiUtils.js'

    const dataPayload = {
        userEmail: "sp333@gmail.com",
        userPassword: "Sp@123456"
    }
    const orderPayload = {
        "orders": [
            {
                "country": "India",
                "productOrderedId": "6960ea76c941646b7a8b3dd5"
            }
        ]
    }

let orderId
let token

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtil = new ApiUtils(apiContext, dataPayload)
    token = await apiUtil.getToken()
    orderId = await apiUtil.createOrder(orderPayload)
    // const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: dataPayload });
    // const responseBody = await response.json()
    // // console.log('Json response: ', responseBody);
    // await expect(response.ok()).toBeTruthy();
    //  token = responseBody.token;

    //  const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
    //     data: orderPayload,
    //     headers:{
    //         'Authorization':token,
    //         'Content-Type':'application/json'
    //     }
    //  })
    //     const orderResponseBody = await orderResponse.json()
    //     console.log('Order response: ', orderResponseBody);
    //     orderId = orderResponseBody['orders'][0];
    //     console.log('Order ID: ', orderId);
    // await apiContext.dispose();
})

test('Bypassing Login', async ({page}) => {
    // await page.goto('https://google.com')
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
}, token)

await page.goto('https://rahulshettyacademy.com/client/#/dashboard')
await page.waitForTimeout(2000)
await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders')
await page.pause()
await page.goto(`https://rahulshettyacademy.com/client/#/dashboard/order-details/${orderId}`)
await page.pause()
})
