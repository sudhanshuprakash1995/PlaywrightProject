const {test, expect} = require('@playwright/test');
const { TIMEOUT } = require('node:dns');

test('Calander Operation', async ({browser})=>{
    const calander = "svg.react-date-picker__calendar-button__icon"
    const day = "23"
    const month = "3"
    const year = "2025"
    // const monthNumber = "6";
    // const date = "15";
    // const year = "2027";
    const expectedList = [month,day,year];
    const b = await browser.newContext()
    const page = await b.newPage()
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.waitForSelector(calander)
    await page.locator(calander).click()
    await page.locator("button.react-calendar__navigation__label").click()
    await page.locator("button.react-calendar__navigation__label").click()
    // await page.locator("react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from").click()
    await page.locator("button.react-calendar__decade-view__years__year").filter({ hasText: year }).click()
    await page.locator("button.react-calendar__year-view__months__month").nth(Number(month)-1).click()
    await page.locator("button.react-calendar__month-view__days__day").filter({ hasText: day }).click()
    /*
    const date = await page.locator(".react-date-picker__inputGroup input").nth(0).getAttribute('value')
    // typ
    // const date = await page.locator("input[style='visibility: position: absolute; z-index: -999;']").inputValue()
    console.log(typeof date.split('-')[0])
    await expect(Number(date.split('-')[0])).toBe(Number(year))
    await expect(Number(date.split('-')[1])).toBe(Number(month))
    await expect(Number(date.split('-')[2])).toBe(Number(day))
    */
    await page.pause()
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
    
    

})

