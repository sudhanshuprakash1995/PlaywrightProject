# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExploratoryKAIResumeAnalysis.spec.js >> login test and check JD Analysis for single resume
- Location: tests\ExploratoryKAIResumeAnalysis.spec.js:7:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByText('Analyze Resumes')
    - locator resolved to <button type="button" aria-disabled="true" _ngcontent-ng-c893570377="" class="btn-analyze is-disabled">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    169 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import stringSimilarity from 'string-similarity';
  3  | import { locators } from '../locators/locators.js';
  4  | import { KaiChatBot } from '../pageObjects/KaiChatBot.js';
  5  | 
  6  | 
  7  | test('login test and check JD Analysis for single resume', async ({ browser }) => {
  8  |   const context = await browser.newContext({ storageState: "auth.json" })
  9  |   const page = await context.newPage()
  10 | 
  11 |   // --- Login ---
  12 |   const url = 'https://kai.kumaran.com/chatbot'   // prod url
  13 |   // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url
  14 |   
  15 |   await page.goto(url)
  16 |   await page.waitForLoadState('networkidle')
  17 |   await page.locator('button.login-button').click()
  18 |  
  19 |   await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });
  20 | 
  21 |   const kai = new KaiChatBot(page)
  22 |   // Optional: Close tour button
  23 |   // await page.pause()
  24 |   await kai.closeTour()
  25 | 
  26 |   // --- Verify Login ---
  27 |   await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })
  28 | 
  29 |   // --- Select Model ---
  30 |   // await page.getByText('New Chat').click()
  31 |   // await page.locator('div#tour-model-selector').click()
  32 |   // const agentOptions = page.locator('div.options').first()
  33 |   // await agentOptions.getByText('claude-sonnet-4.6').click()
  34 |   // await kai.selectModel('claude-sonnet-4.6',page);
  35 | 
  36 |   // await page.pause()
  37 |   // --- Basic Prompt Test ---
  38 |   await page.getByText('HR Portal').click();
  39 |   await page.getByText('JD Analysis').click();
  40 |   const [fileChooser] = await Promise.all([
  41 |     page.waitForEvent('filechooser'),
  42 |     page.locator('button.dz-browse-btn').first().click() // your upload button
  43 |   ]);
  44 | 
  45 |   await fileChooser.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Trainee_Software_Tester_Job_Description 2.pdf']);
  46 |   await expect(page.locator('button[aria-label="Remove file"]')).toBeVisible();
  47 | 
  48 |   const [fileChooser1] = await Promise.all([
  49 |     page.waitForEvent('filechooser'),
  50 |     page.locator('button.dz-browse-btn').last().click() // your upload button
  51 |   ]);
  52 | 
  53 |   await fileChooser1.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\Raveendra Reddy.docx']);
  54 |   await expect(await page.locator('button[aria-label="Remove file"]').count()).toBe(2);
> 55 |   // await page.getByText('Analyze Resumes').click()
     |                                           ^ Error: locator.click: Target page, context or browser has been closed
  56 |   await page.locator('button.btn-analyze.is-disabled').click();
  57 |   await page.locator('div.submitting-overlay').waitFor({ state: 'hidden', timeout: 30000 });
  58 |   const analysisResults = await page.locator('svg.gauge-svg').textContent();
  59 |   console.log('Analysis Results:', analysisResults);
  60 | 
  61 | 
  62 | 
  63 | 
  64 | 
  65 | 
  66 | })
  67 | 
```