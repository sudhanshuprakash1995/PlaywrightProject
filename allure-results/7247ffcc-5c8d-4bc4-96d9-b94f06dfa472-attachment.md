# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientCustomAPP.spec.js >> Client app login
- Location: tests\ClientCustomAPP.spec.js:15:1

# Error details

```
Error: locator.fill: value: expected string, got undefined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e15]: 
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e17]: 
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e19]: 
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e21]: 
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading "Practice Website for Rahul Shetty Academy Students" [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]
          - button "Login" [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e50]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e55]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e60]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e66]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e71]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | class LoginPage {
  2  |     constructor(page) {
  3  |         this.page = page;           // Store Playwright page instance
  4  |         
  5  |         // Locators (initialized in constructor)
  6  |         this.username = page.locator('#userEmail')
  7  |         this.password = page.locator('#userPassword')
  8  |         this.signInButton = page.locator('input#login')
  9  |     }
  10 | 
  11 |     // Method to navigate to login page
  12 |     async goTo() {
  13 |         await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  14 |         await this.page.waitForLoadState('networkidle'); // Wait for page to load completely
  15 |     }
  16 | 
  17 |     // Reusable business method
  18 |     async validLogin(username, password) {
> 19 |         await this.username.fill(username);
     |                             ^ Error: locator.fill: value: expected string, got undefined
  20 |         await this.password.fill(password);
  21 |         await this.signInButton.click();
  22 |         // Add any wait or additional steps if needed
  23 |     }
  24 | }
  25 | 
  26 | export { LoginPage };
```