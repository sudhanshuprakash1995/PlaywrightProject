class LoginPage {
    constructor(page) {
        this.page = page;           // Store Playwright page instance
        
        // Locators (initialized in constructor)
        this.username = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signInButton = page.locator('input#login')
    }

    // Method to navigate to login page
    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await this.page.waitForLoadState('networkidle'); // Wait for page to load completely
    }

    // Reusable business method
    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        // Add any wait or additional steps if needed
    }
}

export { LoginPage };