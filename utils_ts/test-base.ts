
// const base = require('@playwright/test')
import { test as base } from '@playwright/test';
interface TestData {
    username: string;
    password: string;
    productName: string;
}

export const customTest = base.extend<{testDataForOrder: TestData}>({
    testDataForOrder : {
        username: 'anshika@gmail.com',
        password: 'Iamking@000',
        productName: 'ADIDAS ORIGINAL'
    }
})