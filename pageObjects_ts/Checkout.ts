import { expect, Locator, Page } from '@playwright/test'

class Checkout {

    page: Page;
    checkoutItems: Locator;
    checkout: Locator;
    county: Locator;
    highlightedCountry: Locator
    emailLabel: Locator;
    submitButton: Locator;
    orderConfirmation: Locator;
    orderConfirmationText: string;
    orderDetails: Locator;

    constructor(page: Page) {
        this.page = page;           // Store Playwright page instance
        this.checkoutItems = page.locator('div.cartSection h3')
        this.checkout = page.locator("text=Checkout")
        this.county = page.getByPlaceholder('Select Country')
        this.highlightedCountry = page.locator("span.ng-star-inserted").getByText(/^\s*India\s*$/)
        this.emailLabel = page.locator('div.user__name label')
        this.submitButton = page.locator('a.action__submit')
        this.orderConfirmation = page.locator('h1.hero-primary')
        this.orderConfirmationText = ' Thankyou for the order. '
        this.orderDetails = page.locator('label.ng-star-inserted')
        // Locators (initialized in constructor)
        
    }

    // Method to navigate to login page
    async validateCheckoutItems(targetItem: string) {
        await this.page.getByText("Checkout").waitFor()
        const cartValues = await this.checkoutItems.allTextContents()
        console.log(cartValues)
        await expect(cartValues).toContain(targetItem)
    }

    // Reusable business method
    async checkoutProcess(email: string) {
        // await this.page.pause()
        await this.checkout.click()
        await this.county.pressSequentially('Ind',{ delay: 150 })
        await this.highlightedCountry.click()
        await expect(this.emailLabel).toHaveText(email)
        await this.submitButton.click()
        await expect(this.orderConfirmation).toHaveText(this.orderConfirmationText)
        const orderText = await this.orderDetails.textContent()
        const orderId = orderText?.split(' ')[2]
        console.log(orderId)
        return orderId
        
    }
}

export { Checkout };