class DashBoardPage {
    constructor(page) {
        this.page = page
        this.cardTitles = page.locator('[style*="text-transform: uppercase;"]')
        this.card = page.locator("[style*='float: right;']")
        this.cart = page.locator("button[routerlink*='/dashboard/cart']")

    }

    async searchProduct(targetItem) {
        await this.cardTitles.first().waitFor({ state: 'visible' });

        const titlesCount = await this.cardTitles.count();
        for (let i = 0; i < titlesCount; i++) {
            const productName = await this.cardTitles.nth(i).textContent();
            if (productName && productName.trim() === targetItem) {
                await this.card.nth(i).click();
                return; // exit method once found
            }
        }

        // Optional: throw or log if not found
        throw new Error(`Product "${targetItem}" not found on dashboard`);
    }

    async navigateToCart() {
        await this.cart.click()
    }
}

export { DashBoardPage };
