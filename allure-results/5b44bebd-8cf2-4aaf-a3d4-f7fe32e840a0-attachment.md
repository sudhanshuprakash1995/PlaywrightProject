# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExploratoryKAIprompts.spec.js >> login test and basic prompt tests
- Location: tests\ExploratoryKAIprompts.spec.js:7:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div.toast.success') to be visible

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import stringSimilarity from 'string-similarity';
  3   | import { locators } from '../locators/locators.js';
  4   | import { KaiChatBot } from '../pageObjects/KaiChatBot.js';
  5   | 
  6   | 
  7   | test('login test and basic prompt tests', async ({ browser }) => {
  8   |   const context = await browser.newContext({ storageState: "auth.json" })
  9   |   const page = await context.newPage()
  10  | 
  11  |   // --- Login ---
  12  |   const url = 'https://kai.kumaran.com/chatbot'   // prod url
  13  |   // const url = 'https://kai-uat.kumaran.ai/chatbot'  // uat url
  14  |   
  15  |   await page.goto(url)
  16  |   await page.waitForLoadState('networkidle')
  17  |   await page.locator('button.login-button').click()
  18  |  
> 19  |   await page.locator('div.toast.success').waitFor({ state: 'visible', timeout: 10000 });
      |                                           ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  20  | 
  21  |   const kai = new KaiChatBot(page)
  22  |   // Optional: Close tour button
  23  |   // await page.pause()
  24  |   await kai.closeTour()
  25  |   /*
  26  |   try {
  27  |     const closeTourButton = page.locator('button[aria-label="Close Tour"]')
  28  |     await closeTourButton.waitFor({ state: 'visible', timeout: 10000 })
  29  |     await closeTourButton.click()
  30  |   } catch {
  31  |     // Tour not shown, continue
  32  |   }
  33  |   */
  34  |   
  35  |   // --- Verify Login ---
  36  |   await expect(page.locator('div.user-email')).toHaveText('sudhanshu.prakash@kumaran.com', { timeout: 5000 })
  37  | 
  38  |   // --- Select Model ---
  39  |   // await page.getByText('New Chat').click()
  40  |   // await page.locator('div#tour-model-selector').click()
  41  |   // const agentOptions = page.locator('div.options').first()
  42  |   // await agentOptions.getByText('claude-sonnet-4.6').click()
  43  |   await kai.selectModel('claude-sonnet-4.6',page);
  44  | 
  45  |   // await page.pause()
  46  |   // --- Basic Prompt Test ---
  47  |   await page.locator('textarea#chatInput').fill('Hi')
  48  |   await page.locator('button.send-action-btn').first().click()
  49  |   await page.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 15000 })
  50  | 
  51  |   const reply = page.locator('div.bot-content').last()
  52  |   console.log('Bot reply:', await reply.textContent())
  53  |   await expect(reply).toHaveText(/Hi|hello|Welcome|Assist/i)
  54  | 
  55  |   // --- General knowledge Test (new tab reuse session) ---
  56  |   const newPage = await page.context().newPage()
  57  |   const kaiNew = new KaiChatBot(newPage)
  58  |   
  59  |   await newPage.goto(url)
  60  |   await newPage.locator('textarea#chatInput').waitFor({ state: 'visible', timeout: 10000 })
  61  |   await kaiNew.selectModel('claude-opus-4.6');
  62  |   // await newPage.pause()
  63  |   await newPage.locator('textarea#chatInput').fill('What is the capital of Nepal')
  64  |   await newPage.locator('button.send-action-btn').first().click()
  65  |   await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 20000 })
  66  | 
  67  |   // const reply1 = newPage.locator('div.bot-content').last()
  68  |   const reply1 = await kaiNew.getReply(0,15000)
  69  |   console.log('###Bot first reply:', await reply1.textContent())
  70  |   const actual = await reply1.textContent()
  71  |   await expect(reply1).toHaveText(/Kathmandu/i)
  72  | 
  73  | // --- Current + Typo Test (reuse session) ---  
  74  |   await newPage.locator('textarea#chatInput').fill('wat is curent yer')
  75  |   await newPage.locator('button.send-action-btn').first().click()
  76  |   await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 15000 })
  77  |   // const reply2 = await newPage.locator('div.bot-content').nth(1)
  78  |   const reply2 = await kaiNew.getReply(1,20000)
  79  |   console.log('###Bot second reply:', await reply2.textContent({ timeout: 20000 }))
  80  |   const currentYear = new Date().getFullYear();
  81  |   await expect(reply2).toHaveText(new RegExp(currentYear.toString(), 'i'));
  82  | 
  83  | // --- Bad Input Test (reuse session) ---  
  84  | 
  85  |   await newPage.locator('textarea#chatInput').fill('dfsdfsdfs')
  86  |   await newPage.locator('button.send-action-btn').first().click()
  87  |   await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 20000 })
  88  |   // div.is-generating-status
  89  |   // const reply3 = await newPage.locator('div.bot-content').nth(1)
  90  |   const reply3 = await kaiNew.getReply(2,15000)
  91  |   console.log('###Bot third reply:', await reply3.textContent({ timeout: 20000 }))
  92  |   await expect(reply3).toHaveText(/Clarification|clarify|specific|random|typo/i)
  93  | 
  94  |   // --- File upload (reuse session) --- 
  95  |   await page.bringToFront()
  96  |   const [fileChooser] = await Promise.all([
  97  |     page.waitForEvent('filechooser'),
  98  |     page.locator('button[id="tour-file-upload"]').click() // your upload button
  99  |   ]);
  100 | 
  101 |   await fileChooser.setFiles(['C:\\Users\\SudhanshuPrakash\\Downloads\\download.xlsx','C:\\Users\\SudhanshuPrakash\\Downloads\\robot_python.pdf']);
  102 | 
  103 |   // await page.pause()
  104 | 
  105 |   // await page.setInputFiles('button[id="tour-file-upload"]', 'C:\\Users\\SudhanshuPrakash\\Downloads\\download.xlsx');
  106 | 
  107 |   // Optional: verify file is attached
  108 |   const files = await page.locator('div.file-preview-chip').count()
  109 |   expect(files).toBe(2)
  110 | 
  111 | 
  112 | 
  113 | 
  114 | 
  115 |   // await newPage.locator('textarea#chatInput').fill('dfsdfsdfs')
  116 |   // await newPage.locator('button.send-action-btn').first().click()
  117 |   // await newPage.getByText('Generating Answer').waitFor({ state: 'hidden', timeout: 20000 })
  118 | 
  119 |   // const reply2 = newPage.locator('div.bot-content').last()
```