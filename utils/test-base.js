
// const base = require('@playwright/test')
import { test as base } from '@playwright/test';


export const customTest = base.test.extend({
    testDataForOrder : {
        username: 'anshika@gmail.com',
        password: 'Iamking@000',
        productName: 'ADIDAS ORIGINAL'
    }
})